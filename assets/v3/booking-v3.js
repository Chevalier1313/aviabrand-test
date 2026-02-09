(() => {
  "use strict";


  function fmtISO(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

function initBookingV3(form, refs = {}) {
  const { burgerBtn, mmenu } = refs;
    if (!form) return;

    // Refs
    const fromInput = form.querySelector("#fromInput");
    const toInput = form.querySelector("#toInput");
    const fromList = form.querySelector("#fromList");
    const toList = form.querySelector("#toList");
    const fromCode = form.querySelector("#fromCode");
    const toCode = form.querySelector("#toCode");

    const date1 = form.querySelector("#date1Input");
    const date2 = form.querySelector("#date2Input");
    const date1Wrap = date1?.closest(".bk3-date");
    const date2Wrap = date2?.closest(".bk3-date");

    const oneWayBtn = form.querySelector("#oneWayBtn");

    const cal = document.getElementById("calPopup");
    const calInput = document.getElementById("calInput");
    const calCloseBtn = document.getElementById("calCloseBtn");
    // Mobile calendar (custom UI)
const calMobile = document.getElementById("calMobile");
const mTabDepart = document.getElementById("mTabDepart");
const mTabReturn = document.getElementById("mTabReturn");
const mWeekdays = cal ? cal.querySelector(".bk3-mcal-weekdays") : null;
const mMonths = document.getElementById("mMonths");

    const calPhaseLabel = form.querySelector("#calPhaseLabel");
    const calOwnerLabel = form.querySelector("#calOwnerLabel");

    const paxBtn = form.querySelector("#paxBtn");
    const paxPopup = form.querySelector("#paxPopup");
    const paxDone = form.querySelector("#paxDone");
    const paxAdt = form.querySelector("#paxAdt");
    const paxChd = form.querySelector("#paxChd");
    const paxInf = form.querySelector("#paxInf");
    const paxValue = form.querySelector("#paxValue");

    const submitBtn = form.querySelector("#submitBtn");
    const swapBtn = form.querySelector("#swapBtn");
const langBar = document.querySelector(".bk3-lang");
    // ===== Mobile menu toggle =====
function openMobileMenu() {
  if (!mmenu || !burgerBtn) return;
  mmenu.hidden = false;
  mmenu.classList.add("is-open");

  burgerBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  if (!mmenu || !burgerBtn) return;
  mmenu.hidden = true;
  mmenu.classList.remove("is-open");

  burgerBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

burgerBtn?.addEventListener("click", () => {
  if (!mmenu) return;
  if (mmenu.hidden) openMobileMenu();
  else closeMobileMenu();
});

mmenu?.addEventListener("click", (e) => {
  const nav = e.target?.closest?.(".bk3-mmenu-nav");
  if (nav) return;
  closeMobileMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mmenu && !mmenu.hidden) closeMobileMenu();
});

    
    // State (single source of truth)
    const state = {
      from: { text: "", code: "" },
      to: { text: "", code: "" },

      tripType: "RT", // "RT" | "OW"
      dates: { depart: "", ret: "" },

      cal: { open: false, phase: "DEPART", owner: "date1" }, // phase: DEPART|RETURN owner: date1|date2
      pax: { adt: 1, chd: 0, inf: 0 }
    };

    const TARGET = "ets-redirect.html";

    
  //  const TARGET = "coming-soon-v3.html";

let isSubmitting = false;

    // -----------------------------
    // Render helpers
    // -----------------------------
    function renderTripType() {
      const isOW = state.tripType === "OW";
      oneWayBtn.setAttribute("aria-pressed", isOW ? "true" : "false");

      date2.disabled = isOW;
      if (isOW) date2.value = "";
        // i18n: one-way button label depends on mode
  if (window.AB_I18N && oneWayBtn) {
    const key = state.tripType === "OW" ? "btn_oneway_off" : "btn_oneway_on";
    oneWayBtn.textContent = AB_I18N.t(key);
  }

    }

    function renderDates() {
  

  // show human-readable, keep ISO in state
  date1.value = state.dates.depart
  ? (window.AB_I18N ? AB_I18N.formatDateUI(state.dates.depart) : state.dates.depart)
  : "";

date2.value = state.dates.ret
  ? (window.AB_I18N ? AB_I18N.formatDateUI(state.dates.ret) : state.dates.ret)
  : "";

}

   function renderLangButtons() {
  if (!langBar || !window.AB_I18N) return;
  const cur = AB_I18N.getLang();
  langBar.querySelectorAll(".bk3-langbtn").forEach((btn) => {
    const v = btn.getAttribute("data-lang");
    btn.classList.toggle("is-active", v === cur);
  });
}

function renderCalendarUI() {
  // (если ты удалил заголовок DEPART/RETURN — эти элементы могут быть null)
  if (calPhaseLabel) calPhaseLabel.textContent = state.cal.phase;
  if (calOwnerLabel) calOwnerLabel.textContent = state.cal.owner;

  const expanded = state.cal.open ? "true" : "false";
  date1.setAttribute("aria-expanded", expanded);
  date2.setAttribute("aria-expanded", expanded);

  // ✅ owner highlight: only while calendar is OPEN
  const w1 = date1?.closest(".bk3-date");
  const w2 = date2?.closest(".bk3-date");

  if (!state.cal.open) {
    w1?.classList.remove("is-owner");
    w2?.classList.remove("is-owner");
    return;
  }

  w1?.classList.toggle("is-owner", state.cal.owner === "date1");
  w2?.classList.toggle("is-owner", state.cal.owner === "date2");
  if (isMobileCal()) {
  setMobileTabs();
}

}



    function renderPax() {
      paxAdt.textContent = String(state.pax.adt);
      paxChd.textContent = String(state.pax.chd);
      paxInf.textContent = String(state.pax.inf);

  const total = state.pax.adt + state.pax.chd + state.pax.inf;

let label = `${total}`;

// i18n plural summary
if (window.AB_I18N) {
  const lang = AB_I18N.getLang();

  if (lang === "ru") {
    const n = total;
    const mod10 = n % 10;
    const mod100 = n % 100;

    let word = AB_I18N.t("pax_summary_many");
    if (mod10 === 1 && mod100 !== 11) {
      word = AB_I18N.t("pax_summary_one");
    } else if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
      word = AB_I18N.t("pax_summary_few");
    }

    label = `${n} ${word}`;
  } else if (lang === "uz") {
    label =
      total === 1
        ? `1 ${AB_I18N.t("pax_summary_one")}`
        : `${total} ${AB_I18N.t("pax_summary_many")}`;
  } else {
    // en
    label =
      total === 1
        ? `1 ${AB_I18N.t("pax_summary_one")}`
        : `${total} ${AB_I18N.t("pax_summary_many")}`;
  }
}

paxBtn.textContent = label;
paxValue.value = `ADT${state.pax.adt}-CHD${state.pax.chd}-INF${state.pax.inf}`;

    }

    function closeList(which) {
      const list = which === "from" ? fromList : toList;
      const input = which === "from" ? fromInput : toInput;
      if (!list || !input) return;
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
    }

// Flatpickr (real calendar) inside #calPopup

let fp = null;
let fpInternal = false;

function ensureFlatpickr() {
  if (fp || !window.flatpickr || !calInput) return;

  fp = window.flatpickr(calInput, {
    inline: true,
    showMonths: 1,
    disableMobile: true,
    dateFormat: "Y-m-d",
    minDate: "today",
        locale: (() => {
      const lang = window.AB_I18N ? AB_I18N.getLang() : "ru";
      // EN default = no extra locale file
      if (lang === "ru" && window.flatpickr?.l10ns?.ru) return window.flatpickr.l10ns.ru;
      if (lang === "uz" && window.flatpickr?.l10ns?.uz_latn) return window.flatpickr.l10ns.uz_latn;
      return { firstDayOfWeek: 1 };
    })(),



    onChange: (selectedDates) => {
      if (fpInternal) return;
      const d = selectedDates && selectedDates[0];
      if (!d) return;

      const iso = fmtISO(d);

      // DEPART pick
      if (state.cal.phase === "DEPART") {
        afterPickDepart(iso);
        // After picking depart in RT: keep open, switch to RETURN
        if (state.tripType !== "OW") {
          // tighten return minDate = depart
          fpInternal = true;
          fp.set("minDate", state.dates.depart || "today");
          fpInternal = false;
        }
        return;
      }

      // RETURN pick
      if (state.cal.phase === "RETURN") {
        // enforce: return >= depart
        if (state.dates.depart && iso < state.dates.depart) {
          showError(
  '[data-pill="dates"]',
  window.AB_I18N ? AB_I18N.t("err_return_before_depart") : "Дата возвращения не может быть раньше даты вылета"
);

          // keep open in RETURN, do not accept
          fpInternal = true;
          fp.clear(); // do not keep invalid selection
          fpInternal = false;
          return;
        }

        clearPillError('[data-pill="dates"]');
        afterPickReturn(iso);
      }
    },
  });
}
// =========================
// Mobile calendar (custom)
// =========================
function isMobileCal() {
  return window.matchMedia("(max-width: 640px)").matches;
}

function uiLang() {
  return window.AB_I18N ? AB_I18N.getLang() : "ru";
}

function localeTag() {
  const lang = uiLang();
  if (lang === "en") return "en-US";
  if (lang === "uz") return "uz-Latn-UZ";
  return "ru-RU";
}

function capFirst(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function weekdayLabels() {
  const lang = uiLang();
  if (lang === "en") return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  if (lang === "uz") return ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];
  return ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
}

function monthTitle(dt) {
  const lang = uiLang();
  const y = dt.getFullYear();

  const mRU = [
    "Январь","Февраль","Март","Апрель","Май","Июнь",
    "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
  ];
  const mEN = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const mUZ = [
    "Yanvar","Fevral","Mart","Aprel","May","Iyun",
    "Iyul","Avgust","Sentyabr","Oktyabr","Noyabr","Dekabr"
  ];

  const i = dt.getMonth();
  if (lang === "en") return `${mEN[i]} ${y}`;
  if (lang === "uz") return `${mUZ[i]} ${y}`;
  return `${mRU[i]} ${y}`;
}


function parseISO(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function ymd(dt) {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function renderMobileWeekdays() {
  if (!mWeekdays) return;
  mWeekdays.innerHTML = "";
  weekdayLabels().forEach((t) => {
    const d = document.createElement("div");
    d.textContent = t;
    mWeekdays.appendChild(d);
  });
}

function setMobileTabs() {
  if (!mTabDepart || !mTabReturn) return;

  const isOW = state.tripType === "OW";
  const canReturn = !isOW && Boolean(state.dates.depart);

  mTabDepart.classList.toggle("is-active", state.cal.phase === "DEPART");
  mTabReturn.classList.toggle("is-active", state.cal.phase === "RETURN");

  // disable return tab when OW or no depart yet
  mTabReturn.disabled = !canReturn;
}

function renderMobileMonths() {
  if (!mMonths) return;

  const todayISO = ymd(new Date());
  const departISO = state.dates.depart || "";
  const returnISO = state.dates.ret || "";

  const hasRange = Boolean(departISO && returnISO);
  const rangeMin = hasRange ? departISO : "";
  const rangeMax = hasRange ? returnISO : "";

  // base month: depart month if exists, else current month
  const base = parseISO(state.dates.depart) || new Date();
  const start = new Date(base.getFullYear(), base.getMonth(), 1);

  mMonths.innerHTML = "";

  const monthsToShow = 6; // vertical list
  for (let i = 0; i < monthsToShow; i++) {
    const first = new Date(start.getFullYear(), start.getMonth() + i, 1);
    const year = first.getFullYear();
    const month = first.getMonth();

    const card = document.createElement("div");
    card.className = "bk3-mcal-month";
    card.dataset.year = String(year);
    card.dataset.month = String(month);

    const title = document.createElement("div");
    title.className = "bk3-mcal-month-title";
    title.textContent = monthTitle(first);
    card.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "bk3-mcal-grid";

    // Monday-first index
    const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 42 cells
    for (let cell = 0; cell < 42; cell++) {
      const dayNum = cell - firstDow + 1;
      const cellEl = document.createElement("div");
      cellEl.className = "bk3-mcal-day";

      if (dayNum < 1 || dayNum > daysInMonth) {
        cellEl.classList.add("is-dim", "is-disabled");
        cellEl.textContent = "";
        grid.appendChild(cellEl);
        continue;
      }

      const dt = new Date(year, month, dayNum);
      const iso = ymd(dt);

      cellEl.textContent = String(dayNum);
      cellEl.dataset.iso = iso;

      // disable before today
      let disabled = iso < todayISO;

      // disable return < depart when picking RETURN
      if (state.cal.phase === "RETURN" && departISO) {
        if (iso < departISO) disabled = true;
      }

      if (disabled) cellEl.classList.add("is-disabled");

      // selected / range
      if (iso === departISO || iso === returnISO) {
        cellEl.classList.add("is-selected");
      }
      if (hasRange && iso > rangeMin && iso < rangeMax) {
        cellEl.classList.add("is-inrange");
      }

      grid.appendChild(cellEl);
    }

    card.appendChild(grid);
    mMonths.appendChild(card);
  }
}

function renderMobileCalendar() {
  if (!calMobile) return;
  renderMobileWeekdays();
  setMobileTabs();
  renderMobileMonths();
}


    // -----------------------------
    // Calendar controller (minimal)
    // -----------------------------
    function openCalendar(owner) {
      if (!cal || !calInput) return;


      // owner: "date1" | "date2"
      // Determine phase strictly
     if (state.tripType === "OW") owner = "date1";
 

        // guard: cannot open RETURN without DEPART
if (owner === "date2" && !state.dates.depart) {
  owner = "date1";
}

if (owner === "date2") {
  state.cal.phase = "RETURN";
  state.cal.owner = "date2";
} else {
  state.cal.phase = "DEPART";
  state.cal.owner = "date1";
}

      // init calendar if needed + configure minDate per phase
ensureFlatpickr();
// Mobile: render multiple months for vertical scroll
if (fp) {
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  fp.set("showMonths", isMobile ? 1 : 2);
}

if (fp) {
  fpInternal = true;

  if (state.cal.phase === "DEPART") {
    fp.set("minDate", "today");
    if (state.dates.depart) fp.jumpToDate(state.dates.depart);
    if (state.dates.depart) fp.setDate(state.dates.depart, false);
  } else {
    fp.set("minDate", state.dates.depart || "today");
    if (state.dates.ret) fp.jumpToDate(state.dates.ret);
    else if (state.dates.depart) fp.jumpToDate(state.dates.depart);

    if (state.dates.ret) fp.setDate(state.dates.ret, false);
    else if (state.dates.depart) fp.setDate(state.dates.depart, false);
  }

  fpInternal = false;
}


      state.cal.open = true;
      cal.hidden = false;
      renderCalendarUI();
      
      // Mobile: use custom calendar UI
if (isMobileCal()) {
  if (calMobile) calMobile.hidden = false;
  renderMobileCalendar();
  return;
} else {
  if (calMobile) calMobile.hidden = true;
}

      // ✅ position popup under dates group (calPopup is outside <form>)
requestAnimationFrame(() => {
  const anchor =
    document.querySelector('[data-pill="dates"]') ||
    document.querySelector('.bk3-dates-grid') ||
    (owner === "date2" ? date2 : date1);

  if (!anchor) return;

  const r = anchor.getBoundingClientRect();
  const calW = cal.offsetWidth || 640;

  const left = Math.max(
    8,
    Math.min(window.innerWidth - calW - 8, r.left + (r.width - calW) / 2)
  );

  const top = r.bottom + 16;

  cal.style.left = `${left}px`;
  cal.style.top = `${top}px`;
});


      // keep focus on owner input (calendar is popup, not focus trap)
requestAnimationFrame(() => {
  if (state.cal.owner === "date2" && !date2.disabled) date2.focus();
  else date1.focus();
});
// flip calendar up if it would overflow viewport
requestAnimationFrame(() => {
  if (cal.hidden) return;

  cal.classList.remove("is-up");

  const r = cal.getBoundingClientRect();
  const overflowBottom = r.bottom > window.innerHeight - 8;

    if (overflowBottom) {
    cal.classList.add("is-up");

    const a =
      document.querySelector('[data-pill="dates"]') ||
      document.querySelector(".bk3-dates-grid") ||
      (state.cal.owner === "date2" ? date2 : date1);

    if (a) {
      const r2 = a.getBoundingClientRect();
      const calH = cal.offsetHeight || 420;
      cal.style.top = `${Math.max(8, r2.top - calH - 12)}px`;
    }
  }
});
    }

    function closeCalendar(reason, opts = {}) {
      // reason: "esc" | "tab" | "pointer" | "pick" | "oneway" | "closebtn"
      const { focusPax = false } = opts;

      if (!state.cal.open) return;
      state.cal.open = false;
      cal.hidden = true;
      cal.classList.remove("is-up");
      renderCalendarUI();
      if (calMobile) calMobile.hidden = true;


      // Focus rules:
      // - Esc => focus PAX (agreed)
      // - Tab => let browser handle tab order (no forcing)
      // - Side-click => keep focus (no forcing)
      if (focusPax) {
        paxBtn.focus();
      }
    }

    function afterPickDepart(dtISO) {
      state.dates.depart = dtISO;

      // If depart changed beyond return => clear return (professional rule)
      if (state.dates.ret && state.dates.depart > state.dates.ret) {
        state.dates.ret = "";
      }

      renderDates();
      // clear dates error after picking depart
clearPillError('[data-pill="dates"]');


      // Behavior: select date1 => calendar stays open, mode=return, visual owner=date2
      if (state.tripType !== "OW") {
        state.cal.phase = "RETURN";
        state.cal.owner = "date2";
        renderCalendarUI();
        requestAnimationFrame(() => { if (!date2.disabled) date2.focus(); });

        // keep open
      } else {
        // OW: picking depart can close and go pax (simple)
        closeCalendar("pick", { focusPax: true });
      }
    }

    function afterPickReturn(dtISO) {
      state.dates.ret = dtISO;
      renderDates();
      // clear dates error after picking return
clearPillError('[data-pill="dates"]');


      // Behavior: select date2 => close calendar => focus PAX
      closeCalendar("pick", { focusPax: true });
    }

    calCloseBtn?.addEventListener("click", () => {
      closeCalendar("closebtn", { focusPax: false }); // close only; focus stays naturally
    });

// Date inputs open calendar
date1?.addEventListener("click", () => {
  closeAllLists();
  if (!state.cal.open) openCalendar("date1");
  else {
    state.cal.phase = "DEPART";
    state.cal.owner = "date1";
    renderCalendarUI();
  }
});

date2?.addEventListener("click", () => {
  closeAllLists();
  if (state.tripType === "OW") return;
  if (!state.cal.open) openCalendar("date2");
  else {
    state.cal.phase = "RETURN";
    state.cal.owner = "date2";
    renderCalendarUI();
  }
});

// Mobile tabs
mTabDepart?.addEventListener("click", () => {
  state.cal.phase = "DEPART";
  state.cal.owner = "date1";
  renderCalendarUI();
  renderMobileCalendar();
});

mTabReturn?.addEventListener("click", () => {
  if (mTabReturn.disabled) return;
  state.cal.phase = "RETURN";
  state.cal.owner = "date2";
  renderCalendarUI();
  renderMobileCalendar();
});

// Mobile day click (event delegation)
mMonths?.addEventListener("click", (e) => {
  const el = e.target?.closest?.(".bk3-mcal-day");
  if (!el || el.classList.contains("is-disabled")) return;

  const iso = el.dataset.iso;
  if (!iso) return;

  if (state.cal.phase === "DEPART") {
    afterPickDepart(iso);
    renderMobileCalendar();
    return;
  }

  // RETURN
  afterPickReturn(iso);
});

[date1, date2].forEach((el) => {
  if (!el) return;

  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      if (el === date2 && state.tripType === "OW") return;

      closeAllLists();

      if (!state.cal.open) {
        openCalendar(el === date1 ? "date1" : "date2");
      } else {
        state.cal.phase = el === date1 ? "DEPART" : "RETURN";
        state.cal.owner = el === date1 ? "date1" : "date2";
        renderCalendarUI();
      }
    }
  });
});


    // One-way toggle
    oneWayBtn?.addEventListener("click", () => {
      // if calendar open — close, keep focus on OW
if (state.cal.open) {
  closeCalendar("oneway", { focusPax: false });
}

      const next = state.tripType === "OW" ? "RT" : "OW";
      state.tripType = next;

      if (state.tripType === "OW") {
        state.dates.ret = "";
      }

      renderTripType();
      renderDates();

      // ✅ When switching OW -> RT: open calendar for return immediately (if depart exists)
if (state.tripType === "RT") {
  openCalendar(state.dates.depart ? "date2" : "date1");
}


// clear dates error when switching to one-way with valid depart
if (state.tripType === "OW" && state.dates.depart) {
  clearPillError('[data-pill="dates"]');
}

      // If turned OW ON: close calendar and focus PAX (your earlier behavior)
      if (state.tripType === "OW") {
        closeCalendar("oneway", { focusPax: true });
      } else {
        // OW OFF => decide phase if calendar open later; do nothing now (minimum)
      }
    });

    // -----------------------------
    // PAX controller (minimal)
    // -----------------------------
    function openPax() {
      paxPopup.hidden = false;
      paxBtn.setAttribute("aria-expanded", "true");
    }
    function closePax() {
      paxPopup.hidden = true;
      paxBtn.setAttribute("aria-expanded", "false");
    }

    paxBtn?.addEventListener("click", () => {
      const open = paxPopup.hidden === false;
      if (open) closePax();
      else openPax();
    });

    paxPopup?.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-pax]");
      if (!btn) return;

      const type = btn.getAttribute("data-type");
      const delta = btn.getAttribute("data-pax") === "+1" ? 1 : -1;

      if (type === "adt") state.pax.adt = clamp(state.pax.adt + delta, 1, 9);
      if (type === "chd") state.pax.chd = clamp(state.pax.chd + delta, 0, 9);
      if (type === "inf") state.pax.inf = clamp(state.pax.inf + delta, 0, state.pax.adt);

      renderPax();
    });

    paxDone?.addEventListener("click", () => {
      closePax();
      submitBtn.focus(); // PAX OK => focus Submit
    });
    // -----------------------------
