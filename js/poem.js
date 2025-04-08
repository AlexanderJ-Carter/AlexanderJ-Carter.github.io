jinrishici.load(function (result) {
  var sentence = document.querySelector("#poem_sentence");
  var info = document.querySelector("#poem_info");

  if (sentence && info) {
    sentence.innerHTML = result.data.content;
    info.innerHTML = `【${result.data.origin.dynasty}】${result.data.origin.author}《${result.data.origin.title}》`;
  }
});

// 优化历史上的今天API调用
function getTodayInHistory() {
  // 检查是否有缓存的历史数据
  const cachedData = sessionStorage.getItem("historyToday");
  const cachedTime = sessionStorage.getItem("historyTodayTime");

  // 如果有缓存且不超过1小时，直接使用缓存
  if (cachedData && cachedTime && Date.now() - parseInt(cachedTime) < 3600000) {
    displayHistoryEvent(JSON.parse(cachedData));
    return;
  }

  fetch("https://api.oick.cn/lishi/api.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("网络响应不正常");
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.result) {
        // 缓存数据
        sessionStorage.setItem("historyToday", JSON.stringify(data));
        sessionStorage.setItem("historyTodayTime", Date.now().toString());
        displayHistoryEvent(data);
      }
    })
    .catch((error) => {
      console.error("获取历史事件出错:", error);
      const historyElement = document.querySelector("#history-today");
      if (historyElement) {
        historyElement.innerHTML = "历史事件加载失败，请稍后再试...";
      }
    });
}

// 显示历史事件
function displayHistoryEvent(data) {
  const historyElement = document.querySelector("#history-today");
  if (historyElement && data.result) {
    const randomEvent =
      data.result[Math.floor(Math.random() * data.result.length)];
    historyElement.innerHTML = `在 ${randomEvent.date}，${randomEvent.title}`;
  }
}

// 初始化获取历史事件
getTodayInHistory();

// 每小时更换背景图片
function updateBackgroundImage() {
  const keywords = ["nature", "sky", "mountains", "forest", "flowers"];
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];

  fetch(
    `https://api.unsplash.com/photos/random?query=${keyword}&client_id=EdmgsPIwdA-ys_S2lRWjkqQJgNwDJSUSPLgWMJPJ1lg`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data && data.urls && data.urls.regular) {
        document.querySelectorAll(".poem-section").forEach((section) => {
          section.style.backgroundImage = `url(${data.urls.regular})`;
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching background image:", error);
    });
}

// 初始化背景图片，并每小时更换一次
updateBackgroundImage();
setInterval(updateBackgroundImage, 3600000); // 1小时 = 3600000毫秒

document.addEventListener("DOMContentLoaded", function () {
  // 加载诗词
  jinrishici.load(function (result) {
    const sentence = document.querySelector("#poem_sentence");
    const info = document.querySelector("#poem_info");

    if (sentence && info) {
      sentence.innerHTML = result.data.content;
      info.innerHTML = `【${result.data.origin.dynasty}】${result.data.origin.author}《${result.data.origin.title}》`;

      // 添加淡入动画
      sentence.style.opacity = 0;
      info.style.opacity = 0;

      setTimeout(() => {
        sentence.style.transition = "opacity 0.8s ease";
        sentence.style.opacity = 1;
      }, 300);

      setTimeout(() => {
        info.style.transition = "opacity 0.8s ease";
        info.style.opacity = 1;
      }, 600);
    }
  });

  // 加载历史上的今天
  function getTodayInHistory() {
    fetch("https://api.oick.cn/lishi/api.php")
      .then((response) => response.json())
      .then((data) => {
        const historyEl = document.querySelector("#history-today");
        if (data && data.result && historyEl) {
          const randomEvent =
            data.result[Math.floor(Math.random() * data.result.length)];
          historyEl.innerHTML = `<div class="history-date">${randomEvent.date}</div>
                                <div class="history-event">${randomEvent.title}</div>`;

          // 添加淡入动画
          historyEl.style.opacity = 0;
          setTimeout(() => {
            historyEl.style.transition = "opacity 0.8s ease";
            historyEl.style.opacity = 1;
          }, 900);
        }
      })
      .catch((error) =>
        console.error("Error fetching historical event:", error)
      );
  }

  getTodayInHistory();
});
