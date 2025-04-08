// 获取弹窗元素
const modal = document.getElementById("myModal");
const closeButton = document.getElementById("closeBtn");
const dontShowButton = document.getElementById("dontShowBtn");

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
