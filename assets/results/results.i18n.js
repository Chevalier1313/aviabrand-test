// Results i18n helpers
// used by results.view.js and results.js

(function () {
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

  // expose to window (no modules yet)
  window.ResultsI18n = {
    t,
    getLabel,
  };
})();
