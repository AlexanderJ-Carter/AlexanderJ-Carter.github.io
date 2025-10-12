/**
 * 现代日历系统 - JavaScript
 * 功能：日历显示、日程管理、节假日显示、农历显示
 */

class ModernCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.events = this.loadEvents() || [];
        this.holidays = {};
        this.viewMode = 'month'; // month, week, day
        
        this.init();
    }

    async init() {
        await this.loadHolidays();
        this.bindEvents();
        this.render();
    }

    // ========================================
    // 事件绑定
    // ========================================

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

        // 添加日程按钮
        const addBtn = document.querySelector('.add-schedule-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.openModal());
        }

        // 模态框关闭
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('calendar-modal')) {
                this.closeModal();
            }
            if (e.target.classList.contains('modal-close')) {
                this.closeModal();
            }
        });

        // 表单提交
        const saveBtn = document.getElementById('saveEvent');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveEvent());
        }

        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // ========================================
    // 日历渲染
    // ========================================

    render() {
        this.renderCalendarHeader();
        this.renderCalendarGrid();
        this.renderScheduleList();
    }

    renderCalendarHeader() {
        const headerElement = document.querySelector('.current-month');
        if (headerElement) {
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth() + 1;
            headerElement.textContent = `${year}年 ${month}月`;
        }
    }

    renderCalendarGrid() {
        const gridElement = document.querySelector('.calendar-grid');
        if (!gridElement) return;

        // 清空现有内容（保留星期标题）
        const weekdays = gridElement.querySelectorAll('.calendar-weekday');
        gridElement.innerHTML = '';
        
        // 重新添加星期标题
        const weekdayNames = ['日', '一', '二', '三', '四', '五', '六'];
        weekdayNames.forEach(day => {
            const weekdayEl = document.createElement('div');
            weekdayEl.className = 'calendar-weekday';
            weekdayEl.textContent = day;
            gridElement.appendChild(weekdayEl);
        });

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // 获取当月第一天和最后一天
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // 获取上月最后几天
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        const firstDayOfWeek = firstDay.getDay();
        
        // 渲染上月日期
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            const dayElement = this.createDayElement(day, true, year, month - 1);
            gridElement.appendChild(dayElement);
        }
        
        // 渲染当月日期
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = this.createDayElement(day, false, year, month);
            gridElement.appendChild(dayElement);
        }
        
        // 渲染下月日期
        const remainingDays = 42 - (firstDayOfWeek + lastDay.getDate());
        for (let day = 1; day <= remainingDays; day++) {
            const dayElement = this.createDayElement(day, true, year, month + 1);
            gridElement.appendChild(dayElement);
        }
    }

    createDayElement(day, isOtherMonth, year, month) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        }
        
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // 检查是否是今天
        const today = new Date();
        if (year === today.getFullYear() && 
            month === today.getMonth() && 
            day === today.getDate() && 
            !isOtherMonth) {
            dayElement.classList.add('today');
        }
        
        // 检查是否被选中
        if (this.selectedDate && 
            year === this.selectedDate.getFullYear() && 
            month === this.selectedDate.getMonth() && 
            day === this.selectedDate.getDate() && 
            !isOtherMonth) {
            dayElement.classList.add('selected');
        }
        
        // 检查是否有事件
        if (this.hasEvent(dateStr)) {
            dayElement.classList.add('has-event');
        }
        
        // 检查是否是节假日
        const holiday = this.holidays[dateStr];
        if (holiday && !isOtherMonth) {
            dayElement.classList.add('holiday');
            
            // 添加节假日标记
            const holidayBadge = document.createElement('span');
            holidayBadge.className = 'holiday-badge';
            holidayBadge.textContent = '休';
            dayElement.appendChild(holidayBadge);
        }
        
        // 日期数字
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // 农历/节日信息
        if (!isOtherMonth) {
            const lunarInfo = this.getLunarInfo(year, month, day);
            if (lunarInfo) {
                const dayLunar = document.createElement('div');
                dayLunar.className = holiday ? 'festival-name' : 'day-lunar';
                dayLunar.textContent = holiday || lunarInfo;
                dayElement.appendChild(dayLunar);
            }
        }
        
        // 点击事件
        if (!isOtherMonth) {
            dayElement.addEventListener('click', () => {
                this.selectDate(new Date(year, month, day));
            });
        }
        
        return dayElement;
    }

    renderScheduleList() {
        const scheduleList = document.querySelector('.schedule-list');
        if (!scheduleList) return;

        if (this.events.length === 0) {
            scheduleList.innerHTML = `
                <div class="empty-schedule">
                    <i class="fas fa-calendar-check"></i>
                    <p>暂无日程安排</p>
                </div>
            `;
            return;
        }

        // 筛选选中日期或今天的事件
        const targetDate = this.selectedDate || new Date();
        const dateStr = this.formatDate(targetDate);
        
        const todayEvents = this.events.filter(event => event.date === dateStr);

        if (todayEvents.length === 0) {
            scheduleList.innerHTML = `
                <div class="empty-schedule">
                    <i class="fas fa-calendar-day"></i>
                    <p>该日期暂无日程</p>
                </div>
            `;
            return;
        }

        scheduleList.innerHTML = todayEvents.map(event => `
            <li class="schedule-item ${event.completed ? 'completed' : ''}" data-id="${event.id}">
                <div class="schedule-time">
                    <i class="fas fa-clock"></i> ${event.time || '全天'}
                </div>
                <div class="schedule-title">${this.escapeHtml(event.title)}</div>
                ${event.description ? `<div class="schedule-desc">${this.escapeHtml(event.description)}</div>` : ''}
                <div class="schedule-actions">
                    <button class="btn-complete" onclick="calendar.toggleComplete(${event.id})">
                        <i class="fas fa-${event.completed ? 'undo' : 'check'}"></i>
                    </button>
                    <button class="btn-edit" onclick="calendar.editEvent(${event.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="calendar.deleteEvent(${event.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `).join('');
    }

    // ========================================
    // 日期操作
    // ========================================

    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
    }

    goToToday() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.render();
    }

    selectDate(date) {
        this.selectedDate = date;
        this.render();
    }

    // ========================================
    // 事件管理
    // ========================================

    openModal(event = null) {
        const modal = document.querySelector('.calendar-modal');
        if (!modal) return;

        if (event) {
            // 编辑模式
            document.getElementById('eventTitle').value = event.title;
            document.getElementById('eventDate').value = event.date;
            document.getElementById('eventTime').value = event.time || '';
            document.getElementById('eventDescription').value = event.description || '';
            document.getElementById('saveEvent').dataset.id = event.id;
        } else {
            // 新建模式
            const targetDate = this.selectedDate || new Date();
            document.getElementById('eventDate').value = this.formatDate(targetDate);
            document.getElementById('saveEvent').removeAttribute('data-id');
        }

        modal.classList.add('active');
    }

    closeModal() {
        const modal = document.querySelector('.calendar-modal');
        if (modal) {
            modal.classList.remove('active');
            this.resetForm();
        }
    }

    resetForm() {
        document.getElementById('eventTitle').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventTime').value = '';
        document.getElementById('eventDescription').value = '';
    }

    saveEvent() {
        const title = document.getElementById('eventTitle').value.trim();
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const description = document.getElementById('eventDescription').value.trim();
        const id = document.getElementById('saveEvent').dataset.id;

        if (!title || !date) {
            alert('请填写标题和日期！');
            return;
        }

        if (id) {
            // 更新现有事件
            const event = this.events.find(e => e.id == id);
            if (event) {
                event.title = title;
                event.date = date;
                event.time = time;
                event.description = description;
            }
        } else {
            // 创建新事件
            const event = {
                id: Date.now(),
                title,
                date,
                time,
                description,
                completed: false
            };
            this.events.push(event);
        }

        this.saveEvents();
        this.closeModal();
        this.render();
        
        // 显示成功提示
        this.showToast('日程已保存', 'success');
    }

    editEvent(id) {
        const event = this.events.find(e => e.id === id);
        if (event) {
            this.openModal(event);
        }
    }

    deleteEvent(id) {
        if (confirm('确定要删除这个日程吗？')) {
            this.events = this.events.filter(e => e.id !== id);
            this.saveEvents();
            this.render();
            this.showToast('日程已删除', 'info');
        }
    }

    toggleComplete(id) {
        const event = this.events.find(e => e.id === id);
        if (event) {
            event.completed = !event.completed;
            this.saveEvents();
            this.render();
        }
    }

    hasEvent(dateStr) {
        return this.events.some(event => event.date === dateStr);
    }

    // ========================================
    // 数据持久化
    // ========================================

    loadEvents() {
        try {
            const stored = localStorage.getItem('calendar_events');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('加载事件失败:', e);
            return [];
        }
    }

    saveEvents() {
        try {
            localStorage.setItem('calendar_events', JSON.stringify(this.events));
        } catch (e) {
            console.error('保存事件失败:', e);
        }
    }

    // ========================================
    // 节假日数据
    // ========================================

    async loadHolidays() {
        // 2025年主要节假日
        this.holidays = {
            '2025-01-01': '元旦',
            '2025-01-28': '除夕',
            '2025-01-29': '春节',
            '2025-01-30': '春节',
            '2025-01-31': '春节',
            '2025-02-01': '春节',
            '2025-02-02': '春节',
            '2025-04-04': '清明节',
            '2025-04-05': '清明节',
            '2025-04-06': '清明节',
            '2025-05-01': '劳动节',
            '2025-05-02': '劳动节',
            '2025-05-03': '劳动节',
            '2025-05-31': '端午节',
            '2025-06-01': '端午节',
            '2025-06-02': '端午节',
            '2025-10-01': '国庆节',
            '2025-10-02': '国庆节',
            '2025-10-03': '国庆节',
            '2025-10-04': '国庆节',
            '2025-10-05': '国庆节',
            '2025-10-06': '国庆节',
            '2025-10-07': '国庆节',
            '2025-10-08': '中秋节',
        };
    }

    // ========================================
    // 农历信息（简化版）
    // ========================================

    getLunarInfo(year, month, day) {
        // 这里返回简化的农历信息
        // 实际项目中应使用专业的农历库
        const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月',
                             '七月', '八月', '九月', '十月', '冬月', '腊月'];
        const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
                          '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
                          '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
        
        // 简单的农历映射（仅作演示）
        const dayOfYear = Math.floor((new Date(year, month, day) - new Date(year, 0, 0)) / 86400000);
        const lunarMonth = Math.floor(dayOfYear / 30) % 12;
        const lunarDay = dayOfYear % 30;
        
        if (day === 1) {
            return lunarMonths[month];
        }
        
        return lunarDays[Math.min(lunarDay, 29)];
    }

    // ========================================
    // 工具函数
    // ========================================

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    showToast(message, type = 'info') {
        // 创建toast元素
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
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
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ========================================
    // 导出功能
    // ========================================

    exportCalendar() {
        const dataStr = JSON.stringify(this.events, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `calendar-events-${this.formatDate(new Date())}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showToast('日历数据已导出', 'success');
    }

    importCalendar(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const events = JSON.parse(e.target.result);
                this.events = events;
                this.saveEvents();
                this.render();
                this.showToast('日历数据已导入', 'success');
            } catch (err) {
                alert('导入失败：文件格式不正确');
            }
        };
        reader.readAsText(file);
    }
}

// ========================================
// 初始化
// ========================================

let calendar;

document.addEventListener('DOMContentLoaded', () => {
    calendar = new ModernCalendar();
    
    // 添加动画样式
    const style = document.createElement('style');
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
});

// 导出全局变量
window.calendar = calendar;