// Language switcher
// -----------------------------
if (langBar && window.AB_I18N) {
  langBar.addEventListener("click", (e) => {

    const btn = e.target.closest(".bk3-langbtn");
    if (!btn) return;

    const lang = btn.getAttribute("data-lang");
    AB_I18N.setLang(lang);
    const url = new URL(window.location.href);
url.searchParams.set("lang", lang);
history.replaceState(null, "", url.toString());



    AB_I18N.applyI18n(document);

    renderTripType();
    renderPax();
    renderDates();
    renderLangButtons();

    if (typeof fp !== "undefined" && fp) {
      const L = AB_I18N.getLang();
      const nextLocale =
        (L === "ru" && window.flatpickr?.l10ns?.ru) ? window.flatpickr.l10ns.ru :
        (L === "uz" && window.flatpickr?.l10ns?.uz_latn) ? window.flatpickr.l10ns.uz_latn :
        { firstDayOfWeek: 1 };

      fp.set("locale", nextLocale);
    }
  });
}



    // -----------------------------
    // Keyboard rules: Tab / Esc
    // -----------------------------
    form.addEventListener("keydown", (e) => {
      // ESC rules
      if (e.key === "Escape") {
        // Calendar: close and focus PAX (agreed)
        if (state.cal.open) {
          e.preventDefault();
          closeCalendar("esc", { focusPax: true });
          return;
        }

        // Pax: close, focus stays on paxBtn
        if (!paxPopup.hidden) {
          e.preventDefault();
          closePax();
          paxBtn.focus();
          return;
        }

        // From/To lists: close, focus stays
        if (!fromList.hidden) {
          e.preventDefault();
          closeList("from");
          fromInput.focus();
          return;
        }
        if (!toList.hidden) {
          e.preventDefault();
          closeList("to");
          toInput.focus();
          return;
        }
      }

      // TAB rules: close popups, never select; let browser move focus naturally
      if (e.key === "Tab") {
        // never tab into the calendar UI
      if (state.cal.open) {
     // ensure focus is on inputs, not inside fp DOM
      if (document.activeElement && cal.contains(document.activeElement)) {
        (state.cal.owner === "date2" && !date2.disabled ? date2 : date1).focus();
      }
    }
        if (state.cal.open) closeCalendar("tab", { focusPax: false });
        if (!paxPopup.hidden) closePax();
        if (!fromList.hidden) closeList("from");
        if (!toList.hidden) closeList("to");
        // do not preventDefault: tab order continues
      }
    });

    // -----------------------------
    // Side-click / outside click rules
    // - close popups
    // - DO NOT force focus (so focus remains if user clicked blank, or moves naturally if clicked another control)
    // -----------------------------
    document.addEventListener(
      "pointerdown",
      (e) => {
        const t = e.target;

        const insideForm = form.contains(t);

        const clickInCalendar = cal.contains(t) || t === date1 || t === date2 || t === oneWayBtn;
        const clickInPax = paxPopup.contains(t) || t === paxBtn;
        const clickInFrom = fromList.contains(t) || t === fromInput;
        const clickInTo = toList.contains(t) || t === toInput;

        // Calendar outside
        if (state.cal.open && !clickInCalendar) {
          // Close only. If user clicked a focusable control, browser will move focus there (good).
          closeCalendar("pointer", { focusPax: false });
        }

        // Pax outside
        if (!paxPopup.hidden && !clickInPax) {
          closePax();
        }

        // Lists outside
        if (!fromList.hidden && !clickInFrom) closeList("from");
        if (!toList.hidden && !clickInTo) closeList("to");

        // If click is outside form entirely, also close all (already done). No focus forcing.
        if (!insideForm) return;
      },
      true
    );

  // -----------------------------
