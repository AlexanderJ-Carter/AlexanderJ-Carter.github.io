// 农历计算库 - 更准确的版本
class LunarCalendar {
    // 1900-2100年的农历数据（每个数据包含该年12个月的大小月信息和闰月信息）
    static lunarInfo = [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0,
        0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540,
        0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50,
        0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0,
        0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2,
        0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573,
        0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4,
        0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5,
        0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46,
        0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58,
        0x05ac0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50,
        0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0,
        0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260,
        0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0,
        0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0,
        0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63, 0x09370,
        0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0,
        0x0a6d0, 0x055d4, 0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50,
        0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273, 0x06930, 0x07337, 0x06aa0,
        0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, 0x0e968, 0x0d520,
        0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
        0x0a4d0,
    ];

    static solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    static gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    static zhi = [
        '子',
        '丑',
        '寅',
        '卯',
        '辰',
        '巳',
        '午',
        '未',
        '申',
        '酉',
        '戌',
        '亥',
    ];
    static animals = [
        '鼠',
        '牛',
        '虎',
        '兔',
        '龙',
        '蛇',
        '马',
        '羊',
        '猴',
        '鸡',
        '狗',
        '猪',
    ];
    static lunarMonthName = [
        '',
        '正',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九',
        '十',
        '冬',
        '腊',
    ];
    static lunarDayName = [
        '',
        '初一',
        '初二',
        '初三',
        '初四',
        '初五',
        '初六',
        '初七',
        '初八',
        '初九',
        '初十',
        '十一',
        '十二',
        '十三',
        '十四',
        '十五',
        '十六',
        '十七',
        '十八',
        '十九',
        '二十',
        '廿一',
        '廿二',
        '廿三',
        '廿四',
        '廿五',
        '廿六',
        '廿七',
        '廿八',
        '廿九',
        '三十',
    ];

    static festivals = {
        '1-1': '春节',
        '1-15': '元宵节',
        '5-5': '端午节',
        '7-7': '七夕节',
        '7-15': '中元节',
        '8-15': '中秋节',
        '9-9': '重阳节',
        '12-8': '腊八节',
        '12-23': '小年',
        '12-30': '除夕',
    };

    static solarTerms = [
        '小寒',
        '大寒',
        '立春',
        '雨水',
        '惊蛰',
        '春分',
        '清明',
        '谷雨',
        '立夏',
        '小满',
        '芒种',
        '夏至',
        '小暑',
        '大暑',
        '立秋',
        '处暑',
        '白露',
        '秋分',
        '寒露',
        '霜降',
        '立冬',
        '小雪',
        '大雪',
        '冬至',
    ];

    // 判断是否为闰年
    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // 获取某年某月的天数
    static getDaysInMonth(year, month) {
        if (month === 2 && this.isLeapYear(year)) {
            return 29;
        }
        return this.solarMonth[month - 1];
    }

    // 获取农历年的总天数
    static getLunarYearDays(year) {
        let sum = 348;
        for (let i = 0x8000; i > 0x8; i >>= 1) {
            sum += this.lunarInfo[year - 1900] & i ? 1 : 0;
        }
        return sum + this.getLeapDays(year);
    }

    // 获取农历年闰月的天数
    static getLeapDays(year) {
        if (this.getLeapMonth(year)) {
            return this.lunarInfo[year - 1900] & 0x10000 ? 30 : 29;
        }
        return 0;
    }

    // 获取农历年闰月月份
    static getLeapMonth(year) {
        return this.lunarInfo[year - 1900] & 0xf;
    }

