/**
 * 语言切换功能
 * 实现更智能的语言切换和记忆功能
 */
document.addEventListener("DOMContentLoaded", function () {
  // 获取语言偏好
  const getUserLanguagePreference = () => {
    // 首先检查用户之前的选择
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) return savedLanguage;

    // 其次检查浏览器语言
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith("zh")) return "zh";
    if (browserLang.startsWith("en")) return "en";
    if (browserLang.startsWith("it")) return "it";

    // 默认中文
    return "zh";
  };

  // 根据当前页面设置语言切换器
  const setActiveLanguage = () => {
    const currentPath = window.location.pathname;
    let activeLanguage = "zh"; // 默认中文

    if (currentPath.includes("index-en.html")) {
      activeLanguage = "en";
    } else if (currentPath.includes("index-it.html")) {
      activeLanguage = "it";
    }

    // 设置切换器视觉状态
    const langItems = document.querySelectorAll(".lang-item");
    langItems.forEach((item) => {
      if (
        (activeLanguage === "zh" &&
          item.getAttribute("href").includes("index.html") &&
          !item.getAttribute("href").includes("index-")) ||
        (activeLanguage === "en" &&
          item.getAttribute("href").includes("index-en.html")) ||
        (activeLanguage === "it" &&
          item.getAttribute("href").includes("index-it.html"))
      ) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // 在语言切换按钮上显示当前语言
    const currentLangElement = document.querySelector(".current-lang");
    if (currentLangElement) {
      if (activeLanguage === "zh") currentLangElement.textContent = "简体中文";
      if (activeLanguage === "en") currentLangElement.textContent = "English";
      if (activeLanguage === "it") currentLangElement.textContent = "Italiano";
    }
  };

  // 保存用户语言选择
  const saveLanguagePreference = (lang) => {
    localStorage.setItem("preferredLanguage", lang);
  };

  // 语言切换点击处理
  document.addEventListener("click", function (e) {
    const langItem = e.target.closest(".lang-item");
    if (langItem) {
      // 提取语言代码
      const href = langItem.getAttribute("href");
      let lang = "zh";

      if (href.includes("index-en.html")) {
        lang = "en";
      } else if (href.includes("index-it.html")) {
        lang = "it";
      }

      saveLanguagePreference(lang);
    }
  });

  // 初始化
  setActiveLanguage();

  // 首次访问时，根据用户偏好重定向
  const isFirstVisit = !localStorage.getItem("visited");
  if (isFirstVisit) {
    localStorage.setItem("visited", "true");

    const currentPath = window.location.pathname;
    const preferredLanguage = getUserLanguagePreference();

    // 只有在主页时才执行自动重定向
    if (currentPath.endsWith("index.html") || currentPath.endsWith("/")) {
      if (preferredLanguage === "en") {
        window.location.href = "index-en.html";
      } else if (preferredLanguage === "it") {
        window.location.href = "index-it.html";
      }
    }
  }
});
