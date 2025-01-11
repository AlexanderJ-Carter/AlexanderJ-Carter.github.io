document.addEventListener("DOMContentLoaded", function () {
  // DOM元素
  const musicPlayer = document.getElementById("music-player");
  const toggleButton = document.getElementById("toggle-music-player");
  const music = document.getElementById("background-music");
  const songTitle = document.getElementById("song-title");
  const volumeSlider = document.getElementById("volume-slider");
  const progressBar = document.getElementById("progress-bar");
  const nextSongButton = document.getElementById("next-song");
  const prevSongButton = document.getElementById("prev-song");
  const randomButton = document.getElementById("random-button");

  // 本地音乐列表 - 纯音乐为主
  const localSongs = [
    {
      title: "冬忆",
      src: "music/冬忆.flac",
      artist: "纯音乐",
      duration: "4:32",
    },
    {
      title: "天空の城",
      src: "music/天空之城.flac",
      artist: "久石让",
      duration: "4:15",
    },
    {
      title: "彩云追月",
      src: "music/彩云追月.ogg",
      artist: "民乐",
      duration: "3:50",
    },
    {
      title: "雨的印记",
      src: "music/雨的印记.ogg",
      artist: "纯音乐",
      duration: "5:20",
    },
  ];

  // 在线音乐列表(精选轻音乐)
  const onlineSongs = [
    {
      title: "Morning Light",
      src: "https://www.bensound.com/bensound-music/bensound-memories.mp3",
      artist: "Bensound",
      duration: "3:50",
    },
    {
      title: "Gentle Piano",
      src: "https://www.bensound.com/bensound-music/bensound-pianomoment.mp3",
      artist: "Bensound",
      duration: "4:12",
    },
    {
      title: "Peaceful Meditation",
      src: "https://www.bensound.com/bensound-music/bensound-relaxing.mp3",
      artist: "Bensound",
      duration: "4:25",
    },
  ];

  let songs = localSongs;
  let currentSongIndex = 0;
  let isRandom = false;
  let isPlaying = false;

  // 检测网络状态并选择播放列表
  async function checkNetworkAndInitialize() {
    try {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      const response = await fetch("https://www.bensound.com", {
        method: "HEAD",
      });

      if (response.ok && (!connection || connection.downlink > 1)) {
        songs = [...localSongs, ...onlineSongs];
        updatePlaylist();
      }
    } catch (error) {
      console.log("仅使用本地音乐");
    }
    loadSong(currentSongIndex);
    updatePlayerDisplay();
  }

  // 更新播放列表显示
  function updatePlaylist() {
    const playlist = document.getElementById("playlist");
    if (playlist) {
      playlist.innerHTML = songs
        .map(
          (song, index) => `
        <div class="playlist-item ${
          index === currentSongIndex ? "active" : ""
        }" 
             data-index="${index}">
          <div class="song-info">
            <span class="song-name">${song.title}</span>
            <span class="song-artist">${song.artist}</span>
          </div>
          <span class="song-duration">${song.duration}</span>
        </div>
      `
        )
        .join("");
    }
  }

  // 修改加载歌曲函数
  function loadSong(index) {
    music.src = songs[index].src;
    songTitle.innerHTML = `
      <div class="song-info-wrapper">
        <span class="now-playing">正在播放</span>
        <span class="song-title">${songs[index].title}</span>
        <span class="song-artist">${songs[index].artist}</span>
      </div>
    `;
    updatePlayerDisplay();
  }

  // 更新播放器显示
  function updatePlayerDisplay() {
    toggleButton.innerHTML = isPlaying ? "⏸️" : "▶️";
    randomButton.classList.toggle("active", isRandom);
  }

  // 播放控制函数
  function togglePlay() {
    if (music.paused) {
      music.play();
      isPlaying = true;
    } else {
      music.pause();
      isPlaying = false;
    }
    updatePlayerDisplay();
  }

  function playNext() {
    currentSongIndex = isRandom
      ? Math.floor(Math.random() * songs.length)
      : (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) music.play();
  }

  function playPrev() {
    currentSongIndex = isRandom
      ? Math.floor(Math.random() * songs.length)
      : (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) music.play();
  }

  // 事件监听器
  toggleButton.addEventListener("click", () => {
    musicPlayer.classList.toggle("open");
    togglePlay();
  });

  nextSongButton.addEventListener("click", playNext);
  prevSongButton?.addEventListener("click", playPrev);
  randomButton?.addEventListener("click", () => {
    isRandom = !isRandom;
    updatePlayerDisplay();
  });

  volumeSlider.addEventListener("input", (e) => {
    music.volume = e.target.value;
  });

  progressBar.addEventListener("input", (e) => {
    const time = (e.target.value / 100) * music.duration;
    music.currentTime = time;
  });

  music.addEventListener("timeupdate", () => {
    if (!isNaN(music.duration)) {
      const progress = (music.currentTime / music.duration) * 100;
      progressBar.value = progress;
      document.getElementById("current-time").textContent = formatTime(
        music.currentTime
      );
      document.getElementById("duration").textContent = formatTime(
        music.duration
      );
    }
  });

  music.addEventListener("ended", playNext);
  music.addEventListener("error", () => {
    console.log("加载失败，切换下一首");
    playNext();
  });

  // 自动隐藏控制
  let hideTimeout;
  const resetHideTimeout = () => {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      if (!music.paused) {
        musicPlayer.classList.remove("open");
      }
    }, 5000);
  };

  // 格式化时间
  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // 初始化
  checkNetworkAndInitialize();
  music.volume = volumeSlider.value;
  document.addEventListener("mousemove", resetHideTimeout);
  document.addEventListener("keypress", resetHideTimeout);

  // 点击外部关闭
  document.addEventListener("click", (e) => {
    if (!musicPlayer.contains(e.target) && e.target !== toggleButton) {
      musicPlayer.classList.remove("open");
    }
  });
});
