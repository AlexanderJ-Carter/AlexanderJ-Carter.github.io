document.addEventListener("DOMContentLoaded", function () {
    // 获取元素
    const modal = document.getElementById("myModal");
    const closeBtn = document.getElementById("closeBtn");
    const dontShowBtn = document.getElementById("dontShowBtn");

    // 检查是否在新年期间
    function isNearNewYear() {
        const now = new Date();
        const year = now.getFullYear();

        // 定义新年时段：12月20日至次年2月10日
        const newYearStart = new Date(year, 11, 20); // 12月20日
        const newYearEnd = new Date(year + 1, 1, 10); // 2月10日

        // 如果当前时间是新的一年，需要调整newYearStart
        if (now.getMonth() < 2 || (now.getMonth() === 2 && now.getDate() <= 10)) {
            newYearStart.setFullYear(year - 1);
        }

        return now >= newYearStart && now <= newYearEnd;
    }

    // 仅在新年期间显示祝福弹窗
    if (isNearNewYear()) {
        // 检查用户是否已经看过祝福
        const today = new Date().toDateString();
        const lastShown = localStorage.getItem("lastNewYearGreeting");

        if (lastShown !== today) {
            setTimeout(showModal, 1500);
        }
    }

    // 关闭按钮事件
    closeBtn.onclick = function () {
        hideModal();
    };

    // "今日不再提醒"按钮事件
    dontShowBtn.onclick = function () {
        localStorage.setItem("lastNewYearGreeting", today);
        hideModal();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            hideModal();
        }
    };

    // 添加弹窗动画效果
    function showModal() {
        modal.style.display = "block";
        modal.classList.add("fade-in");
    }

    function hideModal() {
        modal.classList.add("fade-out");
        setTimeout(() => {
            modal.style.display = "none";
            modal.classList.remove("fade-out");
            modal.classList.remove("fade-in");
        }, 300);
    }
});
