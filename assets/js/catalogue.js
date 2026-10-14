(function () {
  'use strict';

  const RESOURCES = window.RESOURCES || [];
  const COUNTER = 'https://api.counterapi.dev/v1/netzero-catalogue';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);

  // ── Classify resource type ─────────────────────────────────────────────
  // "data, model" counts as both; anything that is neither is "other".
  function kindOf (type) {
    const t = String(type || '').toLowerCase().replace(/\s/g, '');
    const hasData = t.includes('data');
    const hasModel = t.includes('model');
    if (hasData && hasModel) return 'both';
    if (hasData) return 'data';
    if (hasModel) return 'model';
    return 'other';
  }

  const BADGE = { data: 'Data', model: 'Model', both: 'Data + Model' };

  const ICON_DOWNLOAD = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12M6 11l6 6 6-6M5 20h14"/></svg>';
  const ICON_LINK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';
  const ICON_MAIL = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';

  // ── Render cards ───────────────────────────────────────────────────────
  const items = RESOURCES.map((r, i) => {
    const kind = kindOf(r.type);
    const tags = r.tags || [];
    const people = r.people || [];
    const isMail = String(r.link || '').startsWith('mailto:');

    // Request-access emails get a pre-filled subject line. Only links without
    // a custom label count towards the downloads stat.
    const mailto = isMail && !r.link.includes('?')
      ? `${r.link}?subject=${encodeURIComponent('Access request: ' + r.title)}`
      : r.link;
    const access = isMail
      ? `<a class="access access-contact" href="${esc(mailto)}">${ICON_MAIL}Request access</a>`
      : `<a class="access access-download" href="${esc(r.link)}" target="_blank" rel="noopener"${r.link_label ? '' : ' data-count'}>${r.link_label ? ICON_LINK : ICON_DOWNLOAD}${esc(r.link_label || 'Download')}</a>`;

    const shown = people.slice(0, 3).map(esc).join(', ');
    const more = people.length > 3 ? ` <span title="${esc(people.slice(3).join(', '))}">+${people.length - 3}</span>` : '';
    const meta = people.length || r.paper
      ? `<div class="meta">
          ${people.length ? `<span class="people" title="${esc(people.join(', '))}">${shown}${more}</span>` : ''}
          ${r.paper ? `<a class="paper" href="${esc(r.paper)}" target="_blank" rel="noopener">Paper <span aria-hidden="true">↗</span></a>` : ''}
        </div>`
      : '';

    const contact = r.contact
      ? `<a class="contact" href="mailto:${esc(r.contact)}">${esc(r.contact)}</a>`
      : '<span class="contact">No contact listed</span>';

    const el = document.createElement('article');
    el.className = 'card' + (reduceMotion ? '' : ' pre');
    el.dataset.kind = kind;
    el.style.viewTransitionName = 'card-' + i;
    el.innerHTML = `
      <div class="card-top">
        <span class="badge">${esc(BADGE[kind] || r.type)}</span>
        ${r.license ? `<span class="license" title="Licence">${esc(r.license)}</span>` : ''}
      </div>
      <h3>${esc(r.title)}</h3>
      ${meta}
      <p>${esc(r.description)}</p>
      ${tags.length ? `<ul class="tags">${tags.map(t => `<li><button class="tag" data-tag="${esc(t)}">${esc(t)}</button></li>`).join('')}</ul>` : ''}
      <div class="card-foot">${contact}${access}</div>`;

    const haystack = [r.title, r.description, r.type, r.license, r.contact, ...people, ...tags].join(' ').toLowerCase();
    return { el, kind, tags, haystack };
  });

  const $cards = $('#cards');
  items.forEach(it => $cards.appendChild(it.el));

  // ── Filter state ───────────────────────────────────────────────────────
  const state = { type: 'all', tag: null, query: '' };

  function matches (it) {
    if (state.type === 'data' && !(it.kind === 'data' || it.kind === 'both')) return false;
    if (state.type === 'model' && !(it.kind === 'model' || it.kind === 'both')) return false;
    if (state.type === 'other' && it.kind !== 'other') return false;
    if (state.tag && !it.tags.includes(state.tag)) return false;
    const terms = state.query.toLowerCase().split(/\s+/).filter(Boolean);
    return terms.every(t => it.haystack.includes(t));
  }

  function apply () {
    let shown = 0;
    items.forEach(it => {
      const ok = matches(it);
      it.el.hidden = !ok;
      if (ok) shown++;
    });

    $$('.tag').forEach(b => b.classList.toggle('active', b.dataset.tag === state.tag));

    const $active = $('#active-tag');
    $active.hidden = !state.tag;
    if (state.tag) {
      $active.textContent = '#' + state.tag;
      $active.setAttribute('aria-label', `Remove tag filter ${state.tag}`);
    }

    const total = items.length;
    $('#resource-count').textContent = shown === total
      ? `${total} resources`
      : `Showing ${shown} of ${total} resources`;
    $('#empty').hidden = shown !== 0;
  }

  function update (mutate) {
    const run = () => { mutate(); apply(); };
    if (document.startViewTransition && !reduceMotion) document.startViewTransition(run);
    else run();
  }

  // ── Segmented type filter ──────────────────────────────────────────────
  const $segments = $('#segments');
  const $indicator = $('.seg-indicator', $segments);
  const segButtons = $$('button', $segments);

  const counts = {
    all: items.length,
    data: items.filter(it => it.kind === 'data' || it.kind === 'both').length,
    model: items.filter(it => it.kind === 'model' || it.kind === 'both').length,
    other: items.filter(it => it.kind === 'other').length
  };
  segButtons.forEach(b => {
    $('.seg-n', b).textContent = counts[b.dataset.filter];
    b.hidden = counts[b.dataset.filter] === 0;
  });

  function placeIndicator () {
    const active = segButtons.find(b => b.getAttribute('aria-checked') === 'true');
    if (!active) return;
    $indicator.style.width = active.offsetWidth + 'px';
    $indicator.style.transform = `translateX(${active.offsetLeft}px)`;
  }

  function setType (btn) {
    segButtons.forEach(b => {
      const on = b === btn;
      b.setAttribute('aria-checked', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    placeIndicator();
    update(() => { state.type = btn.dataset.filter; });
  }

  segButtons.forEach((b, i) => {
    b.tabIndex = i === 0 ? 0 : -1;
    b.addEventListener('click', () => setType(b));
    b.addEventListener('keydown', e => {
      const visible = segButtons.filter(s => !s.hidden);
      const pos = visible.indexOf(b);
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      const next = visible[(pos + step + visible.length) % visible.length];
      next.focus();
      setType(next);
    });
  });
  window.addEventListener('resize', placeIndicator);
  if (document.fonts) document.fonts.ready.then(placeIndicator);
  placeIndicator();

  // ── Search ─────────────────────────────────────────────────────────────
  const $search = $('#search');
  let searchTimer;
  $search.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => update(() => { state.query = $search.value.trim(); }), 120);
  });
  $search.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $search.value = '';
      update(() => { state.query = ''; });
      $search.blur();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key !== '/' || e.metaKey || e.ctrlKey) return;
    const tag = (document.activeElement || {}).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    e.preventDefault();
    $search.focus({ preventScroll: true });
    $('#catalogue').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  // ── Tags ───────────────────────────────────────────────────────────────
  function setTag (tag) {
    update(() => { state.tag = state.tag === tag ? null : tag; });
  }

  $cards.addEventListener('click', e => {
    const btn = e.target.closest('.tag');
    if (btn) setTag(btn.dataset.tag);
  });
  $('#active-tag').addEventListener('click', () => update(() => { state.tag = null; }));

  $('#reset').addEventListener('click', () => {
    $search.value = '';
    setType(segButtons[0]);
    update(() => { state.query = ''; state.tag = null; });
  });

  // Marquee of all tags, repeated so the loop has no visible seam
  const allTags = [...new Set(items.flatMap(it => it.tags))].sort();
  if (allTags.length) {
    const reps = Math.max(1, Math.ceil(16 / allTags.length));
    const set = Array.from({ length: reps }, () => allTags).flat();
    const $marquee = $('#marquee');
    [false, true].forEach(hidden => {
      const group = document.createElement('div');
      group.style.display = 'flex';
      if (hidden) group.setAttribute('aria-hidden', 'true');
      set.forEach(t => {
        const b = document.createElement('button');
        b.textContent = t;
        b.dataset.tag = t;
        if (hidden) b.tabIndex = -1;
        group.appendChild(b);
      });
      $marquee.appendChild(group);
    });
    $marquee.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      if (state.tag !== b.dataset.tag) setTag(b.dataset.tag);
      $('#catalogue').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  } else {
    $('.marquee').remove();
  }

  // ── Card spotlight follows the cursor ──────────────────────────────────
  $cards.addEventListener('pointermove', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  // ── Staggered scroll-in for cards ──────────────────────────────────────
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.filter(e => e.isIntersecting).forEach((e, n) => {
        e.target.style.setProperty('--sd', (n * 70) + 'ms');
        e.target.classList.add('in');
        e.target.classList.remove('pre');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(it => io.observe(it.el));
  } else {
    items.forEach(it => it.el.classList.remove('pre'));
  }

  // Shadow on the sticky toolbar once it is pinned
  const $toolbar = $('#toolbar');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      $toolbar.classList.toggle('stuck', $toolbar.getBoundingClientRect().top <= 13);
      ticking = false;
    });
  }, { passive: true });

  apply();

  // ── Impact stats ───────────────────────────────────────────────────────
  function countUp (el, to) {
    if (reduceMotion) { el.textContent = to.toLocaleString(); return; }
    const start = performance.now();
    const dur = 1400;
    (function frame (now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(2, -10 * p);
      el.textContent = Math.round(to * (p === 1 ? 1 : eased)).toLocaleString();
      if (p < 1) requestAnimationFrame(frame);
    })(start);
  }

  const $statDownloads = $('#stat-downloads');
  setTimeout(() => countUp($('#stat-resources'), items.length), 600);

  // Counters come from counterapi.dev. If the service is unreachable the
  // stat is removed rather than left showing a placeholder.
  function counter (path) {
    return fetch(`${COUNTER}/${path}`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(d => (typeof d.count === 'number' ? d.count : Promise.reject(d)));
  }
  const dropStat = el => () => el.closest('.stat').remove();

  // Visitor count: increment once per page load
  const $statVisitors = $('#stat-visitors');
  counter('visits/up').then(n => countUp($statVisitors, n), dropStat($statVisitors));

  // Download count: read the current total without incrementing it
  counter('downloads/').then(n => countUp($statDownloads, n), dropStat($statDownloads));

  // ...and increment it on each download click
  document.addEventListener('click', e => {
    if (!e.target.closest('.access-download[data-count]')) return;
    if (!$statDownloads.isConnected) return;
    counter('downloads/up')
      .then(n => {
        $statDownloads.textContent = n.toLocaleString();
        $statDownloads.classList.remove('bump');
        void $statDownloads.offsetWidth;
        $statDownloads.classList.add('bump');
      })
      .catch(() => {});
  });

  // ── Hero skyline: windows retrofit from ember to volt ──────────────────
  const SVGNS = 'http://www.w3.org/2000/svg';
  const $win = $('#windows');
  const $houseWin = $('#house-windows');
  if (!$win) return;

  // House outline: x 112–252, eaves at y 306, ridge at (182, 250)
  const houseTop = x => x < 112 || x > 252 ? Infinity : 306 - (70 - Math.abs(x - 182)) * (56 / 70);
  const underHouse = (x, y, w, h) =>
    x + w > 108 && x < 256 && y + h > Math.min(houseTop(Math.max(x, 112)), houseTop(Math.min(x + w, 252))) - 6;

  function addWindow (parent, x, y, w, h) {
    const r = document.createElementNS(SVGNS, 'rect');
    r.setAttribute('x', x); r.setAttribute('y', y);
    r.setAttribute('width', w); r.setAttribute('height', h);
    r.setAttribute('rx', 1.5);
    r.setAttribute('class', 'win');
    r.style.setProperty('--fd', (Math.random() * -3).toFixed(2) + 's');
    parent.appendChild(r);
    return r;
  }

  const windows = [];
  // Tall tower with a sloped roof from (70, 92) to (182, 48)
  const roofA = x => 92 - (x - 70) * (44 / 112);
  [84, 107, 130, 153].forEach(x => {
    for (let y = 104; y + 10 < 368; y += 22) {
      if (y < roofA(x + 14) + 12) continue;
      if (underHouse(x, y, 14, 10)) continue;
      windows.push(addWindow($win, x, y, 14, 10));
    }
  });
  // Mid-rise block
  [210, 232, 254, 276].forEach(x => {
    for (let y = 154; y + 10 < 368; y += 20) {
      if (underHouse(x, y, 12, 10)) continue;
      windows.push(addWindow($win, x, y, 12, 10));
    }
  });
  // House
  windows.push(addWindow($houseWin, 130, 318, 22, 16));
  windows.push(addWindow($houseWin, 212, 318, 22, 16));

  const $meter = $('.meter');
  const $num = $('#meter-num');
  const $fill = $('#meter-fill');
  const total = windows.length;
  let remaining = total;

  function retrofit (w) {
    w.classList.add('done', 'flash');
    w.addEventListener('animationend', () => w.classList.remove('flash'), { once: true });
    remaining--;
    const pct = Math.round(100 * remaining / total);
    $num.textContent = pct;
    $fill.style.transform = `scaleX(${remaining / total})`;
    if (remaining === 0) $meter.classList.add('zero');
  }

  const leaf = $('.leaf');

  if (reduceMotion) {
    windows.forEach(w => w.classList.add('done'));
    $num.textContent = '0';
    $fill.style.transform = 'scaleX(0)';
    $meter.classList.add('zero');
    return;
  }

  const order = windows.slice().sort(() => Math.random() - 0.5);
  const startAt = 1500;
  const span = 3200;
  order.forEach((w, i) => {
    // ease-in-out spacing: slow start, quick middle, slow finish
    const p = i / (order.length - 1 || 1);
    const t = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    setTimeout(() => retrofit(w), startAt + t * span);
  });

  setTimeout(() => leaf.classList.add('sway'), 2600);

  // Ambient life once at zero: a random window blinks now and then
  setTimeout(function blink () {
    if (!document.hidden) {
      const w = windows[Math.floor(Math.random() * windows.length)];
      w.classList.add('flash');
      w.addEventListener('animationend', () => w.classList.remove('flash'), { once: true });
    }
    setTimeout(blink, 900 + Math.random() * 1800);
  }, startAt + span + 800);
})();
