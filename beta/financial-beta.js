// Beta版金融仪表板功能 - 完全模拟数据版本

class FinancialDashboardBeta {
    constructor() {
        this.charts = {};
        this.updateInterval = null;
        this.isDataLoading = false;
        this.currentSymbol = 'BTCUSDT';
        this.currentTimeframe = '1h';

        // 移除所有API端点，完全使用模拟数据
        this.mockData = {
            cryptoPrices: {
                BTCUSDT: { price: 43250, change: 2.34 },
                ETHUSDT: { price: 2680, change: -1.25 },
                ADAUSDT: { price: 0.48, change: 3.67 },
                SOLUSDT: { price: 72, change: -2.15 },
            },
            marketCap: 1680000000000,
            marketCapChange: 1.85,
            fearGreedIndex: 62,
        };

        this.init();
    }

    async init() {
        this.showLoadingStates();
        await this.checkAuth();
        this.loadUserInfo();
        this.setupEventListeners();
        await this.loadAllData();
        this.startDataUpdates();
    }

    async checkAuth() {
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
            const usernameEl = document.getElementById('username');
            if (usernameEl) {
                usernameEl.textContent = user.username;
            }
        }
    }

    setupEventListeners() {
        // 图表控制按钮
        document.querySelectorAll('.chart-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                document
                    .querySelectorAll('.chart-btn')
                    .forEach((b) => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentTimeframe = e.target.dataset.period;
                this.updateChart();
            });
        });

        // 交易对选择
        const symbolSelect = document.getElementById('chart-symbol');
        if (symbolSelect) {
            symbolSelect.addEventListener('change', (e) => {
                this.currentSymbol = e.target.value;
                this.updateChart();
            });
        }

        // 刷新按钮
        document.querySelectorAll('.refresh-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                this.refreshAllData();
            });
        });
    }

    showLoadingStates() {
        // 显示所有加载状态
        this.updateElement('global-market-cap', '加载中...');
        this.updateElement('btc-price', '加载中...');
        this.updateElement('dxy-value', '加载中...');
        this.updateElement('vix-value', '加载中...');
    }

    async loadAllData() {
        try {
            // 并行加载所有模拟数据
            await Promise.all([
                this.loadMarketOverview(),
                this.loadCryptoData(),
                this.loadForexData(),
                this.loadMarketNews(),
                this.loadWatchlistData(),
                this.loadMarketHighlights(),
                this.updateChart(),
            ]);

            this.updateConnectionStatus(true);
            this.updateLastUpdateTime();
        } catch (error) {
            console.error('数据加载失败:', error);
            this.updateConnectionStatus(false);
        }
    }

    async loadMarketOverview() {
        // 模拟市场概览数据
        const mockMarketCap =
            this.mockData.marketCap + (Math.random() - 0.5) * 100000000000;
        const mockChange =
            this.mockData.marketCapChange + (Math.random() - 0.5) * 2;

        this.updateElement(
            'global-market-cap',
            `$${this.formatNumber(mockMarketCap)}`
        );
        this.updateElement(
            'global-market-change',
            `${mockChange >= 0 ? '+' : ''}${mockChange.toFixed(2)}%`,
            mockChange >= 0 ? 'positive' : 'negative'
        );

        // 比特币价格
        const btcData = this.mockData.cryptoPrices.BTCUSDT;
        const btcPrice = btcData.price + (Math.random() - 0.5) * 1000;
        const btcChange = btcData.change + (Math.random() - 0.5) * 2;

        this.updateElement(
            'btc-price',
            `$${Math.round(btcPrice).toLocaleString()}`
        );
        this.updateElement(
            'btc-change',
            `${btcChange >= 0 ? '+' : ''}${btcChange.toFixed(2)}%`,
            btcChange >= 0 ? 'positive' : 'negative'
        );

        // 以太坊价格
        const ethData = this.mockData.cryptoPrices.ETHUSDT;
        const ethPrice = ethData.price + (Math.random() - 0.5) * 200;
        const ethChange = ethData.change + (Math.random() - 0.5) * 2;

        this.updateElement(
            'dxy-value',
            `$${Math.round(ethPrice).toLocaleString()}`
        );
        this.updateElement(
            'dxy-change',
            `${ethChange >= 0 ? '+' : ''}${ethChange.toFixed(2)}%`,
            ethChange >= 0 ? 'positive' : 'negative'
        );

        // 恐慌贪婪指数
        const fngValue =
            this.mockData.fearGreedIndex +
            Math.floor((Math.random() - 0.5) * 20);
        const fngLabels = [
            '极度恐慌',
            '恐慌',
            '恐惧',
            '中性',
            '贪婪',
            '极度贪婪',
        ];
        const fngIndex = Math.floor(fngValue / 17);
        const fngLabel = fngLabels[Math.min(Math.max(fngIndex, 0), 5)];

        this.updateElement('vix-value', fngValue);
        this.updateElement('vix-change', fngLabel, 'neutral');
    }

    async loadCryptoData() {
        // 生成模拟加密货币数据
        const mockCryptos = [
            {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'BTC',
                current_price: 43250 + (Math.random() - 0.5) * 2000,
                price_change_percentage_24h: 2.34 + (Math.random() - 0.5) * 4,
                market_cap: 845000000000 + (Math.random() - 0.5) * 50000000000,
                total_volume: 25000000000 + (Math.random() - 0.5) * 5000000000,
                image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
            },
            {
                id: 'ethereum',
                name: 'Ethereum',
                symbol: 'ETH',
                current_price: 2680 + (Math.random() - 0.5) * 200,
                price_change_percentage_24h: -1.25 + (Math.random() - 0.5) * 3,
                market_cap: 322000000000 + (Math.random() - 0.5) * 20000000000,
                total_volume: 15000000000 + (Math.random() - 0.5) * 3000000000,
                image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
            },
            {
                id: 'tether',
                name: 'Tether',
                symbol: 'USDT',
                current_price: 1.001,
                price_change_percentage_24h: 0.02 + (Math.random() - 0.5) * 0.1,
                market_cap: 96000000000,
                total_volume: 45000000000 + (Math.random() - 0.5) * 10000000000,
                image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
            },
            {
                id: 'binancecoin',
                name: 'BNB',
                symbol: 'BNB',
                current_price: 315 + (Math.random() - 0.5) * 30,
                price_change_percentage_24h: 1.89 + (Math.random() - 0.5) * 2,
                market_cap: 47000000000 + (Math.random() - 0.5) * 5000000000,
                total_volume: 1200000000 + (Math.random() - 0.5) * 200000000,
                image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
            },
            {
                id: 'solana',
                name: 'Solana',
                symbol: 'SOL',
                current_price: 72 + (Math.random() - 0.5) * 10,
                price_change_percentage_24h: -3.45 + (Math.random() - 0.5) * 3,
                market_cap: 31000000000 + (Math.random() - 0.5) * 3000000000,
                total_volume: 2100000000 + (Math.random() - 0.5) * 400000000,
                image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
            },
        ];

        this.populateCryptoTable(mockCryptos);
        this.populateCryptoList(mockCryptos.slice(0, 4));
        this.updateMarketTicker(mockCryptos.slice(0, 3));
    }

    async loadForexData() {
        // 生成模拟外汇数据
        const mockForexData = [
            {
                pair: 'EUR/USD',
                rate: 1.0842 + (Math.random() - 0.5) * 0.02,
                change: (Math.random() - 0.5) * 0.01,
            },
            {
                pair: 'GBP/USD',
                rate: 1.2567 + (Math.random() - 0.5) * 0.03,
                change: (Math.random() - 0.5) * 0.01,
            },
            {
                pair: 'USD/JPY',
                rate: 148.92 + (Math.random() - 0.5) * 2,
                change: (Math.random() - 0.5) * 1,
            },
            {
                pair: 'USD/CHF',
                rate: 0.8934 + (Math.random() - 0.5) * 0.02,
                change: (Math.random() - 0.5) * 0.01,
            },
            {
                pair: 'USD/CAD',
                rate: 1.3689 + (Math.random() - 0.5) * 0.02,
                change: (Math.random() - 0.5) * 0.01,
            },
            {
                pair: 'AUD/USD',
                rate: 0.6523 + (Math.random() - 0.5) * 0.02,
                change: (Math.random() - 0.5) * 0.01,
            },
            {
                pair: 'NZD/USD',
                rate: 0.6089 + (Math.random() - 0.5) * 0.02,
                change: (Math.random() - 0.5) * 0.01,
            },
            {
                pair: 'USD/CNY',
                rate: 7.2456 + (Math.random() - 0.5) * 0.1,
                change: (Math.random() - 0.5) * 0.05,
            },
        ].map((item) => ({
            ...item,
            changePercent: (item.change / item.rate) * 100,
        }));

        this.populateForexTable(mockForexData);
    }

    async loadMarketNews() {
        // 生成模拟新闻数据
        const mockNews = [
            {
                title: '比特币价格突破关键阻力位，投资者信心回升',
                time: `${Math.floor(Math.random() * 30) + 1}分钟前`,
                source: '加密财经',
            },
            {
                title: '以太坊网络活跃度创新高，DeFi生态持续繁荣',
                time: `${Math.floor(Math.random() * 45) + 15}分钟前`,
                source: '区块链日报',
            },
            {
                title: '机构资金流入加密市场，总投资额达到新记录',
                time: `${Math.floor(Math.random() * 60) + 30}分钟前`,
                source: '投资快报',
            },
            {
                title: 'Solana生态项目获得重大突破，用户数量激增',
                time: `${Math.floor(Math.random() * 90) + 45}分钟前`,
                source: 'DeFi研究',
            },
            {
                title: '美联储政策预期推动金融市场波动加剧',
                time: `${Math.floor(Math.random() * 120) + 60}分钟前`,
                source: '金融时报',
            },
            {
                title: 'NFT市场复苏迹象明显，交易量环比上升',
                time: `${Math.floor(Math.random() * 150) + 90}分钟前`,
                source: 'NFT观察',
            },
            {
                title: '加密货币监管政策最新进展分析',
                time: `${Math.floor(Math.random() * 180) + 120}分钟前`,
                source: '监管动态',
            },
            {
                title: '新兴公链技术突破引发市场关注',
                time: `${Math.floor(Math.random() * 240) + 150}分钟前`,
                source: '技术前沿',
            },
        ];

        this.populateNewsList(mockNews);
    }

    async loadWatchlistData() {
        // 生成模拟关注列表数据
        const mockWatchlist = Object.entries(this.mockData.cryptoPrices).map(
            ([symbol, data]) => ({
                symbol: symbol.replace('USDT', ''),
                price: data.price + (Math.random() - 0.5) * (data.price * 0.02),
                change: data.change + (Math.random() - 0.5) * 2,
            })
        );

        this.populateWatchlist(mockWatchlist);
    }

    async loadMarketHighlights() {
        // 生成模拟市场热点数据
        const mockHighlights = [
            { name: 'Solana', rank: 5, trend: 'up' },
            { name: 'Cardano', rank: 8, trend: 'up' },
            { name: 'Polkadot', rank: 12, trend: 'down' },
            { name: 'Chainlink', rank: 15, trend: 'up' },
            { name: 'Polygon', rank: 18, trend: 'neutral' },
            { name: 'Avalanche', rank: 20, trend: 'up' },
        ];

        this.populateMarketHighlights(mockHighlights);
    }

    async updateChart() {
        const chartElement = document.getElementById('mainChart');
        const loadingElement = document.getElementById('main-chart-loading');

        if (!chartElement || !loadingElement) return;

        // 显示加载状态
        loadingElement.style.display = 'flex';
        chartElement.style.display = 'none';

        // 模拟加载延迟
        await new Promise((resolve) => setTimeout(resolve, 800));

        try {
            const chartData = this.generateMockChartData(this.currentTimeframe);

            // 销毁现有图表
            if (this.charts.main) {
                this.charts.main.destroy();
                this.charts.main = null;
            }

            // 确保canvas尺寸正确
            chartElement.width = chartElement.parentElement.clientWidth - 40; // 减去padding
            chartElement.height = 400;

            // 创建新图表
            const ctx = chartElement.getContext('2d');
            this.charts.main = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: this.currentSymbol,
                            data: chartData.prices,
                            borderColor: '#667eea',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            tension: 0.4,
                            fill: true,
                            borderWidth: 2,
                            pointRadius: 2,
                            pointHoverRadius: 6,
                            pointBackgroundColor: '#667eea',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // 重要：不保持宽高比
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    size: 12,
                                },
                                color: '#374151',
                            },
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#ffffff',
                            bodyColor: '#ffffff',
                            borderColor: '#667eea',
                            borderWidth: 1,
                            cornerRadius: 8,
                            displayColors: false,
                            callbacks: {
                                title: function (context) {
                                    return context[0].label;
                                },
                                label: function (context) {
                                    return `${
                                        context.dataset.label
                                    }: $${context.parsed.y.toLocaleString()}`;
                                },
                            },
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(0,0,0,0.1)',
                                drawBorder: false,
                            },
                            ticks: {
                                font: {
                                    size: 11,
                                },
                                color: '#6b7280',
                                callback: function (value) {
                                    return '$' + value.toLocaleString();
                                },
                            },
                        },
                        x: {
                            grid: {
                                color: 'rgba(0,0,0,0.05)',
                                drawBorder: false,
                            },
                            ticks: {
                                font: {
                                    size: 11,
                                },
                                color: '#6b7280',
                                maxTicksLimit: 8, // 限制x轴标签数量
                            },
                        },
                    },
                    elements: {
                        point: {
                            hoverBackgroundColor: '#667eea',
                        },
                    },
                    animation: {
                        duration: 750,
                        easing: 'easeInOutQuart',
                    },
                    // 强制设置canvas尺寸
                    onResize: (chart, size) => {
                        chart.canvas.style.height = '400px';
                    },
                },
            });

            // 隐藏加载状态，显示图表
            loadingElement.style.display = 'none';
            chartElement.style.display = 'block';

            // 强制设置canvas样式
            chartElement.style.maxWidth = '100%';
            chartElement.style.maxHeight = '400px';
            chartElement.style.height = '400px';
        } catch (error) {
            console.error('图表更新失败:', error);
            loadingElement.innerHTML =
                '<i class="fas fa-exclamation-triangle"></i><span>图表加载失败</span>';
        }
    }

    generateMockChartData(timeframe) {
        const limit = this.getTimeframeLimit(timeframe);
        const labels = [];
        const prices = [];

        const basePrice =
            this.mockData.cryptoPrices[this.currentSymbol]?.price || 43250;
        let currentPrice = basePrice;
        const volatility = basePrice * 0.02; // 2% 波动率

        for (let i = 0; i < limit; i++) {
            const now = new Date();
            let timestamp;

            switch (timeframe) {
                case '1h':
                    timestamp = new Date(
                        now.getTime() - (limit - 1 - i) * 60 * 60 * 1000
                    );
                    break;
                case '4h':
                    timestamp = new Date(
                        now.getTime() - (limit - 1 - i) * 4 * 60 * 60 * 1000
                    );
                    break;
                case '1d':
                    timestamp = new Date(
                        now.getTime() - (limit - 1 - i) * 24 * 60 * 60 * 1000
                    );
                    break;
                case '1w':
                    timestamp = new Date(
                        now.getTime() -
                            (limit - 1 - i) * 7 * 24 * 60 * 60 * 1000
                    );
                    break;
                default:
                    timestamp = new Date(
                        now.getTime() - (limit - 1 - i) * 60 * 60 * 1000
                    );
            }

            // 生成价格变化
            const change = (Math.random() - 0.5) * volatility;
            currentPrice += change;

            // 限制价格波动范围
            const maxPrice = basePrice * 1.1;
            const minPrice = basePrice * 0.9;
            currentPrice = Math.max(minPrice, Math.min(maxPrice, currentPrice));

            labels.push(this.formatTimeLabel(timestamp, timeframe));
            prices.push(Math.round(currentPrice * 100) / 100);
        }

        return { labels, prices };
    }

    getTimeframeLimit(timeframe) {
        switch (timeframe) {
            case '1h':
                return 24;
            case '4h':
                return 24;
            case '1d':
                return 30;
            case '1w':
                return 24;
            default:
                return 24;
        }
    }

    formatTimeLabel(timestamp, timeframe) {
        if (timeframe === '1h' || timeframe === '4h') {
            return timestamp.toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit',
            });
        } else {
            return timestamp.toLocaleDateString('zh-CN', {
                month: 'short',
                day: 'numeric',
            });
        }
    }

    populateCryptoTable(cryptos) {
        const tbody = document.getElementById('cryptoTable');
        if (!tbody) return;

        tbody.innerHTML = '';

        cryptos.forEach((crypto, index) => {
            const row = document.createElement('tr');
            const changeClass =
                crypto.price_change_percentage_24h >= 0
                    ? 'positive'
                    : 'negative';
            const changeSymbol =
                crypto.price_change_percentage_24h >= 0 ? '+' : '';

            row.innerHTML = `
                <td><strong>${index + 1}</strong></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <img src="${crypto.image}" alt="${
                crypto.name
            }" style="width: 24px; height: 24px; border-radius: 50%;" onerror="this.style.display='none'">
                        <div>
                            <div style="font-weight: 600; color: var(--dark-color);">${
                                crypto.symbol
                            }</div>
                            <div style="font-size: 0.8rem; color: #9ca3af;">${
                                crypto.name
                            }</div>
                        </div>
                    </div>
                </td>
                <td><strong>$${crypto.current_price.toLocaleString()}</strong></td>
                <td class="${changeClass}">${changeSymbol}${crypto.price_change_percentage_24h.toFixed(
                2
            )}%</td>
                <td>$${this.formatNumber(crypto.market_cap)}</td>
                <td>$${this.formatNumber(crypto.total_volume)}</td>
            `;

            tbody.appendChild(row);
        });
    }

    populateCryptoList(cryptos) {
        const container = document.getElementById('cryptoTopList');
        if (!container) return;

        container.innerHTML = '';

        cryptos.forEach((crypto) => {
            const item = document.createElement('div');
            item.className = 'crypto-item';

            const changeClass =
                crypto.price_change_percentage_24h >= 0
                    ? 'positive'
                    : 'negative';
            const changeSymbol =
                crypto.price_change_percentage_24h >= 0 ? '+' : '';

            item.innerHTML = `
                <div class="crypto-info">
                    <img src="${crypto.image}" alt="${
                crypto.name
            }" style="width: 32px; height: 32px; border-radius: 50%;" onerror="this.style.display='none'">
                    <div>
                        <div class="crypto-symbol">${crypto.symbol}</div>
                        <div class="crypto-name">${crypto.name}</div>
                    </div>
                </div>
                <div class="crypto-price">
                    <div class="crypto-value">$${crypto.current_price.toLocaleString()}</div>
                    <div class="crypto-change ${changeClass}">${changeSymbol}${crypto.price_change_percentage_24h.toFixed(
                2
            )}%</div>
                </div>
            `;

            container.appendChild(item);
        });
    }

    updateMarketTicker(cryptos) {
        const tickerContainer = document.querySelector('.market-ticker');
        if (!tickerContainer) return;

        tickerContainer.innerHTML = '';

        cryptos.forEach((crypto) => {
            const item = document.createElement('div');
            item.className = 'ticker-item';

            const changeClass =
                crypto.price_change_percentage_24h >= 0
                    ? 'positive'
                    : 'negative';
            const changeSymbol =
                crypto.price_change_percentage_24h >= 0 ? '+' : '';

            item.innerHTML = `
                <span class="ticker-name">${crypto.symbol}</span>
                <span class="ticker-value">$${crypto.current_price.toLocaleString()}</span>
                <span class="ticker-change ${changeClass}">${changeSymbol}${crypto.price_change_percentage_24h.toFixed(
                2
            )}%</span>
            `;

            tickerContainer.appendChild(item);
        });
    }

    populateForexTable(forexData) {
        const tbody = document.getElementById('forexTable');
        if (!tbody) return;

        tbody.innerHTML = '';

        forexData.forEach((item) => {
            const row = document.createElement('tr');
            const changeClass = item.change >= 0 ? 'positive' : 'negative';
            const changeSymbol = item.change >= 0 ? '+' : '';

            row.innerHTML = `
                <td><strong>${item.pair}</strong></td>
                <td>${item.rate.toFixed(4)}</td>
                <td class="${changeClass}">${changeSymbol}${item.change.toFixed(
                4
            )}</td>
                <td class="${changeClass}">${changeSymbol}${item.changePercent.toFixed(
                2
            )}%</td>
                <td>${new Date().toLocaleTimeString()}</td>
            `;

            tbody.appendChild(row);
        });
    }

    populateNewsList(news) {
        const container = document.getElementById('newsList');
        if (!container) return;

        container.innerHTML = '';

        news.forEach((newsItem) => {
            const item = document.createElement('div');
            item.className = 'news-item';

            item.innerHTML = `
                <div class="news-title">${newsItem.title}</div>
                <div class="news-meta">
                    <span class="news-time">${newsItem.time}</span>
                    <span class="news-source">${newsItem.source}</span>
                </div>
            `;

            container.appendChild(item);
        });
    }

    populateWatchlist(watchlistData) {
        const container = document.getElementById('watchlist');
        if (!container) return;

        container.innerHTML = '';

        watchlistData.forEach((item) => {
            const watchlistItem = document.createElement('div');
            watchlistItem.className = 'watchlist-item';

            const changeClass = item.change >= 0 ? 'positive' : 'negative';

            watchlistItem.innerHTML = `
                <span class="symbol">${item.symbol}</span>
                <span class="price ${changeClass}">$${item.price.toLocaleString()}</span>
            `;

            container.appendChild(watchlistItem);
        });
    }

    populateMarketHighlights(highlights) {
        const container = document.getElementById('marketHighlights');
        if (!container) return;

        container.innerHTML = '';

        highlights.forEach((coin) => {
            const item = document.createElement('div');
            item.className = 'highlight-item';

            const iconClass =
                coin.trend === 'up'
                    ? 'up'
                    : coin.trend === 'down'
                    ? 'down'
                    : 'neutral';
            const icon =
                coin.trend === 'up'
                    ? 'fa-fire'
                    : coin.trend === 'down'
                    ? 'fa-snowflake'
                    : 'fa-circle';

            item.innerHTML = `
                <div class="highlight-icon ${iconClass}">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="highlight-text">${coin.name} 趋势热门 #${coin.rank}</div>
            `;

            container.appendChild(item);
        });
    }

    startDataUpdates() {
        // 每30秒更新一次数据
        this.updateInterval = setInterval(() => {
            this.refreshAllData();
        }, 30000);
    }

    async refreshAllData() {
        console.log('刷新所有数据...');
        await this.loadAllData();
    }

    updateConnectionStatus(isConnected) {
        const statusElement = document.getElementById('connection-status');
        if (statusElement) {
            statusElement.className = isConnected
                ? 'fas fa-wifi'
                : 'fas fa-wifi-slash';
            statusElement.style.color = isConnected ? '#10b981' : '#ef4444';
        }
    }

    updateLastUpdateTime() {
        const timeElement = document.getElementById('last-update');
        if (timeElement) {
            timeElement.textContent = new Date().toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit',
            });
        }
    }

    updateElement(id, value, className = '') {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
            if (className) {
                element.className = className;
            }
        }
    }

    formatNumber(num) {
        if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
        return num.toFixed(2);
    }

    // 清理函数增强
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        // 正确销毁所有图表
        Object.values(this.charts).forEach((chart) => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });

        // 清空图表对象
        this.charts = {};
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.financialDashboard = new FinancialDashboardBeta();
});

// 页面卸载时清理 - 增强版
window.addEventListener('beforeunload', () => {
    if (window.financialDashboard) {
        window.financialDashboard.destroy();
    }
});

// 页面隐藏时暂停更新
document.addEventListener('visibilitychange', () => {
    if (window.financialDashboard) {
        if (document.hidden) {
            // 页面隐藏时停止更新
            if (window.financialDashboard.updateInterval) {
                clearInterval(window.financialDashboard.updateInterval);
            }
        } else {
            // 页面显示时恢复更新
            window.financialDashboard.startDataUpdates();
        }
    }
});

// 刷新函数
function refreshCryptoData() {
    if (window.financialDashboard) {
        window.financialDashboard.loadCryptoData();
    }
}

function refreshCryptoTable() {
    if (window.financialDashboard) {
        window.financialDashboard.loadCryptoData();
    }
}

function refreshForexTable() {
    if (window.financialDashboard) {
        window.financialDashboard.loadForexData();
    }
}
