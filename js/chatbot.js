document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatToggleButton = document.getElementById("chat-toggle-button");
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    const weatherApiKey = "e92adb1cc07788a547544fa7e9cfcc5e"; // 注意：在生产环境中应该通过环境变量或安全方式存储API密钥
    const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
    let isFirstOpen = true; // 检测是否首次打开对话框
    let isDragging = false; // 拖动状态
    const minimizedStored = localStorage.getItem('chatMinimized');
    let isMinimized = minimizedStored === null ? true : minimizedStored === 'true';
    let startX, startY, startLeft, startTop;
    let isClosing = false; // 跟踪是否正在关闭
    let closeTimeout; // 存储关闭延迟的timeout

    // 初始化聊天机器人位置 - 固定在右侧中间
    chatToggleButton.style.position = "fixed";
    chatToggleButton.style.right = "20px";
    chatToggleButton.style.top = "50%"; // 页面中间位置
    chatToggleButton.style.transform = "translateY(-50%)"; // 垂直居中
    chatToggleButton.style.zIndex = "1000";
    chatToggleButton.innerHTML = `<i class="fas fa-robot"></i><span class="button-tooltip">聊天助手</span>`;
    chatToggleButton.classList.add("pulse-animation");

    // 添加聊天框标题栏
    const headerDiv = document.createElement("div");
    headerDiv.className = "chat-header";
    headerDiv.innerHTML = `
    <div class="chat-title">
      <i class="fas fa-robot me-2"></i>雪宝助手
    </div>
    <div class="chat-controls">
      <button id="pin-chat" class="chat-control-btn" title="固定聊天窗口">
        <i class="fas fa-thumbtack"></i>
      </button>
      <button id="minimize-chat" class="chat-control-btn" title="最小化">
        <i class="fas fa-minus"></i>
      </button>
      <button id="close-chat" class="chat-control-btn" title="关闭">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
    chatContainer.insertBefore(headerDiv, chatContainer.firstChild);

    // 添加状态栏
    const statusBar = document.createElement("div");
    statusBar.className = "chat-status-bar";
    statusBar.innerHTML = `<span id="chat-status">随时为您服务</span>`;
    chatContainer.insertBefore(statusBar, chatContainer.firstChild.nextSibling);

    function updateStatus(text, delay = 0) {
        const status = document.getElementById("chat-status");
        status.textContent = text;
        if (delay) {
            setTimeout(() => (status.textContent = "随时为您服务"), delay);
        }
    }

    function showChat(initial = false) {
        if (!restorePosition()) {
            const viewportHeight = window.innerHeight;
            chatContainer.style.top = (viewportHeight / 2 - 225) + "px";
            chatContainer.style.right = "20px";
        }
        chatContainer.style.display = "flex";
        chatContainer.classList.add("chat-showing");
        setTimeout(() => chatContainer.classList.remove("chat-showing"), 300);
        chatToggleButton.style.display = "none";
        isMinimized = false;
        localStorage.setItem('chatMinimized', 'false');
        if (initial && isFirstOpen) {
            const greeting = getRandomResponse(dialogues.greetings);
            addMessage("雪宝", greeting);
            setTimeout(() => {
                addMessage("雪宝", "我可以帮你查询天气、讲笑话、导航网站，还有更多功能等你探索！试试输入'帮助'了解更多。");
            }, 1000);
            isFirstOpen = false;
        }
        userInput.focus();
    }

    function hideChat() {
        chatContainer.classList.add("chat-minimizing");
        setTimeout(() => {
            chatContainer.style.display = "none";
            chatContainer.classList.remove("chat-minimizing");
            chatToggleButton.style.display = "flex";
            localStorage.setItem('chatMinimized', 'true');
        }, 300);
        isMinimized = true;
    }

    if (!isMinimized) {
        showChat(true);
    }

    // 设置拖动功能
    headerDiv.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);

    // 触摸设备支持
    headerDiv.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", drag);
    document.addEventListener("touchend", stopDrag);

    // 添加固定功能
    let isPinned = localStorage.getItem('chatPinned') === 'true';
    const pinBtn = document.getElementById('pin-chat');
    pinBtn.classList.toggle('active', isPinned);
    pinBtn.title = isPinned ? '取消固定' : '固定聊天窗口';
    pinBtn.addEventListener('click', function () {
        isPinned = !isPinned;
        pinBtn.classList.toggle('active', isPinned);
        pinBtn.title = isPinned ? '取消固定' : '固定聊天窗口';
        updateStatus(isPinned ? '窗口已固定' : '窗口已取消固定', 2000);
        localStorage.setItem('chatPinned', String(isPinned));
    });

    // 拖动开始函数
    function startDrag(e) {
        // 如果聊天框已固定，则不允许拖动
        if (isPinned) return;

        e.preventDefault();

        // 获取鼠标/触摸起始位置
        if (e.type === "touchstart") {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }

        // 获取元素当前位置
        const rect = chatContainer.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;

        isDragging = true;
        chatContainer.classList.add("dragging");

        // 提示用户正在拖动
        updateStatus("拖动窗口中...");
    }

    // 拖动函数
    function drag(e) {
        if (!isDragging) return;

        let currentX, currentY;
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
            // 阻止页面滚动
            e.preventDefault();
        } else {
            currentX = e.clientX;
            currentY = e.clientY;
        }

        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // 设置新位置，确保不超出屏幕
        const newLeft = Math.max(0, Math.min(window.innerWidth - chatContainer.offsetWidth, startLeft + deltaX));
        const newTop = Math.max(0, Math.min(window.innerHeight - chatContainer.offsetHeight, startTop + deltaY));

        // 应用磁性吸附效果 - 靠近边缘时自动吸附
        const snapDistance = 20; // 吸附距离（像素）

        if (newLeft < snapDistance) { // 左边缘
            chatContainer.style.left = "0px";
        } else if (newLeft > window.innerWidth - chatContainer.offsetWidth - snapDistance) { // 右边缘
            chatContainer.style.left = (window.innerWidth - chatContainer.offsetWidth) + "px";
        } else {
            chatContainer.style.left = newLeft + "px";
        }

        if (newTop < snapDistance) { // 上边缘
            chatContainer.style.top = "0px";
        } else if (newTop > window.innerHeight - chatContainer.offsetHeight - snapDistance) { // 下边缘
            chatContainer.style.top = (window.innerHeight - chatContainer.offsetHeight) + "px";
        } else {
            chatContainer.style.top = newTop + "px";
        }

        chatContainer.style.right = "auto"; // 清除默认right定位
        chatContainer.style.bottom = "auto"; // 清除默认bottom定位
    }

    // 停止拖动
    function stopDrag() {
        if (!isDragging) return;

        isDragging = false;
        chatContainer.classList.remove("dragging");

        // 恢复状态栏文本
        updateStatus("随时为您服务");

        // 保存位置到localStorage
        savePosition();
    }

    // 保存聊天窗口位置
    function savePosition() {
        const rect = chatContainer.getBoundingClientRect();
        localStorage.setItem('chatPosition', JSON.stringify({
            left: rect.left, top: rect.top
        }));
    }

    // 恢复上次的位置
    function restorePosition() {
        const savedPosition = localStorage.getItem('chatPosition');
        if (savedPosition) {
            try {
                const position = JSON.parse(savedPosition);
                // 确保位置在视口内
                if (position.left >= 0 && position.left <= window.innerWidth - 320 && position.top >= 0 && position.top <= window.innerHeight - 450) {
                    chatContainer.style.left = position.left + 'px';
                    chatContainer.style.top = position.top + 'px';
                    chatContainer.style.right = 'auto';
                    chatContainer.style.bottom = 'auto';
                    return true;
                }
            } catch (e) {
                console.error('Error restoring chat position:', e);
            }
        }
        return false;
    }

    // 最小化按钮，添加动画效果
    document.getElementById("minimize-chat").addEventListener("click", function () {
        hideChat();
    });

    // 关闭按钮，添加确认机制
    document.getElementById("close-chat").addEventListener("click", function () {
        if (isClosing) {
            // 已经点击过一次，确认关闭
            clearTimeout(closeTimeout);
            hideChat();
            isClosing = false;
            document.getElementById("close-chat").innerHTML = '<i class="fas fa-times"></i>';
        } else {
            // 第一次点击，显示确认信息
            isClosing = true;
            updateStatus("再次点击关闭窗口");
            document.getElementById("close-chat").innerHTML = '<i class="fas fa-check"></i>';

            // 5秒后重置
            closeTimeout = setTimeout(() => {
                isClosing = false;
                updateStatus("随时为您服务");
                document.getElementById("close-chat").innerHTML = '<i class="fas fa-times"></i>';
            }, 5000);
        }
    });

    // 添加导航映射表
    const navigationMap = {
        // 中文导航
        主页: '#intro',
        关于: '#about',
        创造: '#services',
        作品: '#portfolio',
        文字: '#text',
        隐私: 'privacy.html',
        使用条款: 'terms.html',
        联系: 'contact.html',
        广告: 'ads.html',
        简介: 'profile.html',
        博客: 'https://blog.alexander.xin', // 新增博客文章导航
        地图: "map.html",
        站点地图: "map.html",
        网站地图: "map.html",

        // 英文导航
        home: '#intro',
        about: '#about',
        create: '#services',
        portfolio: '#portfolio',
        text: '#text',
        privacy: 'privacy.html',
        terms: 'terms.html',
        contact: 'contact.html',
        ads: 'ads.html',
        profile: 'profile.html',
        blog: 'https://blog.alexander.xin', // 新增英文博客文章导航
        map: "map.html",
        "site map": "map.html",
        "page map": "map.html",
    };

    // 对话内容库 - 增强版
    const dialogues = {
        navigation: ["好的，让我带您去看看~", "马上为您导航过去！", "那就一起去看看吧~",],

        navHelp: [`我可以帮您导航到以下页面：
    📍 主页 - 回到首页
    📍 关于 - 了解我们
    📍 创造 - 查看创作内容
    📍 作品 - 浏览作品集
    📍 文字 - 阅读文章
    📍 联系 - 联系方式
    📍 隐私 - 隐私政策
    📍 广告 - 广告服务
    📍 简介 - 个人简介
    📍 博客 - 博客文章

    📍 地图 - 网站地图

    您可以输入"去xx"或"打开xx"来访问对应页面`,],

        greetings: ["你好！我是雪宝，很高兴为您服务！😊", "嗨！今天有什么我可以帮你的吗？✨", "你好啊！我是你的AI助手雪宝，有什么可以帮到你？🌟", "欢迎找我聊天！我可以查询天气、讲笑话，或者帮你导航网站。🤖",],
        jokes: ["程序员最讨厌什么？讨厌别人不按照他的方式过马路！😄", "为什么程序员总是分不清万圣节和圣诞节？因为 Oct 31 = Dec 25！😂", "你知道吗？鱼为什么会吹泡泡？因为它想让自己显得很'水灵'！😆", "为什么程序员喜欢黑咖啡？因为他们喜欢没有类（class）的生活！🤣", "一个冰箱对另一个冰箱说：'你为什么在发抖？' 另一个回答：'因为我冰箱了！'😅", "AI和人类的区别是什么？AI从不会忘记自己的充电器！⚡", "为什么电脑永远不会口渴？因为它们总是有Windows！💧",],
        thanks: ["不用客气！能帮到你我很开心 😊", "这是我应该做的！随时找我聊天哦 💫", "应该的！有什么需要随时告诉我 🌟",],
        farewells: ["再见！记得常来找我聊天哦！👋", "下次见！祝您有愉快的一天！😊", "期待下次为您服务！再见！✨",],
        unknown: ["抱歉，我可能没太明白。要不要试试以下功能：\n1. 查询天气\n2. 讲笑话\n3. 聊天", "这个问题有点难倒我了。不如我们聊点别的？", "让我想想...要不我给你讲个笑话？",],
        weatherIntro: ["让我查看一下天气情况...", "正在为您查询天气信息...", "稍等片刻，马上告诉您今天的天气...", "连接气象卫星中，即将为您带来最新天气...",],
        pageNotFound: ["抱歉，我找不到这个页面呢~ 要不要看看其他内容？", "这个页面好像走丢了，让我带您去别的地方看看吧！",],
        confirmNav: ["好的，让我们出发吧！", "这就带您过去~", "马上就到啦！"],
        searchHelp: ["您可以这样搜索：\n✨ 直接输入关键词\n🔍 '搜索xxx'\n📖 '查找xxx'", "需要帮您找什么吗？告诉我关键词就好~",],
        tips: ["小贴士：你可以问我'北京天气'来获取天气信息！", "小贴士：输入'讲个笑话'，我会讲一个有趣的笑话！", "小贴士：输入'几点了'可以查看当前时间！", "小贴士：输入'去主页'或类似导航指令可以快速导航网站！", "小贴士：尝试问我'你是谁'来了解我吧！", "小贴士：如果你需要帮助，随时输入'帮助'！", "小贴士：输入'地图'可查看网站地图！"],
        funFacts: ["你知道吗？人的大脑每天产生约70,000个想法！", "有趣的是，蜜蜂实际上可以识别人脸！", "你知道吗？笑容会使用17块面部肌肉，而皱眉会使用43块！", "有趣的事实：打喷嚏时你的心脏会短暂停止一瞬间！", "地球上的水与地球形成时的水是相同的，我们喝的可能是恐龙喝过的水！",],
    };

    // 城市名称映射表（中文到英文）
    const cityMapping = {
        北京: "Beijing",
        上海: "Shanghai",
        广州: "Guangzhou",
        深圳: "Shenzhen",
        杭州: "Hangzhou",
        南京: "Nanjing",
        天津: "Tianjin",
        重庆: "Chongqing",
        武汉: "Wuhan",
        成都: "Chengdu",
        西安: "Xi'an",
        长沙: "Changsha",
        合肥: "Hefei",
        福州: "Fuzhou",
        兰州: "Lanzhou",
        南昌: "Nanchang",
        太原: "Taiyuan",
        昆明: "Kunming",
        贵阳: "Guiyang",
        海口: "Haikou",
        长春: "Changchun",
        哈尔滨: "Harbin",
        沈阳: "Shenyang",
        石家庄: "Shijiazhuang",
        郑州: "Zhengzhou",
        济南: "Jinan",
        拉萨: "Lhasa",
        银川: "Yinchuan",
        西宁: "Xining",
        乌鲁木齐: "Urumqi",
        南宁: "Nanning",
        珠海: "Zhuhai",
        佛山: "Foshan",
        东莞: "Dongguan",
        苏州: "Suzhou",
        无锡: "Wuxi",
        常州: "Changzhou",
        宁波: "Ningbo",
        温州: "Wenzhou",
        大连: "Dalian",
        青岛: "Qingdao",
        烟台: "Yantai",
        惠州: "Huizhou",
        汕头: "Shantou",
        南通: "Nantong",
        镇江: "Zhenjiang",
        徐州: "Xuzhou",
        洛阳: "Luoyang",
        保定: "Baoding",
        开封: "Kaifeng",
        纽约: "New York",
        伦敦: "London",
        巴黎: "Paris",
        东京: "Tokyo",
        首尔: "Seoul",
        新加坡: "Singapore",
        悉尼: "Sydney",
        迪拜: "Dubai",
        莫斯科: "Moscow",
        罗马: "Rome",
        柏林: "Berlin",
        马德里: "Madrid",
        阿姆斯特丹: "Amsterdam",
        多伦多: "Toronto",
        温哥华: "Vancouver",
        旧金山: "San Francisco",
        洛杉矶: "Los Angeles",
    };

    // 随机选择响应
    function getRandomResponse(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function showHelp() {
        const helpMessage = `
        我可以为您提供以下服务：
        🌤️ 查询天气 - 例如："北京天气"、"东京天气"
        😄 讲笑话 - 输入"讲个笑话"
        🕒 查看时间 - 输入"几点了"
        🧭 页面导航 - 输入"去主页"、"打开关于"
        💭 日常聊天 - 和我打个招呼吧！
        ❓ 导航帮助 - 输入"怎么走"查看所有页面
    `;
        addMessage("雪宝", helpMessage);
    }

    // 显示当前时间
    function showCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString("zh-CN", {
            hour12: false, hour: "2-digit", minute: "2-digit",
        });
        addMessage("雪宝", `现在是 ${timeString} 🕒`);
    }

    // 获取天气信息 - 增强版，添加完整错误处理
    function getWeather(location) {
        const cityName = cityMapping[location] || location;
        addMessage("雪宝", getRandomResponse(dialogues.weatherIntro));

        // 防止空位置查询
        if (!cityName || cityName.trim() === "") {
            addMessage("雪宝", "请提供有效的城市名称，例如'北京天气'。");
            return;
        }

        const url = `${weatherApiUrl}?q=${cityName}&appid=${weatherApiKey}&units=metric&lang=zh_cn`;

        // 添加请求超时处理
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时

        fetch(url, {signal: controller.signal})
            .then((response) => {
                clearTimeout(timeoutId); // 清除超时
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("城市未找到");
                    } else if (response.status === 401) {
                        throw new Error("API密钥无效");
                    } else {
                        throw new Error(`服务器错误: ${response.status}`);
                    }
                }
                return response.json();
            })
            .then((data) => {
                try {
                    // 使用可选链和空值合并操作符增强数据获取的健壮性
                    const temp = data?.main?.temp ?? "未知";
                    const weather = data?.weather?.[0]?.description ?? "未知";
                    const humidity = data?.main?.humidity ?? "未知";
                    const windSpeed = data?.wind?.speed ?? "未知";
                    const feelsLike = data?.main?.feels_like ?? "未知";
                    const cityName = data?.name ?? location;
                    const country = data?.sys?.country ?? "";

                    const weatherInfo = `
                    📍 ${cityName}${country ? `, ${country}` : ''}的天气信息：
                    🌡️ 温度：${temp}°C
                    💭 天气：${weather}
                    💧 湿度：${humidity}%
                    🌪️ 风速：${windSpeed} m/s
                    🌡️ 体感温度：${feelsLike}°C
                `;
                    addMessage("雪宝", weatherInfo);

                    // 根据温度给出建议 - 添加数值验证
                    if (typeof temp === 'number') {
                        setTimeout(() => {
                            if (temp <= 10) {
                                addMessage("雪宝", "温度较低，要注意保暖哦！🧥");
                            } else if (temp >= 30) {
                                addMessage("雪宝", "温度较高，记得防晒降温！☂️");
                            } else {
                                addMessage("雪宝", "温度适宜，是个舒适的天气呢！🌟");
                            }
                        }, 500);
                    }
                } catch (error) {
                    console.error("天气数据解析错误:", error);
                    addMessage("雪宝", "抱歉，解析天气数据时出现问题，请稍后再试。");
                }
            })
            .catch((error) => {
                clearTimeout(timeoutId); // 确保清除超时
                console.error("天气API错误:", error);

                // 提供更具体的错误信息
                if (error.name === 'AbortError') {
                    addMessage("雪宝", "抱歉，获取天气信息超时，请稍后再试。");
                } else if (error.message === "城市未找到") {
                    addMessage("雪宝", `抱歉，没有找到"${location}"的天气信息。请检查城市名称是否正确。`);
                } else if (error.message === "API密钥无效") {
                    addMessage("雪宝", "抱歉，天气服务暂时不可用。请稍后再试。");
                } else {
                    addMessage("雪宝", "抱歉，获取天气信息时出错。请稍后再试。");
                }
            });
    }

    // 聊天机器人状态动画
    function showThinking() {
        const thinking = document.createElement("div");
        thinking.className = "message bot-message thinking-dots";
        thinking.innerHTML = `<span></span><span></span><span></span>`;
        chatbox.appendChild(thinking);
        chatbox.scrollTo({top: chatbox.scrollHeight, behavior: "smooth"});
        return thinking;
    }

    // 当点击聊天按钮时显示聊天框并初始化问候语
    chatToggleButton.addEventListener("click", function () {
        if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
            showChat(true);
        } else {
            hideChat();
        }
    });

    sendButton.addEventListener("click", function () {
        const userText = userInput.value.trim();
        if (userText !== "") {
            addMessage("用户", userText);
            getBotResponse(userText);
            userInput.value = "";
        }
    });

    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendButton.click();
        }
    });

    function addMessage(sender, text) {
        const message = document.createElement("div");
        message.classList.add("message");

        if (sender === "用户") {
            message.classList.add("user-message");
            message.innerHTML = text;
        } else {
            message.classList.add("bot-message");
            message.innerHTML = text;
        }

        // 添加动画效果
        message.classList.add("message-animation");

        chatbox.appendChild(message);
        // 平滑滚动到底部
        chatbox.scrollTo({
            top: chatbox.scrollHeight, behavior: "smooth",
        });
    }

    function getBotResponse(userText) {
        const normalizedText = userText.toLowerCase();

        // 显示思考动画
        const thinking = showThinking();

        // 延迟响应，模拟思考
        setTimeout(() => {
            // 移除思考动画
            thinking.remove();

            // 处理导航请求
            if (normalizedText.match(/去|打开|导航到|看看/)) {
                for (const [key, value] of Object.entries(navigationMap)) {
                    if (normalizedText.includes(key)) {
                        if (value.startsWith("#")) {
                            document
                                .querySelector(value)
                                .scrollIntoView({behavior: "smooth"});
                            addMessage("雪宝", getRandomResponse(dialogues.navigation));
                        } else {
                            addMessage("雪宝", `好的，马上为您跳转到${key}页面~`);
                            setTimeout(() => (window.location.href = value), 1000);
                        }
                        return;
                    }
                }
            }

            // 导航帮助
            if (normalizedText.match(/怎么走|去哪|导航帮助|指引/)) {
                addMessage("雪宝", dialogues.navHelp[0]);
                return;
            }

            if (userText.includes("天气")) {
                const location = userText.replace("天气", "").trim();
                if (location) {
                    getWeather(location);
                } else {
                    getLocationWeather();
                }
                return;
            }

            // 随机在某些消息后附加小贴士或趣味知识
            const showExtra = Math.random() > 0.7;

            if (normalizedText.match(/你好|hello|hi|嗨/)) {
                addMessage("雪宝", getRandomResponse(dialogues.greetings));
                if (showExtra) {
                    setTimeout(() => {
                        addMessage("雪宝", getRandomResponse(dialogues.tips));
                    }, 1000);
                }
            } else if (normalizedText.includes("笑话")) {
                addMessage("雪宝", getRandomResponse(dialogues.jokes));
            } else if (normalizedText.match(/谢谢|感谢/)) {
                addMessage("雪宝", getRandomResponse(dialogues.thanks));
                if (showExtra) {
                    setTimeout(() => {
                        addMessage("雪宝", getRandomResponse(dialogues.funFacts));
                    }, 1000);
                }
            } else if (normalizedText.match(/再见|拜拜|bye/)) {
                addMessage("雪宝", getRandomResponse(dialogues.farewells));
            } else if (normalizedText.match(/帮助|help|怎么用/)) {
                showHelp();
            } else if (normalizedText.match(/几点|时间/)) {
                showCurrentTime();
            } else if (normalizedText.match(/你是谁|你叫什么/)) {
                addMessage("雪宝", "我是雪宝，您的智能AI助手！我可以帮你查天气、讲笑话，或者陪你聊天！我会一直在这里为您服务！😊");
                if (showExtra) {
                    setTimeout(() => {
                        addMessage("雪宝", "您有什么需要帮助的吗？");
                    }, 1000);
                }
            } else if (normalizedText.match(/有趣|趣事|趣味|有意思/)) {
                addMessage("雪宝", getRandomResponse(dialogues.funFacts));
            } else {
                addMessage("雪宝", getRandomResponse(dialogues.unknown));
            }
        }, 600); // 思考时间，可调整
    }

    // 增强位置天气获取函数的错误处理
    function getLocationWeather() {
        if (navigator.geolocation) {
            addMessage("雪宝", "正在获取您的位置信息...");
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords;
                const url = `${weatherApiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric&lang=zh_cn`;
                fetch(url)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("位置未找到");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        try {
                            // 增强数据获取的健壮性
                            const weatherDescription = data?.weather?.[0]?.description ?? "未知";
                            const temperature = data?.main?.temp ?? "未知";
                            const cityName = data?.name ?? "当前位置";
                            const humidity = data?.main?.humidity ?? "未知";
                            const windSpeed = data?.wind?.speed ?? "未知";
                            const feelsLike = data?.main?.feels_like ?? "未知";

                            // 提供更详细的天气信息
                            const weatherInfo = `
                            📍 ${cityName}的天气信息：
                            🌡️ 温度：${temperature}°C
                            💭 天气：${weatherDescription}
                            💧 湿度：${humidity}%
                            🌪️ 风速：${windSpeed} m/s
                            🌡️ 体感温度：${feelsLike}°C
                        `;
                            addMessage("雪宝", weatherInfo);
                        } catch (error) {
                            console.error("天气数据解析错误:", error);
                            addMessage("雪宝", "抱歉，获取天气数据时出现问题，请稍后再试。");
                        }
                    })
                    .catch((error) => {
                        console.error("天气API错误:", error);
                        addMessage("雪宝", "对不起，我无法获取您当前位置信息的天气。请稍后再试。");
                    });
            }, (error) => {
                console.error("位置获取错误:", error);
                let errorMessage = "对不起，我无法获取您的位置信息。";

                // 提供更具体的错误信息
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += "请允许访问位置信息或者手动输入城市名称。";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += "位置信息不可用，请手动输入城市名称。";
                        break;
                    case error.TIMEOUT:
                        errorMessage += "获取位置超时，请手动输入城市名称。";
                        break;
                    default:
                        errorMessage += "请手动输入城市名称，如'北京天气'。";
                }

                addMessage("雪宝", errorMessage);
            }, {
                timeout: 10000,  // 10秒超时
                maximumAge: 300000  // 5分钟缓存
            });
        } else {
            addMessage("雪宝", "对不起，您的浏览器不支持地理位置服务。请直接输入城市名称，如'北京天气'。");
        }
    }

    // 点击外部不再自动关闭对话框，而是提示用户
    let outsideClickCount = 0;
    document.addEventListener("click", function (e) {
        // 如果点击的不是对话框内部元素且不是切换按钮
        if (!chatContainer.contains(e.target) && e.target !== chatToggleButton && chatContainer.style.display === "flex" && !isPinned // 固定后点击外部不关闭
        ) {
            outsideClickCount++;

            if (outsideClickCount === 1) {
                // 第一次点击外部，显示提示
                updateStatus("再次点击外部将关闭窗口", 3000);
                setTimeout(() => {
                    outsideClickCount = 0;
                }, 3000);
            } else if (outsideClickCount >= 2) {
                // 第二次点击外部，关闭窗口
                hideChat();
                outsideClickCount = 0;
            }
        }
    });

    // 阻止对话框内部点击事件冒泡
    chatContainer.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    // 新增功能：随机提示
    function showRandomTip() {
        if (chatContainer.style.display !== "none" && Math.random() > 0.7) {
            setTimeout(() => {
                addMessage("雪宝", getRandomResponse(dialogues.tips));
            }, 10000); // 10秒后显示提示
        }
    }

    // 每隔30秒可能显示一个提示
    setInterval(showRandomTip, 30000);

    // 窗口大小变化时调整聊天窗口位置，避免超出屏幕
    window.addEventListener('resize', function () {
        if (chatContainer.style.display === "flex") {
            const rect = chatContainer.getBoundingClientRect();

            // 如果窗口超出右侧边缘
            if (rect.right > window.innerWidth) {
                chatContainer.style.left = (window.innerWidth - chatContainer.offsetWidth) + "px";
            }

            // 如果窗口超出底部边缘
            if (rect.bottom > window.innerHeight) {
                chatContainer.style.top = (window.innerHeight - chatContainer.offsetHeight) + "px";
            }
        }
    });
});
