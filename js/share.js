function shareToSocial(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const desc = encodeURIComponent("探索创意，分享生活，记录每一个精彩瞬间");

  let shareUrl = "";

  switch (platform) {
    case "weibo":
      shareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${title}`;
      break;
    case "qq":
      shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&desc=${desc}`;
      break;
    case "wechat":
      generateWechatQR(url);
      return;
    case "douyin":
      shareUrl = `https://www.douyin.com/share/video?url=${url}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank", "width=600,height=500");
  }
}

function generateWechatQR(url) {
  // 检查是否已存在模态框
  let existingModal = document.querySelector(".qr-modal");
  if (existingModal) {
    existingModal.remove();
  }

  // 创建模态框
  const modal = document.createElement("div");
  modal.className = "qr-modal";
  modal.innerHTML = `
    <div class="qr-container">
      <div class="qr-header">
        <h4>微信扫码分享</h4>
        <button class="close-btn" aria-label="关闭">×</button>
      </div>
      <div class="qr-content">
        <div class="loading-spinner"></div>
        <div id="wechat-qrcode"></div>
        <p class="qr-tip">请打开微信"扫一扫"</p>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // 添加关闭事件
  const closeBtn = modal.querySelector(".close-btn");
  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  // 生成二维码
  try {
    new QRCode(document.getElementById("wechat-qrcode"), {
      text: url,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    // 隐藏加载动画
    modal.querySelector(".loading-spinner").style.display = "none";
  } catch (error) {
    console.error("生成二维码失败:", error);
    modal.querySelector(".qr-content").innerHTML = `
      <p class="error-message">二维码生成失败，请稍后重试</p>
    `;
  }
}

// 添加相关样式
const style = document.createElement("style");
style.textContent = `
  .qr-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .qr-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    width: 90%;
  }

  .qr-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    color: #666;
  }

  .qr-content {
    text-align: center;
  }

  .loading-spinner {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    margin: 20px auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .qr-tip {
    margin-top: 15px;
    color: #666;
  }

  .error-message {
    color: #ff4444;
    margin: 20px 0;
  }
`;

document.head.appendChild(style);
