document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.getElementById("chat-container");
  const chatToggleButton = document.getElementById("chat-toggle-button");
  const chatbox = document.getElementById("chatbox");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");
  let isFirstOpen = true; // 检测是否首次打开对话框

  const weatherApiKey = "e92adb1cc07788a547544fa7e9cfcc5e";
  const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";

  // 为聊天按钮添加初始样式
  chatToggleButton.style.position = "fixed";
  chatToggleButton.style.transform = "translate(0, 0)";

  const navigationMap = {
    主页: {
      path: "#intro",
      desc: "返回网站首页",
      icon: "🏠",
    },
    关于: {
      path: "#about",
      desc: "了解我们的故事",
      icon: "👥",
    },
    创造: {
      path: "#services",
      desc: "探索创意世界",
      icon: "🎨",
    },
    作品: {
      path: "#portfolio",
      desc: "查看精选作品",
      icon: "🖼️",
    },
    文字: {
      path: "#text",
      desc: "阅读分享文章",
      icon: "📝",
    },
    联系: {
      path: "contact.html",
      desc: "联系我们",
      icon: "📞",
    },
  };

  function getNavigationTarget(text) {
    const target = Object.keys(navigationMap).find((key) => text.includes(key));
    return target ? navigationMap[target] : null;
  }

  const dialogues = {
    // 导航对话
    navigation: [
      "好的，马上带您过去！✨",
      "这就为您导航，请稍等~🚀",
      "正在前往目标页面...💫",
    ],

    // 导航帮助
    navHelp: [
      `我可以帮您导航到以下页面：
      🏠 主页 - 返回首页
      👥 关于 - 了解我们故事
      🎨 创造 - 探索创意世界
      🖼️ 作品 - 欣赏精选集
      📝 文字 - 阅读分享
      📞 联系 - 联系我们`,
    ],

    // 基础问候
    greetings: [
      "你好！很高兴见到你！👋",
      "有什么可以帮您的吗？💫",
      "需要我带您参观网站吗？🌟",
    ],

    // 帮助信息
    help: [
      `我能为您提供以下服务：
      🧭 网站导航 - 带您游览各个页面
      💡 功能介绍 - 了解网站特色
      💭 日常聊天 - 陪您聊聊天`,
    ],

    // 未识别回复
    unknown: [
      "抱歉，我没有理解您的意思...🤔",
      "要不换个话题？或者我可以帮您导航！🧭",
      "需要我介绍一下我能做什么吗？💡",
    ],
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

  // 笑话库
  const jokes = [
    "为什么程序员总是分不清Halloween和Christmas？因为Oct 31 == Dec 25 😄",
    "一个程序员走进酒吧，说：‘Hello World!’，另一个程序员回答：‘404 - 问候语未找到！’ 🍺",
    "为什么程序员不喜欢讲笑话？因为怕别人听不懂他们的递归梗😆",
    "如何让程序员疯狂？把他的代码里的分号全部删掉！😱",
    "程序员最讨厌去咖啡店，因为店里全是Java☕",
  ];

  // 天气描述映射
  const weatherDescriptions = {
    Clear: "晴朗",
    Clouds: "多云",
    Rain: "下雨",
    Snow: "下雪",
    Drizzle: "毛毛雨",
    Thunderstorm: "雷暴",
    Mist: "薄雾",
    Smoke: "烟雾",
    Haze: "霾",
    Dust: "灰尘",
    Fog: "雾",
    Sand: "沙尘",
    Ash: "火山灰",
    Squall: "暴风",
    Tornado: "龙卷风",
  };

  // 情感关键词映射
  const emotionKeywords = {
    positive: ["开心", "快乐", "高兴", "棒", "好", "赞", "喜欢", "爱"],
    negative: ["伤心", "难过", "失望", "不好", "讨厌", "烦", "累"],
    neutral: ["一般", "还行", "凑合", "普通"],
  };

  const userPreferences = {
    lastInteraction: null,
    conversationHistory: [],
    userSettings: {
      autoHide: true,
      notifications: true,
    },
    save() {
      localStorage.setItem("chatbot_preferences", JSON.stringify(this));
    },
    load() {
      const saved = localStorage.getItem("chatbot_preferences");
      if (saved) {
        Object.assign(this, JSON.parse(saved));
      }
    },
  };

  function addToHistory(userInput, botResponse) {
    userPreferences.conversationHistory.push({
      time: new Date().toISOString(),
      user: userInput,
      bot: botResponse,
    });
    if (userPreferences.conversationHistory.length > 10) {
      userPreferences.conversationHistory.shift();
    }
    userPreferences.save();
  }

  // 时间相关问候
  function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 6) return "夜深了，要注意休息哦！🌙";
    if (hour < 11) return "早上好！开启元气满满的一天吧！🌅";
    if (hour < 14) return "中午好！要记得吃午饭哦！🍚";
    if (hour < 18) return "下午好！要来杯下午茶吗？☕";
    if (hour < 22) return "晚上好！今天过得怎么样？🌙";
    return "夜深了，早点休息对身体好哦！😴";
  }

  // 根据温度给出建议
  function getTemperatureAdvice(temp) {
    if (temp <= 0) return "天气很冷，要穿得暖暖的哦！❄️";
    if (temp <= 10) return "温度偏低，记得多穿点衣服！🧥";
    if (temp <= 20) return "天气舒适，很适合出门活动！🌤️";
    if (temp <= 28) return "温度宜人，是个好天气！🌞";
    if (temp <= 35) return "天气有点热，记得防晒降温！☂️";
    return "温度很高，尽量避免外出，多补充水分！🌡️";
  }

  // 检测并回应情感
  function detectEmotion(text) {
    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          return emotion;
        }
      }
    }
    return "neutral";
  }

  // 生成建议回复
  function generateSuggestions(context) {
    const suggestions = [];
    if (context.includes("天气")) {
      suggestions.push("要我帮你查查其他城市的天气吗？");
      suggestions.push("需要具体的穿衣建议吗？");
    }
    if (context.includes("音乐")) {
      suggestions.push("要不要听点轻音乐放松一下？");
      suggestions.push("我可以帮你切换下一首歌！");
    }
    if (context.includes("工作") || context.includes("累")) {
      suggestions.push("要不要休息一下，听听音乐？");
      suggestions.push("我来给你讲个笑话吧！");
    }
    return suggestions;
  }

  // 导出功能
  module.exports = {
    jokes,
    weatherDescriptions,
    emotionKeywords,
    getTimeBasedGreeting,
    getTemperatureAdvice,
    detectEmotion,
    generateSuggestions,
  };

  // UI交互相关函数
  function addSuggestionButtons(suggestions) {
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "suggestion-buttons";

    suggestions.forEach((text) => {
      const button = document.createElement("button");
      button.className = "suggestion-btn";
      button.textContent = text;
      button.onclick = () => handleSuggestion(text);
      buttonContainer.appendChild(button);
    });

    return buttonContainer;
  }

  function handleSuggestion(text) {
    document.getElementById("userInput").value = text;
    document.getElementById("sendButton").click();
  }

  function handleError(error, type = "general") {
    console.error(`聊天机器人错误 [${type}]:`, error);
    const errorMessages = {
      weather: "抱歉，获取天气信息失败了，请稍后再试～",
      network: "网络连接似乎出现问题，请检查后重试～",
      general: "抱歉，我遇到了一点小问题，让我们换个话题吧～",
    };
    addMessage("雪宝", errorMessages[type] || errorMessages.general);
  }

  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.innerHTML = "<span></span><span></span><span></span>";
    return indicator;
  }

  function animateResponse(element, text, speed = 50) {
    let index = 0;
    element.textContent = "";

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (index < text.length) {
          element.textContent += text[index];
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }
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
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    addMessage("雪宝", `现在是 ${timeString} 🕒`);
  }

  // 获取天气信息
  function getWeather(location) {
    const cityName = cityMapping[location] || location;
    addMessage("雪宝", getRandomResponse(dialogues.weatherIntro));

    const url = `${weatherApiUrl}?q=${cityName}&appid=${weatherApiKey}&units=metric&lang=zh_cn`;
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("城市未找到");
        return response.json();
      })
      .then((data) => {
        const weatherInfo = `
                    📍 ${location}的天气信息：
                    🌡️ 温度：${data.main.temp}°C
                    💭 天气：${data.weather[0].description}
                    💧 湿度：${data.main.humidity}%
                    🌪️ 风速：${data.wind.speed} m/s
                    🌡️ 体感温度：${data.main.feels_like}°C
                `;
        addMessage("雪宝", weatherInfo);

        // 根据温度给出建议
        const temp = data.main.temp;
        setTimeout(() => {
          if (temp <= 10) {
            addMessage("雪宝", "温度较低，要注意保暖哦！🧥");
          } else if (temp >= 30) {
            addMessage("雪宝", "温度较高，记得防晒降温！☂️");
          } else {
            addMessage("雪宝", "温度适宜，是个舒适的天气呢！🌟");
          }
        }, 500);
      })
      .catch((error) => {
        addMessage(
          "雪宝",
          "抱歉，没有找到该城市的天气信息。要不换个城市试试？"
        );
      });
  }

  // 当点击聊天按钮时显示聊天框并初始化问候语
  chatToggleButton.addEventListener("click", function () {
    if (
      chatContainer.style.display === "none" ||
      chatContainer.style.display === ""
    ) {
      chatContainer.style.display = "flex";

      // 首次打开时显示问候语和提示
      if (isFirstOpen) {
        addMessage("雪宝", "你好！我是雪宝，很高兴见到你！");
        addMessage(
          "雪宝",
          "你可以问我当前城市的天气，例如输入 '北京天气'，或者让我讲个笑话试试！"
        );
        isFirstOpen = false; // 设置为false，避免下次再次显示
      }
    } else {
      chatContainer.style.display = "none";
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

    chatbox.appendChild(message);
    // 平滑滚动到底部
    chatbox.scrollTo({
      top: chatbox.scrollHeight,
      behavior: "smooth",
    });
  }

  function getBotResponse(userText) {
    try {
      const normalizedText = userText.toLowerCase();
      const userEmotion = detectEmotion(normalizedText);
      const context = analyzeContext(normalizedText);

      // 根据上下文和情感选择合适的回复
      let response;
      if (context.isNavigation) {
        response = handleNavigation(context.target);
      } else if (context.isWeather) {
        response = handleWeatherQuery(context.location);
      } else if (context.isEmotional) {
        response = handleEmotionalResponse(userEmotion);
      } else {
        response = getGeneralResponse(normalizedText);
      }

      addToHistory(userText, response);
      return response;
    } catch (error) {
      handleError(error);
      return null;
    }
  }

  function analyzeContext(text) {
    return {
      isNavigation: /去|打开|导航|看看/.test(text),
      isWeather: text.includes("天气"),
      isEmotional: detectEmotion(text) !== "neutral",
      target: extractNavigationTarget(text),
      location: extractLocation(text),
    };
  }

  function getLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `${weatherApiUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric&lang=zh_cn`;
          fetch(url)
            .then((response) => {
              if (!response.ok) {
                throw new Error("位置未找到");
              }
              return response.json();
            })
            .then((data) => {
              const weatherDescription = data.weather[0].description;
              const temperature = data.main.temp;
              const weatherMessage = `您当前位置的天气是：${weatherDescription}，温度为 ${temperature}°C。`;
              addMessage("雪宝", weatherMessage);
            })
            .catch((error) => {
              addMessage("雪宝", "对不起，我无法获取您当前位置信息的天气。");
            });
        },
        () => {
          addMessage(
            "雪宝",
            "对不起，我无法获取您的位置信息。请允许访问位置信息或者手动输入城市名称。"
          );
        }
      );
    } else {
      addMessage("雪宝", "对不起，您的浏览器不支持地理位置服务。");
    }
  }

  // 2. 添加缺失的函数实现
  function handleNavigation(target) {
    for (const category in navigationMap) {
      for (const [name, details] of Object.entries(navigationMap[category])) {
        if (target.includes(name)) {
          document
            .querySelector(details.path)
            ?.scrollIntoView({ behavior: "smooth" });
          return `${details.icon} 正在带您去${name}~`;
        }
      }
    }
    return "抱歉，我没找到您想去的页面。";
  }

  function handleWeatherQuery(location) {
    if (!location) {
      return getLocationWeather();
    }
    return getWeather(location);
  }

  function handleEmotionalResponse(emotion) {
    switch (emotion) {
      case "positive":
        return getRandomResponse(dialogues.emotions.happy);
      case "negative":
        return getRandomResponse(dialogues.emotions.encourage);
      default:
        return getRandomResponse(dialogues.unknown);
    }
  }

  function extractNavigationTarget(text) {
    const targets = Object.keys(navigationMap.main)
      .concat(Object.keys(navigationMap.features))
      .concat(Object.keys(navigationMap.others));
    return targets.find((target) => text.includes(target)) || "";
  }

  function extractLocation(text) {
    return Object.keys(cityMapping).find((city) => text.includes(city)) || "";
  }

  // 4. 添加自动隐藏功能
  let hideTimeout;
  function resetAutoHide() {
    clearTimeout(hideTimeout);
    if (chatContainer.style.display === "flex") {
      hideTimeout = setTimeout(() => {
        chatContainer.style.display = "none";
      }, 300000); // 5分钟后自动隐藏
    }
  }

  // 5. 在事件监听器中添加自动隐藏重置
  chatContainer.addEventListener("mousemove", resetAutoHide);
  userInput.addEventListener("input", resetAutoHide);

  // 点击外部关闭对话框
  document.addEventListener("click", function (e) {
    // 如果点击的不是对话框内部元素且不是切换按钮
    if (
      !chatContainer.contains(e.target) &&
      e.target !== chatToggleButton &&
      chatContainer.style.display === "flex"
    ) {
      chatContainer.style.display = "none";
    }
  });

  // 阻止对话框内部点击事件冒泡
  chatContainer.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
