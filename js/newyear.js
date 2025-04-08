// 获取弹窗元素
const modal = document.getElementById("myModal");
const closeButton = document.getElementById("closeBtn");
const dontShowButton = document.getElementById("dontShowBtn");

// 当页面加载时检查是否显示弹窗
window.onload = function () {
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // 月份从0开始，所以加1
  const todayString = today.toLocaleDateString();
  const lastShown = localStorage.getItem("lastNewYearGreeting");

  // 只在1月份（新年期间）显示新年祝福
  if (currentMonth === 1 && lastShown !== todayString) {
    showModal();
  }
};

// 关闭按钮点击事件
closeButton.onclick = function () {
  hideModal();
};

// 今日不再提醒按钮点击事件
dontShowButton.onclick = function () {
  const today = new Date().toLocaleDateString();
  localStorage.setItem("lastNewYearGreeting", today);
  hideModal();
};

// 点击弹窗外部关闭
window.onclick = function (event) {
  if (event.target == modal) {
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
