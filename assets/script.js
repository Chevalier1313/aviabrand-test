document.addEventListener("DOMContentLoaded", () => {
  const dict = {
    ru: {
      nav_home: "Главная",
      nav_how: "Как купить",
      nav_fares: "Тарифы и услуги",
      nav_faq: "FAQ",
      nav_contacts: "Контакты",

      hero_title: "Авиабилеты онлайн — удобно, просто, выгодно",
// coming-soon
coming_title: "Скоро начнём онлайн-продажу",
coming_sub: "Мы уже получили вашу заявку. Ниже — параметры поиска, которые вы ввели.",
coming_btn: "Вернуться на главную",
coming_note: "Если хотите — добавим форму заявки (email/телефон) на этой странице.",

field_from: "Откуда",
field_to: "Куда",
field_pax: "Пассажиры",
field_dates: "Даты",
fares_page_title: "Aviabrand.uz — тарифы и услуги",
fares_h1: "Тарифы и услуги",
fares_lead: "Здесь — простое объяснение: чем отличаются тарифы, что с багажом и какими бывают условия обмена/возврата.",
fares_block1_h2: "Как выбрать тариф",
fares_block1_1: "Эконом — обычно дешевле, но условия обмена/возврата строже.",
fares_block1_2: "Стандарт — баланс цены и гибкости.",
fares_block1_3: "Гибкий — дороже, но проще менять даты и сдавать билеты.",
fares_block2_h2: "Багаж и ручная кладь",
fares_block2_1: "Ручная кладь: правила зависят от авиакомпании и тарифа.",
fares_block2_2: "Багаж: может входить в тариф или покупаться отдельно.",
fares_block2_3: "Совет: проверяйте вес/габариты заранее, чтобы не переплачивать в аэропорту.",
fares_block3_h2: "Обмен и возврат",
fares_block3_1: "Обмен: иногда платится разница в цене + сбор.",
fares_block3_2: "Возврат: может быть запрещён или доступен с удержаниями.",
fares_block3_3: "Важно: условия зависят от тарифа и перевозчика — уточняем при интеграции продаж.",

faq_page_title: "Aviabrand.uz — FAQ",
faq_h1: "Вопросы и ответы",
faq_lead: "Собрали короткие ответы на самые частые вопросы по СНГ-направлениям.",
faq_q1: "Нужно ли распечатывать билет?",
faq_a1: "Обычно нет: достаточно электронного билета и паспорта. Но иногда просят распечатку — уточняйте у авиакомпании.",
faq_q2: "Какие документы нужны для перелёта?",
faq_a2: "Зависит от направления: внутренний паспорт/загранпаспорт, виза (если требуется), для детей — свидетельство/разрешение.",
faq_q3: "Как понять, есть ли багаж?",
faq_a3: "Смотрите условия тарифа: ручная кладь и багаж могут отличаться. При интеграции продаж покажем это в карточке рейса.",
faq_q4: "Можно ли вернуть билет?",
faq_a4: "Зависит от тарифа. У некоторых тарифов возврат запрещён, у других — с удержаниями.",
faq_q5: "Когда лучше покупать?",
faq_a5: "Часто выгоднее заранее. На праздники и высокий сезон — чем раньше, тем лучше.",

contacts_page_title: "Aviabrand.uz — контакты",
contacts_h1: "Контакты",
contacts_lead: "Пока вы собираете данные — оставим шаблон. Потом подставим email/телефон и ссылки.",
contacts_email: "Email",
contacts_email_hint: "Укажем позже (например: support@aviabrand.uz)",
contacts_phone: "Телефон",
contacts_phone_hint: "Укажем позже (например: +998 …)",
contacts_hours: "Время работы",
contacts_hours_hint: "Укажем позже (например: 09:00–21:00)",

btn_back_home: "На главную",
footer_note: "Информационный сайт. Онлайн-продажа будет добавлена после интеграции.",

      hero_sub: "Информационный сайт Aviabrand. Скоро запустим онлайн-продажу. Пока — подскажем, как выбрать рейс и подготовиться к покупке.",

      kpi1b: "Под СНГ",
      kpi1s: "маршруты и советы",
      kpi2b: "RU / UZ",
      kpi2s: "двуязычный сайт",
      kpi3b: "Быстро",
      kpi3s: "лёгкие страницы",

      search_title: "Поиск рейса (пока в тестовом режиме)",
      btn_search: "Проверить и перейти",
      note_search: "Пока форма ведёт на страницу «Скоро начнём онлайн-продажу». Позже подключим ваш движок.",

      sec1: "Почему Aviabrand",
      sec2: "Что дальше",

      why1: "Понятные инструкции и ответы на вопросы перед покупкой.",
      why2: "Удобная навигация и адаптивность под телефон.",
      why3: "Подготовка к интеграции с движком продаж.",

      next1: "Вы добавите контакты и юридическую информацию.",
      next2: "Мы подключим движок продаж (с инженерами).",
      next3: "Добавим SEO-страницы по направлениям и FAQ.",
      footer_note: "Информационный сайт. Онлайн-продажа будет добавлена после интеграции.",
      from: "Откуда",
      to: "Куда",
      pax: "Пассажиры"
    },

    uz: {
      nav_home: "Bosh sahifa",
      nav_how: "Qanday sotib olish",
      nav_fares: "Tariflar va xizmatlar",
      nav_faq: "Savollar",
      nav_contacts: "Kontaktlar",
fares_page_title: "Aviabrand.uz — tarif va xizmatlar",
fares_h1: "Tarif va xizmatlar",
fares_lead: "Bu yerda oddiy tushuntiramiz: tariflar farqi, bagaj va almashtirish/qaytarish shartlari.",
fares_block1_h2: "Tarifni qanday tanlash",
fares_block1_1: "Ekonom — odatda arzonroq, lekin almashtirish/qaytarish shartlari qattiqroq.",
fares_block1_2: "Standart — narx va qulaylik balansi.",
fares_block1_3: "Moslashuvchan — qimmatroq, lekin sanani o‘zgartirish va qaytarish osonroq.",
fares_block2_h2: "Bagaj va qo‘l yuki",
fares_block2_1: "Qo‘l yuki: qoidalar aviakompaniya va tarifga bog‘liq.",
fares_block2_2: "Bagaj: tarifga kirishi yoki alohida sotib olinishi mumkin.",
fares_block2_3: "Maslahat: vazn/o‘lchamlarni oldindan tekshiring — aeroportda ortiqcha to‘lov bo‘lmasin.",
fares_block3_h2: "Almashtirish va qaytarish",
fares_block3_1: "Almashtirish: ba’zan narx farqi + yig‘im bo‘ladi.",
fares_block3_2: "Qaytarish: ayrim tariflarda taqiqlangan, ayrimida ushlab qolishlar bilan mumkin.",
fares_block3_3: "Muhim: shartlar tarif va tashuvchiga bog‘liq — sotuv integratsiyasida aniq ko‘rsatamiz.",

faq_page_title: "Aviabrand.uz — FAQ",
faq_h1: "Savol-javob",
faq_lead: "MDH yo‘nalishlari bo‘yicha eng ko‘p beriladigan savollarga qisqa javoblar.",
faq_q1: "Biletni chop etish kerakmi?",
faq_a1: "Ko‘pincha yo‘q: elektron bilet va pasport yetarli. Ba’zan chop etishni so‘rashlari mumkin — aviakompaniyadan tekshiring.",
faq_q2: "Parvoz uchun qanday hujjatlar kerak?",
faq_a2: "Yo‘nalishga bog‘liq: ichki pasport/xorij pasport, viza (kerak bo‘lsa), bolalar uchun — guvohnoma/ruxsat.",
faq_q3: "Bagaj bor-yo‘qligini qanday bilaman?",
faq_a3: "Tarif shartlarini ko‘ring: qo‘l yuki va bagaj farq qilishi mumkin. Sotuv integratsiyasida buni aniq ko‘rsatamiz.",
faq_q4: "Biletni qaytarish mumkinmi?",
faq_a4: "Tarifga bog‘liq. Ba’zi tariflarda qaytarish taqiqlangan, ba’zilarida ushlab qolishlar bilan mumkin.",
faq_q5: "Qachon sotib olgan ma’qul?",
faq_a5: "Ko‘pincha oldindan arzonroq bo‘ladi. Bayram va yuqori mavsumda — imkon qadar erta.",

contacts_page_title: "Aviabrand.uz — kontaktlar",
contacts_h1: "Kontaktlar",
contacts_lead: "Hozircha shablon qoldiramiz. Keyin email/telefon va havolalarni qo‘shamiz.",
contacts_email: "Email",
contacts_email_hint: "Keyin yozamiz (masalan: support@aviabrand.uz)",
contacts_phone: "Telefon",
contacts_phone_hint: "Keyin yozamiz (masalan: +998 …)",
contacts_hours: "Ish vaqti",
contacts_hours_hint: "Keyin yozamiz (masalan: 09:00–21:00)",

btn_back_home: "Bosh sahifa",
footer_note: "Axborot sayti. Onlayn sotuv integratsiyadan so‘ng qo‘shiladi.",

      hero_title: "Aviabiletlar onlayn — qulay, oddiy, foydali",
// coming-soon
coming_title: "Tez orada onlayn sotuvni boshlaymiz",
coming_sub: "So‘rovingiz qabul qilindi. Quyida siz kiritgan qidiruv ma’lumotlari.",
coming_btn: "Bosh sahifaga qaytish",
coming_note: "Agar xohlasangiz, bu sahifaga ariza (email/telefon) qo‘shamiz.",

field_from: "Qayerdan",
field_to: "Qayerga",
field_pax: "Yo‘lovchilar",
field_dates: "Sanalar",

      hero_sub: "Aviabrand axborot sayti. Tez orada onlayn sotuvni ishga tushiramiz. Hozircha parvozni tanlash bo‘yicha yordam beramiz.",

      kpi1b: "MDH uchun",
      kpi1s: "yo‘nalishlar va maslahatlar",
      kpi2b: "RU / UZ",
      kpi2s: "ikki tilli sayt",
      kpi3b: "Tez",
      kpi3s: "yengil sahifalar",

      search_title: "Reys qidirish (test rejimida)",
      btn_search: "Tekshirish va o‘tish",
      note_search: "Hozircha forma «Tez orada sotuv boshlanadi» sahifasiga olib boradi.",

      sec1: "Nega Aviabrand",
      sec2: "Keyingi qadamlar",

      why1: "Sotib olishdan oldin tushunarli yo‘riqnomalar.",
      why2: "Telefon uchun qulay va moslashuvchan dizayn.",
      why3: "Sotuv tizimi bilan integratsiyaga tayyor.",

      next1: "Kontaktlar va yuridik ma’lumotlar qo‘shiladi.",
      next2: "Sotuv tizimi ulanadi.",
      next3: "SEO sahifalar va FAQ qo‘shiladi.",
      footer_note: "Axborot sayti. Onlayn sotuv integratsiyadan so‘ng ishga tushiriladi.",

      from: "Qayerdan",
      to: "Qayerga",
      pax: "Yo‘lovchilar"
    }
  };

  function applyLang(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (dict[lang][key]) el.textContent = dict[lang][key];
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      const key = el.dataset.i18nPh;
      if (dict[lang][key]) el.placeholder = dict[lang][key];
    });

    document.querySelectorAll(".lang button").forEach(b =>
      b.classList.toggle("active", b.dataset.lang === lang)
    );
  }

  document.querySelectorAll(".lang button").forEach(btn => {
    btn.addEventListener("click", () => {
      applyLang(btn.dataset.lang);
    });
  });
