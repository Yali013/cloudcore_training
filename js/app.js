/* CloudCore Trainee Academy - app engine (no build step, no dependencies) */
(function () {
  'use strict';

  // ---------- helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app');
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const store = {
    get(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* storage unavailable */ } }
  };
  const getPath = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
  const setPath = (o, p, v) => { const ks = p.split('.'); const last = ks.pop(); const t = ks.reduce((a, k) => a[k], o); t[last] = v; };
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- state ----------
  const KEY_EDITS = 'cca_course_edits';
  const KEY_PROFILES = 'cca_profiles';
  const progKey = (id) => 'cca_progress_' + id;
  let course = store.get(KEY_EDITS) || clone(window.COURSE);
  let hasEdits = !!store.get(KEY_EDITS);
  const emptyProgress = () => ({ xp: 0, flip: {}, qa: {}, quiz: {}, act: {}, lab: {}, labxp: {}, checks: {}, test: {}, blitz: {}, sound: false });
  // Trainee profiles: no auth, just a name per person, each with its own progress in this browser.
  const profiles = Object.assign({ current: null, list: [] }, store.get(KEY_PROFILES) || {});
  const saveProfiles = () => store.set(KEY_PROFILES, profiles);
  const me = () => profiles.list.find((p) => p.id === profiles.current) || null;
  const loadProgress = (id) => Object.assign(emptyProgress(), (id && store.get(progKey(id))) || {});
  let P = loadProgress(profiles.current);
  let editMode = false;
  let cur = null; // { ch, steps, stepIdx }
  let ui = { runs: {}, act: {}, meta: {}, flipped: {}, focusTerm: null };
  const resetUi = () => { ui = { runs: {}, act: {}, meta: {}, flipped: {}, focusTerm: null }; };

  const saveP = () => {
    const p = me(); if (!p) return;
    store.set(progKey(p.id), P); p.last = Date.now(); saveProfiles();
  };
  function selectProfile(id) {
    profiles.current = id; saveProfiles(); P = loadProgress(id); resetUi(); renderTopbar();
  }
  function createProfile(name) {
    const id = 't' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    profiles.list.push({ id, name, created: Date.now(), last: Date.now() });
    selectProfile(id); return id;
  }
  const AVATARS = ['🦊', '🐼', '🐙', '🦉', '🐢', '🐧', '🦄', '🐝', '🐬', '🦁', '🐸', '🐨'];
  const avatar = (name) => AVATARS[[...String(name)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % AVATARS.length];
  const fmtDate = (t) => (t ? new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
  let saveTimer;
  const saveCourseNow = () => { clearTimeout(saveTimer); store.set(KEY_EDITS, course); hasEdits = true; updateEditBar(); };
  const saveCourse = () => { clearTimeout(saveTimer); saveTimer = setTimeout(saveCourseNow, 300); };
  const renumber = () => course.chapters.forEach((c, i) => { c.num = i + 1; });

  // ---------- XP & levels ----------
  const TITLES = ['Cloud Cadet', 'Cable Untangler', 'Packet Pusher', 'Shell Wrangler', 'LUN Tamer', 'Snapshot Sage', 'vMotion Master', 'Core Legend'];
  const XP_PER_LEVEL = 150;
  const levelInfo = () => { const lvl = Math.floor(P.xp / XP_PER_LEVEL) + 1; return { lvl, title: TITLES[Math.min(lvl - 1, TITLES.length - 1)], into: P.xp % XP_PER_LEVEL }; };
  function addXP(n) {
    const before = levelInfo().lvl;
    P.xp += n; saveP();
    toast(`+${n} XP ⭐`);
    const after = levelInfo();
    if (after.lvl > before) { setTimeout(() => { toast(`🎉 Level up! You're now a ${after.title}`, 3200); confetti(120); }, 400); }
    renderTopbar();
  }

  // ---------- feedback: toast, confetti, sound ----------
  let toastTimer;
  function toast(msg, ms = 1600) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), ms);
  }
  function confetti(n = 80) {
    if (reducedMotion) return;
    const colors = ['#4C97FF', '#9966FF', '#FFAB19', '#59C059', '#FF6680', '#FFBF00', '#5CB1D6'];
    const box = document.createElement('div'); box.className = 'confetti';
    for (let i = 0; i < n; i++) {
      const s = document.createElement('i');
      s.style.left = Math.random() * 100 + 'vw';
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = Math.random() * 0.35 + 's';
      s.style.animationDuration = 1.6 + Math.random() * 1.4 + 's';
      box.appendChild(s);
    }
    document.body.appendChild(box); setTimeout(() => box.remove(), 3600);
  }
  let actx;
  function beep(ok) {
    if (!P.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(); const g = actx.createGain(); const t = actx.currentTime;
      const fs = ok ? [523, 659, 784] : [233, 185];
      o.type = 'triangle'; fs.forEach((f, i) => o.frequency.setValueAtTime(f, t + i * 0.09));
      g.gain.setValueAtTime(0.07, t); g.gain.exponentialRampToValueAtTime(0.0001, t + fs.length * 0.09 + 0.15);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + fs.length * 0.09 + 0.2);
    } catch (e) { /* audio unavailable */ }
  }

  const MASCOT = `<svg class="mascot" viewBox="0 0 130 100" aria-hidden="true">
    <g fill="#2B5BB8"><circle cx="38" cy="58" r="25"/><circle cx="66" cy="42" r="31"/><circle cx="95" cy="57" r="24"/><rect x="36" y="56" width="62" height="29" rx="14"/></g>
    <g fill="#fff"><circle cx="38" cy="58" r="21"/><circle cx="66" cy="42" r="27"/><circle cx="95" cy="57" r="20"/><rect x="38" y="58" width="58" height="23" rx="11"/></g>
    <circle cx="55" cy="54" r="5" fill="#2B2D42"/><circle cx="79" cy="54" r="5" fill="#2B2D42"/>
    <circle cx="56.5" cy="52.5" r="1.6" fill="#fff"/><circle cx="80.5" cy="52.5" r="1.6" fill="#fff"/>
    <circle cx="47" cy="64" r="4.5" fill="#FF9DB5" opacity=".75"/><circle cx="88" cy="64" r="4.5" fill="#FF9DB5" opacity=".75"/>
    <path d="M60 64 q7 7 14 0" stroke="#2B2D42" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
  const GREETINGS = [
    'Ready to learn something cool today? ☁️',
    'Every expert was once a trainee. Let\'s go! 🚀',
    'Tip: flip ALL the cards in a section to unlock its quiz.',
    'Packets, LUNs, vMotion… you\'ve got this! 💪',
    'Stuck in a lab? Try alone first, then ask your mentor.',
    'Fun fact: WAFL never overwrites a block in place. 🤓',
    'Flipped a card? Now find out what really happens behind it. 🔎'
  ];

  // ---------- course structure ----------
  function stepsOf(ch) {
    const s = [];
    (ch.sections || []).forEach((sec, i) => {
      s.push({ type: 'learn', i });
      if (editMode || (sec.quiz && sec.quiz.length)) s.push({ type: 'quiz', i });
    });
    (ch.activities || []).forEach((a, i) => s.push({ type: 'act', i }));
    (ch.labs || []).forEach((l, i) => s.push({ type: 'lab', i }));
    if (ch.test || editMode) s.push({ type: 'test' });
    return s;
  }
  function stepMeta(ch, st) {
    switch (st.type) {
      case 'learn': return { icon: '📖', label: ch.sections[st.i].title };
      case 'quiz': return { icon: '❓', label: 'Quiz: ' + ch.sections[st.i].title };
      case 'act': { const a = ch.activities[st.i]; return { icon: (GAME_TYPES[a.type] || ['🎮'])[0], label: a.title }; }
      case 'lab': { const l = ch.labs[st.i]; return { icon: { external: '🔗', checklist: '✅', interactive: '🕹️' }[l.kind] || '🧪', label: l.title }; }
      default: return { icon: '🏆', label: 'Chapter test' };
    }
  }
  const hasTestQs = (ch) => !!(ch.test && ch.test.questions && ch.test.questions.length);
  function countable(ch, st) {
    if (st.type === 'quiz') return !!(ch.sections[st.i].quiz || []).length;
    if (st.type === 'test') return hasTestQs(ch);
    return true;
  }
  function stepDone(ch, st) {
    switch (st.type) {
      case 'learn': return ch.sections[st.i].terms.every((_, j) => P.flip[`${ch.id}|${st.i}|${j}`]);
      case 'quiz': return (P.quiz[`${ch.id}|${st.i}`] || 0) >= 60;
      case 'act': return !!P.act[`${ch.id}|act|${st.i}`];
      case 'lab': return !!P.lab[`${ch.id}|${st.i}`];
      default: return (P.test[ch.id] || 0) >= 70;
    }
  }
  function realSteps(ch) { const m = editMode; editMode = false; const s = stepsOf(ch); editMode = m; return s; }
  function chapterPct(ch, prog) {
    const saved = P; if (prog) P = prog;
    const s = realSteps(ch).filter((st) => countable(ch, st));
    const pct = s.length ? Math.round((s.filter((st) => stepDone(ch, st)).length / s.length) * 100) : 0;
    P = saved; return pct;
  }
  function overallPct(prog) {
    const saved = P; if (prog) P = prog;
    let all = 0; let done = 0;
    course.chapters.forEach((ch) => realSteps(ch).forEach((st) => { if (countable(ch, st)) { all++; if (stepDone(ch, st)) done++; } }));
    P = saved; return all ? Math.round((done / all) * 100) : 0;
  }
  function findContinue() {
    for (const ch of course.chapters) {
      const s = realSteps(ch);
      const idx = s.findIndex((st) => countable(ch, st) && !stepDone(ch, st));
      if (idx >= 0) return { ch, step: idx };
    }
    const last = course.chapters[course.chapters.length - 1];
    return { ch: last, step: 0 };
  }
  function learnStepIndex(ch, secIdx) { return realSteps(ch).findIndex((st) => st.type === 'learn' && st.i === secIdx); }

  // ---------- topbar / editbar ----------
  function renderTopbar() {
    const p = me();
    $('#whoBtn').innerHTML = p ? `<span class="av">${avatar(p.name)}</span> ${esc(p.name)}` : '👤 Who are you?';
    $('#xpPill').hidden = !p;
    const li = levelInfo();
    $('#xpPill').innerHTML = `<b>Lv ${li.lvl}</b> ${esc(li.title)} · ⭐ ${P.xp} XP<span class="xp-mini"><i style="width:${(li.into / XP_PER_LEVEL) * 100}%"></i></span>`;
    $('#soundBtn').textContent = P.sound ? '🔊' : '🔇';
    $('#soundBtn').title = P.sound ? 'Sound on' : 'Sound off';
    $('#editBtn').classList.toggle('on', editMode);
    $('#editBtn').textContent = editMode ? '✅ Done editing' : '✏️ Edit';
  }
  function updateEditBar() {
    $('#editbar').hidden = !editMode;
    $('#editState').textContent = hasEdits ? 'You have unpublished edits saved in this browser.' : 'No edits yet.';
    $('#localBanner').hidden = !hasEdits || editMode;
  }

  // ---------- router ----------
  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/');
    const page = ['glossary', 'progress', 'arcade', 'who'].includes(parts[0]) ? parts[0] : '';
    document.querySelectorAll('.topnav a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#/' + page));
    if (!me() || parts[0] === 'who') return renderWho();
    if (parts[0] === 'c') {
      const ch = course.chapters.find((c) => c.id === parts[1]);
      if (ch && parts[2] === 'all') return renderAllTerms(ch);
      if (ch) return renderChapter(ch, parseInt(parts[2] || '0', 10) || 0);
    }
    if (parts[0] === 'glossary') return renderGlossary();
    if (parts[0] === 'progress') return renderProgress();
    if (parts[0] === 'arcade') return renderArcade();
    renderHome();
  }
  function rerender() { const y = window.scrollY; route(); window.scrollTo(0, y); }
  window.addEventListener('hashchange', () => { stopBlitz(); ui.focusTerm = null; route(); window.scrollTo(0, 0); });

  // ---------- HOME / MAP ----------
  function renderHome() {
    cur = null;
    const li = levelInfo();
    const allTerms = course.chapters.reduce((n, c) => n + (c.sections || []).reduce((m, s) => m + s.terms.length, 0), 0);
    const learned = Object.keys(P.flip).length;
    const doneCh = course.chapters.filter((c) => chapterPct(c) === 100).length;
    const next = findContinue();
    const started = P.xp > 0;
    const nodes = course.chapters.map((c, i) => {
      const pct = chapterPct(c);
      return `<a class="node pos-${i % 4} ${pct === 100 ? 'complete' : ''}" href="#/c/${esc(c.id)}/0" style="--c:${esc(c.color)}">
        <span class="node-bubble" style="--p:${pct}"><span class="node-face"><span class="node-icon">${esc(c.icon)}</span></span><span class="node-num">${c.num}</span>${pct === 100 ? '<span class="node-star">⭐</span>' : ''}</span>
        <span class="node-label"><b>${esc(c.title)}</b>${c.he && c.he !== c.title ? `<small dir="rtl">${esc(c.he)}</small>` : ''}
          <span class="chips">${c.duration ? `<span class="chip">⏱ ${esc(c.duration)}</span>` : ''}${c.mode ? `<span class="chip">${esc(c.mode)}</span>` : ''}</span>
          <span class="mini-bar"><i style="width:${pct}%"></i></span></span></a>`;
    }).join('');
    app.innerHTML = `
      <section class="hero">
        <div class="hero-mascot">${MASCOT}<div class="bubble"><b>Hi ${esc(me().name)}!</b> ${esc(GREETINGS[Math.floor(Math.random() * GREETINGS.length)])}</div></div>
        <div class="hero-text">
          <h1>${esc(course.title)}</h1>
          <p class="lead">Your road from day one to production, one chapter at a time. Flip cards, crush quizzes, play mini-games and conquer the labs.</p>
          <div class="stats">
            <div class="stat" style="--c:#9966FF"><b>Lv ${li.lvl}</b><span>${esc(li.title)}</span></div>
            <div class="stat" style="--c:#FFAB19"><b>${P.xp}</b><span>XP</span></div>
            <div class="stat" style="--c:#59C059"><b>${learned}/${allTerms}</b><span>terms learned</span></div>
            <div class="stat" style="--c:#4C97FF"><b>${doneCh}/${course.chapters.length}</b><span>chapters done</span></div>
          </div>
          <a class="btn big" style="--c:#59C059" href="#/c/${esc(next.ch.id)}/${next.step}">▶ ${started ? 'Continue' : 'Start'}: ${esc(next.ch.title)}</a>
        </div>
      </section>
      <section class="map-wrap">
        <h2 class="map-title">🗺️ The road to Core Legend</h2>
        <div class="map" id="map"><svg class="map-path" aria-hidden="true"></svg>${nodes}
          ${editMode ? '<button class="btn" style="--c:#9966FF" data-act="chAdd">+ Add chapter</button>' : ''}
        </div>
      </section>`;
    requestAnimationFrame(drawPath);
  }
  function drawPath() {
    const map = $('#map'); if (!map) return;
    const svg = map.querySelector('.map-path');
    const r0 = map.getBoundingClientRect();
    const pts = [...map.querySelectorAll('.node-bubble')].map((b) => { const r = b.getBoundingClientRect(); return [r.left - r0.left + r.width / 2, r.top - r0.top + r.height / 2]; });
    svg.setAttribute('width', r0.width); svg.setAttribute('height', r0.height);
    let d = pts.length ? `M${pts[0][0]} ${pts[0][1]}` : '';
    for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1]; const [x1, y1] = pts[i]; const my = (y0 + y1) / 2; d += ` C${x0} ${my} ${x1} ${my} ${x1} ${y1}`; }
    svg.innerHTML = `<path d="${d}" />`;
  }
  window.addEventListener('resize', () => requestAnimationFrame(drawPath));

  // ---------- CHAPTER ----------
  function renderChapter(ch, stepIdx) {
    const steps = stepsOf(ch);
    stepIdx = Math.max(0, Math.min(stepIdx, steps.length - 1));
    cur = { ch, steps, stepIdx };
    const st = steps[stepIdx];
    app.innerHTML = `<div class="chapter" style="--c:${esc(ch.color)}">
      ${chapterHead(ch)}
      ${steps.length ? stepsNav(ch, steps, stepIdx) : ''}
      <div class="stage">${st ? renderStep(ch, st) : '<div class="empty">This chapter is empty. Turn on Edit mode to add sections.</div>'}</div>
      ${st ? stageNav(ch, steps, stepIdx) : ''}
    </div>`;
    if (ui.focusTerm) { const inp = app.querySelector(`.term-in[data-k="${ui.focusTerm}"], .focusable[data-k="${ui.focusTerm}"]`); if (inp) inp.focus({ preventScroll: true }); }
  }
  function chapterHead(ch) {
    const pct = chapterPct(ch);
    const view = `
      <div class="ch-head">
        <a href="#/" class="back">← Map</a>
        <div class="ch-title"><span class="ch-icon">${esc(ch.icon)}</span>
          <div><div class="ch-kicker">Chapter ${ch.num}${ch.duration ? ' · ⏱ ' + esc(ch.duration) : ''}${ch.mode ? ' · ' + esc(ch.mode) : ''}</div>
          <h1>${esc(ch.title)} ${ch.he && ch.he !== ch.title ? `<span class="he" dir="rtl">${esc(ch.he)}</span>` : ''}</h1></div></div>
        <div class="ch-progress"><div class="bar"><i style="width:${pct}%"></i></div><b>${pct}%</b></div>
        ${(ch.sections || []).length ? `<a class="btn sm" style="--c:#5CB1D6" href="#/c/${esc(ch.id)}/all">📋 All terms</a>` : ''}
      </div>`;
    if (!editMode) return view;
    return view + `
      <div class="edit-panel">
        <div class="edit-grid">
          <label>Title<input data-bind="title" value="${esc(ch.title)}"></label>
          <label>Hebrew name<input data-bind="he" dir="rtl" value="${esc(ch.he)}"></label>
          <label>Duration<input data-bind="duration" value="${esc(ch.duration)}"></label>
          <label>Mode<input data-bind="mode" value="${esc(ch.mode)}"></label>
          <label>Icon (emoji)<input data-bind="icon" value="${esc(ch.icon)}"></label>
          <label>Color<input type="color" data-bind="color" value="${esc(ch.color)}"></label>
        </div>
        <label>Intro<textarea data-bind="intro" rows="3">${esc(ch.intro)}</textarea></label>
        <div class="row">
          <button class="btn sm" data-act="secAdd" data-i="${(ch.sections || []).length - 1}">+ Section</button>
          <button class="btn sm" data-act="labAdd">+ Lab</button>
          <button class="btn sm" data-act="testToggle">${ch.test ? '− Remove chapter test' : '+ Chapter test'}</button>
          <button class="btn sm" style="--c:#5CB1D6" data-act="chJson">{ } Edit chapter JSON</button>
          <button class="btn sm ghost" data-act="chMove" data-d="-1">◀ Move earlier</button>
          <button class="btn sm ghost" data-act="chMove" data-d="1">Move later ▶</button>
          <button class="btn sm danger" data-act="chDel">Delete chapter</button>
        </div>
      </div>`;
  }
  function stepsNav(ch, steps, idx) {
    const items = steps.map((st, i) => {
      const m = stepMeta(ch, st); const done = !editMode && countable(ch, st) && stepDone(ch, st);
      return `<a class="step-dot t-${st.type} ${done ? 'done' : ''} ${i === idx ? 'cur' : ''}" href="#/c/${esc(ch.id)}/${i}" title="${esc(m.label)}"><span>${done ? '✔' : m.icon}</span></a>`;
    }).join('');
    const m = stepMeta(ch, steps[idx]);
    return `<nav class="steps" aria-label="Chapter steps">${items}</nav><div class="step-caption">Step ${idx + 1} of ${steps.length} · <b>${m.icon} ${esc(m.label)}</b></div>`;
  }
  function stageNav(ch, steps, idx) {
    const ci = course.chapters.indexOf(ch);
    const prev = idx > 0 ? `<a class="btn ghost" href="#/c/${esc(ch.id)}/${idx - 1}">← Back</a>` : '<a class="btn ghost" href="#/">← Map</a>';
    let next;
    if (idx < steps.length - 1) next = `<a class="btn" href="#/c/${esc(ch.id)}/${idx + 1}">Next →</a>`;
    else if (ci < course.chapters.length - 1) next = `<a class="btn" style="--c:#59C059" href="#/c/${esc(course.chapters[ci + 1].id)}/0">Next chapter: ${esc(course.chapters[ci + 1].title)} →</a>`;
    else next = '<a class="btn" style="--c:#59C059" href="#/">🏁 Back to map</a>';
    return `<div class="stage-nav">${prev}${next}</div>`;
  }
  function renderStep(ch, st) {
    switch (st.type) {
      case 'learn': return editMode ? learnEdit(ch, st.i) : learnStep(ch, st.i);
      case 'quiz': return editMode ? quizEdit(ch, `sections.${st.i}.quiz`, 'Mini quiz') : quizRun(ch, `${ch.id}|${st.i}`, ch.sections[st.i].quiz, 'quiz', st.i);
      case 'act': return actStep(ch, st.i);
      case 'lab': return labStep(ch, st.i);
      default: return testStep(ch);
    }
  }

  // ----- learn -----
  function introBubble(ch) {
    return ch.intro ? `<div class="intro">${MASCOT}<div class="bubble" dir="auto">${fmt(ch.intro)}</div></div>` : '';
  }
  function learnStep(ch, i) {
    const sec = ch.sections[i]; const base = `${ch.id}|${i}`;
    const seen = sec.terms.filter((_, j) => P.flip[`${base}|${j}`]).length;
    const all = seen === sec.terms.length;
    const flipped = ui.flipped[base] || (ui.flipped[base] = {});
    const cards = sec.terms.map((t, j) => `
      <button class="card ${flipped[j] ? 'flipped' : ''} ${P.flip[`${base}|${j}`] ? 'seen' : ''}" data-act="flip" data-j="${j}" style="--d:${j * 40}ms">
        <span class="card-inner">
          <span class="card-front"><span class="card-term" dir="auto">${esc(t.t)}</span><span class="card-tap">${P.flip[`${base}|${j}`] ? '✔ learned' : 'tap to flip ↻'}</span></span>
          <span class="card-back"><b dir="auto">${esc(t.t)}</b><span dir="auto">${fmt(t.d)}</span></span>
        </span></button>`).join('');
    const quizIdx = cur.steps.findIndex((s) => s.type === 'quiz' && s.i === i);
    return `${i === 0 ? introBubble(ch) : ''}
      <div class="stage-head"><h2 dir="auto">${esc(sec.title)}${sec.he ? ` <span class="he" dir="rtl">${esc(sec.he)}</span>` : ''}</h2>
        <div class="row"><span class="pill" id="flipCount">${seen}/${sec.terms.length} learned</span><button class="btn sm ghost" data-act="flipAll">Flip all ↻</button></div></div>
      <p class="hint">${all ? '🎉 All cards learned! ' + (quizIdx >= 0 ? `<a href="#/c/${esc(ch.id)}/${quizIdx}">Take the mini quiz →</a>` : '') : 'Tap a card to flip it. Learn them all to complete this section ✨'}</p>
      <div class="cards">${cards || '<div class="empty">No terms yet.</div>'}</div>
      ${researchNote(ch)}`;
  }
  function researchNote(ch) {
    return `<div class="research">🔎 <div><b>Cards are just the headline.</b> For each term, research online what really happens behind the scenes: the process, step by step, and why it exists. Could you explain it on a whiteboard?
      <a href="#/c/${esc(ch.id)}/all">Open 📋 All terms</a> for research shortcuts.</div></div>`;
  }
  function learnEdit(ch, i) {
    const sec = ch.sections[i]; const p = `sections.${i}`;
    const terms = sec.terms.map((t, j) => `
      <div class="edit-term">
        <input data-bind="${p}.terms.${j}.t" value="${esc(t.t)}" placeholder="Term" dir="auto">
        <textarea data-bind="${p}.terms.${j}.d" rows="2" placeholder="Explanation" dir="auto">${esc(t.d)}</textarea>
        <div class="col"><button class="icon-btn" title="Move up" data-act="termUp" data-i="${i}" data-j="${j}">↑</button><button class="icon-btn danger" title="Delete term" data-act="termDel" data-i="${i}" data-j="${j}">🗑</button></div>
      </div>`).join('');
    return `${i === 0 ? introBubble(ch) : ''}
      <div class="edit-panel">
        <div class="edit-grid"><label>Section title<input data-bind="${p}.title" value="${esc(sec.title)}"></label>
        <label>Hebrew subtitle (optional)<input data-bind="${p}.he" dir="rtl" value="${esc(sec.he || '')}"></label></div>
        <div class="row"><button class="btn sm" data-act="secAdd" data-i="${i}">+ Add section after</button>
          <button class="btn sm ghost" data-act="secUp" data-i="${i}">↑ Move section up</button>
          <button class="btn sm danger" data-act="secDel" data-i="${i}">Delete section</button></div>
      </div>
      <h3>Terms (${sec.terms.length})</h3>
      <div class="edit-terms">${terms}</div>
      <button class="btn" style="--c:#59C059" data-act="termAdd" data-i="${i}">+ Add term</button>`;
  }

  // ----- quiz engine (mini quizzes + chapter tests) -----
  function quizRun(ch, key, qs, kind, secIdx) {
    if (!qs || !qs.length) return '<div class="empty">No questions yet.</div>';
    let r = ui.runs[key];
    // each attempt shows the options in a fresh random order (answers are stored by original index)
    if (!r || r.n !== qs.length) r = ui.runs[key] = { idx: 0, ans: [], n: qs.length, finished: false, gained: 0, perm: qs.map((q) => shuffle(q.o.map((_, i) => i))) };
    const pass = kind === 'test' ? 70 : 60;
    const dots = qs.map((_, k) => `<i class="${r.ans[k] == null ? '' : (r.ans[k] === qs[k].a ? 'ok' : 'bad')} ${k === r.idx && !r.finished ? 'cur' : ''}"></i>`).join('');
    const title = kind === 'test' ? '🏆 Chapter test' : '❓ Mini quiz: ' + esc(ch.sections[secIdx].title);
    if (r.finished) {
      const right = r.ans.filter((a, k) => a === qs[k].a).length; const pct = Math.round((right / qs.length) * 100);
      const stars = pct === 100 ? 3 : pct >= pass ? 2 : pct > 0 ? 1 : 0;
      const best = kind === 'test' ? P.test[ch.id] : P.quiz[key];
      return `<div class="quiz"><h2>${title}</h2><div class="q-dots">${dots}</div>
        <div class="q-card result">
          <div class="stars">${[0, 1, 2].map((s) => `<span class="${s < stars ? 'on' : ''}" style="--d:${s * 150}ms">★</span>`).join('')}</div>
          <h3>${right} / ${qs.length} correct · ${pct}%</h3>
          <p>${pct === 100 ? 'Perfect score! You\'re on fire 🔥' : pct >= pass ? 'Passed! Nice work 👏' : `You need ${pass}% to pass. Have another look at the cards and try again 💪`}</p>
          <p class="muted">Best: ${best || 0}%${r.gained ? ` · +${r.gained} XP this round` : ''}</p>
          <div class="row center"><button class="btn ghost" data-act="qRetry" data-k="${esc(key)}">↻ Try again</button>
          ${cur.stepIdx < cur.steps.length - 1 ? `<a class="btn" style="--c:#59C059" href="#/c/${esc(ch.id)}/${cur.stepIdx + 1}">Continue →</a>` : ''}</div>
        </div></div>`;
    }
    const q = qs[r.idx]; const a = r.ans[r.idx]; const answered = a != null;
    const perm = (r.perm && r.perm[r.idx] && r.perm[r.idx].length === q.o.length) ? r.perm[r.idx] : q.o.map((_, i) => i);
    const opts = perm.map((k, pos) => {
      let cls = '';
      if (answered) cls = k === q.a ? 'correct' : (k === a ? 'wrong' : 'dim');
      return `<button class="opt ${cls}" data-act="answer" data-k="${esc(key)}" data-o="${k}" ${answered ? 'disabled' : ''}><span class="opt-key">${String.fromCharCode(65 + pos)}</span><span dir="auto">${fmt(q.o[k])}</span></button>`;
    }).join('');
    const ok = a === q.a;
    return `<div class="quiz" data-quiz="${esc(key)}"><h2>${title}</h2><div class="q-dots">${dots}</div>
      <div class="q-card ${answered ? (ok ? 'is-ok' : 'is-bad') : ''}">
        <div class="q-num">Question ${r.idx + 1} of ${qs.length}</div>
        <h3 dir="auto">${fmt(q.q)}</h3>
        <div class="opts">${opts}</div>
        ${answered ? `<div class="explain ${ok ? 'ok' : 'bad'}"><b>${ok ? '🎉 Correct!' : '🙈 Not quite.'}</b> <span dir="auto">${fmt(q.e || '')}</span></div>
          <div class="row end"><button class="btn" data-act="qNext" data-k="${esc(key)}">${r.idx < qs.length - 1 ? 'Next question →' : 'See results 🏁'}</button></div>` : '<p class="muted small">Tip: press 1–4 on your keyboard to answer.</p>'}
      </div></div>`;
  }
  function quizContext() {
    const ch = cur.ch; const st = cur.steps[cur.stepIdx];
    if (st.type === 'test') return { qs: ch.test.questions, kind: 'test', ch };
    return { qs: ch.sections[st.i].quiz, kind: 'quiz', ch };
  }
  function answer(key, o) {
    const r = ui.runs[key]; const { qs } = quizContext();
    if (!r || r.ans[r.idx] != null) return;
    r.ans[r.idx] = o;
    const ok = o === qs[r.idx].a; beep(ok);
    const qaKey = `${key}|${r.idx}`;
    if (ok && !P.qa[qaKey]) { P.qa[qaKey] = 1; r.gained += 10; addXP(10); }
    if (ok) confetti(18);
    rerender();
  }
  function quizNext(key) {
    const r = ui.runs[key]; const { qs, kind, ch } = quizContext();
    if (r.idx < qs.length - 1) { r.idx++; rerender(); return; }
    r.finished = true;
    const right = r.ans.filter((a, k) => a === qs[k].a).length; const pct = Math.round((right / qs.length) * 100);
    if (kind === 'test') {
      const firstPass = (P.test[ch.id] || 0) < 70 && pct >= 70;
      P.test[ch.id] = Math.max(P.test[ch.id] || 0, pct); saveP();
      if (firstPass) { r.gained += 100; addXP(100); confetti(150); toast('🏆 Chapter test passed!', 2500); }
    } else {
      const prev = P.quiz[key] || 0;
      P.quiz[key] = Math.max(prev, pct); saveP();
      if (pct === 100 && prev < 100) { r.gained += 15; addXP(15); confetti(90); }
    }
    rerender();
  }
  function quizEdit(ch, path, label) {
    const qs = getPath(ch, path) || [];
    const items = qs.map((q, k) => `
      <div class="edit-q">
        <div class="row between"><b>Question ${k + 1}</b><button class="icon-btn danger" data-act="qDel" data-p="${path}" data-k="${k}" title="Delete question">🗑</button></div>
        <textarea data-bind="${path}.${k}.q" rows="2" placeholder="Question" dir="auto">${esc(q.q)}</textarea>
        <div class="edit-opts">${q.o.map((o, n) => `
          <label class="edit-opt ${q.a === n ? 'is-correct' : ''}"><input type="radio" name="a-${path}-${k}" data-bindnum="${path}.${k}.a" value="${n}" ${q.a === n ? 'checked' : ''} title="Mark as correct">
          <input data-bind="${path}.${k}.o.${n}" value="${esc(o)}" placeholder="Option ${n + 1}" dir="auto">
          <button class="icon-btn" data-act="optDel" data-p="${path}" data-k="${k}" data-n="${n}" title="Remove option">✕</button></label>`).join('')}
          <button class="btn sm ghost" data-act="optAdd" data-p="${path}" data-k="${k}">+ option</button>
        </div>
        <input data-bind="${path}.${k}.e" value="${esc(q.e || '')}" placeholder="Explanation shown after answering" dir="auto">
      </div>`).join('');
    return `<h2>✏️ ${esc(label)} – edit questions</h2><p class="hint">Select the radio button next to the correct answer.</p>
      <div class="edit-qs">${items || '<div class="empty">No questions yet.</div>'}</div>
      <button class="btn" style="--c:#59C059" data-act="qAdd" data-p="${path}">+ Add question</button>`;
  }

  // ----- test -----
  function testStep(ch) {
    if (editMode) {
      if (!ch.test) return '<div class="empty">This chapter has no test. Use “+ Chapter test” above to add one.</div>';
      return `<div class="edit-panel"><label>Link to an outside test (optional, e.g. an online form)<input data-bind="test.url" value="${esc(ch.test.url || '')}" placeholder="https://…"></label></div>` + quizEdit(ch, 'test.questions', 'Chapter test');
    }
    if (hasTestQs(ch)) {
      return `<p class="hint">Pass mark: 70%. Good luck! 🍀</p>` + quizRun(ch, `${ch.id}|test`, ch.test.questions, 'test');
    }
    return `<div class="placeholder">
        <div class="trophy">🏆</div>
        <h2>Chapter test: coming soon</h2>
        <p>Your trainer will upload the <b>${esc(ch.title)}</b> test here.<br>In the meantime, get all the mini quizzes to ⭐⭐⭐!</p>
        ${ch.test && ch.test.url ? `<a class="btn big" target="_blank" rel="noopener" href="${esc(ch.test.url)}">Open the test ↗</a>` : ''}
      </div>`;
  }

  // ----- labs -----
  function labStep(ch, li) {
    const lab = ch.labs[li]; const key = `${ch.id}|${li}`;
    if (editMode) return labEdit(ch, li);
    const done = !!P.lab[key];
    const badge = { external: '🔗 Outside lab', checklist: '✅ Checklist', interactive: '🕹️ Interactive lab' }[lab.kind] || '🧪 Team lab';
    let body = '';
    if (lab.kind === 'external') {
      body = `<a class="btn big" target="_blank" rel="noopener" href="${esc(lab.url)}">Open lab ↗</a>`;
    } else if (lab.kind === 'interactive') {
      body = (lab.activities || []).map((a, ai) => renderActivity(a, `${ch.id}|lab${li}|${ai}`, { labKey: key, lab })).join('');
    } else {
      const steps = lab.steps || [];
      const nChecked = steps.filter((_, s) => P.checks[`${key}|${s}`]).length;
      body = steps.length ? `
        <div class="row between"><span class="pill">${nChecked}/${steps.length} steps</span>${lab.url ? `<a class="btn sm" style="--c:#5CB1D6" target="_blank" rel="noopener" href="${esc(lab.url)}">Open tool ↗</a>` : ''}</div>
        <ol class="checklist">${steps.map((s, k) => `<li><button class="check ${P.checks[`${key}|${k}`] ? 'on' : ''}" data-act="check" data-k="${esc(key)}" data-s="${k}" aria-pressed="${!!P.checks[`${key}|${k}`]}"><span class="box">${P.checks[`${key}|${k}`] ? '✔' : ''}</span><span class="txt" dir="auto">${fmt(s)}</span></button></li>`).join('')}</ol>`
        : '<div class="placeholder small"><div class="trophy">🚧</div><p>Lab tasks coming soon. Your trainer will add them here.</p></div>';
    }
    const markBtn = lab.kind === 'interactive' ? '' : `<div class="row end"><button class="btn ${done ? 'ghost' : ''}" style="--c:#59C059" data-act="labDone" data-k="${esc(key)}">${done ? '✔ Completed (undo)' : '🏁 Mark lab as complete'}</button></div>`;
    return `<div class="lab k-${esc(lab.kind)} ${done ? 'is-done' : ''}">
      <div class="lab-head"><span class="lab-badge">${badge}</span>${done ? '<span class="done-badge">✔ Done</span>' : ''}</div>
      <h2 dir="auto">${esc(lab.title)}</h2>${lab.he ? `<div class="he" dir="rtl">${esc(lab.he)}</div>` : ''}
      ${lab.desc ? `<p class="lab-desc" dir="auto">${fmt(lab.desc)}</p>` : ''}
      ${body}${markBtn}</div>`;
  }
  function labEdit(ch, li) {
    const lab = ch.labs[li]; const p = `labs.${li}`;
    return `<div class="edit-panel">
      <div class="edit-grid">
        <label>Title<input data-bind="${p}.title" value="${esc(lab.title)}"></label>
        <label>Hebrew title (optional)<input data-bind="${p}.he" dir="rtl" value="${esc(lab.he || '')}"></label>
        <label>Kind<select data-bind="${p}.kind" data-rerender="1">${['internal', 'external', 'checklist', 'interactive'].map((k) => `<option ${lab.kind === k ? 'selected' : ''}>${k}</option>`).join('')}</select></label>
        <label>Link (URL)<input data-bind="${p}.url" value="${esc(lab.url || '')}" placeholder="https://…"></label>
      </div>
      <label>Description<textarea data-bind="${p}.desc" rows="3" dir="auto">${esc(lab.desc || '')}</textarea></label>
      ${lab.kind === 'interactive' ? '<p class="hint">This lab contains mini-games. Edit them with “{ } Edit chapter JSON” above.</p>'
        : lab.kind === 'external' ? '' : `<label>Steps (one per line; wrap commands in \`backticks\`)<textarea data-bindlines="${p}.steps" rows="10" dir="auto">${esc((lab.steps || []).join('\n'))}</textarea></label>`}
      <div class="row"><button class="btn sm danger" data-act="labDel" data-i="${li}">Delete lab</button></div>
    </div>` + (lab.kind === 'interactive' ? (lab.activities || []).map((a, ai) => renderActivity(a, `${ch.id}|lab${li}|${ai}`, {})).join('') : '');
  }

  // ----- activities (mini-games) -----
  function actStep(ch, i) {
    const a = ch.activities[i];
    const edit = editMode ? `<div class="edit-panel"><p class="hint">Mini-games are edited through “{ } Edit chapter JSON” (the <code>activities</code> list).</p>
      <button class="btn sm danger" data-act="actDel" data-i="${i}">Delete this mini-game</button></div>` : '';
    return edit + renderActivity(a, `${ch.id}|act|${i}`, {});
  }
  const GAME_TYPES = {
    sort: ['🧺', 'Sort it', sortAct], pick: ['☑️', 'Pick all', pickAct], terminal: ['⌨️', 'Terminal', termAct], raid: ['💽', 'RAID builder', raidAct],
    order: ['🔢', 'Put in order', orderAct], match: ['🔗', 'Match-up', matchAct], memory: ['🧠', 'Memory', memoryAct], truefalse: ['⚖️', 'True or false', tfAct],
    fill: ['✍️', 'Fill the gap', fillAct], subnet: ['🧮', 'Subnetting', subnetAct], chmod: ['🔐', 'Permissions', chmodAct], blitz: ['⚡', 'Speed round', blitzAct],
    connections: ['🟪', 'Connections', connAct], wordguess: ['🟩', 'Word Guess', wordGuessAct], pinpoint: ['📍', 'Pinpoint', ppAct]
  };
  function renderActivity(a, key, meta) {
    ui.meta[key] = Object.assign({ a, ch: cur && cur.ch }, meta);
    const done = !!P.act[key]; const T = GAME_TYPES[a.type];
    const inner = T ? T[2](a, key) : `<div class="empty">Unknown mini-game type “${esc(a.type)}”.</div>`;
    return `<div class="activity g-${esc(a.type)} ${done ? 'is-done' : ''}">
      <div class="act-head"><span class="act-badge">${T ? T[0] + ' ' + T[1] : '🎮 Mini-game'}</span>${done ? '<span class="done-badge">✔ Completed</span>' : ''}</div>
      <h2 dir="auto">${esc(a.title)}</h2>${a.desc ? `<p class="act-desc" dir="auto">${fmt(a.desc)}</p>` : ''}${inner}</div>`;
  }
  function completeAct(key) {
    if (!P.act[key]) { P.act[key] = 1; saveP(); addXP(30); confetti(100); beep(true); }
    const m = ui.meta[key];
    if (m && m.labKey && m.lab) {
      const [chId, labPart] = key.split('|');
      const allDone = (m.lab.activities || []).every((_, ai) => P.act[`${chId}|${labPart}|${ai}`]);
      if (allDone && !P.lab[m.labKey]) {
        P.lab[m.labKey] = 1; if (!P.labxp[m.labKey]) { P.labxp[m.labKey] = 1; setTimeout(() => addXP(50), 700); }
        saveP(); setTimeout(() => { toast('🏁 Lab complete! Amazing work', 2600); confetti(150); }, 600);
      }
    }
    rerender();
  }

  // sort
  function sortState(a, key) {
    return ui.act[key] || (ui.act[key] = { order: shuffle(a.items.map((_, i) => i)), placed: {}, sel: null, checked: false });
  }
  function sortAct(a, key) {
    const s = sortState(a, key);
    const k = esc(key);
    const pool = s.order.filter((i) => s.placed[i] == null).map((i) => `<button class="chipbtn ${s.sel === i ? 'sel' : ''}" draggable="true" data-act="sortSel" data-k="${k}" data-i="${i}" dir="auto">${esc(a.items[i].text)}</button>`).join('');
    const allPlaced = a.items.every((_, i) => s.placed[i] != null);
    const buckets = a.buckets.map((b, bi) => `
      <div class="bucket ${s.sel != null ? 'armed' : ''}" data-act="sortDrop" data-k="${k}" data-b="${bi}" data-drop="1">
        <div class="bucket-title" dir="auto">${esc(b)}</div>
        <div class="bucket-items">${s.order.filter((i) => s.placed[i] === bi).map((i) => `<button class="chipbtn placed ${s.checked ? (a.items[i].b === bi ? 'ok' : 'bad') : ''}" draggable="true" data-act="sortBack" data-k="${k}" data-i="${i}" title="Click to take back" dir="auto">${esc(a.items[i].text)}</button>`).join('')}</div>
      </div>`).join('');
    return `<div class="pool">${pool || '<span class="muted">All placed! Hit Check ✔</span>'}</div>
      <div class="buckets" style="--n:${a.buckets.length}">${buckets}</div>
      <div class="row end"><button class="btn ghost" data-act="actReset" data-k="${k}">↺ Reset</button><button class="btn" style="--c:#59C059" data-act="sortCheck" data-k="${k}" ${allPlaced ? '' : 'disabled'}>Check ✔</button></div>`;
  }
  function sortPlace(key, i, b) {
    const s = ui.act[key]; if (!s) return;
    s.placed[i] = b; s.sel = null; s.checked = false; rerender();
  }

  // order: steps are stored in the correct order; the player rebuilds the sequence
  function orderAct(a, key) {
    const s = ui.act[key] || (ui.act[key] = { pool: shuffle(a.steps.map((_, i) => i)), seq: [], checked: false });
    const k = esc(key);
    const seq = s.seq.map((i, pos) => `<li><button class="ord-step ${s.checked ? (i === pos ? 'ok' : 'bad') : ''}" data-act="ordBack" data-k="${k}" data-p="${pos}" title="Click to take back">
      <span class="ord-n">${pos + 1}</span><span dir="auto">${fmt(a.steps[i])}</span></button></li>`).join('');
    const pool = s.pool.filter((i) => !s.seq.includes(i)).map((i) => `<button class="ord-opt" data-act="ordAdd" data-k="${k}" data-i="${i}" dir="auto">${fmt(a.steps[i])}</button>`).join('');
    const full = s.seq.length === a.steps.length;
    return `<div class="order">
      <ol class="ord-seq">${seq || '<li class="muted ord-empty">Click the steps below, in order 👇</li>'}</ol>
      <div class="ord-pool">${pool || '<span class="muted">All steps placed! Hit Check ✔</span>'}</div></div>
      <div class="row end"><button class="btn ghost" data-act="actReset" data-k="${k}">↺ Reset</button><button class="btn" style="--c:#59C059" data-act="ordCheck" data-k="${k}" ${full ? '' : 'disabled'}>Check ✔</button></div>`;
  }

  const rnd = (n) => Math.floor(Math.random() * n);

  // match: connect left items to right items
  function matchAct(a, key) {
    const idx = a.pairs.map((_, i) => i);
    const s = ui.act[key] || (ui.act[key] = { left: shuffle(idx), right: shuffle(idx), sel: null, done: {}, miss: 0, bad: null });
    const k = esc(key); const n = Object.keys(s.done).length;
    const L = s.left.map((i) => `<button class="m-item ${s.done[i] ? 'done' : ''} ${s.sel === i ? 'sel' : ''}" data-act="mL" data-k="${k}" data-i="${i}" ${s.done[i] ? 'disabled' : ''} dir="auto">${esc(a.pairs[i][0])}</button>`).join('');
    const R = s.right.map((i) => `<button class="m-item r ${s.done[i] ? 'done' : ''} ${s.bad === i ? 'bad' : ''}" data-act="mR" data-k="${k}" data-i="${i}" ${s.done[i] ? 'disabled' : ''} dir="auto">${esc(a.pairs[i][1])}</button>`).join('');
    return `<div class="row between"><span class="pill">${n}/${a.pairs.length} matched</span><span class="muted small">Mistakes: ${s.miss}</span></div>
      <div class="match-grid"><div class="m-col">${L}</div><div class="m-col">${R}</div></div>
      <div class="row end"><button class="btn ghost" data-act="actReset" data-k="${k}">↺ Reset</button></div>`;
  }

  // memory: classic pairs
  function memoryAct(a, key) {
    const s = ui.act[key] || (ui.act[key] = { cards: shuffle(a.pairs.flatMap((_, p) => [{ p, x: 0 }, { p, x: 1 }])), open: [], got: {}, moves: 0, lock: false });
    const k = esc(key);
    const cards = s.cards.map((c, ci) => {
      const up = s.open.includes(ci) || s.got[c.p];
      return `<button class="mem ${up ? 'up' : ''} ${s.got[c.p] ? 'got' : ''}" data-act="memFlip" data-k="${k}" data-c="${ci}" aria-label="${up ? esc(a.pairs[c.p][c.x]) : 'Hidden card'}">
        <span class="mem-in"><span class="mem-back">?</span><span class="mem-face x${c.x}" dir="auto">${esc(a.pairs[c.p][c.x])}</span></span></button>`;
    }).join('');
    return `<div class="row between"><span class="pill">${Object.keys(s.got).length}/${a.pairs.length} pairs</span><span class="muted small">Moves: ${s.moves}</span></div>
      <div class="mem-grid">${cards}</div><div class="row end"><button class="btn ghost" data-act="actReset" data-k="${k}">↺ Shuffle & restart</button></div>`;
  }

  // true / false with lives
  function tfAct(a, key) {
    const s = ui.act[key] || (ui.act[key] = { order: shuffle(a.items.map((_, i) => i)), i: 0, lives: 3, score: 0, fb: null, over: false, won: false });
    const k = esc(key); const n = a.items.length;
    const hearts = '❤️'.repeat(s.lives) + '🤍'.repeat(3 - s.lives);
    const head = `<div class="row between"><span class="hearts" aria-label="${s.lives} lives">${hearts}</span><span class="pill">${Math.min(s.i + 1, n)}/${n} · ✔ ${s.score}</span></div>`;
    if (s.over) return head + `<div class="tf-card end"><div class="big-emoji">💔</div><h3>Out of lives!</h3><p>You got ${s.score} right. Read the explanations and try again.</p><button class="btn" data-act="actReset" data-k="${k}">↻ Try again</button></div>`;
    if (s.won) return head + `<div class="tf-card end"><div class="big-emoji">🏆</div><h3>You survived with ${s.lives} ${s.lives === 1 ? 'life' : 'lives'}!</h3><p>${s.score}/${n} correct.</p><button class="btn ghost" data-act="actReset" data-k="${k}">↻ Play again</button></div>`;
    const it = a.items[s.order[s.i]];
    return head + `<div class="tf-card ${s.fb ? (s.fb.ok ? 'is-ok' : 'is-bad') : ''}"><p class="tf-s" dir="auto">${fmt(it.s)}</p>
      ${s.fb ? `<div class="explain ${s.fb.ok ? 'ok' : 'bad'}"><b>${s.fb.ok ? '🎉 Correct!' : `🙈 Nope, it's ${it.ok ? 'TRUE' : 'FALSE'}.`}</b> <span dir="auto">${fmt(it.e || '')}</span></div>
        <div class="row end"><button class="btn" data-act="tfNext" data-k="${k}">Next →</button></div>`
        : `<div class="tf-btns"><button class="btn big" style="--c:#59C059" data-act="tfAns" data-k="${k}" data-v="1">✅ True</button><button class="btn big" style="--c:#FF5C6C" data-act="tfAns" data-k="${k}" data-v="0">❌ False</button></div>`}</div>`;
  }

  // fill the gap
  function fillAct(a, key) {
    const s = ui.act[key] || (ui.act[key] = { i: 0, fails: 0, order: shuffle(a.items.map((_, i) => i)) });
    const k = esc(key); const n = a.items.length; const items = s.order.map((i) => a.items[i]);
    const fill = (q, w) => esc(q).replace('___', `<b class="fill-word">${esc(w)}</b>`);
    const done = items.slice(0, s.i).map((it) => `<div class="fill-row ok" dir="auto">✔ ${fill(it.q, it.a[0])}</div>`).join('');
    let live = `<div class="fill-row win">🏆 All gaps filled. Nice!</div>`;
    if (s.i < n) {
      const it = items[s.i]; const [before, after] = it.q.split('___');
      live = `<div class="fill-row cur ${s.fails ? 'is-bad' : ''}" dir="auto">${esc(before)}<input class="fill-in focusable" data-k="${k}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Missing word" size="${Math.max(6, it.a[0].length + 2)}">${esc(after || '')}</div>
        <div class="row end">${s.fails >= 2 ? `<span class="muted small">💡 Answer: <code>${esc(it.a[0])}</code></span>` : s.fails ? '<span class="muted small">Not quite. Try again!</span>' : ''}
        <button class="btn" style="--c:#59C059" data-act="fillCheck" data-k="${k}">Check ✔</button></div>`;
    }
    return `<div class="row between"><span class="pill">${s.i}/${n} filled</span><button class="btn sm ghost" data-act="actReset" data-k="${k}">↺ Restart</button></div><div class="fill">${done}${live}</div>`;
  }
  function fillSubmit(key, val) {
    const s = ui.act[key]; const a = ui.meta[key].a; if (!s || s.i >= a.items.length || !val.trim()) return;
    if (a.items[s.order[s.i]].a.some((x) => norm(x) === norm(val))) {
      s.i++; s.fails = 0; beep(true);
      if (s.i >= a.items.length) { ui.focusTerm = null; completeAct(key); return; }
    } else { s.fails++; beep(false); }
    ui.focusTerm = key; rerender();
  }

  // subnetting
  const ipStr = (n) => [24, 16, 8, 0].map((b) => (n >>> b) & 255).join('.');
  function genSubnet() {
    const pre = 20 + rnd(11); const r = Math.random(); let ip;
    if (r < 0.34) ip = ((10 << 24) | (rnd(256) << 16) | (rnd(256) << 8) | rnd(256)) >>> 0;
    else if (r < 0.67) ip = ((172 << 24) | ((16 + rnd(16)) << 16) | (rnd(256) << 8) | rnd(256)) >>> 0;
    else ip = ((192 << 24) | (168 << 16) | (rnd(256) << 8) | rnd(256)) >>> 0;
    const mask = (0xFFFFFFFF << (32 - pre)) >>> 0; const net = (ip & mask) >>> 0; const bc = (net | (~mask >>> 0)) >>> 0;
    return { ip: ipStr(ip), pre, mask: ipStr(mask), net: ipStr(net), bc: ipStr(bc), hosts: String(2 ** (32 - pre) - 2) };
  }
  const SN_FIELDS = [['mask', 'Subnet mask'], ['net', 'Network address'], ['bc', 'Broadcast address'], ['hosts', 'Usable hosts']];
  function subnetAct(a, key) {
    const s = ui.act[key] || (ui.act[key] = { r: genSubnet(), vals: {}, res: null, tries: 0, solved: 0, revealed: false });
    const k = esc(key); const rounds = a.rounds || 5; const allOk = s.res && SN_FIELDS.every(([f]) => s.res[f]);
    const fields = SN_FIELDS.map(([f, label]) => `<label class="sn-f ${s.res ? (s.res[f] ? 'ok' : 'bad') : ''}">${label}
      <input class="sn-in" data-k="${k}" data-sv="${f}" value="${esc(s.vals[f] || '')}" autocomplete="off" spellcheck="false" inputmode="${f === 'hosts' ? 'numeric' : 'decimal'}" placeholder="${f === 'hosts' ? 'e.g. 62' : 'e.g. 10.0.0.0'}"></label>`).join('');
    const done = s.solved >= rounds;
    return `<div class="row between"><span class="pill">Solved ${Math.min(s.solved, rounds)}/${rounds}</span><span class="muted small">Tip: block size = 256 − the "interesting" mask octet</span></div>
      <div class="sn-q"><span class="muted">Your target:</span> <b>${s.r.ip} /${s.r.pre}</b></div>
      <div class="sn-grid">${fields}</div>
      ${s.revealed ? '<p class="hint">Answers revealed. Study them, then go to the next subnet (it doesn\'t count).</p>' : ''}
      <div class="row end">${!allOk && s.tries >= 2 && !s.revealed ? `<button class="btn ghost" data-act="snReveal" data-k="${k}">👀 Reveal</button>` : ''}
        ${allOk || s.revealed ? `<button class="btn" data-act="snNext" data-k="${k}">${done ? 'Keep practicing →' : 'Next subnet →'}</button>` : `<button class="btn" style="--c:#59C059" data-act="snCheck" data-k="${k}">Check ✔</button>`}</div>`;
  }
  function snCheck(key) {
    const s = ui.act[key]; const a = ui.meta[key].a; if (!s || s.revealed) return;
    s.res = {}; SN_FIELDS.forEach(([f]) => { s.res[f] = norm(s.vals[f] || '') === s.r[f]; }); s.tries++;
    if (SN_FIELDS.every(([f]) => s.res[f])) {
      s.solved++; beep(true); confetti(30); toast('🎯 Bullseye!');
      if (s.solved === (a.rounds || 5)) { completeAct(key); return; }
    } else beep(false);
    rerender();
  }

  // chmod permissions
  const symPerm = (p) => 'rwxrwxrwx'.split('').map((c, i) => ((p >> (8 - i)) & 1 ? c : '-')).join('');
  const numPerm = (p) => `${(p >> 6) & 7}${(p >> 3) & 7}${p & 7}`;
  function genChmod() { const o = [7, 6, 5, 4, 0]; return { perm: [7, 6, 5][rnd(3)] * 64 + o[rnd(5)] * 8 + o[rnd(5)], mode: Math.random() < 0.5 ? 'num' : 'grid' }; }
  function chmodAct(a, key) {
    const s = ui.act[key] || (ui.act[key] = { r: genChmod(), bits: 0, vals: {}, solved: 0, bad: false });
    const k = esc(key); const rounds = a.rounds || 6; const p = s.r.perm;
    const grid = (bits, live) => `<div class="perm-grid">${['Owner', 'Group', 'Others'].map((who, row) => `<span class="perm-who">${who}</span>${['r', 'w', 'x'].map((c, col) => {
      const b = 8 - (row * 3 + col); const on = (bits >> b) & 1;
      return live ? `<button class="perm-bit ${on ? 'on' : ''}" data-act="chBit" data-k="${k}" data-b="${b}" aria-pressed="${!!on}">${c}</button>` : `<span class="perm-bit ${on ? 'on' : ''}">${on ? c : '-'}</span>`;
    }).join('')}`).join('')}</div>`;
    const body = s.r.mode === 'num'
      ? `<p>This file shows <code>-${symPerm(p)}</code>. What's the chmod number?</p>${grid(p, false)}
         <label class="sn-f ${s.bad ? 'bad' : ''}">Number<input class="sn-in ch-in" data-k="${k}" data-sv="num" value="${esc(s.vals.num || '')}" inputmode="numeric" maxlength="3" placeholder="e.g. 640" autocomplete="off"></label>`
      : `<p>Paint the permissions for <code>chmod ${numPerm(p)} file</code>:</p>${grid(s.bits, true)}<p class="muted small">Preview: <code>-${symPerm(s.bits)}</code> = ${numPerm(s.bits)}</p>`;
    return `<div class="row between"><span class="pill">Won ${Math.min(s.solved, rounds)}/${rounds}</span><span class="muted small">r = 4 · w = 2 · x = 1</span></div>
      <div class="chmod ${s.bad ? 'is-bad' : ''}">${body}</div>
      <div class="row end"><button class="btn" style="--c:#59C059" data-act="chCheck" data-k="${k}">Check ✔</button></div>`;
  }
  function chCheck(key) {
    const s = ui.act[key]; const a = ui.meta[key].a;
    const ok = s.r.mode === 'num' ? norm(s.vals.num || '') === numPerm(s.r.perm) : s.bits === s.r.perm;
    if (ok) {
      s.solved++; beep(true); toast(s.r.mode === 'num' ? '✔ Right number!' : '✔ Perfectly painted!');
      s.r = genChmod(); s.bits = 0; s.vals = {}; s.bad = false;
      if (s.solved === (a.rounds || 6)) { completeAct(key); return; }
    } else { s.bad = true; beep(false); toast('Not quite. Remember r=4, w=2, x=1 and add them per group.', 2400); }
    rerender();
  }

  // term blitz: 60s speed round built from the chapter's own terms
  const baseTerm = (t) => t.replace(/\(.*?\)/g, ' ').trim();
  const reEsc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  function maskDef(t) {
    let d = t.d;
    baseTerm(t.t).split(/\s*[/,&]\s*|\s+vs\s+/i).map((w) => w.trim()).filter((w) => w.length > 2).forEach((w) => { d = d.replace(new RegExp(reEsc(w), 'gi'), '▢▢▢'); });
    return d;
  }
  const blitzPool = (ch) => (ch.sections || []).flatMap((s) => s.terms).filter((t) => t.t && t.d);
  function blitzQ(pool) { const ai = rnd(pool.length); return { ai, opts: shuffle([ai, ...shuffle(pool.map((_, i) => i).filter((i) => i !== ai)).slice(0, 3)]) }; }
  function blitzAct(a, key) {
    const s = ui.act[key] || (ui.act[key] = { phase: 'ready', score: 0, wrong: 0, end: 0, q: null, flash: null });
    const k = esc(key); const target = a.target || 10; const best = (P.blitz || {})[key] || 0;
    const pool = blitzPool(ui.meta[key].ch || {});
    if (pool.length < 4) return '<div class="empty">This chapter needs at least 4 terms for a blitz.</div>';
    if (s.phase === 'ready' || s.phase === 'over') {
      const over = s.phase === 'over';
      return `<div class="blitz-start">${over ? `<div class="big-emoji">${s.score >= target ? '🏆' : '⏰'}</div><h3>Time! You scored ${s.score}</h3><p>${s.score >= target ? 'Target smashed!' : `Target is ${target}. So close, go again!`} · ✘ ${s.wrong} wrong</p>` : `<div class="big-emoji">⚡</div><h3>60 seconds. How many can you get?</h3><p>Target: <b>${target}</b> correct.</p>`}
        <p class="muted">Your best: ${best}</p><button class="btn big" style="--c:#FFAB19" data-act="blitzStart" data-k="${k}">${over ? '↻ Play again' : '▶ Start!'}</button></div>`;
    }
    const left = Math.max(0, Math.ceil((s.end - Date.now()) / 1000));
    return `<div class="blitz ${s.flash ? 'f-' + s.flash : ''}"><div class="row between"><span class="pill">⏱ <b data-blitz-time="${k}">${left}</b>s</span><span class="pill">✔ ${s.score} · ✘ ${s.wrong}</span></div>
      <div class="blitz-def" dir="auto">${fmt(maskDef(pool[s.q.ai]))}</div>
      <div class="blitz-opts">${s.q.opts.map((o) => `<button class="opt" data-act="blitzAns" data-k="${k}" data-o="${o}" dir="auto">${esc(pool[o].t)}</button>`).join('')}</div></div>`;
  }
  function stopBlitz() {
    if (ui.blitzTimer) { clearInterval(ui.blitzTimer); ui.blitzTimer = null; }
    Object.values(ui.act).forEach((s) => { if (s && s.phase === 'play') s.phase = 'ready'; });
  }
  function blitzTick(key) {
    const s = ui.act[key]; if (!s || s.phase !== 'play') return;
    const left = Math.max(0, Math.ceil((s.end - Date.now()) / 1000));
    const el = app.querySelector(`[data-blitz-time="${key}"]`); if (el) el.textContent = left;
    if (left > 0) return;
    clearInterval(ui.blitzTimer); ui.blitzTimer = null; s.phase = 'over';
    P.blitz = P.blitz || {}; P.blitz[key] = Math.max(P.blitz[key] || 0, s.score); saveP();
    if (s.score >= (ui.meta[key].a.target || 10)) completeAct(key); else rerender();
  }

  // connections: find 4 groups of 4
  const CN_COLORS = ['#F9DF6D', '#A0C35A', '#B0C4EF', '#BA81C5'];
  function connAct(a, key) {
    const flat = a.groups.flatMap((g, gi) => g.items.map((t) => ({ t, g: gi })));
    const s = ui.act[key] || (ui.act[key] = { order: shuffle(flat.map((_, i) => i)), sel: [], solved: [], mistakes: 0, tried: [], lost: false, shake: false });
    const k = esc(key);
    const solved = s.solved.map((gi) => `<div class="cn-group" style="background:${CN_COLORS[gi % 4]}"><b>${esc(a.groups[gi].name)}</b><span>${a.groups[gi].items.map(esc).join(', ')}</span></div>`).join('');
    const tiles = s.order.filter((i) => !s.solved.includes(flat[i].g)).map((i) => `<button class="cn-tile ${s.sel.includes(i) ? 'sel' : ''} ${s.shake && s.sel.includes(i) ? 'shake' : ''}" data-act="cnTile" data-k="${k}" data-i="${i}" ${s.lost ? 'disabled' : ''}>${esc(flat[i].t)}</button>`).join('');
    s.shake = false;
    const left = 4 - s.mistakes;
    const foot = s.lost ? `<div class="row center"><span>😅 Out of mistakes. Study the groups and try again!</span><button class="btn" data-act="actReset" data-k="${k}">↻ Try again</button></div>`
      : s.solved.length === a.groups.length ? `<div class="row center"><span>🏆 Solved with ${s.mistakes} mistake${s.mistakes === 1 ? '' : 's'}!</span><button class="btn ghost" data-act="actReset" data-k="${k}">↻ Play again</button></div>`
        : `<div class="cn-mistakes">Mistakes remaining: ${'<i class="on"></i>'.repeat(left)}${'<i></i>'.repeat(4 - left)}</div>
          <div class="row center"><button class="btn ghost" data-act="cnShuffle" data-k="${k}">🔀 Shuffle</button><button class="btn ghost" data-act="cnClear" data-k="${k}" ${s.sel.length ? '' : 'disabled'}>Deselect all</button><button class="btn" data-act="cnSubmit" data-k="${k}" ${s.sel.length === 4 ? '' : 'disabled'}>Submit</button></div>`;
    return `<div class="cn">${solved}<div class="cn-grid">${tiles}</div></div>${foot}`;
  }
  function cnSubmit(key) {
    const s = ui.act[key]; const a = ui.meta[key].a;
    const flat = a.groups.flatMap((g, gi) => g.items.map((t) => ({ t, g: gi })));
    const sig = s.sel.slice().sort((x, y) => x - y).join(',');
    if (s.tried.includes(sig)) { toast('Already guessed!'); return; }
    s.tried.push(sig);
    const gs = s.sel.map((i) => flat[i].g);
    if (gs.every((g) => g === gs[0])) {
      s.solved.push(gs[0]); s.sel = []; beep(true); confetti(25);
      if (s.solved.length === a.groups.length) { completeAct(key); return; }
    } else {
      const counts = {}; gs.forEach((g) => { counts[g] = (counts[g] || 0) + 1; });
      s.mistakes++; s.shake = true; beep(false);
      if (Math.max(...Object.values(counts)) === 3) toast('One away… 🤏');
      if (s.mistakes >= 4) { s.lost = true; s.sel = []; a.groups.forEach((_, gi) => { if (!s.solved.includes(gi)) s.solved.push(gi); }); }
    }
    rerender();
  }

  // word guess: 6 tries, green = right spot, yellow = in the word
  function wdScore(guess, word) {
    const res = Array(word.length).fill('b'); const left = {};
    word.split('').forEach((c, i) => { if (guess[i] === c) res[i] = 'g'; else left[c] = (left[c] || 0) + 1; });
    guess.split('').forEach((c, i) => { if (res[i] !== 'g' && left[c]) { res[i] = 'y'; left[c]--; } });
    return res;
  }
  function wdNew(a, prev) {
    let wi = rnd(a.words.length); if (a.words.length > 1) while (wi === prev) wi = rnd(a.words.length);
    return { wi, guesses: [], cur: '', over: false, won: false, hint: false };
  }
  function wordGuessAct(a, key) {
    const s = ui.act[key] || (ui.act[key] = Object.assign(wdNew(a, -1), { wins: 0 }));
    const k = esc(key); const word = a.words[s.wi].w.toUpperCase(); const L = word.length;
    const rows = [];
    for (let r = 0; r < 6; r++) {
      const g = s.guesses[r]; const sc = g ? wdScore(g, word) : null; const typing = !g && r === s.guesses.length && !s.over;
      rows.push(`<div class="wd-row">${Array.from({ length: L }, (_, i) => {
        const ch = g ? g[i] : typing ? (s.cur[i] || '') : '';
        return `<span class="wd-cell ${sc ? 'c-' + sc[i] : ch ? 'filled' : ''}" style="--d:${i * 90}ms">${ch}</span>`;
      }).join('')}</div>`);
    }
    const keyState = {};
    s.guesses.forEach((g) => wdScore(g, word).forEach((r, i) => { const c = g[i]; const rank = { g: 3, y: 2, b: 1 }; if (!keyState[c] || rank[r] > rank[keyState[c]]) keyState[c] = r; }));
    const kb = ['QWERTYUIOP', 'ASDFGHJKL', '↵ZXCVBNM⌫'].map((row) => `<div class="kb-row">${row.split('').map((c) => {
      const label = c === '↵' ? 'Enter' : c === '⌫' ? '⌫' : c;
      return `<button class="kb-key ${c === '↵' || c === '⌫' ? 'wide' : ''} ${keyState[c] ? 'c-' + keyState[c] : ''}" data-act="wdKey" data-k="${k}" data-key="${c}">${label}</button>`;
    }).join('')}</div>`).join('');
    const status = s.won ? `<div class="wd-msg ok">🎉 Got it in ${s.guesses.length}! <b>${word}</b></div>`
      : s.over ? `<div class="wd-msg bad">The word was <b>${word}</b>. ${esc(a.words[s.wi].hint || '')}</div>` : '';
    return `<div class="wordguess" data-wordguess="${k}">
      <div class="row between"><span class="pill">${L} letters · wins: ${s.wins}</span>
        ${s.hint || s.over || s.won ? `<span class="muted small">💡 ${esc(a.words[s.wi].hint || '')}</span>` : `<button class="btn sm ghost" data-act="wdHint" data-k="${k}">💡 Hint</button>`}</div>
      <div class="wd-board" style="--L:${L}">${rows.join('')}</div>${status}
      ${s.over || s.won ? `<div class="row center"><button class="btn" data-act="wdNext" data-k="${k}">▶ Another word</button></div>` : `<div class="kb">${kb}</div><p class="muted small center">You can also type on your keyboard.</p>`}</div>`;
  }
  function wdKey(key, c) {
    const s = ui.act[key]; const a = ui.meta[key] && ui.meta[key].a; if (!s || !a || s.over || s.won) return;
    const word = a.words[s.wi].w.toUpperCase();
    if (c === '⌫') s.cur = s.cur.slice(0, -1);
    else if (c === '↵') {
      if (s.cur.length < word.length) { toast('Not enough letters'); return; }
      s.guesses.push(s.cur); s.cur = '';
      if (s.guesses[s.guesses.length - 1] === word) { s.won = true; s.wins++; beep(true); completeAct(key); return; }
      if (s.guesses.length >= 6) { s.over = true; beep(false); }
    } else if (/^[A-Z]$/.test(c) && s.cur.length < word.length) s.cur += c;
    rerender();
  }

  // pinpoint: reveal clues one by one, guess the term
  function ppAct(a, key) {
    const s = ui.act[key] || (ui.act[key] = { p: 0, shown: 1, wrong: [], state: 'play', results: [], order: shuffle(a.puzzles.map((_, i) => i)) });
    const k = esc(key); const n = a.puzzles.length;
    if (s.p >= n) {
      const solved = s.results.filter((r) => r !== 'x');
      return `<div class="pp-end"><div class="big-emoji">📍</div><h3>${solved.length}/${n} solved</h3>
        <p>${s.results.map((r, i) => `Puzzle ${i + 1}: ${r === 'x' ? '❌' : `✅ in ${r} clue${r === 1 ? '' : 's'}`}`).join(' · ')}</p>
        <button class="btn ghost" data-act="actReset" data-k="${k}">↻ Play again</button></div>`;
    }
    const pz = a.puzzles[s.order[s.p]];
    const clues = pz.clues.map((c, i) => i < s.shown || s.state !== 'play'
      ? `<div class="pp-clue on" style="--d:${i * 60}ms"><span>${i + 1}</span><b dir="auto">${esc(c)}</b></div>`
      : `<div class="pp-clue"><span>${i + 1}</span><i>🔒 Clue ${i + 1}</i></div>`).join('');
    const wrong = s.wrong.length ? `<div class="pp-wrong">${s.wrong.map((w) => `<s>${esc(w)}</s>`).join('')}</div>` : '';
    const foot = s.state === 'play'
      ? `<div class="pp-guess"><input class="pp-in focusable" data-k="${k}" placeholder="Your guess…" autocomplete="off" spellcheck="false" dir="auto"><button class="btn" data-act="ppGuess" data-k="${k}">Guess</button></div>`
      : `<div class="explain ${s.state === 'solved' ? 'ok' : 'bad'}"><b>${s.state === 'solved' ? `🎉 Pinpointed in ${s.shown} clue${s.shown === 1 ? '' : 's'}!` : '😶 Out of clues.'}</b> ${esc(pz.reveal || pz.answers[0])}</div>
         <div class="row end"><button class="btn" data-act="ppNext" data-k="${k}">${s.p < n - 1 ? 'Next puzzle →' : 'See results 🏁'}</button></div>`;
    return `<div class="row between"><span class="pill">Puzzle ${s.p + 1}/${n}</span><span class="muted small">What do all the clues point to?</span></div>
      <div class="pp-clues">${clues}</div>${wrong}${foot}`;
  }
  function ppGuess(key, val) {
    const s = ui.act[key]; const a = ui.meta[key].a; if (!s || s.state !== 'play' || !val.trim()) return;
    const pz = a.puzzles[s.order[s.p]]; const g = norm(val).replace(/^the /, '');
    if (pz.answers.some((x) => norm(x) === g)) { s.state = 'solved'; s.results[s.p] = s.shown; beep(true); confetti(40); ui.focusTerm = null; }
    else {
      s.wrong.push(val.trim()); beep(false);
      if (s.shown < pz.clues.length) s.shown++; else { s.state = 'failed'; s.results[s.p] = 'x'; ui.focusTerm = null; rerender(); return; }
      ui.focusTerm = key;
    }
    rerender();
  }

  // pick
  function pickAct(a, key) {
    const s = ui.act[key] || (ui.act[key] = { sel: {}, checked: false, order: shuffle(a.items.map((_, i) => i)) });
    const k = esc(key);
    const items = s.order.map((i) => { const it = a.items[i];
      let cls = s.sel[i] ? 'on' : '';
      if (s.checked) cls += it.ok && s.sel[i] ? ' ok' : !it.ok && s.sel[i] ? ' bad' : it.ok ? ' missed' : '';
      return `<button class="pick ${cls}" data-act="pickToggle" data-k="${k}" data-i="${i}" dir="auto"><span class="box">${s.sel[i] ? '✔' : ''}</span>${esc(it.text)}</button>`;
    }).join('');
    return `<div class="picks">${items}</div>${s.checked && !P.act[key] ? '<p class="hint">Red = shouldn\'t be selected, dashed orange = you missed it. Fix and check again!</p>' : ''}
      <div class="row end"><button class="btn ghost" data-act="actReset" data-k="${k}">↺ Reset</button><button class="btn" style="--c:#59C059" data-act="pickCheck" data-k="${k}">Check ✔</button></div>`;
  }

  // terminal
  const norm = (s) => String(s).trim().replace(/\s+/g, ' ').toLowerCase();
  function termAct(a, key) {
    const s = ui.act[key] || (ui.act[key] = { i: 0, lines: [], tries: [], fails: 0 });
    const k = esc(key); const n = a.tasks.length;
    const toHtml = (arr) => arr.map((l) => `<div class="tl ${l.c || ''}">${l.h}</div>`).join('');
    const lines = toHtml(s.lines);
    const live = s.i < n ? `<div class="tl task">🎯 Task ${s.i + 1}/${n}: ${esc(a.tasks[s.i].task)}</div>${toHtml(s.tries)}
      <div class="tl input"><span class="prompt">${esc(a.prompt || '$')}</span><input class="term-in" data-k="${k}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Type a command"></div>`
      : '<div class="tl ok">🎉 All tasks done. You\'re a command-line wizard!</div>';
    return `<div class="term"><div class="term-bar"><i></i><i></i><i></i><span>${esc(a.title)}</span><span class="term-count">${Math.min(s.i, n)}/${n}</span></div>
      <div class="term-body" data-act="termFocus" data-k="${k}">${lines}${live}</div></div>
      <div class="row end">${s.i < n && s.fails >= 2 ? `<button class="btn sm ghost" data-act="termHint" data-k="${k}">💡 Show an answer</button>` : ''}<button class="btn sm ghost" data-act="actReset" data-k="${k}">↺ Restart</button></div>`;
  }
  function termSubmit(key, val) {
    const s = ui.act[key]; const a = ui.meta[key].a; if (!s || s.i >= a.tasks.length) return;
    const t = a.tasks[s.i]; const prompt = `<span class="prompt">${esc(a.prompt || '$')}</span> ${esc(val)}`;
    if (!val.trim()) return;
    if (t.answers.some((ans) => norm(ans) === norm(val))) {
      s.lines.push({ h: `🎯 ${esc(t.task)}`, c: 'task done' }, ...s.tries, { h: prompt }, { h: '✔ Nailed it!', c: 'ok' });
      s.i++; s.fails = 0; s.tries = []; beep(true);
      if (s.i >= a.tasks.length) { ui.focusTerm = null; completeAct(key); return; }
    } else {
      s.tries.push({ h: prompt }, { h: '✘ Hmm, that doesn\'t do the job. Try again.', c: 'bad' });
      s.fails++; beep(false);
    }
    ui.focusTerm = key; rerender();
    const body = app.querySelector(`.term-in[data-k="${key}"]`); if (body) body.closest('.term-body').scrollTop = 1e6;
  }

  // RAID builder
  const RAID_MIN = { '0': 2, '1': 2, '5': 3, '6': 4, '10': 4 };
  function raidCalc(level, n, d) {
    switch (level) {
      case '0': return { usable: n * d, tol: 'nothing (0 disks)' };
      case '1': return { usable: d, tol: `${n - 1} disk${n > 2 ? 's' : ''}` };
      case '5': return { usable: (n - 1) * d, tol: '1 disk' };
      case '6': return { usable: (n - 2) * d, tol: '2 disks' };
      default: return { usable: (n / 2) * d, tol: '1 disk per mirror pair' };
    }
  }
  function raidAlive(level, n, failed) {
    const f = failed.length;
    if (level === '0') return f === 0;
    if (level === '1') return f < n;
    if (level === '5') return f <= 1;
    if (level === '6') return f <= 2;
    for (let p = 0; p < n; p += 2) if (failed.includes(p) && failed.includes(p + 1)) return false;
    return true;
  }
  function raidBlock(level, n, d, r) {
    if (level === '0') return ['D', 'd'];
    if (level === '1') return ['M', 'm'];
    if (level === '10') return [`M${Math.floor(d / 2) + 1}`, 'm' + (Math.floor(d / 2) % 4)];
    const p = (n - 1 - (r % n) + n) % n;
    if (level === '6') { const q = (p - 1 + n) % n; if (d === p) return ['P', 'p']; if (d === q) return ['Q', 'q']; return ['D', 'd']; }
    return d === p ? ['P', 'p'] : ['D', 'd'];
  }
  function raidAct(a, key) {
    const s = ui.act[key] || (ui.act[key] = { c: 0, level: '5', n: 4, failed: [] });
    const k = esc(key); const D = a.diskTB || 2; const chs = a.challenges || [];
    const calc = raidCalc(s.level, s.n, D); const alive = raidAlive(s.level, s.n, s.failed);
    const status = !s.failed.length ? '<b class="g">Healthy ✅</b>' : alive ? '<b class="o">Degraded, still serving ⚠️</b>' : '<b class="r">DATA LOST 💥</b>';
    const disks = Array.from({ length: s.n }, (_, d) => `
      <button class="disk ${s.failed.includes(d) ? 'failed' : ''}" data-act="raidFail" data-k="${k}" data-d="${d}" title="Click to ${s.failed.includes(d) ? 'replace' : 'fail'} this disk">
        ${[0, 1, 2, 3].map((r) => { const [lbl, cls] = raidBlock(s.level, s.n, d, r); return `<span class="blk b-${cls}">${lbl}</span>`; }).join('')}
        <span class="disk-lbl">Disk ${d + 1}</span></button>`).join('');
    const ch = chs[s.c];
    return `<div class="raid">
      ${ch ? `<div class="raid-goal">🎯 <b>Challenge ${s.c + 1}/${chs.length}:</b> ${esc(ch.goal)}</div>` : '<div class="raid-goal ok">🏆 All RAID challenges complete! Keep playing: fail some disks and see what survives.</div>'}
      <div class="raid-controls">
        <div class="seg">${['0', '1', '5', '6', '10'].map((l) => `<button class="${s.level === l ? 'on' : ''}" data-act="raidLevel" data-k="${k}" data-v="${l}">RAID ${l}</button>`).join('')}</div>
        <div class="stepper"><button data-act="raidN" data-k="${k}" data-d="-1" aria-label="Fewer disks">−</button><b>${s.n} disks</b><button data-act="raidN" data-k="${k}" data-d="1" aria-label="More disks">+</button></div>
      </div>
      <div class="disks">${disks}</div>
      <div class="legend"><span class="blk b-d">D</span> data <span class="blk b-p">P</span><span class="blk b-q">Q</span> parity <span class="blk b-m">M</span> mirror copy · <i>click a disk to fail it</i></div>
      <div class="raid-stats">
        <div><span>Raw</span><b>${s.n * D} TB</b></div><div><span>Usable</span><b>${calc.usable} TB</b></div>
        <div><span>Survives losing</span><b>${calc.tol}</b></div><div><span>Status</span>${status}</div>
      </div>
      <div class="row end">${s.failed.length ? `<button class="btn ghost" data-act="raidHeal" data-k="${k}">🔧 Replace failed disks</button>` : ''}
        ${ch ? `<button class="btn" style="--c:#59C059" data-act="raidCheck" data-k="${k}">Check challenge ✔</button>` : ''}</div>
    </div>`;
  }

  // ---------- ALL TERMS OF A CHAPTER ----------
  const researchUrl = (term, ch) => 'https://www.google.com/search?q=' + encodeURIComponent(`${term} ${ch.id === 'welcome' ? '' : ch.title} how it works`.trim());
  function renderAllTerms(ch) {
    cur = null;
    const n = ch.sections.reduce((m, s) => m + s.terms.length, 0);
    const learned = ch.sections.reduce((m, s, si) => m + s.terms.filter((_, ti) => P.flip[`${ch.id}|${si}|${ti}`]).length, 0);
    app.innerHTML = `<div class="chapter all-terms" style="--c:${esc(ch.color)}">
      <div class="ch-head">
        <a href="#/c/${esc(ch.id)}/0" class="back">← Back to chapter</a>
        <div class="ch-title"><span class="ch-icon">${esc(ch.icon)}</span>
          <div><div class="ch-kicker">Chapter ${ch.num} · 📋 All terms · ${learned}/${n} learned</div>
          <h1>${esc(ch.title)} ${ch.he && ch.he !== ch.title ? `<span class="he" dir="rtl">${esc(ch.he)}</span>` : ''}</h1></div></div>
        <button class="btn sm ghost" type="button" onclick="window.print()">🖨 Print</button>
      </div>
      <div class="research">🔎 <div><b>Cards are just the headline.</b> Use the 🔎 button next to each term to research how it works behind the scenes. Learn the process step by step, not just the definition.</div></div>
      <input id="tsearch" class="search" type="search" placeholder="Filter ${n} terms in this chapter…" autocomplete="off">
      <div id="tlist"></div></div>`;
    const draw = () => {
      const q = norm($('#tsearch').value);
      const html = ch.sections.map((s, si) => {
        const rows = s.terms.map((t, ti) => ({ t, ti })).filter(({ t }) => !q || norm(t.t + ' ' + t.d).includes(q)).map(({ t, ti }) => `
          <div class="t-row ${P.flip[`${ch.id}|${si}|${ti}`] ? 'seen' : ''}">
            <div class="t-term" dir="auto">${P.flip[`${ch.id}|${si}|${ti}`] ? '<span class="t-ok" title="Learned">✔</span>' : ''}${esc(t.t)}</div>
            <div class="t-def" dir="auto">${fmt(t.d)}</div>
            <a class="t-search" target="_blank" rel="noopener" href="${esc(researchUrl(t.t, ch))}" title="Research “${esc(t.t)}” online">🔎</a>
          </div>`).join('');
        if (!rows) return '';
        const learnIdx = learnStepIndex(ch, si);
        return `<section class="t-sec"><div class="t-sec-head"><h2 dir="auto">${esc(s.title)}</h2><a class="btn sm ghost" href="#/c/${esc(ch.id)}/${learnIdx}">Study cards →</a></div>${rows}</section>`;
      }).join('');
      $('#tlist').innerHTML = html || '<div class="empty">No terms match. Try another word 🔎</div>';
    };
    $('#tsearch').addEventListener('input', draw);
    draw();
  }

  // ---------- ARCADE: every mini-game in one place ----------
  function renderArcade() {
    cur = null;
    let total = 0; let done = 0;
    const blocks = course.chapters.map((ch) => {
      const steps = realSteps(ch); const games = [];
      (ch.activities || []).forEach((a, i) => games.push({ a, key: `${ch.id}|act|${i}`, step: steps.findIndex((s) => s.type === 'act' && s.i === i) }));
      (ch.labs || []).forEach((l, li) => (l.activities || []).forEach((a, ai) => games.push({ a, key: `${ch.id}|lab${li}|${ai}`, step: steps.findIndex((s) => s.type === 'lab' && s.i === li) })));
      if (!games.length) return '';
      total += games.length; done += games.filter((g) => P.act[g.key]).length;
      return `<section class="arc-ch" style="--c:${esc(ch.color)}"><h2>${esc(ch.icon)} ${esc(ch.title)}</h2><div class="arc-grid">${games.map((g) => {
        const T = GAME_TYPES[g.a.type] || ['🎮', g.a.type];
        return `<a class="arc-game ${P.act[g.key] ? 'done' : ''}" href="#/c/${esc(ch.id)}/${g.step}"><span class="arc-ico">${T[0]}</span><span><b dir="auto">${esc(g.a.title)}</b><small>${esc(T[1])}${P.act[g.key] ? ' · ✔ done' : ''}</small></span></a>`;
      }).join('')}</div></section>`;
    }).join('');
    const kinds = [...new Set(course.chapters.flatMap((c) => (c.activities || []).concat(...(c.labs || []).map((l) => l.activities || [])).map((a) => a.type)))];
    app.innerHTML = `<div class="arcade"><div class="g-head">${MASCOT}<div><h1>🎮 Arcade</h1><p class="lead">${total} games, ${kinds.length} kinds. You've beaten ${done}. Every game also lives inside its chapter.</p></div></div>
      <div class="chips">${kinds.map((t) => { const T = GAME_TYPES[t] || ['🎮', t]; return `<span class="chip">${T[0]} ${esc(T[1])}</span>`; }).join('')}</div>${blocks}</div>`;
  }

  // ---------- TRAINEES ----------
  function renderWho() {
    cur = null;
    const cards = profiles.list.slice().sort((a, b) => (b.last || 0) - (a.last || 0)).map((p) => {
      const prog = loadProgress(p.id); const lvl = Math.floor(prog.xp / XP_PER_LEVEL) + 1;
      return `<div class="who-card ${p.id === profiles.current ? 'on' : ''}">
        <button class="who-pick" data-act="whoPick" data-id="${esc(p.id)}"><span class="who-av">${avatar(p.name)}</span>
          <b>${esc(p.name)}</b><small>Lv ${lvl} · ⭐ ${prog.xp} XP · ${overallPct(prog)}% done</small>
          <span class="mini-bar"><i style="width:${overallPct(prog)}%"></i></span><small class="muted">Last active ${fmtDate(p.last)}</small></button>
        <div class="who-tools"><button class="icon-btn" data-act="whoRename" data-id="${esc(p.id)}" title="Rename">✏️</button><button class="icon-btn danger" data-act="whoDel" data-id="${esc(p.id)}" title="Delete trainee">🗑</button></div>
      </div>`;
    }).join('');
    app.innerHTML = `<div class="who">
      <div class="g-head">${MASCOT}<div><h1>👋 Who's learning?</h1><p class="lead">Pick your name to continue, or add yourself. Progress is tracked per trainee in this browser. No password needed.</p></div></div>
      <form class="who-new" id="whoForm"><input id="whoName" class="search" maxlength="40" placeholder="Your full name" autocomplete="off" dir="auto" required>
        <button class="btn big" style="--c:#59C059" type="submit">+ Start as new trainee</button></form>
      ${cards ? `<h2>Trainees on this computer</h2><div class="who-grid">${cards}</div>` : ''}
      <p class="hint small">Using another computer? Export your progress from <b>📈 My progress</b> and import it there. <button type="button" class="linkbtn" data-act="progImport">Import a progress file</button></p>
    </div>`;
    $('#whoForm').addEventListener('submit', (e) => {
      e.preventDefault(); const name = $('#whoName').value.trim(); if (!name) return;
      if (profiles.list.some((p) => p.name.toLowerCase() === name.toLowerCase()) && !confirm(`There's already a trainee called “${name}”. Create another one anyway?`)) return;
      createProfile(name); toast(`Welcome, ${name}! 🎉`, 2200); confetti(80); location.hash = '#/';
    });
  }
  function renderProgress() {
    cur = null;
    const p = me(); const li = levelInfo();
    let tAll = 0; let tDone = 0; let qAll = 0; let qDone = 0; let lAll = 0; let lDone = 0; let gAll = 0; let gDone = 0;
    const rows = course.chapters.map((ch) => {
      const terms = ch.sections.reduce((m, s) => m + s.terms.length, 0);
      const learned = ch.sections.reduce((m, s, si) => m + s.terms.filter((_, ti) => P.flip[`${ch.id}|${si}|${ti}`]).length, 0);
      const qs = ch.sections.map((s, si) => ({ s, si })).filter(({ s }) => (s.quiz || []).length);
      const qPassed = qs.filter(({ si }) => (P.quiz[`${ch.id}|${si}`] || 0) >= 60).length;
      const labs = ch.labs || []; const labsDone = labs.filter((_, li2) => P.lab[`${ch.id}|${li2}`]).length;
      const games = ch.activities || []; const gamesDone = games.filter((_, ai) => P.act[`${ch.id}|act|${ai}`]).length;
      tAll += terms; tDone += learned; qAll += qs.length; qDone += qPassed; lAll += labs.length; lDone += labsDone; gAll += games.length; gDone += gamesDone;
      const test = !ch.test ? '—' : !hasTestQs(ch) ? '<span class="muted">pending</span>' : P.test[ch.id] != null ? `${P.test[ch.id] >= 70 ? '✅' : '❌'} ${P.test[ch.id]}%` : '<span class="muted">not taken</span>';
      const pct = chapterPct(ch);
      return `<tr style="--c:${esc(ch.color)}">
        <td><a href="#/c/${esc(ch.id)}/0" class="p-ch"><span>${esc(ch.icon)}</span> ${ch.num}. ${esc(ch.title)}</a></td>
        <td class="p-bar"><div class="bar"><i style="width:${pct}%"></i></div><b>${pct}%</b></td>
        <td>${terms ? `${learned}/${terms}` : '—'}</td><td>${qs.length ? `${qPassed}/${qs.length}` : '—'}</td>
        <td>${games.length ? `${gamesDone}/${games.length}` : '—'}</td><td>${labs.length ? `${labsDone}/${labs.length}` : '—'}</td><td>${test}</td></tr>`;
    }).join('');
    app.innerHTML = `<div class="progress-page">
      <div class="p-head"><span class="who-av big">${avatar(p.name)}</span>
        <div><h1>${esc(p.name)}</h1><p class="lead">Lv ${li.lvl} · ${esc(li.title)} · ⭐ ${P.xp} XP · Started ${fmtDate(p.created)} · Last active ${fmtDate(p.last)}</p></div>
        <div class="row"><button class="btn sm" style="--c:#59C059" data-act="progExport">⬇ Export my progress</button><button class="btn sm ghost" data-act="progImport">⬆ Import</button><a class="btn sm ghost" href="#/who">🔄 Switch trainee</a></div></div>
      <div class="stats five">
        <div class="stat" style="--c:#4C97FF"><b>${overallPct()}%</b><span>overall</span></div>
        <div class="stat" style="--c:#59C059"><b>${tDone}/${tAll}</b><span>terms learned</span></div>
        <div class="stat" style="--c:#FFAB19"><b>${qDone}/${qAll}</b><span>quizzes passed</span></div>
        <div class="stat" style="--c:#9966FF"><b>${gDone}/${gAll}</b><span>mini-games</span></div>
        <div class="stat" style="--c:#FF6680"><b>${lDone}/${lAll}</b><span>labs done</span></div>
      </div>
      <div class="p-table-wrap"><table class="p-table"><thead><tr><th>Chapter</th><th>Progress</th><th>Terms</th><th>Quizzes</th><th>Games</th><th>Labs</th><th>Test</th></tr></thead><tbody>${rows}</tbody></table></div>
      <p class="hint small">Want to show your trainer? Export your progress and send them the file. They can import it on their computer to see it.</p>
    </div>`;
  }
  function exportProgress() {
    const p = me();
    const data = { type: 'cloudcore-academy-progress', version: 1, exported: new Date().toISOString(), profile: p, progress: P };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = `progress-${p.name.replace(/[^\w֐-׿-]+/g, '_')}.json`;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function importProgress(text) {
    const d = JSON.parse(text);
    if (!d || d.type !== 'cloudcore-academy-progress' || !d.profile || !d.progress) throw new Error('This is not a CloudCore Academy progress file.');
    let p = profiles.list.find((x) => x.id === d.profile.id) || profiles.list.find((x) => x.name.toLowerCase() === String(d.profile.name).toLowerCase());
    if (p && !confirm(`Replace the progress of “${p.name}” on this computer with the imported file?`)) return;
    if (!p) { p = { id: d.profile.id || 't' + Date.now().toString(36), name: d.profile.name || 'Imported trainee', created: d.profile.created || Date.now() }; profiles.list.push(p); }
    p.last = d.profile.last || Date.now();
    store.set(progKey(p.id), Object.assign(emptyProgress(), d.progress));
    selectProfile(p.id); toast(`✔ Imported progress for ${p.name}`, 2400);
    location.hash = '#/progress'; rerender();
  }

  // ---------- GLOSSARY ----------
  function renderGlossary() {
    cur = null;
    const total = course.chapters.reduce((n, c) => n + (c.sections || []).reduce((m, s) => m + s.terms.length, 0), 0);
    app.innerHTML = `<div class="glossary">
      <div class="g-head">${MASCOT}<div><h1>📚 Glossary</h1><p class="lead">All ${total} terms in one place. Search anything!</p></div></div>
      <input id="gsearch" class="search" type="search" placeholder="Search terms or explanations… (e.g. LUN, vMotion, DHCP)" autocomplete="off">
      <div class="chips filter" id="gfilter"><button class="chip on" data-ch="">All</button>${course.chapters.filter((c) => (c.sections || []).length).map((c) => `<button class="chip" data-ch="${esc(c.id)}" style="--c:${esc(c.color)}">${esc(c.icon)} ${esc(c.title)}</button>`).join('')}</div>
      <div id="glist" class="g-list"></div></div>`;
    let chFilter = '';
    const draw = () => {
      const q = norm($('#gsearch').value);
      const out = [];
      course.chapters.forEach((c) => {
        if (chFilter && c.id !== chFilter) return;
        (c.sections || []).forEach((s, si) => s.terms.forEach((t, ti) => {
          if (q && !norm(t.t + ' ' + t.d).includes(q)) return;
          out.push(`<a class="g-item ${P.flip[`${c.id}|${si}|${ti}`] ? 'seen' : ''}" style="--c:${esc(c.color)}" href="#/c/${esc(c.id)}/${learnStepIndex(c, si)}">
            <div class="g-top"><b dir="auto">${esc(t.t)}</b><span class="chip">${esc(c.icon)} ${esc(c.title)} · ${esc(s.title)}</span></div>
            <p dir="auto">${fmt(t.d)}</p></a>`);
        }));
      });
      $('#glist').innerHTML = out.length ? out.join('') : '<div class="empty">No terms match. Try another word 🔎</div>';
    };
    $('#gsearch').addEventListener('input', draw);
    $('#gfilter').addEventListener('click', (e) => {
      const b = e.target.closest('[data-ch]'); if (!b) return;
      chFilter = b.dataset.ch; document.querySelectorAll('#gfilter .chip').forEach((x) => x.classList.toggle('on', x === b)); draw();
    });
    draw();
  }

  // ---------- events ----------
  app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-act]'); if (!el) return;
    const act = el.dataset.act; const ch = cur && cur.ch; const k = el.dataset.k;
    const num = (v) => parseInt(v, 10);
    switch (act) {
      // learning
      case 'flip': {
        const base = `${ch.id}|${cur.steps[cur.stepIdx].i}`; const j = num(el.dataset.j);
        const fl = ui.flipped[base] || (ui.flipped[base] = {});
        fl[j] = !fl[j]; el.classList.toggle('flipped', fl[j]);
        if (!P.flip[`${base}|${j}`]) {
          P.flip[`${base}|${j}`] = 1; saveP(); el.classList.add('seen'); addXP(2);
          const sec = ch.sections[cur.steps[cur.stepIdx].i];
          const seen = sec.terms.filter((_, t) => P.flip[`${base}|${t}`]).length;
          const fc = $('#flipCount'); if (fc) fc.textContent = `${seen}/${sec.terms.length} learned`;
          if (seen === sec.terms.length) { setTimeout(() => { confetti(90); toast('🎉 Section complete! Quiz unlocked'); rerender(); }, 650); }
        }
        break;
      }
      case 'flipAll': {
        const i = cur.steps[cur.stepIdx].i; const base = `${ch.id}|${i}`; const sec = ch.sections[i];
        const fl = ui.flipped[base] || (ui.flipped[base] = {});
        const anyFront = sec.terms.some((_, j) => !fl[j]);
        sec.terms.forEach((_, j) => { fl[j] = anyFront; });
        document.querySelectorAll('.card').forEach((c) => c.classList.toggle('flipped', anyFront));
        break;
      }
      // quiz
      case 'answer': answer(k, num(el.dataset.o)); break;
      case 'qNext': quizNext(k); break;
      case 'qRetry': delete ui.runs[k]; rerender(); break;
      // labs
      case 'check': {
        const ck = `${k}|${el.dataset.s}`; if (P.checks[ck]) delete P.checks[ck]; else { P.checks[ck] = 1; beep(true); }
        saveP(); rerender(); break;
      }
      case 'labDone': {
        if (P.lab[k]) delete P.lab[k];
        else { P.lab[k] = 1; confetti(140); toast('🏁 Lab complete! Amazing work', 2400); if (!P.labxp[k]) { P.labxp[k] = 1; addXP(50); } }
        saveP(); rerender(); break;
      }
      // activities
      case 'actReset': delete ui.act[k]; ui.focusTerm = null; rerender(); break;
      case 'sortSel': { const s = ui.act[k]; const i = num(el.dataset.i); s.sel = s.sel === i ? null : i; rerender(); break; }
      case 'sortDrop': { const s = ui.act[k]; if (s && s.sel != null) sortPlace(k, s.sel, num(el.dataset.b)); break; }
      case 'sortBack': { e.stopPropagation(); const s = ui.act[k]; delete s.placed[num(el.dataset.i)]; s.checked = false; rerender(); break; }
      case 'sortCheck': {
        const s = ui.act[k]; const a = ui.meta[k].a; s.checked = true;
        const wrong = a.items.filter((it, i) => s.placed[i] !== it.b).length;
        if (!wrong) completeAct(k); else { beep(false); toast(`${wrong} misplaced (in red). Click them to take them back.`, 2400); rerender(); }
        break;
      }
      case 'pickToggle': { const s = ui.act[k]; const i = num(el.dataset.i); s.sel[i] = !s.sel[i]; s.checked = false; rerender(); break; }
      case 'pickCheck': {
        const s = ui.act[k]; const a = ui.meta[k].a; s.checked = true;
        const ok = a.items.every((it, i) => !!s.sel[i] === !!it.ok);
        if (ok) completeAct(k); else { beep(false); toast('Not quite. Check the colors!', 2000); rerender(); }
        break;
      }
      case 'mL': { const s = ui.act[k]; const i = num(el.dataset.i); s.sel = s.sel === i ? null : i; s.bad = null; rerender(); break; }
      case 'mR': {
        const s = ui.act[k]; const a = ui.meta[k].a; const i = num(el.dataset.i);
        if (s.sel == null) { toast('Pick an item on the left first 👈'); break; }
        if (i === s.sel) { s.done[i] = 1; s.sel = null; s.bad = null; beep(true); if (Object.keys(s.done).length === a.pairs.length) { completeAct(k); break; } }
        else { s.miss++; s.bad = i; beep(false); }
        rerender(); break;
      }
      case 'memFlip': {
        const s = ui.act[k]; const a = ui.meta[k].a; const ci = num(el.dataset.c); const c = s.cards[ci];
        if (s.lock || s.got[c.p] || s.open.includes(ci)) break;
        s.open.push(ci);
        if (s.open.length === 2) {
          s.moves++;
          const [c1, c2] = s.open.map((x) => s.cards[x]);
          if (c1.p === c2.p) { s.got[c1.p] = 1; s.open = []; beep(true); if (Object.keys(s.got).length === a.pairs.length) { completeAct(k); break; } }
          else { s.lock = true; setTimeout(() => { s.open = []; s.lock = false; rerender(); }, 950); }
        }
        rerender(); break;
      }
      case 'tfAns': {
        const s = ui.act[k]; const it = ui.meta[k].a.items[s.order[s.i]]; const ok = (el.dataset.v === '1') === !!it.ok;
        if (ok) s.score++; else s.lives--; s.fb = { ok }; beep(ok); rerender(); break;
      }
      case 'tfNext': {
        const s = ui.act[k]; const a = ui.meta[k].a; s.fb = null;
        if (s.lives <= 0) s.over = true;
        else if (s.i + 1 >= a.items.length) { s.won = true; completeAct(k); break; }
        else s.i++;
        rerender(); break;
      }
      case 'fillCheck': { const inp = el.closest('.activity').querySelector('.fill-in'); if (inp) fillSubmit(k, inp.value); break; }
      case 'snCheck': snCheck(k); break;
      case 'snReveal': { const s = ui.act[k]; SN_FIELDS.forEach(([f]) => { s.vals[f] = s.r[f]; }); s.res = null; s.revealed = true; rerender(); break; }
      case 'snNext': { const s = ui.act[k]; Object.assign(s, { r: genSubnet(), vals: {}, res: null, tries: 0, revealed: false }); rerender(); break; }
      case 'chBit': { const s = ui.act[k]; s.bits ^= (1 << num(el.dataset.b)); s.bad = false; rerender(); break; }
      case 'chCheck': chCheck(k); break;
      case 'blitzStart': {
        const s = ui.act[k]; stopBlitz();
        Object.assign(s, { phase: 'play', score: 0, wrong: 0, end: Date.now() + 60000, q: blitzQ(blitzPool(ui.meta[k].ch)), flash: null });
        ui.blitzTimer = setInterval(() => blitzTick(k), 250); rerender(); break;
      }
      case 'blitzAns': {
        const s = ui.act[k]; if (s.phase !== 'play') break; const pool = blitzPool(ui.meta[k].ch);
        if (num(el.dataset.o) === s.q.ai) { s.score++; s.flash = 'ok'; beep(true); } else { s.wrong++; s.flash = 'bad'; beep(false); toast(`It was: ${pool[s.q.ai].t}`, 1400); }
        s.q = blitzQ(pool); rerender(); break;
      }
      case 'cnTile': {
        const s = ui.act[k]; const i = num(el.dataset.i);
        if (s.sel.includes(i)) s.sel = s.sel.filter((x) => x !== i); else if (s.sel.length < 4) s.sel.push(i);
        rerender(); break;
      }
      case 'cnShuffle': ui.act[k].order = shuffle(ui.act[k].order); rerender(); break;
      case 'cnClear': ui.act[k].sel = []; rerender(); break;
      case 'cnSubmit': cnSubmit(k); break;
      case 'wdKey': wdKey(k, el.dataset.key); break;
      case 'wdHint': ui.act[k].hint = true; rerender(); break;
      case 'wdNext': { const s = ui.act[k]; Object.assign(s, wdNew(ui.meta[k].a, s.wi)); rerender(); break; }
      case 'ppGuess': { const inp = el.closest('.activity').querySelector('.pp-in'); if (inp) ppGuess(k, inp.value); break; }
      case 'ppNext': { const s = ui.act[k]; s.p++; s.shown = 1; s.wrong = []; s.state = 'play'; if (s.p >= ui.meta[k].a.puzzles.length) { completeAct(k); break; } ui.focusTerm = k; rerender(); break; }
      case 'ordAdd': { const s = ui.act[k]; s.seq.push(num(el.dataset.i)); s.checked = false; rerender(); break; }
      case 'ordBack': { const s = ui.act[k]; s.seq.splice(num(el.dataset.p), 1); s.checked = false; rerender(); break; }
      case 'ordCheck': {
        const s = ui.act[k]; s.checked = true;
        const wrong = s.seq.filter((i, pos) => i !== pos).length;
        if (!wrong) completeAct(k); else { beep(false); toast(`${wrong} step${wrong > 1 ? 's are' : ' is'} out of place (in red). Click to take them back.`, 2600); rerender(); }
        break;
      }
      case 'termFocus': { const inp = el.querySelector('.term-in'); if (inp && e.target.tagName !== 'INPUT') inp.focus(); break; }
      case 'termHint': {
        const s = ui.act[k]; const a = ui.meta[k].a;
        s.tries.push({ h: `💡 One possible answer: <code>${esc(a.tasks[s.i].answers[0])}</code>`, c: 'hint' }); ui.focusTerm = k; rerender(); break;
      }
      case 'raidLevel': {
        const s = ui.act[k]; s.level = el.dataset.v; s.failed = [];
        s.n = Math.max(s.n, RAID_MIN[s.level]); if (s.level === '10' && s.n % 2) s.n++; if (s.level === '1') s.n = 2;
        rerender(); break;
      }
      case 'raidN': {
        const s = ui.act[k]; const step = s.level === '10' ? 2 : 1; s.failed = [];
        s.n = Math.min(8, Math.max(RAID_MIN[s.level], s.n + num(el.dataset.d) * step)); rerender(); break;
      }
      case 'raidFail': { const s = ui.act[k]; const d = num(el.dataset.d); s.failed = s.failed.includes(d) ? s.failed.filter((x) => x !== d) : s.failed.concat(d); beep(raidAlive(s.level, s.n, s.failed)); rerender(); break; }
      case 'raidHeal': ui.act[k].failed = []; rerender(); break;
      case 'raidCheck': {
        const s = ui.act[k]; const a = ui.meta[k].a; const c = a.challenges[s.c];
        if (s.level === String(c.level) && s.n === c.disks) {
          s.c++; beep(true); confetti(60); toast('✔ Challenge solved!');
          if (s.c >= a.challenges.length) completeAct(k); else rerender();
        } else {
          const calc = raidCalc(s.level, s.n, a.diskTB || 2); beep(false);
          toast(`Not yet: RAID ${s.level} with ${s.n} disks = ${calc.usable} TB usable, survives ${calc.tol}. Re-read the goal!`, 3600);
        }
        break;
      }
      // trainees
      case 'whoPick': selectProfile(el.dataset.id); location.hash = '#/'; rerender(); break;
      case 'whoRename': {
        const p = profiles.list.find((x) => x.id === el.dataset.id);
        const name = prompt('New name:', p.name); if (name && name.trim()) { p.name = name.trim(); saveProfiles(); renderTopbar(); rerender(); }
        break;
      }
      case 'whoDel': {
        const p = profiles.list.find((x) => x.id === el.dataset.id);
        if (!confirm(`Delete trainee “${p.name}” and ALL their progress on this computer? This cannot be undone.`)) break;
        profiles.list = profiles.list.filter((x) => x !== p); store.del(progKey(p.id));
        if (profiles.current === p.id) { profiles.current = null; P = emptyProgress(); resetUi(); }
        saveProfiles(); renderTopbar(); rerender(); break;
      }
      case 'progExport': exportProgress(); toast('⬇ Progress file downloaded'); break;
      case 'progImport': $('#progFile').click(); break;
      default: if (editMode) editAction(act, el);
    }
  });
  app.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const t = e.target; const k = t.dataset.k;
    if (t.classList.contains('term-in')) { e.preventDefault(); termSubmit(k, t.value); }
    else if (t.classList.contains('fill-in')) { e.preventDefault(); fillSubmit(k, t.value); }
    else if (t.classList.contains('pp-in')) { e.preventDefault(); ppGuess(k, t.value); }
    else if (t.classList.contains('ch-in')) { e.preventDefault(); chCheck(k); }
    else if (t.classList.contains('sn-in')) { e.preventDefault(); snCheck(k); }
  });
  // game inputs keep their values across re-renders
  app.addEventListener('input', (e) => {
    const t = e.target;
    if (t.dataset.sv && t.dataset.k && ui.act[t.dataset.k]) { ui.act[t.dataset.k].vals[t.dataset.sv] = t.value; }
  });
  document.addEventListener('keydown', (e) => {
    if ((e.target instanceof Element && e.target.matches('input, textarea, select')) || e.ctrlKey || e.metaKey || e.altKey) return;
    const wd = app.querySelector('[data-wordguess]');
    if (wd) {
      const c = e.key === 'Enter' ? '↵' : e.key === 'Backspace' ? '⌫' : e.key.length === 1 ? e.key.toUpperCase() : '';
      if (c && /^[A-Z↵⌫]$/.test(c)) { e.preventDefault(); wdKey(wd.dataset.wordguess, c); return; }
    }
    const q = app.querySelector('[data-quiz]'); if (!q) return;
    const key = q.dataset.quiz;
    if (/^[1-9]$/.test(e.key)) { const b = q.querySelectorAll('.opt')[Number(e.key) - 1]; if (b && !b.disabled) answer(key, Number(b.dataset.o)); }
    else if (e.key === 'Enter') { const n = q.querySelector('[data-act="qNext"]'); if (n) quizNext(key); }
  });
  // drag & drop for sort games
  app.addEventListener('dragstart', (e) => { const el = e.target.closest('[draggable][data-k]'); if (el) e.dataTransfer.setData('text/plain', el.dataset.k + '§' + el.dataset.i); });
  app.addEventListener('dragover', (e) => { const b = e.target.closest('[data-drop]'); if (b) { e.preventDefault(); b.classList.add('over'); } });
  app.addEventListener('dragleave', (e) => { const b = e.target.closest('[data-drop]'); if (b) b.classList.remove('over'); });
  app.addEventListener('drop', (e) => {
    const b = e.target.closest('[data-drop]'); if (!b) return; e.preventDefault();
    const [k, i] = (e.dataTransfer.getData('text/plain') || '').split('§');
    if (k === b.dataset.k) sortPlace(k, parseInt(i, 10), parseInt(b.dataset.b, 10));
  });

  // ---------- EDIT MODE ----------
  app.addEventListener('input', (e) => {
    const el = e.target; if (!editMode || !cur) return;
    if (el.dataset.bind != null) { setPath(cur.ch, el.dataset.bind, el.value); saveCourse(); }
    else if (el.dataset.bindlines != null) { setPath(cur.ch, el.dataset.bindlines, el.value.split('\n').map((s) => s.trim()).filter(Boolean)); saveCourse(); }
  });
  app.addEventListener('change', (e) => {
    const el = e.target; if (!editMode || !cur) return;
    if (el.dataset.bindnum != null) { setPath(cur.ch, el.dataset.bindnum, Number(el.value)); saveCourseNow(); rerender(); }
    else if (el.dataset.rerender || el.type === 'color') { saveCourseNow(); rerender(); }
  });
  function goStep(ch, pred) {
    const idx = stepsOf(ch).findIndex(pred);
    const h = `#/c/${ch.id}/${Math.max(0, idx)}`;
    if (location.hash === h) rerender(); else location.hash = h;
  }
  function editAction(act, el) {
    const ch = cur && cur.ch; const i = parseInt(el.dataset.i, 10); const j = parseInt(el.dataset.j, 10);
    const p = el.dataset.p; const k = parseInt(el.dataset.k, 10); const n = parseInt(el.dataset.n, 10);
    const swap = (arr, a, b) => { if (b < 0 || b >= arr.length) return; [arr[a], arr[b]] = [arr[b], arr[a]]; };
    switch (act) {
      case 'chAdd': {
        const id = 'chapter-' + Date.now().toString(36);
        course.chapters.push({ id, num: 0, title: 'New chapter', he: '', duration: '', mode: 'Theory', icon: '⭐', color: '#4C97FF', intro: '', sections: [{ title: 'New section', terms: [{ t: 'New term', d: 'Explanation…' }], quiz: [] }], activities: [], labs: [], test: { url: '', questions: [] } });
        renumber(); saveCourseNow(); location.hash = `#/c/${id}/0`; return;
      }
      case 'chDel':
        if (!confirm(`Delete the whole chapter “${ch.title}”? (You can undo with “Discard my edits”.)`)) return;
        course.chapters.splice(course.chapters.indexOf(ch), 1); renumber(); saveCourseNow(); location.hash = '#/'; return;
      case 'chMove': { const a = course.chapters.indexOf(ch); swap(course.chapters, a, a + parseInt(el.dataset.d, 10)); renumber(); saveCourseNow(); rerender(); return; }
      case 'chJson': return openJson('Chapter JSON', ch, (v) => { if (!v || !Array.isArray(v.sections)) throw new Error('A chapter needs a "sections" array.'); Object.keys(ch).forEach((key) => delete ch[key]); Object.assign(ch, v); });
      case 'secAdd': ch.sections.splice(i + 1, 0, { title: 'New section', terms: [{ t: 'New term', d: 'Explanation…' }], quiz: [] }); saveCourseNow(); return goStep(ch, (s) => s.type === 'learn' && s.i === i + 1);
      case 'secUp': if (i > 0) { swap(ch.sections, i, i - 1); saveCourseNow(); return goStep(ch, (s) => s.type === 'learn' && s.i === i - 1); } return;
      case 'secDel':
        if (!confirm(`Delete section “${ch.sections[i].title}” with all its terms and questions?`)) return;
        ch.sections.splice(i, 1); saveCourseNow(); return goStep(ch, (s) => s.type === 'learn' && s.i === Math.max(0, i - 1));
      case 'termAdd': ch.sections[i].terms.push({ t: '', d: '' }); saveCourseNow(); rerender(); { const ins = app.querySelectorAll('.edit-term input'); if (ins.length) ins[ins.length - 1].focus(); } return;
      case 'termDel': ch.sections[i].terms.splice(j, 1); saveCourseNow(); rerender(); return;
      case 'termUp': swap(ch.sections[i].terms, j, j - 1); saveCourseNow(); rerender(); return;
      case 'qAdd': { if (p === 'test.questions' && !ch.test) ch.test = { url: '', questions: [] }; getPath(ch, p).push({ q: '', o: ['', '', '', ''], a: 0, e: '' }); saveCourseNow(); rerender(); return; }
      case 'qDel': getPath(ch, p).splice(k, 1); saveCourseNow(); rerender(); return;
      case 'optAdd': getPath(ch, p)[k].o.push(''); saveCourseNow(); rerender(); return;
      case 'optDel': { const q = getPath(ch, p)[k]; if (q.o.length <= 2) { toast('A question needs at least 2 options'); return; } q.o.splice(n, 1); if (q.a >= q.o.length) q.a = 0; else if (q.a > n) q.a--; saveCourseNow(); rerender(); return; }
      case 'labAdd': ch.labs = ch.labs || []; ch.labs.push({ title: 'New lab', kind: 'internal', desc: '', steps: [] }); saveCourseNow(); return goStep(ch, (s) => s.type === 'lab' && s.i === ch.labs.length - 1);
      case 'labDel': if (!confirm(`Delete lab “${ch.labs[i].title}”?`)) return; ch.labs.splice(i, 1); saveCourseNow(); rerender(); return;
      case 'actDel': if (!confirm('Delete this mini-game?')) return; ch.activities.splice(i, 1); saveCourseNow(); rerender(); return;
      case 'testToggle':
        if (ch.test) { if (hasTestQs(ch) && !confirm('Remove the chapter test and its questions?')) return; ch.test = null; }
        else ch.test = { url: '', questions: [] };
        saveCourseNow(); rerender(); return;
      default:
    }
  }

  // modal
  function openModal(html) { const m = $('#modal'); m.innerHTML = `<div class="modal-card">${html}</div>`; m.hidden = false; return m; }
  function closeModal() { const m = $('#modal'); m.hidden = true; m.innerHTML = ''; }
  $('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal' || e.target.closest('[data-close]')) closeModal(); });
  function openJson(title, obj, apply) {
    const m = openModal(`<h2>{ } ${esc(title)}</h2><p class="hint">Advanced: edit the raw data. Keep the JSON valid (double quotes, no trailing commas).</p>
      <textarea id="jsonText" spellcheck="false">${esc(JSON.stringify(obj, null, 2))}</textarea><p id="jsonErr" class="err"></p>
      <div class="row end"><button class="btn ghost" data-close>Cancel</button><button class="btn" style="--c:#59C059" id="jsonApply">Apply</button></div>`);
    m.querySelector('#jsonApply').addEventListener('click', () => {
      try { apply(JSON.parse(m.querySelector('#jsonText').value)); renumber(); saveCourseNow(); closeModal(); ui.runs = {}; ui.act = {}; rerender(); toast('✔ Applied'); }
      catch (err) { m.querySelector('#jsonErr').textContent = '⚠️ ' + err.message; }
    });
  }
  function parseCourseText(text) {
    const a = text.indexOf('{'); const b = text.lastIndexOf('}');
    try { return JSON.parse(text.slice(a, b + 1)); } catch (e) { /* not plain JSON: evaluate the user's own content.js */ }
    // eslint-disable-next-line no-new-func
    return new Function('const window = {};\n' + text + '\n;return window.COURSE;')();
  }
  const SCHEMA_DOC = `/*
 * CloudCore Trainee Academy - course content
 * ------------------------------------------
 * Everything the site shows lives in this one file.
 * Easiest way to edit: open the site, turn on "Edit mode", change things,
 * then click "Export content.js" and replace this file in the repo.
 *
 * Shape:
 *   chapter  = { id, num, title, he, duration, mode, icon, color, intro,
 *                sections[], activities[], labs[], test }
 *   section  = { title, he?, terms: [{ t, d }], quiz: [{ q, o: [..], a, e }] }
 *              t = term, d = definition, q = question, o = options,
 *              a = index of the correct option (0-based), e = explanation
 *   lab      = { title, he?, kind: "internal" | "external" | "interactive" | "checklist",
 *                url?, desc, steps?: [..], activities?: [..] }
 *   test     = { url, questions: [ same as quiz ] }  -> empty = placeholder
 *   activity = { type: "sort" | "pick" | "terminal" | "raid", ... }
 */
`;
  function download(name, text) {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/javascript' }));
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ---------- global controls ----------
  function toggleEdit() {
    const d = cur && cur.steps[cur.stepIdx];
    editMode = !editMode; document.body.classList.toggle('editing', editMode);
    ui.runs = {}; renderTopbar(); updateEditBar();
    if (cur && d) {
      const idx = stepsOf(cur.ch).findIndex((s) => s.type === d.type && s.i === d.i);
      const h = `#/c/${cur.ch.id}/${Math.max(0, idx)}`;
      if (location.hash !== h) { location.hash = h; return; }
    }
    rerender();
  }
  $('#editBtn').addEventListener('click', toggleEdit);
  $('#exitEdit').addEventListener('click', toggleEdit);
  $('#soundBtn').addEventListener('click', () => { P.sound = !P.sound; saveP(); renderTopbar(); beep(true); });
  $('#exportBtn').addEventListener('click', () => {
    download('content.js', SCHEMA_DOC + 'window.COURSE = ' + JSON.stringify(course, null, 2) + ';\n');
    toast('⬇ content.js downloaded. Replace js/content.js in the repo to publish.', 3500);
  });
  $('#importBtn').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', (e) => {
    const f = e.target.files[0]; if (!f) return;
    f.text().then((t) => {
      const c = parseCourseText(t);
      if (!c || !Array.isArray(c.chapters)) throw new Error('No chapters found in that file.');
      course = c; saveCourseNow(); ui.runs = {}; ui.act = {}; location.hash = '#/'; rerender(); toast('✔ Imported');
    }).catch((err) => alert('Import failed: ' + err.message));
    e.target.value = '';
  });
  $('#jsonBtn').addEventListener('click', () => openJson('Whole course JSON', course, (v) => { if (!v || !Array.isArray(v.chapters)) throw new Error('The course needs a "chapters" array.'); course = v; }));
  $('#discardBtn').addEventListener('click', () => {
    if (!confirm('Discard ALL your local edits and go back to the published content?')) return;
    store.del(KEY_EDITS); hasEdits = false; course = clone(window.COURSE); ui.runs = {}; ui.act = {}; updateEditBar(); location.hash = '#/'; rerender();
  });
  $('#whoBtn').addEventListener('click', () => { location.hash = '#/who'; });
  $('#progFile').addEventListener('change', (e) => {
    const f = e.target.files[0]; if (!f) return;
    f.text().then(importProgress).catch((err) => alert('Import failed: ' + err.message));
    e.target.value = '';
  });
  $('#resetBtn').addEventListener('click', () => {
    if (!me()) return;
    if (!confirm(`Reset all XP and progress for ${me().name}? This cannot be undone.`)) return;
    ['flip', 'qa', 'quiz', 'act', 'lab', 'labxp', 'checks', 'test'].forEach((key) => { P[key] = {}; });
    P.xp = 0; saveP(); ui.runs = {}; ui.act = {}; renderTopbar(); rerender(); toast('Progress reset. Fresh start! 🌱');
  });

  renumber(); renderTopbar(); updateEditBar(); route();
})();
