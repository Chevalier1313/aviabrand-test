// Results view (DOM render)
// depends on: window.ResultsI18n

(function () {
  function cardHTML(x) {
    return `
      <article class="rs-card" aria-label="${ResultsI18n.t("rs_card_aria")}">
        <div class="rs-card-main">
          <div class="rs-col rs-col-time">
            <div class="rs-time">${x.depart} → ${x.arrive}</div>
            <div class="rs-small">${ResultsI18n.getLabel("stops", { stopsKey: x.stopsKey })} · ${x.duration}</div>
          </div>

          <div class="rs-col rs-col-air">
            <div class="rs-air">${x.carrier}</div>
            <div class="rs-small">${ResultsI18n.getLabel("bag", { bagKey: x.bagKey })}</div>
          </div>

          <div class="rs-col rs-col-price">
            <div class="rs-price">${x.price}</div>
            <div class="rs-small" data-i18n="rs_total">${ResultsI18n.t("rs_total")}</div>
          </div>

          <div class="rs-col rs-col-cta">
            <button type="button" class="rs-btn" data-i18n="rs_select">${ResultsI18n.t("rs_select")}</button>
            <a href="#" class="rs-link" data-i18n="rs_details">${ResultsI18n.t("rs_details")}</a>
          </div>
        </div>

        ${x.reco ? `<div class="rs-badge" aria-label="${ResultsI18n.t("rs_badge_aria")}" data-i18n="rs_badge_reco">${ResultsI18n.t("rs_badge_reco")}</div>` : ``}
      </article>
    `.trim();
  }

  function renderCards(cardsEl, items) {
    if (!cardsEl) return;
    cardsEl.innerHTML = items.map(cardHTML).join("");
    if (window.AB_I18N?.apply) window.AB_I18N.apply(); // translate injected nodes
  }

  window.ResultsView = {
    renderCards,
  };
})();
