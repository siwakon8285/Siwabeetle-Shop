/**
 * Beetle Care Guide System
 * ระบบคู่มือการเลี้ยงดูด้วงและฟีเจอร์เฉพาะทาง
 */

const db = require('./db');

class BeetleCareSystem {
    constructor() {
        this.careGuides = new Map();
        this.loadDefaultGuides();
    }

    /**
     * โหลดคู่มือการเลี้ยงดูเริ่มต้น
     */
    loadDefaultGuides() {
        const defaultGuides = [
            {
                species: "ด้วงเฮอร์คิวลิส",
                title: "คู่มือการเลี้ยงดูด้วงเฮอร์คิวลิส",
                content: `# การเลี้ยงดูด้วงเฮอร์คิวลิส

## ข้อมูลทั่วไป
ด้วงเฮอร์คิวลิส (Dynastes hercules) เป็นด้วงที่ใหญ่ที่สุดในโลก พบในป่าฝนของอเมริกากลาง

## อาหาร
- **ตัวเต็มวัย**: ผลไม้ที่มีน้ำตาลสูง เช่น กล้วย, แอปเปิ้ล, มะม่วง
- **ตัวอ่อน**: ไม้เน่าที่มีคุณค่าทางโปรตีนสูง
- **ความถี่**: ให้อาหารทุก 2-3 วัน

## สภาพแวดล้อม
- **อุณหภูมิ**: 22-28°C
- **ความชื้น**: 70-80%
- **ที่อยู่**: กล่องไม้หรือพลาสติกที่มีรูระบายอากาศ

## วงจรชีวิต
- **ไข่**: 2-4 สัปดาห์
- **ตัวอ่อน**: 1-2 ปี (ขึ้นอยู่กับอุณหภูมิ)
- **ดักแด้**: 2-3 เดือน
- **ตัวเต็มวัย**: 6-12 เดือน

## ปัญหาที่พบบ่อย
- **รอยแตกบนตัว**: เกิดจากความชื้นต่ำเกินไป
- **ไม่กินอาหาร**: อาจเป็นเพราะอุณหภูมิไม่เหมาะสม
- **ตัวอ่อนตาย**: มักเกิดจากเชื้อราในอาหาร`,
                difficulty_level: "beginner",
                estimated_lifespan: "ตัวเต็มวัย 6-12 เดือน",
                temperature_range: "22-28°C",
                humidity_range: "70-80%",
                food_recommendations: "กล้วยสุก, แอปเปิ้ล, มะม่วง, น้ำผึ้งเจือจาง",
                common_issues: "รอยแตก, ไม่กินอาหาร, เชื้อราในอาหาร"
            },
            {
                species: "ด้วงสามเขาคอคาซัส",
                title: "การดูแลด้วงสามเขาคอคาซัส",
                content: `# การเลี้ยงดูด้วงสามเขาคอคาซัส

## ข้อมูลทั่วไป
ด้วงสามเขาคอคาซัส (Chalcosoma caucasus) เป็นด้วงที่มีเขาใหญ่โดดเด่น พบในเอเชียตะวันออกเฉียงใต้

## การเลือกตัวอ่อน
- เลือกตัวอ่อนที่มีน้ำหนักมากกว่า 50 กรัม
- สีขาวนวลและไม่มีรอยดำ
- มีการเคลื่อนไหวที่กระฉับกระเฉง

## อาหารสำหรับตัวอ่อน
- **พื้นฐาน**: ไม้เน่าที่ผ่านการหมักแล้ว
- **เสริม**: อาหารเสริมที่มีโปรตีนสูง
- **ความลึก**: กล่องที่มีความลึกอย่างน้อย 15 ซม.

## การเปลี่ยนเป็นดักแด้
- สัญญาณ: ตัวอ่อนมีสีเหลืองอ่อนและเคลื่อนไหวน้อยลง
- สร้างห้อง: ใช้ดินทรายผสมอัดแน่น
- ระยะเวลา: 2-4 เดือน

## การดูแลตัวเต็มวัย
- **อาหาร**: ผลไม้น้ำตาลสูง
- **การผสมพันธุ์**: ตัวผู้ต้องมีเขาใหญ่และแข็งแรง
- **วางไข่**: ในดินทรายที่มีความชื้นสูง`,
                difficulty_level: "intermediate",
                estimated_lifespan: "ตัวเต็มวัย 4-8 เดือน",
                temperature_range: "24-30°C",
                humidity_range: "75-85%",
                food_recommendations: "ไม้เน่าคุณภาพสูง, อาหารเสริมโปรตีน",
                common_issues: "เขาหัก, ไม่ผสมพันธุ์, ไข่ไม่ฟัก"
            },
            {
                species: "ด้วงคีมฟันเลือย",
                title: "คู่มือดูแลด้วงคีมฟันเลือย",
                content: `# การเลี้ยงดูด้วงคีมฟันเลือย

## ข้อมูลทั่วไป
ด้วงคีมฟันเลือย (Odontolabis delessertii) เป็นด้วงที่มีกรามใหญ่โดดเด่น พบในป่าของมาเลเซีย

## ลักษณะเด่น
- ตัวผู้มีกรามใหญ่และสวยงาม
- ตัวเมียมีขนาดเล็กกว่าแต่มีอายุยืนกว่า
- มีสีดำเป็นเงางาม

## การเลือกซื้อ
- ตัวผู้: เลือกที่กรามใหญ่สมส่วนและไม่มีรอยแตก
- ตัวเมีย: เลือกที่มีขนาดใหญ่และอ้วน
- ตัวอ่อน: เลือกที่มีน้ำหนักมากและสีขาวสดใส

## การเลี้ยงดู
- **อุณหภูมิ**: 23-27°C
- **ความชื้น**: 65-75%
- **อาหาร**: ผลไม้สุกและน้ำผึ้งเจือจาง

## การผสมพันธุ์
- อัตราส่วน: ตัวผู้ 1 : ตัวเมีย 2-3
- ระยะเวลา: 2-3 วันหลังจากใส่ด้วยคู่กัน
- การดูแล: ให้อาหารเพิ่มเพื่อพลังงาน`,
                difficulty_level: "beginner",
                estimated_lifespan: "ตัวเต็มวัย 8-15 เดือน",
                temperature_range: "23-27°C",
                humidity_range: "65-75%",
                food_recommendations: "กล้วย, ส้ม, แอปเปิ้ล, น้ำผึ้ง",
                common_issues: "กรามหัก, ไม่กินอาหาร, ตัวเล็ก"
            }
        ];

        defaultGuides.forEach(guide => {
            this.careGuides.set(guide.species, guide);
        });
    }

