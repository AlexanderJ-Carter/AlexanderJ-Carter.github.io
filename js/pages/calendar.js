// 日历主要功能
class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.events = this.loadEvents();
        this.holidays = {};

        this.loadHolidays().then(() => {
            this.init();
        });
    }

    init() {
        this.bindEvents();
        this.updateCurrentDateDisplay();
        this.renderCalendar();
        this.renderUpcomingEvents();
    }

    bindEvents() {
        // 导航按钮
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });

        document.getElementById('todayBtn').addEventListener('click', () => {
            this.currentDate = new Date();
            this.renderCalendar();
        });

        // 添加日程
        document.getElementById('saveEvent').addEventListener('click', () => {
            this.saveEvent();
        });

        // 导出功能
        document
            .getElementById('exportCalendar')
            .addEventListener('click', () => {
                this.exportCalendar();
            });

        // 表单重置
        document
            .getElementById('eventModal')
            .addEventListener('hidden.bs.modal', () => {
                document.getElementById('eventForm').reset();
            });
    }

    updateCurrentDateDisplay() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        };

        document.getElementById('currentDate').textContent =
            now.toLocaleDateString('zh-CN', options); // 显示农历（如果有lunar.js）
        if (typeof LunarCalendar !== 'undefined') {
            const lunar = LunarCalendar.solarToLunar(
                now.getFullYear(),
                now.getMonth() + 1,
                now.getDate()
            );
            if (lunar && lunar.lunarMonthName && lunar.lunarDayName) {
                document.getElementById(
                    'currentLunar'
                ).textContent = `${lunar.lunarYear}年 ${lunar.lunarMonthName}月${lunar.lunarDayName}`;
            }
        }
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // 更新月份标题
        document.getElementById('currentMonth').textContent =
            this.currentDate.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
            }); // 获取当前月的第一天和最后一天
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayWeekday = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        const calendarDays = document.getElementById('calendarDays');
        calendarDays.innerHTML = ''; // 计算需要显示的总天数（6周 = 42天）
        const totalCells = 42;

        // 计算开始日期（从第一周的第一天开始）
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDayWeekday);

        // 生成42个日期单元格
        for (let i = 0; i < totalCells; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);

            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';

            // 判断是否是当前月
            const isCurrentMonth = currentDate.getMonth() === month;
            if (!isCurrentMonth) {
                dayElement.classList.add('other-month');
            }

            // 检查是否是今天
            const today = new Date();
            if (currentDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }

            // 检查是否是选中的日期
            if (
                this.selectedDate &&
                currentDate.toDateString() === this.selectedDate.toDateString()
            ) {
                dayElement.classList.add('selected');
            }

            // 创建日期内容
            dayElement.innerHTML = `
                <div class="day-number">${currentDate.getDate()}</div>
                <div class="day-lunar">${this.getLunarDate(currentDate)}</div>
                <div class="day-events">${this.renderDayEvents(
                    currentDate
                )}</div>
            `;

            // 添加点击事件
            dayElement.addEventListener('click', () => {
                this.selectDate(currentDate);
            });

            // 添加双击事件快速添加日程
            dayElement.addEventListener('dblclick', () => {
                this.quickAddEvent(this.formatDate(currentDate));
            });

            calendarDays.appendChild(dayElement);
        }
    }
    getLunarDate(date) {
        if (typeof LunarCalendar !== 'undefined') {
            try {
                const lunar = LunarCalendar.solarToLunar(
                    date.getFullYear(),
                    date.getMonth() + 1,
                    date.getDate()
                );
                if (lunar && lunar.lunarMonthName && lunar.lunarDayName) {
                    // 如果是农历初一，显示月份
                    if (lunar.lunarDay === 1) {
                        return lunar.lunarMonthName;
                    }
                    // 如果有传统节日，优先显示节日
                    if (lunar.festival) {
                        return lunar.festival;
                    }
                    // 否则显示农历日期
                    return lunar.lunarDayName;
                }
                return '';
            } catch (e) {
                return '';
            }
        }
        return '';
    }

    renderDayEvents(date) {
        const dateStr = this.formatDate(date);
        let eventsHtml = '';

        // 添加节假日
        const holiday = this.getHoliday(date);
        if (holiday) {
            eventsHtml += `<div class="holiday-label">${holiday}</div>`;
        }

        // 添加用户日程
        const dayEvents = this.events[dateStr] || [];
        dayEvents.forEach((event) => {
            eventsHtml += `<div class="day-event event-${event.color}" title="${event.title}: ${event.description}">${event.title}</div>`;
        });

        return eventsHtml;
    }

    selectDate(date) {
        // 移除之前选中的样式
        document.querySelectorAll('.calendar-day.selected').forEach((el) => {
            el.classList.remove('selected');
        });

        // 添加新的选中样式
        event.currentTarget.classList.add('selected');

        this.selectedDate = date;
        this.displayDateDetails(date);
    }

    displayDateDetails(date) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        };

        document.getElementById('selectedDateTitle').textContent =
            date.toLocaleDateString('zh-CN', options);

        const dateStr = this.formatDate(date);
        const dayEvents = this.events[dateStr] || [];
        const holiday = this.getHoliday(date);

        let detailsHtml = '';

        // 显示农历
        const lunarInfo = this.getLunarDate(date);
        if (lunarInfo) {
            detailsHtml += `<p><strong>农历：</strong>${lunarInfo}</p>`;
        }

        // 显示节假日
        if (holiday) {
            detailsHtml += `<p><strong>节假日：</strong><span class="text-danger">${holiday}</span></p>`;
        }

        // 显示日程
        if (dayEvents.length > 0) {
            detailsHtml += '<h5>今日日程：</h5>';
            dayEvents.forEach((event) => {
                detailsHtml += `
                    <div class="event-item border-start border-${
                        event.color
                    } border-3 ps-3 mb-2">
                        <h6 class="mb-1">${event.title}</h6>
                        ${
                            event.time
                                ? `<div class="event-time"><i class="fas fa-clock"></i> ${event.time}</div>`
                                : ''
                        }
                        ${
                            event.description
                                ? `<div class="event-desc">${event.description}</div>`
                                : ''
                        }
                        <button class="btn btn-sm btn-outline-danger mt-2" onclick="calendar.deleteEvent('${dateStr}', ${dayEvents.indexOf(
                    event
                )})">
                            <i class="fas fa-trash"></i> 删除
                        </button>
                    </div>
                `;
            });
        } else {
            detailsHtml += '<p class="text-muted">今日暂无日程安排</p>';
        }

        // 添加快速添加按钮
        detailsHtml += `
            <button class="btn btn-primary mt-3" onclick="calendar.quickAddEvent('${dateStr}')">
                <i class="fas fa-plus"></i> 为这一天添加日程
            </button>
        `;

        document.getElementById('dateDetails').innerHTML = detailsHtml;
    }

    saveEvent() {
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const description = document.getElementById('eventDescription').value;
        const color = document.getElementById('eventColor').value;

        if (!title || !date) {
            alert('请填写日程标题和日期');
            return;
        }

        const event = {
            title,
            time,
            description,
            color,
        };

        if (!this.events[date]) {
            this.events[date] = [];
        }

        this.events[date].push(event);
        this.saveEvents();
        this.renderCalendar();
        this.renderUpcomingEvents();

        // 关闭模态框
        const modal = bootstrap.Modal.getInstance(
            document.getElementById('eventModal')
        );
        modal.hide();

        // 如果添加的是选中日期的日程，更新详情显示
        if (this.selectedDate && this.formatDate(this.selectedDate) === date) {
            this.displayDateDetails(this.selectedDate);
        }
    }

    // 快速添加日程
    quickAddEvent(dateStr) {
        // 设置表单日期
        document.getElementById('eventDate').value = dateStr;

        // 显示模态框
        const modal = new bootstrap.Modal(
            document.getElementById('eventModal')
        );
        modal.show();

        // 聚焦到标题输入框
        setTimeout(() => {
            document.getElementById('eventTitle').focus();
        }, 500);
    }

    deleteEvent(dateStr, eventIndex) {
        if (confirm('确定要删除这个日程吗？')) {
            this.events[dateStr].splice(eventIndex, 1);
            if (this.events[dateStr].length === 0) {
                delete this.events[dateStr];
            }
            this.saveEvents();
            this.renderCalendar();
            this.renderUpcomingEvents();

            // 更新详情显示
            if (
                this.selectedDate &&
                this.formatDate(this.selectedDate) === dateStr
            ) {
                this.displayDateDetails(this.selectedDate);
            }
        }
    }

    renderUpcomingEvents() {
        const upcomingContainer = document.getElementById('upcomingEvents');
        const today = new Date();
        const upcoming = [];

        // 收集未来30天的日程
        for (let i = 0; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dateStr = this.formatDate(date);

            if (this.events[dateStr]) {
                this.events[dateStr].forEach((event) => {
                    upcoming.push({
                        ...event,
                        date: date,
                        dateStr: dateStr,
                    });
                });
            }
        }

        if (upcoming.length === 0) {
            upcomingContainer.innerHTML =
                '<p class="text-muted">暂无即将到来的日程</p>';
            return;
        }

        // 按日期排序
        upcoming.sort((a, b) => a.date - b.date);

        let upcomingHtml = '';
        upcoming.slice(0, 5).forEach((event) => {
            const dateStr = event.date.toLocaleDateString('zh-CN', {
                month: 'short',
                day: 'numeric',
            });
            upcomingHtml += `
                <div class="event-item">
                    <h6>${event.title}</h6>
                    <div class="event-time">
                        <i class="fas fa-calendar"></i> ${dateStr}
                        ${
                            event.time
                                ? ` <i class="fas fa-clock"></i> ${event.time}`
                                : ''
                        }
                    </div>
                    ${
                        event.description
                            ? `<div class="event-desc">${event.description}</div>`
                            : ''
                    }
                </div>
            `;
        });

        upcomingContainer.innerHTML = upcomingHtml;
    }
    exportCalendar() {
        const calendarContainer = document.getElementById('calendarContainer');
        const originalClass = calendarContainer.className;

        // 添加导出模式样式
        calendarContainer.classList.add('export-mode');

        // 创建导出信息
        const exportInfo = document.createElement('div');
        exportInfo.innerHTML = `
            <div style="text-align: center; padding: 20px; background: white; border-bottom: 1px solid #eee;">
                <h2>${this.currentDate.toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                })} 日历</h2>
                <p style="margin: 10px 0; color: #666;">© 2025 Alexander James Carter - alexander.xin</p>
                <p style="margin: 0; font-size: 12px; color: #999;">智能日历系统 | 节假日显示 | 个人日程管理</p>
            </div>
        `;
        calendarContainer.insertBefore(
            exportInfo,
            calendarContainer.firstChild
        );

        // 使用html2canvas导出
        html2canvas(calendarContainer, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            letterRendering: true,
        })
            .then((canvas) => {
                // 恢复原始样式
                calendarContainer.className = originalClass;
                calendarContainer.removeChild(exportInfo);

                // 下载图片
                const link = document.createElement('a');
                link.download = `日历_${this.currentDate.getFullYear()}_${
                    this.currentDate.getMonth() + 1
                }.png`;
                link.href = canvas.toDataURL('image/png', 1.0);
                link.click();
            })
            .catch((error) => {
                console.error('导出失败:', error);
                alert('导出失败，请稍后重试');

                // 恢复原始样式
                calendarContainer.className = originalClass;
                if (calendarContainer.contains(exportInfo)) {
                    calendarContainer.removeChild(exportInfo);
                }
            });
    }
    formatDate(date) {
        // 使用本地时间格式化，避免时区问题
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    loadEvents() {
        const saved = localStorage.getItem('calendar_events');
        return saved ? JSON.parse(saved) : {};
    }

    saveEvents() {
        localStorage.setItem('calendar_events', JSON.stringify(this.events));
    }
    async loadHolidays() {
        // 中国节假日数据
        const currentYear = new Date().getFullYear();
        this.holidays = {
            // 固定节假日
            [`${currentYear}-01-01`]: '元旦',
            [`${currentYear}-05-01`]: '劳动节',
            [`${currentYear}-10-01`]: '国庆节',
            [`${currentYear}-10-02`]: '国庆节',
            [`${currentYear}-10-03`]: '国庆节',
            [`${currentYear}-12-25`]: '圣诞节',

            // 其他纪念日
            [`${currentYear}-02-14`]: '情人节',
            [`${currentYear}-03-08`]: '妇女节',
            [`${currentYear}-03-12`]: '植树节',
            [`${currentYear}-04-01`]: '愚人节',
            [`${currentYear}-05-04`]: '青年节',
            [`${currentYear}-06-01`]: '儿童节',
            [`${currentYear}-07-01`]: '建党节',
            [`${currentYear}-08-01`]: '建军节',
            [`${currentYear}-09-10`]: '教师节',
            [`${currentYear}-11-11`]: '双十一',
            [`${currentYear}-12-24`]: '平安夜',
        };

        // 添加下一年的元旦
        this.holidays[`${currentYear + 1}-01-01`] = '元旦';

        // 添加农历节假日
        try {
            if (typeof LunarCalendar !== 'undefined') {
                // 春节（农历正月初一）
                const springFestival = LunarCalendar.lunarToSolar(
                    currentYear,
                    1,
                    1
                );
                if (springFestival) {
                    const springDate = new Date(
                        springFestival.year,
                        springFestival.month - 1,
                        springFestival.day
                    );
                    this.holidays[this.formatDate(springDate)] = '春节';

                    // 春节假期（初一到初三）
                    for (let i = 1; i <= 3; i++) {
                        const holidayDate = new Date(springDate);
                        holidayDate.setDate(springDate.getDate() + i - 1);
                        this.holidays[this.formatDate(holidayDate)] =
                            i === 1 ? '春节' : '春节假期';
                    }
                }

                // 元宵节（农历正月十五）
                const lanternFestival = LunarCalendar.lunarToSolar(
                    currentYear,
                    1,
                    15
                );
                if (lanternFestival) {
                    const lanternDate = new Date(
                        lanternFestival.year,
                        lanternFestival.month - 1,
                        lanternFestival.day
                    );
                    this.holidays[this.formatDate(lanternDate)] = '元宵节';
                }

                // 中秋节（农历八月十五）
                const midAutumn = LunarCalendar.lunarToSolar(
                    currentYear,
                    8,
                    15
                );
                if (midAutumn) {
                    const midAutumnDate = new Date(
                        midAutumn.year,
                        midAutumn.month - 1,
                        midAutumn.day
                    );
                    this.holidays[this.formatDate(midAutumnDate)] = '中秋节';
                }
            }
        } catch (e) {
            console.warn('加载农历节假日失败：', e);
        }

        return Promise.resolve();
    }

    getHoliday(date) {
        const dateStr = this.formatDate(date);
        return this.holidays[dateStr] || null;
    }
}

// 初始化日历
let calendar;

document.addEventListener('DOMContentLoaded', function () {
    // 延迟初始化，确保所有依赖都加载完成
    setTimeout(() => {
        calendar = new Calendar();

        // 隐藏页面加载器
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    }, 100);
});

// 导出calendar对象供全局使用
window.calendar = calendar;
