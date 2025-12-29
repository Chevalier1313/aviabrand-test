document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  if (!form) return;

  const oneWay = document.getElementById("oneway");
  const date2 = document.getElementById("date2");

  // IMPORTANT: если #returnWrap нет — прячем ближайшую обёртку date2 или само поле
  const returnWrap =
    document.getElementById("returnWrap") ||
    (date2 ? date2.closest(".datefield") : null) ||
    date2;

  function syncReturn() {
    if (!oneWay || !date2 || !returnWrap) return;

    const hide = oneWay.checked;

    returnWrap.style.display = hide ? "none" : "";
    date2.disabled = hide;
    date2.required = false;

    if (hide) date2.value = "";
  }

  if (oneWay) {
    oneWay.addEventListener("change", syncReturn);
    syncReturn();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const from = document.getElementById("from")?.value || "";
    const to = document.getElementById("to")?.value || "";
    const date1 = document.getElementById("date1")?.value || "";
    const pax = document.getElementById("pax")?.value || "1";

    const params = new URLSearchParams({ from, to, date1, pax });

    if (!oneWay?.checked) {
      const d2 = date2?.value || "";
      if (d2) params.set("date2", d2);
    }

    window.location.href = "coming-soon.html?" + params.toString();
  });
});
