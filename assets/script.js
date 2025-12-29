// aviabrand-test: booking form logic (index.html) + coming-soon summary
// NOTE: This file must be valid JS. Do NOT leave '...' in code.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  if (!form) {
    console.warn("#searchForm not found");
    return;
  }

  const oneWay = document.getElementById("oneway");       // id="oneway" in HTML
  const returnWrap = document.getElementById("returnWrap");
  const date2 = document.getElementById("date2");
  const date1 = document.getElementById("date1");

  // --- A) one-way toggle: hide/show return date ---
  function syncReturn() {
    if (!oneWay || !returnWrap || !date2) return;

    if (oneWay.checked) {
      returnWrap.style.display = "none";
      date2.value = "";
      date2.disabled = true;
      date2.required = false;
    } else {
      returnWrap.style.display = "";
      date2.disabled = false;
      date2.required = false; // can set true later if you want
    }
  }
  if (oneWay) {
    oneWay.addEventListener("change", syncReturn);
    syncReturn(); // apply on load
  }

  // --- B) date picker: open by click anywhere (Chrome showPicker) ---
  [date1, date2].forEach((el) => {
    if (!el) return;

    const openPicker = () => {
      if (typeof el.showPicker === "function") el.showPicker();
    };

    // Use click only to avoid weird focus loops
    el.addEventListener("click", openPicker);
  });

  // --- C) fake placeholder: .datefield.has-value ---
  document.querySelectorAll(".datefield input[type='date']").forEach((inp) => {
    const wrap = inp.closest(".datefield");
    if (!wrap) return;

    const sync = () => wrap.classList.toggle("has-value", !!inp.value);
    inp.addEventListener("change", sync);
    inp.addEventListener("input", sync);
    sync();
  });

  // --- D) submit: go to coming-soon.html with params ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const from = document.getElementById("from")?.value || "";
    const to = document.getElementById("to")?.value || "";
    const d1 = document.getElementById("date1")?.value || "";
    const pax = document.getElementById("pax")?.value || "1";

    const params = new URLSearchParams({ from, to, date1: d1, pax });

    // add date2 ONLY when not one-way and date2 has value
    if (!oneWay?.checked) {
      const d2 = date2?.value || "";
      if (d2) params.set("date2", d2);
    }

    window.location.href = "coming-soon.html?" + params.toString();
  });

  // --- E) coming-soon.html summary (if elements exist) ---
  const summary = document.getElementById("searchSummary");
  if (summary) {
    const params = new URLSearchParams(window.location.search);

    const from = params.get("from") || "-";
    const to = params.get("to") || "-";
    const d1 = params.get("date1");
    const d2 = params.get("date2");
    const pax = params.get("pax") || "-";

    const fmt = (d) => {
      if (!d) return "";
      const [y, m, day] = d.split("-");
      return `${day}.${m}.${y}`;
    };

    document.getElementById("sumFrom")?.textContent = from;
    document.getElementById("sumTo")?.textContent = to;
    document.getElementById("sumPax")?.textContent = pax;

    const elDates = document.getElementById("sumDates");
    if (elDates) {
      elDates.textContent = (d1 || d2)
        ? (d2 ? `${fmt(d1)} → ${fmt(d2)}` : fmt(d1))
        : "-";
    }
  }
});
