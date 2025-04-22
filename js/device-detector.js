/**
 * 设备检测和响应式布局修复
 * 用于确保不同设备被正确识别和响应
 */
(function () {
  // 设备类型检测
  const deviceDetector = {
    isMobile:
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
    isTablet:
      /(iPad|tablet|Tablet|PlayBook)/i.test(navigator.userAgent) ||
      (navigator.userAgent.match(/Android/i) &&
        !navigator.userAgent.match(/Mobile/i)),
    isDesktop:
      !/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/i.test(
        navigator.userAgent
      ),
  };

  // 向HTML标签添加设备类型标识，以便CSS可以针对特定设备类型设置样式
  const html = document.documentElement;

  if (deviceDetector.isMobile && !deviceDetector.isTablet) {
    html.classList.add("is-mobile");
  } else if (deviceDetector.isTablet) {
    html.classList.add("is-tablet");
  } else if (deviceDetector.isDesktop) {
    html.classList.add("is-desktop");
  }

  // 检测实际窗口尺寸并应用适当的类
  function updateViewportClass() {
    const width = window.innerWidth;
    html.classList.remove(
      "viewport-xs",
      "viewport-sm",
      "viewport-md",
      "viewport-lg",
      "viewport-xl"
    );

    if (width < 576) {
      html.classList.add("viewport-xs");
    } else if (width >= 576 && width < 768) {
      html.classList.add("viewport-sm");
    } else if (width >= 768 && width < 992) {
      html.classList.add("viewport-md");
    } else if (width >= 992 && width < 1200) {
      html.classList.add("viewport-lg");
    } else {
      html.classList.add("viewport-xl");
    }
  }

  // 初始化运行
  updateViewportClass();

  // 窗口调整大小时更新
  window.addEventListener("resize", updateViewportClass);

  // 暴露API到全局作用域，方便其他脚本使用
  window.deviceDetector = deviceDetector;

  // 打印当前设备信息，便于调试
  console.log("设备信息:", {
    是否移动设备: deviceDetector.isMobile && !deviceDetector.isTablet,
    是否平板设备: deviceDetector.isTablet,
    是否桌面设备: deviceDetector.isDesktop,
    视口宽度: window.innerWidth,
    视口高度: window.innerHeight,
  });
})();
