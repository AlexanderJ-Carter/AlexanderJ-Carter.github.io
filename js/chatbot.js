document.addEventListener('DOMContentLoaded', function () {
    const chatContainer = document.getElementById('chat-container');
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatbox = document.getElementById('chatbox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const weatherApiKey = 'e92adb1cc07788a547544fa7e9cfcc5e'; // 注意：在生产环境中应该通过环境变量或安全方式存储API密钥
    const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    let isFirstOpen = true; // 检测是否首次打开对话框
    let isDragging = false; // 拖动状态
    let isMinimized = true; // 初始状态为最小化
    let startX, startY, startLeft, startTop;
    let isClosing = false; // 跟踪是否正在关闭
    let closeTimeout; // 存储关闭延迟的timeout    // 初始化聊天机器人位置 - 响应式定位
    function initChatButtonPosition() {
        chatToggleButton.style.position = 'fixed';
        chatToggleButton.style.zIndex = '1000';
        chatToggleButton.innerHTML = `<i class="fas fa-robot"></i><span class="button-tooltip">聊天助手</span>`;
        chatToggleButton.classList.add('pulse-animation');

        // 根据屏幕尺寸设置位置
        updateChatButtonPosition();

        // 初始化拖动功能
        initButtonDrag();

        // 初始化自动透明功能
        initAutoTransparency();
    }
    // 更新聊天按钮位置
    function updateChatButtonPosition() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // 移动端：固定在右下角，使用安全距离
            const safeRight = Math.min(15, window.innerWidth * 0.04);
            const safeBottom = Math.min(15, window.innerHeight * 0.04);

            chatToggleButton.style.right = safeRight + 'px';
            chatToggleButton.style.bottom = safeBottom + 'px';
            chatToggleButton.style.top = 'auto';
            chatToggleButton.style.left = 'auto';
            chatToggleButton.style.transform = 'none';
            chatToggleButton.style.position = 'fixed';
            chatToggleButton.style.zIndex = '1001';

            // 确保按钮尺寸适合小屏幕
            if (window.innerWidth <= 360) {
                chatToggleButton.style.width = '38px';
                chatToggleButton.style.height = '38px';
                chatToggleButton.style.fontSize = '0.9rem';
            } else {
                chatToggleButton.style.width = '45px';
                chatToggleButton.style.height = '45px';
                chatToggleButton.style.fontSize = '1.2rem';
            }
        } else {
            // 桌面端：固定在右侧中间
            chatToggleButton.style.right = '20px';
            chatToggleButton.style.top = '50%';
            chatToggleButton.style.bottom = 'auto';
            chatToggleButton.style.left = 'auto';
            chatToggleButton.style.transform = 'translateY(-50%)';
            chatToggleButton.style.position = 'fixed';
            chatToggleButton.style.zIndex = '1000';
            chatToggleButton.style.width = '50px';
            chatToggleButton.style.height = '50px';
            chatToggleButton.style.fontSize = '1.3rem';
        }

        // 执行移动端保护
        ensureMobileViewport();
    }

    // 初始化位置
    initChatButtonPosition();
    // 监听窗口大小变化和方向变化
    window.addEventListener('resize', function () {
        updateChatButtonPosition();
        ensureMobileViewport();
    });

    // 监听方向变化
    window.addEventListener('orientationchange', function () {
        setTimeout(function () {
            updateChatButtonPosition();
            ensureMobileViewport();
        }, 100);
    });

    // 添加聊天框标题栏
    const headerDiv = document.createElement('div');
    headerDiv.className = 'chat-header';
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
    const statusBar = document.createElement('div');
    statusBar.className = 'chat-status-bar';
    statusBar.innerHTML = `<span id="chat-status">随时为您服务</span>`;
    chatContainer.insertBefore(statusBar, chatContainer.firstChild.nextSibling);

    // 设置拖动功能
    headerDiv.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    // 触摸设备支持
    headerDiv.addEventListener('touchstart', startDrag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDrag);

    // 添加固定功能
    let isPinned = false;
    document.getElementById('pin-chat').addEventListener('click', function () {
        isPinned = !isPinned;
        this.classList.toggle('active');

        if (isPinned) {
            document.getElementById('chat-status').textContent = '窗口已固定';
            setTimeout(() => {
                document.getElementById('chat-status').textContent =
                    '随时为您服务';
            }, 2000);
            this.title = '取消固定';
        } else {
            document.getElementById('chat-status').textContent =
                '窗口已取消固定';
            setTimeout(() => {
                document.getElementById('chat-status').textContent =
                    '随时为您服务';
            }, 2000);
            this.title = '固定聊天窗口';
        }
    });

    // 拖动开始函数
    function startDrag(e) {
        // 如果聊天框已固定，则不允许拖动
        if (isPinned) return;

        e.preventDefault();

        // 获取鼠标/触摸起始位置
        if (e.type === 'touchstart') {
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
        chatContainer.classList.add('dragging');

        // 提示用户正在拖动
        document.getElementById('chat-status').textContent = '拖动窗口中...';
    } // 拖动函数
    function drag(e) {
        if (!isDragging) return;

        let currentX, currentY;
        if (e.type === 'touchmove') {
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

        // 获取当前视口尺寸和容器尺寸
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const containerWidth = chatContainer.offsetWidth;
        const containerHeight = chatContainer.offsetHeight;

        // 移动端特殊处理 - 添加安全边距
        const isMobile = viewportWidth <= 768;
        const safeMargin = isMobile ? 10 : 0;

        // 设置新位置，确保不超出屏幕（考虑安全边距）
        const newLeft = Math.max(
            safeMargin,
            Math.min(
                viewportWidth - containerWidth - safeMargin,
                startLeft + deltaX
            )
        );
        const newTop = Math.max(
            safeMargin,
            Math.min(
                viewportHeight - containerHeight - safeMargin,
                startTop + deltaY
            )
        );

        // 应用磁性吸附效果 - 靠近边缘时自动吸附
        const snapDistance = isMobile ? 15 : 20; // 移动端减小吸附距离

        if (newLeft < snapDistance + safeMargin) {
            // 左边缘
            chatContainer.style.left = safeMargin + 'px';
        } else if (
            newLeft >
            viewportWidth - containerWidth - snapDistance - safeMargin
        ) {
            // 右边缘
            chatContainer.style.left =
                viewportWidth - containerWidth - safeMargin + 'px';
        } else {
            chatContainer.style.left = newLeft + 'px';
        }

        if (newTop < snapDistance + safeMargin) {
            // 上边缘
            chatContainer.style.top = safeMargin + 'px';
        } else if (
            newTop >
            viewportHeight - containerHeight - snapDistance - safeMargin
        ) {
            // 下边缘
            chatContainer.style.top =
                viewportHeight - containerHeight - safeMargin + 'px';
        } else {
            chatContainer.style.top = newTop + 'px';
        }

        chatContainer.style.right = 'auto'; // 清除默认right定位
        chatContainer.style.bottom = 'auto'; // 清除默认bottom定位
    }

    // 停止拖动
    function stopDrag() {
        if (!isDragging) return;

        isDragging = false;
        chatContainer.classList.remove('dragging');

        // 恢复状态栏文本
        document.getElementById('chat-status').textContent = '随时为您服务';

        // 保存位置到localStorage
        savePosition();
    }

    // 保存聊天窗口位置
    function savePosition() {
        const rect = chatContainer.getBoundingClientRect();
        localStorage.setItem(
            'chatPosition',
            JSON.stringify({
                left: rect.left,
                top: rect.top,
            })
        );
    }

    // 恢复上次的位置
    function restorePosition() {
        const savedPosition = localStorage.getItem('chatPosition');
        if (savedPosition) {
            try {
                const position = JSON.parse(savedPosition);
                // 确保位置在视口内
                if (
                    position.left >= 0 &&
                    position.left <= window.innerWidth - 320 &&
                    position.top >= 0 &&
                    position.top <= window.innerHeight - 450
                ) {
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
    document
        .getElementById('minimize-chat')
        .addEventListener('click', function () {
            chatContainer.classList.add('chat-minimizing');
            setTimeout(() => {
                chatContainer.style.display = 'none';
                chatContainer.classList.remove('chat-minimizing');
                chatToggleButton.style.display = 'flex';
            }, 300);
        });

    // 关闭按钮，添加确认机制
    document
        .getElementById('close-chat')
        .addEventListener('click', function () {
            if (isClosing) {
                // 已经点击过一次，确认关闭
                clearTimeout(closeTimeout);
                chatContainer.style.display = 'none';
                chatToggleButton.style.display = 'flex';
                isClosing = false;
                document.getElementById('close-chat').innerHTML =
                    '<i class="fas fa-times"></i>';
            } else {
                // 第一次点击，显示确认信息
                isClosing = true;
                document.getElementById('chat-status').textContent =
                    '再次点击关闭窗口';
                document.getElementById('close-chat').innerHTML =
                    '<i class="fas fa-check"></i>';

                // 5秒后重置
                closeTimeout = setTimeout(() => {
                    isClosing = false;
                    document.getElementById('chat-status').textContent =
                        '随时为您服务';
                    document.getElementById('close-chat').innerHTML =
                        '<i class="fas fa-times"></i>';
                }, 5000);
            }
        }); // 完整的网站地图数据 - 包含所有主要页面
    const siteMap = {
        主页面: {
            网站首页: 'index.html',
            关于我们: '#about',
            创造与表达: '#services',
            精选作品: '#portfolio',
            文字内容: '#text',
        },
        多语言版本: {
            中文版: 'index.html',
            英文版: 'en/index-en.html',
            意大利语版: 'it/index-it.html',
            日语版: 'jp/index-jp.html',
        },
        功能页面: {
            作品画廊: 'zh-CN/gallery.html',
            个人简介: 'zh-CN/profile.html',
            联系我们: 'zh-CN/contact.html',
            智能日历: 'zh-CN/calendar.html',
            货币转换: 'zh-CN/currency.html',
            标准时间: 'time.html',
            网站地图: 'map.html',
        },
        政策页面: {
            隐私政策: 'zh-CN/privacy.html',
            使用条款: 'zh-CN/terms.html',
            广告服务: 'zh-CN/ads.html',
            许可证信息: 'zh-CN/license.html',
        },
        外部链接: {
            个人博客: 'https://blog.alexander.xin',
            GitHub: 'https://github.com/AlexanderJ-Carter',
        },
        测试功能: {
            Beta中心: 'beta/beta-dashboard.html',
            财务面板: 'beta/financial-dashboard.html',
        },
    }; // 简化的导航映射表 - 更全面的页面导航
    const navigationMap = {
        // 中文导航
        主页: '#intro',
        首页: 'index.html',
        关于: '#about',
        创造: '#services',
        作品: '#portfolio',
        文字: '#text',
        画廊: 'zh-CN/gallery.html',
        简介: 'zh-CN/profile.html',
        联系: 'zh-CN/contact.html',
        日历: 'zh-CN/calendar.html',
        货币: 'zh-CN/currency.html',
        时间: 'time.html',
        隐私: 'zh-CN/privacy.html',
        条款: 'zh-CN/terms.html',
        广告: 'zh-CN/ads.html',
        许可证: 'zh-CN/license.html',
        地图: 'map.html',
        博客: 'https://blog.alexander.xin',

        // 英文导航
        home: '#intro',
        index: 'index.html',
        about: '#about',
        create: '#services',
        portfolio: '#portfolio',
        text: '#text',
        gallery: 'en/gallery-en.html',
        profile: 'en/profile-en.html',
        contact: 'en/contact-en.html',
        calendar: 'en/calendar-en.html',
        currency: 'en/currency-en.html',
        time: 'time.html',
        privacy: 'en/privacy-en.html',
        terms: 'en/terms-en.html',
        ads: 'en/ads-en.html',
        map: 'map.html',
        blog: 'https://blog.alexander.xin',
    }; // 优化的对话内容库
    const dialogues = {
        navigation: [
            '好的，让我带您去看看~',
            '马上为您导航过去！',
            '那就一起去看看吧~',
        ],
        navHelp: [
            `🧭 我可以帮您导航到以下页面：

📍 主要页面：
    • 主页/首页 - 回到网站首页
    • 关于 - 了解我们的故事  
    • 创造 - 查看创作内容
    • 作品 - 浏览作品集
    • 文字 - 阅读文章

📍 功能页面：
    • 画廊 - 完整作品展示
    • 简介 - 个人详细信息
    • 联系 - 联系方式
    • 日历 - 智能日历工具
    • 货币 - 汇率转换工具
    • 时间 - 世界时间显示
    • 地图 - 网站页面地图

📍 政策页面：
    • 隐私 - 隐私政策
    • 条款 - 使用条款
    • 广告 - 广告服务
    • 许可证 - 版权信息

📍 外部链接：
    • 博客 - 访问个人博客

💡 使用方法：输入"去xx"或"打开xx"来访问页面，或输入"网站地图"查看完整结构`,
        ],

        siteMapHelp: [
            `🗺️ 完整网站地图：

🏠 主页面：
  • 网站首页 - 探索创意，分享生活
  • 关于我们 - 了解我们的故事和理念  
  • 创造与表达 - 查看创作服务和设计理念
  • 精选作品 - 浏览精心挑选的作品集
  • 文字内容 - 阅读精彩的文章和思考

🌍 多语言版本：
  • 中文版 - 简体中文完整界面
  • 英文版 - English interface experience
  • 意大利语版 - Interfaccia italiana completa
  • 日语版 - 完全な日本語インターフェース

⚙️ 功能页面：
  • 作品画廊 - 完整的摄影作品展示空间
  • 个人简介 - 详细的个人信息和经历
  • 联系我们 - 获取联系方式和发送消息
  • 智能日历 - 功能丰富的日历工具
  • 货币转换 - 实时汇率转换工具
  • 标准时间 - 世界时间显示工具
  • 网站地图 - 完整的页面结构导航

📋 政策页面：
  • 隐私政策 - 数据保护和隐私说明
  • 使用条款 - 网站使用规则和协议
  • 广告服务 - 广告相关政策和信息
  • 许可证信息 - 版权许可和使用说明

🔗 外部链接：
  • 个人博客 - 最新文章分享和思考记录
  • GitHub - 开源项目和代码仓库展示

🧪 测试功能：
  • Beta中心 - 体验最新的功能特性
  • 财务面板 - 数据管理和分析工具

💡 导航提示：
您可以说"去xxx"来快速导航到任何页面！
例如："去画廊"、"打开日历"、"看看博客"等`,
        ],
        greetings: [
            '你好！我是雪宝，您的智能助手！😊 我可以帮您导航网站、查询天气、聊天解闷～',
            "嗨！今天有什么我可以帮您的吗？✨ 试试说'网站地图'看看所有页面！",
            "您好！我是雪宝，随时为您服务！🌟 输入'帮助'了解我的功能",
        ],

        jokes: [
            '为什么程序员总是分不清万圣节和圣诞节？因为 Oct 31 = Dec 25！😂',
            '程序员的三大美德：懒惰、急躁和傲慢。但最重要的是懒惰！😄',
            '为什么程序员喜欢用Mac？因为PC需要解释为什么会死机！😆',
        ],

        thanks: [
            '不用客气！能帮到您我很开心 😊 还有什么需要的吗？',
            '这是我应该做的！随时找我聊天哦 💫',
            '很高兴能帮到您！有其他问题请随时告诉我 🌟',
        ],

        farewells: [
            '再见！记得常来找我聊天哦！👋 我会一直在这里等您',
            '下次见！祝您有愉快的一天！😊 别忘了探索我们的网站',
            '期待下次为您服务！再见！✨ 随时欢迎回来',
        ],

        unknown: [
            "我还在学习中，这个问题有点难倒我了 😅 不如试试：\n🌤️ 查询天气 - '北京天气'\n🗺️ 网站地图 - '网站地图'\n🧭 页面导航 - '去画廊'\n😄 讲笑话 - '讲个笑话'",
            "让我想想...要不我给您讲个笑话？或者输入'网站地图'看看有什么有趣的页面？🤔",
            '这个问题超出了我的知识范围呢 😊 不过我可以帮您：\n✨ 导航到任何页面\n🌟 查看完整网站地图\n🎯 查询实时天气',
        ],

        weatherIntro: [
            '让我查看一下天气情况... 🌤️',
            '正在为您查询天气信息，请稍候... ⛅',
            '稍等片刻，马上告诉您今天的天气... 🌦️',
        ],

        pageNotFound: [
            "抱歉，我找不到这个页面呢~ 要不要看看'网站地图'了解所有可用页面？📍",
            "这个页面好像走丢了，让我带您去'地图'看看其他精彩内容吧！🗺️",
        ],

        confirmNav: [
            '好的，马上带您过去！🚀',
            '这就为您导航过去~ ✈️',
            '出发！希望您喜欢那里的内容 🎯',
        ],
        tips: [
            "💡 小贴士：输入'网站地图'可以查看所有页面和功能！",
            "🌟 小贴士：您可以问我'北京天气'来获取实时天气信息！",
            "✨ 小贴士：输入'讲个笑话'，我会讲一个有趣的笑话！",
            "🎯 小贴士：说'去xxx'可以快速导航到任何页面！",
            "🔍 小贴士：输入'帮助'查看我的完整功能列表！",
        ],

        funFacts: [
            '🧠 有趣知识：人的大脑每天产生约70,000个想法！',
            '🐝 有趣知识：蜜蜂实际上可以识别人脸哦！',
            '😊 有趣知识：笑容会使用17块面部肌肉，而皱眉会使用43块！',
            '🌍 有趣知识：地球上有超过1万亿种不同的气味！',
            '💻 有趣知识：世界上第一个程序员是一位女性 - Ada Lovelace！',
        ],
    };

    // 城市名称映射表（中文到英文）
    const cityMapping = {
        北京: 'Beijing',
        上海: 'Shanghai',
        广州: 'Guangzhou',
        深圳: 'Shenzhen',
        杭州: 'Hangzhou',
        南京: 'Nanjing',
        天津: 'Tianjin',
        重庆: 'Chongqing',
        武汉: 'Wuhan',
        成都: 'Chengdu',
        西安: "Xi'an",
        长沙: 'Changsha',
        合肥: 'Hefei',
        福州: 'Fuzhou',
        兰州: 'Lanzhou',
        南昌: 'Nanchang',
        太原: 'Taiyuan',
        昆明: 'Kunming',
        贵阳: 'Guiyang',
        海口: 'Haikou',
        长春: 'Changchun',
        哈尔滨: 'Harbin',
        沈阳: 'Shenyang',
        石家庄: 'Shijiazhuang',
        郑州: 'Zhengzhou',
        济南: 'Jinan',
        拉萨: 'Lhasa',
        银川: 'Yinchuan',
        西宁: 'Xining',
        乌鲁木齐: 'Urumqi',
        南宁: 'Nanning',
        珠海: 'Zhuhai',
        佛山: 'Foshan',
        东莞: 'Dongguan',
        苏州: 'Suzhou',
        无锡: 'Wuxi',
        常州: 'Changzhou',
        宁波: 'Ningbo',
        温州: 'Wenzhou',
        大连: 'Dalian',
        青岛: 'Qingdao',
        烟台: 'Yantai',
        惠州: 'Huizhou',
        汕头: 'Shantou',
        南通: 'Nantong',
        镇江: 'Zhenjiang',
        徐州: 'Xuzhou',
        洛阳: 'Luoyang',
        保定: 'Baoding',
        开封: 'Kaifeng',
        纽约: 'New York',
        伦敦: 'London',
        巴黎: 'Paris',
        东京: 'Tokyo',
        首尔: 'Seoul',
        新加坡: 'Singapore',
        悉尼: 'Sydney',
        迪拜: 'Dubai',
        莫斯科: 'Moscow',
        罗马: 'Rome',
        柏林: 'Berlin',
        马德里: 'Madrid',
        阿姆斯特丹: 'Amsterdam',
        多伦多: 'Toronto',
        温哥华: 'Vancouver',
        旧金山: 'San Francisco',
        洛杉矶: 'Los Angeles',
    };

    // 随机选择响应
    function getRandomResponse(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    function showHelp() {
        const helpMessage = `🤖 雪宝助手功能指南：

🌤️ 天气查询：
    • 输入"城市名+天气"，如："北京天气"
    • 支持全球主要城市查询
    
🧭 页面导航：
    • 输入"去+页面名"，如："去画廊"、"打开日历"
    • 输入"怎么走"查看所有可导航页面
    
🗺️ 网站地图：
    • 输入"网站地图"查看完整页面结构
    • 一目了然掌握所有功能
    
😄 娱乐功能：
    • 输入"讲个笑话"听有趣故事
    • 输入"有趣"了解趣味知识
    
🕐 实用工具：
    • 输入"几点了"查看当前时间
    • 基本的日常对话和问候
    
💡 使用提示：
我会根据您的输入智能识别意图，尽量用自然语言和我交流就好！
比如："我想看看作品"、"今天天气怎么样"等`;

        addMessage('雪宝', helpMessage);
    }

    // 显示网站地图功能    // 显示当前时间
    function showCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('zh-CN', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
        });
        addMessage('雪宝', `现在是 ${timeString} 🕒`);
    }

    // 获取天气信息 - 增强版，添加完整错误处理
    function getWeather(location) {
        const cityName = cityMapping[location] || location;
        addMessage('雪宝', getRandomResponse(dialogues.weatherIntro));

        // 防止空位置查询
        if (!cityName || cityName.trim() === '') {
            addMessage('雪宝', "请提供有效的城市名称，例如'北京天气'。");
            return;
        }

        const url = `${weatherApiUrl}?q=${cityName}&appid=${weatherApiKey}&units=metric&lang=zh_cn`;

        // 添加请求超时处理
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时

        fetch(url, { signal: controller.signal })
            .then((response) => {
                clearTimeout(timeoutId); // 清除超时
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('城市未找到');
                    } else if (response.status === 401) {
                        throw new Error('API密钥无效');
                    } else {
                        throw new Error(`服务器错误: ${response.status}`);
                    }
                }
                return response.json();
            })
            .then((data) => {
                try {
                    // 使用可选链和空值合并操作符增强数据获取的健壮性
                    const temp = data?.main?.temp ?? '未知';
                    const weather = data?.weather?.[0]?.description ?? '未知';
                    const humidity = data?.main?.humidity ?? '未知';
                    const windSpeed = data?.wind?.speed ?? '未知';
                    const feelsLike = data?.main?.feels_like ?? '未知';
                    const cityName = data?.name ?? location;
                    const country = data?.sys?.country ?? '';

                    const weatherInfo = `
                    📍 ${cityName}${country ? `, ${country}` : ''}的天气信息：
                    🌡️ 温度：${temp}°C
                    💭 天气：${weather}
                    💧 湿度：${humidity}%
                    🌪️ 风速：${windSpeed} m/s
                    🌡️ 体感温度：${feelsLike}°C
                `;
                    addMessage('雪宝', weatherInfo);

                    // 根据温度给出建议 - 添加数值验证
                    if (typeof temp === 'number') {
                        setTimeout(() => {
                            if (temp <= 10) {
                                addMessage(
                                    '雪宝',
                                    '温度较低，要注意保暖哦！🧥'
                                );
                            } else if (temp >= 30) {
                                addMessage(
                                    '雪宝',
                                    '温度较高，记得防晒降温！☂️'
                                );
                            } else {
                                addMessage(
                                    '雪宝',
                                    '温度适宜，是个舒适的天气呢！🌟'
                                );
                            }
                        }, 500);
                    }
                } catch (error) {
                    console.error('天气数据解析错误:', error);
                    addMessage(
                        '雪宝',
                        '抱歉，解析天气数据时出现问题，请稍后再试。'
                    );
                }
            })
            .catch((error) => {
                clearTimeout(timeoutId); // 确保清除超时
                console.error('天气API错误:', error);

                // 提供更具体的错误信息
                if (error.name === 'AbortError') {
                    addMessage('雪宝', '抱歉，获取天气信息超时，请稍后再试。');
                } else if (error.message === '城市未找到') {
                    addMessage(
                        '雪宝',
                        `抱歉，没有找到"${location}"的天气信息。请检查城市名称是否正确。`
                    );
                } else if (error.message === 'API密钥无效') {
                    addMessage(
                        '雪宝',
                        '抱歉，天气服务暂时不可用。请稍后再试。'
                    );
                } else {
                    addMessage(
                        '雪宝',
                        '抱歉，获取天气信息时出错。请稍后再试。'
                    );
                }
            });
    }

    // 聊天机器人状态动画
    function showThinking() {
        const thinking = document.createElement('div');
        thinking.className = 'message bot-message thinking-dots';
        thinking.innerHTML = `<span></span><span></span><span></span>`;
        chatbox.appendChild(thinking);
        chatbox.scrollTo({ top: chatbox.scrollHeight, behavior: 'smooth' });
        return thinking;
    } // 原有的聊天按钮点击事件已移至 initButtonDrag 函数中处理

    sendButton.addEventListener('click', function () {
        const userText = userInput.value.trim();
        if (userText !== '') {
            addMessage('用户', userText);
            getBotResponse(userText);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    function addMessage(sender, text) {
        const message = document.createElement('div');
        message.classList.add('message');

        if (sender === '用户') {
            message.classList.add('user-message');
            message.innerHTML = text;
        } else {
            message.classList.add('bot-message');
            message.innerHTML = text;
        }

        // 添加动画效果
        message.classList.add('message-animation');

        chatbox.appendChild(message);
        // 平滑滚动到底部
        chatbox.scrollTo({
            top: chatbox.scrollHeight,
            behavior: 'smooth',
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
                        if (value.startsWith('#')) {
                            document
                                .querySelector(value)
                                .scrollIntoView({ behavior: 'smooth' });
                            addMessage(
                                '雪宝',
                                getRandomResponse(dialogues.navigation)
                            );
                        } else {
                            addMessage(
                                '雪宝',
                                `好的，马上为您跳转到${key}页面~`
                            );
                            setTimeout(
                                () => (window.location.href = value),
                                1000
                            );
                        }
                        return;
                    }
                }
            } // 网站地图功能 - 直接跳转到地图页面
            if (
                normalizedText.match(
                    /网站地图|站点地图|页面地图|地图|sitemap|site map|map/
                )
            ) {
                addMessage('雪宝', '正在为您打开网站地图页面，稍等片刻~');
                setTimeout(() => {
                    window.location.href = 'map.html';
                }, 1000);
                return;
            }

            // 导航帮助
            if (normalizedText.match(/怎么走|去哪|导航帮助|指引/)) {
                addMessage('雪宝', dialogues.navHelp[0]);
                return;
            }

            if (userText.includes('天气')) {
                const location = userText.replace('天气', '').trim();
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
                addMessage('雪宝', getRandomResponse(dialogues.greetings));
                if (showExtra) {
                    setTimeout(() => {
                        addMessage('雪宝', getRandomResponse(dialogues.tips));
                    }, 1000);
                }
            } else if (normalizedText.includes('笑话')) {
                addMessage('雪宝', getRandomResponse(dialogues.jokes));
            } else if (normalizedText.match(/谢谢|感谢/)) {
                addMessage('雪宝', getRandomResponse(dialogues.thanks));
                if (showExtra) {
                    setTimeout(() => {
                        addMessage(
                            '雪宝',
                            getRandomResponse(dialogues.funFacts)
                        );
                    }, 1000);
                }
            } else if (normalizedText.match(/再见|拜拜|bye/)) {
                addMessage('雪宝', getRandomResponse(dialogues.farewells));
            } else if (normalizedText.match(/帮助|help|怎么用/)) {
                showHelp();
            } else if (normalizedText.match(/几点|时间/)) {
                showCurrentTime();
            } else if (normalizedText.match(/你是谁|你叫什么|介绍|自我介绍/)) {
                addMessage(
                    '雪宝',
                    '我是雪宝，您的专属智能助手！🤖 我可以帮您导航网站、查询天气、提供实用信息，还能陪您聊天解闷！我的使命是让您的网站体验更加便捷愉快！😊'
                );
                if (showExtra) {
                    setTimeout(() => {
                        addMessage(
                            '雪宝',
                            "🌟 试试说'网站地图'探索所有功能，或问我'北京天气'看看天气如何？"
                        );
                    }, 1000);
                }
            } else if (normalizedText.match(/有趣|趣事|趣味|有意思|知识/)) {
                addMessage('雪宝', getRandomResponse(dialogues.funFacts));
            } else if (normalizedText.match(/能做什么|功能|做什么/)) {
                addMessage(
                    '雪宝',
                    "我的主要功能包括：\n🌤️ 天气查询 - 全球城市实时天气\n🗺️ 网站导览 - 完整页面地图\n🧭 快速导航 - 一键到达任何页面\n😄 娱乐聊天 - 笑话、趣味知识\n🕐 实用工具 - 时间查询等\n\n输入'帮助'查看详细使用方法！"
                );
            } else {
                addMessage('雪宝', getRandomResponse(dialogues.unknown));
            }
        }, 600); // 思考时间，可调整
    }

    // 增强位置天气获取函数的错误处理
    function getLocationWeather() {
        if (navigator.geolocation) {
            addMessage('雪宝', '正在获取您的位置信息...');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `${weatherApiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric&lang=zh_cn`;
                    fetch(url)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('位置未找到');
                            }
                            return response.json();
                        })
                        .then((data) => {
                            try {
                                // 增强数据获取的健壮性
                                const weatherDescription =
                                    data?.weather?.[0]?.description ?? '未知';
                                const temperature = data?.main?.temp ?? '未知';
                                const cityName = data?.name ?? '当前位置';
                                const humidity = data?.main?.humidity ?? '未知';
                                const windSpeed = data?.wind?.speed ?? '未知';
                                const feelsLike =
                                    data?.main?.feels_like ?? '未知';

                                // 提供更详细的天气信息
                                const weatherInfo = `
                            📍 ${cityName}的天气信息：
                            🌡️ 温度：${temperature}°C
                            💭 天气：${weatherDescription}
                            💧 湿度：${humidity}%
                            🌪️ 风速：${windSpeed} m/s
                            🌡️ 体感温度：${feelsLike}°C
                        `;
                                addMessage('雪宝', weatherInfo);
                            } catch (error) {
                                console.error('天气数据解析错误:', error);
                                addMessage(
                                    '雪宝',
                                    '抱歉，获取天气数据时出现问题，请稍后再试。'
                                );
                            }
                        })
                        .catch((error) => {
                            console.error('天气API错误:', error);
                            addMessage(
                                '雪宝',
                                '对不起，我无法获取您当前位置信息的天气。请稍后再试。'
                            );
                        });
                },
                (error) => {
                    console.error('位置获取错误:', error);
                    let errorMessage = '对不起，我无法获取您的位置信息。';

                    // 提供更具体的错误信息
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage +=
                                '请允许访问位置信息或者手动输入城市名称。';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage +=
                                '位置信息不可用，请手动输入城市名称。';
                            break;
                        case error.TIMEOUT:
                            errorMessage +=
                                '获取位置超时，请手动输入城市名称。';
                            break;
                        default:
                            errorMessage +=
                                "请手动输入城市名称，如'北京天气'。";
                    }

                    addMessage('雪宝', errorMessage);
                },
                {
                    timeout: 10000, // 10秒超时
                    maximumAge: 300000, // 5分钟缓存
                }
            );
        } else {
            addMessage(
                '雪宝',
                "对不起，您的浏览器不支持地理位置服务。请直接输入城市名称，如'北京天气'。"
            );
        }
    }

    // 点击外部不再自动关闭对话框，而是提示用户
    let outsideClickCount = 0;
    document.addEventListener('click', function (e) {
        // 如果点击的不是对话框内部元素且不是切换按钮
        if (
            !chatContainer.contains(e.target) &&
            e.target !== chatToggleButton &&
            chatContainer.style.display === 'flex' &&
            !isPinned // 固定后点击外部不关闭
        ) {
            outsideClickCount++;

            if (outsideClickCount === 1) {
                // 第一次点击外部，显示提示
                document.getElementById('chat-status').textContent =
                    '再次点击外部将关闭窗口';

                // 3秒后重置计数
                setTimeout(() => {
                    outsideClickCount = 0;
                    document.getElementById('chat-status').textContent =
                        '随时为您服务';
                }, 3000);
            } else if (outsideClickCount >= 2) {
                // 第二次点击外部，关闭窗口
                chatContainer.classList.add('chat-minimizing');
                setTimeout(() => {
                    chatContainer.style.display = 'none';
                    chatContainer.classList.remove('chat-minimizing');
                    chatToggleButton.style.display = 'flex';
                    outsideClickCount = 0;
                }, 300);
            }
        }
    });

    // 阻止对话框内部点击事件冒泡
    chatContainer.addEventListener('click', function (e) {
        e.stopPropagation();
    }); // 简化的随机提示功能 - 减少干扰
    function showRandomTip() {
        // 只在用户长时间无活动且聊天窗口打开时才显示
        if (chatContainer.style.display !== 'none' && Math.random() > 0.9) {
            setTimeout(() => {
                const tips = [
                    "💡 记得试试'网站地图'功能哦！",
                    '🌟 您可以问我任何城市的天气～',
                    "✨ 说'去xxx'可以快速导航页面",
                ];
                addMessage(
                    '雪宝',
                    tips[Math.floor(Math.random() * tips.length)]
                );
            }, 5000);
        }
    }

    // 减少提示频率到90秒一次
    setInterval(showRandomTip, 90000);

    // 窗口大小变化时调整聊天窗口位置，避免超出屏幕
    window.addEventListener('resize', function () {
        if (chatContainer.style.display === 'flex') {
            const rect = chatContainer.getBoundingClientRect();

            // 如果窗口超出右侧边缘
            if (rect.right > window.innerWidth) {
                chatContainer.style.left =
                    window.innerWidth - chatContainer.offsetWidth + 'px';
            }

            // 如果窗口超出底部边缘
            if (rect.bottom > window.innerHeight) {
                chatContainer.style.top =
                    window.innerHeight - chatContainer.offsetHeight + 'px';
            }
        }
    });

    // 移动端视口保护函数
    function ensureMobileViewport() {
        if (window.innerWidth <= 768) {
            // 防止水平滚动
            document.body.style.overflowX = 'hidden';
            document.documentElement.style.overflowX = 'hidden';

            // 确保聊天容器在安全区域内
            if (chatContainer) {
                const containerRect = chatContainer.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                // 如果容器超出视口，重新定位
                if (containerRect.right > viewportWidth) {
                    chatContainer.style.right = '2.5vw';
                    chatContainer.style.left = 'auto';
                }

                if (containerRect.bottom > viewportHeight) {
                    chatContainer.style.bottom = '70px';
                    chatContainer.style.top = 'auto';
                }
            }
        }
    } // 页面加载完成后执行初始保护
    setTimeout(function () {
        ensureMobileViewport();
        updateChatButtonPosition();
    }, 100); // 初始化按钮拖动功能
    function initButtonDrag() {
        let isDragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let buttonStartX = 0;
        let buttonStartY = 0;
        let dragDistance = 0;

        // 鼠标事件
        chatToggleButton.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);

        // 触摸事件（移动端）
        chatToggleButton.addEventListener('touchstart', startDragTouch, {
            passive: false,
        });
        document.addEventListener('touchmove', dragTouch, { passive: false });
        document.addEventListener('touchend', endDragTouch);

        // 阻止原有的点击事件，改为自定义处理
        chatToggleButton.addEventListener('click', handleClick);

        function startDrag(e) {
            isDragging = true;
            dragDistance = 0;
            dragStartX = e.clientX;
            dragStartY = e.clientY;

            const rect = chatToggleButton.getBoundingClientRect();
            buttonStartX = rect.left;
            buttonStartY = rect.top;

            chatToggleButton.style.cursor = 'grabbing';
        }

        function startDragTouch(e) {
            const touch = e.touches[0];
            isDragging = true;
            dragDistance = 0;
            dragStartX = touch.clientX;
            dragStartY = touch.clientY;

            const rect = chatToggleButton.getBoundingClientRect();
            buttonStartX = rect.left;
            buttonStartY = rect.top;
        }

        function drag(e) {
            if (!isDragging) return;

            const deltaX = e.clientX - dragStartX;
            const deltaY = e.clientY - dragStartY;
            dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // 当拖动距离大于5px时才开始拖动和添加样式
            if (dragDistance > 5) {
                e.preventDefault();
                chatToggleButton.classList.add('dragging');
                updateButtonPosition(
                    buttonStartX + deltaX,
                    buttonStartY + deltaY
                );
            }
        }

        function dragTouch(e) {
            if (!isDragging) return;

            const touch = e.touches[0];
            const deltaX = touch.clientX - dragStartX;
            const deltaY = touch.clientY - dragStartY;
            dragDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // 当拖动距离大于5px时才开始拖动
            if (dragDistance > 5) {
                e.preventDefault();
                chatToggleButton.classList.add('dragging');
                updateButtonPosition(
                    buttonStartX + deltaX,
                    buttonStartY + deltaY
                );
            }
        }

        function endDrag() {
            if (!isDragging) return;
            isDragging = false;
            chatToggleButton.classList.remove('dragging');
            chatToggleButton.style.cursor = 'move';

            // 如果拖动距离大于5px，则吸附到边缘，否则当作点击处理
            if (dragDistance > 5) {
                snapToEdge();
            }
        }

        function endDragTouch() {
            if (!isDragging) return;
            isDragging = false;
            chatToggleButton.classList.remove('dragging');

            // 如果拖动距离大于5px，则吸附到边缘
            if (dragDistance > 5) {
                snapToEdge();
            }
        }

        function handleClick(e) {
            // 如果是拖动操作（距离大于5px），阻止点击事件
            if (dragDistance > 5) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            // 小于5px的移动视为点击，执行原有的聊天框切换逻辑
            toggleChatContainer();
        }

        function updateButtonPosition(x, y) {
            const buttonSize = 50;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // 限制在视口内
            x = Math.max(0, Math.min(x, viewportWidth - buttonSize));
            y = Math.max(0, Math.min(y, viewportHeight - buttonSize));

            chatToggleButton.style.left = x + 'px';
            chatToggleButton.style.top = y + 'px';
            chatToggleButton.style.right = 'auto';
            chatToggleButton.style.bottom = 'auto';
            chatToggleButton.style.transform = 'none';
        }

        function snapToEdge() {
            const rect = chatToggleButton.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const centerX = rect.left + rect.width / 2;

            // 吸附到左边或右边
            if (centerX < viewportWidth / 2) {
                // 吸附到左边
                chatToggleButton.style.left = '20px';
                chatToggleButton.style.right = 'auto';
            } else {
                // 吸附到右边
                chatToggleButton.style.right = '20px';
                chatToggleButton.style.left = 'auto';
            }
        }

        // 聊天框切换函数
        function toggleChatContainer() {
            if (
                chatContainer.style.display === 'none' ||
                chatContainer.style.display === ''
            ) {
                // 显示聊天框
                if (!restorePosition()) {
                    const viewportHeight = window.innerHeight;
                    chatContainer.style.top = viewportHeight / 2 - 225 + 'px';
                    chatContainer.style.right = '20px';
                }

                chatContainer.style.display = 'flex';
                chatContainer.classList.add('chat-showing');
                setTimeout(() => {
                    chatContainer.classList.remove('chat-showing');
                }, 300);

                chatToggleButton.style.display = 'none';
                isMinimized = false;

                if (isFirstOpen) {
                    const greeting = getRandomResponse(dialogues.greetings);
                    addMessage('雪宝', greeting);
                    setTimeout(() => {
                        addMessage(
                            '雪宝',
                            "我可以帮您：🌤️ 查天气 🗺️ 看网站地图 🧭 导航页面 😄 聊天解闷！输入'帮助'了解详细功能～"
                        );
                    }, 1000);
                    isFirstOpen = false;
                }

                userInput.focus();
            } else {
                // 隐藏聊天框
                chatContainer.classList.add('chat-minimizing');
                setTimeout(() => {
                    chatContainer.style.display = 'none';
                    chatContainer.classList.remove('chat-minimizing');
                    chatToggleButton.style.display = 'flex';
                }, 300);
                isMinimized = true;
            }
        }
    }

    // 初始化自动透明功能
    function initAutoTransparency() {
        let inactiveTimer;
        let isHovering = false;

        // 设置非活跃状态
        function setInactive() {
            if (!isHovering && !isDragging) {
                chatToggleButton.classList.add('auto-transparent');
            }
        }

        // 设置活跃状态
        function setActive() {
            chatToggleButton.classList.remove('auto-transparent', 'inactive');
            clearTimeout(inactiveTimer);

            // 3秒后自动变透明
            inactiveTimer = setTimeout(setInactive, 3000);
        }

        // 鼠标悬停事件
        chatToggleButton.addEventListener('mouseenter', function () {
            isHovering = true;
            setActive();
        });

        chatToggleButton.addEventListener('mouseleave', function () {
            isHovering = false;
            inactiveTimer = setTimeout(setInactive, 1000);
        });

        // 页面活动检测
        document.addEventListener('mousemove', setActive);
        document.addEventListener('scroll', setActive);
        document.addEventListener('click', setActive);

        // 初始启动透明化
        setActive();
    }
});
