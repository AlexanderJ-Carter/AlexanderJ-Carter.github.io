/**
 * Cookie同意弹窗处理脚本
 * 提供Cookie同意功能和用户选择记录
 */
document.addEventListener("DOMContentLoaded", function () {
  // 获取DOM元素
  const cookieConsent = document.getElementById("cookieConsent");
  const acceptCookie = document.getElementById("acceptCookie");
  const rejectCookie = document.getElementById("rejectCookie");

  // 检查之前是否已经设置了Cookie偏好
  function checkCookieConsent() {
    try {
      // 检查localStorage是否可用
      if (typeof localStorage !== "undefined") {
        const consentStatus = localStorage.getItem("cookieConsent");
        return consentStatus === "true" || consentStatus === "essential";
      }
      return false;
    } catch (e) {
      console.error("检查Cookie同意状态时出错:", e);
      return false;
    }
  }

  // 如果还未设置偏好，显示Cookie弹窗
  if (!checkCookieConsent() && cookieConsent) {
    try {
      cookieConsent.style.display = "block";
    } catch (e) {
      console.error("显示Cookie同意弹窗时出错:", e);
    }
  }

  // 接受所有Cookie事件处理
  if (acceptCookie) {
    acceptCookie.addEventListener("click", function () {
      try {
        localStorage.setItem("cookieConsent", "true");
        if (cookieConsent) {
          cookieConsent.style.display = "none";
          // 显示接受成功的简短提示
          showConsentFeedback("已接受所有Cookie", "success");
        }
        enableAllCookies();
      } catch (e) {
        console.error("接受Cookie时出错:", e);
      }
    });
  }

  // 仅接受必要Cookie事件处理
  if (rejectCookie) {
    rejectCookie.addEventListener("click", function () {
      try {
        localStorage.setItem("cookieConsent", "essential");
        if (cookieConsent) {
          cookieConsent.style.display = "none";
          // 显示接受基本Cookie的提示
          showConsentFeedback("仅启用必要Cookie", "info");
        }
        disableNonEssentialCookies();
      } catch (e) {
        console.error("拒绝非必要Cookie时出错:", e);
      }
    });
  }

  // 显示用户反馈提示
  function showConsentFeedback(message, type) {
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = `cookie-feedback ${type}`;
    feedbackDiv.innerHTML = `
      <div class="feedback-content">
        <i class="fas ${
          type === "success" ? "fa-check-circle" : "fa-info-circle"
        }"></i>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(feedbackDiv);

    // 2秒后自动移除
    setTimeout(() => {
      feedbackDiv.classList.add("fade-out");
      setTimeout(() => {
        if (document.body.contains(feedbackDiv)) {
          document.body.removeChild(feedbackDiv);
        }
      }, 500);
    }, 2000);
  }

  // 启用所有Cookie功能
  function enableAllCookies() {
    // 这里可以添加启用分析工具、广告脚本等代码
    if (typeof initAnalytics === "function") {
      initAnalytics();
    }

    // 如果页面上有Google Analytics，初始化它
    if (window.ga || window.gtag) {
      console.log("启用分析功能");
    }
  }

  // 禁用非必要Cookie功能
  function disableNonEssentialCookies() {
    // 这里可以添加禁用非必要Cookie的代码
    console.log("已禁用非必要Cookie");

    // 例如：禁用Google Analytics
    window["ga-disable-UA-XXXXX-Y"] = true;
  }

  // 检查并设置当前语言的Cookie文本
  function setupLanguageText() {
    // 检测页面语言
    const lang = document.documentElement.lang || "zh-CN";
    const cookieTitle = document.querySelector(".cookie-message h6");
    const cookieText = document.querySelector(".cookie-message p");
    const acceptBtn = document.querySelector("#acceptCookie");
    const rejectBtn = document.querySelector("#rejectCookie");

    // 只有在页面加载时文本未正确设置的情况下才更改
    if (
      lang.startsWith("en") &&
      cookieTitle &&
      cookieText &&
      acceptBtn &&
      rejectBtn
    ) {
      if (cookieTitle.textContent === "Cookie 使用提示") {
        cookieTitle.textContent = "Cookie Notice";
        cookieText.innerHTML =
          'We use cookies to provide a better browsing experience. By continuing to use this site, you agree to our cookie policy. <a href="privacy.html" class="cookie-link">Learn more</a>';
        acceptBtn.innerHTML = '<i class="fas fa-check"></i> Accept';
        rejectBtn.textContent = "Essential Cookies Only";
      }
    }
  }

  // 初始化时检查语言设置
  setupLanguageText();
});

// 添加暗黑模式支持 - 如果网站启用了深色模式，Cookie弹窗也应该相应变化
document.addEventListener("themeChanged", function (e) {
  const cookieConsent = document.getElementById("cookieConsent");
  if (cookieConsent) {
    if (e.detail.theme === "dark") {
      cookieConsent.classList.add("dark-mode");
    } else {
      cookieConsent.classList.remove("dark-mode");
    }
  }
});

// 导出Cookie同意状态检查函数以供其他脚本使用
window.cookieConsentUtils = {
  hasConsent: function () {
    return localStorage.getItem("cookieConsent") === "true";
  },
  hasEssentialOnly: function () {
    return localStorage.getItem("cookieConsent") === "essential";
  },
  getConsentStatus: function () {
    return localStorage.getItem("cookieConsent") || "unknown";
  },
};
