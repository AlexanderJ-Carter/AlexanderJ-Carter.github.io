document.addEventListener("DOMContentLoaded", function () {
  const chatContainer = document.getElementById("chat-container");
  const chatToggleButton = document.getElementById("chat-toggle-button");
  const chatbox = document.getElementById("chatbox");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");
  const weatherApiKey = "e92adb1cc07788a547544fa7e9cfcc5e";
  const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";

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
  };

  // 显示初始的问候语和提示语
  addMessage("雪宝", "你好！我是雪宝，很高兴见到你！");
  addMessage(
    "雪宝",
    "你可以问我当前城市的天气，例如输入 '北京天气'，或者让我讲个笑话试试！"
  );

  chatToggleButton.addEventListener("click", function () {
    if (
      chatContainer.style.display === "none" ||
      chatContainer.style.display === ""
    ) {
      chatContainer.style.display = "flex";
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

  function getBotResponse(userText) {
    // 标准化用户输入
    const normalizedText = userText.toLowerCase();

    // Check for weather keywords
    if (userText.includes("天气")) {
      const location = userText.replace("天气", "").trim();
      if (location) {
        getWeather(location);
      } else {
        getLocationWeather();
      }
    } else if (
      normalizedText.includes("你好") ||
      normalizedText.includes("hello")
    ) {
      // Greeting response
      addMessage("雪宝", "你好！我是雪宝，有什么我可以帮忙的吗？");
    } else if (
      normalizedText.includes("谢谢") ||
      normalizedText.includes("感谢")
    ) {
      // Thank you response
      addMessage("雪宝", "不用客气！很高兴能帮到你 😊");
    } else if (
      normalizedText.includes("你是谁") ||
      normalizedText.includes("你叫什么")
    ) {
      // About bot response
      addMessage("雪宝", "我是雪宝，一个友好的小助手，随时准备帮助你哦！");
    } else if (normalizedText.includes("笑话")) {
      // Joke response
      addMessage(
        "雪宝",
        "你知道吗？鱼为什么会吹泡泡？因为它想让自己显得很“水灵”！😂"
      );
    } else if (
      normalizedText.includes("再见") ||
      normalizedText.includes("bye")
    ) {
      // Goodbye response
      addMessage("雪宝", "再见！希望很快再见到你！👋");
    } else {
      // Fallback response
      addMessage(
        "雪宝",
        "对不起，我不太明白您的意思。我可以帮助您查询天气信息或者讲个笑话！"
      );
    }
  }

  function getWeather(location) {
    // 检查输入的城市是否在映射表中，如果在，使用英文名称
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
