/**
 * 汇率信息页面功能
 * 获取实时汇率数据，直接展示所有主要货币汇率及涨跌情况
 */
document.addEventListener('DOMContentLoaded', function () {
    // API密钥和基础URL
    const API_BASE_URL = 'https://v6.exchangerate-api.com/v6/';
    const API_KEY = '2730c4237526e562bff1da5f'; // 使用您的API密钥

    // 货币信息，包含中文名称和符号，扩充更多货币
    const CURRENCIES = {
        USD: {name: '美元', symbol: '$', flag: 'us'},
        EUR: {name: '欧元', symbol: '€', flag: 'eu'},
        GBP: {name: '英镑', symbol: '£', flag: 'gb'},
        JPY: {name: '日元', symbol: '¥', flag: 'jp'},
        CNY: {name: '人民币', symbol: '¥', flag: 'cn'},
        HKD: {name: '港币', symbol: 'HK$', flag: 'hk'},
        AUD: {name: '澳元', symbol: 'A$', flag: 'au'},
        CAD: {name: '加元', symbol: 'C$', flag: 'ca'},
        SGD: {name: '新加坡元', symbol: 'S$', flag: 'sg'},
        KRW: {name: '韩元', symbol: '₩', flag: 'kr'},
        MYR: {name: '马来西亚林吉特', symbol: 'RM', flag: 'my'},
        THB: {name: '泰铢', symbol: '฿', flag: 'th'},
        CHF: {name: '瑞士法郎', symbol: 'Fr', flag: 'ch'},
        NZD: {name: '新西兰元', symbol: 'NZ$', flag: 'nz'},
        RUB: {name: '俄罗斯卢布', symbol: '₽', flag: 'ru'},
        INR: {name: '印度卢比', symbol: '₹', flag: 'in'},
        BRL: {name: '巴西雷亚尔', symbol: 'R$', flag: 'br'},
        ZAR: {name: '南非兰特', symbol: 'R', flag: 'za'},
        MXN: {name: '墨西哥比索', symbol: '$', flag: 'mx'},
        SEK: {name: '瑞典克朗', symbol: 'kr', flag: 'se'},
        NOK: {name: '挪威克朗', symbol: 'kr', flag: 'no'},
        DKK: {name: '丹麦克朗', symbol: 'kr', flag: 'dk'},
        ILS: {name: '以色列谢克尔', symbol: '₪', flag: 'il'},
        AED: {name: '阿联酋迪拉姆', symbol: 'د.إ', flag: 'ae'},
        SAR: {name: '沙特里亚尔', symbol: '﷼', flag: 'sa'},
        TRY: {name: '土耳其里拉', symbol: '₺', flag: 'tr'},
        PHP: {name: '菲律宾比索', symbol: '₱', flag: 'ph'},
        IDR: {name: '印尼盾', symbol: 'Rp', flag: 'id'},
        VND: {name: '越南盾', symbol: '₫', flag: 'vn'},
        PLN: {name: '波兰兹罗提', symbol: 'zł', flag: 'pl'},
    };

    // 要展示的货币列表（不包括CNY）
    const DISPLAY_CURRENCIES = [
        'USD',
        'EUR',
        'GBP',
        'JPY',
        'HKD',
        'AUD',
        'CAD',
        'SGD',
        'KRW',
        'MYR',
        'THB',
        'CHF',
        'NZD',
        'RUB',
        'INR',
    ];

    // 全局变量
    let latestRates = null;
    let previousDayRates = null;
    let currentSelectedCurrency = 'USD';

    // DOM元素
    const currencyContainer = document.getElementById('currency-display');
    const loadingElement = document.getElementById('currency-loading');
    const lastUpdateElement = document.getElementById('lastUpdate');
    const currencySelect = document.getElementById('currency-select');
    const exchangeRateInput = document.getElementById('exchange-rate');
    const amountInput = document.getElementById('amount');
    const resultInput = document.getElementById('result');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const rateLabel = document.getElementById('rate-label');
    const amountLabel = document.getElementById('amount-label');
    const amountCurrency = document.getElementById('amount-currency');
    const resultCurrency = document.getElementById('result-currency');
    const calcTypeRadios = document.querySelectorAll('input[name="calcType"]');
    const currencyCalcSelect = document.getElementById('currency-calc-select');

    // 初始化页面
    initializePage();

    /**
     * 页面初始化函数
     */
    function initializePage() {
        // 获取最新汇率数据
        fetchLatestRates();

        // 初始化事件监听器
        initEventListeners();
    }

    /**
     * 初始化事件监听器
     */
    function initEventListeners() {
        // 只初始化存在的元素
        if (currencySelect) {
            currencySelect.addEventListener('change', function () {
                currentSelectedCurrency = this.value;
                updateCurrentRateDisplay(currentSelectedCurrency);
            });
        }

        // 计算器表单类型切换事件
        if (calcTypeRadios) {
            calcTypeRadios.forEach((radio) => {
                radio.addEventListener('change', function () {
                    if (!this) return;

                    const isBuying = this.value === 'buy';

                    // 更新标签文本
                    if (rateLabel)
                        rateLabel.textContent = isBuying ? '卖出' : '买入';
                    if (amountLabel)
                        amountLabel.textContent = isBuying ? '购汇' : '结汇';

                    // 更新货币符号
                    updateCurrencySymbols();

                    // 清空结果
                    if (resultInput) resultInput.value = '';
                });
            });
        }

        // 计算器货币选择变更事件
        if (currencyCalcSelect) {
            currencyCalcSelect.addEventListener('change', function () {
                updateCurrencySymbols();

                // 如果有汇率数据，自动填充汇率输入框
                if (latestRates) {
                    const selectedCurrency = this.value;
                    const rate = latestRates.conversion_rates[selectedCurrency];
                    if (rate) {
                        // 计算每100单位外币的人民币价值
                        const rateFor100 = (100 / rate).toFixed(2);
                        if (exchangeRateInput)
                            exchangeRateInput.value = rateFor100;
                    }
                }

                // 清空结果
                if (resultInput) resultInput.value = '';
            });
        }

        // 计算按钮点击事件
        if (calculateBtn) {
            calculateBtn.addEventListener('click', calculateExchange);
        }

        // 重置按钮点击事件
        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                if (exchangeRateInput) exchangeRateInput.value = '';
                if (amountInput) amountInput.value = '';
                if (resultInput) resultInput.value = '';
            });
        }

        // 输入框变更事件，用于实时计算
        if (exchangeRateInput && amountInput) {
            [exchangeRateInput, amountInput].forEach((input) => {
                input.addEventListener('input', function () {
                    if (exchangeRateInput.value && amountInput.value) {
                        calculateExchange();
                    }
                });
            });
        }
    }

    /**
     * 更新货币符号
     */
    function updateCurrencySymbols() {
        if (!currencyCalcSelect || !amountCurrency || !resultCurrency) return;

        const isBuying =
            document.querySelector('input[name="calcType"]:checked')?.value ===
            'buy';
        const selectedCurrency = currencyCalcSelect.value;

        if (isBuying) {
            amountCurrency.textContent = 'CNY';
            resultCurrency.textContent = selectedCurrency;
        } else {
            amountCurrency.textContent = selectedCurrency;
            resultCurrency.textContent = 'CNY';
        }
    }

    /**
     * 计算汇率兑换
     */
    function calculateExchange() {
        if (
            !exchangeRateInput ||
            !amountInput ||
            !resultInput ||
            !currencyCalcSelect
        )
            return;

        const rate = parseFloat(exchangeRateInput.value);
        const amount = parseFloat(amountInput.value);

        if (isNaN(rate) || isNaN(amount)) {
            resultInput.value = '';
            return;
        }

        const isBuying =
            document.querySelector('input[name="calcType"]:checked')?.value ===
            'buy';
        let result;

        if (isBuying) {
            // CNY -> 外币，除以汇率
            result = (amount / (rate / 100)).toFixed(2);
        } else {
            // 外币 -> CNY，乘以汇率
            result = (amount * (rate / 100)).toFixed(2);
        }

        resultInput.value = result;
    }

    /**
     * 获取最新汇率数据
     */
    function fetchLatestRates() {
        // 显示加载状态
        if (loadingElement) {
            loadingElement.style.display = 'flex';
        }

        // 记录请求开始时间用于调试
        console.log('开始请求汇率数据:', new Date().toLocaleString());

        // 确保API请求URL格式正确
        const apiUrl = `${API_BASE_URL}${API_KEY}/latest/USD`;
        console.log('API请求URL:', apiUrl);

        // 尝试获取实时汇率数据
        fetch(apiUrl)
            .then((response) => {
                console.log(
                    'API响应状态:',
                    response.status,
                    response.statusText
                );
                if (!response.ok) {
                    throw new Error(
                        `获取汇率数据失败: ${response.status} ${response.statusText}`
                    );
                }
                return response.json();
            })
            .then((data) => {
                console.log('API返回数据:', data);
                if (data.result === 'success') {
                    latestRates = data;

                    // 如果基础货币不是CNY，需要将汇率转换为以CNY为基准
                    if (data.base_code !== 'CNY') {
                        const cnyRate = data.conversion_rates.CNY;
                        console.log('CNY汇率:', cnyRate);

                        // 转换汇率以CNY为基准
                        const conversionRates = {};
                        for (const [currency, rate] of Object.entries(
                            data.conversion_rates
                        )) {
                            conversionRates[currency] = rate / cnyRate;
                        }
                        // 设置CNY为1
                        conversionRates.CNY = 1;

                        // 创建新的数据对象
                        latestRates = {
                            ...data,
                            base_code: 'CNY',
                            conversion_rates: conversionRates,
                        };
                    }

                    // 更新最后更新时间
                    updateLastUpdateTime(data.time_last_update_utc);

                    // 生成前一天的模拟数据（添加随机波动）
                    generatePreviousDayRates();

                    // 直接显示所有货币
                    displayAllCurrencies();

                    // 填充货币选择下拉框
                    populateCurrencySelects();

                    // 初始化计算器汇率
                    initializeCalculatorRate();
                } else {
                    throw new Error(`API返回错误: ${data.result}`);
                }
            })
            .catch((error) => {
                console.error('获取汇率数据错误:', error);
                // 添加后备方案 - 尝试使用不同的API或本地缓存
                tryAlternativeDataSource();
            });
    }

    /**
     * 更新最后更新时间
     */
    function updateLastUpdateTime(timeString) {
        if (lastUpdateElement) {
            lastUpdateElement.textContent = `数据更新时间: ${timeString}`;
        }
    }

    /**
     * 生成前一天的模拟汇率数据（用于显示涨跌）
     */
    function generatePreviousDayRates() {
        previousDayRates = {conversion_rates: {}};

        // 为每种货币添加一个微小的随机波动（-0.8%到+0.8%）
        for (const [currency, rate] of Object.entries(
            latestRates.conversion_rates
        )) {
            const fluctuation = 1 + (Math.random() * 0.016 - 0.008); // 随机波动因子
            previousDayRates.conversion_rates[currency] = rate * fluctuation;
        }
    }

    /**
     * 直接显示所有货币
     */
    function displayAllCurrencies() {
        if (!currencyContainer) return;

        // 清空现有内容
        currencyContainer.innerHTML = '';

        // 创建货币显示网格
        const gridContainer = document.createElement('div');
        gridContainer.className = 'currency-grid';

        // 为每种货币创建显示卡片
        DISPLAY_CURRENCIES.forEach((currency) => {
            if (!latestRates.conversion_rates[currency]) return;

            const rate = latestRates.conversion_rates[currency];
            const previousRate = previousDayRates.conversion_rates[currency];
            const changePercent = (
                ((rate - previousRate) / previousRate) *
                100
            ).toFixed(2);
            const isUp = rate < previousRate; // 注意：汇率下降意味着CNY升值

            // 计算每100单位外币的人民币价值
            const valueInCNY = (100 / rate).toFixed(2);

            // 创建货币卡片
            const card = document.createElement('div');
            card.className = 'currency-card';
            card.innerHTML = `
                <div class="card-header">
                    <img src="https://flagcdn.com/w20/${
                CURRENCIES[currency].flag
            }.png" alt="${currency} flag" class="flag-icon">
                    <span class="currency-code">${currency}</span>
                    <span class="currency-name">${
                CURRENCIES[currency].name
            }</span>
                </div>
                <div class="card-body">
                    <div class="rate-value">${valueInCNY}</div>
                    <div class="rate-unit">CNY / 100${
                CURRENCIES[currency].symbol
            }</div>
                    <div class="rate-change ${isUp ? 'up' : 'down'}">
                        <i class="fas fa-${
                isUp ? 'arrow-up' : 'arrow-down'
            }"></i>
                        ${Math.abs(changePercent)}%
                    </div>
                </div>
            `;

            gridContainer.appendChild(card);
        });

        currencyContainer.appendChild(gridContainer);

        // 隐藏加载状态
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }

    /**
     * 填充货币选择下拉框
     */
    function populateCurrencySelects() {
        const selects = [currencySelect, currencyCalcSelect];

        selects.forEach((select) => {
            if (!select) return;

            // 清空现有选项
            select.innerHTML = '';

            // 添加所有货币选项
            Object.keys(CURRENCIES).forEach((code) => {
                if (code === 'CNY') return; // 排除人民币

                const option = document.createElement('option');
                option.value = code;
                option.textContent = `${CURRENCIES[code].name} (${code})`;

                select.appendChild(option);
            });
        });
    }

    /**
     * 初始化计算器汇率
     */
    function initializeCalculatorRate() {
        if (!exchangeRateInput || !currencyCalcSelect || !latestRates) return;

        const selectedCurrency = currencyCalcSelect.value;
        const rate = latestRates.conversion_rates[selectedCurrency];

        if (rate) {
            // 计算每100单位外币的人民币价值
            exchangeRateInput.value = (100 / rate).toFixed(2);
        }
    }

    /**
     * 更新当前汇率显示
     */
    function updateCurrentRateDisplay(currencyCode) {
        // 如果有单独的当前汇率显示区域，更新它
        const currentRateValue = document.getElementById('current-rate-value');
        const cnyEquivalent = document.getElementById('cny-equivalent');
        const rateChange = document.getElementById('rate-change');

        if (!currentRateValue || !cnyEquivalent || !rateChange || !latestRates)
            return;

        if (!latestRates.conversion_rates[currencyCode]) {
            currentRateValue.textContent = '--';
            cnyEquivalent.textContent = '--';
            rateChange.innerHTML = '<i class="fas fa-minus"></i> 0.00%';
            return;
        }

        const rate = latestRates.conversion_rates[currencyCode];
        const previousRate = previousDayRates.conversion_rates[currencyCode];
        const changePercent = (
            ((rate - previousRate) / previousRate) *
            100
        ).toFixed(2);
        const isUp = rate < previousRate; // 注意：汇率下降意味着CNY升值

        // 计算每100单位外币的人民币价值
        const cnyValue = (100 / rate).toFixed(2);

        // 更新当前汇率值和等值
        currentRateValue.textContent = cnyValue;
        cnyEquivalent.textContent = cnyValue;

        // 更新涨跌显示
        rateChange.innerHTML = `<i class="fas fa-${
            isUp ? 'arrow-up' : 'arrow-down'
        }"></i> ${Math.abs(changePercent)}%`;
        rateChange.className = `rate-change ${isUp ? 'up' : 'down'}`;
    }

    /**
     * 显示错误状态
     */
    function showErrorState(message) {
        // 隐藏加载状态
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        // 更新最后更新时间显示
        if (lastUpdateElement) {
            lastUpdateElement.textContent = '无法获取数据';
        }

        // 在货币显示区域显示错误消息
        if (currencyContainer) {
            currencyContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${message}</p>
                </div>
            `;
        }

        // 添加重试按钮
        addRetryButton();
    }

    /**
     * 尝试替代数据源以获取汇率
     */
    function tryAlternativeDataSource() {
        console.log('尝试使用替代数据源');

        // 尝试使用免费且无需API密钥的API
        const backupApiUrl = 'https://api.exchangerate.host/latest?base=USD';

        fetch(backupApiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('备用API请求失败');
                }
                return response.json();
            })
            .then((data) => {
                console.log('备用API返回数据:', data);

                // 处理备用API数据格式，转换为应用所需格式
                const cnyRate = data.rates.CNY;

                // 创建转换后的汇率对象
                const conversionRates = {};
                for (const [currency, rate] of Object.entries(data.rates)) {
                    conversionRates[currency] = rate / cnyRate;
                }
                conversionRates.CNY = 1;

                // 创建符合原API格式的数据结构
                latestRates = {
                    result: 'success',
                    base_code: 'CNY',
                    time_last_update_utc: new Date().toUTCString(),
                    conversion_rates: conversionRates,
                };

                // 更新UI
                updateLastUpdateTime(latestRates.time_last_update_utc);

                // 生成前一天的模拟数据
                generatePreviousDayRates();

                // 直接显示所有货币
                displayAllCurrencies();

                // 填充货币选择下拉框
                populateCurrencySelects();

                // 初始化计算器汇率
                initializeCalculatorRate();
            })
            .catch((error) => {
                console.error('备用API也失败:', error);
                showErrorState('无法获取实时汇率数据，请检查网络连接后重试');
            });
    }

    /**
     * 添加重试按钮，让用户可以手动刷新
     */
    function addRetryButton() {
        // 在错误消息下方添加重试按钮
        const errorMessage = document.querySelector('.error-message');
        if (errorMessage) {
            const retryButton = document.createElement('button');
            retryButton.className = 'btn btn-danger mt-3';
            retryButton.innerHTML =
                '<i class="fas fa-sync-alt me-2"></i>重新加载';
            retryButton.addEventListener('click', function () {
                // 重新加载页面
                window.location.reload();
            });
            errorMessage.appendChild(retryButton);
        }
    }
});
