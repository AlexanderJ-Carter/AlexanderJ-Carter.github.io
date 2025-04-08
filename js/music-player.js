document.addEventListener("DOMContentLoaded", function () {
  const musicPlayer = document.getElementById("music-player");
  const toggleButton = document.getElementById("toggle-music-player");
  const music = document.getElementById("background-music");
  const songTitle = document.getElementById("song-title");
  const volumeSlider = document.getElementById("volume-slider");
  const progressBar = document.getElementById("progress-bar");
  const nextSongButton = document.getElementById("next-song");

  const songs = [
    { title: "冬忆", src: "music/冬忆.flac" },
    {
      title: "天空の城",
      src: "music/天空之城.flac",
    },
    {
      title: "彩云追月",
      src: "music/彩云追月.ogg",
    },
    {
      title: "雨的印记",
      src: "music/雨的印记.ogg",
    },
  ];
  let currentSongIndex = 0;

  function loadSong(index) {
    music.src = songs[index].src;
    songTitle.setAttribute("data-title", songs[index].title);

    // 根据当前语言环境设置正确的前缀文本
    const isEnglish = document.documentElement.lang === "en-US";
    const prefix = isEnglish ? "Now Playing: " : "当前播放: ";
    songTitle.textContent = `${prefix}${songs[index].title}`;
  }

  function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    music.play();
  }

  // 初始状态折叠音乐播放器
  setTimeout(() => {
    musicPlayer.classList.remove("open");
  }, 1000);

  toggleButton.addEventListener("click", function () {
    musicPlayer.classList.toggle("open");
    if (music.paused) {
      music.play();
      toggleButton.classList.add("playing");
    } else {
      music.pause();
      toggleButton.classList.remove("playing");
    }
    songTitle.classList.toggle("open");
  });

  nextSongButton.addEventListener("click", playNextSong);

  volumeSlider.addEventListener("input", function () {
    music.volume = volumeSlider.value;
  });

  // 创建和添加时间显示元素
  const timeDisplay = document.createElement("div");
  timeDisplay.className = "time-display";

  const currentTimeEl = document.createElement("span");
  currentTimeEl.id = "current-time";
  currentTimeEl.textContent = "0:00";

  const durationEl = document.createElement("span");
  durationEl.id = "duration";
  durationEl.textContent = "0:00";

  timeDisplay.appendChild(currentTimeEl);
  timeDisplay.appendChild(document.createTextNode(" / "));
  timeDisplay.appendChild(durationEl);

  document.querySelector(".song-progress").appendChild(timeDisplay);

  // 格式化时间显示
  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // 更新进度和时间显示
  music.addEventListener("timeupdate", function () {
    const progress = (music.currentTime / music.duration) * 100;
    progressBar.value = progress;
    currentTimeEl.textContent = formatTime(music.currentTime);
    durationEl.textContent = formatTime(music.duration);
  });

  // 加载元数据时更新总时长
  music.addEventListener("loadedmetadata", function () {
    durationEl.textContent = formatTime(music.duration);
  });

  // 更新进度条点击跳转
  progressBar.addEventListener("input", function () {
    const seekTime = (progressBar.value / 100) * music.duration;
    music.currentTime = seekTime;
  });

  progressBar.addEventListener("change", function () {
    const time = (progressBar.value / 100) * music.duration;
    music.currentTime = time;
  });

  music.addEventListener("ended", playNextSong);

  // 加载初始歌曲并自动播放
  loadSong(currentSongIndex);
  music.play();
  toggleButton.classList.add("playing");

  // 自动折叠播放器
  let hideTimeout;
  function resetHideTimeout() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      musicPlayer.classList.remove("open");
    }, 5000);
  }

  document.addEventListener("mousemove", resetHideTimeout);
  document.addEventListener("keypress", resetHideTimeout);

  // 点击播放器外部区域时关闭
  document.addEventListener("click", function (e) {
    if (!musicPlayer.contains(e.target) && e.target !== toggleButton) {
      musicPlayer.classList.remove("open");
    }
  });

  resetHideTimeout();
});
