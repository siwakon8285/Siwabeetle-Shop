/**
 * GDPR Compliance System for Siwabeetle Shop
 * ระบบปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล GDPR
 */

const db = require('./db');
const crypto = require('crypto');

class GDPRCompliance {
    constructor() {
        this.dataRetentionPeriods = {
            user_accounts: '7_years_after_deletion',
            orders: '7_years',
            analytics: '25_months',
            marketing_consent: 'until_withdrawal'
        };
    }

    /**
     * บันทึกความยินยอมของผู้ใช้
     */
    async recordConsent(userId, consentType, granted, ipAddress = null, userAgent = null) {
        try {
            await db.query(
                `INSERT INTO user_consent 
                 (user_id, consent_type, granted, ip_address, user_agent)
                 VALUES ($1, $2, $3, $4, $5)
                 ON CONFLICT (user_id, consent_type) 
                 DO UPDATE SET 
                     granted = EXCLUDED.granted,
                     granted_at = EXCLUDED.granted_at,
                     ip_address = EXCLUDED.ip_address,
                     user_agent = EXCLUDED.user_agent`,
                [userId, consentType, granted, ipAddress, userAgent]
            );

            console.log(`Consent recorded: User ${userId}, ${consentType} = ${granted}`);
        } catch (error) {
            console.error('Failed to record consent:', error);
            throw error;
        }
    }

    /**
     * ตรวจสอบความยินยอมของผู้ใช้
     */
    async getConsentStatus(userId, consentType) {
        try {
            const result = await db.query(
                'SELECT granted, granted_at FROM user_consent WHERE user_id = $1 AND consent_type = $2',
                [userId, consentType]
            );

            return result.rows[0] || null;
        } catch (error) {
            console.error('Failed to get consent status:', error);
            throw error;
        }
    }

    /**
     * ดึงข้อมูลผู้ใช้ทั้งหมด (GDPR Right to Access)
     */
    async getUserData(userId) {
        try {
            // ตรวจสอบความยินยอมก่อน
            const consent = await this.getConsentStatus(userId, 'privacy_policy');
            if (!consent || !consent.granted) {
                throw new Error('User has not consented to data processing');
            }

            const userData = {};

            // ข้อมูลพื้นฐานผู้ใช้
            const userResult = await db.query(
                'SELECT id, username, email, phone, address, created_at FROM users WHERE id = $1',
                [userId]
            );
            userData.basic_info = userResult.rows[0];

            // ประวัติการสั่งซื้อ
            const ordersResult = await db.query(
                'SELECT * FROM orders WHERE user_id = $1 ORDER BY order_date DESC',
                [userId]
            );
            userData.orders = ordersResult.rows;

            // รายการสินค้าในคำสั่งซื้อ
            if (userData.orders.length > 0) {
                const orderIds = userData.orders.map(order => order.id);
                const itemsResult = await db.query(
                    'SELECT * FROM order_items WHERE order_id = ANY($1)',
                    [orderIds]
                );
                userData.order_items = itemsResult.rows;
            }

            // ความยินยอมทั้งหมด
            const consentResult = await db.query(
                'SELECT * FROM user_consent WHERE user_id = $1',
                [userId]
            );
            userData.consents = consentResult.rows;

            // ข้อมูลการเจริญเติบโตของด้วง
            const growthResult = await db.query(
                'SELECT * FROM beetle_growth_tracker WHERE user_id = $1 ORDER BY recorded_at DESC',
                [userId]
            );
            userData.growth_tracker = growthResult.rows;

            // โพสต์ในฟอรัม
            const forumResult = await db.query(
                'SELECT * FROM forum_posts WHERE user_id = $1 ORDER BY created_at DESC',
                [userId]
            );
            userData.forum_posts = forumResult.rows;

            // บันทึกการเข้าถึงข้อมูล
            await this.logDataAccess(userId, 'data_export', 'User requested data export');

            return userData;
        } catch (error) {
            console.error('Failed to get user data:', error);
            throw error;
        }
    }

