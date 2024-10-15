document.addEventListener("DOMContentLoaded", function () {
  const musicPlayer = document.getElementById("music-player");
  const toggleButton = document.getElementById("toggle-music-player");
  const music = document.getElementById("background-music");
  const songTitle = document.getElementById("song-title");
  const volumeSlider = document.getElementById("volume-slider");
  const progressBar = document.getElementById("progress-bar");
  const nextSongButton = document.getElementById("next-song");

  const songs = [
    { title: "曾斌斌 - 冬忆", src: "music/曾斌斌 - 冬忆 (Inst_).flac" },
    {
      title: "久石让 - 天空の城ラピュタ",
      src: "music/久石让 - 天空の城ラピュタ (天空之城).flac",
    },
  ];
  let currentSongIndex = 0;

  function loadSong(index) {
    music.src = songs[index].src;
    songTitle.setAttribute("data-title", songs[index].title);
    songTitle.textContent = `当前播放: ${songs[index].title}`;
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

  music.addEventListener("timeupdate", function () {
    const progress = (music.currentTime / music.duration) * 100;
    progressBar.value = progress;
  });

  progressBar.addEventListener("input", function () {
    const seekTime = (progressBar.value / 100) * music.duration;
    music.currentTime = seekTime;
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
  resetHideTimeout();
});
