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
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCurrentDateDisplay();
        this.renderCalendar();
        this.updateCountdown();
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

        // 计算需要显示的总天数（6周 = 42天）
        const totalCells = 42;
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDayWeekday);

        // 生成42个日期单元格
        for (let i = 0; i < totalCells; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dayElement = this.createDayElement(currentDate, month);
            calendarDays.appendChild(dayElement);
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
