// Beta功能选择页面脚本 - 增强版

class BetaDashboard {
    constructor() {
        this.particlesEnabled = true;
        this.konamiSequence = [];
        this.konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        this.funCount = parseInt(localStorage.getItem('funCount') || '0');
        this.startTime = Date.now();
        this.quotes = [
            { text: '代码如诗，程序员是诗人。', author: '程序员哲学' },
            {
                text: '任何你能想象的bug，都有人遇到过。',
                author: 'Murphy定律变种',
            },
            { text: '最好的代码是没有代码。', author: 'Jeff Atwood' },
            { text: '过早的优化是万恶之源。', author: 'Donald Knuth' },
            {
                text: '计算机科学中只有两件难事：缓存失效和命名。',
                author: 'Phil Karlton',
            },
            { text: '用代码改变世界，一行一行地。', author: '开发者信条' },
            { text: '调试代码比写代码难一倍。', author: 'Brian Kernighan' },
            { text: '简单是可靠的前提。', author: 'Edsger Dijkstra' },
            { text: '先让它工作，再让它变得优雅。', author: 'Kent Beck' },
            {
                text: '代码是写给人看的，偶尔让机器执行一下。',
                author: 'Martin Fowler',
            },
        ];
        this.currentTheme = 'default';

        // AI聊天机器人状态
        this.chatbot = {
            isVisible: false,
            messages: [],
            responses: {
                greetings: [
                    '你好！我是Beta AI助手，很高兴为您服务！😊',
                    '嗨！欢迎来到Beta测试中心！有什么我可以帮您的吗？✨',
                    '您好！我是您的智能助手，随时为您解答问题！🤖',
                ],
                help: [
                    `🤖 Beta AI助手功能指南：

🎮 功能介绍：
• 输入"功能"了解所有Beta功能
• 输入"帮助"查看详细指导

🔧 Beta工具：
• 虚拟宠物系统 - 养成可爱的数字宠物
• 天气模拟器 - 体验不同天气效果
• 音乐播放器 - 享受背景音乐
• 成就系统 - 解锁各种成就

⌨️ 快捷键：
• 按H显示隐藏快捷键
• 按P切换粒子效果
• 按T切换主题

💡 小贴士：
您可以随时和我聊天，我会尽力帮助您！`,
                ],
                features: [
                    `🚀 Beta功能中心包含以下精彩功能：

💼 财务仪表板
• 投资组合管理
• 市场数据分析
• 风险评估工具

📊 数据分析工具
• 数据可视化
• 趋势分析
• 报表生成

🤖 AI智能助手
• 智能对话
• 功能导航
• 问题解答

🧪 实验性功能
• 隐藏小游戏
• 特效展示
• 创新工具

🎮 互动功能
• 虚拟宠物系统
• 天气模拟器
• 音乐播放器
• 成就系统`,
                ],
                unknown: [
                    '抱歉，我还在学习中，这个问题有点难倒我了 😅 您可以试试：\n• 输入"帮助"查看功能指南\n• 输入"功能"了解所有特性\n• 或者问我其他问题！',
                    '我还在不断学习中！您可以问我关于Beta功能的问题，或者输入"帮助"查看我能做什么 🤔',
                    '这个问题超出了我目前的知识范围 😊 不过我可以帮您：\n• 了解Beta功能\n• 使用指导\n• 功能介绍',
                ],
            },
        };

        // FAB菜单状态
        this.fabMenu = {
            isOpen: false,
        };

        this.init();
    }

    init() {
        this.checkAuth();
        this.loadUserInfo();
        this.setupEventListeners();
        this.updateUserCount();
        this.enableSmoothScrolling();
        this.initParticles();
        this.setupKonamiCode();
        this.loadRandomQuote();
        this.initSystemStatus();
        this.setupKeyboardShortcuts();
        this.initFunCounter();
        this.checkFestiveMode();
        this.addClickEffects();
        this.initVirtualPet();
        this.initAchievements();
        this.initWeatherSimulator();
        this.initMatrixRain();
        this.initMusicPlayer();

        // 定时更新
        setInterval(() => {
            this.updateUserCount();
            this.updateSystemStatus();
        }, 60000);

        // 更频繁的系统状态更新
        setInterval(() => {
            this.updateSystemStatus();
        }, 3000);

        // 每小时更换名言
        setInterval(() => {
            this.loadRandomQuote();
        }, 3600000);

        // 检查夜猫子成就
        const hour = new Date().getHours();
        if (hour >= 23 || hour <= 5) {
            this.checkAchievement('night_owl');
        }
    }

    // 粒子背景系统
    initParticles() {
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }

