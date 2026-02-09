// V3 serializer (engine-agnostic)
// Input: V3 state
// Output: { payload, query }
window.serializeV3 = function serializeV3(state, opts = {}) {
  const options = Object.assign(
    {
      owMode: "omit", // "omit" | "empty" | "flag"
      paxMode: "separate", // "separate" | "joined"
      paramMap: {
  origin: "from",
  destination: "to",
  departDate: "date1",
  returnDate: "date2",
  adults: "adt",
  children: "chd",
  infants: "inf",
  oneway: "oneway",
  locale: "locale",
},


    },
    opts
  );

  // --- minimal guards (state must already be validated by UI) ---
  if (!state || !state.from || !state.to || !state.dates || !state.pax) return null;
  if (!state.from.code || !state.to.code) return null;
  if (!state.dates.depart) return null;

  const payload = {};

  // routes
  payload[options.paramMap.origin] = state.from.code;
  payload[options.paramMap.destination] = state.to.code;

  // dates (ISO only)
  payload[options.paramMap.departDate] = state.dates.depart;

  if (state.tripType === "RT") {
    if (!state.dates.ret) return null;
    payload[options.paramMap.returnDate] = state.dates.ret;
  } else {
    // OW handling
    if (options.owMode === "empty") {
      payload[options.paramMap.returnDate] = "";
    } else if (options.owMode === "flag") {
      payload[options.paramMap.oneway] = "1";
    }
    // "omit" => do nothing
  }

  // pax
  const adt = Number(state.pax.adt || 0);
  const chd = Number(state.pax.chd || 0);
  const inf = Number(state.pax.inf || 0);

  if (options.paxMode === "joined") {
    payload.pax = `ADT${adt}-CHD${chd}-INF${inf}`;
  } else {
    payload[options.paramMap.adults] = adt;
    payload[options.paramMap.children] = chd;
    payload[options.paramMap.infants] = inf;
  }
  // locale (optional)
  const loc = state.locale || new URLSearchParams(location.search).get("locale");
  if (loc) payload[options.paramMap.locale] = loc;

  // query string
  const params = new URLSearchParams();
  Object.keys(payload).forEach((k) => params.append(k, payload[k]));
  const query = params.toString();

  return { payload, query };
};
