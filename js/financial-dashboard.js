// API配置
const EXCHANGE_RATE_API = 'https://open.er-api.com/v6/latest/';
const CRYPTO_API = 'https://api.coingecko.com/api/v3/simple/price';
const METAL_API =
    'https://api.coingecko.com/api/v3/simple/price?ids=gold,silver,platinum,palladium&vs_currencies=usd&include_24hr_change=true';
const ALPHA_VANTAGE_API_KEY = 'ZB200P1KQUU9BFSD';
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';
const COMMODITY_API_URL =
    'https://www.alphavantage.co/query?function=COMMODITY_WEEKLY';

// 全局变量
window.exchangeRates = null;
window.stockData = {};

// 获取货币图标 - 添加缺失函数
function getFaIconForCurrency(currency) {
    const icons = {
        USD: 'fa-dollar-sign',
        EUR: 'fa-euro-sign',
        GBP: 'fa-pound-sign',
        JPY: 'fa-yen-sign',
        CNY: 'fa-yen-sign',
        CHF: 'fa-money-bill-wave',
        INR: 'fa-rupee-sign',
        KRW: 'fa-won-sign',
        RUB: 'fa-ruble-sign',
        TRY: 'fa-lira-sign',
        BTC: 'fa-bitcoin',
    };

    return icons[currency] || 'fa-money-bill-alt';
}

// 获取货币符号 - 添加缺失函数
function getCurrencySymbol(currency) {
    const symbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        CNY: '¥',
        CHF: 'Fr',
        CAD: 'C$',
        AUD: 'A$',
        HKD: 'HK$',
        SGD: 'S$',
        KRW: '₩',
        INR: '₹',
    };
    return symbols[currency] || '';
}

// 获取贵金属本地化名称 - 添加缺失函数
function getMetalLocalName(metal) {
    const lang = document.documentElement.lang.toLowerCase();
    if (lang === 'ja') return metal.nameJp;
    if (lang === 'it') return metal.nameIt;
    if (lang === 'zh-cn') return metal.nameZh;
    return metal.nameEn;
}

// 获取货币本地化名称 - 添加缺失函数
function getCurrencyLocalName(currency) {
    const lang = document.documentElement.lang.toLowerCase();

    const names = {
        ja: {
            USD: '米ドル',
            EUR: 'ユーロ',
            GBP: '英ポンド',
            JPY: '日本円',
            CNY: '中国元',
            CHF: 'スイスフラン',
            CAD: 'カナダドル',
            AUD: 'オーストラリアドル',
            HKD: '香港ドル',
            SGD: 'シンガポールドル',
            KRW: '韓国ウォン',
            NZD: 'ニュージーランドドル',
            MXN: 'メキシコペソ',
            INR: 'インドルピー',
            BRL: 'ブラジルレアル',
            THB: 'タイバーツ',
            MYR: 'マレーシアリンギット',
            PLN: 'ポーランドズロチ',
            SEK: 'スウェーデンクローナ',
            NOK: 'ノルウェークローネ',
        },
        it: {
            USD: 'Dollaro USA',
            EUR: 'Euro',
            GBP: 'Sterlina',
            JPY: 'Yen Giapponese',
            CNY: 'Yuan Cinese',
            CHF: 'Franco Svizzero',
            CAD: 'Dollaro Canadese',
            AUD: 'Dollaro Australiano',
            HKD: 'Dollaro di Hong Kong',
            SGD: 'Dollaro di Singapore',
            KRW: 'Won Sudcoreano',
            PLN: 'Złoty Polacco',
            SEK: 'Corona Svedese',
            NOK: 'Corona Norvegese',
        },
        'zh-cn': {
            USD: '美元',
            EUR: '欧元',
            GBP: '英镑',
            JPY: '日元',
            CNY: '人民币',
            CHF: '瑞士法郎',
            CAD: '加拿大元',
            AUD: '澳元',
            HKD: '港币',
            SGD: '新加坡元',
            KRW: '韩元',
            INR: '印度卢比',
            MXN: '墨西哥比索',
            BRL: '巴西雷亚尔',
        },
        en: {
            USD: 'US Dollar',
            EUR: 'Euro',
            GBP: 'British Pound',
            JPY: 'Japanese Yen',
            CNY: 'Chinese Yuan',
            CHF: 'Swiss Franc',
            CAD: 'Canadian Dollar',
            AUD: 'Australian Dollar',
            HKD: 'Hong Kong Dollar',
            SGD: 'Singapore Dollar',
            KRW: 'South Korean Won',
            INR: 'Indian Rupee',
            MXN: 'Mexican Peso',
            BRL: 'Brazilian Real',
        },
    };

    return names[lang]?.[currency] || names['en'][currency] || currency;
}

