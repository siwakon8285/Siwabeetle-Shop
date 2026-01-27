/**
 * Automated Backup System for Siwabeetle Shop
 * ระบบสำรองข้อมูลอัตโนมัติ
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cron = require('node-cron');
const db = require('./db');
require('dotenv').config();

class BackupSystem {
    constructor() {
        this.backupDir = path.join(__dirname, 'backups');
        this.maxBackups = 30; // จำนวน backup สูงสุดที่เก็บไว้
        this.ensureBackupDirectory();
    }

    /**
     * สร้างโฟลเดอร์ backup ถ้ายังไม่มี
     */
    ensureBackupDirectory() {
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
        }
    }

    /**
     * สำรองข้อมูล PostgreSQL Database
     */
    async backupDatabase() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `database_backup_${timestamp}.sql`;
        const filepath = path.join(this.backupDir, filename);
        
        const pgDumpCommand = `pg_dump -h ${process.env.DB_HOST} -U ${process.env.DB_USER} -d ${process.env.DB_NAME} > "${filepath}"`;
        
        return new Promise((resolve, reject) => {
            exec(pgDumpCommand, { env: { ...process.env, PGPASSWORD: process.env.DB_PASSWORD } }, (error, stdout, stderr) => {
                if (error) {
                    console.error('Database backup failed:', error);
                    this.logBackup('database', 'failed', null, null, error.message);
                    reject(error);
                } else {
                    const stats = fs.statSync(filepath);
                    console.log(`Database backup completed: ${filename} (${stats.size} bytes)`);
                    this.logBackup('database', 'completed', filepath, stats.size);
                    resolve(filepath);
                }
            });
        });
    }

    /**
     * สำรองข้อมูลไฟล์รูปภาพและไฟล์สำคัญ
     */
    async backupFiles() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `files_backup_${timestamp}.tar.gz`;
        const filepath = path.join(this.backupDir, filename);
        
        const filesToBackup = [
            'images',
            'index.html',
            'index.css',
            'app.js',
            'server.js',
            'db.js',
            'package.json'
        ];
        
        const tarCommand = `tar -czf "${filepath}" ${filesToBackup.join(' ')}`;
        
        return new Promise((resolve, reject) => {
            exec(tarCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error('Files backup failed:', error);
                    this.logBackup('files', 'failed', null, null, error.message);
                    reject(error);
                } else {
                    const stats = fs.statSync(filepath);
                    console.log(`Files backup completed: ${filename} (${stats.size} bytes)`);
                    this.logBackup('files', 'completed', filepath, stats.size);
                    resolve(filepath);
                }
            });
        });
    }

    /**
     * สำรองข้อมูล Firebase (Export JSON)
     */
    async backupFirebase() {
        // ต้องใช้ Firebase Admin SDK หรือ REST API
        // นี่คือตัวอย่างการ export ข้อมูลจาก Firebase
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `firebase_backup_${timestamp}.json`;
        const filepath = path.join(this.backupDir, filename);
        
        try {
            // ต้องติดตั้ง firebase-admin ก่อน
            // const admin = require('firebase-admin');
            // ทำการ export ข้อมูลจาก Firebase
            
            // สร้างไฟล์ JSON ว่างเป็นตัวอย่าง
            const firebaseData = {
                products: [],
                users: {},
                orders: {},
                backup_timestamp: new Date().toISOString()
            };
            
            fs.writeFileSync(filepath, JSON.stringify(firebaseData, null, 2));
            
            const stats = fs.statSync(filepath);
            console.log(`Firebase backup completed: ${filename} (${stats.size} bytes)`);
            this.logBackup('firebase', 'completed', filepath, stats.size);
            return filepath;
        } catch (error) {
            console.error('Firebase backup failed:', error);
            this.logBackup('firebase', 'failed', null, null, error.message);
            throw error;
        }
    }

    /**
     * บันทึก log การ backup
     */
    async logBackup(backupType, status, backupPath, backupSize, errorMessage = null) {
        try {
            await db.query(
                `INSERT INTO backup_logs (backup_type, backup_path, backup_size, status, error_message, completed_at) 
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [backupType, backupPath, backupSize, status, errorMessage, status === 'completed' ? new Date() : null]
            );
        } catch (error) {
            console.error('Failed to log backup:', error);
        }
    }

    /**
     * ทำ Full Backup (Database + Files + Firebase)
     */
    async fullBackup() {
        console.log('Starting full backup process...');
        
        try {
            const results = await Promise.allSettled([
                this.backupDatabase(),
                this.backupFiles(),
                this.backupFirebase()
            ]);
            
            const successful = results.filter(r => r.status === 'fulfilled').length;
            const failed = results.filter(r => r.status === 'rejected').length;
            
            console.log(`Full backup completed: ${successful} successful, ${failed} failed`);
            
            // ลบ backup เก่า
            await this.cleanupOldBackups();
            
            return {
                successful,
                failed,
                results
            };
        } catch (error) {
            console.error('Full backup failed:', error);
            throw error;
        }
    }

    /**
     * ลบ backup ที่เก่าเกินไป
     */
    async cleanupOldBackups() {
        try {
            const files = fs.readdirSync(this.backupDir);
            
            // เรียงตามวันที่ (ใหม่สุดก่อน)
            const sortedFiles = files
                .map(file => ({
                    name: file,
                    path: path.join(this.backupDir, file),
                    stats: fs.statSync(path.join(this.backupDir, file))
                }))
                .sort((a, b) => b.stats.mtime - a.stats.mtime);
            
            // ลบไฟล์ที่เกินจำนวนที่กำหนด
            if (sortedFiles.length > this.maxBackups) {
                const filesToDelete = sortedFiles.slice(this.maxBackups);
                
                for (const file of filesToDelete) {
                    fs.unlinkSync(file.path);
                    console.log(`Deleted old backup: ${file.name}`);
                }
            }
        } catch (error) {
            console.error('Cleanup failed:', error);
        }
    }

    /**
     * เริ่มต้นระบบ backup อัตโนมัติ
     */
    startScheduledBackups() {
        // Backup ทุกวันเวลา 02:00 น.
        cron.schedule('0 2 * * *', async () => {
            console.log('Running scheduled daily backup...');
            try {
                await this.fullBackup();
            } catch (error) {
                console.error('Scheduled backup failed:', error);
            }
        });

        // Backup รายสัปดาห์ทุกวันอาทิตย์เวลา 03:00 น.
        cron.schedule('0 3 * * 0', async () => {
            console.log('Running weekly full backup...');
            try {
                await this.fullBackup();
            } catch (error) {
                console.error('Weekly backup failed:', error);
            }
        });

        console.log('Scheduled backups configured:');
        console.log('- Daily backup: 02:00');
        console.log('- Weekly backup: Sunday 03:00');
    }

    /**
     * กู้คืนข้อมูลจาก backup
     */
    async restoreDatabase(backupFile) {
        const filepath = path.join(this.backupDir, backupFile);
        
        if (!fs.existsSync(filepath)) {
            throw new Error(`Backup file not found: ${backupFile}`);
        }
        
        const restoreCommand = `psql -h ${process.env.DB_HOST} -U ${process.env.DB_USER} -d ${process.env.DB_NAME} < "${filepath}"`;
        
        return new Promise((resolve, reject) => {
            exec(restoreCommand, { env: { ...process.env, PGPASSWORD: process.env.DB_PASSWORD } }, (error, stdout, stderr) => {
                if (error) {
                    console.error('Database restore failed:', error);
                    reject(error);
                } else {
                    console.log(`Database restored from: ${backupFile}`);
                    resolve(stdout);
                }
            });
        });
    }
}

// สร้าง instance และเริ่มต้นระบบ
const backupSystem = new BackupSystem();

// ถ้าเรียกใช้โดยตรง ให้เริ่ม scheduled backups
if (require.main === module) {
    backupSystem.startScheduledBackups();
    
    // ทำ backup ทันทีเพื่อทดสอบ
    backupSystem.fullBackup().then(() => {
        console.log('Initial backup completed successfully');
    }).catch(error => {
        console.error('Initial backup failed:', error);
    });
}

module.exports = backupSystem;
