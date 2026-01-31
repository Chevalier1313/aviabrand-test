// Results skeleton: later will be replaced by ETS data binding.
// For now: render trip summary from URL params + state machine (loading/results/empty/error)

document.addEventListener("DOMContentLoaded", () => {
  // --------- DOM (one source of truth) ----------
  const routeEl = document.getElementById("rsRoute");
  const metaEl = document.getElementById("rsMeta");

  const loadingEl = document.querySelector(".rs-loading") || document.getElementById("rsLoading");
  const emptyEl = document.querySelector(".rs-empty") || document.getElementById("rsEmpty");
  const errorEl = document.querySelector(".rs-error") || document.getElementById("rsError");
  const cardsEl = document.getElementById("rsCards");
  const moreEl = document.querySelector(".rs-more");
  const tryAgainBtn = document.getElementById("rsTryAgain");

  // --------- State machine ----------
  function showState(kind) {
    // kind: "loading" | "results" | "empty" | "error"
    if (loadingEl) loadingEl.hidden = true;
    if (emptyEl) emptyEl.hidden = true;
    if (errorEl) errorEl.hidden = true;
    if (cardsEl) cardsEl.hidden = true;
    if (moreEl) moreEl.hidden = true;

    if (kind === "loading" && loadingEl) loadingEl.hidden = false;
    if (kind === "empty" && emptyEl) emptyEl.hidden = false;
    if (kind === "error" && errorEl) errorEl.hidden = false;

    if (kind === "results") {
      if (cardsEl) cardsEl.hidden = false;
      if (moreEl) moreEl.hidden = false;
    }
  }

  // expose for quick console testing
  window.showState = showState;

  // --------- Summary from query params ----------
  const qs = new URLSearchParams(window.location.search);

  // --- normalize incoming params (booking → results v3) ---

  // route
  if (!qs.get("from") && qs.get("origin")) {
    qs.set("from", qs.get("origin"));
  }
  if (!qs.get("to") && qs.get("destination")) {
    qs.set("to", qs.get("destination"));
  }

  // dates
  if (!qs.get("date1") && qs.get("depart")) {
    qs.set("date1", qs.get("depart"));
  }
  if (!qs.get("date2") && qs.get("return")) {
    qs.set("date2", qs.get("return"));
  }

  // pax (ADT only for now — correctly for MVP)
  if (!qs.get("pax") && qs.get("adt")) {
    qs.set("pax", qs.get("adt"));
  }

  // normalize legacy params (one-way cleanup)
  if (!qs.get("pax") && qs.get("paxValue")) {
    qs.set("pax", qs.get("paxValue"));
  }
  window.__ab_qs = qs;

  if (!qs.get("date1") && qs.get("depart")) qs.set("date1", qs.get("depart"));
  if (!qs.get("date2") && qs.get("return")) qs.set("date2", qs.get("return"));


  const from = (qs.get("from") || "").trim();
  const to = (qs.get("to") || "").trim();
  const date1 = (qs.get("date1") || qs.get("depart") || qs.get("d1") || qs.get("out") || "").trim();
  const date2 = (qs.get("date2") || qs.get("return") || qs.get("d2") || qs.get("in") || "").trim();

  const pax = (qs.get("pax") || "").trim();


  if (routeEl && from && to) routeEl.textContent = `${from} → ${to}`;

  function renderMeta() {
    if (!metaEl) return;

    const parts = [];

    // Always read from normalized qs (source of truth)
    const d1raw = (qs.get("date1") || "").trim();
    const d2raw = (qs.get("date2") || "").trim();

    // --- date (localized if ISO, else raw) ---
    const isISO = (s) => /^\d{4}-\d{2}-\d{2}$/.test(String(s || ""));
    if (d1raw) {
      const d1 =
        window.AB_I18N?.formatDateUI && isISO(d1raw) ? window.AB_I18N.formatDateUI(d1raw) : d1raw;

      if (d2raw) {
        const d2 =
          window.AB_I18N?.formatDateUI && isISO(d2raw) ? window.AB_I18N.formatDateUI(d2raw) : d2raw;

        parts.push(`${d1} · ${d2}`);
      } else {
        parts.push(d1);
      }
    }

    // --- pax (localized) ---
    const adt = Number(qs.get("adt") || 1);
    const chd = Number(qs.get("chd") || 0);
    const inf = Number(qs.get("inf") || 0);
    const paxN = adt + chd + inf;

    if (paxN > 0) {
      const lang = window.AB_I18N?.getLang ? window.AB_I18N.getLang() : "en";

      let label = paxN === 1 ? "passenger" : "passengers";

      const one = window.AB_I18N?.t?.("pax_summary_one");
      const few = window.AB_I18N?.t?.("pax_summary_few");
      const many = window.AB_I18N?.t?.("pax_summary_many");

      if (one && many && one !== "pax_summary_one") {
        if (lang === "ru") {
          const mod10 = paxN % 10;
          const mod100 = paxN % 100;
          if (mod10 === 1 && mod100 !== 11) label = one;
          else if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) label = few;
          else label = many;
        } else {
          label = paxN === 1 ? one : many;
        }
      }

      parts.push(`${paxN} ${label}`);
    }

    metaEl.textContent = parts.join(" · ");
  }

  renderMeta();



  // --------- Mock cards (Step 3) ----------
  const mockResults = [
    {
      id: "m1",
      reco: true,
      depart: "21:50",
      arrive: "01:20",
      stopsKey: "rs_stop_0",
      duration: "5h 30m",
      carrier: "Centrum Air",
      bagKey: "rs_bag_cabin",
      price: "4 045 381 UZS",
    },
    {
      id: "m2",
      reco: false,
      depart: "09:10",
      arrive: "14:35",
      stopsKey: "rs_stop_1",
      duration: "6h 25m",
      carrier: "Uzbekistan Airways",
      bagKey: "rs_bag_cabin20",
      price: "3 569 000 UZS",
    },
    {
      id: "m3",
      reco: false,
      depart: "13:40",
      arrive: "18:50",
      stopsKey: "rs_stop_0",
      duration: "5h 10m",
      carrier: "Centrum Air",
      bagKey: "rs_bag_cabin",
      price: "4 390 000 UZS",
    },
  ];
  function normalizeResults(raw) {
    // raw can be:
    // 1) already-normalized array (our mock)
    // 2) ETS response object (later)
    if (Array.isArray(raw)) return raw;

    // ETS: placeholder contract (we'll implement after ETS sample)
    // return mapEtsToModel(raw);

    return mapEtsToModel(raw);
  }
  function mapEtsToModel(raw) {
    // ETS adapter placeholder.
    // Input: raw ETS response (object)
    // Output: array of cards in our model shape:
    // { id, reco, depart, arrive, stopsKey, duration, carrier, bagKey, price }

    // No ETS sample yet — do not break UI
    return [];
  }
  /* 👆 ДО любого renderCards / setTimeout / listeners */

  /* дальше КАК У ТЕБЯ УЖЕ ЕСТЬ */

  const t = (key) =>
    window.AB_I18N?.t ? window.AB_I18N.t(key) : key;

  function getLabel(key, params = {}) {
    switch (key) {
      case "stops": {
        const k = params.stopsKey || "";
        return t(k);
      }

      case "bag": {
        const k = params.bagKey || "";
        return t(k);
      }

      default:
        return "";
    }
  }

  function cardHTML(x) {
    return `
      <article class="rs-card" aria-label="${t("rs_card_aria")}">

        <div class="rs-card-main">
          <div class="rs-col rs-col-time">
            <div class="rs-time">${x.depart} → ${x.arrive}</div>
            <div class="rs-small">${getLabel("stops", { stopsKey: x.stopsKey })} · ${x.duration}</div>
          </div>

          <div class="rs-col rs-col-air">
            <div class="rs-air">${x.carrier}</div>
            <div class="rs-small">${getLabel("bag", { bagKey: x.bagKey })}</div>
          </div>

          <div class="rs-col rs-col-price">
            <div class="rs-price">${x.price}</div>
            <div class="rs-small" data-i18n="rs_total">${t("rs_total")}</div>
          </div>

          <div class="rs-col rs-col-cta">
            <button type="button" class="rs-btn" data-i18n="rs_select">${t("rs_select")}</button>
            <a href="#" class="rs-link" data-i18n="rs_details">${t("rs_details")}</a>
          </div>
        </div>

        ${x.reco ? `<div class="rs-badge" aria-label="${t("rs_badge_aria")}" data-i18n="rs_badge_reco">${t("rs_badge_reco")}</div>` : ``}

      </article>
    `.trim();
  }

  function renderCards(items) {
    if (!cardsEl) return;
    cardsEl.innerHTML = items.map(cardHTML).join("");
    if (window.AB_I18N?.apply) window.AB_I18N.apply(); // translate injected nodes
  }

  function rerenderOnLangChange() {
    renderMeta();
    renderCards(normalizeResults(mockResults));
  }

  renderCards(normalizeResults(mockResults));

  window.setTimeout(() => {
    const st = resolveState();
    if (st === "results") renderCards(normalizeResults(mockResults));
    showState(st);
  }, 900);

  if (tryAgainBtn) {
    tryAgainBtn.addEventListener("click", () => {
      showState("loading");
      window.setTimeout(() => {
        const st = resolveState();
        if (st === "results") renderCards(normalizeResults(mockResults));
        showState(st);
      }, 900);
    });
  }





  // --------- Resolve state (skeleton phase) ----------
  function resolveState() {
    if (qs.get("error") === "1") return "error";
    if (qs.get("empty") === "1") return "empty";
    return "results";
  }

  // 1) baseline: show loading first
  showState("loading");

  // 2) simulate async
  window.setTimeout(() => {
    const st = resolveState();
    if (st === "results") renderCards(normalizeResults(mockResults));


    showState(st);
  }, 900);


  if (tryAgainBtn) {
    tryAgainBtn.addEventListener("click", () => {
      showState("loading");
      window.setTimeout(() => {
        const st = resolveState();
        if (st === "results") renderCards(normalizeResults(mockResults));

        showState(st);
      }, 900);

    });
  }
  window.addEventListener("ab:langchange", rerenderOnLangChange);
});