// Route dropdown controller (FROM/TO) — V3 minimal, correct
// Rules:
// - arrows: navigate only
// - Enter/Click: select only
// - Tab/Esc/side-click: close without select
// - blur: never selects (we do NOT use blur-commit)
// - manual typing clears code immediately
// -----------------------------

// Minimal demo dataset (replace later with real cities/airports)
const ROUTES = [
  { label: "Tashkent (TAS)", code: "TAS" },
  { label: "Samarkand (SKD)", code: "SKD" },
  { label: "Bukhara (BHK)", code: "BHK" },
  { label: "Moscow (MOW)", code: "MOW" },
  { label: "Istanbul (IST)", code: "IST" },
  { label: "Dubai (DXB)", code: "DXB" },
];

function makeRouteController(kind, inputEl, listEl, hiddenCodeEl) {
  // kind: "from" | "to"
  let items = [];
  let open = false;
  let activeIndex = -1;

  function setExpanded(v) {
    inputEl.setAttribute("aria-expanded", v ? "true" : "false");
  }

  function close() {
    open = false;
    activeIndex = -1;
    listEl.hidden = true;
    listEl.innerHTML = "";
    setExpanded(false);
    inputEl.removeAttribute("aria-activedescendant");
  }

  function openList() {
    if (items.length === 0) return;
    open = true;
    listEl.hidden = false;
    setExpanded(true);
    render();
  }

  function filter(q) {
    const s = (q || "").trim().toLowerCase();
    if (!s) return ROUTES.slice(0, 8);
    return ROUTES.filter((x) => x.label.toLowerCase().includes(s)).slice(0, 8);
  }

  function render() {
    listEl.innerHTML = "";
    items.forEach((it, i) => {
      const li = document.createElement("li");
      li.className = "bk3-option";
      li.id = `${kind}-opt-${i}`;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", i === activeIndex ? "true" : "false");

      const left = document.createElement("span");
      left.textContent = it.label;

      const right = document.createElement("span");
      right.className = "bk3-option-code";
      right.textContent = it.code;

      li.appendChild(left);
      li.appendChild(right);

      // Click selects (only explicit selection)
      li.addEventListener("pointerdown", (e) => {
        // prevent input losing focus before we set value
        e.preventDefault();
      });
      li.addEventListener("click", () => {
        selectIndex(i);
      });

      listEl.appendChild(li);
    });

    if (activeIndex >= 0) {
      inputEl.setAttribute("aria-activedescendant", `${kind}-opt-${activeIndex}`);
    } else {
      inputEl.removeAttribute("aria-activedescendant");
    }
  }

  function selectIndex(i) {
    const it = items[i];
    if (!it) return;

    // Commit selection
    inputEl.value = it.label;
    hiddenCodeEl.value = it.code;

    // keep V3 state consistent
    if (kind === "from") {
      state.from.text = it.label;
      state.from.code = it.code;
    } else {
      state.to.text = it.label;
      state.to.code = it.code;
    }

    // immediate same-route check after explicit selection
if (state.from.code && state.to.code && state.from.code === state.to.code) {
  showError(
    '[data-pill="to"]',
    window.AB_I18N ? AB_I18N.t("err_same_city") : "Пункт прилёта должен отличаться от пункта вылета"
  );
}

    // clear error for this pill after explicit selection
if (kind === "from") clearPillError('[data-pill="from"]');
else clearPillError('[data-pill="to"]');

   close();

// after explicit selection: go next
if (kind === "from") {
  toInput.focus();
} else {
  date1.focus();
}

  }

  function refreshItems(shouldOpen) {
    items = filter(inputEl.value);
    // If list is open, rerender; if shouldOpen, open
    if (shouldOpen) {
      if (items.length > 0) openList();
      else close();
    } else {
      if (open) {
        if (items.length > 0) render();
        else close();
      }
    }
  }

  // Input typing: clear code immediately, show suggestions
  inputEl.addEventListener("input", () => {
    hiddenCodeEl.value = "";
    if (kind === "from") {
      state.from.text = inputEl.value;
      state.from.code = "";
    } else {
      state.to.text = inputEl.value;
      state.to.code = "";
    }
    activeIndex = -1;
    refreshItems(true);
  });

  // Optional: on focus, do not auto-open (professional, less noise)
  inputEl.addEventListener("focus", () => {
    // do nothing
  });

  // Keyboard behavior
  inputEl.addEventListener("keydown", (e) => {
    // Prevent accidental submit on Enter unless we explicitly select
    if (e.key === "Enter") {
      if (open && activeIndex >= 0) {
        e.preventDefault();
        selectIndex(activeIndex);
      } else {
        // Enter with nothing highlighted does nothing (no submit)
        e.preventDefault();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        refreshItems(true);
        openList();
      }
      if (items.length === 0) return;
      activeIndex = Math.min(items.length - 1, activeIndex + 1);
      render();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        refreshItems(true);
        openList();
      }
      if (items.length === 0) return;
      activeIndex = Math.max(0, activeIndex - 1);
      render();
      return;
    }

    if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        close(); // focus stays (we don't move it)
      }
      return;
    }

    if (e.key === "Tab") {
      // Tab never selects, just close list and allow natural tab order
      if (open) close();
      return;
    }
  });

  return { close, isOpen: () => open };
}

