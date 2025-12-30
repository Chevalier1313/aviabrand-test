// assets/script.js
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // =========================
// 1) INDEX: форма поиска
// =========================
const form = document.getElementById("searchForm");
const oneWay = document.getElementById("oneway");
const returnWrap = document.getElementById("returnWrap");
const date2 = document.getElementById("date2");
const date1 = document.getElementById("date1");



// --- FLATPICKR: только date1/date2 ---
const setFpDisabled = (inst, disabled) => {
  if (!inst) return;
  inst._input.disabled = disabled;
  if (inst.altInput) inst.altInput.disabled = disabled;
};

const fp1 = (date1 && window.flatpickr)
  ? window.flatpickr(date1, {
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d.m.Y",
      altInputClass: "input",
      placeholder: "Выберите дату",
      allowInput: true,
      disableMobile: true
    })
  : null;

const fp2 = (date2 && window.flatpickr)
  ? window.flatpickr(date2, {
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d.m.Y",
      altInputClass: "input",
      placeholder: "Выберите дату",
      allowInput: true,
      disableMobile: true
    })
  : null;
// Очистка формы при возврате назад (bfcache / обычный возврат)
window.addEventListener("pageshow", () => {
  if (form) form.reset();

  // очистить значения исходных инпутов
  if (date1) date1.value = "";
  if (date2) date2.value = "";

  // очистить flatpickr (важно: altInput тоже сбросится)
  if (fp1) fp1.clear();
  if (fp2) fp2.clear();

  // вернуть корректное состояние date2 по oneway
  syncReturn();
});


// --- единая синхронизация oneway (и DOM, и flatpickr) ---
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
    date2.required = true; // важно: обратно билет → required

    setFpDisabled(fp2, false);
  }
}

if (oneWay) {
  oneWay.addEventListener("change", syncReturn);
  syncReturn();
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // round trip → date2 обязателен
if (!oneWay?.checked && !date2?.value) {
  // покажем нативное сообщение на видимом поле
  if (fp2?.altInput) {
    fp2.altInput.setCustomValidity("Выберите дату обратного рейса");
    fp2.altInput.reportValidity();
    fp2.altInput.setCustomValidity("");
    fp2.open();
  } else {
    alert("Выберите дату обратного рейса");
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
