document.addEventListener("DOMContentLoaded", function () {
    // 获取DOM元素
    const qrModal = document.getElementById("qr-modal");
    const qrImage = document.getElementById("qr-image");
    const qrTitle = document.getElementById("qr-title");
    const qrDesc = document.getElementById("qr-desc");
    const modalContent = document.querySelector(".qr-modal-content");
    const copyBtn = document.getElementById("copy-btn");

    // 检测页面语言
    const pageLanguage = document.documentElement.lang;

    // 多语言提示消息
    const messages = {
        zh: {
            wechatCopied: "微信号已复制到剪贴板！",
            qqCopied: "QQ号已复制到剪贴板！",
            copyFailed: "复制失败，请手动复制",
            copySuccess: "复制成功!"
        },
        en: {
            wechatCopied: "WeChat ID copied to clipboard!",
            qqCopied: "QQ number copied to clipboard!",
            copyFailed: "Copy failed, please copy manually",
            copySuccess: "Copied successfully!"
        },
        it: {
            wechatCopied: "ID WeChat copiato negli appunti!",
            qqCopied: "Numero QQ copiato negli appunti!",
            copyFailed: "Copia fallita, si prega di copiare manualmente",
            copySuccess: "Copiato con successo!"
        }
    };

    // 根据页面语言选择消息
    let lang = "zh"; // 默认中文
    if (pageLanguage === "en") {
        lang = "en";
    } else if (pageLanguage === "it") {
        lang = "it";
    }

    // 联系方式数据
    const contactData = {
        wechat: {
            title: {
                zh: "添加微信好友",
                en: "Add WeChat Contact",
                it: "Aggiungi Contatto WeChat"
            },
            image: "img/QR/wechat-qr.jpg",
            desc: {
                zh: "扫描二维码或复制微信号添加好友",
                en: "Scan QR code or copy WeChat ID to add contact",
                it: "Scansiona il codice QR o copia l'ID WeChat per aggiungere contatto"
            },
            id: "18699092910",
        },
        qq: {
            title: {
                zh: "添加QQ好友",
                en: "Add QQ Contact",
                it: "Aggiungi Contatto QQ"
            },
            image: "img/QR/qq-qr.jpg",
            desc: {
                zh: "扫描二维码或复制QQ号添加好友",
                en: "Scan QR code or copy QQ number to add contact",
                it: "Scansiona il codice QR o copia il numero QQ per aggiungere contatto"
            },
            id: "2253940186",
        },
    };

    // 添加卡片悬停效果
    const contactItems = document.querySelectorAll(".contact-item");
    contactItems.forEach((item) => {
        // 创建发光效果
        const glowEffect = (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            item.style.setProperty("--x-position", `${x}px`);
            item.style.setProperty("--y-position", `${y}px`);
        };

        item.addEventListener("mousemove", glowEffect);
    });

    // 打开二维码弹窗
    window.openQrModal = function (type) {
        if (!contactData[type]) return;

        const data = contactData[type];

        // 设置弹窗内容
        qrTitle.textContent = data.title[lang];
        qrImage.src = data.image;
        qrImage.alt = data.title[lang];
        qrDesc.textContent = data.desc[lang];
        copyBtn.setAttribute("data-id", data.id);
        copyBtn.setAttribute("data-type", type === "wechat" ? "wechat" : "qq");

        // 显示弹窗并添加动画
        qrModal.classList.add("show");
        setTimeout(() => {
            modalContent.style.transform = "scale(1)";
            modalContent.style.opacity = "1";
        }, 50);

        // 禁止背景滚动
        document.body.style.overflow = "hidden";

        // 添加键盘事件监听
        document.addEventListener("keydown", handleKeyDown);
    };

    // 处理键盘事件
    const handleKeyDown = function (e) {
        if (e.key === "Escape") {
            closeQrModal();
        }
    };

    // 关闭二维码弹窗
    window.closeQrModal = function () {
        modalContent.style.transform = "scale(0.9)";
        modalContent.style.opacity = "0";

        setTimeout(() => {
            qrModal.classList.remove("show");
            document.body.style.overflow = "";
        }, 300);

        // 移除键盘事件监听
        document.removeEventListener("keydown", handleKeyDown);
    };

    // 点击弹窗外部关闭
    qrModal.addEventListener("click", function (e) {
        if (e.target === qrModal) {
            closeQrModal();
        }
    });

    // 复制联系方式
    window.copyContact = function () {
        const id = copyBtn.getAttribute("data-id");
        const type = copyBtn.getAttribute("data-type");

        navigator.clipboard
            .writeText(id)
            .then(() => {
                const message = type === "wechat" ? messages[lang].wechatCopied : messages[lang].qqCopied;
                showToast(message);

                // 添加按钮反馈效果
                copyBtn.classList.add("success");
                copyBtn.style.backgroundColor = "#28a745";
                copyBtn.textContent = messages[lang].copySuccess;

                setTimeout(() => {
                    copyBtn.classList.remove("success");
                    copyBtn.style.backgroundColor = "";
                    copyBtn.textContent = lang === "zh" ? "复制账号" :
                        (lang === "en" ? "Copy ID" : "Copia ID");
                }, 2000);
            })
            .catch((err) => {
                console.error("复制失败:", err);
                showToast(messages[lang].copyFailed);
            });
    };

    // 显示提示消息
    window.showToast = function (message) {
        // 移除现有的toast
        const existingToast = document.querySelector(".toast");
        if (existingToast) {
            document.body.removeChild(existingToast);
        }

        // 创建新的toast
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;

        document.body.appendChild(toast);

        // 显示toast
        setTimeout(() => {
            toast.classList.add("show");
        }, 10);

        // 3秒后隐藏
        setTimeout(() => {
            toast.classList.remove("show");

            // 动画完成后移除元素
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    };

    // 页面滚动添加效果
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const container = document.querySelector(".contact-container");

        if (scrollPosition > 50) {
            container.style.boxShadow = "0 30px 60px -15px rgba(0, 0, 0, 0.2)";
        } else {
            container.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.15)";
        }
    };

    window.addEventListener("scroll", handleScroll);
});
