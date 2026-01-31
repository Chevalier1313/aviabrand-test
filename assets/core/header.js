// assets/header.js
// Core header: burger menu + language buttons
document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector(".bk3-burger");
  const mmenu = document.querySelector(".bk3-mmenu");
  const mmenuClose = document.querySelector(".bk3-mmenu-close");
  const langBar = document.querySelector(".bk3-langBar") || document.querySelector(".bk3-lang");



  function openMenu() {
    if (!mmenu || !burgerBtn) return;
    mmenu.hidden = false;
    mmenu.classList.add("is-open");
    burgerBtn.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!mmenu || !burgerBtn) return;
    mmenu.hidden = true;
    mmenu.classList.remove("is-open");
    burgerBtn.setAttribute("aria-expanded", "false");
  }

  burgerBtn?.addEventListener("click", () => {
    if (!mmenu) return;
    if (mmenu.hidden) openMenu();
    else closeMenu();
  });

  mmenuClose?.addEventListener("click", closeMenu);

  mmenu?.addEventListener("click", (e) => {
    // click outside nav closes
    const nav = e.target?.closest?.(".bk3-mmenu-nav");
    if (!nav) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mmenu && !mmenu.hidden) closeMenu();
  });
  
  // language buttons (requires AB_I18N from core/i18n.js)
  document.querySelectorAll(".bk3-langbtn[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (window.AB_I18N && typeof window.AB_I18N.setLang === "function") {
        window.AB_I18N.setLang(lang);

        // force re-apply translations (some pages inject HTML later)
        if (typeof window.AB_I18N.applyI18n === "function") window.AB_I18N.applyI18n();
        else if (typeof window.AB_I18N.apply === "function") window.AB_I18N.apply();
        // update active button UI
        document.querySelectorAll(".bk3-langbtn[data-lang]").forEach((b) => {
          b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
        });

      }

    });
  });

  // set active lang button on load
  const cur = window.AB_I18N?.getLang ? window.AB_I18N.getLang() : null;
  if (cur) {
    document.querySelectorAll(".bk3-langbtn[data-lang]").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === cur);
    });
  }

});