    /**
     * ลบข้อมูลผู้ใช้ (GDPR Right to Erasure)
     */
    async deleteUserData(userId, deleteReason = 'user_request') {
        try {
            // ตรวจสอบความยินยอม
            const consent = await this.getConsentStatus(userId, 'privacy_policy');
            if (!consent || !consent.granted) {
                throw new Error('User has not consented to data processing');
            }

            // เริ่ม transaction
            await db.query('BEGIN');

            try {
                // บันทึกการลบข้อมูล
                const userData = await this.getUserData(userId);
                await this.logDataDeletion(userId, deleteReason, userData);

                // Anonymize ข้อมูลผู้ใช้ (ไม่ลบทั้งหมดเพื่อความสมบูรณ์ของข้อมูล)
                await db.query(
                    `UPDATE users 
                     SET username = 'deleted_user_' || SUBSTRING(MD5(id::text), 1, 8),
                         email = 'deleted_' || SUBSTRING(MD5(id::text), 1, 8) || '@deleted.com',
                         phone = NULL,
                         address = NULL
                     WHERE id = $1`,
                    [userId]
                );

                // ลบข้อมูลที่ลบได้
                await db.query('DELETE FROM user_consent WHERE user_id = $1', [userId]);
                await db.query('DELETE FROM beetle_growth_tracker WHERE user_id = $1', [userId]);
                await db.query('DELETE FROM forum_notifications WHERE user_id = $1', [userId]);
                await db.query('DELETE FROM expert_questions WHERE user_id = $1', [userId]);

                // ยืนยัน transaction
                await db.query('COMMIT');

                console.log(`User data deleted/anonymized: User ${userId}, Reason: ${deleteReason}`);
                return { success: true, message: 'Data deleted successfully' };

            } catch (error) {
                await db.query('ROLLBACK');
                throw error;
            }

        } catch (error) {
            console.error('Failed to delete user data:', error);
            throw error;
        }
    }

