/**
 * Community Forum System for Siwabeetle Shop
 * ระบบชุมชนและฟอรัมสำหรับคนรักด้วง
 */

const db = require('./db');
const sanitizeHTML = require('sanitize-html');

class CommunityForum {
    constructor() {
        this.categories = new Map();
        this.loadCategories();
    }

    /**
     * โหลดหมวดหมู่ฟอรัม
     */
    async loadCategories() {
        try {
            const result = await db.query('SELECT * FROM forum_categories WHERE is_active = true ORDER BY sort_order');
            result.rows.forEach(category => {
                this.categories.set(category.id, category);
            });
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    }

    /**
     * สร้างโพสต์ใหม่
     */
    async createPost(userId, postData) {
        try {
            // ทำความสะอาดข้อมูลเพื่อป้องกัน XSS
            const sanitizedTitle = sanitizeHTML(postData.title, {
                allowedTags: ['b', 'i', 'em', 'strong'],
                allowedAttributes: {}
            });
            
            const sanitizedContent = sanitizeHTML(postData.content, {
                allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a'],
                allowedAttributes: {
                    'a': ['href']
                }
            });

            const result = await db.query(
                `INSERT INTO forum_posts 
                 (category_id, user_id, title, content, image_urls, tags)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING *`,
                [
                    postData.categoryId,
                    userId,
                    sanitizedTitle,
                    sanitizedContent,
                    postData.imageUrls || [],
                    postData.tags || []
                ]
            );

            // อัปเดต reply count ใน category
            await db.query(
                'UPDATE forum_categories SET post_count = post_count + 1 WHERE id = $1',
                [postData.categoryId]
            );

            return result.rows[0];
        } catch (error) {
            console.error('Failed to create post:', error);
            throw error;
        }
    }

    /**
     * ดึงข้อมูลโพสต์ตามหมวดหมู่
     */
    async getPostsByCategory(categoryId, page = 1, limit = 20) {
        try {
            const offset = (page - 1) * limit;
            
            const result = await db.query(
                `SELECT fp.*, u.username, u.avatar,
                        COUNT(fr.id) as reply_count,
                        MAX(fr.created_at) as last_reply_at
                 FROM forum_posts fp
                 JOIN users u ON fp.user_id = u.id
                 LEFT JOIN forum_replies fr ON fp.id = fr.post_id
                 WHERE fp.category_id = $1
                 GROUP BY fp.id, u.username, u.avatar
                 ORDER BY fp.is_pinned DESC, fp.last_reply_at DESC NULLS LAST, fp.created_at DESC
                 LIMIT $2 OFFSET $3`,
                [categoryId, limit, offset]
            );

            return result.rows;
        } catch (error) {
            console.error('Failed to get posts:', error);
            throw error;
        }
    }

    /**
     * ดึงข้อมูลโพสต์ยอดนิยม
     */
    async getPopularPosts(limit = 10) {
        try {
            const result = await db.query(
                `SELECT fp.*, u.username, u.avatar,
                        COUNT(fr.id) as reply_count,
                        fp.view_count
                 FROM forum_posts fp
                 JOIN users u ON fp.user_id = u.id
                 LEFT JOIN forum_replies fr ON fp.id = fr.post_id
                 WHERE fp.created_at > NOW() - INTERVAL '7 days'
                 GROUP BY fp.id, u.username, u.avatar
                 ORDER BY (fp.view_count + COUNT(fr.id) * 2) DESC
                 LIMIT $1`,
                [limit]
            );

            return result.rows;
        } catch (error) {
            console.error('Failed to get popular posts:', error);
            throw error;
        }
    }

    /**
     * ดึงข้อมูลโพสต์เดี่ยว
     */
    async getPost(postId) {
        try {
            // เพิ่ม view count
            await db.query('UPDATE forum_posts SET view_count = view_count + 1 WHERE id = $1', [postId]);

            const result = await db.query(
                `SELECT fp.*, u.username, u.avatar, fc.name as category_name
                 FROM forum_posts fp
                 JOIN users u ON fp.user_id = u.id
                 JOIN forum_categories fc ON fp.category_id = fc.id
                 WHERE fp.id = $1`,
                [postId]
            );

            return result.rows[0];
        } catch (error) {
            console.error('Failed to get post:', error);
            throw error;
        }
    }

    /**
     * สร้างคำตอบ
     */
    async createReply(userId, postId, replyData) {
        try {
            const sanitizedContent = sanitizeHTML(replyData.content, {
                allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a'],
                allowedAttributes: {
                    'a': ['href']
                }
            });

            const result = await db.query(
                `INSERT INTO forum_replies 
                 (post_id, user_id, content, image_urls)
                 VALUES ($1, $2, $3, $4)
                 RETURNING *`,
                [postId, userId, sanitizedContent, replyData.imageUrls || []]
            );

            // อัปเดตข้อมูลโพสต์
            await db.query(
                `UPDATE forum_posts 
                 SET reply_count = reply_count + 1, 
                     last_reply_at = NOW()
                 WHERE id = $1`,
                [postId]
            );

            return result.rows[0];
        } catch (error) {
            console.error('Failed to create reply:', error);
            throw error;
        }
    }

    /**
     * ดึงคำตอบของโพสต์
     */
    async getReplies(postId, page = 1, limit = 50) {
        try {
            const offset = (page - 1) * limit;
            
            const result = await db.query(
                `SELECT fr.*, u.username, u.avatar
                 FROM forum_replies fr
                 JOIN users u ON fr.user_id = u.id
                 WHERE fr.post_id = $1
                 ORDER BY fr.created_at ASC
                 LIMIT $2 OFFSET $3`,
                [postId, limit, offset]
            );

            return result.rows;
        } catch (error) {
            console.error('Failed to get replies:', error);
            throw error;
        }
    }

    /**
     * ค้นหาโพสต์
     */
    async searchPosts(query, categoryId = null) {
        try {
            let sql = `
                SELECT fp.*, u.username, u.avatar,
                       COUNT(fr.id) as reply_count,
                       fc.name as category_name
                FROM forum_posts fp
                JOIN users u ON fp.user_id = u.id
                JOIN forum_categories fc ON fp.category_id = fc.id
                LEFT JOIN forum_replies fr ON fp.id = fr.post_id
                WHERE (fp.title ILIKE $1 OR fp.content ILIKE $1)
            `;
            
            let params = [`%${query}%`];
            
            if (categoryId) {
                sql += ' AND fp.category_id = $2';
                params.push(categoryId);
            }
            
            sql += `
                GROUP BY fp.id, u.username, u.avatar, fc.name
                ORDER BY fp.created_at DESC
                LIMIT 50
            `;

            const result = await db.query(sql, params);
            return result.rows;
        } catch (error) {
            console.error('Failed to search posts:', error);
            throw error;
        }
    }

    /**
     * ให้ like โพสต์หรือคำตอบ
     */
    async likePost(userId, postId, replyId = null) {
        try {
            if (replyId) {
                // Like reply
                await db.query(
                    'UPDATE forum_replies SET like_count = like_count + 1 WHERE id = $1',
                    [replyId]
                );
            } else {
                // Like post
                await db.query(
                    'UPDATE forum_posts SET like_count = like_count + 1 WHERE id = $1',
                    [postId]
                );
            }

            return { success: true };
        } catch (error) {
            console.error('Failed to like post:', error);
            throw error;
        }
    }

    /**
     * ระบบ Expert Q&A
     */
    async createExpertSession(expertId, sessionData) {
        try {
            const result = await db.query(
                `INSERT INTO expert_sessions 
                 (expert_id, title, description, scheduled_at, duration_minutes, max_participants)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING *`,
                [
                    expertId,
                    sessionData.title,
                    sessionData.description,
                    sessionData.scheduledAt,
                    sessionData.durationMinutes || 60,
                    sessionData.maxParticipants
                ]
            );

            return result.rows[0];
        } catch (error) {
            console.error('Failed to create expert session:', error);
            throw error;
        }
    }

    /**
     * ดึงข้อมูล Expert Sessions ที่กำลังจะมาถึง
     */
    async getUpcomingSessions(limit = 5) {
        try {
            const result = await db.query(
                `SELECT es.*, u.username as expert_name, u.avatar
                 FROM expert_sessions es
                 JOIN users u ON es.expert_id = u.id
                 WHERE es.status = 'scheduled' AND es.scheduled_at > NOW()
                 ORDER BY es.scheduled_at ASC
                 LIMIT $1`,
                [limit]
            );

            return result.rows;
        } catch (error) {
            console.error('Failed to get upcoming sessions:', error);
            throw error;
        }
    }

    /**
     * ส่งคำถามไปยัง Expert Session
     */
    async submitQuestion(userId, sessionId, question) {
        try {
            const sanitizedQuestion = sanitizeHTML(question, {
                allowedTags: ['b', 'i', 'em', 'strong'],
                allowedAttributes: {}
            });

            const result = await db.query(
                `INSERT INTO expert_questions 
                 (session_id, user_id, question)
                 VALUES ($1, $2, $3)
                 RETURNING *`,
                [sessionId, userId, sanitizedQuestion]
            );

            return result.rows[0];
        } catch (error) {
            console.error('Failed to submit question:', error);
            throw error;
        }
    }

    /**
     * ดึงคำถามใน Expert Session
     */
    async getSessionQuestions(sessionId) {
        try {
            const result = await db.query(
                `SELECT eq.*, u.username
                 FROM expert_questions eq
                 JOIN users u ON eq.user_id = u.id
                 WHERE eq.session_id = $1
                 ORDER BY eq.upvotes DESC, eq.created_at ASC`,
                [sessionId]
            );

            return result.rows;
        } catch (error) {
            console.error('Failed to get session questions:', error);
            throw error;
        }
    }

    /**
     * สร้างการแจ้งเตือนสำหรับฟอรัม
     */
    async createNotification(userId, type, relatedId, message) {
        try {
            await db.query(
                `INSERT INTO forum_notifications 
                 (user_id, notification_type, related_id, message)
                 VALUES ($1, $2, $3, $4)`,
                [userId, type, relatedId, message]
            );
        } catch (error) {
            console.error('Failed to create notification:', error);
        }
    }

    /**
     * ดึงการแจ้งเตือนของผู้ใช้
     */
    async getNotifications(userId, limit = 20) {
        try {
            const result = await db.query(
                `SELECT fn.*
                 FROM forum_notifications fn
                 WHERE fn.user_id = $1 AND fn.is_read = false
                 ORDER BY fn.created_at DESC
                 LIMIT $2`,
                [userId, limit]
            );

            return result.rows;
        } catch (error) {
            console.error('Failed to get notifications:', error);
            throw error;
        }
    }

    /**
     * ทำเครื่องหมายว่าอ่านการแจ้งเตือนแล้ว
     */
    async markNotificationsRead(userId) {
        try {
            await db.query(
                'UPDATE forum_notifications SET is_read = true WHERE user_id = $1',
                [userId]
            );
        } catch (error) {
            console.error('Failed to mark notifications as read:', error);
        }
    }
}

module.exports = CommunityForum;
