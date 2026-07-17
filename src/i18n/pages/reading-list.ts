import type { Lang } from '../types';

export type BookEntry = {
  title: string;
  author: string;
  quote: string;
  /** Longer reflective note — the main depth */
  thought: string;
  /** One concrete takeaway for practice */
  takeaway: string;
  tags: string[];
  status: 'reading' | 'finished' | 'queued';
};

export type PathItem = {
  title: string;
  desc: string;
  picks: string[];
  why: string;
};

export type EssayLink = {
  title: string;
  source: string;
  href: string;
  note: string;
};

export type ReadingCopy = {
  title: string;
  subtitle: string;
  kicker: string;
  intro: string;
  currently: string;
  finished: string;
  queued: string;
  pathsTitle: string;
  pathsIntro: string;
  booksTitle: string;
  booksIntro: string;
  essaysTitle: string;
  essaysIntro: string;
  takeawayLabel: string;
  back: string;
  books: BookEntry[];
  paths: PathItem[];
  essays: EssayLink[];
};

export const readingCopy: Record<Lang, ReadingCopy> = {
  'zh-CN': {
    title: '读读看看',
    subtitle: '停下来想一想的书，以及它们如何改写我看世界的方式',
    kicker: 'Reading',
    intro:
      '这里不是打分榜。每本书旁边写的是：它改变了我哪一层观察方式，以及我后来如何把它用回摄影、工程与写作。',
    currently: '正在读',
    finished: '读完了',
    queued: '待读',
    pathsTitle: '三条阅读路线',
    pathsIntro:
      '先理解机器与抽象，再练可维护的工程判断，最后回到观察与表达。三条线彼此交叉，而不是互相取代。',
    booksTitle: '深读笔记',
    booksIntro: '摘录之外，更重要的是：读完之后我还在用的那几句。',
    essaysTitle: '延伸阅读',
    essaysIntro: '公开文章与作者原文，用来把书里的概念放回更大的讨论里。',
    takeawayLabel: '带走一句',
    back: '返回首页',
    paths: [
      {
        title: '计算机地基',
        desc: '从程序员视角理解系统：数据表示、内存层次、并发与 I/O——不是为了立刻造操作系统，而是为了写得更稳、查得更准。',
        picks: ['CSAPP', '算法导论（选读）', '代码大全'],
        why: 'Bryant & O’Hallaron 强调“程序员视角”而非“建造者视角”：先搞清楚系统如何影响程序行为，再进入更深层的 OS / 体系结构课程会更有方向。',
      },
      {
        title: '工程实践',
        desc: '把一次性脚本变成可演进的系统：命名、边界、测试、重构，以及团队里如何说清楚取舍。',
        picks: ['Refactoring', 'Design Patterns（按需）', 'A Philosophy of Software Design'],
        why: '真正难的不是多写一行，而是让半年后的自己还能改。工程书用来校准“什么算好的复杂度”。',
      },
      {
        title: '观察与表达',
        desc: '摄影、设计空白、系统思维与批评性阅读，训练“看见什么、不看见什么、为什么按下快门或写下那句”。',
        picks: ['摄影的艺术', '设计中的设计 / 白', '论摄影', '系统之美'],
        why: '技术作品最终要被理解。观察力决定你选题；表达力决定别人能否跟上来。',
      },
    ],
    books: [
      {
        title: '设计中的设计',
        author: '原研哉',
        quote: '理解一件事，不是能把它定义清楚，而是能把自以为已知的东西重新变成未知。',
        thought:
          '原研哉区分了“简洁（simplicity）”与“空（emptiness）”：前者删减是为了把功能说清楚；后者留空是为了邀请使用者自己填入意义。MUJI 的产品像一只空容器——不替你决定怎么用。这对摄影的启发是：画面里的留白不是“少拍一点”，而是给观看者留出进入的路径。他也谈“exformation”：不是继续堆信息，而是让人意识到自己知道得很少，从而重新产生好奇。我后来改站点首页时，刻意减少装饰与口号，就是在练习这种“空”。',
        takeaway: '删减之前先问：我是在澄清功能，还是在为他人腾出空间？',
        tags: ['设计', '感知'],
        status: 'finished',
      },
      {
        title: '摄影的艺术',
        author: 'Bruce Barnbaum',
        quote: '拍照真正开始于可视化：在按下快门前后，你已经在脑子里看见最终的画面。',
        thought:
          'Barnbaum 把 visualization 拆成可操作的步骤：摄影式地看（looking）与看见（seeing）不同；构图；预想最终成品；再制定曝光与后期策略。他强调眼与相机的差异——相机没有你的选择性注意，也不会自动忽略干扰。对我而言，最有用的一课是：好照片常常是“等”出来的，而不是“扫”出来的。参数与器材是手段；表达意图才是主线。每次外拍前，我会先问自己：这张图最终希望别人感觉到什么？',
        takeaway: '站在取景器后，先想打印/发布后的那一帧，再决定技术路径。',
        tags: ['摄影', '方法'],
        status: 'reading',
      },
      {
        title: '论摄影',
        author: '苏珊·桑塔格',
        quote: '照片教给我们一种新的视觉语法，也改写了什么值得被看、我们有权观看什么。',
        thought:
          '桑塔格提醒：摄影像柏拉图洞穴里的影像——它给人“占有世界”的幻觉，却往往只提供表面知识。照片能唤起道德感，却很难单独构成伦理或政治理解；理解需要叙事与时间中的功能，而快照把世界切成彼此无关的碎片。她也指出拍摄与介入的张力：想记录的人难以同时介入，介入者又难以忠实记录。对我这个既拍风景也写站点的人，这句话很刺：画廊里的美是否在稀释真实的复杂性？我开始更谨慎地写图说，并接受“有些事不适合只靠一张图讲完”。',
        takeaway: '拍下来不等于理解；说明与上下文，是照片的伦理补丁。',
        tags: ['摄影', '批评'],
        status: 'finished',
      },
      {
        title: '系统之美',
        author: 'Donella Meadows',
        quote: '杠杆点往往就在人们已经用力的地方——只是方向常常推反了。',
        thought:
          'Meadows 把系统干预点按效力排序：参数与数字最弱，范式与“超越范式的能力”最强。改补贴、改指标看起来容易，却很少改变行为；改信息流、规则、目标与心智模型才更有力，也更难。她引用 Forrester：当事者常能直觉找到杠杆点，却往错误方向推。这对我维护个人站点与小工具很实用——别只调颜色和文案参数；先问信息是否通畅、规则是否鼓励正确行为、目标是否仍是“让人更快找到有用的东西”。',
        takeaway: '改 UI 之前，先找更高阶的杠杆：信息流、规则、目标。',
        tags: ['系统思维'],
        status: 'finished',
      },
      {
        title: '深入理解计算机系统（CSAPP）',
        author: 'Randal Bryant / David O’Hallaron',
        quote: '先从程序员视角看系统如何影响程序，再学建造者视角会更有方向。',
        thought:
          'CSAPP 的独特之处是视角：多数系统书默认你要去实现 OS 或 CPU；这本书问的是——作为写应用的人，你需要知道硬件、编译器、操作系统与网络怎样决定正确性、性能与安全。数据表示、机器级程序、存储器层次、链接、异常控制流、虚拟内存、并发……每一章都在拆“神秘 bug”的来源。它不会让你一夜变成体系结构专家，但会让你调试与优化时少靠运气。我读它的方式是：带着自己写过的慢代码与崩溃日志进去，而不是按目录背诵。',
        takeaway: '性能与正确性问题，多半能映射回某一层系统抽象。',
        tags: ['计算机', '地基'],
        status: 'reading',
      },
      {
        title: '小王子',
        author: '圣埃克苏佩里',
        quote: '真正重要的东西，用眼睛是看不见的。',
        thought:
          '重读时最刺的是狐狸关于“驯服”的段落：建立关系需要仪式与耐心，被驯服也意味着承担分别的风险。这和摄影里的“等待”很像——你不是在收集景色，而是在与光线、地点建立一种暂时的关系。它也提醒我：技术站点若只追求功能清单，会变成没有驯服过的展览，访客进得来，却留不下记忆。',
        takeaway: '关系与作品都需要可重复的耐心，而不只是一次性的惊艳。',
        tags: ['文学', '关系'],
        status: 'finished',
      },
      {
        title: '活着',
        author: '余华',
        quote: '人是为了活着本身而活着的，而不是为了活着之外的任何事物而活着。',
        thought:
          '余华用近乎平静的叙述堆叠苦难，平静本身成为压力。它让我警惕两种写作：一种把痛苦当成景观；一种把成功叙事当成唯一合法的人生。个人站点若只展示成果，也会变成另一种“不活着”——只展示被挑选过的高光。偶尔留下未完成、失败尝试与普通日子，是对这本书的一种回应。',
        takeaway: '记录时保留普通与未完成，抵抗只剩高光的叙事。',
        tags: ['文学'],
        status: 'finished',
      },
      {
        title: '月亮与六便士',
        author: '毛姆',
        quote: '我用尽了全力，过着平凡的一生。',
        thought:
          '思特里克兰德抛下家庭去绘画，逼问“天才的自私是否可被原谅”。我并不站队，但书把“六便士”（眼前的小确幸）与“月亮”（不可及的召唤）并置，让我检视自己的时间分配：工程学业、摄影与站点维护之间，哪一部分是我真正愿意长期支付代价的？答案会变，但定期重问本身有价值。',
        takeaway: '定期问自己：你在为六便士优化，还是仍愿抬头看月亮？',
        tags: ['文学', '选择'],
        status: 'finished',
      },
    ],
    essays: [
      {
        title: 'On Photography（节选与讨论）',
        source: 'Susan Sontag / New York Review of Books 起源',
        href: 'https://en.wikipedia.org/wiki/On_Photography',
        note: '先把握桑塔格的核心论题：影像占有、伦理限度、记录与介入的冲突，再决定是否通读全书。',
      },
      {
        title: 'Visualization（Barnbaum 原文节选）',
        source: 'Rocky Nook',
        href: 'https://rockynook.com/article/visualization/',
        note: '可视化五步的公开节选，适合与《摄影的艺术》对照阅读。',
      },
      {
        title: 'Leverage Points: Places to Intervene in a System',
        source: 'Donella Meadows Project',
        href: 'https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/',
        note: '十二个杠杆点全文。读完再回头看自己项目里哪些改动只是在拧参数。',
      },
      {
        title: 'CS:APP — A Programmer’s Perspective',
        source: 'Bryant & O’Hallaron',
        href: 'http://csapp.cs.cmu.edu/3e/perspective.html',
        note: '作者说明为何采用程序员视角：对写程序的人直接有用，并为后续建造者课程打底。',
      },
      {
        title: 'Kenya Hara on emptiness vs simplicity',
        source: 'IxDA / Designboom 等访谈与演讲整理',
        href: 'https://interaction18.ixda.org/program/keynote--kenya-hara/',
        note: '用“空容器”理解 MUJI 与留白，避免把极简当成装饰风格。',
      },
    ],
  },
  'zh-TW': {
    title: '讀讀看看',
    subtitle: '停下來想一想的書，以及它們如何改寫我看世界的方式',
    kicker: 'Reading',
    intro:
      '這裡不是打分榜。每本書旁邊寫的是：它改變了我哪一層觀察方式，以及我後來如何把它用回攝影、工程與寫作。',
    currently: '正在讀',
    finished: '讀完了',
    queued: '待讀',
    pathsTitle: '三條閱讀路線',
    pathsIntro:
      '先理解機器與抽象，再練可維護的工程判斷，最後回到觀察與表達。三條線彼此交叉，而不是互相取代。',
    booksTitle: '深讀筆記',
    booksIntro: '摘錄之外，更重要的是：讀完之後我還在用的那幾句。',
    essaysTitle: '延伸閱讀',
    essaysIntro: '公開文章與作者原文，用來把書裡的概念放回更大的討論裡。',
    takeawayLabel: '帶走一句',
    back: '返回首頁',
    paths: [
      {
        title: '計算機地基',
        desc: '從程式設計師視角理解系統：資料表示、記憶體層次、並行與 I/O。',
        picks: ['CSAPP', '演算法導論（選讀）', '代碼大全'],
        why: '先搞清楚系統如何影響程式行為，再進入 OS / 體系結構會更有方向。',
      },
      {
        title: '工程實踐',
        desc: '把一次性腳本變成可演進的系統：命名、邊界、測試與重構。',
        picks: ['Refactoring', 'Design Patterns（按需）', 'A Philosophy of Software Design'],
        why: '真正難的是讓半年後的自己還能改。',
      },
      {
        title: '觀察與表達',
        desc: '攝影、設計空白、系統思維與批評性閱讀。',
        picks: ['攝影的藝術', '設計中的設計', '論攝影', '系統之美'],
        why: '技術作品最終要被理解。',
      },
    ],
    books: [
      {
        title: '設計中的設計',
        author: '原研哉',
        quote: '理解一件事，不是能把它定義清楚，而是能把自以為已知的東西重新變成未知。',
        thought:
          '原研哉區分「簡潔」與「空」：前者澄清功能，後者邀請使用者填入意義。這改變我對攝影留白與網站首屏的想法——少一些裝飾，多留進入的路徑。',
        takeaway: '刪減之前先問：澄清功能，還是為他人騰出空間？',
        tags: ['設計', '感知'],
        status: 'finished',
      },
      {
        title: '攝影的藝術',
        author: 'Bruce Barnbaum',
        quote: '拍照真正開始於可視化：你已經在腦中看見最終畫面。',
        thought:
          'Looking 與 seeing 不同；預想成品再規劃曝光與後製。好照片常常是「等」出來的。',
        takeaway: '先想最終那一幀，再決定技術路徑。',
        tags: ['攝影', '方法'],
        status: 'reading',
      },
      {
        title: '論攝影',
        author: '蘇珊·桑塔格',
        quote: '照片改寫了什麼值得被看、我們有權觀看什麼。',
        thought:
          '影像給人占有世界的幻覺，卻常只提供表面知識。拍攝與介入互相拉扯——這讓我更謹慎寫圖說。',
        takeaway: '拍下來不等於理解；上下文是倫理補丁。',
        tags: ['攝影', '批評'],
        status: 'finished',
      },
      {
        title: '系統之美',
        author: 'Donella Meadows',
        quote: '槓桿點常在人們已用力之處——方向卻常常推反。',
        thought:
          '參數弱、範式強。維護站點時，別只調顏色；先問資訊流、規則與目標。',
        takeaway: '改 UI 前先找更高階槓桿。',
        tags: ['系統思維'],
        status: 'finished',
      },
      {
        title: '深入理解計算機系統（CSAPP）',
        author: 'Bryant / O’Hallaron',
        quote: '先從程式設計師視角看系統如何影響程式。',
        thought:
          '拆解神秘 bug 的來源：資料表示、記憶體、併發……帶著自己的慢代碼與崩潰日誌去讀。',
        takeaway: '性能與正確性問題多半能映射回某一層抽象。',
        tags: ['計算機', '地基'],
        status: 'reading',
      },
      {
        title: '小王子',
        author: '聖修伯里',
        quote: '真正重要的東西，用眼睛是看不見的。',
        thought: '「馴服」講的是儀式與耐心——攝影與網站都需要可重複的陪伴，而不只是一次性驚艷。',
        takeaway: '關係需要耐心，作品也是。',
        tags: ['文學', '關係'],
        status: 'finished',
      },
      {
        title: '活著',
        author: '余華',
        quote: '人是為了活著本身而活著的。',
        thought: '平靜敘述苦難。提醒我：個人站點不要只剩高光。',
        takeaway: '保留普通與未完成。',
        tags: ['文學'],
        status: 'finished',
      },
      {
        title: '月亮與六便士',
        author: '毛姆',
        quote: '我用盡了全力，過著平凡的一生。',
        thought: '六便士與月亮的並置，逼我定期重問時間分配。',
        takeaway: '你在為六便士優化，還是仍願抬頭看月亮？',
        tags: ['文學', '選擇'],
        status: 'finished',
      },
    ],
    essays: [
      {
        title: 'On Photography',
        source: 'Susan Sontag',
        href: 'https://en.wikipedia.org/wiki/On_Photography',
        note: '掌握影像占有、倫理限度、記錄與介入的衝突。',
      },
      {
        title: 'Visualization',
        source: 'Rocky Nook / Barnbaum',
        href: 'https://rockynook.com/article/visualization/',
        note: '可視化步驟的公開節選。',
      },
      {
        title: 'Leverage Points',
        source: 'Donella Meadows Project',
        href: 'https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/',
        note: '十二個槓桿點。',
      },
      {
        title: 'CS:APP Perspective',
        source: 'Bryant & O’Hallaron',
        href: 'http://csapp.cs.cmu.edu/3e/perspective.html',
        note: '為何採用程式設計師視角。',
      },
      {
        title: 'Kenya Hara keynote',
        source: 'IxDA',
        href: 'https://interaction18.ixda.org/program/keynote--kenya-hara/',
        note: '空與簡潔的差異。',
      },
    ],
  },
  'en-GB': {
    title: 'Read & Revisit',
    subtitle: 'Books that changed how I look — and how I build',
    kicker: 'Reading',
    intro:
      'Not a ranking. Beside each title: which layer of seeing it changed, and how I later used it in photography, engineering and writing.',
    currently: 'Currently reading',
    finished: 'Finished',
    queued: 'Queued',
    pathsTitle: 'Three reading routes',
    pathsIntro:
      'Understand machines and abstractions first, then engineering judgement, then observation and expression. The routes cross; they do not replace each other.',
    booksTitle: 'Deep notes',
    booksIntro: 'Beyond quotes: the sentences I still use.',
    essaysTitle: 'Further reading',
    essaysIntro: 'Public essays and primary sources that put the books back into a wider conversation.',
    takeawayLabel: 'Takeaway',
    back: 'Back to home',
    paths: [
      {
        title: 'Computer foundations',
        desc: 'Systems from a programmer’s view: representation, memory hierarchy, concurrency and I/O — to write and debug with less superstition.',
        picks: ['CSAPP', 'CLRS (selective)', 'Code Complete'],
        why: 'Bryant & O’Hallaron argue for a programmer’s perspective before a builder’s: learn how systems shape program behaviour, then specialise.',
      },
      {
        title: 'Engineering practice',
        desc: 'Turn one-off scripts into systems you can evolve: boundaries, tests, refactoring and clear trade-offs.',
        picks: ['Refactoring', 'Design Patterns (as needed)', 'A Philosophy of Software Design'],
        why: 'The hard part is change six months later, not the first commit.',
      },
      {
        title: 'Observation & expression',
        desc: 'Photography, emptiness in design, systems thinking and critical reading — what you notice, omit and explain.',
        picks: ['The Art of Photography', 'Designing Design', 'On Photography', 'Thinking in Systems'],
        why: 'Technical work still has to be understood by humans.',
      },
    ],
    books: [
      {
        title: 'Designing Design',
        author: 'Kenya Hara',
        quote:
          'To understand something is not to define it, but to make the seemingly known unknown again.',
        thought:
          'Hara separates simplicity from emptiness: simplicity clarifies function; emptiness invites the user to complete meaning. MUJI products behave like empty vessels. That reframed negative space in my photographs and the first viewport of this site — fewer ornaments, more room to enter. His “exformation” idea — awakening curiosity by revealing how little we know — is the opposite of packing a page with badges.',
        takeaway: 'Before cutting, ask: clarifying function, or making space for someone else?',
        tags: ['Design', 'Perception'],
        status: 'finished',
      },
      {
        title: 'The Art of Photography',
        author: 'Bruce Barnbaum',
        quote:
          'Making a photograph begins with visualisation — seeing the final image before or as you expose.',
        thought:
          'Barnbaum’s visualisation steps separate looking from seeing, then composition, envisioning the print, and planning exposure and process. Cameras lack selective attention. The practical lesson: strong frames are often waited for, not swept. Gear serves intent. Before a shoot I ask what feeling the finished picture should carry.',
        takeaway: 'Imagine the final frame first, then choose the technical path.',
        tags: ['Photography', 'Method'],
        status: 'reading',
      },
      {
        title: 'On Photography',
        author: 'Susan Sontag',
        quote:
          'Photographs teach a new visual grammar — and rewrite what is worth looking at.',
        thought:
          'Sontag’s warning: images offer appropriation and a bargain-basement sense of knowledge. They can stir conscience yet rarely deliver ethical understanding alone, because understanding needs narrative over time. Recording and intervening pull in opposite directions. For a photographer who also ships a public site, captions and context are ethical patches, not decoration.',
        takeaway: 'Capturing is not understanding; context is part of the ethics.',
        tags: ['Photography', 'Critique'],
        status: 'finished',
      },
      {
        title: 'Thinking in Systems',
        author: 'Donella Meadows',
        quote:
          'People often find leverage points — then push them the wrong way.',
        thought:
          'Meadows ranks interventions from parameters (weak) to paradigms (strong). Tweaking colours is easy; changing information flows, rules and goals is harder and more powerful. Useful when maintaining this site: do not only tune UI knobs — ask whether information reaches the right person and whether incentives match the real goal.',
        takeaway: 'Before another UI tweak, look for higher leverage: information, rules, goals.',
        tags: ['Systems'],
        status: 'finished',
      },
      {
        title: 'Computer Systems: A Programmer’s Perspective',
        author: 'Bryant / O’Hallaron',
        quote:
          'Learn systems by how they affect your programs — then study how to build them.',
        thought:
          'CSAPP spans representation, machine code, memory, linking, exceptional control flow, virtual memory and concurrency from an application programmer’s seat. It demystifies “weird” bugs and performance cliffs. I read it with my own slow paths and crash logs, not as a memorisation drill.',
        takeaway: 'Most correctness and performance mysteries map to a system layer.',
        tags: ['Computing', 'Foundations'],
        status: 'reading',
      },
      {
        title: 'The Little Prince',
        author: 'Antoine de Saint-Exupéry',
        quote: 'What is essential is invisible to the eye.',
        thought:
          'The fox on taming: relationships need rites and patience — and risk loss. Photography’s waiting is similar. A personal site full of feature lists but no “taming” becomes a showroom visitors enter without memory.',
        takeaway: 'Patience is a design material.',
        tags: ['Literature', 'Relations'],
        status: 'finished',
      },
      {
        title: 'To Live',
        author: 'Yu Hua',
        quote: 'You live for living itself — not for anything beyond it.',
        thought:
          'Calm narration of suffering. A warning against portfolios that only show highlight reels. Leaving unfinished work and ordinary days on a personal site is a small reply to that pressure.',
        takeaway: 'Keep ordinary and unfinished records.',
        tags: ['Literature'],
        status: 'finished',
      },
      {
        title: 'The Moon and Sixpence',
        author: 'W. Somerset Maugham',
        quote: 'I have done my best with an ordinary life.',
        thought:
          'Sixpence versus moon: the book forces a recurring audit of where time goes — studies, photographs, site craft. The answer changes; asking on a schedule still matters.',
        takeaway: 'Are you optimising for sixpence, or still willing to look up?',
        tags: ['Literature', 'Choice'],
        status: 'finished',
      },
    ],
    essays: [
      {
        title: 'On Photography (overview)',
        source: 'Susan Sontag',
        href: 'https://en.wikipedia.org/wiki/On_Photography',
        note: 'Core claims on appropriation, ethics and the record/intervene tension.',
      },
      {
        title: 'Visualization',
        source: 'Rocky Nook / Barnbaum',
        href: 'https://rockynook.com/article/visualization/',
        note: 'Public excerpt of the visualisation steps.',
      },
      {
        title: 'Leverage Points',
        source: 'Donella Meadows Project',
        href: 'https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/',
        note: 'The twelve places to intervene — then audit your own projects.',
      },
      {
        title: 'CS:APP Perspective',
        source: 'Bryant & O’Hallaron',
        href: 'http://csapp.cs.cmu.edu/3e/perspective.html',
        note: 'Why a programmer’s perspective first.',
      },
      {
        title: 'Kenya Hara on emptiness',
        source: 'IxDA',
        href: 'https://interaction18.ixda.org/program/keynote--kenya-hara/',
        note: 'Emptiness versus Western simplicity.',
      },
    ],
  },
  fr: {
    title: 'Lire et Relire',
    subtitle: 'Des livres qui ont changé ma façon de voir et de construire',
    kicker: 'Reading',
    intro:
      'Pas un classement. Pour chaque titre : quelle couche du regard a bougé, et comment je l’ai réutilisée.',
    currently: 'En cours',
    finished: 'Terminé',
    queued: 'À lire',
    pathsTitle: 'Trois parcours',
    pathsIntro:
      'Machines et abstractions, jugement d’ingénierie, puis observation et expression.',
    booksTitle: 'Notes profondes',
    booksIntro: 'Au-delà des citations : les phrases que j’utilise encore.',
    essaysTitle: 'Pour aller plus loin',
    essaysIntro: 'Essais publics et sources primaires.',
    takeawayLabel: 'À emporter',
    back: "Retour à l'accueil",
    paths: [
      {
        title: 'Fondations informatiques',
        desc: 'Systèmes vus par le programmeur : représentation, mémoire, concurrence.',
        picks: ['CSAPP', 'CLRS (sélectif)', 'Code Complete'],
        why: 'Perspective programmeur avant perspective constructeur.',
      },
      {
        title: 'Pratique d’ingénierie',
        desc: 'Maintenabilité, tests, refactoring, compromis clairs.',
        picks: ['Refactoring', 'Design Patterns', 'A Philosophy of Software Design'],
        why: 'Le difficile, c’est dans six mois.',
      },
      {
        title: 'Observation et expression',
        desc: 'Photo, vide du design, pensée systémique, lecture critique.',
        picks: ['The Art of Photography', 'Designing Design', 'On Photography', 'Thinking in Systems'],
        why: 'Le technique doit rester compréhensible.',
      },
    ],
    books: [
      {
        title: 'Designing Design',
        author: 'Kenya Hara',
        quote: 'Comprendre, c’est rendre à nouveau inconnu ce que l’on croit savoir.',
        thought:
          'Simplicité vs vide : clarifier la fonction, ou inviter l’usage. Cela a changé mon rapport au vide dans la photo et sur ce site.',
        takeaway: 'Avant de couper : clarifier, ou ouvrir un espace ?',
        tags: ['Design'],
        status: 'finished',
      },
      {
        title: "L'Art de la photographie",
        author: 'Bruce Barnbaum',
        quote: 'La photo commence par la visualisation de l’image finale.',
        thought:
          'Voir n’est pas regarder. Attendre plutôt que balayer. Le matériel sert l’intention.',
        takeaway: 'Imaginer le tirage d’abord.',
        tags: ['Photo'],
        status: 'reading',
      },
      {
        title: 'On Photography',
        author: 'Susan Sontag',
        quote: 'La photo réécrit ce qui mérite d’être vu.',
        thought:
          'L’image donne une connaissance à bas prix. Enregistrer et intervenir se contredisent. Les légendes comptent éthiquement.',
        takeaway: 'Capturer ≠ comprendre.',
        tags: ['Critique'],
        status: 'finished',
      },
      {
        title: 'Thinking in Systems',
        author: 'Donella Meadows',
        quote: 'On pousse souvent le bon levier dans le mauvais sens.',
        thought:
          'Paramètres faibles, paradigmes forts. Auditer info, règles, buts avant l’UI.',
        takeaway: 'Chercher un levier plus haut.',
        tags: ['Systèmes'],
        status: 'finished',
      },
      {
        title: 'CSAPP',
        author: 'Bryant / O’Hallaron',
        quote: 'D’abord l’effet des systèmes sur vos programmes.',
        thought:
          'Démystifie bugs et perfs. À lire avec ses propres crashs.',
        takeaway: 'Chaque mystère mappe une couche.',
        tags: ['Informatique'],
        status: 'reading',
      },
      {
        title: 'Le Petit Prince',
        author: 'Saint-Exupéry',
        quote: "L'essentiel est invisible pour les yeux.",
        thought: 'Apprivoiser demande du temps — comme attendre la lumière.',
        takeaway: 'La patience est un matériau.',
        tags: ['Littérature'],
        status: 'finished',
      },
    ],
    essays: [
      {
        title: 'On Photography',
        source: 'Sontag',
        href: 'https://en.wikipedia.org/wiki/On_Photography',
        note: 'Appropriation, éthique, enregistrement vs intervention.',
      },
      {
        title: 'Visualization',
        source: 'Rocky Nook',
        href: 'https://rockynook.com/article/visualization/',
        note: 'Extrait sur la visualisation.',
      },
      {
        title: 'Leverage Points',
        source: 'Meadows',
        href: 'https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/',
        note: 'Douze points d’intervention.',
      },
      {
        title: 'CS:APP Perspective',
        source: 'CSAPP',
        href: 'http://csapp.cs.cmu.edu/3e/perspective.html',
        note: 'Pourquoi la perspective programmeur.',
      },
      {
        title: 'Kenya Hara',
        source: 'IxDA',
        href: 'https://interaction18.ixda.org/program/keynote--kenya-hara/',
        note: 'Vide et simplicité.',
      },
    ],
  },
  ru: {
    title: 'Читать и перечитывать',
    subtitle: 'Книги, которые изменили взгляд — и то, как я строю',
    kicker: 'Reading',
    intro:
      'Не рейтинг. Рядом с каждой книгой — какой слой зрения она сдвинула и как я это применил.',
    currently: 'Читаю',
    finished: 'Прочитано',
    queued: 'В очереди',
    pathsTitle: 'Три маршрута',
    pathsIntro:
      'Сначала машины и абстракции, затем инженерное суждение, затем наблюдение и выражение.',
    booksTitle: 'Глубокие заметки',
    booksIntro: 'Не только цитаты — фразы, которыми я всё ещё пользуюсь.',
    essaysTitle: 'Дальше читать',
    essaysIntro: 'Публичные эссе и первоисточники.',
    takeawayLabel: 'Вывод',
    back: 'На главную',
    paths: [
      {
        title: 'Фундамент CS',
        desc: 'Системы глазами программиста: представление данных, память, параллелизм.',
        picks: ['CSAPP', 'CLRS (выборочно)', 'Code Complete'],
        why: 'Сначала поведение программ, потом курс «строителя».',
      },
      {
        title: 'Инженерная практика',
        desc: 'Поддерживаемость, тесты, рефакторинг, ясные компромиссы.',
        picks: ['Refactoring', 'Design Patterns', 'A Philosophy of Software Design'],
        why: 'Сложно через полгода, не в первый коммит.',
      },
      {
        title: 'Наблюдение и выражение',
        desc: 'Фото, пустота в дизайне, системное мышление, критика.',
        picks: ['The Art of Photography', 'Designing Design', 'On Photography', 'Thinking in Systems'],
        why: 'Технику всё равно должны понять люди.',
      },
    ],
    books: [
      {
        title: 'Дизайн дизайна',
        author: 'Кэндзи Хара',
        quote: 'Понять — значит снова сделать неизвестным то, что казалось известным.',
        thought:
          'Простота проясняет функцию; пустота приглашает смысл. Это изменило мой взгляд на воздух в кадре и на первом экране сайта.',
        takeaway: 'Сначала спросить: уточняю функцию или освобождаю место?',
        tags: ['Дизайн'],
        status: 'finished',
      },
      {
        title: 'Искусство фотографии',
        author: 'Bruce Barnbaum',
        quote: 'Снимок начинается с визуализации финального кадра.',
        thought:
          'Смотреть и видеть — разное. Хорошие кадры часто ждут. Техника служит замыслу.',
        takeaway: 'Сначала финальный кадр, потом техника.',
        tags: ['Фото'],
        status: 'reading',
      },
      {
        title: 'О фотографии',
        author: 'Сьюзен Зонтаг',
        quote: 'Фотография переписывает, что стоит смотреть.',
        thought:
          'Образ даёт дешёвое знание. Запись и вмешательство тянут в разные стороны. Подписи — этическая часть работы.',
        takeaway: 'Снять ≠ понять.',
        tags: ['Критика'],
        status: 'finished',
      },
      {
        title: 'Думать системами',
        author: 'Donella Meadows',
        quote: 'Рычаг часто толкают не туда.',
        thought:
          'Параметры слабы, парадигмы сильны. Перед UI — информационные потоки, правила, цели.',
        takeaway: 'Искать более высокий рычаг.',
        tags: ['Системы'],
        status: 'finished',
      },
      {
        title: 'CSAPP',
        author: 'Bryant / O’Hallaron',
        quote: 'Сначала — как системы влияют на программы.',
        thought:
          'Снимает мистику багов и тормозов. Читать со своими логами.',
        takeaway: 'Загадка почти всегда на каком-то слое системы.',
        tags: ['CS'],
        status: 'reading',
      },
      {
        title: 'Маленький принц',
        author: 'Сент-Экзюпери',
        quote: 'Самое важное глазами не видно.',
        thought: 'Приручение — это ритуал и терпение, как ожидание света.',
        takeaway: 'Терпение — материал дизайна.',
        tags: ['Литература'],
        status: 'finished',
      },
    ],
    essays: [
      {
        title: 'On Photography',
        source: 'Sontag',
        href: 'https://en.wikipedia.org/wiki/On_Photography',
        note: 'Присвоение, этика, запись vs вмешательство.',
      },
      {
        title: 'Visualization',
        source: 'Rocky Nook',
        href: 'https://rockynook.com/article/visualization/',
        note: 'Отрывок о визуализации.',
      },
      {
        title: 'Leverage Points',
        source: 'Meadows',
        href: 'https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/',
        note: 'Двенадцать точек вмешательства.',
      },
      {
        title: 'CS:APP Perspective',
        source: 'CSAPP',
        href: 'http://csapp.cs.cmu.edu/3e/perspective.html',
        note: 'Почему взгляд программиста.',
      },
      {
        title: 'Kenya Hara',
        source: 'IxDA',
        href: 'https://interaction18.ixda.org/program/keynote--kenya-hara/',
        note: 'Пустота и простота.',
      },
    ],
  },
};
