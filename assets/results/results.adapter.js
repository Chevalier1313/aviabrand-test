// Results adapter (data normalization)
// used by results.js (init) and later ETS integration

(function () {
  function normalizeResults(raw) {
    if (Array.isArray(raw)) return raw;
    return mapEtsToModel(raw);
  }

  function mapEtsToModel(raw) {
    // ETS adapter placeholder.
    // Input: raw ETS response (object)
    // Output: array of cards in our model shape:
    // { id, reco, depart, arrive, stopsKey, duration, carrier, bagKey, price }
    return [];
  }

  window.ResultsAdapter = {
    normalizeResults,
    mapEtsToModel,
  };
})();