// Create controllers
const fromCtrl = makeRouteController("from", fromInput, fromList, fromCode);
const toCtrl = makeRouteController("to", toInput, toList, toCode);
// -----------------------------
// SWAP (FROM ↔ TO) — minimal
// -----------------------------
swapBtn?.addEventListener("click", () => {
  // close dropdowns (no side effects)
  closeAllLists();

  // swap state
  const tmp = state.from;
  state.from = state.to;
  state.to = tmp;

  // reflect in inputs + hidden codes
  fromInput.value = state.from.text || "";
  toInput.value = state.to.text || "";
  fromCode.value = state.from.code || "";
  toCode.value = state.to.code || "";

  // clear errors for from/to (swap is explicit action)
  clearPillError('[data-pill="from"]');
  clearPillError('[data-pill="to"]');

  // focus back to FROM
  fromInput.focus();
});


// Make sure side-click logic closes these via existing global pointerdown
// (already implemented in Step 1)

// Also: when calendar/pax opens, we may want to close lists to avoid overlap (minimum safe)
function closeAllLists() {
  fromCtrl.close();
  toCtrl.close();
}

// -----------------------------
// Validation (submit-only), no blur magic
// -----------------------------
function clearErrors() {
  form.querySelectorAll(".bk3-pill").forEach((p) => p.classList.remove("is-error"));
  form.querySelectorAll(".bk3-error").forEach((e) => {
    e.textContent = "";
    e.hidden = true;
  });
}

