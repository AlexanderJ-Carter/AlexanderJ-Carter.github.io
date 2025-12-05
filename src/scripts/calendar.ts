interface HolidayInfo {
    name: string;
    type: string;
  }

  let currentDate = new Date();
  const localHolidays: Record<string, HolidayInfo> = {
    '2024-01-01': { name: '元旦', type: 'national' },
    '2024-02-10': { name: '春节', type: 'spring' },
    '2024-02-11': { name: '春节', type: 'spring' },
    '2024-02-12': { name: '春节', type: 'spring' },
    '2024-02-13': { name: '春节', type: 'spring' },
    '2024-02-14': { name: '春节', type: 'spring' },
    '2024-02-15': { name: '春节', type: 'spring' },
    '2024-02-16': { name: '春节', type: 'spring' },
    '2024-02-17': { name: '春节', type: 'spring' },
    '2024-04-04': { name: '清明节', type: 'qingming' },
    '2024-04-05': { name: '清明节', type: 'qingming' },
    '2024-04-06': { name: '清明节', type: 'qingming' },
    '2024-05-01': { name: '劳动节', type: 'labor' },
    '2024-05-02': { name: '劳动节', type: 'labor' },
    '2024-05-03': { name: '劳动节', type: 'labor' },
    '2024-05-04': { name: '劳动节', type: 'labor' },
    '2024-05-05': { name: '劳动节', type: 'labor' },
    '2024-06-10': { name: '端午节', type: 'dragon' },
    '2024-09-15': { name: '中秋节', type: 'mid-autumn' },
    '2024-09-16': { name: '中秋节', type: 'mid-autumn' },
    '2024-09-17': { name: '中秋节', type: 'mid-autumn' },
    '2024-10-01': { name: '国庆节', type: 'national' },
    '2024-10-02': { name: '国庆节', type: 'national' },
    '2024-10-03': { name: '国庆节', type: 'national' },
    '2024-10-04': { name: '国庆节', type: 'national' },
    '2024-10-05': { name: '国庆节', type: 'national' },
    '2024-10-06': { name: '国庆节', type: 'national' },
    '2024-10-07': { name: '国庆节', type: 'national' },
    '2025-01-01': { name: '元旦', type: 'national' },
    '2025-02-10': { name: '春节', type: 'spring' },
    '2025-02-11': { name: '春节', type: 'spring' },
    '2025-02-12': { name: '春节', type: 'spring' },
    '2025-02-13': { name: '春节', type: 'spring' },
    '2025-02-14': { name: '春节', type: 'spring' },
    '2025-02-15': { name: '春节', type: 'spring' },
    '2025-02-16': { name: '春节', type: 'spring' },
    '2025-02-17': { name: '春节', type: 'spring' },
    '2025-04-04': { name: '清明节', type: 'qingming' },
    '2025-04-05': { name: '清明节', type: 'qingming' },
    '2025-04-06': { name: '清明节', type: 'qingming' },
    '2025-05-01': { name: '劳动节', type: 'labor' },
    '2025-05-02': { name: '劳动节', type: 'labor' },
    '2025-05-03': { name: '劳动节', type: 'labor' },
    '2025-05-04': { name: '劳动节', type: 'labor' },
    '2025-05-05': { name: '劳动节', type: 'labor' },
    '2025-06-11': { name: '端午节', type: 'dragon' },
    '2025-09-17': { name: '中秋节', type: 'mid-autumn' },
    '2025-09-18': { name: '中秋节', type: 'mid-autumn' },
    '2025-09-19': { name: '中秋节', type: 'mid-autumn' },
    '2025-10-01': { name: '国庆节', type: 'national' },
    '2025-10-02': { name: '国庆节', type: 'national' },
    '2025-10-03': { name: '国庆节', type: 'national' },
    '2025-10-04': { name: '国庆节', type: 'national' },
    '2025-10-05': { name: '国庆节', type: 'national' },
    '2025-10-06': { name: '国庆节', type: 'national' },
    '2025-10-07': { name: '国庆节', type: 'national' },
    '2026-01-01': { name: '元旦', type: 'national' },
    '2026-01-29': { name: '春节', type: 'spring' },
    '2026-01-30': { name: '春节', type: 'spring' },
    '2026-01-31': { name: '春节', type: 'spring' },
    '2026-02-01': { name: '春节', type: 'spring' },
    '2026-02-02': { name: '春节', type: 'spring' },
    '2026-02-03': { name: '春节', type: 'spring' },
    '2026-02-04': { name: '春节', type: 'spring' },
    '2026-02-05': { name: '春节', type: 'spring' },
    '2026-04-04': { name: '清明节', type: 'qingming' },
    '2026-04-05': { name: '清明节', type: 'qingming' },
    '2026-04-06': { name: '清明节', type: 'qingming' },
    '2026-05-01': { name: '劳动节', type: 'labor' },
    '2026-05-02': { name: '劳动节', type: 'labor' },
    '2026-05-03': { name: '劳动节', type: 'labor' },
    '2026-05-04': { name: '劳动节', type: 'labor' },
    '2026-05-05': { name: '劳动节', type: 'labor' },
    '2026-06-01': { name: '端午节', type: 'dragon' },
    '2026-09-25': { name: '中秋节', type: 'mid-autumn' },
    '2026-09-26': { name: '中秋节', type: 'mid-autumn' },
    '2026-09-27': { name: '中秋节', type: 'mid-autumn' },
    '2026-10-01': { name: '国庆节', type: 'national' },
    '2026-10-02': { name: '国庆节', type: 'national' },
    '2026-10-03': { name: '国庆节', type: 'national' },
    '2026-10-04': { name: '国庆节', type: 'national' },
    '2026-10-05': { name: '国庆节', type: 'national' },
    '2026-10-06': { name: '国庆节', type: 'national' },
    '2026-10-07': { name: '国庆节', type: 'national' },
  };
  const remoteHolidays: Record<string, HolidayInfo> = {};
  const loadedYears = new Set<number>();

  async function ensureHolidayYear(year: number) {
    if (loadedYears.has(year)) return;
    try {
      const res = await fetch(`https://timor.tech/api/holiday/year/${year}`);
      if (!res.ok) throw new Error('holiday api failed');
      const data = await res.json();
      if (data && data.holiday) {
        Object.entries(data.holiday).forEach(([date, info]: [string, any]) => {
          if (info.holiday) {
            remoteHolidays[date] = {
              name: info.name || info.holiday,
              type: info.type || 'holiday',
            };
          }
        });
      }
      loadedYears.add(year);
    } catch (err) {
      console.warn('使用内置节假日数据', err);
      loadedYears.add(year);
    }
  }

  function getHoliday(dateStr: string): HolidayInfo | undefined {
    return remoteHolidays[dateStr] || localHolidays[dateStr];
  }

  function drawCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const currentMonthEl = document.getElementById('currentMonth');
    if (currentMonthEl) {
      currentMonthEl.textContent = `${year}年${month + 1}月`;
    }

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const grid = document.getElementById('calendarGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const today = new Date();
    let date = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dayElement = document.createElement('div');
      const dateStr = date.toISOString().split('T')[0];
      const holidayInfo = getHoliday(dateStr);
      const isToday = date.toDateString() === today.toDateString();
      const isCurrentMonth = date.getMonth() === month;

      let className =
        'aspect-square flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-300 p-1 text-sm font-medium ';

      if (!isCurrentMonth) {
        className +=
          'text-[rgb(var(--color-text-secondary))] bg-[rgb(var(--color-bg-secondary))]';
      } else if (holidayInfo) {
        className +=
          'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:scale-110';
      } else if (isToday) {
        className +=
          'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg';
      } else {
        className +=
          'bg-[rgb(var(--color-bg-secondary))] hover:bg-[rgb(var(--color-bg-accent))]';
      }

      dayElement.className = className;
      dayElement.title = holidayInfo ? holidayInfo.name : '';
      dayElement.innerHTML = `
        <span>${date.getDate()}</span>
        ${holidayInfo ? `<span class="text-xs">${holidayInfo.name.substring(0, 2)}</span>` : ''}
      `;

      grid.appendChild(dayElement);
      date.setDate(date.getDate() + 1);
    }

    updateTodayInfo();
    updateHolidayList();
  }

  async function renderCalendar() {
    await ensureHolidayYear(currentDate.getFullYear());
    drawCalendar();
  }

  function updateTodayInfo() {
    const today = new Date();
    const days = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
    ];
    const todayDateEl = document.getElementById('todayDate');
    if (todayDateEl) {
      todayDateEl.textContent = today.toLocaleDateString('zh-CN');
    }
    const todayDayEl = document.getElementById('todayDay');
    if (todayDayEl) {
      todayDayEl.textContent = days[today.getDay()];
    }

    const time = today.toLocaleTimeString('zh-CN', { hour12: false });
    const currentTimeEl = document.getElementById('currentTime');
    if (currentTimeEl) {
      currentTimeEl.textContent = time;
    }
  }

  function updateHolidayList() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const holidayList = document.getElementById('holidayList');
    if (!holidayList) return;

    const monthHolidays = Object.entries({
      ...localHolidays,
      ...remoteHolidays,
    })
      .filter(([date]) =>
        date.startsWith(`${year}-${String(month).padStart(2, '0')}`)
      )
      .map(([date, info]) => ({
        date: new Date(date + 'T00:00:00').getDate(),
        name: info.name,
        type: info.type,
      }))
      .sort((a, b) => a.date - b.date);

    const uniqueHolidays: {date: number, name: string}[] = [];
    const seen = new Set<string>();
    monthHolidays.forEach((h) => {
      if (!seen.has(h.name)) {
        uniqueHolidays.push(h);
        seen.add(h.name);
      }
    });

    if (uniqueHolidays.length === 0) {
      holidayList.innerHTML =
        '<p class="text-[rgb(var(--color-text-secondary))]">本月无特殊节假日</p>';
    } else {
      holidayList.innerHTML = uniqueHolidays
        .map(
          (holiday) =>
            `<p class="flex items-center gap-2"><span class="text-lg">📍</span><span>${holiday.name}</span></p>`
        )
        .join('');
    }
  }

  function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  }

  function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  }

  function addEvent() {
    const nameInput = document.getElementById('eventName') as HTMLInputElement | null;
    const dateInput = document.getElementById('eventDate') as HTMLInputElement | null;

    if (!nameInput?.value || !dateInput?.value) {
      alert('请输入事件名称和日期');
      return;
    }

    alert(`✓ 已添加事件: ${nameInput.value} (${dateInput.value})`);
    if(nameInput) nameInput.value = '';
    if(dateInput) dateInput.value = '';
  }

  (window as any).prevMonth = prevMonth;
  (window as any).nextMonth = nextMonth;
  (window as any).addEvent = addEvent;


  setInterval(updateTodayInfo, 1000);
  renderCalendar();
