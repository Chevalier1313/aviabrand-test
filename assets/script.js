document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const oneWay = document.getElementById("oneway");
  const returnWrap = document.getElementById("returnWrap");
  const date2 = document.getElementById("date2");

  if (!form) {
    console.warn("Form #searchForm not found");
    return;
  }

  function syncReturn() {
    if (!oneWay || !returnWrap || !date2) {
      console.warn("oneWay/returnWrap/date2 not found", { oneWay, returnWrap, date2 });
      return;
    }

    const hide = oneWay.checked;
    returnWrap.style.display = hide ? "none" : "";
    date2.disabled = hide;
    if (hide) date2.value = "";
  }

  if (oneWay) {
    oneWay.addEventListener("change", syncReturn);
    syncReturn();
  } else {
    console.warn("Checkbox #oneway not found");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const from = document.getElementById("from")?.value?.trim() || "";
    const to = document.getElementById("to")?.value?.trim() || "";
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
