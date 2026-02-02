/**
 * Result card model for Results V3 (UI contract)
 *
 * @typedef {Object} ResultCardV3
 * @property {string} id            // unique offer/itinerary id
 * @property {boolean} reco         // recommended flag
 * @property {string} depart        // "HH:MM"
 * @property {string} arrive        // "HH:MM"
 * @property {string} duration      // "5h 30m" (UI-ready string for now)
 * @property {string} carrier       // airline display name
 * @property {string} stopsKey      // "rs_stop_0" | "rs_stop_1" | "rs_n_stops"
 * @property {string} bagKey        // e.g. "rs_bag_cabin", "rs_bag_cabin20"
 * @property {string} price         // formatted string, e.g. "4 045 381 UZS"
 */

// Results adapter (data normalization)
// Single responsibility:
// - accept ANY raw results source (mock / ETS)
// - output ResultCardV3[] for ResultsView

(function () {
  /**
   * Normalize incoming results into ResultCardV3[]
   * @param {any} raw
   * @returns {ResultCardV3[]}
   */
  function normalizeResults(raw) {
    // 1) already normalized (mock or future cached model)
    if (Array.isArray(raw)) return raw;

    // 2) ETS response (adapter below)
    return mapEtsToModel(raw);
  }

  /**
   * ETS adapter (placeholder)
   *
   * CONTRACT (ETS → ResultCardV3[])
   * ETS raw response MUST contain enough data to derive:
   * - depart / arrive times
   * - total duration
   * - carrier (name or code → display name)
   * - stops count (0 / 1 / 2+)
   * - baggage info (cabin / cabin+20kg / etc)
   * - total price + currency
   *
   * No assumptions are made until a real ETS sample is provided.
   *
   * @param {Object} raw ETS response
   * @returns {ResultCardV3[]}
   */
  function mapEtsToModel(raw) {
    // TODO: implement after ETS sample is available
    // IMPORTANT: do not break UI when ETS is not connected
    return [];
  }

  // expose adapter (no modules yet)
  window.ResultsAdapter = {
    normalizeResults,
    mapEtsToModel,
  };
})();
