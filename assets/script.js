// assets/script.js
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 1) INDEX: форма поиска
  // =========================
  const form = document.getElementById("searchForm");
  const oneWay = document.getElementById("oneway");
  const returnWrap = document.getElementById("returnWrap");
  const date2 = document.getElementById("date2");
  const date1 = document.getElementById("date1");

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
      date2.required = false;
    }
  }

  if (oneWay) {
    oneWay.addEventListener("change", syncReturn);
    syncReturn();
  }

  // Открывать календарь по клику по полю (Chrome/Edge)
  [date1, date2].forEach((el) => {
    if (!el) return;
    el.addEventListener("click", () => {
      if (typeof el.showPicker === "function") el.showPicker();
    });
  });

  // fake placeholder: .datefield.has-value
  document.querySelectorAll(".datefield input[type='date']").forEach((inp) => {
    const wrap = inp.closest(".datefield");
    if (!wrap) return;

    const sync = () => wrap.classList.toggle("has-value", !!inp.value);
    inp.addEventListener("change", sync);
    inp.addEventListener("input", sync);
    sync();
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const from = document.getElementById("from")?.value || "";
      const to = document.getElementById("to")?.value || "";
      const d1 = document.getElementById("date1")?.value || "";
      const pax = document.getElementById("pax")?.value || "1";

      const params = new URLSearchParams({ from, to, date1: d1, pax });

      if (!oneWay?.checked) {
        const d2 = date2?.value || "";
        if (d2) params.set("date2", d2);
      }

      window.location.href = "coming-soon.html?" + params.toString();
    });
  }

  // =========================
  // 2) COMING-SOON: вывод параметров
  // =========================
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

    const elFrom = document.getElementById("sumFrom");
    const elTo = document.getElementById("sumTo");
    const elPax = document.getElementById("sumPax");
    const elDates = document.getElementById("sumDates");

    if (elFrom) elFrom.textContent = from;
    if (elTo) elTo.textContent = to;
    if (elPax) elPax.textContent = pax;

    if (elDates) {
      if (d1 || d2) {
        elDates.textContent = d2 ? `${fmt(d1)} → ${fmt(d2)}` : fmt(d1);
      } else {
        elDates.textContent = "-";
      }
    }
  }
});
