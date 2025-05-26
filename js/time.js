/**
 * 时间服务JavaScript功能
 */

// 时区配置
const TIMEZONES = [
    {
        name: 'UTC',
        displayName: '协调世界时',
        flag: '🌍',
        offset: 0,
        format: 'en-US',
    },
    {
        name: 'Beijing',
        displayName: '北京时间',
        flag: '🇨🇳',
        offset: 8,
        format: 'zh-CN',
    },
    {
        name: 'Tokyo',
        displayName: '东京时间',
        flag: '🇯🇵',
        offset: 9,
        format: 'ja-JP',
    },
    {
        name: 'New York',
        displayName: '纽约时间',
        flag: '🇺🇸',
        offset: -5, // EST
        format: 'en-US',
    },
    {
        name: 'Los Angeles',
        displayName: '洛杉矶时间',
        flag: '🇺🇸',
        offset: -8, // PST
        format: 'en-US',
    },
    {
        name: 'London',
        displayName: '伦敦时间',
        flag: '🇬🇧',
        offset: 0, // GMT
        format: 'en-GB',
    },
    {
        name: 'Paris',
        displayName: '巴黎时间',
        flag: '🇫🇷',
        offset: 1, // CET
        format: 'fr-FR',
    },
    {
        name: 'Sydney',
        displayName: '悉尼时间',
        flag: '🇦🇺',
        offset: 11, // AEDT
        format: 'en-AU',
    },
];

let updateInterval;
let lastUpdateTime;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    initializeTimeService();
    startTimeUpdates();
    setupEventListeners();
});

// 初始化时间服务
function initializeTimeService() {
    updateCurrentTime();
    generateTimezoneGrid();
    updateSyncStatus('synced');
}

// 开始定时更新
function startTimeUpdates() {
    updateInterval = setInterval(() => {
        updateCurrentTime();
        updateAllTimezones();
        updateSyncStatus('synced');
    }, 1000);
}

// 更新当前时间
function updateCurrentTime() {
    const now = new Date();

    // 更新主时间显示
    const mainTimeElement = document.getElementById('mainTime');
    if (mainTimeElement) {
        mainTimeElement.textContent = now.toLocaleTimeString('zh-CN', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }

    // 更新日期
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        });
    }

    // 更新时间戳
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        timestampElement.textContent = Math.floor(now.getTime() / 1000);
    }

    // 更新ISO时间
    const isoElement = document.getElementById('isoTime');
    if (isoElement) {
        isoElement.textContent = now.toISOString();
    }

    lastUpdateTime = now;
    updateLastUpdateDisplay();
}

// 生成时区网格
function generateTimezoneGrid() {
    const grid = document.getElementById('timezoneGrid');
    if (!grid) return;

    grid.innerHTML = '';

    TIMEZONES.forEach((timezone) => {
        const card = createTimezoneCard(timezone);
        grid.appendChild(card);
    });
}

// 创建时区卡片
function createTimezoneCard(timezone) {
    const card = document.createElement('div');
    card.className = 'timezone-card';
    card.setAttribute('data-timezone', timezone.name);

    const now = new Date();
    const timezoneTime = new Date(
        now.getTime() +
            timezone.offset * 3600000 +
            now.getTimezoneOffset() * 60000
    );

    card.innerHTML = `
        <div class="timezone-header">
            <div class="timezone-name">${timezone.displayName}</div>
            <div class="timezone-flag">${timezone.flag}</div>
        </div>
        <div class="timezone-time" data-time="${timezone.name}">
            ${timezoneTime.toLocaleTimeString(timezone.format, {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })}
        </div>
        <div class="timezone-date">
            ${timezoneTime.toLocaleDateString(timezone.format, {
                month: 'short',
                day: 'numeric',
                weekday: 'short',
            })}
        </div>
        <div class="timezone-offset">
            UTC${timezone.offset >= 0 ? '+' : ''}${timezone.offset}
        </div>
    `;

    return card;
}

// 更新所有时区
function updateAllTimezones() {
    const now = new Date();

    TIMEZONES.forEach((timezone) => {
        const timeElement = document.querySelector(
            `[data-time="${timezone.name}"]`
        );
        if (timeElement) {
            const timezoneTime = new Date(
                now.getTime() +
                    timezone.offset * 3600000 +
                    now.getTimezoneOffset() * 60000
            );
            timeElement.textContent = timezoneTime.toLocaleTimeString(
                timezone.format,
                {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }
            );
        }
    });
}

// 更新同步状态
function updateSyncStatus(status) {
    const indicator = document.getElementById('syncIndicator');
    if (!indicator) return;

    indicator.className = `sync-indicator ${status}`;

    switch (status) {
        case 'synced':
            indicator.innerHTML = '<i class="fas fa-check-circle"></i> 已同步';
            break;
        case 'syncing':
            indicator.innerHTML = '<i class="fas fa-sync-alt"></i> 同步中...';
            break;
        case 'error':
            indicator.innerHTML =
                '<i class="fas fa-exclamation-triangle"></i> 同步失败';
            break;
    }
}

// 更新最后更新时间显示
function updateLastUpdateDisplay() {
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (lastUpdateElement && lastUpdateTime) {
        lastUpdateElement.textContent =
            lastUpdateTime.toLocaleTimeString('zh-CN');
    }
}

// 复制到剪贴板
function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            showToast('已复制到剪贴板');
        })
        .catch((err) => {
            console.error('复制失败:', err);
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('已复制到剪贴板');
        });
}

// 显示提示信息
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;

    document.body.appendChild(toast);

    // 显示动画
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);

    // 自动隐藏
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 设置事件监听器
function setupEventListeners() {
    // 复制按钮点击事件
    document.querySelectorAll('.copy-btn').forEach((btn) => {
        btn.addEventListener('click', function () {
            const codeElement = this.parentElement.querySelector('code');
            if (codeElement) {
                copyToClipboard(codeElement.textContent);
            }
        });
    });

    // 页面失焦/获焦处理
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            // 页面失焦时清除定时器
            if (updateInterval) {
                clearInterval(updateInterval);
            }
        } else {
            // 页面获焦时重新开始更新
            startTimeUpdates();
        }
    });

    // 窗口关闭前清理
    window.addEventListener('beforeunload', function () {
        if (updateInterval) {
            clearInterval(updateInterval);
        }
    });
}

// API数据生成函数（与HTML中的函数一致）
function generateTimeData() {
    const now = new Date();
    const timezones = {};

    TIMEZONES.forEach((timezone) => {
        const timezoneTime = new Date(
            now.getTime() +
                timezone.offset * 3600000 +
                now.getTimezoneOffset() * 60000
        );
        timezones[timezone.name] = {
            time: timezoneTime.toISOString(),
            offset: timezone.offset,
            displayName: timezone.displayName,
        };
    });

    return {
        timestamp: Math.floor(now.getTime() / 1000),
        iso_8601: now.toISOString(),
        utc: now.toUTCString(),
        local: now.toString(),
        timezone_offset: now.getTimezoneOffset(),
        timezones: timezones,
        server_time: now.toISOString(),
        generated_at: new Date().toISOString(),
    };
}

// 导出供外部使用
window.TimeService = {
    generateTimeData,
    copyToClipboard,
    updateCurrentTime,
    TIMEZONES,
};
