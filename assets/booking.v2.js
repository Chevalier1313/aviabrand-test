/* booking.v2.js — Aviabrand booking form v2 (From/To UX spec) */
(function () {
  "use strict";

  // ---- tiny helpers
  const qs = (root, sel) => root.querySelector(sel);
  const qsa = (root, sel) => Array.from(root.querySelectorAll(sel));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function normalize(str) {
    return (str || "")
      .toLowerCase()
      .trim()
      .replaceAll("ё", "е")
      .replace(/[()]/g, " ")
      .replace(/[–—-]/g, " ")
      .replace(/\s+/g, " ");
  }

  function debounce(fn, ms) {
    let t = null;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  // ---- LocationsService (loads JSON once, builds tokens)
  class LocationsService {
    constructor(url, lang = "ru") {
      this.url = url;
      this.lang = lang;
      this._items = [];
      this._citiesByCode = new Map();
      this._airportsByCity = new Map();
      this._ready = false;
    }

    async init() {
      if (this._ready) return;
      const res = await fetch(this.url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Locations load failed: ${res.status}`);
      const json = await res.json();
      const items = Array.isArray(json) ? json : (json.items || []);
      this._items = items.map((it) => this._prepareItem(it));

      // index cities & airports
      for (const it of this._items) {
        if (it.type === "city") this._citiesByCode.set(it.code, it);
      }
      for (const it of this._items) {
        if (it.type === "airport") {
          const arr = this._airportsByCity.get(it.cityCode) || [];
          arr.push(it);
          this._airportsByCity.set(it.cityCode, arr);
        }
      }
      // sort airports by priority then name
      for (const [k, arr] of this._airportsByCity) {
        arr.sort((a, b) => (a.priority - b.priority) || a.label.localeCompare(b.label));
      }

      this._ready = true;
    }

    setLang(lang) {
      this.lang = lang || "ru";
      // labels depend on lang; rebuild prepared view
      this._items = this._items.map((it) => this._prepareItem(it, true));
    }

    _prepareItem(raw, isRebuild = false) {
      const type = raw.type;
      const code = String(raw.code || "").trim();
      const priority = Number.isFinite(raw.priority) ? raw.priority : 999;

      const namePick = (obj) => {
        if (!obj) return "";
        if (typeof obj === "string") return obj;
        return obj[this.lang] || obj.ru || obj.en || obj.uz || "";
      };

      let cityCode = raw.cityCode ? String(raw.cityCode).trim() : "";
      let cityName = namePick(raw.name);
      let countryName = namePick(raw.country);
      let airportName = namePick(raw.airportName);

      // Build label
      let label = "";
      if (type === "city") {
        label = cityName;
      } else {
        // airport
        // if cityName not present in airport record, try best effort later via cityCode (re-resolve after init)
        label = `${raw.cityName ? namePick(raw.cityName) : cityName} — ${airportName} (${code})`.replace(/^ — /, "");
      }

      // If rebuild after init, try to resolve missing cityName for airport via cityCode
      if (type === "airport" && isRebuild) {
        const city = this._citiesByCode.get(cityCode);
        const cName = city ? city.label : (cityName || "");
        label = `${cName} — ${airportName} (${code})`;
      }

      // tokens
      const aliases = Array.isArray(raw.aliases) ? raw.aliases : [];
      const tokenParts = [
        code,
        cityCode,
        cityName,
        countryName,
        airportName,
        label,
        ...aliases
      ].filter(Boolean);

      const tokens = tokenParts.map(normalize);

      return {
        id: raw.id || `${type}:${code}`,
        type,
        code,
        cityCode: type === "airport" ? cityCode : code,
        label,
        cityName,
        countryName,
        airportName,
        priority,
        tokens
      };
    }

    // Returns flat list already grouped city + airports (best-effort)
    search(query, opts = {}) {
      const q = normalize(query);
      const minChars = opts.minChars ?? 2;
      if (!q || q.length < minChars) return [];

      const maxCities = opts.maxCities ?? 8;
      const maxAirportsPerCity = opts.maxAirportsPerCity ?? 6;
      const maxTotal = opts.maxTotal ?? 30;

      // scoring
      function scoreItem(it) {
        const qn = q;
        if (normalize(it.code) === qn) return 1000;
        let best = 0;
        for (const t of it.tokens) {
          if (!t) continue;
          if (t.startsWith(qn)) best = Math.max(best, 300);
          else if (t.includes(qn)) best = Math.max(best, 100);
        }
        // type bias: city above airport when similar
        best += (it.type === "city" ? 20 : 0);
        // priority bias (lower is better)
        best += Math.max(0, 15 - it.priority / 50);
        return best;
      }

      const scored = [];
      for (const it of this._items) {
        const sc = scoreItem(it);
        if (sc > 0) scored.push([it, sc]);
      }
      scored.sort((a, b) => (b[1] - a[1]) || (a[0].priority - b[0].priority) || a[0].label.localeCompare(b[0].label));

      // Collect cities first (top N), then attach airports
      const result = [];
      const usedCity = new Set();
      const used = new Set();

      const cities = scored
        .map(([it, sc]) => ({ it, sc }))
        .filter(x => x.it.type === "city")
        .slice(0, maxCities);

      // helper: add item once
      const add = (it) => {
        const key = `${it.type}:${it.code}`;
        if (used.has(key)) return;
        used.add(key);
        result.push(it);
      };

      // If query matches airport strongly but city not in top, show its city too.
      const topAirports = scored
        .map(([it, sc]) => ({ it, sc }))
        .filter(x => x.it.type === "airport")
        .slice(0, 6);

      for (const { it } of topAirports) {
        const city = this._citiesByCode.get(it.cityCode);
        if (city && !usedCity.has(city.code) && cities.length < maxCities) {
          cities.push({ it: city, sc: 200 }); // inject
        }
      }

      // Build grouped list
      for (const { it: city } of cities) {
        add(city);
        usedCity.add(city.code);

        const airports = (this._airportsByCity.get(city.code) || []);
        let count = 0;
        for (const ap of airports) {
          // include airport if it matches query OR if city matches (good UX)
          const apMatch = ap.tokens.some(t => t.startsWith(q) || t.includes(q));
          const cityMatch = city.tokens.some(t => t.startsWith(q) || t.includes(q));
          if (!apMatch && !cityMatch) continue;
          add(ap);
          count++;
          if (count >= maxAirportsPerCity) break;
          if (result.length >= maxTotal) break;
        }
        if (result.length >= maxTotal) break;
      }

      // fallback: if no cities matched, show top airports (plus their cities if possible)
      if (result.length === 0) {
        for (const { it } of topAirports) {
          const city = this._citiesByCode.get(it.cityCode);
          if (city) add(city);
          add(it);
          if (result.length >= maxTotal) break;
        }
      }

      return result.slice(0, maxTotal);
    }
  }

  // ---- FromToController (per field)
  class FromToController {
    constructor(root, coordinator, service, config) {
      this.root = root;
      this.coordinator = coordinator;
      this.service = service;
      this.config = config;

      this.fieldKey = root.dataset.field;
      this.input = qs(root, '[data-role="location-input"]');
      this.dropdown = qs(root, '[data-role="dropdown"]');
      this.listbox = qs(root, '[data-role="listbox"]');
      this.errEl = qs(root, '[data-role="field-error"]');
      this.hiddenCode = qs(root, 'input[data-role="code"]');
      this.hiddenLabel = qs(root, 'input[data-role="label"]');

      this.items = [];
      this.activeIndex = -1;
      this._pointerSelecting = false;

      this._bind();
    }

    _bind() {
      // typing
      this.input.addEventListener("input", () => {
        // always clear selection when user types/changes
        this._clearCodeOnly();
        const val = this.input.value || "";
        if (normalize(val).length < this.config.minChars) {
          this.close();
          return;
        }
        this._searchAndRender(val);
      });

      // keydown logic
      this.input.addEventListener("keydown", (e) => this._onKeyDown(e));

      // focus: optional (do nothing special)
      this.input.addEventListener("focus", () => { /* keep */ });

      // blur: backup close (avoid race when selecting)
      this.input.addEventListener("blur", () => {
        if (this._pointerSelecting) return;
        this.close();
      });

      // option select via pointerdown (no blur race)
      this.listbox.addEventListener("pointerdown", (e) => {
        const li = e.target.closest('[role="option"]');
        if (!li) return;
        e.preventDefault();
        this._pointerSelecting = true;
        const idx = Number(li.dataset.index);
        const item = this.items[idx];
        if (item) this.select(item);
        this._pointerSelecting = false;
      });
    }

    async _searchAndRender(val) {
      await this.service.init();
      this.items = this.service.search(val, this.config.searchLimits);
      if (this.items.length) {
        this.open();
        this.render();
      } else {
        this.close();
      }
    }

    render() {
      const fieldKey = this.fieldKey;
      this.listbox.innerHTML = "";

      this.items.forEach((it, i) => {
        const li = document.createElement("li");
        li.className = `opt ${it.type === "city" ? "opt--city" : "opt--airport"}`;
        li.setAttribute("role", "option");
        li.id = `bf-${fieldKey}-opt-${i}`;
        li.dataset.index = String(i);
        li.dataset.type = it.type;
        li.dataset.code = it.code;
        if (it.type === "airport") li.dataset.city = it.cityCode;
        li.setAttribute("aria-selected", "false");

        // visual template
        const top = document.createElement("div");
        top.className = "opt__top";
        const title = document.createElement("div");
        title.className = "opt__title";
        title.textContent = it.type === "city" ? it.label : `${it.cityName || ""} — ${it.airportName || ""}`.trim();

        const meta = document.createElement("div");
        meta.className = "opt__meta";
        meta.textContent = it.type === "city" ? it.code : it.code;

        top.appendChild(title);
        top.appendChild(meta);

        li.appendChild(top);

        const sub = document.createElement("div");
        sub.className = "opt__sub";
        sub.textContent = it.type === "city"
          ? (it.countryName || "")
          : (it.label || ""); // includes (IATA)
        li.appendChild(sub);

        this.listbox.appendChild(li);
      });

      // reset active
      this.setActive(-1);
    }

    open() {
      this.coordinator.requestOpen(this.fieldKey);
      this.root.classList.add("is-open");
      this.dropdown.hidden = false;
      this.input.setAttribute("aria-expanded", "true");
    }

    close() {
      this.root.classList.remove("is-open");
      this.dropdown.hidden = true;
      this.input.setAttribute("aria-expanded", "false");
      this.setActive(-1);
      this.coordinator.notifyClose(this.fieldKey);
    }

    setActive(idx) {
      this.activeIndex = idx;
      const options = qsa(this.listbox, '[role="option"]');
      options.forEach((el) => {
        el.classList.remove("is-active");
        el.setAttribute("aria-selected", "false");
      });

      if (idx >= 0 && idx < options.length) {
        const el = options[idx];
        el.classList.add("is-active");
        el.setAttribute("aria-selected", "true");
        this.input.setAttribute("aria-activedescendant", el.id);
        // keep into view
        if (typeof el.scrollIntoView === "function") el.scrollIntoView({ block: "nearest" });
      } else {
        this.input.setAttribute("aria-activedescendant", "");
      }
    }

    select(item) {
      // set UI label
      this.input.value = item.label;
      // set code
      this.input.dataset.code = item.code;
      if (this.hiddenCode) this.hiddenCode.value = item.code;
      if (this.hiddenLabel) this.hiddenLabel.value = item.label;

      this.root.classList.add("is-selected");
      this.clearError();
      this.close();
    }

    // Only clears code/selected state, keeps text
    _clearCodeOnly() {
      if (this.input.dataset.code) this.input.dataset.code = "";
      if (this.hiddenCode) this.hiddenCode.value = "";
      if (this.hiddenLabel) this.hiddenLabel.value = "";
      this.root.classList.remove("is-selected");
      // do not auto-clear error here; user still hasn't selected
    }

    // Public validation
    isValid() {
      return Boolean((this.input.dataset.code || "").trim());
    }

    setError(message) {
      this.root.classList.add("is-error");
      this.input.setAttribute("aria-invalid", "true");
      if (this.errEl) this.errEl.textContent = message || "";
    }

    clearError() {
      this.root.classList.remove("is-error");
      this.input.setAttribute("aria-invalid", "false");
      if (this.errEl) this.errEl.textContent = "";
    }

    focus() {
      this.input.focus();
    }

    // Spec keyboard flow
    _onKeyDown(e) {
      const key = e.key;
      const code = (this.input.dataset.code || "").trim();
      const open = !this.dropdown.hidden;

      // Arrow navigation
      if (key === "ArrowDown" || key === "ArrowUp") {
        if (!open) {
          if (this.items.length) {
            e.preventDefault();
            this.open();
            this.setActive(key === "ArrowDown" ? 0 : this.items.length - 1);
          }
          return;
        }
        // open
        e.preventDefault();
        if (!this.items.length) return;
        const next = key === "ArrowDown"
          ? clamp(this.activeIndex + 1, 0, this.items.length - 1)
          : clamp(this.activeIndex - 1, 0, this.items.length - 1);
        this.setActive(next);
        return;
      }

      // Enter selects active if open
      if (key === "Enter") {
        if (open && this.activeIndex >= 0 && this.items[this.activeIndex]) {
          e.preventDefault();
          this.select(this.items[this.activeIndex]);
          return;
        }
        // If closed and no code: do not allow Enter to confirm raw text
        if (!code) {
          e.preventDefault();
          // soft highlight (no text) on Enter
          this.root.classList.add("is-error");
          return;
        }
        // else: allow default (form submit)
        return;
      }

      // Tab blocked if no selection
      if (key === "Tab") {
        if (!code) {
          e.preventDefault();
          // soft highlight; no bubble
          this.root.classList.add("is-error");
          return;
        }
        return;
      }

      // Escape closes dropdown
      if (key === "Escape") {
        if (open) {
          e.preventDefault();
          this.close();
        }
        return;
      }
    }
  }

  // ---- BookingFormController (coordinator)
  class BookingFormController {
    constructor(form, service, config) {
      this.form = form;
      this.service = service;
      this.config = config;
      this.openFieldKey = null;

      this.fields = new Map();
      this._bind();
    }

    addField(fieldKey, ctrl) {
      this.fields.set(fieldKey, ctrl);
    }

    requestOpen(fieldKey) {
      if (this.openFieldKey && this.openFieldKey !== fieldKey) {
        const prev = this.fields.get(this.openFieldKey);
        if (prev) prev.close();
      }
      this.openFieldKey = fieldKey;
    }

    notifyClose(fieldKey) {
      if (this.openFieldKey === fieldKey) this.openFieldKey = null;
    }

    _bind() {
      // outside click closes active dropdown
      document.addEventListener("pointerdown", (e) => {
        if (!this.openFieldKey) return;
        const active = this.fields.get(this.openFieldKey);
        if (!active) return;

        // if click inside the active field, ignore
        if (active.root.contains(e.target)) return;
        active.close();
      });

      // submit validation (no bubble)
      this.form.addEventListener("submit", (e) => {
  const from = this.fields.get("from");
  const to = this.fields.get("to");
  if (!from || !to) return;

  // IMPORTANT: no browser bubbles
  e.preventDefault();

  // clear old errors
  from.clearError();
  to.clearError();

  // clear date error texts
const d1Err = document.getElementById("date1_err");
const d2Err = document.getElementById("date2_err");
if (d1Err) d1Err.textContent = "";
if (d2Err) d2Err.textContent = "";


  let ok = true;
  const d1 = document.getElementById("date1_v2");
if (d1) d1.classList.remove("is-error");


  const t = (k) => {
    const dict = {
      err_from_required: "Выберите пункт вылета из списка",
      err_to_required: "Выберите пункт прилёта из списка",
      err_same_city: "Пункт прилёта должен отличаться от пункта вылета",
    };
    return dict[k] || k;
  };

  // validate FROM/TO by dataset.code only
  if (!from.isValid()) {
    from.setError(t("err_from_required"));
    ok = false;
  }
  if (!to.isValid()) {
    to.setError(t("err_to_required"));
    ok = false;
  }

 // already declared above
const d1val = (d1 && d1.value ? d1.value.trim() : "");


if (!d1val) {
  ok = false;
  if (d1) {
    d1.classList.add("is-error");
    d1.focus();
  }
  if (d1Err) d1Err.textContent = "Выберите дату вылета";
}

  // optional: same route rule
  const fromCode = (from.input.dataset.code || "").trim();
  const toCode = (to.input.dataset.code || "").trim();
  if (ok && fromCode && toCode && fromCode === toCode) {
    to.setError(t("err_same_city"));
    ok = false;
  }

  // stop here if invalid
  if (!ok) {
    // focus first invalid
    if (!from.isValid()) from.focus();
    else if (!to.isValid()) to.focus();
    return;
  }

  // valid → allow navigation to coming-soon with GET params
  if (!ok) return;

// We prevented default, so submit manually:
if (window.__ab_v2_fpDates?.close) window.__ab_v2_fpDates.close();
e.currentTarget.submit();

});

    }
  }

  // ---- Boot
  document.addEventListener("DOMContentLoaded", async () => {
    const form = document.querySelector('form[data-booking-form="v2"]');
    if (!form) return;

    // language (best effort): read from <html lang=".."> or body dataset; adjust to your project
    const lang = (document.documentElement.lang || document.body.dataset.lang || "ru").slice(0, 2);

    const service = new LocationsService("data/locations.json", lang);

    const config = {
      minChars: 2,
      searchLimits: { maxCities: 8, maxAirportsPerCity: 6, maxTotal: 30 }
    };

    const coordinator = new BookingFormController(form, service, config);

    const fromRoot = form.querySelector('.field[data-field="from"]');
    const toRoot = form.querySelector('.field[data-field="to"]');

    const fromCtrl = new FromToController(fromRoot, coordinator, service, config);
    const toCtrl = new FromToController(toRoot, coordinator, service, config);

    coordinator.addField("from", fromCtrl);
    coordinator.addField("to", toCtrl);



// v2 DATES — ONE calendar (2 months) + custom depart/return state (NO range mode)
// date1_v2 = depart (required)
// date2_v2 = return (optional, readonly)
// =========================
if (window.flatpickr) {
  const date1 = document.getElementById("date1_v2"); // depart
  const date2 = document.getElementById("date2_v2"); // return

  if (date1 && date2) {
    const pad2 = (n) => String(n).padStart(2, "0");
    const fmt = (dt) =>
      `${dt.getFullYear()}-${pad2(dt.getMonth() + 1)}-${pad2(dt.getDate())}`;

    const parseYMD = (s) => {
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((s || "").trim());
      if (!m) return null;
      const y = +m[1], mo = +m[2] - 1, d = +m[3];
      const dt = new Date(y, mo, d);
      return isNaN(dt.getTime()) ? null : dt;
    };

    const sameDay = (a, b) =>
      a && b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    // Return input is display-only
    date2.readOnly = true;
    date2.setAttribute("aria-readonly", "true");

    // State
    let dep = parseYMD(date1.value);
    let ret = parseYMD(date2.value);
    let pickMode = "auto"; // "auto" | "return"


    // If return is earlier than depart, drop it
    if (dep && ret && ret.getTime() < dep.getTime()) ret = null;

    const lang2 = () =>
      (document.documentElement.lang || document.body.dataset.lang || "ru").slice(0, 2);

    const labels = () => {
      const l = lang2();
      return {
        noReturn: l === "uz" ? "Qaytish bileti yo‘q" : (l === "en" ? "No return ticket" : "Без обратного билета"),
        
      };
    };

    const syncInputs = () => {
      date1.value = dep ? fmt(dep) : "";
      date2.value = ret ? fmt(ret) : "";
    };

    // Plugin: "No return ticket" button inside calendar
    function noReturnButtonPlugin() {
  return function (fp) {
    let btn = null;

    const update = () => {
  if (!btn) return;

  btn.textContent = labels().noReturn;

  // always visible
  btn.style.display = "inline-flex";

  // muted until depart is chosen
  const hasDepart = !!dep;
  btn.classList.toggle("is-muted", !hasDepart);
  btn.toggleAttribute("aria-disabled", !hasDepart);
};


    return {
      onReady: function () {
        btn = document.createElement("button");
        btn.type = "button";
        btn.className = "fp-no-return";
      btn.addEventListener("click", () => {
  // if depart not chosen yet — just close
  if (!dep) {
    fp.close();
    return;
  }

  // depart chosen -> make OW (clear return)
  ret = null;
  syncInputs();
  fp.redraw();
  fp.close();
});

        fp.calendarContainer.appendChild(btn);
        update();
      },
      onOpen: update,
      onMonthChange: update,
      onYearChange: update,
      onValueUpdate: update,
    };
  };
}


    // One calendar attached to date1 (depart field). date2 opens same popup.
    const fp = flatpickr(date1, {
      dateFormat: "Y-m-d",
      allowInput: true,
      clickOpens: true,
      disableMobile: true,

      // two months like “other sites”
      showMonths: 2,
      locale: { firstDayOfWeek: 1 },


      plugins: [noReturnButtonPlugin()],

      // Optional: show a hint in the calendar header (not required)
      onOpen: (selectedDates, dateStr, instance) => {
        // (no state reset here)
      },

      // Paint custom range styles (we do NOT use range mode)
      onDayCreate: (dObj, dStr, instance, dayElem) => {
        const dt = dayElem.dateObj;
        if (!dt) return;

        // clear our classes
        dayElem.classList.remove("ab-dep", "ab-ret", "ab-inrange");

        if (dep && sameDay(dt, dep)) dayElem.classList.add("ab-dep");
        if (ret && sameDay(dt, ret)) dayElem.classList.add("ab-ret");

        if (dep && ret) {
          const t = dt.getTime();
          if (t > dep.getTime() && t < ret.getTime()) {
            dayElem.classList.add("ab-inrange");
          }
        }
      },

      onReady: (selectedDates, dateStr, instance) => {
        // Clicking return field opens same calendar
        date2.addEventListener("click", (e) => {
  e.preventDefault();
  pickMode = "return";
  instance.open();
});


        // Commit on ANY day click (stable OW)
        instance.calendarContainer.addEventListener(
          "mousedown",
          (e) => {
            const dayEl = e.target && e.target.closest && e.target.closest(".flatpickr-day");
            if (!dayEl || dayEl.classList.contains("disabled")) return;
            const clicked = dayEl.dateObj;
            if (!clicked) return;

            // If calendar was opened from date2: set RETURN only (do not overwrite depart)
if (pickMode === "return" && dep) {
  if (clicked.getTime() < dep.getTime()) {
    // optional rule: if user picks earlier than depart, treat it as new depart
    dep = clicked;
    ret = null;
    syncInputs();
    instance.redraw();
    pickMode = "auto";
    return; // keep open, user may pick return
  }

  // clicked >= depart (same-day allowed)
  ret = clicked;
  syncInputs();
  instance.redraw();
  pickMode = "auto";
  instance.close();
  return;
}


            // RULES:
            // - If no depart OR (depart+return already set) => start new selection (depart = clicked, return = null)
            // - Else (depart exists, return empty) => set return if clicked >= depart
            //   If clicked < depart => treat as new depart
            if (!dep || (dep && ret)) {
              dep = clicked;
              ret = null;
              syncInputs();
              instance.redraw();
              // keep open (user may choose return), OW allowed by just clicking outside
              return;
            }

            // dep exists and ret is empty
            if (clicked.getTime() < dep.getTime()) {
              dep = clicked;
              ret = null;
              syncInputs();
              instance.redraw();
              return;
            }

            // clicked >= dep (same-day allowed)
            ret = clicked;
            syncInputs();
            instance.redraw();
            instance.close(); // like “other sites”: after return picked, close
          },
          true
        );

        // Tab behavior: close and let tab move naturally (no jumps via calendar focus)
        const keyEl = instance.altInput || date1;
        keyEl.addEventListener("keydown", (e) => {
          if (e.key === "Tab" && instance.isOpen) {
            instance.close();
          }
        });

        // Initial paint
        instance.redraw();
      },

      // IMPORTANT: do not wipe values on close
      onClose: () => { pickMode = "auto"; },

    });

    // expose for debugging
    window.__ab_v2_fpDates = fp;

    // init from any prefilled values
    syncInputs();
    fp.redraw();
  }
}



/////////////////////////////////////////////////////
// ⬇⬇⬇ ICI EXACTEMENT : AJOUTER LE CODE PAX V2 ⬇⬇⬇
/////////////////////////////////////////////////////

// =========================
// v2 PAX — stable (+/- works, outside click close, OK closes)
// Works whether counters are <span> or <input>
// Requires: buttons have data-pax-plus="adt|chd|inf" and data-pax-minus="adt|chd|inf"
// =========================
(function initPaxV2() {
  const paxPanel = document.getElementById("paxPanel");
  const paxTrigger = document.getElementById("paxTriggerV2");
  const paxLabel = document.getElementById("paxLabelV2");

  // hidden inputs used for submit/summary
  const paxTotal = document.getElementById("pax_v2");
  const adtHidden = document.getElementById("adt_v2");
  const chdHidden = document.getElementById("chd_v2");
  const infHidden = document.getElementById("inf_v2");

  // visible counters (may be spans or inputs)
  const adtUI = document.getElementById("adtNum");
const chdUI = document.getElementById("chdNum");
const infUI = document.getElementById("infNum");


  const btnOk = document.getElementById("paxDone") || (paxPanel ? paxPanel.querySelector('[data-pax-ok]') : null);

  if (!paxPanel || !paxTrigger || !paxLabel || !paxTotal || !adtHidden || !chdHidden || !infHidden) return;

  const readNum = (el, fallback) => {
    if (!el) return fallback;
    const v = ("value" in el) ? el.value : el.textContent;
    const n = parseInt(String(v || "").trim(), 10);
    return Number.isFinite(n) ? n : fallback;
  };

  const writeNum = (el, n) => {
    if (!el) return;
    if ("value" in el) el.value = String(n);
    else el.textContent = String(n);
  };

const getState = () => {
  const adtFromUI = readNum(adtUI, null);
  const chdFromUI = readNum(chdUI, null);
  const infFromUI = readNum(infUI, null);

  const adt = Number.isFinite(adtFromUI) ? adtFromUI : parseInt(adtHidden.value || "1", 10);
  const chd = Number.isFinite(chdFromUI) ? chdFromUI : parseInt(chdHidden.value || "0", 10);
  const inf = Number.isFinite(infFromUI) ? infFromUI : parseInt(infHidden.value || "0", 10);

  return { adt: adt || 1, chd: chd || 0, inf: inf || 0 };
};



  const clamp = (s) => {
    if (s.adt < 1) s.adt = 1;
    if (s.chd < 0) s.chd = 0;
    if (s.inf < 0) s.inf = 0;

    // 1 infant per adult max
    if (s.inf > s.adt) s.inf = s.adt;

    return s;
  };

  const render = (s) => {
    s = clamp(s);
    const total = s.adt + s.chd + s.inf;

    // visible
    writeNum(adtUI, s.adt);
    writeNum(chdUI, s.chd);
    writeNum(infUI, s.inf);

    // hidden for submit
    adtHidden.value = String(s.adt);
    chdHidden.value = String(s.chd);
    infHidden.value = String(s.inf);
    paxTotal.value = String(total);

    // trigger label
    paxLabel.textContent = String(total);
  };

  const open = () => {
  // SYNC from DOM (no external state variable)
  const s = getState();   // getState читает текущие значения из DOM/hidden
  render(s);              // render записывает всё обратно аккуратно

  paxPanel.hidden = false;
  paxTrigger.setAttribute("aria-expanded", "true");
};


  const close = () => {
    paxPanel.hidden = true;
    paxTrigger.setAttribute("aria-expanded", "false");
  };

  // toggle
  paxTrigger.addEventListener("click", (e) => {
    e.preventDefault();
    if (paxPanel.hidden) open();
    else close();
  });

  // OK closes (optional)
  if (btnOk) {
    btnOk.addEventListener("click", (e) => {
      e.preventDefault();
      close();
    });
  }

  // +/- works (event delegation)
  paxPanel.addEventListener("click", (e) => {
    const plusEl = e.target.closest("[data-pax-plus]");
    const minusEl = e.target.closest("[data-pax-minus]");
    if (!plusEl && !minusEl) return;
    
    e.preventDefault();

    const key = (plusEl?.getAttribute("data-pax-plus") || minusEl?.getAttribute("data-pax-minus") || "").toLowerCase();
    if (key !== "adt" && key !== "chd" && key !== "inf") return;

    const delta = plusEl ? 1 : -1;

    const s = getState();
    
    s[key] = (s[key] || 0) + delta;
    render(s);

  });

  // outside click closes
  document.addEventListener("mousedown", (e) => {
    if (paxPanel.hidden) return;
    const t = e.target;
    if (paxPanel.contains(t) || paxTrigger.contains(t)) return;
    close();
  });

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!paxPanel.hidden) close();
  });

  // init (defaults)
  render(getState());
})();


// ⬆⬆⬆ FIN DU BLOC PAX V2 ⬆⬆⬆

    // If your site changes language dynamically, call service.setLang(newLang) and refresh labels:
    // service.setLang("uz"); fromCtrl.render(); toCtrl.render();
  });
})();