// FORM → coming-soon.html
const form = document.getElementById("searchForm");
const oneWay = document.getElementById("oneway");       // один чекбокс: id="oneway"
const returnWrap = document.getElementById("returnWrap"); // обертка вокруг date2
const date2 = document.getElementById("date2");

function syncReturnDateVisibility() {
  if (!oneWay || !returnWrap || !date2) return;

  if (oneWay.checked) {
    returnWrap.style.display = "none";
    date2.value = "";
    date2.disabled = true;
    date2.required = false;
  } else {
    returnWrap.style.display = "";
    date2.disabled = false;
    date2.required = false; // пока не делаем обязательной
  }
}

if (oneWay) {
  oneWay.addEventListener("change", syncReturnDateVisibility);
  syncReturnDateVisibility();
}

// date picker: открывать по клику в любом месте поля (только click, без focus)
["date1", "date2"].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.addEventListener("click", () => {
    if (el.disabled) return;
    if (typeof el.showPicker === "function") el.showPicker();
  });
});

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const from = document.getElementById("from")?.value || "";
    const to = document.getElementById("to")?.value || "";
    const date1 = document.getElementById("date1")?.value || "";
    const pax = document.getElementById("pax")?.value || "1";

    const params = new URLSearchParams({ from, to, date1, pax });

    // date2 добавляем ТОЛЬКО если НЕ one-way и дата реально выбрана
    if (!oneWay?.checked) {
      const d2 = date2?.value || "";
      if (d2) params.set("date2", d2);
    }

    window.location.href = "coming-soon.html?" + params.toString();
  });
}

// ===== coming-soon summary (fills variables on coming-soon.html) =====
const summary = document.getElementById("searchSummary");
if (summary) {
  const params = new URLSearchParams(window.location.search);

  const from = params.get("from") || "-";
  const to = params.get("to") || "-";
  const date1 = params.get("date1");
  const date2 = params.get("date2");
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
    elDates.textContent = (date1 || date2)
      ? (date2 ? `${fmt(date1)} → ${fmt(date2)}` : fmt(date1))
      : "-";
  }
}

// fake placeholder sync (не падаем если обертки нет)
document.querySelectorAll(".datefield input[type='date']").forEach((inp) => {
  const wrap = inp.closest(".datefield");
  if (!wrap) return;

  const sync = () => wrap.classList.toggle("has-value", !!inp.value);
  inp.addEventListener("change", sync);
  inp.addEventListener("input", sync);
  sync();
});


  applyLang("ru");
});