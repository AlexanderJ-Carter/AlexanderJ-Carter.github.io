document.addEventListener("DOMContentLoaded", function () {
    const musicPlayer = document.getElementById("music-player");
    const toggleButton = document.getElementById("toggle-music-player");
    const music = document.getElementById("background-music");
    const songTitle = document.getElementById("song-title");
    const volumeSlider = document.getElementById("volume-slider");
    const progressBar = document.getElementById("progress-bar");
    const nextSongButton = document.getElementById("next-song");
    const prevSongButton = document.getElementById("prev-song");
    const shuffleButton = document.getElementById("shuffle-song");
    const repeatButton = document.getElementById("repeat-song");
    const songThumbnail = document.getElementById("song-thumbnail");
    const visualizerCanvas = document.getElementById("music-visualizer");
    const currentTimeEl = document.getElementById("current-time");
    const durationEl = document.getElementById("duration");

    // 歌曲列表
    const songs = [
        {
            title: "冬忆",
            src: "../music/冬忆.flac",
            cover: "../img/music-cover-default.png",
        },
        {
            title: "天空の城",
            src: "../music/天空之城.flac",
            cover: "../img/music-cover-default.png",
        },
        {
            title: "彩云追月",
            src: "../music/彩云追月.ogg",
            cover: "../img/music-cover-default.png",
        },
        {
            title: "雨的印记",
            src: "../music/雨的印记.ogg",
            cover: "../img/music-cover-default.png",
        },
    ];

    let currentSongIndex = 0;
    let isShuffling = false;
    let repeatMode = 0; // 0: 不循环, 1: 单曲循环, 2: 列表循环
    let isPlaying = false;
    let audioContext;
    let analyser;
    let dataArray;
    let canvasCtx;

    // 修复：取消轮播鼠标悬停暂停事件，只保留播放按钮控制
    // 这样避免了进入界面就暂停的问题
    const codeCarousel = document.getElementById("codeCarousel");
    if (codeCarousel) {
        const carousel = new bootstrap.Carousel(codeCarousel, {
            interval: 5000,
        });

        // 移除可能导致问题的mouseenter/mouseleave事件监听器
        const existingListeners = codeCarousel.getEventListeners
            ? codeCarousel.getEventListeners()
            : [];

        if (existingListeners.length > 0) {
            existingListeners.forEach((listener) => {
                if (listener.type === "mouseenter" || listener.type === "mouseleave") {
                    codeCarousel.removeEventListener(listener.type, listener.listener);
                }
            });
        }
    }

    // 加载歌曲函数增强
    function loadSong(index) {
        music.src = songs[index].src;

        // 设置歌曲标题和添加加载动画
        songTitle.classList.add("loading");
        songTitle.setAttribute("data-title", songs[index].title);

        // 根据当前语言环境设置正确的前缀文本
        const isEnglish = document.documentElement.lang === "en-US";
        const prefix = isEnglish ? "Now Playing: " : "当前播放: ";
        songTitle.textContent = `${prefix}${songs[index].title}`;

        // 设置专辑封面
        if (songThumbnail) {
            // 默认封面
            const defaultCover = "img/music-cover-default.png";

            // 检查歌曲是否有封面，如果有则使用，否则使用默认封面
            const coverUrl = songs[index].cover || defaultCover;

            // 预加载封面图像，确保加载成功
            const img = new Image();
            img.onload = function () {
                songThumbnail.style.backgroundImage = `url('${coverUrl}')`;
                // 移除占位符样式
                songThumbnail.classList.remove("loading");
            };
            img.onerror = function () {
                // 封面加载失败时使用默认封面
                songThumbnail.style.backgroundImage = `url('${defaultCover}')`;
                songThumbnail.classList.remove("loading");
            };
            img.src = coverUrl;

            // 添加加载中的样式
            songThumbnail.classList.add("loading");
        }

        // 歌曲加载完成后移除加载动画
        music.addEventListener("canplay", function onCanPlay() {
            songTitle.classList.remove("loading");
            music.removeEventListener("canplay", onCanPlay);

            // 更新持续时间显示
            durationEl.textContent = formatTime(music.duration);
        });

        // 初始化音频可视化（如果支持）
        initAudioVisualizer();
    }

    // 播放下一首歌曲功能
    function playNextSong() {
        if (isShuffling) {
            // 随机模式
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * songs.length);
            } while (randomIndex === currentSongIndex && songs.length > 1);

            currentSongIndex = randomIndex;
        } else if (repeatMode === 1) {
            // 单曲循环模式 - 重新播放当前歌曲
            music.currentTime = 0;
        } else {
            // 正常播放或列表循环
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }

        loadSong(currentSongIndex);

        // 如果当前正在播放，那么加载新歌曲后继续播放
        if (isPlaying) {
            music
                .play()
                .then(() => {
                    toggleButton.classList.add("playing");
                })
                .catch((err) => console.error("自动播放失败:", err));
        }
    }

    // 播放上一首歌曲
    function playPrevSong() {
        if (isShuffling) {
            // 随机模式
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * songs.length);
            } while (randomIndex === currentSongIndex && songs.length > 1);

            currentSongIndex = randomIndex;
        } else {
            // 正常播放或循环模式
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        }

        loadSong(currentSongIndex);

        // 如果当前正在播放，那么加载新歌曲后继续播放
        if (isPlaying) {
            music
                .play()
                .then(() => {
                    toggleButton.classList.add("playing");
                })
                .catch((err) => console.error("自动播放失败:", err));
        }
    }

    // 随机播放功能
    function shuffleSongs() {
        isShuffling = !isShuffling;
        shuffleButton.classList.toggle("active", isShuffling);

        if (isShuffling) {
            shuffleButton.innerHTML = '<i class="fas fa-random"></i>';
            showToast("随机播放已开启");
        } else {
            shuffleButton.innerHTML = '<i class="fas fa-random"></i>';
            showToast("随机播放已关闭");
        }
    }

    // 循环播放功能
    function toggleRepeat() {
        repeatMode = (repeatMode + 1) % 3;

        switch (repeatMode) {
            case 0:
                repeatButton.innerHTML = '<i class="fas fa-redo"></i>';
                repeatButton.classList.remove("active");
                showToast("列表播放");
                break;
            case 1:
                repeatButton.innerHTML = '<i class="fas fa-redo-alt"></i>';
                repeatButton.classList.add("active");
                showToast("单曲循环");
                break;
            case 2:
                repeatButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
                repeatButton.classList.add("active");
                showToast("列表循环");
                break;
        }
    }

    // 初始化音频可视化器
    function initAudioVisualizer() {
        if (!visualizerCanvas) return;

        if (!audioContext) {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                const source = audioContext.createMediaElementSource(music);
                source.connect(analyser);
                analyser.connect(audioContext.destination);
                analyser.fftSize = 128;

                const bufferLength = analyser.frequencyBinCount;
                dataArray = new Uint8Array(bufferLength);

                canvasCtx = visualizerCanvas.getContext("2d");
                visualizerCanvas.width = visualizerCanvas.clientWidth;
                visualizerCanvas.height = visualizerCanvas.clientHeight;

                // 开始绘制可视化效果
                drawVisualizer();
            } catch (error) {
                console.log("音频可视化不受支持: ", error);
            }
        }
    }

    // 绘制音频可视化效果
    function drawVisualizer() {
        if (!analyser || !canvasCtx) return;

        requestAnimationFrame(drawVisualizer);

        // 只有在播放器可见时才绘制
        if (musicPlayer && musicPlayer.classList.contains("open") && isPlaying) {
            analyser.getByteFrequencyData(dataArray);

            canvasCtx.clearRect(
                0,
                0,
                visualizerCanvas.width,
                visualizerCanvas.height
            );

            const barWidth = (visualizerCanvas.width / dataArray.length) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < dataArray.length; i++) {
                barHeight = dataArray[i] / 2;

                // 创建渐变色
                const gradient = canvasCtx.createLinearGradient(
                    0,
                    0,
                    0,
                    visualizerCanvas.height
                );
                gradient.addColorStop(0, "rgba(0, 123, 255, 0.8)");
                gradient.addColorStop(1, "rgba(0, 123, 255, 0.2)");

                canvasCtx.fillStyle = gradient;
                canvasCtx.fillRect(
                    x,
                    visualizerCanvas.height - barHeight,
                    barWidth,
                    barHeight
                );

                x += barWidth + 1;
            }
        }
    }

    // 格式化时间显示，优化为一种更友好的格式
    function formatTime(seconds) {
        if (isNaN(seconds) || !isFinite(seconds)) return "0:00";

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    // 显示提示信息
    function showToast(message) {
        // 检查是否已有提示，如果有则移除
        const existingToast = document.querySelector(".music-toast");
        if (existingToast) {
            document.body.removeChild(existingToast);
        }

        const toast = document.createElement("div");
        toast.className = "music-toast";
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("show");
        }, 10);

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 2000);
    }

    // 更新进度条和时间显示
    music.addEventListener("timeupdate", function () {
        if (music.duration > 0) {
            progressBar.value = (music.currentTime / music.duration) * 100;

            // 使用优化后的格式显示时间
            currentTimeEl.textContent = formatTime(music.currentTime);
        }
    });

    // 修复：移除原有点击事件，重新绑定播放按钮事件
    if (toggleButton) {
        toggleButton.removeEventListener("click", null);
        toggleButton.addEventListener("click", function () {
            musicPlayer.classList.toggle("open");

            // 延迟执行播放/暂停操作，以确保UI先更新
            setTimeout(() => {
                if (music.paused) {
                    music
                        .play()
                        .then(() => {
                            isPlaying = true;
                            toggleButton.classList.add("playing");
                        })
                        .catch((err) => {
                            console.error("播放失败:", err);
                            isPlaying = false;
                        });
                } else {
                    music.pause();
                    isPlaying = false;
                    toggleButton.classList.remove("playing");
                }
            }, 100);
        });
    }

    // 进度条点击和拖动事件优化
    progressBar.addEventListener("input", function () {
        if (!isNaN(music.duration) && isFinite(music.duration)) {
            const seekTime = (progressBar.value / 100) * music.duration;
            // 实时更新当前时间显示
            currentTimeEl.textContent = formatTime(seekTime);
        }
    });

    progressBar.addEventListener("change", function () {
        if (!isNaN(music.duration) && isFinite(music.duration)) {
            music.currentTime = (progressBar.value / 100) * music.duration;
        }
    });

    // 音量滑块事件优化
    volumeSlider.addEventListener("input", function () {
        music.volume = volumeSlider.value;

        // 根据音量更新音量图标
        const volumeIcons = document.querySelectorAll(".volume-control i");
        if (volumeIcons.length >= 2) {
            if (music.volume === 0) {
                volumeIcons[0].className = "fas fa-volume-mute";
            } else if (music.volume < 0.5) {
                volumeIcons[0].className = "fas fa-volume-down";
            } else {
                volumeIcons[0].className = "fas fa-volume-up";
            }
        }
    });

    // 注册事件监听器
    if (shuffleButton) {
        shuffleButton.addEventListener("click", shuffleSongs);
    }

    if (repeatButton) {
        repeatButton.addEventListener("click", toggleRepeat);
    }

    if (nextSongButton) {
        nextSongButton.addEventListener("click", playNextSong);
    }

    if (prevSongButton) {
        prevSongButton.addEventListener("click", playPrevSong);
    }

    // 修改音乐结束事件
    music.addEventListener("ended", function () {
        if (repeatMode === 1) {
            // 单曲循环
            music.currentTime = 0;
            music.play().catch((err) => console.error("播放失败:", err));
        } else if (repeatMode === 2 || songs.length > 1) {
            // 列表循环或正常播放下一首
            playNextSong();
        }
    });

    // 加载初始歌曲并设置
    loadSong(currentSongIndex);

    // 自动折叠播放器
    let hideTimeout;

    function resetHideTimeout() {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            musicPlayer.classList.remove("open");
        }, 8000); // 增加到8秒，给用户更多操作时间
    }

    // 点击播放器外部区域时关闭
    document.addEventListener("click", function (e) {
        if (!musicPlayer.contains(e.target) && e.target !== toggleButton) {
            musicPlayer.classList.remove("open");
        }
    });

    // 窗口大小改变时重新调整可视化器大小
    window.addEventListener("resize", function () {
        if (visualizerCanvas && canvasCtx) {
            visualizerCanvas.width = visualizerCanvas.clientWidth;
            visualizerCanvas.height = visualizerCanvas.clientHeight;
        }
    });

    // 启动初始操作
    resetHideTimeout();
});
