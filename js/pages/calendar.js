/**
 * 现代日历系统 - 完整重写版
 * 包含：2025年完整节假日、事件管理、农历显示、倒计时等功能
 */

class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.events = this.loadEvents() || {};
        this.holidays = this.init2025Holidays();
        this.viewMode = 'month'; // month, week, day
        this.importantDates = this.loadImportantDates(); // 纪念日
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCurrentDateDisplay();
        this.renderCalendar();
        this.updateCountdown();
        this.updateStatistics();
        this.renderImportantDates();
        this.startClock();
    }

    /**
     * 初始化2025年完整节假日数据（国务院标准）
     */
    init2025Holidays() {
        return {
            // 元旦：1月1日放假，与周末连休（共3天）
            '2025-01-01': { name: '元旦', type: 'holiday' },
            
            // 春节：1月28日至2月4日放假调休，共8天
            '2025-01-28': { name: '除夕', type: 'holiday' },
            '2025-01-29': { name: '春节', type: 'holiday' },
            '2025-01-30': { name: '春节', type: 'holiday' },
            '2025-01-31': { name: '春节', type: 'holiday' },
            '2025-02-01': { name: '春节', type: 'holiday' },
            '2025-02-02': { name: '春节', type: 'holiday' },
            '2025-02-03': { name: '春节', type: 'holiday' },
            '2025-02-04': { name: '春节', type: 'holiday' },
            
            // 清明节：4月4日至6日放假调休，共3天
            '2025-04-04': { name: '清明节', type: 'holiday' },
            '2025-04-05': { name: '清明节', type: 'holiday' },
            '2025-04-06': { name: '清明节', type: 'holiday' },
            
            // 劳动节：5月1日至5日放假调休，共5天
            '2025-05-01': { name: '劳动节', type: 'holiday' },
            '2025-05-02': { name: '劳动节', type: 'holiday' },
            '2025-05-03': { name: '劳动节', type: 'holiday' },
            '2025-05-04': { name: '劳动节', type: 'holiday' },
            '2025-05-05': { name: '劳动节', type: 'holiday' },
            
            // 端午节：5月31日至6月2日放假调休，共3天
            '2025-05-31': { name: '端午节', type: 'holiday' },
            '2025-06-01': { name: '端午节', type: 'holiday' },
            '2025-06-02': { name: '端午节', type: 'holiday' },
            
            // 中秋节：10月6日放假，与国庆节连休
            '2025-10-06': { name: '中秋节', type: 'holiday' },
            
            // 国庆节：10月1日至7日放假调休，共7天
            '2025-10-01': { name: '国庆节', type: 'holiday' },
            '2025-10-02': { name: '国庆节', type: 'holiday' },
            '2025-10-03': { name: '国庆节', type: 'holiday' },
            '2025-10-04': { name: '国庆节', type: 'holiday' },
            '2025-10-05': { name: '国庆节', type: 'holiday' },
            '2025-10-07': { name: '国庆节', type: 'holiday' },
            
            // 调休工作日
            '2025-01-26': { name: '调休', type: 'workday' },
            '2025-02-08': { name: '调休', type: 'workday' },
            '2025-04-27': { name: '调休', type: 'workday' },
            '2025-09-28': { name: '调休', type: 'workday' },
            '2025-10-11': { name: '调休', type: 'workday' },
            
            // 其他纪念日（非法定假日）
            '2025-02-14': { name: '情人节', type: 'festival' },
            '2025-03-08': { name: '妇女节', type: 'festival' },
            '2025-03-12': { name: '植树节', type: 'festival' },
            '2025-04-01': { name: '愚人节', type: 'festival' },
            '2025-05-04': { name: '青年节', type: 'festival' },
            '2025-06-01': { name: '儿童节', type: 'festival' },
            '2025-07-01': { name: '建党节', type: 'festival' },
            '2025-08-01': { name: '建军节', type: 'festival' },
            '2025-09-10': { name: '教师节', type: 'festival' },
            '2025-10-01': { name: '国庆节', type: 'holiday' },
            '2025-11-11': { name: '双十一', type: 'festival' },
            '2025-12-24': { name: '平安夜', type: 'festival' },
            '2025-12-25': { name: '圣诞节', type: 'festival' },
        };
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 月份导航
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');
        const todayBtn = document.getElementById('todayBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousMonth());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextMonth());
        }
        if (todayBtn) {
            todayBtn.addEventListener('click', () => this.goToToday());
        }

        // 视图切换
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-view-mode]')) {
                const mode = e.target.dataset.viewMode;
                this.switchViewMode(mode);
            }
        });

        // 保存事件
        const saveBtn = document.getElementById('saveEvent');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveEvent());
        }

        // 导出日历
        const exportBtn = document.getElementById('exportCalendar');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportCalendar());
        }

        // 模态框重置
        const modal = document.getElementById('eventModal');
        if (modal) {
            modal.addEventListener('hidden.bs.modal', () => {
                document.getElementById('eventForm')?.reset();
            });
        }

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    this.previousMonth();
                    break;
                case 'ArrowRight':
                    this.nextMonth();
                    break;
                case 't':
                case 'T':
                    this.goToToday();
                    break;
            }
        });
    }

    /**
     * 更新当前日期显示
     */
    updateCurrentDateDisplay() {
        const now = new Date();
        const currentDateEl = document.getElementById('currentDate');
        const currentLunarEl = document.getElementById('currentLunar');
        
        if (currentDateEl) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
            };
            currentDateEl.textContent = now.toLocaleDateString('zh-CN', options);
        }
        
        // 显示农历（如果有lunar.js）
        if (currentLunarEl && typeof LunarCalendar !== 'undefined') {
            try {
                const lunar = LunarCalendar.solarToLunar(
                    now.getFullYear(),
                    now.getMonth() + 1,
                    now.getDate()
                );
                if (lunar && lunar.lunarMonthName && lunar.lunarDayName) {
                    currentLunarEl.textContent = `农历 ${lunar.lunarMonthName}${lunar.lunarDayName}`;
                }
            } catch (e) {
                console.warn('农历转换失败:', e);
            }
        }
    }

    /**
     * 渲染日历
     */
    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // 更新月份标题
        const currentMonthEl = document.getElementById('currentMonth');
        if (currentMonthEl) {
            currentMonthEl.textContent = this.currentDate.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
            });
        }

        // 获取当前月的第一天和最后一天
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayWeekday = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        const calendarDays = document.getElementById('calendarDays');
        if (!calendarDays) return;

        calendarDays.innerHTML = '';

        // 添加周数列头
        const calendarGrid = calendarDays.parentElement;
        if (calendarGrid && !calendarGrid.classList.contains('with-week-numbers')) {
            calendarGrid.classList.add('with-week-numbers');
            
            // 修改星期行，添加周数标题
            const weekdaysRow = calendarGrid.querySelector('.calendar-weekdays');
            if (weekdaysRow && !weekdaysRow.querySelector('.week-number-header')) {
                const weekHeader = document.createElement('div');
                weekHeader.className = 'week-number-header';
                weekHeader.textContent = '周';
                weekdaysRow.insertBefore(weekHeader, weekdaysRow.firstChild);
            }
        }

        // 计算需要显示的总天数（6周 = 42天）
        const totalCells = 42;
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDayWeekday);

        // 生成日历（按周分组，每周添加周数）
        for (let week = 0; week < 6; week++) {
            // 添加周数标签
            const weekStartDate = new Date(startDate);
            weekStartDate.setDate(startDate.getDate() + week * 7);
            const weekNumber = this.getWeekNumber(weekStartDate);
            
            const weekLabel = document.createElement('div');
            weekLabel.className = 'week-number';
            weekLabel.textContent = weekNumber;
            weekLabel.title = `第${weekNumber}周`;
            calendarDays.appendChild(weekLabel);

            // 添加该周的7天
            for (let day = 0; day < 7; day++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + week * 7 + day);
                
                const dayElement = this.createDayElement(currentDate, month);
                calendarDays.appendChild(dayElement);
            }
        }

        // 更新即将到来的事件列表
        this.renderUpcomingEvents();
    }

    /**
     * 创建日期元素
     */
    createDayElement(date, currentMonth) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';

        const isCurrentMonth = date.getMonth() === currentMonth;
        const today = new Date();
        const dateStr = this.formatDate(date);
        
        // 添加类名
        if (!isCurrentMonth) {
            dayElement.classList.add('other-month');
        }
        
        if (date.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        if (this.selectedDate && date.toDateString() === this.selectedDate.toDateString()) {
            dayElement.classList.add('selected');
        }

        // 检查节假日
        const holidayInfo = this.holidays[dateStr];
        if (holidayInfo) {
            if (holidayInfo.type === 'holiday') {
                dayElement.classList.add('holiday');
            } else if (holidayInfo.type === 'workday') {
                dayElement.classList.add('workday');
            } else if (holidayInfo.type === 'festival') {
                dayElement.classList.add('festival');
            }
        }

        // 检查是否有用户事件
        if (this.events[dateStr] && this.events[dateStr].length > 0) {
            dayElement.classList.add('has-event');
        }

        // 创建内容
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = date.getDate();
        dayElement.appendChild(dayNumber);

        // 农历/节日信息
        const lunarText = this.getLunarText(date, holidayInfo);
        if (lunarText) {
            const dayLunar = document.createElement('div');
            dayLunar.className = 'day-lunar';
            dayLunar.textContent = lunarText;
            dayElement.appendChild(dayLunar);
        }

        // 点击事件
        dayElement.addEventListener('click', () => {
            this.selectDate(date);
        });

        // 双击快速添加事件
        dayElement.addEventListener('dblclick', () => {
            this.quickAddEvent(dateStr);
        });

        return dayElement;
    }

    /**
     * 获取农历或节日文本
     */
    getLunarText(date, holidayInfo) {
        // 优先显示节假日名称
        if (holidayInfo) {
            return holidayInfo.name;
        }

        // 显示农历
        if (typeof LunarCalendar !== 'undefined') {
            try {
                const lunar = LunarCalendar.solarToLunar(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    date.getDate()
                );
                
                if (lunar) {
                    // 初一显示月份
                    if (lunar.lunarDay === 1) {
                        return lunar.lunarMonthName;
                    }
                    // 有农历节日显示节日
                    if (lunar.festival) {
                        return lunar.festival;
                    }
                    // 显示日期
                    return lunar.lunarDayName;
                }
            } catch (e) {
                console.warn('农历转换失败:', e);
            }
        }

        return '';
    }

    /**
     * 选择日期
     */
    selectDate(date) {
        this.selectedDate = date;
        this.renderCalendar();
        this.showDateInfo(date);
    }

    /**
     * 显示日期信息
     */
    showDateInfo(date) {
        const dateStr = this.formatDate(date);
        const events = this.events[dateStr] || [];
        const holidayInfo = this.holidays[dateStr];

        // 可以在这里添加显示选中日期详细信息的逻辑
        console.log('选中日期:', dateStr);
        console.log('事件:', events);
        console.log('节假日:', holidayInfo);
    }

    /**
     * 月份导航
     */
    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    }

    goToToday() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.renderCalendar();
        this.updateCurrentDateDisplay();
        this.updateStatistics();
    }

    /**
     * 跳转到下一个假期
     */
    goToNextHoliday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // 获取所有法定假日
        const holidays = Object.entries(this.holidays)
            .filter(([date, info]) => info.type === 'holiday')
            .map(([date, info]) => ({
                date: new Date(date),
                name: info.name
            }))
            .filter(h => h.date >= today)
            .sort((a, b) => a.date - b.date);
        
        if (holidays.length > 0) {
            const nextHoliday = holidays[0];
            this.currentDate = new Date(nextHoliday.date);
            this.renderCalendar();
            this.showToast(`已跳转到 ${nextHoliday.name}`);
        } else {
            this.showToast('没有找到即将到来的假期', 'warning');
        }
    }

    /**
     * 跳转到指定日期
     */
    goToDate() {
        const dateStr = prompt('请输入日期 (格式: YYYY-MM-DD):', 
            this.currentDate.toISOString().split('T')[0]);
        
        if (!dateStr) return;
        
        const targetDate = new Date(dateStr);
        if (isNaN(targetDate.getTime())) {
            this.showToast('日期格式不正确', 'error');
            return;
        }
        
        this.currentDate = targetDate;
        this.renderCalendar();
        this.updateStatistics();
        this.showToast(`已跳转到 ${this.formatDateChinese(targetDate)}`);
    }

    /**
     * 格式化日期为中文
     */
    formatDateChinese(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}年${month}月${day}日`;
    }

    /**
     * 快速添加事件
     */
    quickAddEvent(dateStr) {
        const modal = document.getElementById('eventModal');
        const dateInput = document.getElementById('eventDate');
        
        if (dateInput) {
            dateInput.value = dateStr;
        }
        
        if (modal && typeof bootstrap !== 'undefined') {
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        }
    }

    /**
     * 保存事件
     */
    saveEvent() {
        const title = document.getElementById('eventTitle')?.value?.trim();
        const date = document.getElementById('eventDate')?.value;
        const time = document.getElementById('eventTime')?.value;
        const description = document.getElementById('eventDescription')?.value?.trim();
        const color = document.getElementById('eventColor')?.value || 'blue';

        if (!title || !date) {
            alert('请填写标题和日期！');
            return;
        }

        // 初始化日期事件数组
        if (!this.events[date]) {
            this.events[date] = [];
        }

        // 添加事件
        this.events[date].push({
            id: Date.now(),
            title,
            time,
            description,
            color,
            created: new Date().toISOString()
        });

        // 保存到本地存储
        this.saveEvents();

        // 关闭模态框
        const modal = document.getElementById('eventModal');
        if (modal && typeof bootstrap !== 'undefined') {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        }

        // 重新渲染日历
        this.renderCalendar();

        // 显示成功提示
        this.showToast('事件已保存', 'success');
    }

    /**
     * 删除事件
     */
    deleteEvent(date, eventId) {
        if (!this.events[date]) return;

        this.events[date] = this.events[date].filter(e => e.id !== eventId);
        
        if (this.events[date].length === 0) {
            delete this.events[date];
        }

        this.saveEvents();
        this.renderCalendar();
        this.showToast('事件已删除', 'info');
    }

    /**
     * 渲染即将到来的事件
     */
    renderUpcomingEvents() {
        // 这个方法可以用来显示即将到来的事件列表
        // 根据实际HTML结构实现
        const today = new Date();
        const upcoming = [];

        // 收集未来30天的事件
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dateStr = this.formatDate(date);
            
            const events = this.events[dateStr];
            if (events && events.length > 0) {
                upcoming.push({ date: dateStr, events });
            }
        }

        console.log('即将到来的事件:', upcoming);
    }

    /**
     * 更新倒计时
     */
    updateCountdown() {
        const now = new Date();
        const upcomingHolidays = [];

        // 查找即将到来的节假日
        Object.entries(this.holidays).forEach(([dateStr, info]) => {
            if (info.type === 'holiday') {
                const holidayDate = new Date(dateStr);
                if (holidayDate > now) {
                    const days = Math.ceil((holidayDate - now) / (1000 * 60 * 60 * 24));
                    upcomingHolidays.push({ date: dateStr, name: info.name, days });
                }
            }
        });

        // 按时间排序
        upcomingHolidays.sort((a, b) => a.days - b.days);

        // 显示最近的节假日倒计时
        if (upcomingHolidays.length > 0) {
            const next = upcomingHolidays[0];
            console.log(`距离${next.name}还有${next.days}天`);
        }
    }

    /**
     * 启动时钟
     */
    startClock() {
        setInterval(() => {
            this.updateCurrentDateDisplay();
        }, 60000); // 每分钟更新一次
    }

    /**
     * 导出日历
     */
    exportCalendar() {
        // 导出为图片或PDF
        this.showToast('导出功能开发中', 'info');
    }

    /**
     * 数据持久化
     */
    loadEvents() {
        try {
            const stored = localStorage.getItem('calendar_events');
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error('加载事件失败:', e);
            return {};
        }
    }

    saveEvents() {
        try {
            localStorage.setItem('calendar_events', JSON.stringify(this.events));
        } catch (e) {
            console.error('保存事件失败:', e);
        }
    }

    /**
     * 工具函数
     */
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    showToast(message, type = 'info') {
        // 创建toast提示
        const toast = document.createElement('div');
        toast.className = `toast-message toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            border-left: 4px solid ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /**
     * 新增功能：周数计算
     */
    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

    /**
     * 切换视图模式
     */
    switchViewMode(mode) {
        this.viewMode = mode;
        
        // 更新按钮状态
        document.querySelectorAll('[data-view-mode]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.viewMode === mode);
        });

        this.renderCalendar();
    }

    /**
     * 加载重要纪念日
     */
    loadImportantDates() {
        try {
            const stored = localStorage.getItem('important_dates');
            return stored ? JSON.parse(stored) : [
                { name: '生日', date: '1990-01-01', type: 'birthday' },
                { name: '纪念日', date: '2020-01-01', type: 'anniversary' }
            ];
        } catch (e) {
            return [];
        }
    }

    saveImportantDates() {
        try {
            localStorage.setItem('important_dates', JSON.stringify(this.importantDates));
        } catch (e) {
            console.error('保存纪念日失败:', e);
        }
    }

    /**
     * 计算两个日期之间的天数
     */
    daysBetween(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((date1 - date2) / oneDay));
    }

    /**
     * 计算年龄
     */
    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    /**
     * 获取下一个生日
     */
    getNextBirthday(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        const thisYearBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
        
        if (thisYearBirthday < today) {
            thisYearBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        const daysUntil = this.daysBetween(today, thisYearBirthday);
        return { date: thisYearBirthday, daysUntil };
    }

    /**
     * 更新统计信息
     */
    updateStatistics() {
        const today = new Date();
        const year = today.getFullYear();
        
        // 1. 更新当前星期几
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const weekdayEl = document.getElementById('currentWeekday');
        if (weekdayEl) {
            weekdayEl.textContent = weekdays[today.getDay()];
        }
        
        // 2. 更新当前是第几周
        const weekNumber = this.getWeekNumber(today);
        const weekNumEl = document.getElementById('currentWeekNum');
        if (weekNumEl) {
            weekNumEl.textContent = `第${weekNumber}周`;
        }
        
        // 3. 更新下个假期倒计时
        this.updateNextHolidayCountdown();
        
        // 4. 更新年度进度
        const startOfYear = new Date(year, 0, 1);
        const daysPassed = this.daysBetween(startOfYear, today) + 1;
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        const totalDays = isLeapYear ? 366 : 365;
        const yearProgress = ((daysPassed / totalDays) * 100).toFixed(1);
        
        const progressEl = document.getElementById('yearProgress');
        if (progressEl) {
            progressEl.textContent = `${yearProgress}%`;
        }
        
        // 5. 更新侧边栏倒计时列表
        this.updateCountdownList();
    }
    
    /**
     * 更新下个假期倒计时
     */
    updateNextHolidayCountdown() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // 获取所有法定假日
        const holidays = Object.entries(this.holidays)
            .filter(([date, info]) => info.type === 'holiday')
            .map(([date, info]) => ({
                date: new Date(date),
                name: info.name,
                dateStr: date
            }))
            .filter(h => h.date >= today)
            .sort((a, b) => a.date - b.date);
        
        const countdownEl = document.getElementById('nextHolidayCountdown');
        if (countdownEl && holidays.length > 0) {
            const nextHoliday = holidays[0];
            const days = this.daysBetween(today, nextHoliday.date);
            
            if (days === 0) {
                countdownEl.textContent = '今天！';
            } else {
                countdownEl.textContent = `${days}天`;
            }
        } else if (countdownEl) {
            countdownEl.textContent = '无';
        }
    }
    
    /**
     * 更新侧边栏倒计时列表
     */
    updateCountdownList() {
        const listEl = document.getElementById('countdownList');
        if (!listEl) return;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // 获取即将到来的假期和节日
        const upcomingDates = Object.entries(this.holidays)
            .map(([date, info]) => ({
                date: new Date(date),
                name: info.name,
                type: info.type,
                dateStr: date
            }))
            .filter(item => item.date >= today)
            .sort((a, b) => a.date - b.date)
            .slice(0, 5); // 只显示最近的5个
        
        if (upcomingDates.length === 0) {
            listEl.innerHTML = '<div class="text-muted">暂无即将到来的假期</div>';
            return;
        }
        
        listEl.innerHTML = upcomingDates.map(item => {
            const days = this.daysBetween(today, item.date);
            const typeClass = item.type === 'holiday' ? 'holiday' : 
                             item.type === 'workday' ? '' : 'festival';
            const daysClass = days <= 3 ? 'urgent' : days <= 7 ? 'soon' : '';
            
            return `
                <div class="countdown-item ${typeClass}">
                    <div class="countdown-name">${item.name}</div>
                    <div class="countdown-date">${this.formatDateChinese(item.date)}</div>
                    <div class="countdown-days ${daysClass}">
                        ${days === 0 ? '今天' : `${days}天后`}
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * 插入统计面板
     */
    insertStatisticsPanel(stats) {
        let panel = document.getElementById('calendar-statistics');
        
        if (!panel) {
            const controlSection = document.querySelector('.calendar-controls .container .row');
            if (controlSection) {
                const col = document.createElement('div');
                col.className = 'col-12 mt-3';
                col.innerHTML = `
                    <div id="calendar-statistics" class="statistics-panel neumorphism" data-aos="fade-up">
                        <div class="row g-3">
                            <div class="col-md-3 col-6">
                                <div class="stat-card">
                                    <div class="stat-icon"><i class="fas fa-calendar-week"></i></div>
                                    <div class="stat-value" id="stat-week">第${stats.weekNumber}周</div>
                                    <div class="stat-label">${stats.year}年</div>
                                </div>
                            </div>
                            <div class="col-md-3 col-6">
                                <div class="stat-card">
                                    <div class="stat-icon"><i class="fas fa-hourglass-start"></i></div>
                                    <div class="stat-value" id="stat-passed">${stats.daysPassed}天</div>
                                    <div class="stat-label">已过去</div>
                                </div>
                            </div>
                            <div class="col-md-3 col-6">
                                <div class="stat-card">
                                    <div class="stat-icon"><i class="fas fa-hourglass-end"></i></div>
                                    <div class="stat-value" id="stat-remaining">${stats.daysRemaining}天</div>
                                    <div class="stat-label">还剩余</div>
                                </div>
                            </div>
                            <div class="col-md-3 col-6">
                                <div class="stat-card">
                                    <div class="stat-icon"><i class="fas fa-chart-line"></i></div>
                                    <div class="stat-value" id="stat-progress">${stats.yearProgress}%</div>
                                    <div class="stat-label">年度进度</div>
                                </div>
                            </div>
                        </div>
                        <div class="year-progress-bar mt-3">
                            <div class="progress-fill" style="width: ${stats.yearProgress}%"></div>
                        </div>
                    </div>
                `;
                controlSection.appendChild(col);
            }
        } else {
            // 更新现有面板
            document.getElementById('stat-week').textContent = `第${stats.weekNumber}周`;
            document.getElementById('stat-passed').textContent = `${stats.daysPassed}天`;
            document.getElementById('stat-remaining').textContent = `${stats.daysRemaining}天`;
            document.getElementById('stat-progress').textContent = `${stats.yearProgress}%`;
            document.querySelector('.progress-fill').style.width = `${stats.yearProgress}%`;
        }
    }

    /**
     * 渲染重要日期倒计时
     */
    renderImportantDates() {
        const container = document.querySelector('.calendar-main .container .row');
        if (!container) return;

        let sidebar = document.getElementById('important-dates-sidebar');
        
        if (!sidebar) {
            const col = document.createElement('div');
            col.className = 'col-lg-4 mt-4 mt-lg-0';
            col.innerHTML = `
                <div id="important-dates-sidebar" class="important-dates neumorphism" data-aos="fade-left">
                    <div class="sidebar-header">
                        <h3><i class="fas fa-heart"></i> 重要日期</h3>
                        <button class="btn-add-date" onclick="calendar.addImportantDate()">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div id="important-dates-list" class="dates-list"></div>
                    <div class="sidebar-header mt-4">
                        <h3><i class="fas fa-calendar-check"></i> 假期倒计时</h3>
                    </div>
                    <div id="holiday-countdown-list" class="dates-list"></div>
                </div>
            `;
            
            // 将日历容器改为col-lg-8
            const calendarCol = container.querySelector('.col-12');
            if (calendarCol) {
                calendarCol.className = 'col-lg-8';
                container.appendChild(col);
            }
        }

        this.updateImportantDatesList();
        this.updateHolidayCountdown();
    }

    /**
     * 更新重要日期列表
     */
    updateImportantDatesList() {
        const list = document.getElementById('important-dates-list');
        if (!list) return;

        const today = new Date();
        
        if (this.importantDates.length === 0) {
            list.innerHTML = '<p class="empty-message">暂无重要日期</p>';
            return;
        }

        list.innerHTML = this.importantDates.map(item => {
            const date = new Date(item.date);
            const age = item.type === 'birthday' ? this.calculateAge(item.date) : null;
            const next = item.type === 'birthday' ? this.getNextBirthday(item.date) : null;
            const daysSince = this.daysBetween(date, today);
            
            let subtitle = '';
            if (item.type === 'birthday' && age !== null) {
                subtitle = `${age}岁 · ${next.daysUntil}天后生日`;
            } else if (item.type === 'anniversary') {
                subtitle = `已经${daysSince}天`;
            }
            
            return `
                <div class="date-card">
                    <div class="date-icon ${item.type}">
                        <i class="fas fa-${item.type === 'birthday' ? 'birthday-cake' : 'heart'}"></i>
                    </div>
                    <div class="date-info">
                        <div class="date-name">${item.name}</div>
                        <div class="date-details">${subtitle}</div>
                    </div>
                    <button class="btn-delete-date" onclick="calendar.deleteImportantDate('${item.date}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }).join('');
    }

    /**
     * 更新假期倒计时
     */
    updateHolidayCountdown() {
        const list = document.getElementById('holiday-countdown-list');
        if (!list) return;

        const today = new Date();
        const upcoming = [];

        Object.entries(this.holidays).forEach(([dateStr, info]) => {
            if (info.type === 'holiday') {
                const holidayDate = new Date(dateStr);
                if (holidayDate >= today) {
                    const daysUntil = this.daysBetween(today, holidayDate);
                    
                    // 避免重复显示同一个假期
                    const existing = upcoming.find(h => h.name === info.name);
                    if (!existing || daysUntil < existing.daysUntil) {
                        if (existing) {
                            upcoming.splice(upcoming.indexOf(existing), 1);
                        }
                        upcoming.push({ 
                            name: info.name, 
                            date: dateStr, 
                            daysUntil 
                        });
                    }
                }
            }
        });

        upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
        const top5 = upcoming.slice(0, 5);

        if (top5.length === 0) {
            list.innerHTML = '<p class="empty-message">今年已无假期</p>';
            return;
        }

        list.innerHTML = top5.map(holiday => `
            <div class="date-card holiday-card">
                <div class="date-icon holiday">
                    <i class="fas fa-umbrella-beach"></i>
                </div>
                <div class="date-info">
                    <div class="date-name">${holiday.name}</div>
                    <div class="date-details">
                        ${holiday.daysUntil === 0 ? '今天！' : `还有${holiday.daysUntil}天`}
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * 添加重要日期
     */
    addImportantDate() {
        const name = prompt('请输入日期名称（如：生日、纪念日）：');
        if (!name) return;

        const date = prompt('请输入日期（格式：YYYY-MM-DD）：');
        if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            alert('日期格式错误！');
            return;
        }

        const type = confirm('这是生日吗？\n确定 = 生日\n取消 = 纪念日') ? 'birthday' : 'anniversary';

        this.importantDates.push({ name, date, type });
        this.saveImportantDates();
        this.updateImportantDatesList();
        this.showToast('已添加重要日期', 'success');
    }

    /**
     * 删除重要日期
     */
    deleteImportantDate(date) {
        if (confirm('确定要删除这个重要日期吗？')) {
            this.importantDates = this.importantDates.filter(item => item.date !== date);
            this.saveImportantDates();
            this.updateImportantDatesList();
            this.showToast('已删除', 'info');
        }
    }
}

// 初始化
let calendar;

document.addEventListener('DOMContentLoaded', () => {
    calendar = new Calendar();
    
    // 隐藏加载器
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loaded');
        }, 500);
    }
    
    // 添加动画样式
    if (!document.getElementById('calendar-animations')) {
        const style = document.createElement('style');
        style.id = 'calendar-animations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});

// 导出全局变量
window.calendar = calendar;
