// assets/script.js
// Aviabrand: i18n + UX helpers (index form, coming-soon summary, SEO pages)
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // i18n dictionary
  // =========================
  const dict = {
    ru: {
      // nav
      nav_home: "Главная",
      nav_routes: "Направления",
      nav_how: "Как купить",
      nav_fares: "Тарифы и услуги",
      nav_faq: "FAQ",
      nav_contacts: "Контакты",

      // common
      btn_back_home: "Вернуться на главную",
      btn_go_search: "Перейти к поиску",
      footer_note: "Информационный сайт. Онлайн-продажа будет добавлена после интеграции.",

      // index hero
      hero_title: "Онлайн авиабилеты — удобно, легко, полезно",
      hero_sub:
        "Aviabrand — информационный сайт. Скоро запустим онлайн-продажу. Пока помогаем выбрать маршрут и подготовиться к покупке.",
      kpi1b: "Под СНГ",
      kpi1s: "маршруты и советы",
      kpi2b: "RU / UZ",
      kpi2s: "двуязычный сайт",
      kpi3b: "Быстро",
      kpi3s: "лёгкие страницы",

      // index form
      search_title: "Поиск рейса (пока в тестовом режиме)",
      oneway_label: "Обратный билет не нужен",
      ph_from: "Откуда",
      ph_to: "Куда",
      ph_date: "Выберите дату",
      submit_btn: "Проверить и перейти",

      // aliases (old keys in html) — чтобы не ломалось
      date_from: "Выберите дату",
      date_to: "Выберите дату",
      btn_check: "Проверить и перейти",

      // index sections
      sec1_title: "Почему Aviabrand",
      sec1_1: "Понятные инструкции и ответы на вопросы перед покупкой.",
      sec1_2: "Удобная навигация и адаптивность под телефон.",
      sec1_3: "Подготовка к интеграции с движком продаж.",
      sec2_title: "Что дальше",
      sec2_1: "Вы добавите контакты и юридическую информацию.",
      sec2_2: "Мы подключим движок продаж (с инженерами).",
      sec2_3: "Добавим SEO-страницы по направлениям и FAQ.",

      // coming-soon
      coming_title: "Скоро начнём онлайн-продажу",
      coming_sub:
        "Мы уже получили вашу заявку. Ниже — параметры поиска, которые вы ввели.",
      coming_btn: "Вернуться на главную",
      field_from: "Откуда",
      field_to: "Куда",
      field_dates: "Даты",
      field_pax: "Пассажиры",

      // routes page
      routes_page_title: "Направления авиарейсов — Aviabrand",
      routes_meta_desc:
        "Популярные направления и примерные страницы маршрутов. Выберите маршрут и перейдите к поиску.",
      routes_h1: "Популярные направления",
      routes_lead: "Выберите маршрут и подготовьтесь к покупке авиабилета.",
      routes_top_h2: "Популярные маршруты",
      routes_other_h2: "Другие направления",
      route_tm: "Ташкент — Москва",
      route_ti: "Ташкент — Стамбул",
      route_td: "Ташкент — Дубай",
      route_tb: "Ташкент — Берлин",

      // how-to-buy
      how_title: "Как купить авиабилет онлайн",
      how_sub:
        "Пошагово: от выбора маршрута до посадочного талона. Мы пока в информационном режиме — но инструкции уже готовы.",
      how_kpi1b: "5–10 минут",
      how_kpi1s: "на оформление",
      how_kpi2b: "Нужны",
      how_kpi2s: "паспорт и карта",
      how_kpi3b: "После оплаты",
      how_kpi3s: "билет на email",
      how_tip_title: "Быстрые советы",
      how_tip1:
        "Пишите города латиницей или кириллицей — главное без цифр и лишних символов.",
      how_tip2:
        "Если летите «туда-обратно» — выбирайте дату возврата не раньше вылета.",
      how_tip3:
        "Проверьте имя/фамилию как в паспорте: одна ошибка может стоить переоформления.",
      how_s1_title: "Шаг 1. Подготовьте данные",
      how_s1_1: "Паспорт: номер, срок действия, как написаны имя/фамилия.",
      how_s1_2:
        "Контакты: email и телефон — туда приходят билет и уведомления.",
      how_s1_3:
        "Оплата: банковская карта или другой доступный способ (зависит от провайдера).",
      how_s2_title: "Шаг 2. Выберите маршрут и даты",
      how_s2_1:
        "Укажите «Откуда» и «Куда». Для разных городов используйте разные названия (не одинаковые).",
      how_s2_2:
        "Выберите дату вылета. Если нужен возврат — выберите дату обратно (не раньше вылета).",
      how_s2_3: "Укажите пассажиров: обычно 1–9 на одну бронь.",
      how_s3_title: "Шаг 3. Сравните варианты",
      how_s3_1:
        "Время: прямой рейс быстрее, с пересадкой — иногда дешевле.",
      how_s3_2:
        "Багаж: проверьте включён ли багаж и ручная кладь.",
      how_s3_3:
        "Тариф: условия возврата/обмена зависят от тарифа — смотрите «Тарифы и услуги».",
      how_s4_title: "Шаг 4. Заполните данные пассажиров",
      how_s4_1:
        "Имя и фамилия — строго как в паспорте (латиницей, если в паспорте латиница).",
      how_s4_2: "Дата рождения и документ — внимательно, без опечаток.",
      how_s4_3:
        "Контакты покупателя — чтобы получить билет и изменения по рейсу.",
      // optional blocks (если есть в html)
      how_s5_title: "Шаг 5. Оплатите",
      how_s5_1: "Проверьте сумму и валюту перед оплатой.",
      how_s5_2: "Сохраните чек/подтверждение.",
      how_s5_3: "Не закрывайте страницу до завершения оплаты.",
      how_s6_title: "Шаг 6. Получите билет",
      how_s6_1: "Билет обычно приходит на email через несколько минут.",
      how_s6_2: "Проверьте папку «Спам», если письма нет.",
      how_s6_3: "Сохраните PDF и номер бронирования.",
      how_s7_title: "Если что-то пошло не так",
      how_err1: "Проверьте интернет и попробуйте ещё раз.",
      how_err2: "Убедитесь, что данные введены без ошибок.",
      how_err3: "Если проблема повторяется — напишите нам в «Контактах».",

      // fares
      fares_h1: "Тарифы и услуги",
      fares_lead:
        "Здесь — простое объяснение: чем отличаются тарифы, что с багажом и какими бывают условия обмена/возврата.",
      fares_block1_h2: "Как выбрать тариф",
      fares_block1_1:
        "Эконом — обычно дешевле, но условия обмена/возврата строже.",
      fares_block1_2: "Стандарт — баланс цены и гибкости.",
      fares_block1_3:
        "Гибкий — дороже, но проще менять даты и сдавать билеты.",
      fares_block2_h2: "Багаж и ручная кладь",
      fares_block2_1:
        "Ручная кладь: правила зависят от авиакомпании и тарифа.",
      fares_block2_2:
        "Багаж: может входить в тариф или покупаться отдельно.",
      fares_block2_3:
        "Совет: проверяйте вес/габариты заранее, чтобы не переплачивать в аэропорту.",
      fares_block3_h2: "Обмен и возврат",
      fares_block3_1: "Обмен: иногда платится разница в цене + сбор.",
      fares_block3_2:
        "Возврат: может быть запрещён или доступен с удержаниями.",
      fares_block3_3:
        "Важно: условия зависят от тарифа и перевозчика — уточняем при интеграции продаж.",

      // faq
      faq_title: "FAQ — вопросы и ответы",
      faq_sub:
        "Здесь собрали самые частые вопросы перед покупкой авиабилетов. Если не нашли ответ — напишите нам в «Контактах».",
      faq_q1: "Когда появится онлайн-покупка на сайте?",
      faq_q2: "Можно ли купить билет сейчас через Aviabrand?",
      faq_q3: "Что означают тарифы (эконом/гибкий/без багажа)?",
      faq_q4: "Почему цена может меняться?",
      faq_q5: "Как выбрать даты: что если рейс ночью?",
      faq_q6: "Нужно ли распечатывать билет?",
      faq_q7: "Какие документы нужны для международного перелёта?",
      faq_q8: "Как связаться с вами?",

      // contacts
      contacts_h1: "Контакты",
      contacts_lead:
        "Пока вы собираете данные — оставим шаблон. Потом подставим email/телефон и ссылки.",
      contacts_email: "Email",
      contacts_email_hint: "Укажем позже (например: support@aviabrand.uz)",
      contacts_phone: "Телефон",
      contacts_phone_hint: "Укажем позже (например: +998 ...)",
      contacts_hours: "Время работы",
      contacts_hours_hint: "Укажем позже (например: 09:00–21:00)",

      // seo-route
      seo_bc_home: "Главная",
      seo_bc_routes: "Направления",
      seo_h1_prefix: "Авиабилеты",
      seo_lead:
        "Коротко по направлению: советы, документы и ответы на вопросы перед покупкой.",
      seo_kpi1b: "Сравнивайте",
      seo_kpi1s: "прямые и с пересадкой",
      seo_kpi2b: "Проверяйте",
      seo_kpi2s: "багаж и правила тарифа",
      seo_kpi3b: "Готовьте",
      seo_kpi3s: "документы и контакты",
      seo_s1_title: "Что важно по направлению",
      seo_s1_1: "Сверьте аэропорты в городах (иногда их несколько).",
      seo_s1_2:
        "Для международных рейсов заранее проверьте требования по визе/документам.",
      seo_s1_3: "Если есть пересадки — закладывайте комфортное время стыковки.",
      seo_s2_title: "Когда лучше покупать",
      seo_s2_1: "Цена зависит от спроса и наличия мест — она может меняться.",
      seo_s2_2: "Сравните разные даты (+/- 1–3 дня), если есть гибкость.",
      seo_s2_3:
        "Проверяйте финальную стоимость перед оплатой (багаж/услуги).",
      seo_s3_title: "Частые вопросы по покупке",
      seo_faq_q1: "Почему цена может отличаться?",
      seo_faq_a1:
        "Иногда цена меняется из‑за спроса, наличия мест и правил тарифа. Перед оплатой перепроверьте детали и итоговую сумму.",
      seo_faq_q2: "Какие данные нужны для покупки?",
      seo_faq_a2:
        "Обычно нужны паспортные данные пассажиров и контактный email/телефон. Для оплаты — карта или другой доступный способ.",
      seo_faq_q3: "Можно ли вернуть или обменять билет?",
      seo_faq_a3:
        "Зависит от тарифа и авиакомпании. Часть билетов невозвратные, у других — возможны удержания и сборы.",
      seo_s4_title: "Полезные ссылки",
      seo_link1: "Как купить — пошаговая инструкция",
      seo_link2: "Тарифы и услуги — багаж, обмен/возврат",
      seo_link3: "FAQ — ответы на популярные вопросы",
      seo_btn_search: "Перейти к поиску",

      // templates for dynamic meta (seo-route)
      seo_title_tpl: "Авиабилеты {from} — {to} | Aviabrand",
      seo_desc_tpl:
        "Авиабилеты {from} — {to}: советы по выбору рейса, тарифов и подготовке к покупке. Перейдите к поиску.",
      seo_h1_tpl: "{from} — {to}",

      // specific route page (Tashkent–Moscow)
      seo_tm_title: "Авиабилеты Ташкент — Москва",
      seo_tm_desc:
        "Авиабилеты Ташкент — Москва: советы по выбору рейса, тарифов и подготовке к покупке. Перейдите к поиску.",
      seo_tm_h1: "Авиабилеты Ташкент — Москва",
      seo_tm_lead:
        "Пока сайт в информационном режиме: ниже — краткие советы и ответы, чтобы подготовиться к покупке.",
      seo_tm_h2_1: "Билетни қандай танлаш",
      seo_tm_p1:
        "Сравните прямые и стыковочные варианты, обратите внимание на время в пути и удобство пересадок.",
      seo_tm_h2_2: "Тарифы и багаж",
      seo_tm_p2:
        "Перед оплатой проверьте, включён ли багаж, и какие условия обмена/возврата у тарифа.",
      seo_tm_h2_3: "Полезные советы",
      seo_tm_li1: "Если есть гибкость — сравните соседние даты (+/- 1–3 дня).",
      seo_tm_li2:
        "Имя/фамилия должны быть как в паспорте: исправления могут быть платными.",
      seo_tm_li3: "После покупки сохраните номер брони и PDF-билет.",
    },

    uz: {
      // nav
      nav_home: "Bosh sahifa",
      nav_routes: "Yo‘nalishlar",
      nav_how: "Qanday sotib olish",
      nav_fares: "Tariflar va xizmatlar",
      nav_faq: "FAQ",
      nav_contacts: "Kontaktlar",

      // common
      btn_back_home: "Bosh sahifaga qaytish",
      btn_go_search: "Qidiruvga o‘tish",
      footer_note: "Ma'lumot sayti. Integratsiyadan so‘ng onlayn sotuv qo‘shiladi.",

      // index hero
      hero_title: "Onlayn aviabiletlar — qulay, oson, foydali",
      hero_sub:
        "Aviabrand ma'lumot sayti. Tez orada onlayn sotuvni ishga tushiramiz. Hozircha — reys tanlash va xaridga tayyorgarlik bo‘yicha yordam beramiz.",
      kpi1b: "MDH bo‘yicha",
      kpi1s: "yo‘nalishlar va maslahatlar",
      kpi2b: "RU / UZ",
      kpi2s: "ikki tili sayt",
      kpi3b: "Tez",
      kpi3s: "yengil sahifalar",

      // index form
      search_title: "Reys qidirish (test rejimi)",
      oneway_label: "Qaytish bileti kerak emas",
      ph_from: "Qayerdan",
      ph_to: "Qayerga",
      ph_date: "Sanani tanlang",
      submit_btn: "Tekshirish va o‘tish",

      // aliases (old keys in html)
      date_from: "Sanani tanlang",
      date_to: "Sanani tanlang",
      btn_check: "Tekshirish va o‘tish",

      // index sections
      sec1_title: "Nega Aviabrand",
      sec1_1: "Xarid oldidan tushunarli ko‘rsatmalar va savollarga javoblar.",
      sec1_2: "Qulay navigatsiya va telefon uchun moslashuv.",
      sec1_3: "Sotuv dvigateli bilan integratsiyaga tayyorgarlik.",
      sec2_title: "Keyingi qadamlar",
      sec2_1: "Kontaktlar va yuridik ma’lumotlarni qo‘shamiz.",
      sec2_2: "Sotuv dvigelini (muhandislar bilan) ulaymiz.",
      sec2_3: "Yo‘nalishlar bo‘yicha SEO-sahifalar va FAQ qo‘shamiz.",

      // coming-soon
      coming_title: "Tez orada onlayn sotuvni boshlaymiz",
      coming_sub:
        "Arizangiz qabul qilindi. Quyida — siz kiritgan qidiruv parametrlari.",
      coming_btn: "Bosh sahifaga qaytish",
      field_from: "Qayerdan",
      field_to: "Qayerga",
      field_dates: "Sanalar",
      field_pax: "Yo‘lovchilar",

      // routes page
      routes_page_title: "Yo‘nalishlar — Aviabrand",
      routes_meta_desc:
        "Ommabop yo‘nalishlar va namunaviy marshrut sahifalari. Yo‘nalishni tanlang va qidiruvga o‘ting.",
      routes_h1: "Ommabop yo‘nalishlar",
      routes_lead: "Marshrutni tanlang va chipta xaridiga tayyorlaning.",
      routes_top_h2: "Ommabop marshrutlar",
      routes_other_h2: "Boshqa yo‘nalishlar",
      route_tm: "Toshkent — Moskva",
      route_ti: "Toshkent — Istanbul",
      route_td: "Toshkent — Dubay",
      route_tb: "Toshkent — Berlin",

      // how-to-buy
      how_title: "Aviabiletni onlayn qanday sotib olish",
      how_sub:
        "Bosqichma-bosqich: yo‘nalish tanlashdan boarding passgacha. Hozircha ma’lumot rejimi — ammo ko‘rsatmalar tayyor.",
      how_kpi1b: "5–10 daqiqa",
      how_kpi1s: "rasmiylashtirish",
      how_kpi2b: "Kerak",
      how_kpi2s: "pasport va karta",
      how_kpi3b: "To‘lovdan so‘ng",
      how_kpi3s: "bilet emailga",
      how_tip_title: "Tezkor maslahatlar",
      how_tip1:
        "Shaharlarni lotincha yoki kirillcha yozing — eng muhimi raqam va ortiqcha belgilar bo‘lmasin.",
      how_tip2:
        "Agar “borib-qaytsangiz” — qaytish sanasi uchishdan oldin bo‘lmasin.",
      how_tip3:
        "Ism/familiyani pasportdagidek tekshiring: bitta xato qayta rasmiylashtirishga olib kelishi mumkin.",
      how_s1_title: "1-qadam. Ma’lumotlarni tayyorlang",
      how_s1_1: "Pasport: raqam, amal qilish muddati, ism/familiya yozilishi.",
      how_s1_2:
        "Kontaktlar: email va telefon — bilet va bildirishnomalar shu yerga keladi.",
      how_s1_3:
        "To‘lov: bank kartasi yoki boshqa mavjud usul (provayderga bog‘liq).",
      how_s2_title: "2-qadam. Yo‘nalish va sanalarni tanlang",
      how_s2_1:
        "“Qayerdan” va “Qayerga” ni kiriting. Turli shaharlar uchun turli nomlardan foydalaning.",
      how_s2_2:
        "Uchish sanasini tanlang. Qaytish kerak bo‘lsa — qaytish sanasini tanlang (uchishdan oldin bo‘lmasin).",
      how_s2_3: "Yo‘lovchilar soni: odatda 1–9 (bitta bron uchun).",
      how_s3_title: "3-qadam. Variantlarni solishtiring",
      how_s3_1:
        "Vaqt: to‘g‘ridan-to‘g‘ri reys tezroq, transfer bilan — ba’zan arzonroq.",
      how_s3_2:
        "Bagaj: bagaj va qo‘l yuki kiritilgan-kiritilmaganini tekshiring.",
      how_s3_3:
        "Tarif: qaytarish/almashtirish shartlari tarifga bog‘liq — “Tariflar va xizmatlar” bo‘limini ko‘ring.",
      how_s4_title: "4-qadam. Yo‘lovchi ma’lumotlarini kiriting",
      how_s4_1:
        "Ism va familiya — pasportdagidek (pasportda lotincha bo‘lsa, lotincha).",
      how_s4_2: "Tug‘ilgan sana va hujjat — diqqat bilan, xatosiz.",
      how_s4_3:
        "Xaridor kontaktlari — bilet va reysdagi o‘zgarishlarni olish uchun.",
      how_s5_title: "5-qadam. To‘lov qiling",
      how_s5_1: "To‘lovdan oldin summa va valyutani tekshiring.",
      how_s5_2: "Chek/tasdiqni saqlang.",
      how_s5_3: "To‘lov tugamaguncha sahifani yopmang.",
      how_s6_title: "6-qadam. Biletni oling",
      how_s6_1: "Bilet odatda bir necha daqiqada emailga keladi.",
      how_s6_2: "Agar kelmasa — “Spam” papkasini tekshiring.",
      how_s6_3: "PDF va bron raqamini saqlang.",
      how_s7_title: "Muammo bo‘lsa",
      how_err1: "Internetni tekshirib, yana urinib ko‘ring.",
      how_err2: "Ma’lumotlar xatosiz kiritilganiga ishonch hosil qiling.",
      how_err3: "Takrorlansa — “Kontaktlar” orqali yozing.",

      // fares
      fares_h1: "Tariflar va xizmatlar",
      fares_lead:
        "Bu yerda sodda tushuntirish: tariflar farqi, bagaj va almashtirish/qaytarish shartlari.",
      fares_block1_h2: "Tarifni qanday tanlash",
      fares_block1_1:
        "Ekonom — odatda arzonroq, lekin qaytarish/almashtirish shartlari qattiqroq.",
      fares_block1_2: "Standart — narx va moslashuv balansi.",
      fares_block1_3:
        "Moslashuvchan — qimmatroq, ammo sanalarni o‘zgartirish va qaytarish osonroq.",
      fares_block2_h2: "Bagaj va qo‘l yuki",
      fares_block2_1:
        "Qo‘l yuki: qoidalar aviakompaniya va tarifga bog‘liq.",
      fares_block2_2:
        "Bagaj: tarifga kirishi yoki alohida sotib olinishi mumkin.",
      fares_block2_3:
        "Maslahat: og‘irlik/o‘lchamni oldindan tekshiring — aeroportda ortiqcha to‘lamaslik uchun.",
      fares_block3_h2: "Almashtirish va qaytarish",
      fares_block3_1:
        "Almashtirish: ba’zan narx farqi + yig‘im to‘lanadi.",
      fares_block3_2:
        "Qaytarish: taqiqlangan bo‘lishi yoki ushlab qolishlar bilan mumkin bo‘lishi mumkin.",
      fares_block3_3:
        "Muhim: shartlar tarif va tashuvchiga bog‘liq — sotuv integratsiyasida aniqlaymiz.",

      // faq
      faq_title: "FAQ — ko‘p so‘raladigan savollar",
      faq_sub:
        "Aviabilet xarididan oldingi eng ko‘p savollar. Javob topilmasa — “Kontaktlar”ga yozing.",
      faq_q1: "Saytda onlayn xarid qachon paydo bo‘ladi?",
      faq_q2: "Hozir Aviabrand orqali bilet sotib olsa bo‘ladimi?",
      faq_q3: "Tariflar nimani anglatadi (ekonom/moslashuvchan/bagajsiz)?",
      faq_q4: "Nega narx o‘zgarishi mumkin?",
      faq_q5: "Sanalarni qanday tanlash: reys tunda bo‘lsa-chi?",
      faq_q6: "Biletni chop etish kerakmi?",
      faq_q7: "Xalqaro parvoz uchun qanday hujjatlar kerak?",
      faq_q8: "Siz bilan qanday bog‘lanish mumkin?",

      // contacts
      contacts_h1: "Kontaktlar",
      contacts_lead:
        "Hozircha shablon. Keyin email/telefon va havolalarni qo‘shamiz.",
      contacts_email: "Email",
      contacts_email_hint: "Keyinroq ko‘rsatamiz (masalan: support@aviabrand.uz)",
      contacts_phone: "Telefon",
      contacts_phone_hint: "Keyinroq ko‘rsatamiz (masalan: +998 ...)",
      contacts_hours: "Ish vaqti",
      contacts_hours_hint: "Keyinroq ko‘rsatamiz (masalan: 09:00–21:00)",

      // seo-route
      seo_bc_home: "Bosh sahifa",
      seo_bc_routes: "Yo‘nalishlar",
      seo_h1_prefix: "Aviabiletlar",
      seo_lead:
        "Yo‘nalish bo‘yicha qisqa ma’lumot: maslahatlar, hujjatlar va xariddan oldin savollarga javoblar.",
      seo_kpi1b: "Solishtiring",
      seo_kpi1s: "to‘g‘ridan-to‘g‘ri va transferli",
      seo_kpi2b: "Tekshiring",
      seo_kpi2s: "bagaj va tarif qoidalari",
      seo_kpi3b: "Tayyorlang",
      seo_kpi3s: "hujjatlar va kontaktlar",
      seo_s1_title: "Yo‘nalish bo‘yicha muhim jihatlar",
      seo_s1_1:
        "Uchish/qo‘nish aeroportlari va yo‘l vaqtini tekshiring (to‘g‘ridan-to‘g‘ri/transferli).",
      seo_s1_2:
        "Transfer bo‘lsa — ulanish vaqti va tranzit/visa talablarini ko‘ring.",
      seo_s1_3:
        "Mavsumiylikni hisobga oling: bayramlarda va mavsumda narxlar yuqoriroq bo‘lishi mumkin.",
      seo_s2_title: "Qanday arzonroq qidirish",
      seo_s2_1:
        "To‘g‘ridan-to‘g‘ri va transferli variantlarni solishtiring — ba’zan farq katta bo‘ladi.",
      seo_s2_2: "Agar moslashuv bo‘lsa — qo‘shni sanalarni (+/- 1–3 kun) solishtiring.",
      seo_s2_3: "To‘lovdan oldin yakuniy narxni tekshiring (bagaj/xizmatlar).",
      seo_s3_title: "Xarid bo‘yicha tez-tez savollar",
      seo_faq_q1: "Nega narx farq qilishi mumkin?",
      seo_faq_a1:
        "Narx talab, joylar soni va tarif qoidalariga bog‘liq. To‘lovdan oldin tafsilotlar va yakuniy summani tekshiring.",
      seo_faq_q2: "Sotib olish uchun nimalar kerak?",
      seo_faq_a2:
        "Odatda yo‘lovchilar pasport ma’lumotlari va kontakt email/telefon kerak bo‘ladi. To‘lov uchun — karta yoki boshqa mavjud usul.",
      seo_faq_q3: "Biletni qaytarish yoki almashtirish mumkinmi?",
      seo_faq_a3:
        "Tarif va aviakompaniyaga bog‘liq. Ba’zi biletlarda qaytarish yo‘q, boshqalarida — ushlab qolishlar va yig‘imlar bo‘lishi mumkin.",
      seo_s4_title: "Foydali havolalar",
      seo_link1: "Qanday sotib olish — bosqichma-bosqich",
      seo_link2: "Tariflar va xizmatlar — bagaj, qaytarish/almashtirish",
      seo_link3: "FAQ — ko‘p so‘raladigan savollar",
      seo_btn_search: "Qidiruvga o‘tish",

      seo_title_tpl: "Aviabiletlar {from} — {to} | Aviabrand",
      seo_desc_tpl:
        "Aviabiletlar {from} — {to}: reys tanlash, tariflar va xaridga tayyorgarlik bo‘yicha maslahatlar. Qidiruvga o‘ting.",
      seo_h1_tpl: "{from} — {to}",

      // specific route page (Toshkent–Moskva)
      seo_tm_title: "Aviabiletlar Toshkent — Moskva",
      seo_tm_desc:
        "Aviabiletlar Toshkent — Moskva: reys tanlash, tariflar va xaridga tayyorgarlik bo‘yicha maslahatlar. Qidiruvga o‘ting.",
      seo_tm_h1: "Aviabiletlar Toshkent — Moskva",
      seo_tm_lead:
        "Hozircha sayt ma’lumot rejimida: quyida xaridga tayyorlanish uchun qisqa maslahatlar.",
      seo_tm_h2_1: "Biletni qanday tanlash",
      seo_tm_p1:
        "To‘g‘ridan-to‘g‘ri va transferli variantlarni solishtiring, yo‘l va ulanish qulayligiga e’tibor bering.",
      seo_tm_h2_2: "Tariflar va bagaj",
      seo_tm_p2:
        "To‘lovdan oldin bagaj kiritilgan-kiritilmaganini va tarifning qaytarish/almashtirish shartlarini tekshiring.",
      seo_tm_h2_3: "Foydali maslahatlar",
      seo_tm_li1: "Agar moslashuv bo‘lsa — qo‘shni sanalarni (+/- 1–3 kun) solishtiring.",
      seo_tm_li2:
        "Ism/familiya pasportdagidek bo‘lsin: tuzatishlar pullik bo‘lishi mumkin.",
      seo_tm_li3: "Sotib olgandan keyin bron raqami va PDF biletni saqlang.",
    },
  };

  // =========================
  // i18n core
  // =========================
  const LANG_KEY = "lang";
  const getLang = () => {
    const saved = (localStorage.getItem(LANG_KEY) || "").toLowerCase();
    return saved === "uz" || saved === "ru" ? saved : "ru";
  };

  const setLang = (lang) => {
    localStorage.setItem(LANG_KEY, lang);
    applyLang(lang);
  };

  const tpl = (s, params) =>
    String(s || "").replace(/\{(\w+)\}/g, (_, k) =>
      params && params[k] != null ? params[k] : `{${k}}`
    );

  function applyLang(lang) {
    const pack = dict[lang] || dict.ru;

    // update <html lang="..">
    document.documentElement.setAttribute("lang", lang);

    // [data-i18n] text
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = pack[key] ?? dict.ru[key] ?? key;

      // allow translating <title data-i18n="...">
      if (el.tagName === "TITLE") {
        document.title = val;
        return;
      }

      el.textContent = val;
    });

    // [data-i18n-ph] placeholder
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const key = el.getAttribute("data-i18n-ph");
      const val = pack[key] ?? dict.ru[key] ?? "";
      if ("placeholder" in el) el.placeholder = val;
    });

    // [data-i18n-content] attributes (meta description etc)
    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const key = el.getAttribute("data-i18n-content");
      const val = pack[key] ?? dict.ru[key] ?? "";
      el.setAttribute("content", val);
    });

    // language buttons UI
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      const l = (btn.getAttribute("data-set-lang") || "").toLowerCase();
      btn.classList.toggle("active", l === lang);
    });

    // update flatpickr placeholders (index)
    const ph = pack.ph_date ?? dict.ru.ph_date ?? "";
    if (window.__ab_fp1) applyDatePlaceholder(window.__ab_fp1, ph);
    if (window.__ab_fp2) applyDatePlaceholder(window.__ab_fp2, ph);

    // dynamic SEO (seo-route.html)
    applySeoRouteMeta(lang);
  }

  // init language buttons
  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = (btn.getAttribute("data-set-lang") || "ru").toLowerCase();
      setLang(lang);
    });
  });

  // =========================
  // INDEX: form + dates + validation
  // =========================
  const form = document.getElementById("searchForm");
  const oneWay = document.getElementById("oneway");
  const returnWrap = document.getElementById("returnWrap");
  const date1 = document.getElementById("date1");
  const date2 = document.getElementById("date2");

  const startOfDay = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  // allow "yesterday"
  const yesterday = () => {
    const x = startOfDay(new Date());
    x.setDate(x.getDate() - 1);
    return x;
  };

  const BASE_MIN_DATE = yesterday();

  const setFpDisabled = (inst, disabled) => {
    if (!inst) return;
    if (inst._input) inst._input.disabled = disabled; // hidden input
    if (inst.altInput) inst.altInput.disabled = disabled; // visible input
  };

  function applyDatePlaceholder(inst, text) {
    if (!inst) return;
    const t = text || (dict[getLang()]?.ph_date ?? dict.ru.ph_date ?? "");
    if (inst.altInput) inst.altInput.placeholder = t;
    if (inst._input) inst._input.placeholder = t;
  }

  const getSelectedDate = (fp) => {
    const d = fp?.selectedDates?.[0];
    return d ? startOfDay(d) : null;
  };

  const syncMinReturnToDepart = () => {
    if (!window.__ab_fp1 || !window.__ab_fp2) return;

    const d1 = getSelectedDate(window.__ab_fp1);

    if (!d1) {
      window.__ab_fp2.set("minDate", BASE_MIN_DATE);
      return;
    }

    // date2 can't be earlier than date1
    window.__ab_fp2.set("minDate", d1);

    const d2 = getSelectedDate(window.__ab_fp2);
    if (d2 && d2 < d1) {
      window.__ab_fp2.setDate(d1, true);
      applyDatePlaceholder(window.__ab_fp2);
    }
  };

  // flatpickr only on index
  if (window.flatpickr && date1) {
    window.__ab_fp1 = window.flatpickr(date1, {
      dateFormat: "Y-m-d",
      altInput: true,
      altFormat: "d.m.Y",
      altInputClass: "input",
      allowInput: true,
      disableMobile: true,
      minDate: BASE_MIN_DATE,

      onReady: (_sd, _ds, inst) => applyDatePlaceholder(inst),
      onValueUpdate: (_sd, _ds, inst) => applyDatePlaceholder(inst),
      onOpen: (_sd, _ds, inst) => applyDatePlaceholder(inst),
      onChange: () => syncMinReturnToDepart(),
    });
  }

  if (window.flatpickr && date2) {
    window.__ab_fp2 = window.flatpickr(date2, {
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
        const d1 = window.__ab_fp1?.selectedDates?.[0];
        if (d1) inst.jumpToDate(d1, true);
      },
      onChange: (_sd, _ds, inst) => applyDatePlaceholder(inst),
    });
  }

  // initial placeholder
  applyDatePlaceholder(window.__ab_fp1);
  applyDatePlaceholder(window.__ab_fp2);

  function syncReturn() {
    if (!oneWay || !returnWrap || !date2) return;

    const isOneWay = oneWay.checked;
    returnWrap.style.display = isOneWay ? "none" : "";

    if (isOneWay) {
      date2.value = "";
      if (window.__ab_fp2) window.__ab_fp2.clear();
      if (window.__ab_fp2) window.__ab_fp2.set("minDate", BASE_MIN_DATE);
      applyDatePlaceholder(window.__ab_fp2);
      setFpDisabled(window.__ab_fp2, true);
    } else {
      setFpDisabled(window.__ab_fp2, false);
      syncMinReturnToDepart();
    }
  }

  if (oneWay) {
    oneWay.addEventListener("change", syncReturn);
    syncReturn();
  }

  // clear form on back/forward navigation
  window.addEventListener("pageshow", () => {
    if (form) form.reset();
    if (date1) date1.value = "";
    if (date2) date2.value = "";
    if (window.__ab_fp1) window.__ab_fp1.clear();
    if (window.__ab_fp2) window.__ab_fp2.clear();
    if (window.__ab_fp1) window.__ab_fp1.set("minDate", BASE_MIN_DATE);
    if (window.__ab_fp2) window.__ab_fp2.set("minDate", BASE_MIN_DATE);
    applyDatePlaceholder(window.__ab_fp1);
    applyDatePlaceholder(window.__ab_fp2);
    syncReturn();
  });

  // from/to validation (index)
  const fromEl = document.getElementById("from");
  const toEl = document.getElementById("to");

  const norm = (s) => (s || "").trim().replace(/\s+/g, " ");
  const allowedChars = /^[A-Za-zА-Яа-яЁё\s.'-]+$/;

  const clearCustom = (el) => {
    if (!el) return;
    el.setCustomValidity("");
  };

  const validateFromTo = () => {
    if (!fromEl || !toEl) return true;

    const fromV = norm(fromEl.value);
    const toV = norm(toEl.value);

    clearCustom(fromEl);
    clearCustom(toEl);

    if (fromV.length < 2) {
      fromEl.setCustomValidity("Введите пункт вылета (минимум 2 символа)");
      return false;
    }
    if (toV.length < 2) {
      toEl.setCustomValidity("Введите пункт прилёта (минимум 2 символа)");
      return false;
    }

    if (!allowedChars.test(fromV)) {
      fromEl.setCustomValidity("Только буквы и пробелы (без цифр/символов)");
      return false;
    }
    if (!allowedChars.test(toV)) {
      toEl.setCustomValidity("Только буквы и пробелы (без цифр/символов)");
      return false;
    }

    if (fromV.toLowerCase() === toV.toLowerCase()) {
      toEl.setCustomValidity("Пункт прилёта должен отличаться от пункта вылета");
      return false;
    }

    return true;
  };

  if (fromEl) fromEl.addEventListener("input", validateFromTo);
  if (toEl) toEl.addEventListener("input", validateFromTo);

  // submit -> coming-soon.html with query params
  if (form) {
    form.addEventListener("submit", (e) => {
      if (!validateFromTo()) {
        e.preventDefault();
        form.reportValidity();
        return;
      }

      const fd = new FormData(form);
      const params = new URLSearchParams();

      ["from", "to", "date1", "date2", "pax", "oneway"].forEach((k) => {
        const v = (fd.get(k) || "").toString().trim();
        if (v) params.set(k, v);
      });

      window.location.href = `coming-soon.html?${params.toString()}`;
      e.preventDefault();
    });
  }

  // =========================
  // COMING-SOON: summary from query
  // =========================
  const qs = new URLSearchParams(window.location.search);
  if (document.getElementById("sumFrom")) {
    const from = qs.get("from") || "-";
    const to = qs.get("to") || "-";
    const d1 = qs.get("date1") || "";
    const d2 = qs.get("date2") || "";
    const pax = qs.get("pax") || "1";

    const elFrom = document.getElementById("sumFrom");
    const elTo = document.getElementById("sumTo");
    const elPax = document.getElementById("sumPax");
    const elDates = document.getElementById("sumDates");

    const fmt = (s) => (s ? s : "-");

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

  // =========================
  // SEO ROUTE (seo-route.html): dynamic route + meta + button link
  // =========================
  function applySeoRouteMeta(lang) {
    const root = document.getElementById("seoRouteRoot");
    if (!root) return;

    const pack = dict[lang] || dict.ru;

    const params = new URLSearchParams(window.location.search);
    const from = (params.get("from") || "").trim();
    const to = (params.get("to") || "").trim();

    const safeFrom = from || "-";
    const safeTo = to || "-";

    // h1 route part
    const routeTitle = document.getElementById("seoRouteTitle");
    if (routeTitle) routeTitle.textContent = tpl(pack.seo_h1_tpl ?? dict.ru.seo_h1_tpl, { from: safeFrom, to: safeTo });

    // meta title/description
    const titleTpl = pack.seo_title_tpl ?? dict.ru.seo_title_tpl;
    const descTpl = pack.seo_desc_tpl ?? dict.ru.seo_desc_tpl;

    const t = tpl(titleTpl, { from: safeFrom, to: safeTo });
    const d = tpl(descTpl, { from: safeFrom, to: safeTo });

    document.title = t;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", d);

    // canonical
    const canonical = document.getElementById("seoCanonical");
    if (canonical) {
      const url = new URL(window.location.href);
      url.searchParams.set("from", safeFrom);
      url.searchParams.set("to", safeTo);
      canonical.setAttribute("href", url.toString());
    }

    // json-ld
    const ld = document.getElementById("seoJsonLd");
    if (ld) {
      const url = new URL(window.location.href);
      url.searchParams.set("from", safeFrom);
      url.searchParams.set("to", safeTo);

      const obj = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: t,
        description: d,
        url: url.toString(),
      };
      ld.textContent = JSON.stringify(obj);
    }

    // button "go search" -> index with from/to
    const go = document.getElementById("seoGoSearch");
    if (go) {
      const u = new URL(go.getAttribute("href") || "index.html", window.location.href);
      u.pathname = u.pathname.replace(/\/[^/]*$/, "/index.html");
      u.searchParams.set("from", safeFrom);
      u.searchParams.set("to", safeTo);
      go.setAttribute("href", u.toString());
    }
  }

  // =========================
  // init language immediately
  // =========================
  applyLang(getLang());
});
