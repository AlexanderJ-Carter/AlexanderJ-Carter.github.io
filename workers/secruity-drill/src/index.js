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
    --bg: #f5f5f5;
    --sans: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "Segoe UI", sans-serif;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; min-height: 100%; background: var(--bg); color: var(--ink); font-family: var(--sans); }
  a { color: var(--blue); text-decoration: none; }
  .top {
    background: linear-gradient(90deg, #0958d9, #1677ff 55%, #4096ff);
    color: #fff; padding: 0.85rem 1rem;
    display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
  }
  .top__brand { display: flex; align-items: center; gap: 0.55rem; font-weight: 600; font-size: 0.95rem; }
  .top__logo {
    width: 1.7rem; height: 1.7rem; border-radius: 0.35rem;
    background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.35);
    display: grid; place-items: center; font-size: 0.7rem; font-weight: 700;
  }
  .top__sub { font-size: 0.7rem; opacity: 0.85; }
  .banner {
    background: #fff2f0; border-bottom: 1px solid #ffccc7; color: var(--red);
    padding: 0.65rem 1rem; font-size: 0.82rem; line-height: 1.45;
  }
  .wrap { max-width: 26.5rem; margin: 0 auto; padding: 1rem 0.85rem 2.5rem; }
  .card {
    background: #fff; border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04);
    overflow: hidden;
  }
  .card__head { padding: 1.15rem 1.1rem 0.85rem; border-bottom: 1px solid var(--line); }
  .card__head h1 { margin: 0 0 0.45rem; font-size: 1.15rem; font-weight: 650; }
  .card__head p { margin: 0; font-size: 0.84rem; color: #595959; line-height: 1.55; }
  .timer-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 0.85rem; padding: 0.55rem 0.7rem;
    background: #fff7e6; border: 1px solid #ffd591; border-radius: 0.35rem;
    font-size: 0.8rem; color: var(--orange);
  }
  .timer { font-variant-numeric: tabular-nums; font-weight: 700; font-size: 1rem; color: var(--red); }
  form { padding: 1rem 1.1rem 0.35rem; display: grid; gap: 0.85rem; }
  label { display: grid; gap: 0.3rem; font-size: 0.78rem; color: #595959; }
  .field {
    display: flex; align-items: center; gap: 0.4rem;
    border: 1px solid #d9d9d9; border-radius: 0.35rem; background: #fafafa;
    padding: 0 0.7rem; min-height: 2.65rem;
  }
  .field:focus-within { border-color: var(--blue); background: #fff; box-shadow: 0 0 0 2px rgba(22,119,255,0.12); }
  .field input, .field select {
    flex: 1; border: 0; background: transparent; outline: none;
    font: inherit; font-size: 0.95rem; color: var(--ink); min-width: 0;
    padding: 0.65rem 0; appearance: none;
  }
  .submit {
    margin-top: 0.15rem; border: 0; border-radius: 0.35rem;
    background: var(--blue); color: #fff; font: inherit; font-size: 1rem; font-weight: 600;
    padding: 0.78rem 1rem; cursor: pointer;
  }
  .submit:hover, .submit:focus-visible { background: var(--blue-d); }
  .submit:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }
  .help-link {
    display: block; text-align: center; padding: 0.35rem 1.1rem 1rem;
    font-size: 0.8rem; color: var(--blue); background: transparent; border: 0;
    width: 100%; cursor: pointer; font: inherit;
  }
  .tips {
    margin: 0; padding: 0 1.1rem 1.1rem; font-size: 0.72rem; color: var(--muted); line-height: 1.55;
  }
  .tips li { margin-left: 1rem; }
  .foot { margin-top: 1.1rem; text-align: center; font-size: 0.68rem; color: #bfbfbf; line-height: 1.5; }
  .reveal { padding: 1.15rem 1.1rem 1.25rem; }
  .reveal h1 { margin: 0 0 0.55rem; font-size: 1.2rem; }
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
  }
  @media (min-width: 480px) {
    .sheet { border-radius: 0.5rem; }
  }
  .sheet h2 { margin: 0 0 0.75rem; font-size: 1.05rem; }
  .sheet__list { list-style: none; margin: 0; padding: 0; }
  .sheet__list button {
    display: block; width: 100%; text-align: left; border: 0; border-bottom: 1px solid var(--line);
    background: transparent; padding: 0.85rem 0; font: inherit; font-size: 0.9rem; color: var(--ink);
    cursor: pointer;
  }
  .sheet__list button:last-child { border-bottom: 0; }
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
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
  }