    // 获取农历月份的天数
    static getLunarMonthDays(year, month) {
        return this.lunarInfo[year - 1900] & (0x10000 >> month) ? 30 : 29;
    } // 公历转农历 - 修正版本
    static solarToLunar(solarYear, solarMonth, solarDay) {
        if (solarYear < 1900 || solarYear > 2100) {
            return null;
        }

        // 1900年1月31日是农历1900年正月初一
        const baseDate = new Date(1900, 0, 31);
        const targetDate = new Date(solarYear, solarMonth - 1, solarDay);
        const offset = Math.floor(
            (targetDate - baseDate) / (24 * 60 * 60 * 1000)
        );

        let lunarYear = 1900;
        let lunarMonth = 1;
        let lunarDay = 1;
        let remainingDays = offset;

        // 逐年计算
        while (lunarYear < 2100) {
            const yearDays = this.getLunarYearDays(lunarYear);
            if (remainingDays < yearDays) break;
            remainingDays -= yearDays;
            lunarYear++;
        }

        // 逐月计算
        let isLeap = false;
        const leapMonth = this.getLeapMonth(lunarYear);
        lunarMonth = 1;

        while (lunarMonth <= 12) {
            let monthDays;

            // 如果当前月是闰月
            if (leapMonth > 0 && lunarMonth === leapMonth + 1 && !isLeap) {
                isLeap = true;
                monthDays = this.getLeapDays(lunarYear);
                lunarMonth--;
            } else {
                monthDays = this.getLunarMonthDays(lunarYear, lunarMonth);
            }

            if (remainingDays < monthDays) break;

            remainingDays -= monthDays;

            if (isLeap && lunarMonth === leapMonth) {
                isLeap = false;
            }

            lunarMonth++;
        }

        lunarDay = remainingDays + 1;

        // 计算干支年
        const ganIndex = (lunarYear - 4) % 10;
        const zhiIndex = (lunarYear - 4) % 12;
        const ganzhi = this.gan[ganIndex] + this.zhi[zhiIndex];
        const animal = this.animals[zhiIndex];

        // 格式化月份名称
        let lunarMonthName = this.lunarMonthName[lunarMonth];
        if (isLeap) {
            lunarMonthName = '闰' + lunarMonthName;
        }

        // 格式化日期名称
        const lunarDayName = this.lunarDayName[lunarDay];

        // 检查是否有传统节日
        const festivalKey = `${lunarMonth}-${lunarDay}`;
        const festival = this.festivals[festivalKey];
        return {
            lunarYear,
            lunarMonth,
            lunarDay,
            lunarMonthName,
            lunarDayName,
            ganzhi,
            animal,
            isLeap,
            festival,
        };
    }

    // 农历转公历
    static lunarToSolar(lunarYear, lunarMonth, lunarDay, isLeap = false) {
        if (lunarYear < 1900 || lunarYear > 2100) {
            return null;
        }

        let offset = 0;

        // 计算从农历1900年正月初一到指定农历日期的天数
        for (let i = 1900; i < lunarYear; i++) {
            offset += this.getLunarYearDays(i);
        }

        let leapMonth = this.getLeapMonth(lunarYear);
        for (let i = 1; i < lunarMonth; i++) {
            offset += this.getLunarMonthDays(lunarYear, i);
            if (i === leapMonth) {
                offset += this.getLeapDays(lunarYear);
            }
        }

        if (isLeap && lunarMonth === leapMonth) {
            offset += this.getLunarMonthDays(lunarYear, lunarMonth);
        }

        offset += lunarDay;

        // 1900年1月31日是农历1900年正月初一
        const baseDate = new Date(1900, 0, 31);
        const resultDate = new Date(
            baseDate.getTime() + (offset - 1) * 24 * 60 * 60 * 1000
        );

        return {
            solarYear: resultDate.getFullYear(),
            solarMonth: resultDate.getMonth() + 1,
            solarDay: resultDate.getDate(),
        };
    }

    // 获取节气
    static getSolarTerm(year, month, day) {
        // 简化的节气计算，实际应用中需要更精确的计算
        const solarTermDates = {
            1: [6, 20],
            2: [4, 19],
            3: [6, 21],
            4: [5, 20],
            5: [6, 21],
            6: [6, 22],
            7: [7, 23],
            8: [8, 23],
            9: [8, 23],
            10: [8, 24],
            11: [7, 22],
            12: [7, 22],
        };

        const dates = solarTermDates[month];
        if (!dates) return null;

        if (day === dates[0]) {
            return this.solarTerms[(month - 1) * 2];
        } else if (day === dates[1]) {
            return this.solarTerms[(month - 1) * 2 + 1];
        }

        return null;
    }

    // 获取星座
    static getConstellation(month, day) {
        const constellations = [
            '水瓶座',
            '双鱼座',
            '白羊座',
            '金牛座',
            '双子座',
            '巨蟹座',
            '狮子座',
            '处女座',
            '天秤座',
            '天蝎座',
            '射手座',
            '摩羯座',
        ];

        const dates = [20, 19, 21, 21, 21, 22, 23, 23, 23, 24, 23, 22];

        if (day < dates[month - 1]) {
            return constellations[month - 1];
        } else {
            return constellations[month % 12];
        }
    }

    // 获取今日信息
    static getTodayInfo() {
        const today = new Date();
        const lunar = this.solarToLunar(
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate()
        );
        const solarTerm = this.getSolarTerm(
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate()
        );
        const constellation = this.getConstellation(
            today.getMonth() + 1,
            today.getDate()
        );

        return {
            solar: {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate(),
                weekday: today.getDay(),
            },
            lunar,
            solarTerm,
            constellation,
        };
    }

    // 获取某月的农历信息
    static getMonthInfo(year, month) {
        const daysInMonth = this.getDaysInMonth(year, month);
        const monthInfo = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const lunar = this.solarToLunar(year, month, day);
            const solarTerm = this.getSolarTerm(year, month, day);

            monthInfo.push({
                solarDay: day,
                lunar,
                solarTerm,
            });
        }

        return monthInfo;
    }
}

// 导出供全局使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LunarCalendar;
} else {
    window.LunarCalendar = LunarCalendar;
}
