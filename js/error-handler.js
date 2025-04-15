window.addEventListener("error", function (e) {
  console.error("页面错误:", e.message);
  // 记录错误日志
  logError(e);
});

window.addEventListener("unhandledrejection", function (e) {
  console.error("未处理的Promise拒绝:", e.reason);
  // 记录错误日志
  logError(e.reason);
});

function logError(error) {
  // 这里可以添加错误上报逻辑
  console.log("错误已记录:", error);

  // 检查是否是404错误
  if (
    error &&
    (error.status === 404 || (error.message && error.message.includes("404")))
  ) {
    handle404();
  }
}

// 处理404错误
function handle404() {
  console.log("检测到404错误，正在跳转到404页面...");
  window.location.href = "/404.html";
}

// 监听AJAX请求错误
document.addEventListener("DOMContentLoaded", function () {
  // 拦截XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function () {
    this.addEventListener("load", function () {
      if (this.status === 404) {
        console.error("AJAX请求404错误");
        logError({ status: 404, message: "AJAX请求资源未找到" });
      }
    });
    originalXHROpen.apply(this, arguments);
  };

  // 拦截fetch请求
  const originalFetch = window.fetch;
  window.fetch = function () {
    return originalFetch.apply(this, arguments).then((response) => {
      if (response.status === 404) {
        console.error("Fetch请求404错误");
        logError({ status: 404, message: "Fetch请求资源未找到" });
      }
      return response;
    });
  };
});
