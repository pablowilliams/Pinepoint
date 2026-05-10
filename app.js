/* ============================================================
   Pinepoint — Atlas interactions
   No frameworks. Vanilla JS.
   ============================================================ */
(() => {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const status = $("#live-status");
  const announce = (msg) => { if (status) status.textContent = msg; };

  /* ---------- Skill catalog ---------- */
  const SKILLS = [
    // strategy
    { name: "competitive-teardown",     cat: "strategy",  desc: "Compares Pinepoint to Linear, Productboard, Aha across 12 dimensions." },
    { name: "product-manager-toolkit",  cat: "strategy",  desc: "RICE-scored feature list, PRD, discovery framework for v1." },
    { name: "product-strategist",       cat: "strategy",  desc: "Vision, OKRs, and a roadmap tied to revenue and outcomes." },
    { name: "experiment-designer",      cat: "strategy",  desc: "A/B hypothesis for the landing CTA with sample size + guardrails." },
    { name: "impeccable-shape",         cat: "strategy",  desc: "Design briefs for landing, dashboard, mobile, email." },
    { name: "product-analytics",        cat: "strategy",  desc: "KPI tree, funnel definitions, retention cohorts." },
    // research
    { name: "ux-researcher-designer",   cat: "research",  desc: "Personas, journey map, usability heuristics." },
    { name: "impeccable-critique",      cat: "research",  desc: "Persona-walkthrough critique with quantitative scoring." },
    { name: "apple-hig-expert",         cat: "research",  desc: "Mobile companion patterns mapped to HIG 2026." },
    // system
    { name: "ui-design-system",         cat: "system",    desc: "Tokens for color, type, spacing, motion, radius." },
    { name: "design-system-auditor",    cat: "system",    desc: "Validates token contrast pairs and focus-ring tokens." },
    { name: "impeccable · teach",       cat: "system",    desc: "Brand context, references, voice, design principles." },
    { name: "ui-ux-pro-max",            cat: "system",    desc: "Charts, tables, side nav, modal, dense data widgets." },
    // craft
    { name: "impeccable · craft",       cat: "craft",     desc: "Composes surfaces from the system into shippable pages." },
    { name: "landing-page-generator",   cat: "craft",     desc: "Hero, features, pricing, FAQ blocks with proven copy." },
    { name: "frontend-design",          cat: "craft",     desc: "Distinctive React/HTML interfaces, no generic AI feel." },
    { name: "senior-frontend",          cat: "craft",     desc: "React/Next.js refactor to clean primitives." },
    { name: "email-template-builder",   cat: "craft",     desc: "Welcome and digest templates that survive every client." },
    { name: "impeccable-typeset",       cat: "craft",     desc: "Type ramp with 1.25 modular scale, paired Fraunces + Inter." },
    { name: "impeccable-layout",        cat: "craft",     desc: "Layout rhythm, alignment, vertical spacing." },
    { name: "impeccable-colorize",      cat: "craft",     desc: "Strategic color injection without losing focus." },
    { name: "impeccable-clarify",       cat: "craft",     desc: "Microcopy and error messages people understand." },
    // motion
    { name: "impeccable-animate",       cat: "motion",    desc: "Purposeful motion: feedback, transitions, choreography." },
    { name: "impeccable-delight",       cat: "motion",    desc: "One signature delight moment per surface." },
    { name: "impeccable-overdrive",     cat: "motion",    desc: "Push past convention: shaders, scroll-driven, 60fps." },
    // quality
    { name: "impeccable-bolder",        cat: "quality",   desc: "Amplify safe designs without sacrificing usability." },
    { name: "impeccable-quieter",       cat: "quality",   desc: "Tone down loud surfaces; preserve quality." },
    { name: "impeccable-distill",       cat: "quality",   desc: "Remove until only the essential remains." },
    { name: "impeccable-harden",        cat: "quality",   desc: "Empty, error, loading, i18n. Production-ready." },
    { name: "a11y-audit",               cat: "quality",   desc: "WCAG 2.2 AA scan, fix list, regression tracking." },
    // ship
    { name: "impeccable-audit",         cat: "ship",      desc: "Scored quality report with P0–P3 severity." },
    { name: "impeccable-optimize",      cat: "ship",      desc: "LCP, bundle, animation perf budgets enforced." },
    { name: "impeccable-polish",        cat: "ship",      desc: "Final pixel-pass: alignment, spacing, consistency." },
    { name: "impeccable-adapt",         cat: "ship",      desc: "Responsive at 320 → 1440, touch targets, reflow." },
  ];

  /* ---------- Render atlas grid ---------- */
  function renderAtlas() {
    const ul = $("#atlas-grid");
    if (!ul) return;
    ul.innerHTML = SKILLS.map((s) => `
      <li class="atlas-card" data-cat="${s.cat}">
        <span class="atlas-cat">${s.cat}</span>
        <p class="atlas-name">${s.name}</p>
        <p class="atlas-desc">${s.desc}</p>
        <span class="atlas-link" aria-hidden="true">Demo</span>
      </li>
    `).join("");
    // Update chip counts
    const counts = SKILLS.reduce((a, s) => (a[s.cat] = (a[s.cat] || 0) + 1, a), {});
    $$(".chip-count").forEach((el) => {
      const k = el.dataset.count;
      el.textContent = k === "all" ? SKILLS.length : (counts[k] || 0);
    });
  }

  /* ---------- Filter chips ---------- */
  function wireFilters() {
    const chips = $$(".chip");
    const grid = $("#atlas-grid");
    let activeFilter = "all";
    let debounce;
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const f = chip.dataset.filter;
        chips.forEach((c) => {
          const on = c === chip;
          c.classList.toggle("is-on", on);
          c.setAttribute("aria-pressed", on ? "true" : "false");
        });
        activeFilter = f;
        const cards = $$(".atlas-card", grid);
        let shown = 0;
        cards.forEach((card) => {
          const match = f === "all" || card.dataset.cat === f;
          card.hidden = !match;
          if (match) shown++;
        });
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          announce(`${shown} skill${shown === 1 ? "" : "s"} shown`);
        }, 380);
      });
    });
  }

  /* ---------- Theme toggle ---------- */
  function wireTheme() {
    const btn = $("#theme-toggle");
    const label = $("#theme-toggle-label");
    if (!btn) return;
    const stored = localStorage.getItem("pinepoint-theme");
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = stored || (prefersLight ? "light" : "dark");
    setTheme(initial);
    btn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme");
      const next = cur === "dark" ? "light" : "dark";
      setTheme(next);
      announce(`${next === "dark" ? "Dark" : "Light"} theme enabled`);
    });
    function setTheme(t) {
      document.documentElement.setAttribute("data-theme", t);
      localStorage.setItem("pinepoint-theme", t);
      const isDark = t === "dark";
      btn.setAttribute("aria-pressed", isDark ? "false" : "true");
      btn.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
      label.textContent = isDark ? "Light" : "Dark";
      // Re-render palette for new fg pairings
      renderPalette();
    }
  }

  /* ---------- Contrast helpers ---------- */
  function hexToRgb(hex) {
    const s = hex.replace("#", "");
    const v = s.length === 3 ? s.split("").map((c) => c + c).join("") : s;
    return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
  }
  function relLum([r, g, b]) {
    const a = [r, g, b].map((v) => {
      v = v / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  function contrast(hex1, hex2) {
    const L1 = relLum(hexToRgb(hex1));
    const L2 = relLum(hexToRgb(hex2));
    const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
    return (hi + 0.05) / (lo + 0.05);
  }
  function pickFg(bgHex) {
    const onWhite = contrast(bgHex, "#ffffff");
    const onBlack = contrast(bgHex, "#0b0d12");
    return onWhite >= onBlack ? "#ffffff" : "#0b0d12";
  }
  function verdict(ratio, large = false) {
    const aaa = large ? 4.5 : 7;
    const aa  = large ? 3   : 4.5;
    if (ratio >= aaa) return { label: "AAA", icon: "★" };
    if (ratio >= aa)  return { label: "AA",  icon: "✓" };
    return { label: "Fail", icon: "✕" };
  }

  /* ---------- Palette grid ---------- */
  const PALETTES = [
    { name: "Brand · Ink",    pairs: [["#5b8cff", "#3866dd"], ["#9cb6ff", "#1f3a8a"]] },
    { name: "Pink · Pulse",   pairs: [["#ff7ab8", "#ad2766"], ["#ffb1d4", "#5a113a"]] },
    { name: "Warm · Ember",   pairs: [["#ffd29c", "#7a3a08"], ["#ff9a5b", "#5a2700"]] },
    { name: "Mint · Signal",  pairs: [["#3ddc97", "#0d4d34"], ["#9bf2c9", "#0a3826"]] },
    { name: "Neutral · Graphite", pairs: [["#0b0d12", "#eaecf2"], ["#7f8693", "#0b0d12"]] },
    { name: "Status",         pairs: [["#ff5d6a", "#3d0a10"], ["#ffb547", "#3d2606"]] },
  ];
  function renderPalette() {
    const root = $("#palette-grid");
    if (!root) return;
    root.innerHTML = PALETTES.map((p) => `
      <article class="palette" aria-labelledby="pal-${p.name.replace(/\W+/g, "")}">
        <div class="palette-name" id="pal-${p.name.replace(/\W+/g, "")}">
          <span>${p.name}</span>
          <span>${p.pairs.length} pairs</span>
        </div>
        <div class="swatch-row">
          ${p.pairs.map(([bg, fg]) => {
            const ratio = contrast(bg, fg);
            const v = verdict(ratio);
            const isLight = relLum(hexToRgb(bg)) > 0.5;
            return `
              <button type="button" class="swatch ${isLight ? "light" : ""}" style="--bg:${bg}; --fg:${fg};" data-copy="${bg}" aria-label="Copy hex ${bg}, contrast against ${fg} is ${ratio.toFixed(2)} to one, ${v.label}">
                <span class="sw-hex">${bg.toUpperCase()}</span>
                <span class="sw-meta">on ${fg.toUpperCase()}</span>
                <span class="sw-ratio">${ratio.toFixed(2)} : 1
                  <span class="sw-pass" aria-hidden="true">${v.icon} ${v.label}</span>
                </span>
              </button>
            `;
          }).join("")}
        </div>
      </article>
    `).join("");
    $$(".swatch").forEach((sw) => {
      sw.addEventListener("click", async () => {
        const hex = sw.dataset.copy;
        try {
          await navigator.clipboard.writeText(hex);
          announce(`${hex} copied to clipboard`);
        } catch {
          announce(`Copy failed`);
        }
      });
    });
  }

  /* ---------- Count-up ---------- */
  function wireCountUps() {
    const targets = $$("[data-countup]");
    if (!targets.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        if (el.dataset.done === "1") return;
        el.dataset.done = "1";
        const to = +el.dataset.countup;
        if (reduced()) { el.textContent = to.toLocaleString(); return; }
        const dur = 900;
        const start = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 4);
        function frame(now) {
          const t = Math.min(1, (now - start) / dur);
          el.textContent = Math.round(ease(t) * to).toLocaleString();
          if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.4 });
    targets.forEach((t) => obs.observe(t));
  }

  /* ---------- Score ring count-up: arc grows with the number ---------- */
  function wireScoreRings() {
    const audits = $$(".audit");
    if (!audits.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const card = e.target;
        if (card.dataset.played === "1") return;
        card.dataset.played = "1";
        const arc = $(".score-arc", card);
        const numEl = $(".score-num [data-countup]", card);
        if (!arc || !numEl) return;
        const score = +numEl.dataset.countup;
        if (reduced()) { arc.setAttribute("stroke-dasharray", `${score} 100`); return; }
        arc.setAttribute("stroke-dasharray", `0 100`);
        const start = performance.now();
        const dur = 900;
        const ease = (t) => 1 - Math.pow(1 - t, 4);
        function frame(now) {
          const t = Math.min(1, (now - start) / dur);
          arc.setAttribute("stroke-dasharray", `${(ease(t) * score).toFixed(2)} 100`);
          if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.4 });
    audits.forEach((a) => obs.observe(a));
  }

  /* ---------- Before/After sliders ---------- */
  function wireBA() {
    $$(".ba-frame").forEach((frame) => {
      const input = $(".ba-range", frame);
      if (!input) return;
      const update = () => {
        const v = +input.value;
        frame.style.setProperty("--pos", v + "%");
        input.setAttribute("aria-valuetext", `${v} percent after image visible`);
        input.setAttribute("aria-valuenow", String(v));
      };
      input.addEventListener("input", update);
      update();
    });
  }

  /* ---------- Motion playground ---------- */
  function wireMotion() {
    const playBtn = $("#motion-play");
    const loopBtn = $("#motion-loop");
    const durInput = $("#motion-dur");
    const durVal = $("#motion-dur-val");
    const easeInput = $("#motion-ease");
    const easeVal = $("#motion-ease-val");
    const rmBtn = $("#motion-rm");
    if (!playBtn) return;

    const easings = [
      { label: "linear",    css: "linear" },
      { label: "out-quart", css: "cubic-bezier(0.25, 1, 0.5, 1)" },
      { label: "out-quint", css: "cubic-bezier(0.22, 1, 0.36, 1)" },
      { label: "out-expo",  css: "cubic-bezier(0.16, 1, 0.3, 1)" },
      { label: "spring",    css: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    ];

    let looping = false;
    let respectRM = true;
    let loopHandle = null;

    const stages = $$(".motion-stage");

    const keyframesFor = (kind) => {
      switch (kind) {
        case "fade":   return [{ opacity: 0 }, { opacity: 1 }];
        case "slide":  return [{ transform: "translateX(-30px)", opacity: 0 }, { transform: "translateX(0)", opacity: 1 }];
        case "scale":  return [{ transform: "scale(0.6)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }];
        case "rotate": return [{ transform: "rotate(-12deg) scale(0.85)", opacity: 0 }, { transform: "rotate(0) scale(1)", opacity: 1 }];
        case "reveal": return [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }];
        case "bounce": return [
          { transform: "translateY(40px)", opacity: 0 },
          { transform: "translateY(-6px)", opacity: 1, offset: 0.7 },
          { transform: "translateY(0)", opacity: 1 },
        ];
        default: return [{ opacity: 0 }, { opacity: 1 }];
      }
    };

    const playOnce = () => {
      if (respectRM && reduced()) {
        announce("Motion suppressed for reduced-motion preference");
        return;
      }
      const dur = +durInput.value;
      const ease = easings[+easeInput.value]?.css || "ease";
      stages.forEach((stage, i) => {
        const block = $(".motion-block", stage) || $(".reveal-mask", stage);
        if (!block) return;
        const kind = stage.dataset.anim;
        block.animate(keyframesFor(kind), { duration: dur, delay: i * 60, easing: ease, fill: "both" });
      });
      announce(`Motion played, ${dur} ms ${easings[+easeInput.value]?.label}`);
    };

    playBtn.addEventListener("click", () => playOnce());

    loopBtn.addEventListener("click", () => {
      looping = !looping;
      loopBtn.setAttribute("aria-pressed", looping ? "true" : "false");
      loopBtn.classList.toggle("btn-secondary", looping);
      loopBtn.classList.toggle("btn-ghost", !looping);
      if (looping) {
        if (respectRM && reduced()) { announce("Loop blocked by reduced-motion preference"); looping = false; loopBtn.setAttribute("aria-pressed", "false"); return; }
        const tick = () => {
          playOnce();
          const wait = (+durInput.value) + 400;
          loopHandle = setTimeout(tick, wait);
        };
        tick();
      } else {
        if (loopHandle) clearTimeout(loopHandle);
      }
    });

    durInput.addEventListener("input", () => {
      durVal.textContent = `${durInput.value}ms`;
      durInput.setAttribute("aria-valuenow", durInput.value);
      durInput.setAttribute("aria-valuetext", `${durInput.value} milliseconds`);
    });
    easeInput.addEventListener("input", () => {
      const e = easings[+easeInput.value];
      easeVal.textContent = e.label;
      easeInput.setAttribute("aria-valuenow", easeInput.value);
      easeInput.setAttribute("aria-valuetext", `ease ${e.label}`);
    });

    rmBtn.setAttribute("aria-pressed", "true");
    rmBtn.classList.add("btn-secondary");
    rmBtn.classList.remove("btn-ghost");
    rmBtn.addEventListener("click", () => {
      respectRM = !respectRM;
      rmBtn.setAttribute("aria-pressed", respectRM ? "true" : "false");
      rmBtn.classList.toggle("btn-secondary", respectRM);
      rmBtn.classList.toggle("btn-ghost", !respectRM);
      announce(`Reduced-motion respect ${respectRM ? "enabled" : "disabled"}`);
    });
  }

  /* ---------- Section nav focus ---------- */
  function wireSectionNav() {
    $$(".section-nav a").forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (!id || !id.startsWith("#")) return;
        const target = $(id);
        if (!target) return;
        // Move focus to section heading after scroll for SR users
        const h2 = target.querySelector("h2");
        if (h2) {
          h2.setAttribute("tabindex", "-1");
          setTimeout(() => h2.focus({ preventScroll: true }), 320);
        }
      });
    });
  }

  /* ---------- Sortable feature table ---------- */
  const FEATURES = [
    { name: "SSO providers v2",      sub: "Okta, Google, Microsoft",      reach: 240, impact: 3,   conf: 80, effort: 3, status: { l: "P0 · Now",   c: "info"    } },
    { name: "CSV import",            sub: "Drag, map, validate",          reach: 180, impact: 2,   conf: 90, effort: 2, status: { l: "P0 · Now",   c: "info"    } },
    { name: "Public roadmap link",   sub: "Read-only share",              reach: 320, impact: 2,   conf: 70, effort: 2, status: { l: "P1 · Next",  c: "warning" } },
    { name: "Slack digest",          sub: "Customizable cadence",         reach: 140, impact: 2,   conf: 75, effort: 1, status: { l: "P1 · Next",  c: "warning" } },
    { name: "API webhooks",          sub: "Outbound on signal change",    reach: 60,  impact: 3,   conf: 60, effort: 4, status: { l: "P2 · Later", c: "neutral" } },
    { name: "AI theme summarizer",   sub: "Cluster → 1-line abstract",    reach: 200, impact: 2.5, conf: 55, effort: 3, status: { l: "Discovery",  c: "neutral" } },
    { name: "Audit log export",      sub: "SOC 2 readiness",              reach: 40,  impact: 1,   conf: 95, effort: 1, status: { l: "Backlog",    c: "neutral" } },
    { name: "Native Linear sync",    sub: "Bidirectional issue link",     reach: 110, impact: 2,   conf: 65, effort: 3, status: { l: "P1 · Next",  c: "warning" } },
  ].map((f) => ({ ...f, score: Math.round((f.reach * f.impact * (f.conf / 100)) / f.effort) }));

  function renderRiceTable(sortKey = "score", dir = "desc") {
    const body = $("#rice-body");
    if (!body) return;
    const rows = [...FEATURES].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
      return dir === "asc" ? cmp : -cmp;
    });
    body.innerHTML = rows.map((f) => `
      <tr>
        <td class="feature">${f.name}<span>${f.sub}</span></td>
        <td class="num">${f.reach}</td>
        <td class="num">${f.impact}</td>
        <td class="num">${f.conf}%</td>
        <td class="num">${f.effort}</td>
        <td class="num score">${f.score}</td>
        <td><span class="badge badge-${f.status.c}">${f.status.l}</span></td>
      </tr>
    `).join("");
    $$(".rice-table thead th").forEach((th) => {
      const btn = $("button", th);
      const k = btn?.dataset.sort;
      if (!k) return;
      const isActive = k === sortKey;
      th.setAttribute("aria-sort", isActive ? (dir === "asc" ? "ascending" : "descending") : "none");
      th.classList.toggle("is-sorted", isActive);
    });
  }

  function wireRiceTable() {
    let sortKey = "score";
    let dir = "desc";
    renderRiceTable(sortKey, dir);
    $$(".rice-table thead button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.sort;
        if (sortKey === k) { dir = dir === "asc" ? "desc" : "asc"; }
        else { sortKey = k; dir = (k === "name") ? "asc" : "desc"; }
        renderRiceTable(sortKey, dir);
        announce(`Sorted by ${k}, ${dir === "asc" ? "ascending" : "descending"}`);
      });
    });
  }

  /* ---------- Toasts ---------- */
  const TOAST_COPY = {
    success: { title: "14 signals archived", msg: "Restore within 30 days from the archive." },
    info:    { title: "Sync complete",       msg: "Pinepoint just refreshed signals from Intercom." },
    warning: { title: "API rate limit close",msg: "Linear is at 88% of its hourly quota. Slowing polls." },
    error:   { title: "Couldn't reach Intercom", msg: "Check your API key in Settings, then retry." },
  };
  const TOAST_ICON = { success: "✓", info: "i", warning: "!", error: "×" };

  function fireToast(kind) {
    const tray = $("#toast-tray");
    if (!tray) return;
    const t = TOAST_COPY[kind] || TOAST_COPY.info;
    const node = document.createElement("div");
    node.className = `toast toast-${kind}`;
    node.setAttribute("role", kind === "error" ? "alert" : "status");
    node.setAttribute("aria-live", kind === "error" ? "assertive" : "polite");
    node.innerHTML = `
      <span class="toast-icon" aria-hidden="true">${TOAST_ICON[kind] || "i"}</span>
      <div class="toast-body">
        <p class="toast-title">${t.title}</p>
        <p class="toast-msg">${t.msg}</p>
      </div>
      <button type="button" class="toast-close" aria-label="Dismiss notification">×</button>
    `;
    tray.appendChild(node);
    requestAnimationFrame(() => node.classList.add("is-in"));
    const remove = () => {
      node.classList.remove("is-in");
      node.classList.add("is-out");
      setTimeout(() => node.remove(), 300);
    };
    node.querySelector(".toast-close").addEventListener("click", remove);
    if (!reduced()) setTimeout(remove, 5200);
    announce(`${kind} notification: ${t.title}`);
  }

  function wireToasts() {
    $$(".toast-controls [data-toast]").forEach((btn) => {
      btn.addEventListener("click", () => fireToast(btn.dataset.toast));
    });
  }

  /* ---------- Accessible dialog (focus trap + return + escape) ---------- */
  function wireDialog() {
    const dlg = $("#confirm-dialog");
    const openBtn = $("#open-dialog");
    const closeBtn = $("#dialog-close");
    const cancelBtn = $("#dialog-cancel");
    const confirmBtn = $("#dialog-confirm");
    if (!dlg || !openBtn) return;

    let returnTo = null;

    const openDialog = () => {
      returnTo = document.activeElement;
      if (typeof dlg.showModal === "function") dlg.showModal();
      else dlg.setAttribute("open", "");
      // Focus the cancel button (least-destructive default)
      setTimeout(() => cancelBtn?.focus(), 30);
    };

    const closeDialog = (msg) => {
      if (typeof dlg.close === "function") dlg.close();
      else dlg.removeAttribute("open");
      if (returnTo && typeof returnTo.focus === "function") returnTo.focus();
      if (msg) announce(msg);
    };

    openBtn.addEventListener("click", openDialog);
    closeBtn.addEventListener("click", () => closeDialog("Dialog closed"));
    cancelBtn.addEventListener("click", () => closeDialog("Archive cancelled"));
    confirmBtn.addEventListener("click", () => {
      closeDialog("14 signals archived");
      fireToast("success");
    });

    // Native <dialog> handles Esc → "cancel" event; intercept to also restore focus
    dlg.addEventListener("cancel", (e) => {
      e.preventDefault();
      closeDialog("Dialog dismissed");
    });

    // Manual focus trap as a defense-in-depth (some Safari/older browsers)
    dlg.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusables = $$(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        dlg
      ).filter((el) => !el.disabled && el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }

  /* ---------- Token JSON viewer ---------- */
  const TOKEN_JSON = {
    color: {
      brand:  { 50: "#eef3ff", 100: "#d8e3ff", 300: "#9cb6ff", 500: "#5b8cff", 700: "#3866dd", 900: "#1f3a8a" },
      warm:   { 300: "#ffd29c", 500: "#ff9a5b", 700: "#d96a26" },
      pink:   { 500: "#ff7ab8" },
      mint:   { 500: "#3ddc97" },
      status: { success: "#3ddc97", warning: "#ffb547", danger: "#ff5d6a", info: "#6ec5ff" }
    },
    spacing: { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64, 9: 96 },
    radius:  { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, pill: 999 },
    motion:  {
      "ease-out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      "ease-out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
      "ease-out-expo":  "cubic-bezier(0.16, 1, 0.3, 1)",
      durations: { fast: "150ms", mid: "280ms", slow: "520ms" }
    }
  };

  function highlightJson(json) {
    const str = JSON.stringify(json, null, 2);
    return str
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, '<span class="tok-key">$1</span>$2')
      .replace(/:\s*("(?:[^"\\]|\\.)*")/g, (m, s) => ': <span class="tok-str">' + s + '</span>')
      .replace(/:\s*(-?\d+(?:\.\d+)?)/g, ': <span class="tok-num">$1</span>')
      .replace(/([{}\[\],])/g, '<span class="tok-punct">$1</span>');
  }

  function wireJson() {
    const codeEl = $("#tokens-json");
    const copyBtn = $("#copy-json");
    if (!codeEl || !copyBtn) return;
    codeEl.innerHTML = highlightJson(TOKEN_JSON);
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(JSON.stringify(TOKEN_JSON, null, 2));
        copyBtn.textContent = "Copied";
        announce("Token JSON copied to clipboard");
        setTimeout(() => (copyBtn.textContent = "Copy"), 1600);
      } catch {
        announce("Copy failed");
      }
    });
  }

  /* ---------- Mouse-reactive hero glow (overdrive) ---------- */
  function wireHeroGlow() {
    const hero = $(".hero");
    const glow = $(".hero-glow");
    if (!hero || !glow) return;
    if (reduced()) return;
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let targetX = 50, targetY = 30;
    let curX = 50, curY = 30;

    const onMove = (e) => {
      const r = hero.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      targetX = Math.max(-10, Math.min(110, x));
      targetY = Math.max(-10, Math.min(110, y));
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      glow.style.setProperty("--mx", curX.toFixed(2) + "%");
      glow.style.setProperty("--my", curY.toFixed(2) + "%");
      if (Math.abs(curX - targetX) > 0.2 || Math.abs(curY - targetY) > 0.2) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    hero.addEventListener("pointermove", onMove);
  }

  /* ---------- Boot ---------- */
  function init() {
    renderAtlas();
    wireFilters();
    wireTheme();        // calls renderPalette() too
    wireBA();
    wireMotion();
    wireCountUps();
    wireScoreRings();
    wireSectionNav();
    wireRiceTable();
    wireToasts();
    wireDialog();
    wireJson();
    wireHeroGlow();
    announce("Atlas ready.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