function showError(pillSelector, message) {
  const pill = form.querySelector(pillSelector);
  if (!pill) return;

  pill.classList.add("is-error");

  const box = pill.querySelector(".bk3-error");
  if (!box) return;

  box.textContent = message;
  box.hidden = false;
}

function clearPillError(pillSelector) {
  const pill = form.querySelector(pillSelector);
  if (!pill) return;

  pill.classList.remove("is-error");

  const box = pill.querySelector(".bk3-error");
  if (box) {
    box.textContent = "";
    box.hidden = true;
  }
}


function validateForm() {
  clearErrors();
  let ok = true;

  // FROM: valid only with code
  if (!state.from.code) {
    showError(
  '[data-pill="from"]',
  window.AB_I18N ? AB_I18N.t("err_from_required") : "Выберите пункт отправления"
);

    ok = false;
  }

  // TO: valid only with code
  if (!state.to.code) {
    showError(
  '[data-pill="to"]',
  window.AB_I18N ? AB_I18N.t("err_to_required") : "Выберите пункт назначения"
);
    ok = false;
  }

    // FROM/TO must be different (prevent IST -> IST)
  if (state.from.code && state.to.code && state.from.code === state.to.code) {
    showError(
      '[data-pill="to"]',
      window.AB_I18N ? AB_I18N.t("err_same_city") : "Пункт прилёта должен отличаться от пункта вылета"
    );
    ok = false;
  }


// Dates (priority: depart first)
if (!state.dates.depart) {
  showError(
  '[data-pill="dates"]',
  window.AB_I18N ? AB_I18N.t("err_dates_required") : "Выберите дату вылета"
);
  ok = false;
} else if (state.tripType === "RT" && !state.dates.ret) {
  showError(
  '[data-pill="dates"]',
  window.AB_I18N ? AB_I18N.t("err_return_required") : "Выберите дату возвращения"
);

  ok = false;
}


  return ok;
}


