jinrishici.load(function (result) {
  var sentence = document.querySelector("#poem_sentence");
  var info = document.querySelector("#poem_info");

  sentence.innerHTML = result.data.content;
  info.innerHTML = `【${result.data.origin.dynasty}】${result.data.origin.author}《${result.data.origin.title}》`;
});

function getTodayInHistory() {
  fetch("https://api.oick.cn/lishi/api.php")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.result) {
        const randomEvent =
          data.result[Math.floor(Math.random() * data.result.length)];
        document.querySelector(
          "#history-today"
        ).innerHTML = `在 ${randomEvent.date}，${randomEvent.title}`;
      }
    })
    .catch((error) => console.error("Error fetching historical event:", error));
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
