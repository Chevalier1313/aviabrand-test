// assets/script.js
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 1) INDEX: форма поиска
  // =========================
  const form = document.getElementById("searchForm");
  const oneWay = document.getElementById("oneway");
  const returnWrap = document.getElementById("returnWrap");
  const date1 = document.getElementById("date1");
  const date2 = document.getElementById("date2");

  // ===== helpers =====
  const startOfDay = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  // "разрешаем вчера"
  const yesterday = () => {
    const x = startOfDay(new Date());
    x.setDate(x.getDate() - 1);
    return x;
  };

  const BASE_MIN_DATE = yesterday();

  const setFpDisabled = (inst, disabled) => {
    if (!inst) return;
    if (inst._input) inst._input.disabled = disabled;     // hidden input
    if (inst.altInput) inst.altInput.disabled = disabled; // visible input
  };

  const applyDatePlaceholder = (inst) => {
    if (inst?.altInput) inst.altInput.placeholder = "Выберите дату";
    if (inst?._input) inst._input.placeholder = "Выберите дату";
  };

  const getSelectedDate = (fp) => {
    const d = fp?.selectedDates?.[0];
    return d ? startOfDay(d) : null;
  };

  // ===== UX: date2 не раньше date1, и если стало раньше — подтянуть на date1 =====
  const syncMinReturnToDepart = () => {
    if (!fp1 || !fp2) return;

    const d1 = getSelectedDate(fp1);

    if (!d1) {
      fp2.set("minDate", BASE_MIN_DATE);
      return;
    }

    // date2 нельзя раньше date1 (но можно тот же день)
    fp2.set("minDate", d1);

    const d2 = getSelectedDate(fp2);
    if (d2 && d2 < d1) {
      fp2.setDate(d1, true); // triggerChange = true
      applyDatePlaceholder(fp2);
    }
  };

  // ===== FLATPICKR: только date1/date2 =====
  const fp1 =
    date1 && window.flatpickr
      ? window.flatpickr(date1, {
          dateFormat: "Y-m-d",
          altInput: true,
          altFormat: "d.m.Y",
          altInputClass: "input",
          allowInput: true,
          disableMobile: true,

          // UX: можно выбрать "вчера", но не раньше
          minDate: BASE_MIN_DATE,

          onReady: (_sd, _ds, inst) => applyDatePlaceholder(inst),
          onValueUpdate: (_sd, _ds, inst) => applyDatePlaceholder(inst),
          onOpen: (_sd, _ds, inst) => applyDatePlaceholder(inst),

          // НАДЁЖНО: onChange прямо тут
          onChange: () => syncMinReturnToDepart(),
        })
      : null;

  const fp2 =
    date2 && window.flatpickr
      ? window.flatpickr(date2, {
          dateFormat: "Y-m-d",
          altInput: true,
          altFormat: "d.m.Y",
          altInputClass: "input",
          allowInput: true,
          disableMobile: true,

          minDate: BASE_MIN_DATE,

          onReady: (_sd, _ds, inst) => applyDatePlaceholder(inst),
          onValueUpdate: (_sd, _ds, inst) => applyDatePlaceholder(inst),
          onOpen: (_sd, _ds, inst) => {
            applyDatePlaceholder(inst);

            // date2 календарь открывается на date1 (но можно вернуть в тот же день)
            const d1 = fp1?.selectedDates?.[0];
            if (d1) inst.jumpToDate(d1, true);
          },

          onChange: (_sd, _ds, inst) => applyDatePlaceholder(inst),
        })
      : null;

  // стартовый placeholder
  applyDatePlaceholder(fp1);
  applyDatePlaceholder(fp2);

  // ===== синхронизация oneway (DOM + flatpickr) =====
  function syncReturn() {
    if (!oneWay || !returnWrap || !date2) return;

    const isOneWay = !!oneWay.checked;

    if (isOneWay) {
      returnWrap.style.display = "none";

      date2.value = "";
      date2.disabled = true;
      date2.required = false;

      if (fp2) fp2.clear();
      setFpDisabled(fp2, true);
    } else {
      returnWrap.style.display = "";

      date2.disabled = false;
      date2.required = true; // (A) round trip -> date2 обязателен

      setFpDisabled(fp2, false);
      applyDatePlaceholder(fp2);

      // если date1 уже выбрана — сразу применяем minDate=date1
      syncMinReturnToDepart();
    }
  }

  if (oneWay) {
    oneWay.addEventListener("change", syncReturn);
    syncReturn();
  }

  // (B) Очистка формы при возврате назад — пусть чистит всегда
  window.addEventListener("pageshow", () => {
    if (form) form.reset();

    if (date1) date1.value = "";
    if (date2) date2.value = "";

    if (fp1) fp1.clear();
    if (fp2) fp2.clear();

    if (fp1) fp1.set("minDate", BASE_MIN_DATE);
    if (fp2) fp2.set("minDate", BASE_MIN_DATE);

    applyDatePlaceholder(fp1);
    applyDatePlaceholder(fp2);

    syncReturn();
  });

  // ===== Submit =====
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // (A) round trip -> date2 must be filled
      if (!oneWay?.checked && !date2?.value) {
        if (fp2?.altInput) {
          fp2.altInput.setCustomValidity("Выберите дату обратного рейса");
          fp2.altInput.reportValidity();
          fp2.altInput.setCustomValidity("");
          fp2.open();
        } else {
          date2.setCustomValidity("Выберите дату обратного рейса");
          date2.reportValidity();
          date2.setCustomValidity("");
        }
        return;
      }

      if (!form.reportValidity()) return;

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
