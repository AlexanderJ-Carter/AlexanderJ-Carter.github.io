document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.getElementById("chat-container");
  const chatToggleButton = document.getElementById("chat-toggle-button");
  const chatbox = document.getElementById("chatbox");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");
  const weatherApiKey = "e92adb1cc07788a547544fa7e9cfcc5e";
  const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
  let isFirstOpen = true; // 检测是否首次打开对话框

  // 对话内容库
  const dialogues = {
    greetings: [
      "你好！我是雪宝，很高兴见到你！😊",
      "嗨！今天有什么我可以帮你的吗？✨",
      "你好啊！要不要聊聊天？🌟",
      "欢迎找我聊天！让我猜猜你想问什么？🤔",
    ],
    jokes: [
      "程序员最讨厌什么？讨厌别人不按照他的方式过马路！😄",
      "为什么程序员总是分不清万圣节和圣诞节？因为 Oct 31 = Dec 25！😂",
      "你知道吗？鱼为什么会吹泡泡？因为它想让自己显得很‘水灵’！😆",
      "为什么程序员喜欢黑咖啡？因为他们喜欢没有类（class）的生活！🤣",
      "一个冰箱对另一个冰箱说：‘你为什么在发抖？’ 另一个回答：‘因为我冰箱了！’😅",
    ],
    thanks: [
      "不用客气！能帮到你我很开心 😊",
      "这是我应该做的！随时找我聊天哦 💫",
      "应该的！有什么需要随时告诉我 🌟",
    ],
    farewells: [
      "再见！记得常来找我聊天哦！👋",
      "下次见！祝您有愉快的一天！😊",
      "期待下次为您服务！再见！✨",
    ],
    unknown: [
      "抱歉，我可能没太明白。要不要试试以下功能：\n1. 查询天气\n2. 讲笑话\n3. 聊天",
      "这个问题有点难倒我了。不如我们聊点别的？",
      "让我想想...要不我给你讲个笑话？",
    ],
    weatherIntro: [
      "让我看看天气情况...",
      "正在查询天气信息...",
      "稍等片刻，马上告诉您...",
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

  // 随机选择响应
  function getRandomResponse(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // 显示功能提示
  function showHelp() {
    const helpMessage = `
            我可以为您提供以下服务：
            🌤️ 查询天气 - 例如："北京天气"、"东京天气"
            😄 讲笑话 - 输入"讲个笑话"
            🕒 查看时间 - 输入"几点了"
            💭 日常聊天 - 和我打个招呼吧！
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
    message.classList.add("mb-2");
    message.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  // 保留这个更完整的版本，删除后面的重复定义
  function getBotResponse(userText) {
    const normalizedText = userText.toLowerCase();

    if (userText.includes("天气")) {
      const location = userText.replace("天气", "").trim();
      if (location) {
        getWeather(location);
      } else {
        getLocationWeather();
      }
      return;
    }

    if (normalizedText.match(/你好|hello|hi|嗨/)) {
      addMessage("雪宝", getRandomResponse(dialogues.greetings));
    } else if (normalizedText.includes("笑话")) {
      addMessage("雪宝", getRandomResponse(dialogues.jokes));
    } else if (normalizedText.match(/谢谢|感谢/)) {
      addMessage("雪宝", getRandomResponse(dialogues.thanks));
    } else if (normalizedText.match(/再见|拜拜|bye/)) {
      addMessage("雪宝", getRandomResponse(dialogues.farewells));
    } else if (normalizedText.match(/帮助|help|怎么用/)) {
      showHelp();
    } else if (normalizedText.match(/几点|时间/)) {
      showCurrentTime();
    } else if (normalizedText.match(/你是谁|你叫什么/)) {
      addMessage(
        "雪宝",
        "我是雪宝，一个AI助手！我可以帮你查天气、讲笑话，或者陪你聊天！😊"
      );
    } else {
      addMessage("雪宝", getRandomResponse(dialogues.unknown));
    }
  }

  function getWeather(location) {
    const cityName = cityMapping[location] || location;

    const url = `${weatherApiUrl}?q=${cityName}&appid=${weatherApiKey}&units=metric&lang=zh_cn`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("城市未找到");
        }
        return response.json();
      })
      .then((data) => {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const weatherMessage = `当前${location}的天气是：${weatherDescription}，温度为 ${temperature}°C。`;
        addMessage("雪宝", weatherMessage);
      })
      .catch((error) => {
        addMessage(
          "雪宝",
          "对不起，我找不到您想查的地方的天气信息。请检查城市名称是否正确。"
        );
      });
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
});
