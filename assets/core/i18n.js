(() => {
  "use strict";

  const DICT = {
    ru: {
      field_from: "Откуда",
      field_to: "Куда",
      field_depart: "Туда",
      field_return: "Обратно",
      btn_search: "Найти",
      field_pax: "Пассажиры",
      btn_oneway_on: "Без обратного билета",
      btn_oneway_off: "С обратным билетом",
      pax_adt_title: "Взрослые",
      pax_adt_desc: "от 12 лет и старше",
      pax_chd_title: "Дети",
      pax_chd_desc: "от 2 до 12 лет на момент перелета",
      pax_inf_title: "Младенцы",
      pax_inf_desc: "до 2 лет (без места, на руках у взрослого)",
      pax_summary_one: "пассажир",
      pax_summary_few: "пассажира",
      pax_summary_many: "пассажиров",
      pax_done: "Готово",
      err_from_required: "Выберите пункт отправления",
      err_to_required: "Выберите пункт назначения",
      err_dates_required: "Выберите дату вылета",
      err_return_required: "Выберите дату возвращения",
      aria_lang: "Язык",
      aria_from_suggest: "Подсказки: Откуда",
      aria_to_suggest: "Подсказки: Куда",
      err_return_before_depart: "Дата возвращения не может быть раньше даты вылета",
      err_same_city: "Пункт прилёта должен отличаться от пункта вылета",
      sum_title: "Параметры поиска (V3)",
      sum_desc: "Это временная страница для проверки redirect и параметров.",
      sum_from: "Откуда",
      sum_to: "Куда",
      sum_dates: "Даты",
      sum_pax: "Пассажиры",
      sum_back: "Назад к форме",
      cal_title: "Календарь",
      cal_when: "Когда",
      cal_return: "Обратно",
      hero_h1: "Купить авиабилет — просто",
      hero_sub: "Проверьте цены на перелёты за минуту и спокойно переходите к покупке, когда будете готовы.",
      hero_micro: "Можно просто посмотреть цены — без обязательств",
      routes_title: "Популярные направления",
      routes_sub: "Часто смотрят — можно проверить цены за минуту",
      routes_more: "Все направления →",
      how_title: "Как это работает",
      how_s1: "Выберите направление и даты",
      how_s2: "Посмотрите доступные варианты",
      how_s3: "Спокойно оформите билет",
      faq_title: "FAQ",
      faq_sub: "Короткие ответы на частые вопросы",
      faq_q1: "Нужно ли регистрироваться?",
      faq_a1: "Нет. Можно просто проверить цены и перейти к бронированию.",
      faq_q2: "Можно ли купить билет без обратного?",
      faq_a2: "Да. Выберите «Без обратного билета» — и укажите только дату вылета.",
      faq_q3: "Как понять, что всё оформлено правильно?",
      faq_a3: "Мы показываем понятные шаги и остаёмся на связи, если возникнут вопросы.",
      faq_q4: "Где связаться с поддержкой?",
      faq_a4: "В разделе «Контакты» — телефон, email и мессенджеры.",
      faq_more: "Все вопросы →",
      cta_title: "Остались вопросы?",
      cta_sub: "Мы на связи и поможем на любом этапе.",
      cta_btn: "Связаться с нами",
      results_page_title: "Результаты — Aviabrand",
      rs_change: "Изменить поиск",
      rs_note: "Мы выбрали несколько понятных вариантов по вашему запросу. Цены проверяются в реальном времени.",
      rs_title: "Варианты для вашей поездки",
      rs_sub: "Цены показаны для выбранных дат и пассажиров",
      rs_total: "Итого за всех пассажиров",
      rs_select: "Выбрать",
      rs_details: "Детали рейса",
      rs_badge_reco: "Рекомендуем",
      rs_more_q: "Нужно больше вариантов?",
      rs_more_link: "Показать все доступные рейсы",
      rs_loading: "Проверяем доступные рейсы…",
      rs_empty_title: "На эти даты рейсы не найдены",
      rs_empty_text: "Такое бывает для некоторых направлений или дат.",
      rs_change_dates: "Изменить даты",
      rs_change_route: "Изменить маршрут",
      rs_error_title: "Не удалось загрузить рейсы",
      rs_error_text: "Попробуйте ещё раз или вернитесь немного позже.",
      rs_try_again: "Попробовать снова",
      rs_back_home: "Вернуться на главную",
      nav_home: "Главная",
      nav_routes: "Направления",
      nav_how: "Как купить",
      nav_fares: "Тарифы и услуги",
      nav_faq: "FAQ",
      nav_contacts: "Контакты",
      rs_stop_0: "Без пересадок",
      rs_stop_1: "1 пересадка",
      rs_bag_cabin: "Ручная кладь включена",
      rs_bag_cabin20: "Ручная кладь + 20 кг",
            rs_details: "Детали рейса",
      rs_card_aria: "Вариант рейса",
      rs_badge_aria: "Значок",
      rs_badge_reco: "Рекомендуем",
      
    },

    uz: {
      field_from: "Qayerdan",
      field_to: "Qayerga",
      field_depart: "Ketish",
      field_return: "Qaytish",
      btn_search: "Qidirish",
      field_pax: "Yo‘lovchilar",
      btn_oneway_on: "Qaytish chiptasisiz",
      btn_oneway_off: "Qaytish bilan",
      pax_adt_title: "Kattalar",
      pax_adt_desc: "12 yosh va undan katta",
      pax_chd_title: "Bolalar",
      pax_chd_desc: "parvoz vaqtida 2 yoshdan 12 yoshgacha",
      pax_inf_title: "Chaqaloqlar",
      pax_inf_desc: "2 yoshgacha (o‘rinsiz, kattalar bag‘rida)",
      pax_summary_one: "yo‘lovchi",
      pax_summary_few: "yo‘lovchi",
      pax_summary_many: "yo‘lovchi",
      pax_done: "Tayyor",
      err_from_required: "Jo‘nab ketish joyini tanlang",
      err_to_required: "Borish joyini tanlang",
      err_dates_required: "Uchish sanasini tanlang",
      err_return_required: "Qaytish sanasini tanlang",
      aria_lang: "Til",
      aria_from_suggest: "Maslahatlar: Qayerdan",
      aria_to_suggest: "Maslahatlar: Qayerga",
      err_return_before_depart: "Qaytish sanasi ketish sanasidan oldin bo‘lishi mumkin emas",
      err_same_city: "Borish manzili jo‘nab ketish joyidan farq qilishi kerak",
      sum_title: "Qidiruv parametrlari (V3)",
      sum_desc: "Bu sahifa redirect va parametrlarni tekshirish uchun.",
      sum_from: "Qayerdan",
      sum_to: "Qayerga",
      sum_dates: "Sanalar",
      sum_pax: "Yo‘lovchilar",
      sum_back: "Formaga qaytish",
      cal_title: "Kalendar",
      cal_when: "Qachon",
      cal_return: "Qaytish",
      hero_h1: "Aviabilet sotib olish — oson",
      hero_sub: "1 daqiqada parvoz narxlarini tekshiring va tayyor bo‘lganda xotirjam xaridga o‘ting.",
      hero_micro: "Faqat narxlarni ko‘rib chiqish mumkin — majburiyatsiz",
      routes_title: "Mashhur yo‘nalishlar",
      routes_sub: "Ko‘p ko‘riladi — narxlarni bir daqiqada tekshirish mumkin",
      routes_more: "Barcha yo‘nalishlar →",
      how_title: "Qanday ishlaydi",
      how_s1: "Yo‘nalish va sanalarni tanlang",
      how_s2: "Mavjud variantlarni ko‘ring",
      how_s3: "Xotirjam chipta rasmiylashtiring",
      faq_title: "FAQ",
      faq_sub: "Ko‘p beriladigan savollarga qisqa javoblar",
      faq_q1: "Ro‘yxatdan o‘tish kerakmi?",
      faq_a1: "Yo‘q. Shunchaki narxlarni tekshirib, bron qilishga o‘tishingiz mumkin.",
      faq_q2: "Qaytishsiz chipta olish mumkinmi?",
      faq_a2: "Ha. «Qaytish chiptasiz»ni tanlang — faqat uchish sanasini kiriting.",
      faq_q3: "Hammasi to‘g‘ri rasmiylashtirilganini qanday bilaman?",
      faq_a3: "Biz jarayonni tushunarli qilamiz va savol bo‘lsa aloqadamiz.",
      faq_q4: "Qo‘llab-quvvatlash bilan qayerda bog‘lanaman?",
      faq_a4: "«Kontaktlar» bo‘limida — telefon, email va messenjerlar.",
      faq_more: "Barcha savollar →",
      cta_title: "Savollaringiz qoldimi?",
      cta_sub: "Biz har doim aloqadamiz va yordam beramiz.",
      cta_btn: "Biz bilan bog‘lanish",
      results_page_title: "Natijalar — Aviabrand",
      rs_change: "Qidiruvni o‘zgartirish",
      rs_note: "So‘rovingiz bo‘yicha bir nechta tushunarli variantlarni tanladik. Narxlar real vaqtda tekshiriladi.",
      rs_title: "Safaringiz uchun variantlar",
      rs_sub: "Narxlar tanlangan sana va yo‘lovchilar soni bo‘yicha ko‘rsatilgan",
      rs_total: "Barcha yo‘lovchilar uchun jami",
      rs_select: "Tanlash",
      rs_details: "Reys tafsilotlari",
      rs_badge_reco: "Tavsiya etiladi",
      rs_more_q: "Ko‘proq variant kerakmi?",
      rs_more_link: "Barcha mavjud reyslarni ko‘rsatish",
      rs_loading: "Mavjud reyslar tekshirilmoqda…",
      rs_empty_title: "Ushbu sanalar uchun reyslar topilmadi",
      rs_empty_text: "Ba’zi yo‘nalishlar yoki sanalar uchun bu holat bo‘lishi mumkin.",
      rs_change_dates: "Sanani o‘zgartirish",
      rs_change_route: "Yo‘nalishni o‘zgartirish",
      rs_error_title: "Reyslarni yuklab bo‘lmadi",
      rs_error_text: "Qayta urinib ko‘ring yoki birozdan so‘ng qayting.",
      rs_try_again: "Qayta urinish",
      rs_back_home: "Bosh sahifaga qaytish",
      nav_home: "Bosh sahifa",
      nav_routes: "Yo‘nalishlar",
      nav_how: "Qanday sotib olish",
      nav_fares: "Tariflar va xizmatlar",
      nav_faq: "FAQ",
      nav_contacts: "Kontaktlar",
      rs_stop_0: "To‘g‘ridan-to‘g‘ri",
      rs_stop_1: "1 ta to‘xtash",
      rs_bag_cabin: "Qo‘l yuki kiritilgan",
      rs_bag_cabin20: "Qo‘l yuki + 20 kg",
            rs_details: "Reys tafsilotlari",
      rs_card_aria: "Reys varianti",
      rs_badge_aria: "Belgi",
      rs_badge_reco: "Tavsiya etiladi",

    },

    en: {
      field_from: "From",
      field_to: "To",
      field_depart: "Depart",
      field_return: "Return",
      btn_search: "Search",
      field_pax: "Passengers",
      btn_oneway_on: "One-way",
      btn_oneway_off: "Round-trip",
      pax_adt_title: "Adults",
      pax_adt_desc: "12 years and older",
      pax_chd_title: "Children",
      pax_chd_desc: "2 to 12 years at the time of flight",
      pax_inf_title: "Infants",
      pax_inf_desc: "under 2 years (no seat, on an adult’s lap)",
      pax_summary_one: "passenger",
      pax_summary_many: "passengers",
      pax_done: "Done",
      err_from_required: "Select departure location",
      err_to_required: "Select destination",
      err_dates_required: "Select departure date",
      err_return_required: "Select return date",
      aria_lang: "Language",
      aria_from_suggest: "Suggestions: From",
      aria_to_suggest: "Suggestions: To",
      err_return_before_depart: "Return date cannot be earlier than departure date",
      err_same_city: "Destination must be different from origin",
      sum_title: "Search details (V3)",
      sum_desc: "This is a temporary page to verify redirect and parameters.",
      sum_from: "From",
      sum_to: "To",
      sum_dates: "Dates",
      sum_pax: "Passengers",
      sum_back: "Back to form",
      cal_title: "Calendar",
      cal_when: "Depart",
      cal_return: "Return",
      hero_h1: "Buying a flight ticket is simple",
      hero_sub: "Check flight prices in a minute and move to booking calmly when you’re ready.",
      hero_micro: "Just check prices — no obligation",
      routes_title: "Popular routes",
      routes_sub: "Frequently checked — see prices in a minute",
      routes_more: "All routes →",
      how_title: "How it works",
      how_s1: "Choose your route and dates",
      how_s2: "View available options",
      how_s3: "Complete your booking calmly",
      faq_title: "FAQ",
      faq_sub: "Short answers to common questions",
      faq_q1: "Do I need to register?",
      faq_a1: "No. You can simply check prices and move to booking.",
      faq_q2: "Can I book a one-way ticket?",
      faq_a2: "Yes. Choose “One-way” and enter only the departure date.",
      faq_q3: "How do I know everything is correct?",
      faq_a3: "We keep the steps clear and stay available if you have questions.",
      faq_q4: "How can I contact support?",
      faq_a4: "See “Contacts” — phone, email, and messengers.",
      faq_more: "All questions →",
      cta_title: "Have questions?",
      cta_sub: "We’re here to help at any step.",
      cta_btn: "Contact us",
      results_page_title: "Results — Aviabrand",
      rs_change: "Change search",
      rs_note: "We’ve selected a few clear options for your trip. Prices are checked live.",
      rs_title: "Available options for your trip",
      rs_sub: "Prices shown for the selected dates and passengers",
      rs_total: "Total for all passengers",
      rs_select: "Select",
      rs_details: "Flight details",
      rs_badge_reco: "Recommended",
      rs_more_q: "Looking for more options?",
      rs_more_link: "Show all available flights",
      rs_loading: "Checking available flights…",
      rs_empty_title: "No flights found for these dates",
      rs_empty_text: "This can happen for some routes or dates.",
      rs_change_dates: "Change dates",
      rs_change_route: "Change route",
      rs_error_title: "We couldn’t load flights right now",
      rs_error_text: "Please try again or come back in a moment.",
      rs_try_again: "Try again",
      rs_back_home: "Back to Home",
      nav_home: "Home",
      nav_routes: "Routes",
      nav_how: "How to buy",
      nav_fares: "Fares & services",
      nav_faq: "FAQ",
      nav_contacts: "Contacts",
      rs_stop_0: "Non-stop",
      rs_stop_1: "1 stop",
      rs_bag_cabin: "Cabin baggage included",
      rs_bag_cabin20: "Cabin + 20kg",
            rs_details: "Flight details",
      rs_card_aria: "Flight option",
      rs_badge_aria: "Badge",
      rs_badge_reco: "Recommended",

    },
  };


  function normalizeLang(x) {
    const v = String(x || "").toLowerCase();
    if (v === "ru" || v === "uz" || v === "en") return v;
    return "ru";
  }

  // Read current language:
  // 1) ?lang=uz|ru|en
  // 2) <html lang="...">
  // 3) localStorage 'ab_lang'
  function getLang() {
    const qs = new URLSearchParams(window.location.search);
    const fromQs = qs.get("lang");
    if (fromQs) return normalizeLang(fromQs);

    const fromLs = localStorage.getItem("ab_lang");
    if (fromLs) return normalizeLang(fromLs);

    const fromHtml = document.documentElement.getAttribute("lang");
    if (fromHtml) return normalizeLang(fromHtml);

    return "ru";

  }

 function setLang(lang) {
  const v = normalizeLang(lang);

  // 1) обновляем ВСЕ источники истины
  document.documentElement.setAttribute("lang", v);
  localStorage.setItem("ab_lang", v);

  try {
    const u = new URL(window.location.href);
    u.searchParams.set("lang", v);
    window.history.replaceState({}, "", u.toString());
  } catch {}

  // 2) ТОЛЬКО ТЕПЕРЬ рендер
  applyI18n(document);
  window.dispatchEvent(new CustomEvent("ab:langchange", { detail: { lang: v } }));

  return v;
}



  // Translate key
  function t(key, fallback = "") {
    const lang = getLang();
    return (DICT[lang] && DICT[lang][key]) || fallback || key;
  }

  // Apply translations to nodes with data-i18n="key"
  function applyI18n(root = document) {
    const lang = getLang();
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = (DICT[lang] && DICT[lang][key]) || key;

      // if element has data-i18n-attr, set that attribute (placeholder/title/aria-label)
      const attr = el.getAttribute("data-i18n-attr");
      if (attr) {
        el.setAttribute(attr, val);
      } else {
        el.textContent = val;
      }
    });
  }

  // expose to window
  function parseISO(iso) {
    // iso: YYYY-MM-DD
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
    if (!m) return null;
    const y = Number(m[1]);
    const mo = Number(m[2]) - 1;
    const d = Number(m[3]);
    const dt = new Date(y, mo, d);
    if (Number.isNaN(dt.getTime())) return null;
    return dt;
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  // Human-readable date: "25 Jan, Sun" / "25 янв, вс" / "25-yan, Yak"
  function formatDateUI(iso, lang) {
    const dt = parseISO(iso);
    if (!dt) return "";

    const L = lang || getLang();

    const DOW_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const DOW_RU = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    const DOW_UZ = ["Yak", "Du", "Se", "Cho", "Pay", "Ju", "Sha"];

    const MON_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const MON_RU = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
    const MON_UZ = ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"];

    const day = dt.getDate();
    const mon = dt.getMonth();
    const dow = dt.getDay();

    if (L === "ru") {
      return `${day} ${MON_RU[mon]}, ${DOW_RU[dow]}`;
    }
    if (L === "uz") {
      // style: 25-yan, Yak
      return `${day}-${MON_UZ[mon]}, ${DOW_UZ[dow]}`;
    }
    // en default: 25 Jan, Sun
    return `${day} ${MON_EN[mon]}, ${DOW_EN[dow]}`;
  }

  window.AB_I18N = { DICT, getLang, setLang, t, applyI18n, formatDateUI };

    // Apply i18n once on load (after getLang() priority + html[lang] are correct)
  // This prevents "half EN" after reload.
  document.addEventListener("DOMContentLoaded", () => {
    const L = getLang();
    document.documentElement.setAttribute("lang", L);
    applyI18n(document);
  });

})();