    /**
     * ดึงข้อมูลคู่มือการเลี้ยงดู
     */
    getCareGuide(species) {
        return this.careGuides.get(species) || null;
    }

    /**
     * ดึงข้อมูลคู่มือทั้งหมด
     */
    getAllCareGuides() {
        return Array.from(this.careGuides.values());
    }

    /**
     * บันทึกข้อมูลการเจริญเติบโตของด้วง
     */
    async recordGrowth(userId, beetleData) {
        try {
            const result = await db.query(
                `INSERT INTO beetle_growth_tracker 
                 (user_id, beetle_id, species, stage, current_size, weight, temperature, humidity, last_fed, notes, image_url)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                 RETURNING id`,
                [
                    userId,
                    beetleData.beetleId,
                    beetleData.species,
                    beetleData.stage,
                    beetleData.currentSize,
                    beetleData.weight,
                    beetleData.temperature,
                    beetleData.humidity,
                    beetleData.lastFed,
                    beetleData.notes,
                    beetleData.imageUrl
                ]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Failed to record growth:', error);
            throw error;
        }
    }

    /**
     * ดึงข้อมูลการเจริญเติบโตของด้วง
     */
    async getGrowthHistory(userId, beetleId = null) {
        try {
            let query = 'SELECT * FROM beetle_growth_tracker WHERE user_id = $1';
            let params = [userId];
            
            if (beetleId) {
                query += ' AND beetle_id = $2 ORDER BY recorded_at DESC';
                params.push(beetleId);
            } else {
                query += ' ORDER BY recorded_at DESC';
            }
            
            const result = await db.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('Failed to get growth history:', error);
            throw error;
        }
    }

    /**
     * วิเคราะห์ข้อมูลการเจริญเติบโต
     */
    analyzeGrowth(growthData) {
        if (growthData.length < 2) {
            return {
                status: 'insufficient_data',
                message: 'ต้องการข้อมูลอย่างน้อย 2 ครั้งเพื่อวิเคราะห์'
            };
        }

        const sortedData = growthData.sort((a, b) => 
            new Date(a.recorded_at) - new Date(b.recorded_at)
        );

        const firstRecord = sortedData[0];
        const lastRecord = sortedData[sortedData.length - 1];
        
        const sizeGrowth = lastRecord.current_size - firstRecord.current_size;
        const weightGrowth = lastRecord.weight - firstRecord.weight;
        const daysDiff = Math.ceil((new Date(lastRecord.recorded_at) - new Date(firstRecord.recorded_at)) / (1000 * 60 * 60 * 24));
        
        const sizeGrowthRate = daysDiff > 0 ? (sizeGrowth / daysDiff).toFixed(3) : 0;
        const weightGrowthRate = daysDiff > 0 ? (weightGrowth / daysDiff).toFixed(3) : 0;

        return {
            status: 'success',
            analysis: {
                totalSizeGrowth: sizeGrowth,
                totalWeightGrowth: weightGrowth,
                sizeGrowthRate: parseFloat(sizeGrowthRate),
                weightGrowthRate: parseFloat(weightGrowthRate),
                daysTracked: daysDiff,
                currentStage: lastRecord.stage,
                recommendations: this.getGrowthRecommendations(lastRecord, sizeGrowthRate, weightGrowthRate)
            }
        };
    }

    /**
     * ให้คำแนะนำการเลี้ยงดูจากข้อมูลการเจริญเติบโต
     */
    getGrowthRecommendations(currentData, sizeRate, weightRate) {
        const recommendations = [];

        // ตรวจสอบอุณหภูมิ
        if (currentData.temperature < 22) {
            recommendations.push('อุณหภูมิต่ำเกินไป ควรเพิ่มอุณหภูมิเป็น 22-28°C เพื่อการเจริญเติบโตที่ดี');
        } else if (currentData.temperature > 30) {
            recommendations.push('อุณหภูมิสูงเกินไป ควรลดอุณหภูมิเพื่อป้องกันความเครียดต่อด้วง');
        }

        // ตรวจสอบความชื้น
        if (currentData.humidity < 60) {
            recommendations.push('ความชื้นต่ำเกินไป ควรเพิ่มความชื้นเป็น 70-80% เพื่อสุขภาพที่ดี');
        } else if (currentData.humidity > 90) {
            recommendations.push('ความชื้นสูงเกินไป อาจเกิดเชื้อราได้ ควรระบายอากาศให้ดีขึ้น');
        }

        // ตรวจสอบอัตราการเจริญเติบโต
        if (sizeRate < 0.01 && currentData.stage !== 'adult') {
            recommendations.push('อัตราการเจริญเติบโตช้า ควรตรวจสอบอาหารและสภาพแวดล้อม');
        }

        // ตรวจสอดูการให้อาหาร
        const lastFed = new Date(currentData.last_fed);
        const daysSinceFed = Math.ceil((new Date() - lastFed) / (1000 * 60 * 60 * 24));
        
        if (daysSinceFed > 5) {
            recommendations.push('ไม่ได้ให้อาหารมานาน ควรให้อาหารทุก 2-3 วัน');
        }

        return recommendations;
    }

    /**
     * สร้างรายงานการเจริญเติบโตแบบ PDF
     */
    async generateGrowthReport(userId, beetleId) {
        // ต้องติดตั้ง PDF library เช่น puppeteer หรือ jsPDF
        // นี่คือตัวอย่างโครงสร้างรายงาน
        
        const growthData = await this.getGrowthHistory(userId, beetleId);
        const analysis = this.analyzeGrowth(growthData);
        const careGuide = this.getCareGuide(growthData[0]?.species);

        return {
            beetleId,
            species: growthData[0]?.species,
            records: growthData,
            analysis,
            careGuide,
            generatedAt: new Date().toISOString()
        };
    }
}

module.exports = BeetleCareSystem;
