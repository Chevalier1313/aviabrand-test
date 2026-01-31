(() => {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  function getParam(params, names) {
    for (const n of names) {
      const v = params.get(n);
      if (v !== null && v !== "") return v;
    }
    return "";
  }

  function fmtDates(depart, ret) {
    if (!depart && !ret) return "-";

    if (!window.AB_I18N) {
      // fallback: ISO only
      if (depart && ret) return `${depart} → ${ret}`;
      return depart || ret;
    }

    const f = (iso) => AB_I18N.formatDateUI(iso);

    if (depart && ret) return `${f(depart)} → ${f(ret)}`;
    return f(depart || ret);
  }


  function fmtPax(adt, chd, inf) {
    const A = Number(adt || 0);
    const C = Number(chd || 0);
    const I = Number(inf || 0);

    // UI labels localized; query remains ADT/CHD/INF (good for ETS)
    const t = (key, fallback) => (window.AB_I18N ? AB_I18N.t(key, fallback) : fallback);

    const L_ADT = t("pax_adt_title", "Adults");
    const L_CHD = t("pax_chd_title", "Children");
    const L_INF = t("pax_inf_title", "Infants");

    return `${L_ADT} ${A}, ${L_CHD} ${C}, ${L_INF} ${I}`;
  }


  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    // apply language BEFORE rendering values
    if (window.AB_I18N) {
      AB_I18N.applyI18n(document);
    }

    // keep language when going back to form
    const lang = window.AB_I18N ? AB_I18N.getLang() : (params.get("lang") || "ru");
    const back = document.querySelector('a[data-i18n="sum_back"]');
    if (back) back.href = `booking-v3.html?lang=${encodeURIComponent(lang)}`;


    // We support multiple possible key names (engine adapter later can change names)
    const origin = getParam(params, ["origin", "from", "fromCode"]);
    const destination = getParam(params, ["destination", "to", "toCode"]);
    const depart = getParam(params, ["depart", "departDate", "date1"]);
    const ret = getParam(params, ["return", "returnDate", "date2"]);

    const adt = getParam(params, ["adt", "adults"]);
    const chd = getParam(params, ["chd", "children"]);
    const inf = getParam(params, ["inf", "infants"]);

    const sumFrom = $("sumFrom");
    const sumTo = $("sumTo");
    const sumDates = $("sumDates");
    const sumPax = $("sumPax");

    if (sumFrom) sumFrom.textContent = origin || "-";
    if (sumTo) sumTo.textContent = destination || "-";
    if (sumDates) sumDates.textContent = fmtDates(depart, ret);

    // pax fallback: if not provided, show "-"
    if (sumPax) {
      if (adt || chd || inf) sumPax.textContent = fmtPax(adt || 0, chd || 0, inf || 0);
      else sumPax.textContent = "-";
    }


  });
})();