// -----------------------------
// Submit (V3): validate on submit only
// -----------------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isSubmitting) return;
  isSubmitting = true;
  // close popups (no focus forcing)
  if (state.cal.open) closeCalendar("submit", { focusPax: false });
  if (!paxPopup.hidden) closePax();
  closeAllLists();

  const ok = validateForm();
if (!ok) {
  isSubmitting = false;
  return;
}

const s = serializeV3(state);
if (!s) {
  isSubmitting = false;
  return;
}


const lang = window.AB_I18N ? AB_I18N.getLang() : "ru";
setTimeout(() => { isSubmitting = false; }, 1500);
window.location.href = `${TARGET}?${s.query}&lang=${encodeURIComponent(lang)}`;

});

    // Initial render
    renderTripType();
    renderDates();
    renderCalendarUI();
    renderPax();
    if (window.AB_I18N) AB_I18N.applyI18n(document);
renderLangButtons();

    closePax();
    closeList("from");
    closeList("to");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bookingV3");
    
    const burgerBtn = document.querySelector(".bk3-burger");
    const mmenu = document.querySelector(".bk3-mmenu");
    const mmenuClose = document.querySelector(".bk3-mmenu-close");

    // Mobile menu: close by X
  mmenuClose?.addEventListener("click", () => {
  mmenu.classList.remove("is-open");
  mmenu.hidden = true;
  burgerBtn?.setAttribute("aria-expanded", "false");
});

    initBookingV3(form, { burgerBtn, mmenu });

  });
})();
