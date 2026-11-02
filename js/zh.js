/* Chinese (Simplified) version — runs on pages in /zh/ only.
   1. Translates the sidebar.
   2. Points links to Chinese pages where they exist; marks English-only links.
   3. Adds an "English" switch to the top bar.
   To publish another translated page, add its path to ZH_PAGES below. */
(function () {
  var ZH_PAGES = [
    'n5/index.html',
    'n5/electronics/index.html',
    'n5/electronics/analogue/index.html',
    'n5/electronics/analogue/course-notes.html',
    'n5/electronics/analogue/glossary.html'
  ];
  var SIDEBAR = {
    'Engineering contexts': '工程背景',
    'Electronics and control': '电子与控制',
    'Mechanisms and structures': '机构与结构',
    'Overview': '概览',
    'The systems approach': '系统方法',
    'Energy and efficiency': '能量与效率',
    'Engineering roles and disciplines': '工程职业与学科',
    'Impacts of engineering': '工程的影响',
    'Analogue electronics': '模拟电子学',
    'Digital electronics': '数字电子学',
    'Control systems': '控制系统',
    'Drive systems': '传动系统',
    'Pneumatics': '气动系统',
    'Structures and forces': '结构与力',
    'Materials': '材料'
  };
  var me = document.currentScript && document.currentScript.src;
  var ROOT = me ? me.replace(/js\/zh\.js(\?.*)?$/, '') : null;

  function sitePath(href) {
    if (!ROOT || !href || href.indexOf(ROOT) !== 0) return null;
    return href.slice(ROOT.length).split('#')[0].split('?')[0];
  }

  function run() {
    // 1. sidebar labels
    document.querySelectorAll('.sidebar .sb-section-title, .sidebar a').forEach(function (el) {
      var t = el.textContent.trim();
      if (SIDEBAR[t]) el.textContent = SIDEBAR[t];
    });
    // 2. links
    document.querySelectorAll('.sidebar a, .main a, .breadcrumb a').forEach(function (a) {
      var p = sitePath(a.href);
      if (!p || p.indexOf('zh/') === 0 || !/^n5\/.*\.html$/.test(p)) return;
      if (ZH_PAGES.indexOf(p) !== -1) {
        a.href = ROOT + 'zh/' + p + (a.hash || '');
      } else if (!a.querySelector('.zh-only-en') && !a.classList.contains('level-tab')) {
        var b = document.createElement('span');
        b.className = 'zh-only-en';
        b.textContent = '英文';
        var title = a.querySelector('.subtopic-card-title, .rtc-title');
        (title || a).appendChild(b);
      }
    });
    // 3. language switch
    var right = document.querySelector('.topbar-right');
    var here = sitePath(location.href);
    if (right && here && here.indexOf('zh/') === 0 && !document.querySelector('.lang-switch')) {
      var s = document.createElement('a');
      s.className = 'lang-switch';
      s.href = ROOT + here.slice(3) + location.hash;
      s.textContent = 'English';
      s.title = '切换到英文版 / Switch to English';
      right.insertBefore(s, right.firstChild);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  /* ── Learning outcomes and answer tools (added by js/answer-tools.js in English) ── */
  var OUTCOMES_ZH = {
    'analogue': [
      '我能描述电流、电压和电阻，并说出它们的单位。',
      '我能认出并画出常见电子元件的符号。',
      '我能用欧姆定律（V = IR）计算电压、电流或电阻。',
      '我能计算串联电路中的总电阻、电流和电压。',
      '我能计算并联电路中的总电阻和各支路电流。',
      '我能对串并联混合电路进行计算。',
      '我能从曲线图中读出 LDR 或热敏电阻的电阻值。',
      '我能计算分压器的 V<sub>out</sub>。',
      '我能解释含 LDR 或热敏电阻的分压器如何作为光、暗、热或冷传感器工作。',
      '我能描述晶体管如何作为开关工作，包括其导通电压（约 0.7 V）。',
      '我能解释为什么要用继电器来开关高电压或大电流的装置。',
      '我能解释开关电动机、继电器或电磁铁时，为什么需要二极管来保护晶体管。'
    ]
  };
  var PHRASES = [
    ['Learning outcomes', '学习目标'],
    ['Tick each outcome when you feel confident you can do it. Your ticks are saved on this device and included in your downloaded answers PDF.',
     '当你有把握做到某个目标时，就勾选它。勾选会保存在这台设备上，并包含在你下载的答案 PDF 中。'],
    ['Go to section →', '跳到该节 →'],
    ['(not examined)', '（不考）'],
    ['Your answers to tasks', '你的任务答案'],
    ['Answers save on this device only. ', '答案只保存在这台设备上。'],
    ['Using a different device?', '换了一台设备？'],
    [' Load the PDF you downloaded last time (any “Download my answers” PDF from these notes) to carry on where you left off.',
     '载入你上次下载的 PDF（这些笔记中任何一个“下载我的答案”PDF），就可以接着上次的进度继续。'],
    [' — enter the password from your teacher to show the answer under each task.', ' — 输入老师给你的密码，就能在每个任务下方显示答案（答案为英文）。'],
    ['Model answers unlocked.', '参考答案已解锁。'],
    ['Model answers', '参考答案'],
    [' Use the “Show answer” button under each task.', ' 使用每个任务下方的“显示答案”按钮。'],
    ['Load my answers', '载入我的答案'],
    ['Unlock', '解锁'], ['Show all', '全部显示'], ['Hide all', '全部隐藏'], ['Lock', '锁定'],
    ['Show answer', '显示答案（英文）'], ['Hide answer', '隐藏答案'],
    ['Checking…', '正在检查……'],
    ['Model answers are not available for this topic yet.', '本主题暂时还没有参考答案。'],
    ['That password is not correct. Please try again.', '密码不正确，请再试一次。'],
    ['Sorry, the answers in this file could not be read.', '抱歉，无法读取这个文件中的答案。'],
    ['This PDF was saved before any answers had been typed.', '这个 PDF 保存时还没有输入任何答案。']
  ];
  PHRASES.sort(function (a, b) { return b[0].length - a[0].length; });
  function fixDynamic() {
    var lo = document.querySelector('.ess-lo');
    if (lo && !lo.dataset.zh) {
      var m = location.pathname.match(/\/([a-z-]+)\/course-notes\.html$/);
      var list = m && OUTCOMES_ZH[m[1]];
      if (list) {
        lo.querySelectorAll('.ess-lo-item label').forEach(function (l, i) {
          if (!list[i]) return;
          var ne = l.querySelector('.ne-tag');
          l.innerHTML = list[i] + (ne ? ' <span class="ne-tag">（不考）</span>' : '');
        });
      }
      lo.dataset.zh = '1';
    }
    var c = document.querySelector('.ess-lo summary .c');
    if (c) {
      var mm = c.textContent.match(/^(\d+) of (\d+) ticked$/);
      if (mm) c.textContent = '已勾选 ' + mm[1] + ' / ' + mm[2];
    }
    var pw = document.querySelector('.ess-pw');
    if (pw && pw.placeholder === 'Answers password') { pw.placeholder = '答案密码'; pw.setAttribute('aria-label', '答案密码'); }
    document.querySelectorAll('.ess-lo, .ess-tools, .ess-reveal, .controls-bar').forEach(function (root) {
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n;
      while ((n = w.nextNode())) {
        var t = n.nodeValue, t2 = t;
        for (var i = 0; i < PHRASES.length; i++) {
          if (t2.indexOf(PHRASES[i][0]) !== -1 && t2.indexOf(PHRASES[i][1]) === -1) t2 = t2.split(PHRASES[i][0]).join(PHRASES[i][1]);
        }
        if (t2 !== t) n.nodeValue = t2;
      }
    });
  }
  function watch() {
    fixDynamic();
    var busy = false;
    new MutationObserver(function () {
      if (busy) return; busy = true;
      try { fixDynamic(); } finally { busy = false; }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch);
  else watch();
})();

/* ============================================================
   AI-TRANSLATION WARNING (Chinese pages only)
   The first time a visitor opens a Chinese page in a browser
   session, a bilingual pop-up explains that the translation was
   made by AI and has not been checked by a qualified teacher.
   They can continue, or return to the same page in English.
   Every Chinese page also shows a slim bilingual notice at the top.
   ============================================================ */
(function () {
  var KEY = 'ess-zh-warning-accepted';
  var css = document.createElement('style');
  css.textContent =
    '.esszw-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:2000000;display:flex;align-items:center;justify-content:center;padding:20px;}' +
    '.esszw-box{background:#fff;border-radius:14px;max-width:520px;width:100%;max-height:92vh;overflow-y:auto;padding:26px 26px 22px;box-shadow:0 20px 60px rgba(0,0,0,.35);font-family:inherit;box-sizing:border-box;}' +
    '.esszw-box h2{margin:0 0 10px;font-size:18px;color:#9a3412;display:flex;align-items:center;gap:8px;}' +
    '.esszw-box p{margin:0 0 12px;font-size:14px;line-height:1.65;color:#334155;}' +
    '.esszw-box hr{border:none;border-top:1px solid #e2e8f0;margin:16px 0;}' +
    '.esszw-btns{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;margin-top:18px;}' +
    '.esszw-btns button{font-family:inherit;font-size:14px;font-weight:600;padding:10px 16px;border-radius:8px;cursor:pointer;line-height:1.35;}' +
    '.esszw-back{background:#fff;color:#334155;border:1.5px solid #cbd5e1;}' +
    '.esszw-go{background:#c2410c;color:#fff;border:1.5px solid #c2410c;}' +
    '.esszw-go:hover{background:#9a3412;}' +
    '.esszw-bar{background:#fff7ed;border-bottom:1px solid #fed7aa;color:#9a3412;font-size:12.5px;line-height:1.5;padding:8px 20px;text-align:center;}' +
    '.esszw-bar a{color:#9a3412;font-weight:600;}' +
    '@media print{.esszw-bar,.esszw-overlay{display:none!important;}}';
  document.head.appendChild(css);

  function englishUrl() {
    return location.href.replace(/\/zh\/(?=n5\/)/, '/');
  }

  function showWarning() {
    if (document.getElementById('esszw-overlay')) return;
    var o = document.createElement('div');
    o.className = 'esszw-overlay'; o.id = 'esszw-overlay';
    o.innerHTML = '<div class="esszw-box" role="dialog" aria-modal="true" aria-labelledby="esszw-title">' +
      '<h2 id="esszw-title">&#x26A0;&#xFE0F; 人工智能翻译 &middot; AI translation</h2>' +
      '<p lang="zh-CN">本中文版由<strong>人工智能（AI）</strong>从英文翻译而成，<strong>尚未经过合格教师的审核</strong>。译文可能有错误，因此<strong>必须谨慎使用</strong>。</p>' +
      '<p lang="zh-CN">如有疑问，请以英文版为准，并向老师请教。考试使用英文。</p>' +
      '<hr>' +
      '<p lang="en">This Mandarin version has been translated from English by <strong>AI</strong>. It <strong>has not been checked by a qualified teacher</strong>, so it may contain errors and <strong>must be treated with caution</strong>.</p>' +
      '<p lang="en">If anything is unclear, the English version is the one to rely on &mdash; and check with your teacher. Exams are in English.</p>' +
      '<div class="esszw-btns">' +
        '<button type="button" class="esszw-back">返回英文版<br>Return to English</button>' +
        '<button type="button" class="esszw-go">我明白，继续<br>I understand &mdash; continue</button>' +
      '</div></div>';
    o.querySelector('.esszw-back').addEventListener('click', function () {
      window.location.href = englishUrl();
    });
    o.querySelector('.esszw-go').addEventListener('click', function () {
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
      o.remove();
    });
    document.body.appendChild(o);
    o.querySelector('.esszw-go').focus();
  }

  function start() {
    // Slim notice on every Chinese page
    var main = document.querySelector('.main');
    if (main && !document.querySelector('.esszw-bar')) {
      var bar = document.createElement('div');
      bar.className = 'esszw-bar';
      bar.innerHTML = '&#x26A0;&#xFE0F; <strong lang="zh-CN">本页由人工智能翻译，未经合格教师审核，请谨慎使用。</strong> ' +
        'AI translation, not checked by a qualified teacher &mdash; use with caution. ' +
        '<a href="' + englishUrl() + '">English version</a>';
      main.insertBefore(bar, main.firstChild);
    }
    var accepted = false;
    try { accepted = sessionStorage.getItem(KEY) === '1'; } catch (e) {}
    if (!accepted) showWarning();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