// 本地化加密货币名称 - 添加缺失函数
function getCryptoLocalName(name) {
    const lang = document.documentElement.lang.toLowerCase();

    const names = {
        ja: {
            Bitcoin: 'ビットコイン',
            Ethereum: 'イーサリアム',
            Ripple: 'リップル',
            Litecoin: 'ライトコイン',
        },
        it: {
            Bitcoin: 'Bitcoin',
            Ethereum: 'Ethereum',
            Ripple: 'Ripple',
            Litecoin: 'Litecoin',
        },
        'zh-cn': {
            Bitcoin: '比特币',
            Ethereum: '以太坊',
            Ripple: '瑞波币',
            Litecoin: '莱特币',
        },
    };

    return names[lang]?.[name] || name;
}

// 货币转换器功能 - 添加缺失函数
function setupEnhancedConverter() {
    const convertBtn = document.getElementById('convert-btn');
    if (!convertBtn) {
        console.warn('Convert button not found');
        return;
    }

    convertBtn.addEventListener('click', async function () {
        const amount = parseFloat(document.getElementById('amount').value);
        const fromCurrency = document.getElementById('from-currency').value;
        const toCurrency = document.getElementById('to-currency').value;
        const resultDiv = document.getElementById('conversion-result');

        if (!resultDiv) {
            console.warn('Conversion result container not found');
            return;
        }

        resultDiv.style.display = 'block';

        if (!amount || isNaN(amount)) {
            resultDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${getLocalizedString(
                'enterValidAmount'
            )}`;
            resultDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            return;
        }

        // 显示加载状态
        resultDiv.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${getLocalizedString(
            'calculating'
        )}...`;
        resultDiv.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';

        try {
            if (window.exchangeRates) {
                // 使用已获取的汇率数据
                const rates = Object.assign({}, window.exchangeRates);

                // 添加基础货币
                const baseCurrency =
                    document.documentElement.lang === 'ja'
                        ? 'JPY'
                        : document.documentElement.lang === 'it'
                        ? 'EUR'
                        : document.documentElement.lang === 'zh-cn'
                        ? 'CNY'
                        : 'USD';
                rates[baseCurrency] = 1;

                const fromRate = rates[fromCurrency];
                const toRate = rates[toCurrency];

                if (!fromRate || !toRate) {
                    throw new Error(
                        'Exchange rates not available for selected currencies'
                    );
                }

                const result = (amount / fromRate) * toRate;

                // 获取货币符号
                const toCurrencySymbol = getCurrencySymbol(toCurrency);

                resultDiv.innerHTML = `<p style="font-size: 1.3em; font-weight: bold; margin: 0;">
                        ${amount.toLocaleString()} ${fromCurrency} = 
                        <span style="color: var(--primary-color);">${toCurrencySymbol}${result.toLocaleString(
                    undefined,
                    { maximumFractionDigits: 2 }
                )} ${toCurrency}</span>
                    </p>
                    <small>${getLocalizedString('exchangerateSource')}</small>`;
            } else {
                resultDiv.innerHTML = `<i class="fas fa-hourglass-half"></i> ${getLocalizedString(
                    'ratesNotLoaded'
                )}`;
                resultDiv.style.backgroundColor = 'rgba(245, 158, 11, 0.1)';
                return;
            }

            // 根据语言设置不同的背景色
            const bgColors = {
                ja: 'rgba(37, 99, 235, 0.1)',
                it: 'rgba(14, 116, 144, 0.1)',
                en: 'rgba(22, 101, 52, 0.1)',
                'zh-cn': 'rgba(37, 99, 235, 0.1)',
            };

            resultDiv.style.backgroundColor =
                bgColors[document.documentElement.lang] || bgColors['en'];

            // 动画效果
            resultDiv.style.transform = 'scale(1.05)';
            setTimeout(() => {
                resultDiv.style.transform = 'scale(1)';
            }, 300);
        } catch (error) {
            console.error('Conversion error:', error);
            resultDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${getLocalizedString(
                'conversionError'
            )}`;
            resultDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        }
    });
}

// 获取交换率数据
async function getExchangeRates(baseCurrency) {
    try {
        const response = await fetch(`${EXCHANGE_RATE_API}${baseCurrency}`);
        const data = await response.json();

        if (data.result === 'success') {
            window.exchangeRates = data.rates;

            // 货币符号映射
            let currencySymbols = {
                USD: '$',
                EUR: '€',
                GBP: '£',
                JPY: '¥',
                CNY: '¥',
                CHF: 'Fr',
                CAD: 'C$',
                AUD: 'A$',
                HKD: 'HK$',
                SGD: 'S$',
                KRW: '₩',
                NZD: 'NZ$',
                INR: '₹',
                MXN: 'Mex$',
                BRL: 'R$',
            };

            // 要显示的货币列表，根据基础货币调整显示的币种
            let currenciesToShow = [];
            if (baseCurrency === 'USD') {
                currenciesToShow = [
                    'EUR',
                    'GBP',
                    'JPY',
                    'CNY',
                    'CAD',
                    'AUD',
                    'HKD',
                    'SGD',
                    'CHF',
                    'KRW',
                ];
            } else if (baseCurrency === 'EUR') {
                currenciesToShow = [
                    'USD',
                    'GBP',
                    'JPY',
                    'CHF',
                    'CNY',
                    'CAD',
                    'AUD',
                    'PLN',
                    'SEK',
                    'NOK',
                ];
            } else if (baseCurrency === 'JPY') {
                currenciesToShow = [
                    'USD',
                    'EUR',
                    'CNY',
                    'GBP',
                    'AUD',
                    'HKD',
                    'KRW',
                    'SGD',
                    'THB',
                    'MYR',
                ];
            } else {
                currenciesToShow = [
                    'USD',
                    'EUR',
                    'JPY',
                    'GBP',
                    'CNY',
                    'HKD',
                    'CAD',
                    'AUD',
                    'SGD',
                    'KRW',
                ];
            }

            // 创建HTML表格 - 参考中文页面的样式
            let html = '<table class="exchange-table">';
            html += `<thead><tr>
                        <th>${getLocalizedString('currency')}</th>
                        <th style="text-align:right">${getLocalizedString(
                            'rate'
                        )}</th>
                     </tr></thead><tbody>`;

            currenciesToShow.forEach((currency) => {
                if (data.rates[currency]) {
                    // 根据基础货币选择汇率显示方式
                    let rateDisplay = '';
                    if (baseCurrency === 'JPY') {
                        // 日元特殊处理
                        const rate = (1 / data.rates[currency]).toFixed(
                            currency === 'KRW' ? 5 : 2
                        );
                        rateDisplay = `¥${Number(rate).toLocaleString(
                            'ja-JP'
                        )}`;
                    } else {
                        // 其他货币按照 1基础货币=XX其他货币 显示
                        const rate = data.rates[currency].toFixed(
                            currency === 'JPY' ? 2 : 4
                        );
                        rateDisplay = `${currencySymbols[baseCurrency]}1 = ${
                            currencySymbols[currency] || ''
                        }${rate}`;
                    }

                    // 获取货币图标
                    let icon = getFaIconForCurrency(currency);

                    // 货币名称本地化
                    const currencyName = getCurrencyLocalName(currency);

                    html += `<tr>
                        <td>
                            <i class="fas ${icon}"></i>
                            <span class="currency-name">${currencyName}</span>
                            <span class="currency-code">${currency}</span>
                        </td>
                        <td class="currency-rate">${rateDisplay}</td>
                    </tr>`;
                }
            });

            html += '</tbody></table>';
            html += `<small><i class="far fa-clock"></i> ${getLocalizedString(
                'lastUpdated'
            )}: ${new Date(
                data.time_last_update_utc
            ).toLocaleString()}</small>`;
            document.getElementById('exchange-rates').innerHTML = html;

            return true;
        } else {
            throw new Error('Failed to get exchange rate data');
        }
    } catch (error) {
        document.getElementById(
            'exchange-rates'
        ).innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> ${getLocalizedString(
            'dataError'
        )}</div>`;
        console.error('Exchange rates error:', error);
        return false;
    }
}

// 获取加密货币价格
async function getCryptoPrices(currency) {
    try {
        const response = await fetch(
            `${CRYPTO_API}?ids=bitcoin,ethereum,ripple,litecoin&vs_currencies=${currency.toLowerCase()}&include_24hr_change=true`
        );
        const data = await response.json();

        let html = '<table class="exchange-table">';
        html += `<thead><tr>
                    <th>${getLocalizedString('cryptocurrency')}</th>
                    <th style="text-align:right">${getLocalizedString(
                        'price'
                    )} (${currency})</th>
                    <th style="text-align:right">${getLocalizedString(
                        '24hChange'
                    )}</th>
                 </tr></thead><tbody>`;

        const cryptos = [
            {
                id: 'bitcoin',
                icon: 'fab fa-bitcoin',
                name: 'Bitcoin',
                code: 'BTC',
            },
            {
                id: 'ethereum',
                icon: 'fab fa-ethereum',
                name: 'Ethereum',
                code: 'ETH',
            },
            { id: 'ripple', icon: 'fas fa-coins', name: 'Ripple', code: 'XRP' },
            {
                id: 'litecoin',
                icon: 'fas fa-coins',
                name: 'Litecoin',
                code: 'LTC',
            },
        ];

        const currencySymbol = getCurrencySymbol(currency);
        const currLower = currency.toLowerCase();
        const changeSuffix = `${currLower}_24h_change`;

        cryptos.forEach((crypto) => {
            if (data[crypto.id]) {
                const isPositive = data[crypto.id][changeSuffix] >= 0;
                const icon = isPositive
                    ? '<i class="fas fa-caret-up"></i>'
                    : '<i class="fas fa-caret-down"></i>';

                // 本地化加密货币名称
                const cryptoName = getCryptoLocalName(crypto.name);

                html += `<tr>
                    <td>
                        <i class="${crypto.icon}"></i>
                        <span class="currency-name">${cryptoName}</span>
                        <span class="currency-code">${crypto.code}</span>
                    </td>
                    <td class="currency-rate">${currencySymbol}${data[
                    crypto.id
                ][currLower].toLocaleString()}</td>
                    <td class="currency-rate ${
                        isPositive ? 'positive' : 'negative'
                    }">
                        ${icon} ${
                    data[crypto.id][changeSuffix]
                        ? data[crypto.id][changeSuffix].toFixed(2) + '%'
                        : 'N/A'
                }
                    </td>
                </tr>`;
            }
        });

        html += '</tbody></table>';
        document.getElementById('crypto-prices').innerHTML = html;
    } catch (error) {
        document.getElementById(
            'crypto-prices'
        ).innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> ${getLocalizedString(
            'dataError'
        )}</div>`;
        console.error('Crypto prices error:', error);
    }
}

// 获取贵金属价格 - 修正版
async function getMetalPrices() {
    try {
        const container = document.getElementById('metal-prices');
        if (!container) {
            console.warn('Metal prices container not found');
            return;
        }

        // 尝试获取实时数据
        const response = await fetch(METAL_API);
        const data = await response.json();

        // 确认数据有效
        if (!data || !data.gold || !data.gold.usd) {
            throw new Error('Invalid metal price data');
        }

        // 构建贵金属数组
        const metals = [];

        // 只添加API中实际返回的贵金属
        if (data.gold && data.gold.usd) {
            metals.push({
                id: 'gold',
                symbol: 'XAU',
                nameEn: 'Gold',
                nameJp: '金',
                nameZh: '黄金',
                nameIt: 'Oro',
                bg: 'gold-bg',
                price: data.gold.usd,
                change: data.gold.usd_24h_change || 0,
            });
        }

        if (data.silver && data.silver.usd) {
            metals.push({
                id: 'silver',
                symbol: 'XAG',
                nameEn: 'Silver',
                nameJp: '銀',
                nameZh: '白银',
                nameIt: 'Argento',
                bg: 'silver-bg',
                price: data.silver.usd,
                change: data.silver.usd_24h_change || 0,
            });
        }

        if (data.platinum && data.platinum.usd) {
            metals.push({
                id: 'platinum',
                symbol: 'XPT',
                nameEn: 'Platinum',
                nameJp: 'プラチナ',
                nameZh: '铂金',
                nameIt: 'Platino',
                bg: 'platinum-bg',
                price: data.platinum.usd,
                change: data.platinum.usd_24h_change || 0,
            });
        }

        if (data.palladium && data.palladium.usd) {
            metals.push({
                id: 'palladium',
                symbol: 'XPD',
                nameEn: 'Palladium',
                nameJp: 'パラジウム',
                nameZh: '钯金',
                nameIt: 'Palladio',
                bg: 'palladium-bg',
                price: data.palladium.usd,
                change: data.palladium.usd_24h_change || 0,
            });
        }

        // 如果没有获取到任何金属数据，抛出错误
        if (metals.length === 0) {
            throw new Error('No metal price data available');
        }

        // 生成HTML
        let html = '<div class="metals-container">';

        metals.forEach((metal) => {
            const isPositive = metal.change >= 0;
            const icon = isPositive
                ? '<i class="fas fa-caret-up"></i>'
                : '<i class="fas fa-caret-down"></i>';
            const metalNameByLang = getMetalLocalName(metal);

            html += `
            <div class="metal-price">
                <div class="metal-info">
                    <div class="metal-icon ${
                        metal.bg
                    }"><i class="fas fa-coins"></i></div>
                    <div>
                        <div class="metal-name">${metalNameByLang} <span class="metal-symbol">${
                metal.symbol
            }</span></div>
                    </div>
                </div>
                <div class="metal-price-value">
                    $${metal.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                    <span class="${
                        isPositive ? 'positive' : 'negative'
                    }" style="font-size: 0.8em; margin-left: 5px;">
                        ${icon} ${Math.abs(metal.change).toFixed(2)}%
                    </span>
                </div>
            </div>`;
        });

        html += '</div>';
        html += `<small><i class="far fa-clock"></i> ${getLocalizedString(
            'lastUpdated'
        )}: ${new Date().toLocaleString()}</small>`;

        container.innerHTML = html;
    } catch (error) {
        console.error('Metal prices error:', error);
        document.getElementById(
            'metal-prices'
        ).innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> ${getLocalizedString(
            'metalDataError'
        )}</div>`;
    }
}

// 获取股票市场数据 - 修正版
async function getStockMarketData() {
    try {
        const container = document.getElementById('stock-market');
        if (!container) {
            console.warn('Stock market container not found');
            return;
        }

        // 显示加载信息
        container.innerHTML = `<div class="loading-indicator"><i class="fas fa-sync fa-spin"></i> ${getLocalizedString(
            'loading'
        )}</div>`;

        // 获取主要指数数据
        const stockSymbols = getMainIndicesByLanguage();

        let html =
            '<table class="exchange-table"><thead><tr>' +
            `<th>${getLocalizedString('stock')}</th>` +
            `<th style="text-align:right">${getLocalizedString('price')}</th>` +
            `<th style="text-align:right">${getLocalizedString(
                'change'
            )}</th>` +
            '</tr></thead><tbody>';

        let dataLoaded = false;

        // 注意：我们使用Promise.all和延迟函数以避免API限制
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        // 对每个股票符号发起请求
        for (const stock of stockSymbols) {
            try {
                // 缓存检查
                if (
                    !window.stockData[stock.symbol] ||
                    Date.now() - window.stockData[stock.symbol].timestamp >
                        60 * 60 * 1000
                ) {
                    // 1小时缓存

                    // 添加延迟以避免API速率限制
                    await delay(1000);

                    const response = await fetch(
                        `${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
                    );
                    const data = await response.json();

                    if (
                        data['Global Quote'] &&
                        Object.keys(data['Global Quote']).length > 0
                    ) {
                        window.stockData[stock.symbol] = {
                            price: parseFloat(
                                data['Global Quote']['05. price']
                            ),
                            change: parseFloat(
                                data['Global Quote']['09. change']
                            ),
                            changePercent: data['Global Quote'][
                                '10. change percent'
                            ].replace('%', ''),
                            timestamp: Date.now(),
                        };
                        dataLoaded = true;
                    }
                } else {
                    // 使用缓存数据
                    dataLoaded = true;
                }

                // 添加到HTML（只有实际数据）
                if (window.stockData[stock.symbol]) {
                    const stockInfo = window.stockData[stock.symbol];
                    const isPositive = parseFloat(stockInfo.changePercent) >= 0;
                    const icon = isPositive
                        ? '<i class="fas fa-caret-up"></i>'
                        : '<i class="fas fa-caret-down"></i>';

                    html += `<tr>
                        <td>
                            <i class="fas fa-chart-line"></i>
                            <span class="currency-name">${stock.name}</span>
                            <span class="currency-code">${stock.symbol}</span>
                        </td>
                        <td class="currency-rate">${stockInfo.price.toLocaleString(
                            undefined,
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )}</td>
                        <td class="currency-rate ${
                            isPositive ? 'positive' : 'negative'
                        }">
                            ${icon} ${Math.abs(
                        parseFloat(stockInfo.changePercent)
                    ).toFixed(2)}%
                        </td>
                    </tr>`;
                }
            } catch (error) {
                console.error(
                    `Error fetching data for ${stock.symbol}:`,
                    error
                );
            }
        }

        html += '</tbody></table>';

        // 只有在至少成功加载一个数据时才显示更新时间
        if (dataLoaded) {
            html += `<small><i class="far fa-clock"></i> ${getLocalizedString(
                'lastUpdated'
            )}: ${new Date().toLocaleString()}</small>`;
            container.innerHTML = html;
        } else {
            container.innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> ${getLocalizedString(
                'stockDataError'
            )}</div>`;
        }
    } catch (error) {
        console.error('Error fetching stock market data:', error);
        document.getElementById(
            'stock-market'
        ).innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> ${getLocalizedString(
            'stockDataError'
        )}</div>`;
    }
}

// 获取基于语言的主要指数 - 修正版
function getMainIndicesByLanguage() {
    const lang = document.documentElement.lang.toLowerCase();

    // 根据不同语言返回相关的主要股指
    switch (lang) {
        case 'ja':
            return [
                { symbol: 'N225.T', name: '日経平均株価（日経225）' },
                { symbol: '7203.T', name: 'トヨタ自動車' },
                { symbol: '9984.T', name: 'ソフトバンクグループ' },
                { symbol: '6758.T', name: 'ソニーグループ' },
            ];
        case 'it':
            return [
                { symbol: 'FTSEMIB.MI', name: 'FTSE MIB' },
                { symbol: 'ENI.MI', name: 'Eni S.p.A.' },
                { symbol: 'ISP.MI', name: 'Intesa Sanpaolo' },
                { symbol: 'ENEL.MI', name: 'Enel S.p.A.' },
            ];
        case 'zh-cn':
            return [
                { symbol: '000001.SS', name: '上证指数' },
                { symbol: '399001.SZ', name: '深证成指' },
                { symbol: '600519.SS', name: '贵州茅台' },
                { symbol: '601318.SS', name: '中国平安' },
            ];
        default: // 英文和其他语言
            return [
                { symbol: 'SPY', name: 'S&P 500 ETF' },
                { symbol: 'QQQ', name: 'NASDAQ 100 ETF' },
                { symbol: 'DIA', name: 'Dow Jones ETF' },
                { symbol: 'IWM', name: 'Russell 2000 ETF' },
            ];
    }
}

// 获取大宗商品数据 - 新函数
async function getCommodityData() {
    try {
        const container = document.getElementById('commodity-prices');
        if (!container) {
            console.warn('Commodity prices container not found');
            return;
        }

        // 显示加载信息
        container.innerHTML = `<div class="loading-indicator"><i class="fas fa-sync fa-spin"></i> ${getLocalizedString(
            'loading'
        )}</div>`;

        // 使用Alpha Vantage尝试获取原油价格
        const response = await fetch(
            `${COMMODITY_API_URL}&symbol=WTI&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        const data = await response.json();

        // 检查数据有效性
        if (data && data.data && data.data.length > 0) {
            const currentData = data.data[0];
            const previousData = data.data[1];

            // 计算价格变化
            const currentPrice = parseFloat(currentData.value);
            const previousPrice = parseFloat(previousData.value);
            const changePercent =
                ((currentPrice - previousPrice) / previousPrice) * 100;

            // 获取本地化商品名称
            const commodityName = getLocalizedCommodityName('WTI');

            let html =
                '<table class="exchange-table"><thead><tr>' +
                `<th>${getLocalizedString('commodity')}</th>` +
                `<th style="text-align:right">${getLocalizedString(
                    'price'
                )}</th>` +
                `<th style="text-align:right">${getLocalizedString(
                    'change'
                )}</th>` +
                '</tr></thead><tbody>';

            const isPositive = changePercent >= 0;
            const icon = isPositive
                ? '<i class="fas fa-caret-up"></i>'
                : '<i class="fas fa-caret-down"></i>';

            html += `<tr>
                <td>
                    <i class="fas fa-oil-can"></i>
                    <span class="currency-name">${commodityName}</span>
                    <span class="currency-code">WTI</span>
                </td>
                <td class="currency-rate">$${currentPrice.toLocaleString(
                    undefined,
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                )}</td>
                <td class="currency-rate ${
                    isPositive ? 'positive' : 'negative'
                }">
                    ${icon} ${Math.abs(changePercent).toFixed(2)}%
                </td>
            </tr>`;

            html += '</tbody></table>';
            html += `<small><i class="far fa-clock"></i> ${getLocalizedString(
                'lastUpdated'
            )}: ${new Date(currentData.date).toLocaleDateString()}</small>`;

            container.innerHTML = html;
        } else {
            // 如果API数据失败，显示错误信息
            container.innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> ${getLocalizedString(
                'commodityDataError'
            )}</div>`;
        }
    } catch (error) {
        console.error('Error fetching commodity data:', error);
        document.getElementById(
            'commodity-prices'
        ).innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> ${getLocalizedString(
            'commodityDataError'
        )}</div>`;
    }
}

// 获取本地化商品名称
function getLocalizedCommodityName(code) {
    const lang = document.documentElement.lang.toLowerCase();

    const names = {
        ja: {
            WTI: 'WTI原油',
            BRENT: 'ブレント原油',
            NATURAL_GAS: '天然ガス',
            WHEAT: '小麦',
        },
        it: {
            WTI: 'Petrolio WTI',
            BRENT: 'Petrolio Brent',
            NATURAL_GAS: 'Gas Naturale',
            WHEAT: 'Grano',
        },
        'zh-cn': {
            WTI: 'WTI原油',
            BRENT: '布伦特原油',
            NATURAL_GAS: '天然气',
            WHEAT: '小麦',
        },
        en: {
            WTI: 'WTI Crude Oil',
            BRENT: 'Brent Crude Oil',
            NATURAL_GAS: 'Natural Gas',
            WHEAT: 'Wheat',
        },
    };

    return names[lang]?.[code] || names['en'][code] || code;
}

// 获取经济指标数据 - 简化版
function getEconomicIndicators() {
    try {
        const container = document.getElementById('economic-indicators');
        if (!container) {
            console.warn('Economic indicators container not found');
            return;
        }

        // 显示加载信息
        container.innerHTML = `<div class="loading-indicator"><i class="fas fa-sync fa-spin"></i> ${getLocalizedString(
            'loading'
        )}</div>`;

        // 获取实时数据（这里我们使用金融新闻API替代，因为它是实时的）
        fetch(
            `${ALPHA_VANTAGE_BASE_URL}?function=NEWS_SENTIMENT&tickers=FOREX:USD&apikey=${ALPHA_VANTAGE_API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                // 我们将使用新闻日期作为数据更新时间
                const latestTimestamp =
                    data.feed && data.feed[0]
                        ? new Date(data.feed[0].time_published)
                        : new Date();
                const formattedDate = latestTimestamp
                    .toISOString()
                    .split('T')[0];

                // 经济指标的简化显示（不使用假数据）
                let html = '<div class="economic-message">';
                html += `<p>${getLocalizedString('economicNote')}</p>`;
                html += '</div>';
                html += `<small><i class="far fa-info-circle"></i> ${getLocalizedString(
                    'economicDataSource'
                )}</small>`;

                container.innerHTML = html;
            })
            .catch((error) => {
                console.error('Error fetching economic data:', error);
                container.innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> ${getLocalizedString(
                    'indicatorDataError'
                )}</div>`;
            });
    } catch (error) {
        console.error('Error displaying economic indicators:', error);
        document.getElementById(
            'economic-indicators'
        ).innerHTML = `<div class="error"><i class="fas fa-exclamation-circle"></i> ${getLocalizedString(
            'indicatorDataError'
        )}</div>`;
    }
}

// 辅助函数 - 获取本地化字符串
function getLocalizedString(key) {
    const lang = document.documentElement.lang.toLowerCase();

    const strings = {
        ja: {
            currency: '通貨',
            rate: 'レート',
            lastUpdated: '最終更新',
            cryptocurrency: '暗号通貨',
            price: '価格',
            '24hChange': '24時間変動',
            dataError: 'データの取得中にエラーが発生しました。',
            metalDataError: '貴金属データの取得中にエラーが発生しました。',
            stockDataError: '株式データの取得中にエラーが発生しました。',
            commodityDataError: '商品データの取得中にエラーが発生しました。',
            indicatorDataError:
                '経済指標データの取得中にエラーが発生しました。',
            loading: '読み込み中...',
            stock: '株式',
            change: '変動',
            calculating: '計算中',
            commodity: '商品',
            enterValidAmount: '有効な金額を入力してください',
            ratesNotLoaded: '為替レートがまだ読み込まれていません',
            indicativePrices: '参考価格（実際の市場価格は変動します）',
            economicNote:
                '経済データは信頼できる公式情報源から取得されます。詳細なレポートについては、各国中央銀行や統計機関のウェブサイトをご参照ください。',
            economicDataSource: '各国中央銀行および経済指標レポート',
            asOf: '基準日',
            dataSource: 'データソース',
            alphavantageSource: 'Alpha Vantage APIによる正確なレート',
            exchangerateSource: 'Open Exchange Rates APIによるレート',
            conversionError: '換算中にエラーが発生しました。',
        },
        it: {
            currency: 'Valuta',
            rate: 'Tasso',
            lastUpdated: 'Ultimo aggiornamento',
            cryptocurrency: 'Criptovaluta',
            price: 'Prezzo',
            '24hChange': 'Variazione 24h',
            dataError:
                'Si è verificato un errore durante il recupero dei dati.',
            metalDataError:
                'Si è verificato un errore durante il recupero dei dati sui metalli preziosi.',
            stockDataError:
                'Si è verificato un errore durante il recupero dei dati azionari.',
            commodityDataError:
                'Si è verificato un errore durante il recupero dei dati delle materie prime.',
            indicatorDataError:
                'Si è verificato un errore durante il recupero degli indicatori economici.',
            loading: 'Caricamento...',
            stock: 'Azioni',
            change: 'Variazione',
            calculating: 'Calcolo in corso',
            commodity: 'Materie Prime',
            enterValidAmount: 'Inserisci un importo valido',
            ratesNotLoaded: 'I tassi di cambio non sono ancora stati caricati',
            indicativePrices:
                'Prezzi indicativi (i prezzi di mercato effettivi possono variare)',
            economicNote:
                'I dati economici vengono forniti da fonti ufficiali affidabili. Per report dettagliati, consultare i siti web delle banche centrali e degli istituti statistici nazionali.',
            economicDataSource:
                'Banche centrali e report sugli indicatori economici',
            asOf: 'Aggiornato al',
            dataSource: 'Fonte dei dati',
            alphavantageSource: 'Tassi precisi forniti da Alpha Vantage API',
            exchangerateSource: 'Tassi forniti da Open Exchange Rates API',
            conversionError:
                'Si è verificato un errore durante la conversione.',
        },
        en: {
            currency: 'Currency',
            rate: 'Rate',
            lastUpdated: 'Last updated',
            cryptocurrency: 'Cryptocurrency',
            price: 'Price',
            '24hChange': '24h Change',
            dataError: 'An error occurred while fetching data.',
            metalDataError:
                'An error occurred while fetching precious metals data.',
            stockDataError: 'An error occurred while fetching stock data.',
            commodityDataError:
                'An error occurred while fetching commodity data.',
            indicatorDataError:
                'An error occurred while fetching economic indicators.',
            loading: 'Loading...',
            stock: 'Stock',
            change: 'Change',
            calculating: 'Calculating',
            commodity: 'Commodity',
            enterValidAmount: 'Please enter a valid amount',
            ratesNotLoaded: 'Exchange rates have not been loaded yet',
            indicativePrices:
                'Indicative prices (actual market prices may vary)',
            economicNote:
                'Economic data is provided from reliable official sources. For detailed reports, please visit central bank and national statistical institute websites.',
            economicDataSource: 'Central banks and economic indicator reports',
            asOf: 'As of',
            dataSource: 'Data source',
            alphavantageSource: 'Accurate rates provided by Alpha Vantage API',
            exchangerateSource: 'Rates provided by Open Exchange Rates API',
            conversionError: 'An error occurred during conversion.',
        },
        'zh-cn': {
            currency: '货币',
            rate: '汇率',
            lastUpdated: '最后更新',
            cryptocurrency: '加密货币',
            price: '价格',
            '24hChange': '24小时变化',
            dataError: '获取数据时出错。',
            metalDataError: '获取贵金属数据时出错。',
            stockDataError: '获取股票数据时出错。',
            commodityDataError: '获取商品数据时出错。',
            indicatorDataError: '获取经济指标时出错。',
            loading: '加载中...',
            stock: '股票',
            change: '涨跌幅',
            calculating: '计算中',
            commodity: '大宗商品',
            enterValidAmount: '请输入有效金额',
            ratesNotLoaded: '汇率尚未加载',
            indicativePrices: '参考价格（实际市场价格可能有所不同）',
            economicNote:
                '经济数据来自可靠的官方来源。如需详细报告，请访问各国央行和国家统计机构网站。',
            economicDataSource: '央行和经济指标报告',
            asOf: '截至',
            dataSource: '数据来源',
            alphavantageSource: '由Alpha Vantage API提供的精确汇率',
            exchangerateSource: '由Open Exchange Rates API提供的汇率',
            conversionError: '转换过程中出错。',
        },
    };

    return strings[lang]?.[key] || strings['en'][key] || key;
}

// 初始化页面数据
function initializeDashboard() {
    // 根据页面语言设置基础货币
    const baseCurrency =
        document.documentElement.lang === 'ja'
            ? 'JPY'
            : document.documentElement.lang === 'it'
            ? 'EUR'
            : document.documentElement.lang === 'zh-cn'
            ? 'CNY'
            : 'USD';

    // 获取基本金融数据
    getExchangeRates(baseCurrency);
    getCryptoPrices(baseCurrency);
    getMetalPrices();

    // 获取股票市场数据
    if (document.getElementById('stock-market')) {
        getStockMarketData();
    }

    // 获取商品数据
    if (document.getElementById('commodity-prices')) {
        getCommodityData();
    }

    // 获取经济指标
    if (document.getElementById('economic-indicators')) {
        getEconomicIndicators();
    }

    // 使用货币转换器
    setupEnhancedConverter();
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initializeDashboard);
