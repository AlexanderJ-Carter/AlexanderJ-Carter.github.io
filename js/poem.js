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

    // 设置背景图片
    function updateBackgroundImage() {
        const poemSection = document.querySelector(".poem-history-section");
        if (!poemSection) return;

        const keywords = ["nature", "sky", "mountains", "forest", "flowers"];
        const keyword = keywords[Math.floor(Math.random() * keywords.length)];

        fetch(
            `https://api.unsplash.com/photos/random?query=${keyword}&client_id=EdmgsPIwdA-ys_S2lRWjkqQJgNwDJSUSPLgWMJPJ1lg`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data && data.urls && data.urls.regular) {
                    poemSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${data.urls.regular})`;
                    poemSection.style.backgroundSize = "cover";
                    poemSection.style.backgroundPosition = "center";
                }
            })
            .catch((error) => {
                console.error("Error fetching background image:", error);
            });
    }

    // 初始化背景图片
    updateBackgroundImage();
});
