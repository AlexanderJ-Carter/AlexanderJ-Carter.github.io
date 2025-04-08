// 获取弹窗元素
const modal = document.getElementById("myModal");
const closeButton = document.getElementById("closeBtn");
const dontShowButton = document.getElementById("dontShowBtn");

document.addEventListener("DOMContentLoaded", function () {
  // 只在1月份显示新年祝福
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0表示1月

  // 检查是否为1月份(0)
  if (currentMonth === 0) {
    // 检查localStorage中是否已经关闭了今日提醒
    const lastClosed = localStorage.getItem("newYearModalClosed");
    const today = new Date().toDateString();

    if (lastClosed !== today) {
      setTimeout(function () {
        document.getElementById("myModal").style.display = "flex";
      }, 1500);
    }
  }

  // 当页面加载时检查是否显示弹窗
  window.onload = function () {
    const today = new Date().toLocaleDateString();
    const lastShown = localStorage.getItem("lastNewYearGreeting");

    if (lastShown !== today) {
      modal.style.display = "block";
    }
  };

  // 关闭按钮点击事件
  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  // 今日不再提醒按钮点击事件
  dontShowButton.onclick = function () {
    const today = new Date().toLocaleDateString();
    localStorage.setItem("lastNewYearGreeting", today);
    modal.style.display = "none";
  };

  // 点击弹窗外部关闭
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
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
    }, 300);
  }

  // 添加"今日不再提醒"功能
  document.getElementById("dontShowBtn").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
    // 记录今天的日期，今天内不再显示
    localStorage.setItem("newYearModalClosed", new Date().toDateString());
  });
});