        const animate = () => {
            if (!this.particlesEnabled) {
                requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width)
                    particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height)
                    particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                ctx.fill();
            });

            // 绘制连接线
            particles.forEach((particle1, i) => {
                particles.slice(i + 1).forEach((particle2) => {
                    const distance = Math.sqrt(
                        Math.pow(particle1.x - particle2.x, 2) +
                            Math.pow(particle1.y - particle2.y, 2)
                    );

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle1.x, particle1.y);
                        ctx.lineTo(particle2.x, particle2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${
                            0.1 * (1 - distance / 100)
                        })`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        // 响应窗口大小变化
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Konami代码彩蛋
    setupKonamiCode() {
        document.addEventListener('keydown', (e) => {
            this.konamiSequence.push(e.keyCode);

            if (this.konamiSequence.length > this.konamiCode.length) {
                this.konamiSequence.shift();
            }

            if (this.konamiSequence.join(',') === this.konamiCode.join(',')) {
                this.showEasterEgg();
                this.konamiSequence = [];
            }
        });
    }
    showEasterEgg() {
        const easterEgg = document.getElementById('easter-egg');
        easterEgg.style.display = 'block';
        this.createFireworks();
        this.checkAchievement('konami_master'); // 检查科纳米代码成就

        // 播放庆祝音效（如果支持）
        try {
            const audio = new Audio(
                'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwdBSuH0+7SeC4ELnDJhNHRU'
            );
            audio.play().catch(() => {}); // 忽略播放失败
        } catch (e) {}
    }

    createFireworks() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.innerHTML = '✨';
                firework.style.position = 'fixed';
                firework.style.left = Math.random() * window.innerWidth + 'px';
                firework.style.top = Math.random() * window.innerHeight + 'px';
                firework.style.fontSize = '30px';
                firework.style.pointerEvents = 'none';
                firework.style.zIndex = '10000';
                firework.style.animation =
                    'fireworkExplosion 2s ease-out forwards';

                document.body.appendChild(firework);

                setTimeout(() => {
                    firework.remove();
                }, 2000);
            }, i * 200);
        }
    }

    // 随机名言系统
    loadRandomQuote() {
        const quote =
            this.quotes[Math.floor(Math.random() * this.quotes.length)];
        const quoteElement = document.getElementById('dev-quote');
        if (quoteElement) {
            quoteElement.innerHTML = `
                <div class="quote-text">"${quote.text}"</div>
                <div class="quote-author">- ${quote.author}</div>
            `;
        }
    }

    // 系统状态模拟器
    initSystemStatus() {
        this.updateSystemStatus();
    }

    updateSystemStatus() {
        // 模拟系统数据
        const cpuUsage = Math.floor(Math.random() * 30) + 10; // 10-40%
        const memoryUsage = Math.floor(Math.random() * 2000) + 1000; // 1-3GB
        const networkLatency = Math.floor(Math.random() * 50) + 20; // 20-70ms
        const systemTemp = Math.floor(Math.random() * 15) + 45; // 45-60°C
        const commitsToday = Math.floor(Math.random() * 20) + 5; // 5-25

        const uptime = this.calculateUptime();

        // 更新DOM
        this.updateElement('cpu-usage', `${cpuUsage}%`);
        this.updateElement('memory-usage', `${memoryUsage}MB`);
        this.updateElement('network-latency', `${networkLatency}ms`);
        this.updateElement('system-temp', `${systemTemp}°C`);
        this.updateElement('uptime', uptime);
        this.updateElement('commits-today', commitsToday);
    }

    calculateUptime() {
        const now = Date.now();
        const diff = now - this.startTime;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    // 虚拟宠物系统
    initVirtualPet() {
        this.pet = {
            happiness: parseInt(localStorage.getItem('petHappiness') || '80'),
            hunger: parseInt(localStorage.getItem('petHunger') || '60'),
            sprites: ['🐱', '🐶', '🐰', '🦊', '🐼', '🐨', '🐸', '🐷'],
            currentSprite: parseInt(localStorage.getItem('petSprite') || '0'),
            lastFed: parseInt(localStorage.getItem('petLastFed') || Date.now()),
            isVisible: false,
        };

        this.updatePetStatus();
        this.updatePetSprite();

        // 宠物状态自动下降
        setInterval(() => {
            this.pet.happiness = Math.max(0, this.pet.happiness - 1);
            this.pet.hunger = Math.max(0, this.pet.hunger - 2);
            this.updatePetStatus();
            this.savePetData();
        }, 300000); // 每5分钟
    }

    toggleVirtualPet() {
        const petElement = document.getElementById('virtual-pet');
        this.pet.isVisible = !this.pet.isVisible;
        petElement.style.display = this.pet.isVisible ? 'block' : 'none';

        if (this.pet.isVisible) {
            this.showToast('🐱 虚拟宠物已出现！');
        }
    }

    feedPet() {
        if (this.pet.hunger < 100) {
            this.pet.hunger = Math.min(100, this.pet.hunger + 20);
            this.pet.happiness = Math.min(100, this.pet.happiness + 10);
            this.updatePetStatus();
            this.savePetData();
            this.showToast('🍎 宠物吃饱了！');
            this.checkAchievement('pet_feeder');
        } else {
            this.showToast('🤢 宠物已经吃饱了！');
        }
    }

    playWithPet() {
        if (this.pet.happiness < 100) {
            this.pet.happiness = Math.min(100, this.pet.happiness + 15);
            this.pet.hunger = Math.max(0, this.pet.hunger - 5);
            this.updatePetStatus();
            this.savePetData();
            this.showToast('🎾 宠物很开心！');
            this.checkAchievement('pet_player');
        } else {
            this.showToast('😴 宠物累了，需要休息！');
        }
    }

    petPet() {
        this.pet.happiness = Math.min(100, this.pet.happiness + 5);
        this.updatePetStatus();
        this.savePetData();
        this.showToast('🤗 宠物被抚摸了！');

        // 随机切换宠物外观
        if (Math.random() < 0.3) {
            this.pet.currentSprite = Math.floor(
                Math.random() * this.pet.sprites.length
            );
            this.updatePetSprite();
            this.showToast('✨ 宠物变身了！');
        }
    }

    updatePetStatus() {
        document.getElementById('happiness-value').textContent =
            this.pet.happiness;
        document.getElementById('hunger-value').textContent = this.pet.hunger;
        document.getElementById('happiness-bar').style.width =
            this.pet.happiness + '%';
        document.getElementById('hunger-bar').style.width =
            this.pet.hunger + '%';
    }

    updatePetSprite() {
        document.getElementById('pet-sprite').textContent =
            this.pet.sprites[this.pet.currentSprite];
    }

    savePetData() {
        localStorage.setItem('petHappiness', this.pet.happiness);
        localStorage.setItem('petHunger', this.pet.hunger);
        localStorage.setItem('petSprite', this.pet.currentSprite);
        localStorage.setItem('petLastFed', Date.now());
    }

    // 成就系统
    initAchievements() {
        this.achievements = {
            first_click: {
                title: '初次点击',
                desc: '第一次点击快乐按钮',
                icon: '🖱️',
                unlocked: false,
            },
            konami_master: {
                title: '秘籍大师',
                desc: '输入科纳米代码',
                icon: '🕹️',
                unlocked: false,
            },
            pet_feeder: {
                title: '宠物饲养员',
                desc: '喂食宠物10次',
                icon: '🍎',
                unlocked: false,
                progress: 0,
                target: 10,
            },
            pet_player: {
                title: '游戏伙伴',
                desc: '与宠物玩耍20次',
                icon: '🎾',
                unlocked: false,
                progress: 0,
                target: 20,
            },
            weather_master: {
                title: '天气法师',
                desc: '改变天气5次',
                icon: '🌦️',
                unlocked: false,
                progress: 0,
                target: 5,
            },
            music_lover: {
                title: '音乐爱好者',
                desc: '播放音乐30分钟',
                icon: '🎵',
                unlocked: false,
                progress: 0,
                target: 30,
            },
            night_owl: {
                title: '夜猫子',
                desc: '在深夜使用系统',
                icon: '🦉',
                unlocked: false,
            },
            explorer: {
                title: '探索者',
                desc: '尝试所有功能',
                icon: '🔍',
                unlocked: false,
            },
            persistent: {
                title: '坚持不懈',
                desc: '连续使用7天',
                icon: '💪',
                unlocked: false,
            },
            happy_clicker: {
                title: '快乐点击狂',
                desc: '点击快乐按钮100次',
                icon: '🎈',
                unlocked: false,
                progress: 0,
                target: 100,
            },
        };

        // 从localStorage加载成就数据
        const savedAchievements = localStorage.getItem('achievements');
        if (savedAchievements) {
            this.achievements = {
                ...this.achievements,
                ...JSON.parse(savedAchievements),
            };
        }
    }

    checkAchievement(achievementId, increment = 1) {
        const achievement = this.achievements[achievementId];
        if (!achievement || achievement.unlocked) return;

        if (achievement.target) {
            achievement.progress = (achievement.progress || 0) + increment;
            if (achievement.progress >= achievement.target) {
                achievement.unlocked = true;
                this.showAchievementUnlocked(achievement);
            }
        } else {
            achievement.unlocked = true;
            this.showAchievementUnlocked(achievement);
        }

        localStorage.setItem('achievements', JSON.stringify(this.achievements));
    }

    showAchievementUnlocked(achievement) {
        this.showToast(`🏆 成就解锁: ${achievement.title}!`, 'success', 3000);
        this.playAchievementSound();
    }

    toggleAchievements() {
        const panel = document.getElementById('achievements-panel');
        const isVisible = panel.style.display !== 'none';
        panel.style.display = isVisible ? 'none' : 'block';

        if (!isVisible) {
            this.renderAchievements();
        }
    }

    renderAchievements() {
        const container = document.getElementById('achievements-list');
        container.innerHTML = '';

        Object.entries(this.achievements).forEach(([id, achievement]) => {
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement-item ${
                achievement.unlocked ? 'unlocked' : ''
            }`;

            const progressText = achievement.target
                ? `${achievement.progress || 0}/${achievement.target}`
                : '';

            achievementElement.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-desc">${achievement.desc}</div>
                ${
                    progressText
                        ? `<div class="achievement-progress">${progressText}</div>`
                        : ''
                }
            `;

            container.appendChild(achievementElement);
        });

        // 更新整体进度
        const totalAchievements = Object.keys(this.achievements).length;
        const unlockedAchievements = Object.values(this.achievements).filter(
            (a) => a.unlocked
        ).length;
        const progressPercent = Math.round(
            (unlockedAchievements / totalAchievements) * 100
        );

        document.getElementById('achievement-progress').textContent =
            progressPercent;
        document.getElementById('achievement-progress-bar').style.width =
            progressPercent + '%';
    }

    // 天气模拟器
    initWeatherSimulator() {
        this.weather = {
            current: 'sunny',
            isVisible: false,
            effects: {
                sunny: { icon: '☀️', temp: 23, desc: '晴朗' },
                rainy: { icon: '🌧️', temp: 18, desc: '雨天' },
                cloudy: { icon: '☁️', temp: 20, desc: '多云' },
                snowy: { icon: '❄️', temp: -2, desc: '雪天' },
                stormy: { icon: '⛈️', temp: 15, desc: '暴风雨' },
            },
        };

        this.updateWeatherDisplay();
    }

    toggleWeatherSimulator() {
        const simulator = document.getElementById('weather-simulator');
        this.weather.isVisible = !this.weather.isVisible;
        simulator.style.display = this.weather.isVisible ? 'block' : 'none';

        if (this.weather.isVisible) {
            this.showToast('🌤️ 天气模拟器已启动！');
        }
    }

    changeWeather(weatherType) {
        this.weather.current = weatherType;
        this.updateWeatherDisplay();
        this.createWeatherEffect(weatherType);
        this.showToast(
            `🌦️ 天气已切换为${this.weather.effects[weatherType].desc}`
        );
        this.checkAchievement('weather_master');
    }

    updateWeatherDisplay() {
        const weather = this.weather.effects[this.weather.current];
        document.getElementById('weather-icon').textContent = weather.icon;
        document.getElementById('temperature').textContent =
            weather.temp + '°C';
        document.getElementById('weather-desc').textContent = weather.desc;
    }

    createWeatherEffect(weatherType) {
        const effectsContainer = document.getElementById('weather-effects');
        effectsContainer.innerHTML = '';

        switch (weatherType) {
            case 'rainy':
                this.createRainEffect(effectsContainer);
                break;
            case 'snowy':
                this.createSnowEffect(effectsContainer);
                break;
            case 'stormy':
                this.createStormEffect(effectsContainer);
                break;
        }
    }

    createRainEffect(container) {
        for (let i = 0; i < 100; i++) {
            const raindrop = document.createElement('div');
            raindrop.innerHTML = '💧';
            raindrop.style.position = 'absolute';
            raindrop.style.left = Math.random() * 100 + '%';
            raindrop.style.animationDelay = Math.random() * 2 + 's';
            raindrop.style.animation = 'rainFall 1s linear infinite';
            container.appendChild(raindrop);
        }
    }

    createSnowEffect(container) {
        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement('div');
            snowflake.innerHTML = '❄️';
            snowflake.style.position = 'absolute';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDelay = Math.random() * 3 + 's';
            snowflake.style.animation = 'snowFall 3s linear infinite';
            container.appendChild(snowflake);
        }
    }

    createStormEffect(container) {
        container.style.animation = 'lightning 0.5s infinite';
    }

    // 代码雨效果
    initMatrixRain() {
        this.matrixRain = {
            isActive: false,
            canvas: null,
            ctx: null,
            drops: [],
        };
    }

    toggleMatrixRain() {
        const canvas = document.getElementById('matrix-rain');
        this.matrixRain.isActive = !this.matrixRain.isActive;

        if (this.matrixRain.isActive) {
            canvas.style.display = 'block';
            this.startMatrixRain();
            this.showToast('🤖 代码雨效果已启动！');
        } else {
            canvas.style.display = 'none';
            this.showToast('❌ 代码雨效果已关闭！');
        }
    }

    startMatrixRain() {
        const canvas = document.getElementById('matrix-rain');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix =
            '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const drops = [];

        for (let x = 0; x < canvas.width / 20; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            if (!this.matrixRain.isActive) return;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            setTimeout(() => requestAnimationFrame(draw), 50);
        };

        draw();
    }

    // 音乐播放器
    initMusicPlayer() {
        this.musicPlayer = {
            isVisible: false,
            isPlaying: false,
            isMuted: false,
            volume: 50,
            currentTrack: 0,
            tracks: [
                { title: '代码之歌', artist: '程序员乐队' },
                { title: '算法狂想曲', artist: '数据结构组合' },
                { title: '调试蓝调', artist: 'Bug Hunter' },
                { title: '编译进行曲', artist: '编译器交响乐团' },
                { title: '递归幻想', artist: '函数式编程者' },
            ],
            playTime: 0,
        };

        this.updateTrackInfo();

        // 模拟播放时间
        setInterval(() => {
            if (this.musicPlayer.isPlaying) {
                this.musicPlayer.playTime++;
                if (this.musicPlayer.playTime >= 60) {
                    // 每分钟检查一次成就
                    this.checkAchievement('music_lover', 1);
                    this.musicPlayer.playTime = 0;
                }
            }
        }, 60000);
    }

    toggleMusicPlayer() {
        const player = document.getElementById('music-player');
        this.musicPlayer.isVisible = !this.musicPlayer.isVisible;
        player.style.display = this.musicPlayer.isVisible ? 'block' : 'none';

        if (this.musicPlayer.isVisible) {
            this.showToast('🎵 音乐播放器已打开！');
        }
    }

    toggleMusic() {
        this.musicPlayer.isPlaying = !this.musicPlayer.isPlaying;
        const button = document.getElementById('play-pause-btn');
        button.textContent = this.musicPlayer.isPlaying ? '⏸️ 暂停' : '▶️ 播放';

        if (this.musicPlayer.isPlaying) {
            this.showToast('🎵 开始播放音乐！');
        } else {
            this.showToast('⏸️ 音乐已暂停！');
        }
    }

    nextTrack() {
        this.musicPlayer.currentTrack =
            (this.musicPlayer.currentTrack + 1) %
            this.musicPlayer.tracks.length;
        this.updateTrackInfo();
        this.showToast('⏭️ 切换到下一首！');
    }

    toggleMute() {
        this.musicPlayer.isMuted = !this.musicPlayer.isMuted;
        const button = document.getElementById('mute-btn');
        button.textContent = this.musicPlayer.isMuted
            ? '🔇 取消静音'
            : '🔊 静音';

        this.showToast(this.musicPlayer.isMuted ? '🔇 已静音' : '🔊 取消静音');
    }

    setVolume(volume) {
        this.musicPlayer.volume = volume;
        this.showToast(`🔊 音量: ${volume}%`);
    }

    updateTrackInfo() {
        const track = this.musicPlayer.tracks[this.musicPlayer.currentTrack];
        document.getElementById('track-title').textContent = track.title;
        document.getElementById('track-artist').textContent = track.artist;
    }

    playAchievementSound() {
        // 播放成就解锁音效（模拟）
        console.log('🎵 Achievement unlocked sound!');
    }

    // 键盘快捷键系统
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey || e.ctrlKey || e.metaKey) return;

            switch (e.key.toLowerCase()) {
                case 'h':
                    this.toggleKeyboardShortcuts();
                    break;
                case 'p':
                    this.toggleParticles();
                    break;
                case 't':
                    this.toggleTheme();
                    break;
                case 's':
                    this.toggleSystemStatus();
                    break;
                case 'q':
                    this.loadRandomQuote();
                    break;
                case 'v':
                    this.toggleVirtualPet();
                    break;
                case 'a':
                    this.toggleAchievements();
                    break;
                case 'w':
                    this.toggleWeatherSimulator();
                    break;
                case 'm':
                    this.toggleMatrixRain();
                    break;
                case 'u':
                    this.toggleMusicPlayer();
                    break;
                case 'escape':
                    this.closeAllPanels();
                    break;
            }
        });
    }

    closeAllPanels() {
        document.getElementById('virtual-pet').style.display = 'none';
        document.getElementById('achievements-panel').style.display = 'none';
        document.getElementById('weather-simulator').style.display = 'none';
        document.getElementById('music-player').style.display = 'none';
        document.getElementById('matrix-rain').style.display = 'none';

        this.pet.isVisible = false;
        this.weather.isVisible = false;
        this.musicPlayer.isVisible = false;
        this.matrixRain.isActive = false;

        this.showToast('📱 所有面板已关闭！');
    }

    // Toast通知系统
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${
                type === 'success'
                    ? '#4CAF50'
                    : type === 'error'
                    ? '#f44336'
                    : '#2196F3'
            };
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // 添加缺失的原始方法
    checkAuth() {
        const token = localStorage.getItem('beta_token');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }
    }

    loadUserInfo() {
        const userInfo = localStorage.getItem('beta_user');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            const userInfoEl = document.getElementById('user-info');
            if (userInfoEl) {
                userInfoEl.textContent = `欢迎，${user.username}！`;
            }
        }
    }

    setupEventListeners() {
        // 模块卡片点击事件
        document.querySelectorAll('.module-card').forEach((card) => {
            const moduleBtn = card.querySelector('.module-btn');
            if (moduleBtn && !moduleBtn.disabled) {
                moduleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const moduleCard = e.target.closest('.module-card');
                    const module = moduleCard.dataset.module;
                    this.handleModuleClick(module);
                });
            }
        });
    }

    handleModuleClick(module) {
        switch (module) {
            case 'financial':
                this.showApiLimitationModal();
                break;
            case 'audio':
                window.location.href = 'audio-visualizer.html';
                break;
            case 'game':
                window.location.href = 'mini-game.html';
                break;
            case 'experimental':
                this.showExperimentalFeatures();
                break;
            default:
                console.log('未知模块:', module);
        }
    }

    showApiLimitationModal() {
        const modal = document.getElementById('api-limitation-modal');
        modal.classList.add('show');
    }

    showComingSoon(featureName) {
        this.showToast(`🚧 ${featureName}正在紧张开发中，敬请期待！`, 'info');
    }

    showExperimentalFeatures() {
        // 随机显示不同的实验性功能
        const features = [
            {
                name: '🎮 隐藏小游戏',
                action: () => window.open('mini-game.html', '_blank'),
            },
            {
                name: '🌧️ 数字雨效果',
                action: () => this.startMatrixRain(),
            },
            {
                name: '🎵 音频可视化器',
                action: () => window.open('audio-visualizer.html', '_blank'),
            },
            {
                name: '🤖 AI聊天机器人',
                action: () => this.showToast('🤖 AI聊天功能即将到来！', 'info'),
            },
            {
                name: '📊 实时数据流',
                action: () => this.startDataStream(),
            },
        ];

        const randomFeature =
            features[Math.floor(Math.random() * features.length)];

        if (confirm(`🧪 要体验 ${randomFeature.name} 吗？`)) {
            randomFeature.action();
        }
    }

    // 数字雨效果
    startMatrixRain() {
        const chars = '01';
        const container = document.getElementById('festive-container');

        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const char = document.createElement('div');
                char.className = 'matrix-char';
                char.innerHTML =
                    chars[Math.floor(Math.random() * chars.length)];
                char.style.left = Math.random() * window.innerWidth + 'px';
                char.style.animationDuration = Math.random() * 2 + 1 + 's';
                char.style.animationDelay = Math.random() * 1 + 's';
                char.style.fontSize = Math.random() * 10 + 12 + 'px';
                container.appendChild(char);

                setTimeout(() => {
                    if (char.parentNode) {
                        char.remove();
                    }
                }, 3000);
            }, i * 50);
        }

        this.showToast('🌧️ 数字雨效果已启动！', 'success');
    }

    // 数据流效果
    startDataStream() {
        const dataTypes = ['CPU: ', 'RAM: ', 'NET: ', 'DISK: ', 'TEMP: '];
        const values = () => Math.floor(Math.random() * 100);

        const streamElement = document.createElement('div');
        streamElement.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #4ecdc4;
            padding: 15px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            z-index: 10000;
            max-width: 300px;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        `;

        document.body.appendChild(streamElement);

        const updateStream = () => {
            const data = dataTypes
                .map(
                    (type) =>
                        `${type}${values()}${
                            type.includes('TEMP') ? '°C' : '%'
                        }`
                )
                .join('<br>');

            streamElement.innerHTML = `
                <div style="color: #fff; margin-bottom: 10px;">📊 实时数据流</div>
                ${data}
                <div style="margin-top: 10px; text-align: right;">
                    <button onclick="this.parentElement.parentElement.remove()" 
                            style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                        关闭
                    </button>
                </div>
            `;
        };

        updateStream();
        const interval = setInterval(updateStream, 1000);

        setTimeout(() => {
            clearInterval(interval);
            if (streamElement.parentNode) {
                streamElement.remove();
            }
        }, 30000);

        this.showToast('📊 实时数据流已启动！持续30秒', 'success');
    }

    updateUserCount() {
        // 模拟在线用户数
        const baseCount = 42;
        const variation = Math.floor(Math.random() * 20) - 10;
        const userCount = Math.max(1, baseCount + variation);

        const userCountEl = document.getElementById('user-count');
        if (userCountEl) {
            userCountEl.textContent = `${userCount} 位在线`;
        }
    }

    enableSmoothScrolling() {
        // 启用平滑滚动
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    logout() {
        localStorage.removeItem('beta_token');
        localStorage.removeItem('beta_user');
        window.location.href = 'login.html';
    }

    // 趣味计数器系统
    initFunCounter() {
        document.getElementById('fun-count').textContent = this.funCount;

        // 检查首次点击成就
        if (this.funCount === 0) {
            setTimeout(() => {
                this.showToast('💡 提示：点击快乐按钮来增加快乐值！', 'info');
            }, 5000);
        }
    }

    incrementFunCounter() {
        this.funCount++;
        document.getElementById('fun-count').textContent = this.funCount;
        localStorage.setItem('funCount', this.funCount);

        // 检查成就
        this.checkAchievement('happy_clicker');

        // 首次点击成就
        if (this.funCount === 1) {
            this.checkAchievement('first_click');
        }

        // 里程碑庆祝
        if (this.funCount % 10 === 0) {
            this.showToast(`🎉 快乐值达到 ${this.funCount}！`, 'success');
            this.createFireworks();
        }

        // 特殊里程碑
        if (this.funCount === 50) {
            this.showToast(
                '🎊 哇！你点击了50次！你真是个快乐的人！',
                'success',
                4000
            );
        } else if (this.funCount === 100) {
            this.showToast(
                '🏆 恭喜！100次点击！你已经是快乐大师了！',
                'success',
                5000
            );
        }

        // 添加点击特效
        this.createClickEffect(event);
    }

    createClickEffect(event) {
        if (!event) return;

        const effect = document.createElement('div');
        effect.className = 'click-effect';
        effect.style.left = event.clientX + 'px';
        effect.style.top = event.clientY + 'px';

        document.body.appendChild(effect);

        setTimeout(() => {
            effect.remove();
        }, 600);
    }

    // 粒子和主题切换
    toggleParticles() {
        this.particlesEnabled = !this.particlesEnabled;
        this.showToast(
            this.particlesEnabled ? '✨ 粒子效果已开启' : '❌ 粒子效果已关闭'
        );
    }

    toggleTheme() {
        const themes = ['default', 'dark', 'neon', 'retro'];
        const currentIndex = themes.indexOf(this.currentTheme);
        this.currentTheme = themes[(currentIndex + 1) % themes.length];

        // 移除旧主题类
        document.body.classList.remove(
            'theme-dark',
            'theme-neon',
            'theme-retro'
        );
        // 添加新主题类
        if (this.currentTheme !== 'default') {
            document.body.classList.add(`theme-${this.currentTheme}`);
        }

        this.showToast(`🎨 已切换到 ${this.currentTheme} 主题`);
    }

    toggleKeyboardShortcuts() {
        const hint = document.getElementById('shortcuts-hint');
        if (!hint) {
            // 创建快捷键提示
            const hintElement = document.createElement('div');
            hintElement.id = 'shortcuts-hint';
            hintElement.className = 'shortcuts-hint show';
            hintElement.innerHTML = `
                <strong>🎮 隐藏快捷键:</strong><br>
                H - 显示/隐藏提示<br>
                P - 切换粒子效果<br>
                T - 切换主题<br>
                S - 显示系统状态<br>
                Q - 随机名言<br>
                V - 虚拟宠物<br>
                A - 成就系统<br>
                W - 天气模拟<br>
                M - 代码雨<br>
                U - 音乐播放器<br>
                Esc - 关闭所有面板
            `;
            document.body.appendChild(hintElement);

            setTimeout(() => {
                hintElement.remove();
            }, 10000);
        } else {
            hint.remove();
        }
    }

    toggleSystemStatus() {
        const status = document.getElementById('system-status');
        if (status.style.display === 'none') {
            status.style.display = 'block';
            this.showToast('📊 系统状态面板已显示');
        } else {
            status.style.display = 'none';
            this.showToast('📊 系统状态面板已隐藏');
        }
    }

    // 点击效果系统
    addClickEffects() {
        document.addEventListener('click', (e) => {
            // 为所有点击添加涟漪效果
            const ripple = document.createElement('div');
            ripple.className = 'click-effect';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';

            document.body.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // 节日模式检测
    checkFestiveMode() {
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();

        // 圣诞节装饰
        if (month === 12 && day >= 20 && day <= 26) {
            this.createSnowfall();
            this.showToast('🎄 圣诞快乐！雪花装饰已启动！', 'success');
        }

        // 新年装饰
        if (month === 1 && day <= 7) {
            this.createFireworks();
            this.showToast('🎊 新年快乐！烟花庆祝已启动！', 'success');
        }

        // 万圣节装饰
        if (month === 10 && day === 31) {
            this.createHalloweenEffects();
            this.showToast('🎃 万圣节快乐！恐怖氛围已启动！', 'success');
        }
    }

    createSnowfall() {
        const container = document.getElementById('festive-container');
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const snow = document.createElement('div');
                snow.className = 'snow';
                snow.innerHTML = '❄️';
                snow.style.left = Math.random() * 100 + '%';
                snow.style.animationDuration = Math.random() * 3 + 2 + 's';
                snow.style.animationDelay = Math.random() * 2 + 's';
                container.appendChild(snow);

                setTimeout(() => {
                    if (snow.parentNode) {
                        snow.remove();
                    }
                }, 5000);
            }, i * 200);
        }
    }

    createHalloweenEffects() {
        const container = document.getElementById('festive-container');
        const spookyElements = ['🎃', '👻', '🦇', '🕷️'];

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const spooky = document.createElement('div');
                spooky.innerHTML =
                    spookyElements[
                        Math.floor(Math.random() * spookyElements.length)
                    ];
                spooky.style.position = 'fixed';
                spooky.style.left = Math.random() * 100 + '%';
                spooky.style.top = Math.random() * 100 + '%';
                spooky.style.fontSize = '30px';
                spooky.style.animation = 'spookyFloat 3s ease-in-out infinite';
                spooky.style.zIndex = '100';
                container.appendChild(spooky);

                setTimeout(() => {
                    if (spooky.parentNode) {
                        spooky.remove();
                    }
                }, 6000);
            }, i * 300);
        }
    }

    // AI聊天机器人功能
    toggleChatbot() {
        const chatbot = document.getElementById('ai-chatbot');
        this.chatbot.isVisible = !this.chatbot.isVisible;
        chatbot.style.display = this.chatbot.isVisible ? 'flex' : 'none';

        if (this.chatbot.isVisible) {
            this.showToast('🤖 AI助手已启动！', 'success');
            // 聚焦输入框
            setTimeout(() => {
                const input = document.getElementById('chatbot-input');
                if (input) input.focus();
            }, 100);
        } else {
            this.showToast('🤖 AI助手已关闭', 'info');
        }
    }

    sendChatMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();

        if (!message) return;

        // 添加用户消息
        this.addChatMessage('user', message);
        input.value = '';

        // 显示思考状态
        this.showChatThinking();

        // 模拟AI响应延迟
        setTimeout(() => {
            this.removeChatThinking();
            const response = this.generateChatResponse(message);
            this.addChatMessage('bot', response);
        }, 800 + Math.random() * 1000);
    }

    handleChatInput(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.sendChatMessage();
        }
    }

    addChatMessage(sender, message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className =
            sender === 'user' ? 'user-message' : 'bot-message';

        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content user-msg">
                    ${this.escapeHtml(message)}
                </div>
                <div class="message-avatar">👤</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    ${message.replace(/\n/g, '<br>')}
                </div>
            `;
        }

        // 添加动画效果
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        messagesContainer.appendChild(messageDiv);

        // 触发动画
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        });

        // 滚动到底部
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // 保存消息
        this.chatbot.messages.push({ sender, message, timestamp: Date.now() });
    }

    showChatThinking() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'bot-message thinking';
        thinkingDiv.id = 'chat-thinking';
        thinkingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content thinking-animation">
                <span></span><span></span><span></span>
            </div>
        `;
        messagesContainer.appendChild(thinkingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeChatThinking() {
        const thinking = document.getElementById('chat-thinking');
        if (thinking) {
            thinking.remove();
        }
    }

    generateChatResponse(message) {
        const lowerMessage = message.toLowerCase();

        // 问候语检测
        if (lowerMessage.match(/你好|hello|hi|嗨|您好/)) {
            return this.getRandomResponse(this.chatbot.responses.greetings);
        }

        // 帮助请求
        if (lowerMessage.match(/帮助|help|怎么用|指导/)) {
            return this.getRandomResponse(this.chatbot.responses.help);
        }

        // 功能介绍
        if (lowerMessage.match(/功能|特性|能做什么|有什么/)) {
            return this.getRandomResponse(this.chatbot.responses.features);
        }

        // Beta功能相关
        if (lowerMessage.includes('beta') || lowerMessage.includes('测试')) {
            return '🧪 Beta测试中心包含最新的实验性功能！您可以体验虚拟宠物、天气模拟、音乐播放器等有趣功能。点击右下角的魔法按钮可以快速访问各种工具！';
        }

        // 虚拟宠物
        if (lowerMessage.includes('宠物') || lowerMessage.includes('pet')) {
            return '🐱 虚拟宠物系统让您可以养成可爱的数字宠物！您可以喂食、玩耍、抚摸宠物，它会根据您的照料改变心情。按V键或点击FAB菜单中的宠物图标来启动！';
        }

        // 天气模拟
        if (lowerMessage.includes('天气') || lowerMessage.includes('weather')) {
            return '🌤️ 天气模拟器可以让您体验不同的天气效果！包括晴天、雨天、雪天等，每种天气都有独特的视觉效果。按W键或通过FAB菜单访问！';
        }

        // 音乐播放器
        if (lowerMessage.includes('音乐') || lowerMessage.includes('music')) {
            return '🎵 音乐播放器提供轻松的背景音乐！您可以播放、暂停、切换歌曲，还能调节音量。按U键或点击FAB菜单中的音乐图标来开始！';
        }

        // 成就系统
        if (
            lowerMessage.includes('成就') ||
            lowerMessage.includes('achievement')
        ) {
            return '🏆 成就系统记录您在Beta中心的各种里程碑！包括探索者、宠物饲养员、天气法师等。完成不同任务可以解锁成就。按A键查看您的成就进度！';
        }

        // 快捷键
        if (
            lowerMessage.includes('快捷键') ||
            lowerMessage.includes('shortcut')
        ) {
            return '⌨️ 隐藏快捷键让您快速访问功能：\nH - 显示所有快捷键\nP - 切换粒子效果\nT - 切换主题\nV - 虚拟宠物\nW - 天气模拟\nU - 音乐播放器\nA - 成就系统\n还有更多快捷键等您发现！';
        }

        // 主题
        if (lowerMessage.includes('主题') || lowerMessage.includes('theme')) {
            return '🎨 主题系统提供多种视觉风格！包括默认、暗黑、霓虹、复古等主题。按T键可以循环切换主题，每种主题都有独特的配色方案！';
        }

        // 感谢
        if (lowerMessage.match(/谢谢|感谢|thanks/)) {
            return '不客气！很高兴能帮到您！😊 如果还有其他问题，随时告诉我。您也可以尝试探索各种Beta功能，发现更多有趣的特性！';
        }

        // 再见
        if (lowerMessage.match(/再见|拜拜|bye/)) {
            return '再见！期待您下次来访！👋 记得探索更多Beta功能，祝您使用愉快！';
        }

        // 默认回复
        return this.getRandomResponse(this.chatbot.responses.unknown);
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    // FAB菜单功能
    toggleFabMenu() {
        const fabMenu = document.getElementById('fab-menu');
        const fabMain = document.querySelector('.fab-main i');

        this.fabMenu.isOpen = !this.fabMenu.isOpen;

        if (this.fabMenu.isOpen) {
            fabMenu.style.display = 'flex';
            fabMain.style.transform = 'rotate(45deg)';
            this.showToast('✨ 功能菜单已打开！', 'info');
        } else {
            fabMenu.style.display = 'none';
            fabMain.style.transform = 'rotate(0deg)';
        }
    }

    // FAB菜单项功能
    createRandomEffect() {
        const effects = [
            () => this.createFireworks(),
            () => this.startMatrixRain(),
            () => this.createSnowfall(),
            () =>
                this.createClickEffect({
                    clientX: window.innerWidth / 2,
                    clientY: window.innerHeight / 2,
                }),
        ];

        const randomEffect =
            effects[Math.floor(Math.random() * effects.length)];
        randomEffect();
        this.showToast('🎆 随机特效已启动！', 'success');
    }
}

// 全局函数供HTML调用
function closeEasterEgg() {
    document.getElementById('easter-egg').style.display = 'none';
}

function incrementFunCounter() {
    if (window.betaDashboard) {
        window.betaDashboard.incrementFunCounter();
    }
}

function closeApiModal() {
    const modal = document.getElementById('api-limitation-modal');
    modal.classList.remove('show');
}

function confirmEnterFinancial() {
    closeApiModal();
    window.location.href = 'financial-dashboard.html';
}

function logout() {
    if (window.betaDashboard) {
        window.betaDashboard.logout();
    }
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes fireworkExplosion {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(3) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    .theme-dark {
        filter: hue-rotate(180deg) invert(1);
    }

    .theme-neon {
        filter: hue-rotate(120deg) saturate(2) brightness(1.2);
    }

    .theme-retro {
        filter: sepia(100%) hue-rotate(315deg) saturate(2);
    }
`;
document.head.appendChild(style);

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new BetaDashboard();
    window.betaDashboard = window.dashboard; // 保持向后兼容

    // 显示欢迎消息
    setTimeout(() => {
        if (window.dashboard) {
            window.dashboard.showToast('🎮 按 H 查看隐藏快捷键！', 'info');
        }
    }, 2000);
});

// 页面卸载前保存状态
window.addEventListener('beforeunload', () => {
    if (window.dashboard) {
        localStorage.setItem('lastVisit', Date.now().toString());
    }
});