    /**
     * แก้ไขข้อมูลผู้ใช้ (GDPR Right to Rectification)
     */
    async updateUserData(userId, updateData) {
        try {
            // ตรวจสอบความยินยอม
            const consent = await this.getConsentStatus(userId, 'privacy_policy');
            if (!consent || !consent.granted) {
                throw new Error('User has not consented to data processing');
            }

            const allowedFields = ['username', 'email', 'phone', 'address'];
            const updates = [];
            const values = [userId];
            let paramCount = 2;

            for (const [field, value] of Object.entries(updateData)) {
                if (allowedFields.includes(field)) {
                    updates.push(`${field} = $${paramCount}`);
                    values.push(value);
                    paramCount++;
                }
            }

            if (updates.length === 0) {
                throw new Error('No valid fields to update');
            }

            const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $1`;
            
            await db.query(query, values);

            // บันทึกการแก้ไข
            await this.logDataAccess(userId, 'data_update', `Updated fields: ${Object.keys(updateData).join(', ')}`);

            console.log(`User data updated: User ${userId}, Fields: ${Object.keys(updateData).join(', ')}`);
            return { success: true, message: 'Data updated successfully' };

        } catch (error) {
            console.error('Failed to update user data:', error);
            throw error;
        }
    }

    /**
     * จำกัดการประมวลผลข้อมูล (GDPR Right to Restrict Processing)
     */
    async restrictProcessing(userId, restrictionType) {
        try {
            // เพิ่ม flag สำหรับจำกัดการประมวลผล
            await db.query(
                `UPDATE users 
                 SET processing_restricted = true, 
                     restriction_type = $2,
                     restriction_date = NOW()
                 WHERE id = $1`,
                [userId, restrictionType]
            );

            // บันทึกการจำกัด
            await this.logDataAccess(userId, 'processing_restriction', `Type: ${restrictionType}`);

            console.log(`Processing restricted: User ${userId}, Type: ${restrictionType}`);
            return { success: true, message: 'Processing restricted successfully' };

        } catch (error) {
            console.error('Failed to restrict processing:', error);
            throw error;
        }
    }

    /**
     * ส่งออกข้อมูลเป็น JSON (GDPR Data Portability)
     */
    async exportUserData(userId, format = 'json') {
        try {
            const userData = await this.getUserData(userId);

            if (format === 'json') {
                return {
                    export_date: new Date().toISOString(),
                    user_id: userId,
                    data: userData
                };
            } else if (format === 'csv') {
                // สร้าง CSV format
                return this.convertToCSV(userData);
            } else {
                throw new Error('Unsupported export format');
            }

        } catch (error) {
            console.error('Failed to export user data:', error);
            throw error;
        }
    }

    /**
     * แปลงข้อมูลเป็น CSV format
     */
    convertToCSV(userData) {
        const csvData = [];

        // ข้อมูลพื้นฐาน
        if (userData.basic_info) {
            csvData.push(['basic_info', 'username', userData.basic_info.username]);
            csvData.push(['basic_info', 'email', userData.basic_info.email]);
            csvData.push(['basic_info', 'created_at', userData.basic_info.created_at]);
        }

        // คำสั่งซื้อ
        userData.orders.forEach(order => {
            csvData.push(['orders', 'order_id', order.id]);
            csvData.push(['orders', 'total_amount', order.total_amount]);
            csvData.push(['orders', 'order_date', order.order_date]);
        });

        // แปลงเป็น CSV string
        return csvData.map(row => row.join(',')).join('\n');
    }

    /**
     * บันทึกการเข้าถึงข้อมูล
     */
    async logDataAccess(userId, action, details) {
        try {
            await db.query(
                `INSERT INTO audit_logs 
                 (user_id, action, details, ip_address, user_agent)
                 VALUES ($1, $2, $3, $4, $5)`,
                [userId, action, details, null, null]
            );
        } catch (error) {
            console.error('Failed to log data access:', error);
        }
    }

    /**
     * บันทึกการลบข้อมูล
     */
    async logDataDeletion(userId, reason, deletedData) {
        try {
            await db.query(
                `INSERT INTO data_deletion_logs 
                 (user_id, reason, deleted_data_json, deleted_at)
                 VALUES ($1, $2, $3, NOW())`,
                [userId, reason, JSON.stringify(deletedData)]
            );
        } catch (error) {
            console.error('Failed to log data deletion:', error);
        }
    }

    /**
     * ทำความสะอาดข้อมูลเก่า (Data Retention)
     */
    async cleanupOldData() {
        try {
            console.log('Starting data cleanup process...');

            // ลบข้อมูล analytics ที่เกิน 25 เดือน
            await db.query(
                `DELETE FROM analytics_data 
                 WHERE created_at < NOW() - INTERVAL '25 months'`
            );

            // ลบข้อมูลที่ไม่ได้ใช้งานมานาน
            await db.query(
                `DELETE FROM user_sessions 
                 WHERE last_activity < NOW() - INTERVAL '30 days'`
            );

            // อัปเดตข้อมูลการยินยอนที่หมดอายุ
            await db.query(
                `UPDATE user_consent 
                 SET granted = false 
                 WHERE granted_at < NOW() - INTERVAL '2 years' 
                 AND consent_type = 'marketing'`
            );

            console.log('Data cleanup completed successfully');
        } catch (error) {
            console.error('Data cleanup failed:', error);
        }
    }

    /**
     * สร้างรายงานความเป็นส่วนตัว
     */
    async generatePrivacyReport() {
        try {
            const report = {
                generated_at: new Date().toISOString(),
                total_users: 0,
                users_with_consent: 0,
                data_processing_records: [],
                recent_deletions: [],
                data_retention_status: {}
            };

            // จำนวนผู้ใช้ทั้งหมด
            const userCount = await db.query('SELECT COUNT(*) as count FROM users');
            report.total_users = parseInt(userCount.rows[0].count);

            // ผู้ใช้ที่ให้ความยินยอม
            const consentCount = await db.query(
                'SELECT COUNT(DISTINCT user_id) as count FROM user_consent WHERE granted = true'
            );
            report.users_with_consent = parseInt(consentCount.rows[0].count);

            // บันทึกการประมวลผลข้อมูล
            const processingRecords = await db.query('SELECT * FROM data_processing_records');
            report.data_processing_records = processingRecords.rows;

            // การลบข้อมูลล่าสุด
            const recentDeletions = await db.query(
                'SELECT * FROM data_deletion_logs WHERE deleted_at > NOW() - INTERVAL \'30 days\''
            );
            report.recent_deletions = recentDeletions.rows;

            return report;
        } catch (error) {
            console.error('Failed to generate privacy report:', error);
            throw error;
        }
    }

    /**
     * ตรวจสอบความสอดคล้องกับ GDPR
     */
    async checkCompliance() {
        const issues = [];

        try {
            // ตรวจสอบว่ามีการบันทึกความยินยอมหรือไม่
            const consentCheck = await db.query(
                'SELECT COUNT(*) as count FROM users WHERE id NOT IN (SELECT DISTINCT user_id FROM user_consent)'
            );
            
            if (parseInt(consentCheck.rows[0].count) > 0) {
                issues.push('Some users lack consent records');
            }

            // ตรวจสอบการเข้ารหัสข้อมูล
            const encryptionCheck = await db.query('SELECT COUNT(*) as count FROM encryption_keys WHERE is_active = true');
            if (parseInt(encryptionCheck.rows[0].count) === 0) {
                issues.push('No active encryption keys found');
            }

            // ตรวจสอบการบันทึก audit
            const auditCheck = await db.query(
                'SELECT COUNT(*) as count FROM audit_logs WHERE created_at > NOW() - INTERVAL \'7 days\''
            );
            if (parseInt(auditCheck.rows[0].count) === 0) {
                issues.push('No audit logs found in the last 7 days');
            }

            return {
                compliant: issues.length === 0,
                issues: issues,
                checked_at: new Date().toISOString()
            };

        } catch (error) {
            console.error('Compliance check failed:', error);
            return {
                compliant: false,
                issues: ['Compliance check failed to complete'],
                error: error.message
            };
        }
    }
}

module.exports = GDPRCompliance;
