// 获取弹窗
var modal = document.getElementById("myModal");

// 获取关闭按钮和不再显示按钮
var closeButton = document.getElementById("closeBtn");
var dontShowButton = document.getElementById("dontShowBtn");

// 当页面加载时，显示弹窗
window.onload = function () {
  if (!localStorage.getItem("hideNewYearGreeting")) {
    modal.style.display = "block";
  }
};

// 当用户点击关闭按钮，关闭弹窗
closeButton.onclick = function () {
  modal.style.display = "none";
};

// 当用户点击不再显示按钮，关闭弹窗并设置不再显示
dontShowButton.onclick = function () {
  modal.style.display = "none";
  localStorage.setItem("hideNewYearGreeting", "true");
};

// 当用户点击弹窗外部，关闭弹窗
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
