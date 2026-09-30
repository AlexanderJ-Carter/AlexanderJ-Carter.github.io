/**
 * secruity.alexander.xin — 拼错主机上的仿诈骗「安全核验」页。
 * 表单只在浏览器内处理：不接收、不落库、不转发任何字段。
 * 提交前无演练标注；「遇到问题」为假帮助；提交后翻盘。
 */
const HOST = 'secruity.alexander.xin'

const PAGE = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
<meta name="robots" content="noindex,nofollow"/>
<title>账户风险提示 - 安全核验中心</title>
<style>
  :root {
    --blue: #1677ff;
    --blue-d: #0f5ed7;
    --red: #cf1322;
    --orange: #d46b08;
    --ink: #1f1f1f;
    --muted: #8c8c8c;
    --line: #f0f0f0;
    --bg: #e8ecf2;
    --sans: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "Segoe UI", sans-serif;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; min-height: 100%; background: var(--bg); color: var(--ink); font-family: var(--sans); }
  a { color: var(--blue); text-decoration: none; }
  .top {
    background: linear-gradient(105deg, #003a8c 0%, #0958d9 42%, #1677ff 78%, #4096ff 100%);
    color: #fff; padding: 0.75rem 1rem;
    display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
    box-shadow: 0 1px 0 rgba(0,0,0,0.08);
  }
  .top__brand { display: flex; align-items: center; gap: 0.6rem; min-width: 0; font-weight: 650; font-size: 0.95rem; }
  .top__logo {
    width: 2rem; height: 2rem; border-radius: 0.4rem; flex-shrink: 0;
    background: rgba(255,255,255,0.95); border: 1px solid rgba(255,255,255,0.4);
    display: grid; place-items: center; color: var(--blue);
  }
  .top__sub { font-size: 0.65rem; opacity: 0.88; font-weight: 400; letter-spacing: 0.02em; }
  .top__meta { display: flex; flex-direction: column; align-items: flex-end; gap: 0.2rem; flex-shrink: 0; }
  .secure {
    display: inline-flex; align-items: center; gap: 0.25rem;
    padding: 0.12rem 0.4rem; border-radius: 999px; background: rgba(255,255,255,0.18);
    font-size: 0.62rem; white-space: nowrap;
  }
  .crumb {
    display: flex; flex-wrap: wrap; gap: 0.35rem; padding: 0.45rem 1rem;
    background: #f0f3f8; border-bottom: 1px solid #dce3ee; font-size: 0.7rem; color: var(--muted);
  }
  .crumb span:last-child { color: #434343; font-weight: 500; }
  .banner {
    display: flex; gap: 0.55rem; align-items: flex-start;
    background: linear-gradient(180deg, #fff2f0, #fff7f6); border-bottom: 1px solid #ffccc7;
    color: #a8071a; padding: 0.7rem 1rem; font-size: 0.8rem; line-height: 1.5; margin: 0;
  }
  .banner.is-urgent { background: linear-gradient(180deg, #fff1f0, #ffccc7); animation: banner-pulse 1.6s ease-in-out infinite; }
  .banner__icon {
    flex-shrink: 0; width: 1.15rem; height: 1.15rem; margin-top: 0.1rem; border-radius: 999px;
    background: var(--red); color: #fff; display: grid; place-items: center; font-size: 0.7rem; font-weight: 700;
  }
  .wrap { max-width: 42rem; margin: 0 auto; padding: 0.85rem 0.75rem 1.5rem; display: grid; gap: 0.75rem; }
  @media (min-width: 720px) {
    .wrap { grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.15fr); align-items: start; padding: 1rem 1rem 2rem; gap: 1rem; }
  }
  .order, .card {
    background: #fff; border: 1px solid #e6ebf2; border-radius: 0.5rem; overflow: hidden;
    box-shadow: 0 1px 2px rgba(15,35,80,0.04);
  }
  .card { box-shadow: 0 1px 2px rgba(15,35,80,0.04), 0 10px 28px rgba(15,35,80,0.05); }
  .order__head { padding: 0.9rem 1rem 0.75rem; background: linear-gradient(135deg, #fff7e6, #fff); border-bottom: 1px solid var(--line); }
  .order__tag {
    margin: 0 0 0.35rem; display: inline-block; padding: 0.1rem 0.4rem; border-radius: 0.2rem;
    background: #fff1f0; color: var(--red); font-size: 0.68rem; font-weight: 600;
  }
  .order__amt { margin: 0; font-size: 1.55rem; font-weight: 700; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .order__grid { margin: 0; padding: 0.65rem 1rem 0.85rem; display: grid; gap: 0.55rem; }
  .order__grid div { display: grid; grid-template-columns: 4.5rem 1fr; gap: 0.5rem; font-size: 0.78rem; line-height: 1.45; }
  .order__grid dt { margin: 0; color: var(--muted); }
  .order__grid dd { margin: 0; color: #262626; word-break: break-all; }
  .steps {
    list-style: none; margin: 0; padding: 0.7rem 0.85rem; display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 0.25rem; border-bottom: 1px solid var(--line); background: #fafbfc;
  }
  .steps li { display: flex; align-items: center; justify-content: center; gap: 0.3rem; font-size: 0.68rem; color: var(--muted); }
  .steps li span {
    display: grid; place-items: center; width: 1.05rem; height: 1.05rem; border-radius: 999px;
    border: 1px solid #d9d9d9; background: #fff; font-size: 0.62rem; font-weight: 600;
  }
  .steps li.is-active { color: #0958d9; font-weight: 600; }
  .steps li.is-active span { border-color: var(--blue); background: var(--blue); color: #fff; }
  .card__head { padding: 1rem 1.05rem 0.85rem; border-bottom: 1px solid var(--line); }
  .card__head h1 { margin: 0 0 0.4rem; font-size: 1.12rem; font-weight: 650; letter-spacing: -0.01em; }
  .card__head p { margin: 0; font-size: 0.8rem; color: #595959; line-height: 1.55; }
  .timer-row {
    display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
    margin-top: 0.85rem; padding: 0.55rem 0.7rem;
    background: #fff7e6; border: 1px solid #ffd591; border-radius: 0.35rem;
    font-size: 0.78rem; color: var(--orange);
  }
  .timer-row.is-urgent { border-color: #ffa39e; background: #fff1f0; color: var(--red); }
  .timer { font-variant-numeric: tabular-nums; font-weight: 700; font-size: 1.05rem; color: var(--red); letter-spacing: 0.04em; }
  .timer-row.is-urgent .timer { animation: tick-blink 1s steps(1) infinite; }
  form { padding: 1rem 1.05rem 0.35rem; display: grid; gap: 0.8rem; }
  label { display: grid; gap: 0.28rem; font-size: 0.75rem; color: #595959; }
  .field {
    display: flex; align-items: center; gap: 0.4rem;
    border: 1px solid #d9d9d9; border-radius: 0.35rem; background: #fafafa;
    padding: 0 0.75rem; min-height: 2.7rem;
  }
  .field:focus-within { border-color: var(--blue); background: #fff; box-shadow: 0 0 0 2px rgba(22,119,255,0.14); }
  .field input, .field select {
    flex: 1; border: 0; background: transparent; outline: none;
    font: inherit; font-size: 0.95rem; color: var(--ink); min-width: 0;
    padding: 0.65rem 0; appearance: none;
  }
  .submit {
    margin-top: 0.2rem; border: 0; border-radius: 0.4rem;
    background: linear-gradient(180deg, #3c8cff, #1677ff 45%, #0f5ed7); color: #fff;
    font: inherit; font-size: 1rem; font-weight: 650; letter-spacing: 0.02em;
    padding: 0.82rem 1rem; cursor: pointer; box-shadow: 0 6px 16px rgba(22,119,255,0.28);
  }
  .submit:hover, .submit:focus-visible { filter: brightness(1.04); }
  .submit:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }
  .legal { margin: 0; font-size: 0.68rem; line-height: 1.5; color: #bfbfbf; text-align: center; }
  .help-link {
    display: block; text-align: center; padding: 0.55rem 1.05rem 0.85rem;
    font-size: 0.8rem; color: var(--blue); background: transparent; border: 0;
    width: 100%; cursor: pointer; font: inherit;
  }
  .tips { margin: 0; padding: 0 1.05rem 1.05rem 1.85rem; font-size: 0.7rem; color: var(--muted); line-height: 1.55; }
  .foot { padding: 0.35rem 1rem 1.4rem; text-align: center; font-size: 0.66rem; color: #a6a6a6; line-height: 1.55; }
  .reveal { padding: 1.2rem 1.1rem 1.35rem; grid-column: 1 / -1; }
  .reveal .badge {
    margin: 0 0 0.65rem; display: inline-block; padding: 0.2rem 0.55rem; border: 1px solid #e6ebf2;
    border-radius: 999px; font-size: 0.7rem; color: var(--muted);
  }
  .reveal h1 { margin: 0 0 0.55rem; font-size: 1.25rem; }
  .reveal .lede { margin: 0 0 1rem; font-size: 0.9rem; line-height: 1.55; color: #434343; }
  .leak { margin: 0 0 1.1rem; padding: 0; display: grid; gap: 0.55rem; }
  .leak div {
    display: flex; justify-content: space-between; gap: 0.75rem;
    padding-bottom: 0.45rem; border-bottom: 1px solid var(--line); font-size: 0.85rem;
  }
  .leak dt { color: var(--muted); }
  .leak dd { margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; text-align: right; }
  .lessons { margin: 0; padding: 0; list-style: none; display: grid; gap: 0.85rem; }
  .lessons h2 { margin: 0 0 0.2rem; font-size: 0.92rem; }
  .lessons p { margin: 0; font-size: 0.84rem; line-height: 1.5; color: #595959; }
  .lessons code { font-size: 0.8em; background: #f5f5f5; padding: 0.05rem 0.25rem; border-radius: 0.2rem; }
  .actions { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.15rem; }
  .actions button, .actions a {
    appearance: none; border: 1px solid #d9d9d9; background: #fff; color: var(--ink);
    font: inherit; font-size: 0.85rem; padding: 0.55rem 0.85rem; border-radius: 0.35rem;
    text-decoration: none; cursor: pointer;
  }
  .actions .primary { background: var(--blue); border-color: var(--blue); color: #fff; }
  .verify {
    position: fixed; inset: 0; z-index: 50; display: none; place-items: center;
    padding: 1rem; background: rgba(15,30,60,0.48); backdrop-filter: blur(2px);
  }
  .verify.is-open { display: grid; }
  .verify__card {
    width: min(100%, 18.5rem); padding: 1.35rem 1.2rem 1.15rem; border-radius: 0.6rem;
    background: #fff; text-align: center; box-shadow: 0 18px 40px rgba(0,0,0,0.18);
  }
  .verify__spin {
    width: 2.2rem; height: 2.2rem; margin: 0 auto 0.85rem; border-radius: 999px;
    border: 2.5px solid #e6f4ff; border-top-color: var(--blue); animation: spin 0.75s linear infinite;
  }
  .verify__title { margin: 0 0 0.3rem; font-size: 0.95rem; font-weight: 650; }
  .verify__sub { margin: 0 0 0.95rem; font-size: 0.72rem; color: var(--muted); }
  .verify__bar { height: 0.35rem; border-radius: 999px; background: #f0f0f0; overflow: hidden; }
  .verify__bar span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #69b1ff, #1677ff); width: 0; }
  .verify__pct { margin: 0.45rem 0 0; font-size: 0.72rem; color: #595959; font-variant-numeric: tabular-nums; }
  .mask {
    position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 40;
    display: none; align-items: flex-end; justify-content: center; padding: 0;
  }
  .mask.is-open { display: flex; }
  @media (min-width: 480px) {
    .mask.is-open { align-items: center; padding: 1rem; }
  }
  .sheet {
    width: 100%; max-width: 26.5rem; background: #fff; border-radius: 0.75rem 0.75rem 0 0;
    max-height: 85vh; overflow: auto; padding: 1rem 1.1rem 1.25rem;
    box-shadow: 0 -8px 32px rgba(0,0,0,0.12);
  }
  @media (min-width: 480px) { .sheet { border-radius: 0.55rem; } }
  .sheet__ticket { margin: 0 0 0.35rem; font-size: 0.68rem; color: var(--muted); font-variant-numeric: tabular-nums; }
  .sheet h2 { margin: 0 0 0.75rem; font-size: 1.05rem; }
  .sheet__list { list-style: none; margin: 0; padding: 0; }
  .sheet__list button {
    display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
    width: 100%; text-align: left; border: 0; border-bottom: 1px solid var(--line);
    background: transparent; padding: 0.9rem 0; font: inherit; font-size: 0.9rem; color: var(--ink);
    cursor: pointer;
  }
  .sheet__list button span { color: #bfbfbf; font-size: 1.1rem; }
  .sheet__list li:last-child button { border-bottom: 0; }
  .sheet__back {
    border: 0; background: transparent; color: var(--blue); font: inherit; font-size: 0.85rem;
    padding: 0; margin-bottom: 0.75rem; cursor: pointer;
  }
  .sheet__body { font-size: 0.88rem; line-height: 1.6; color: #434343; }
  .sheet__body p { margin: 0 0 0.75rem; }
  .sheet__close {
    margin-top: 1rem; width: 100%; border: 0; border-radius: 0.35rem;
    background: #f5f5f5; color: var(--ink); font: inherit; font-size: 0.9rem;
    padding: 0.7rem; cursor: pointer;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes tick-blink { 50% { opacity: 0.35; } }
  @keyframes banner-pulse { 50% { filter: saturate(1.15); } }
  @media (prefers-reduced-motion: reduce) {
    .banner.is-urgent, .timer-row.is-urgent .timer, .verify__spin { animation: none !important; }
  }
</style>
</head>
<body>
  <header class="top">
    <div class="top__brand">
      <span class="top__logo" aria-hidden>
        <svg viewBox="0 0 32 32" width="18" height="18" fill="none">
          <path d="M16 3.5 27 8v8.2c0 6.2-4.4 11.9-11 13.3C9.4 28.1 5 22.4 5 16.2V8l11-4.5Z" fill="currentColor"/>
          <path d="M11.2 16.2 14.4 19.4 21 12.8" stroke="#0958d9" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <div>
        <div>网银安全核验中心</div>
        <div class="top__sub">银联风险联防通道 · Risk Control</div>
      </div>
    </div>
    <div class="top__meta">
      <span class="secure">加密通道</span>
      <div class="top__sub">SX-8821</div>
    </div>
  </header>

  <nav class="crumb" aria-label="当前位置">
    <span>首页</span><span aria-hidden>/</span><span>风险控制</span><span aria-hidden>/</span><span>身份核验</span>
  </nav>

  <p class="banner" id="banner">
    <span class="banner__icon" aria-hidden>!</span>
    <span>系统监测到您的借记卡存在异常消费尝试。为保障资金安全，请在时限内完成身份核验，否则将临时限制快捷支付与大额转账。</span>
  </p>

  <div class="wrap" id="root">
    <aside class="order" id="order" aria-label="异常交易详情">
      <div class="order__head">
        <p class="order__tag">高风险 · 疑似盗刷</p>
        <p class="order__amt">¥2,980.00</p>
      </div>
      <dl class="order__grid">
        <div><dt>商户</dt><dd>深圳**科技有限公司（快捷支付）</dd></div>
        <div><dt>交易时间</dt><dd id="txTime">—</dd></div>
        <div><dt>支付方式</dt><dd>银联云闪付 · 异地</dd></div>
        <div><dt>发起设备</dt><dd>iPhone · 广东省深圳市 · IP 14.22.*.*</dd></div>
        <div><dt>风控单号</dt><dd id="txTicket">—</dd></div>
      </dl>
    </aside>

    <div class="card" id="lure">
      <ol class="steps" aria-label="核验进度">
        <li class="is-active"><span>1</span>身份核验</li>
        <li><span>2</span>确认解除</li>
        <li><span>3</span>恢复使用</li>
      </ol>
      <div class="card__head">
        <h1>请完成账户安全核验</h1>
        <p>检测到异地设备发起支付。请填写开户时预留信息，核验通过后即可恢复正常使用。本通道仅用于风险处置，不会扣款。</p>
        <div class="timer-row" id="timerRow">
          <span id="timerLabel">剩余处理时间</span>
          <span class="timer" id="timer">14:59</span>
        </div>
      </div>

      <form id="form" autocomplete="off">
        <label>
          持卡人姓名
          <div class="field"><input name="name" type="text" autocomplete="off" required placeholder="与银行卡一致"/></div>
        </label>
        <label>
          银行卡号
          <div class="field"><input name="card" id="card" type="text" inputmode="numeric" autocomplete="off" required placeholder="16–19 位卡号"/></div>
        </label>
        <label>
          开户行
          <div class="field">
            <select name="bank" required>
              <option value="" disabled selected>请选择开户行</option>
              <option>中国工商银行</option>
              <option>中国建设银行</option>
              <option>中国农业银行</option>
              <option>中国银行</option>
              <option>交通银行</option>
              <option>招商银行</option>
              <option>邮政储蓄银行</option>
              <option>其他商业银行</option>
            </select>
          </div>
        </label>
        <label>
          预留手机号
          <div class="field"><input name="phone" id="phone" type="tel" inputmode="numeric" autocomplete="off" required placeholder="银行预留手机号"/></div>
        </label>
        <label>
          常住地址
          <div class="field"><input name="addr" type="text" autocomplete="off" required placeholder="省市区 + 详细地址"/></div>
        </label>
        <label>
          身份证号后四位
          <div class="field"><input name="idtail" id="idtail" type="text" inputmode="numeric" autocomplete="off" required minlength="4" maxlength="4" placeholder="证件号最后四位"/></div>
        </label>
        <button class="submit" type="submit">立即验证并解除限制</button>
        <p class="legal">点击提交即表示您已阅读并同意《风险核验授权协议》。本页信息仅用于一致性校验。</p>
      </form>

      <button type="button" class="help-link" id="helpOpen">遇到问题？查看常见帮助</button>

      <ul class="tips">
        <li>请确保本人操作，勿向他人转发本页或截图中的个人信息。</li>
        <li>客服热线：400-882-0156（转 3） · 工单号 <span id="ref">—</span></li>
        <li>会话节点：CN-East-2 · 证书 CN=*.alexander-sec.ru</li>
      </ul>
    </div>
  </div>

  <p class="foot" id="footLure">
    © 网银安全核验中心 · 请使用本人借记卡操作<br/>
    连接已加密 · TLS 1.2 · <span style="opacity:.75">${HOST}</span>
  </p>

  <div class="verify" id="verify" role="status" aria-live="polite">
    <div class="verify__card">
      <div class="verify__spin" aria-hidden></div>
      <p class="verify__title">正在核验身份信息</p>
      <p class="verify__sub">连接风控节点 CN-East-2 · 请勿关闭页面</p>
      <div class="verify__bar" aria-hidden><span id="verifyBar"></span></div>
      <p class="verify__pct" id="verifyPct">0%</p>
    </div>
  </div>

  <div class="mask" id="helpMask" hidden>
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="helpTitle">
      <div id="helpHome">
        <p class="sheet__ticket" id="helpTicket">工单 —</p>
        <h2 id="helpTitle">常见问题</h2>
        <ul class="sheet__list" id="helpList">
          <li><button type="button" data-q="phone">预留手机号已停用 / 换号 <span aria-hidden>›</span></button></li>
          <li><button type="button" data-q="card">提示卡号有误 / 无法识别 <span aria-hidden>›</span></button></li>
          <li><button type="button" data-q="addr">常住地址与开户信息不一致 <span aria-hidden>›</span></button></li>
          <li><button type="button" data-q="freeze">已经提示账户冻结了吗 <span aria-hidden>›</span></button></li>
          <li><button type="button" data-q="agent">联系在线客服 <span aria-hidden>›</span></button></li>
        </ul>
        <button type="button" class="sheet__close" id="helpClose">关闭</button>
      </div>
      <div id="helpDetail" hidden>
        <button type="button" class="sheet__back" id="helpBack">← 返回列表</button>
        <h2 id="helpDetailTitle"></h2>
        <div class="sheet__body" id="helpDetailBody"></div>
        <button type="button" class="sheet__close" id="helpClose2">关闭</button>
      </div>
    </div>
  </div>

<script>
(function () {
  var HOST = ${JSON.stringify(HOST)};
  var HELP = {
    phone: {
      t: '预留手机号已停用 / 换号',
      b: '<p>请填写开户时登记的号码。若已携号转网或销号，需先在柜面更新预留信息，再返回本通道核验。</p><p>临时借用他人号码无法通过一致性校验（错误码 E-31008）。</p><p>可拨打 400-882-0156 转 3，报工单号由坐席协助登记。</p>'
    },
    card: {
      t: '卡号无法识别',
      b: '<p>请核对是否输入完整卡号，不要输入存折账号。</p><p>信用卡、外币卡暂不支持本通道；借记卡若为新换卡，请以卡面最新卡号为准。</p><p>系统错误码 E-22014 表示 BIN 校验未通过，可换一张一类户借记卡重试。</p>'
    },
    addr: {
      t: '常住地址不一致',
      b: '<p>请按开户申请书上的常住地址填写，精确到门牌号。仅填省市区可能导致复核失败（错误码 E-41022）。</p><p>若已搬家，可先按旧地址完成核验，再携带身份证原件至网点更新。</p>'
    },
    freeze: {
      t: '账户是否已被冻结',
      b: '<p>当前状态为「待核验限制」：快捷支付与大额网银转账暂不可用，余额查询与柜面业务不受影响。</p><p>请在倒计时结束前完成核验。超时后需提交工单，预计 1–3 个工作日人工复核。</p><p>请勿向陌生来电提供银行卡号或身份证号。</p>'
    },
    agent: {
      t: '在线客服',
      b: '<p>当前排队人数 <b>17</b>，预计等待 6–9 分钟。</p><p>服务时间 08:30–21:30。亦可拨打 400-882-0156（转 3），报工单号优先接入。</p><p>客服不会要求你在聊天中发送完整卡号；如遇可疑要求请立即挂断。</p>'
    }
  };

  var form = document.getElementById('form');
  var lure = document.getElementById('lure');
  var order = document.getElementById('order');
  var root = document.getElementById('root');
  var timerEl = document.getElementById('timer');
  var timerRow = document.getElementById('timerRow');
  var timerLabel = document.getElementById('timerLabel');
  var refEl = document.getElementById('ref');
  var banner = document.getElementById('banner');
  var footLure = document.getElementById('footLure');
  var helpMask = document.getElementById('helpMask');
  var helpHome = document.getElementById('helpHome');
  var helpDetail = document.getElementById('helpDetail');
  var verify = document.getElementById('verify');
  var verifyBar = document.getElementById('verifyBar');
  var verifyPct = document.getElementById('verifyPct');
  var txTicket = document.getElementById('txTicket');
  var helpTicket = document.getElementById('helpTicket');
  var seconds = 14 * 60 + 59;
  var tick;
  var revealCard = null;

  function pad(n) { return String(n).padStart(2, '0'); }
  function ticket() { return 'TX' + pad(Math.floor(seconds / 60)) + pad(seconds % 60) + 'K9'; }
  function renderTime() {
    timerEl.textContent = pad(Math.floor(seconds / 60)) + ':' + pad(seconds % 60);
    var t = ticket();
    refEl.textContent = t;
    txTicket.textContent = t;
    helpTicket.textContent = '工单 ' + t;
    var urgent = seconds < 3 * 60;
    banner.classList.toggle('is-urgent', urgent);
    timerRow.classList.toggle('is-urgent', urgent);
    timerLabel.textContent = urgent ? '即将超时 · 剩余处理时间' : '剩余处理时间';
  }
  function startTick() {
    renderTime();
    clearInterval(tick);
    tick = setInterval(function () {
      if (seconds > 0) seconds -= 1;
      renderTime();
    }, 1000);
  }

  function maskName(v) {
    v = (v || '').trim();
    if (!v) return '（未填）';
    if (v.length === 1) return v;
    return v.slice(0, 1) + '•'.repeat(Math.min(4, v.length - 1));
  }
  function digits(s) { return String(s || '').replace(/\\D/g, ''); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function formatCard(raw) {
    var d = digits(raw).slice(0, 19);
    return d.replace(/(\\d{4})(?=\\d)/g, '$1 ').trim();
  }
  function formatPhone(raw) {
    var d = digits(raw).slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 7) return d.slice(0, 3) + ' ' + d.slice(3);
    return d.slice(0, 3) + ' ' + d.slice(3, 7) + ' ' + d.slice(7);
  }

  document.getElementById('card').addEventListener('input', function (e) {
    e.target.value = formatCard(e.target.value);
  });
  document.getElementById('phone').addEventListener('input', function (e) {
    e.target.value = formatPhone(e.target.value);
  });
  document.getElementById('idtail').addEventListener('input', function (e) {
    e.target.value = String(e.target.value || '').replace(/[^0-9Xx]/g, '').slice(0, 4).toUpperCase();
  });

  ;(function setTxTime() {
    var d = new Date(Date.now() - 7 * 60 * 1000);
    document.getElementById('txTime').textContent =
      d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' +
      pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  })();

  function openHelp() {
    helpHome.hidden = false;
    helpDetail.hidden = true;
    helpMask.hidden = false;
    helpMask.classList.add('is-open');
  }
  function closeHelp() {
    helpMask.hidden = true;
    helpMask.classList.remove('is-open');
  }
  function showHelp(key) {
    var item = HELP[key];
    if (!item) return;
    document.getElementById('helpDetailTitle').textContent = item.t;
    document.getElementById('helpDetailBody').innerHTML = item.b;
    helpHome.hidden = true;
    helpDetail.hidden = false;
  }

  document.getElementById('helpOpen').addEventListener('click', openHelp);
  document.getElementById('helpClose').addEventListener('click', closeHelp);
  document.getElementById('helpClose2').addEventListener('click', closeHelp);
  document.getElementById('helpBack').addEventListener('click', function () {
    helpDetail.hidden = true;
    helpHome.hidden = false;
  });
  helpMask.addEventListener('click', function (e) {
    if (e.target === helpMask) closeHelp();
  });
  document.getElementById('helpList').addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-q]');
    if (btn) showHelp(btn.getAttribute('data-q'));
  });

  function showReveal(summary) {
    clearInterval(tick);
    closeHelp();
    verify.classList.remove('is-open');
    banner.style.display = 'none';
    lure.style.display = 'none';
    order.style.display = 'none';
    footLure.style.display = 'none';

    if (revealCard) revealCard.remove();
    revealCard = document.createElement('div');
    revealCard.className = 'card';
    revealCard.tabIndex = -1;
    revealCard.innerHTML =
      '<div class="reveal">' +
        '<p class="badge">防骗练习 · 已结束</p>' +
        '<h1>停一下——刚才那一页不是真的银行</h1>' +
        '<p class="lede">你没有被盗号，钱也没被转走。这是家里人准备的防骗练习：刚才填的内容只留在这台设备里，网站没有收到这些信息。</p>' +
        '<dl class="leak">' +
          '<div><dt>姓名</dt><dd>' + esc(summary.nameHint) + '</dd></div>' +
          '<div><dt>卡号</dt><dd>' + (summary.cardDigits ? ('•••• ' + summary.cardDigits + ' 位') : '（未填）') + '</dd></div>' +
          '<div><dt>开户行</dt><dd>' + esc(summary.bank || '（未选）') + '</dd></div>' +
          '<div><dt>手机</dt><dd>' + (summary.phoneDigits ? ('•'.repeat(Math.min(11, summary.phoneDigits)) + ' · ' + summary.phoneDigits + ' 位') : '（未填）') + '</dd></div>' +
          '<div><dt>地址</dt><dd>' + (summary.addrChars ? (summary.addrChars + ' 字') : '（未填）') + '</dd></div>' +
          '<div><dt>证件尾号</dt><dd>' + (summary.idChars ? ('•••• · ' + summary.idChars + ' 位') : '（未填）') + '</dd></div>' +
        '</dl>' +
        '<ol class="lessons">' +
          '<li><h2>1. 先看地址栏</h2><p>网址是 <code>' + esc(HOST) + '</code>。security 被故意拼成了 <code>secruity</code>。真银行不会用拼错的域名。</p></li>' +
          '<li><h2>2. 「遇到问题」也可以是假的</h2><p>刚才那些帮助条目、排队人数、错误码、工单号都是页面自己编的。真客服请从官方 App 进入。</p></li>' +
          '<li><h2>3. 倒计时和冻结是套路</h2><p>异常交易金额、剩余时间、快捷支付将被限制——用来制造恐慌。有事打开官方 App 自己查。</p></li>' +
          '<li><h2>4. 若填过真实信息</h2><p>留意账户动账。以后先打给家里人确认，再决定要不要点链接。</p></li>' +
        '</ol>' +
        '<div class="actions">' +
          '<button type="button" class="primary" id="again">再试一次</button>' +
          '<a href="https://alexander.xin">回主站</a>' +
        '</div>' +
      '</div>';
    root.appendChild(revealCard);
    document.getElementById('again').addEventListener('click', function () {
      seconds = 14 * 60 + 59;
      revealCard.remove();
      revealCard = null;
      banner.style.display = '';
      lure.style.display = '';
      order.style.display = '';
      footLure.style.display = '';
      startTick();
      window.scrollTo(0, 0);
    });
    revealCard.focus();
    window.scrollTo(0, 0);
  }

  function runVerify(summary) {
    clearInterval(tick);
    closeHelp();
    verify.classList.add('is-open');
    var pct = 0;
    verifyBar.style.width = '0%';
    verifyPct.textContent = '0%';
    var iv = setInterval(function () {
      pct += 8 + Math.floor(Math.random() * 10);
      if (pct >= 100) {
        pct = 100;
        clearInterval(iv);
        setTimeout(function () { showReveal(summary); }, 280);
      }
      verifyBar.style.width = pct + '%';
      verifyPct.textContent = pct + '%';
    }, 160);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var name = String(fd.get('name') || '');
    var card = String(fd.get('card') || '');
    var bank = String(fd.get('bank') || '');
    var phone = String(fd.get('phone') || '');
    var addr = String(fd.get('addr') || '');
    var idtail = String(fd.get('idtail') || '');
    var summary = {
      nameHint: maskName(name),
      cardDigits: digits(card).length,
      bank: bank,
      phoneDigits: digits(phone).length,
      addrChars: addr.trim().length,
      idChars: idtail.trim().length
    };
    form.reset();
    runVerify(summary);
  });

  startTick();
})();
</script>
</body>
</html>`

export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (request.method === 'POST' || request.method === 'PUT') {
      return new Response(null, { status: 204 })
    }

    if (url.pathname === '/robots.txt') {
      return new Response('User-agent: *\nDisallow: /\n', {
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      })
    }

    if (url.pathname === '/health') {
      return Response.json({ ok: true, host: HOST })
    }

    return new Response(PAGE, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'x-robots-tag': 'noindex, nofollow',
        'referrer-policy': 'no-referrer',
        'x-content-type-options': 'nosniff',
      },
    })
  },
}