</style>
</head>
<body>
  <header class="top">
    <div class="top__brand">
      <span class="top__logo">安</span>
      <div>
        <div>网银安全核验中心</div>
        <div class="top__sub">Online Banking Risk Control</div>
      </div>
    </div>
    <div class="top__sub">服务编码 SX-8821</div>
  </header>

  <div class="banner" id="banner">
    系统监测到您的借记卡存在异常消费尝试。为保障资金安全，请在时限内完成身份核验，否则账户将临时限制快捷支付。
  </div>

  <div class="wrap" id="root">
    <div class="card" id="lure">
      <div class="card__head">
        <h1>请完成账户安全核验</h1>
        <p>检测到异地设备发起支付。请填写开户时预留信息，核验通过后即可恢复正常使用。</p>
        <div class="timer-row">
          <span>剩余处理时间</span>
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
          <div class="field"><input name="card" type="text" inputmode="numeric" autocomplete="off" required placeholder="16–19 位卡号"/></div>
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
          <div class="field"><input name="phone" type="tel" inputmode="numeric" autocomplete="off" required placeholder="银行预留手机号"/></div>
        </label>
        <label>
          常住地址
          <div class="field"><input name="addr" type="text" autocomplete="off" required placeholder="省市区 + 详细地址"/></div>
        </label>
        <label>
          身份证号后四位
          <div class="field"><input name="idtail" type="text" inputmode="numeric" autocomplete="off" required minlength="4" maxlength="4" placeholder="证件号最后四位"/></div>
        </label>
        <button class="submit" type="submit">立即验证并解除限制</button>
      </form>

      <button type="button" class="help-link" id="helpOpen">遇到问题？查看常见帮助</button>

      <ul class="tips">
        <li>请确保本人操作，勿向他人转发本页或截图中的个人信息。</li>
        <li>客服热线：400-882-0156（转 3） · 工单号 <span id="ref">—</span></li>
        <li>会话节点：CN-East-2 · 证书 CN=*.alexander-sec.ru</li>
      </ul>
    </div>

    <p class="foot" id="footLure">
      © 网银安全核验中心 · 请使用本人借记卡操作<br/>
      <span style="opacity:.7">连接至 ${HOST}</span>
    </p>
  </div>

  <div class="mask" id="helpMask" hidden>
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="helpTitle">
      <div id="helpHome">
        <h2 id="helpTitle">常见问题</h2>
        <ul class="sheet__list" id="helpList">
          <li><button type="button" data-q="phone">预留手机号已停用 / 换号</button></li>
          <li><button type="button" data-q="card">提示卡号有误 / 无法识别</button></li>
          <li><button type="button" data-q="addr">常住地址与开户信息不一致</button></li>
          <li><button type="button" data-q="freeze">已经提示账户冻结了吗</button></li>
          <li><button type="button" data-q="agent">联系在线客服</button></li>
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
      b: '<p>请核对是否输入完整卡号（含卡面空格位置的数字），不要输入存折账号。</p><p>信用卡、外币卡暂不支持本通道；借记卡若为新换卡，请以卡面最新卡号为准。</p><p>系统错误码 E-22014 表示 BIN 校验未通过，可换一张一类户借记卡重试。</p>'
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
  var root = document.getElementById('root');
  var timerEl = document.getElementById('timer');
  var refEl = document.getElementById('ref');
  var banner = document.getElementById('banner');
  var footLure = document.getElementById('footLure');
  var helpMask = document.getElementById('helpMask');
  var helpHome = document.getElementById('helpHome');
  var helpDetail = document.getElementById('helpDetail');
  var seconds = 14 * 60 + 59;
  var tick;
  var revealCard = null;

  function pad(n) { return String(n).padStart(2, '0'); }
  function renderTime() {
    timerEl.textContent = pad(Math.floor(seconds / 60)) + ':' + pad(seconds % 60);
    refEl.textContent = 'TX' + pad(Math.floor(seconds / 60)) + pad(seconds % 60) + 'K9';
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
    banner.style.display = 'none';
    lure.style.display = 'none';
    footLure.style.display = 'none';

    if (revealCard) revealCard.remove();
    revealCard = document.createElement('div');
    revealCard.className = 'card';
    revealCard.tabIndex = -1;
    revealCard.innerHTML =
      '<div class="reveal">' +
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
          '<li><h2>2. 「遇到问题」也可以是假的</h2><p>刚才那些帮助条目、排队人数、错误码都是页面自己编的，用来让你放松警惕。真客服请从官方 App 进入。</p></li>' +
          '<li><h2>3. 倒计时和冻结是套路</h2><p>正规机构不会用陌生链接同时要卡号、住址和身份证号。有事打开官方 App 查。</p></li>' +
          '<li><h2>4. 若填过真实信息</h2><p>留意账户动账。以后先打给家里人确认，再决定要不要点链接。</p></li>' +
        '</ol>' +
        '<div class="actions">' +
          '<button type="button" class="primary" id="again">再试一次</button>' +
          '<a href="https://alexander.xin">回主站</a>' +
        '</div>' +
      '</div>';
    root.insertBefore(revealCard, footLure);
    document.getElementById('again').addEventListener('click', function () {
      seconds = 14 * 60 + 59;
      revealCard.remove();
      revealCard = null;
      banner.style.display = '';
      lure.style.display = '';
      footLure.style.display = '';
      startTick();
      window.scrollTo(0, 0);
    });
    revealCard.focus();
    window.scrollTo(0, 0);
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
    showReveal(summary);
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
