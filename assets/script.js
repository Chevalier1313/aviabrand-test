// assets/script.js
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 0) i18n (RU / UZ) — для всех страниц
  // =========================
  const dict = {
    ru: {
      // nav
      nav_home: "Главная",
      nav_how: "Как купить",
      nav_fares: "Тарифы и услуги",
      nav_faq: "FAQ",
      nav_contacts: "Контакты",

      // index hero / blocks
      hero_title: "Авиабилеты онлайн — удобно, просто, выгодно",
      hero_sub:
        "Информационный сайт Aviabrand. Скоро запустим онлайн-продажу. Пока — подскажем, как выбрать рейс и подготовиться к покупке.",
      kpi1b: "Под СНГ",
      kpi1s: "маршруты и советы",
      kpi2b: "RU / UZ",
      kpi2s: "двуязычный сайт",
      kpi3b: "Быстро",
      kpi3s: "лёгкие страницы",
      search_title: "Поиск рейса (пока в тестовом режиме)",
      sec1: "Почему Aviabrand",
      why1: "Понятные инструкции и ответы на вопросы перед покупкой.",
      why2: "Удобная навигация и адаптивность под телефон.",
      why3: "Подготовка к интеграции с движком продаж.",
      sec2: "Что дальше",
      next1: "Вы добавите контакты и юридическую информацию.",
      next2: "Мы подключим движок продаж (с инженерами).",
      next3: "Добавим SEO-страницы по направлениям и FAQ.",
      footer_note:
        "Информационный сайт. Онлайн-продажа будет добавлена после интеграции.",

      // coming-soon
      coming_title: "Скоро начнём онлайн-продажу",
      coming_sub:
        "Мы уже получили вашу заявку. Ниже — параметры поиска, которые вы ввели.",
      field_from: "Откуда",
      field_to: "Куда",
      field_pax: "Пассажиры",
      field_dates: "Даты",
      coming_btn: "Вернуться на главную",
      coming_note:
        "Если хотите — добавим форму заявки (email/телефон) на этой странице.",

      // placeholders / labels / buttons (index)
      ph_from: "Откуда",
      ph_to: "Куда",
      ph_date: "Выберите дату",
      oneway_label: "Обратный билет не нужен",
      submit_btn: "Проверить и перейти",

      // validation
      v_from_min: "Введите пункт вылета (минимум 2 символа)",
      v_to_min: "Введите пункт прилёта (минимум 2 символа)",
      v_from_chars: "Только буквы и пробелы (без цифр/символов)",
      v_to_chars: "Только буквы и пробелы (без цифр/символов)",
      v_same: "Пункт прилёта должен отличаться от пункта вылета",
      v_date2: "Выберите дату обратного рейса",

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
      how_s1_2: "Контакты: email и телефон — туда приходит билет и уведомления.",
      how_s1_3:
        "Оплата: банковская карта или другой доступный способ (зависит от провайдера).",

      how_s2_title: "Шаг 2. Выберите маршрут и даты",
      how_s2_1:
        "Укажите «Откуда» и «Куда». Для разных городов используйте разные названия (не одинаковые).",
      how_s2_2:
        "Выберите дату вылета. Если нужен возврат — выберите дату обратно (не раньше вылета).",
      how_s2_3: "Укажите пассажиров: обычно 1–9 на одну бронь.",

      how_s3_title: "Шаг 3. Сравните варианты",
      how_s3_1: "Время: прямой рейс быстрее, с пересадкой — иногда дешевле.",
      how_s3_2: "Багаж: проверьте включён ли багаж и ручная кладь.",
      how_s3_3:
        "Тариф: условия возврата/обмена зависят от тарифа — смотрите «Тарифы и услуги».",

      how_s4_title: "Шаг 4. Заполните данные пассажиров",
      how_s4_1:
        "Имя и фамилия — строго как в паспорте (латиницей, если в паспорте латиница).",
      how_s4_2: "Дата рождения и документ — внимательно, без опечаток.",
      how_s4_3:
        "После оплаты билет приходит на email — сохраните PDF и номер брони.",

      how_s5_title: "Шаг 5. Подтвердите детали",
      how_s5_1: "Проверьте даты, города и количество пассажиров перед оплатой.",
      how_s5_2: "Уточните правила багажа и возврата по выбранному тарифу.",
      how_s5_3: "Если есть пересадки — убедитесь, что время стыковки комфортное.",

      how_s6_title: "Шаг 6. После покупки",
      how_s6_1:
        "Проверьте письмо с билетом и данными брони (иногда попадает в «Спам»).",
      how_s6_2: "Сохраните билет на телефон и распечатайте при необходимости.",
      how_s6_3: "На регистрации используйте данные строго как в паспорте.",

      how_s7_title: "Если возникла ошибка",
      how_err1:
        "Попробуйте обновить страницу и повторить ввод без лишних символов.",
      how_err2: "Проверьте корректность дат: возврат не раньше вылета.",
      how_err3: "Если проблема повторяется — напишите в раздел «Контакты».",

      // FAQ
      faq_title: "Частые вопросы (FAQ)",
      faq_sub: "Короткие ответы на популярные вопросы перед покупкой билета.",
      faq_q1: "Когда появится онлайн-продажа?",
      faq_a1:
        "Мы запускаем онлайн-продажу после завершения интеграции с системой бронирования. Следите за обновлениями на сайте.",
      faq_q2: "Можно ли купить билет прямо сейчас на сайте?",
      faq_a2:
        "Пока нет — сайт работает в информационном режиме. Вы можете подготовиться к покупке по нашим инструкциям.",
      faq_q3: "Как правильно вводить города «Откуда/Куда»?",
      faq_a3:
        "Введите название города латиницей или кириллицей, без цифр и лишних символов. «Откуда» и «Куда» должны отличаться.",
      faq_q4: "Почему дата возврата не выбирается раньше даты вылета?",
      faq_a4:
        "Так корректно для рейса «туда-обратно»: возврат не может быть раньше вылета.",
      faq_q5: "Что означает «тариф» и где смотреть правила?",
      faq_a5:
        "Тариф определяет багаж и условия обмена/возврата. Смотрите раздел «Тарифы и услуги».",
      faq_q6: "Какие документы нужны для покупки?",
      faq_a6:
        "Обычно нужны паспортные данные пассажиров и способ оплаты (карта). Для международных рейсов проверяйте требования по визе/документам.",
      faq_q7: "Куда придёт билет после оплаты?",
      faq_a7:
        "Билет обычно приходит на email, указанный при покупке. Сохраните PDF и номер брони.",
      faq_q8: "Что делать, если письмо с билетом не пришло?",
      faq_a8:
        "Проверьте «Спам»/«Промоакции», правильность email и подождите несколько минут. Если не пришло — обратитесь в поддержку.",

      // Fares
      fares_h1: "Тарифы и услуги",
      fares_lead:
        "Коротко объясняем, что обычно включает тариф и на что обратить внимание перед покупкой.",
      fares_block1_h2: "1) Багаж",
      fares_block1_1: "Проверьте, включён ли багаж и ручная кладь.",
      fares_block1_2:
        "У разных авиакомпаний нормы могут отличаться по весу и габаритам.",
      fares_block1_3: "Если багаж не включён — его часто можно докупить отдельно.",
      fares_block2_h2: "2) Обмен и возврат",
      fares_block2_1: "Условия зависят от тарифа: от невозвратных до гибких.",
      fares_block2_2:
        "Обмен/возврат может быть с доплатой и штрафом — уточняйте до оплаты.",
      fares_block2_3: "Сохраняйте правила тарифа и номер брони.",
      fares_block3_h2: "3) Доп. услуги",
      fares_block3_1:
        "Выбор места, питание, страховка, приоритет — часто доступны за доплату.",
      fares_block3_2: "На пересадках обращайте внимание на длительность стыковки.",
      fares_block3_3: "Всегда проверяйте финальную стоимость перед оплатой.",

      // Contacts
      contacts_h1: "Контакты",
      contacts_lead:
        "Если нужна помощь — напишите или позвоните. Мы ответим в рабочее время.",
      contacts_email: "Email",
      contacts_email_hint:
        "support@aviabrand.uz (пример — замените на ваш реальный email)",
      contacts_phone: "Телефон",
      contacts_phone_hint: "+998 XX XXX XX XX (пример — замените на ваш номер)",
      contacts_hours: "Часы работы",
      contacts_hours_hint: "Пн–Пт, 09:00–18:00 (Ташкент)",

      // shared
      btn_back_home: "Вернуться на главную",

      // SEO route template page (seo-route.html)
      seo_bc_home: "Главная",
      seo_bc_routes: "Направления",

      seo_h1_prefix: "Авиабилеты",
      seo_lead:
        "Короткая справка по направлению: советы, документы и ответы на вопросы перед покупкой.",
      seo_kpi1b: "Сравнивайте",
      seo_kpi1s: "прямые и с пересадкой",
      seo_kpi2b: "Проверяйте",
      seo_kpi2s: "багаж и правила тарифа",
      seo_kpi3b: "Готовьте",
      seo_kpi3s: "документы и контакты",

      seo_s1_title: "Что важно по направлению",
      seo_s1_1:
        "Проверьте аэропорты вылета/прилёта и время в пути (прямой/с пересадкой).",
      seo_s1_2:
        "Если есть пересадка — смотрите время стыковки и необходимость визы/транзита.",
      seo_s1_3: "Уточните сезонность: в праздники и в сезон цены могут быть выше.",

      seo_s2_title: "Как искать выгоднее",
      seo_s2_1:
        "Сравнивайте прямые и стыковочные варианты — иногда разница в цене существенная.",
      seo_s2_2: "Сравните разные даты (+/- 1–3 дня), если есть гибкость.",
      seo_s2_3: "Проверяйте финальную стоимость перед оплатой (багаж/услуги).",

      seo_s3_title: "Частые вопросы по покупке",
      seo_faq_q1: "Почему цена может отличаться?",
      seo_faq_a1:
        "Цена зависит от тарифа, наличия мест, багажных опций и правил возврата/обмена. Также цена может измениться после обновления выдачи.",
      seo_faq_q2: "Какие данные нужны для покупки?",
      seo_faq_a2:
        "Обычно нужны паспортные данные пассажиров, контактный email/телефон и способ оплаты (карта).",
      seo_faq_q3: "Можно ли вернуть или обменять билет?",
      seo_faq_a3:
        "Это зависит от тарифа. Перед оплатой обязательно проверьте условия возврата/обмена и возможные штрафы.",

      seo_s4_title: "Полезные ссылки",
      seo_link1: "Как купить — пошаговая инструкция",
      seo_link2: "Тарифы и услуги — багаж, обмен/возврат",
      seo_link3: "FAQ — ответы на популярные вопросы",
      seo_btn_search: "Перейти к поиску",

      // SEO route meta templates (with {from}/{to})
      seo_meta_title_tpl: "Aviabrand.uz — Авиабилеты {from} → {to}",
      seo_meta_desc_tpl:
        "Советы и FAQ по направлению {from} → {to}: как выбрать рейс, проверить багаж и подготовиться к покупке билета.",

      // Specific SEO page: flights-tashkent-moscow.html
      seo_tm_title: "Авиабилеты Ташкент — Москва",
      seo_tm_desc:
        "Информационная страница по направлению Ташкент — Москва: советы по выбору рейса, тарифам и подготовке к покупке.",
      seo_tm_h1: "Авиабилеты Ташкент — Москва",
      seo_tm_lead:
        "Пока сайт в информационном режиме: ниже — краткие советы и ответы, чтобы подготовиться к покупке.",
      seo_tm_h2_1: "Как выбрать билет",
      seo_tm_p1:
        "Сравните прямые и стыковочные варианты, обратите внимание на время в пути и удобство пересадок.",
      seo_tm_h2_2: "Тарифы и багаж",
      seo_tm_p2:
        "Перед оплатой проверьте, включён ли багаж и какие условия обмена/возврата у тарифа.",
      seo_tm_h2_3: "Полезные советы",
      seo_tm_li1: "Сравните цены на соседние даты (+/- 1–3 дня), если есть гибкость.",
      seo_tm_li2: "Проверяйте имя/фамилию как в паспорте: исправления могут быть платными.",
      seo_tm_li3: "Сохраняйте номер брони и PDF билета после покупки.",
      city_tashkent: "Ташкент",
      city_moscow: "Москва",
    },

    uz: {
      // nav
      nav_home: "Bosh sahifa",
      nav_how: "Qanday sotib olish",
      nav_fares: "Tariflar va xizmatlar",
      nav_faq: "FAQ",
      nav_contacts: "Kontaktlar",

      // index hero / blocks
      hero_title: "Onlayn aviabiletlar — qulay, oson, foydali",
      hero_sub:
        "Aviabrand ma’lumot sayti. Tez orada onlayn sotuvni ishga tushiramiz. Hozircha — reys tanlash va xaridga tayyorgarlik bo‘yicha yordam beramiz.",
      kpi1b: "MDH bo‘yicha",
      kpi1s: "yo‘nalishlar va maslahatlar",
      kpi2b: "RU / UZ",
      kpi2s: "ikki tilli sayt",
      kpi3b: "Tez",
      kpi3s: "yengil sahifalar",
      search_title: "Reys qidirish (test rejimi)",
      sec1: "Nega Aviabrand",
      why1: "Xariddan oldin tushunarli yo‘riqnoma va savollarga javoblar.",
      why2: "Qulay navigatsiya va telefon uchun moslashuv.",
      why3: "Sotuv tizimi bilan integratsiyaga tayyorgarlik.",
      sec2: "Keyingi qadamlar",
      next1: "Siz kontaktlar va yuridik ma’lumotlarni qo‘shasiz.",
      next2: "Biz sotuv tizimini ulaymiz (muhandislar bilan).",
      next3: "Yo‘nalishlar bo‘yicha SEO-sahifalar va FAQ qo‘shamiz.",
      footer_note:
        "Ma’lumot sayti. Integratsiyadan so‘ng onlayn sotuv qo‘shiladi.",

      // coming-soon
      coming_title: "Tez orada onlayn sotuvni boshlaymiz",
      coming_sub:
        "So‘rovingiz qabul qilindi. Quyida — siz kiritgan qidiruv parametrlari.",
      field_from: "Qayerdan",
      field_to: "Qayerga",
      field_pax: "Yo‘lovchilar",
      field_dates: "Sanalar",
      coming_btn: "Bosh sahifaga qaytish",
      coming_note:
        "Xohlasangiz — bu sahifaga ariza formasi (email/telefon) qo‘shamiz.",

      // placeholders / labels / buttons (index)
      ph_from: "Qayerdan",
      ph_to: "Qayerga",
      ph_date: "Sanani tanlang",
      oneway_label: "Qaytish bileti kerak emas",
      submit_btn: "Tekshirish va o‘tish",

      // validation
      v_from_min: "Jo‘nash joyini kiriting (kamida 2 belgi)",
      v_to_min: "Borish joyini kiriting (kamida 2 belgi)",
      v_from_chars: "Faqat harflar va bo‘sh joy (raqam/ortiqcha belgilarsiz)",
      v_to_chars: "Faqat harflar va bo‘sh joy (raqam/ortiqcha belgilarsiz)",
      v_same: "Borish joyi jo‘nash joyidan farq qilishi kerak",
      v_date2: "Qaytish sanasini tanlang",

      // how-to-buy
      how_title: "Onlayn aviabiletni qanday sotib olish",
      how_sub:
        "Bosqichma-bosqich: yo‘nalishni tanlashdan boarding passgacha. Hozircha sayt ma’lumot rejimida, lekin yo‘riqnoma tayyor.",
      how_kpi1b: "5–10 daqiqa",
      how_kpi1s: "rasmiylashtirish",
      how_kpi2b: "Kerak",
      how_kpi2s: "pasport va karta",
      how_kpi3b: "To‘lovdan so‘ng",
      how_kpi3s: "bilet emailga",

      how_tip_title: "Tezkor maslahatlar",
      how_tip1:
        "Shaharlarni lotincha yoki kirillcha yozing — eng muhimi, raqam va ortiqcha belgilarsiz.",
      how_tip2:
        "Agar «borib-qaytish» bo‘lsa — qaytish sanasini uchish sanasidan oldin qo‘ymang.",
      how_tip3:
        "Ism/familiyani pasportdagidek tekshiring: bitta xato qayta rasmiylashtirishga olib kelishi mumkin.",

      how_s1_title: "1-qadam. Ma’lumotlarni tayyorlang",
      how_s1_1:
        "Pasport: raqam, amal qilish muddati, ism/familiya qanday yozilgan.",
      how_s1_2:
        "Kontaktlar: email va telefon — bilet va bildirishnomalar shu yerga keladi.",
      how_s1_3:
        "To‘lov: bank kartasi yoki boshqa mavjud usul (provayderga bog‘liq).",

      how_s2_title: "2-qadam. Yo‘nalish va sanalarni tanlang",
      how_s2_1:
        "«Qayerdan» va «Qayerga» ni kiriting. Turli shaharlar uchun turli nom yozing (bir xil bo‘lmasin).",
      how_s2_2:
        "Uchish sanasini tanlang. Qaytish kerak bo‘lsa — qaytish sanasini tanlang (uchishdan oldin bo‘lmasin).",
      how_s2_3: "Yo‘lovchilar soni: odatda 1–9 (bitta bron uchun).",

      how_s3_title: "3-qadam. Variantlarni solishtiring",
      how_s3_1:
        "Vaqt: to‘g‘ridan-to‘g‘ri reys tezroq, transfer bilan — ba’zan arzonroq.",
      how_s3_2:
        "Bagaj: bagaj va qo‘l yuki kiritilgan-kiritilmaganini tekshiring.",
      how_s3_3:
        "Tarif: qaytarish/almashtirish shartlari tarifga bog‘liq — «Tariflar va xizmatlar» bo‘limini ko‘ring.",

      how_s4_title: "4-qadam. Yo‘lovchi ma’lumotlarini kiriting",
      how_s4_1:
        "Ism va familiya — pasportdagidek (pasportda lotincha bo‘lsa, lotincha).",
      how_s4_2: "Tug‘ilgan sana va hujjat — diqqat bilan, xatosiz.",
      how_s4_3:
        "To‘lovdan so‘ng bilet emailga keladi — PDF va bron raqamini saqlang.",

      how_s5_title: "5-qadam. Tafsilotlarni tasdiqlang",
      how_s5_1:
        "To‘lovdan oldin sana, shaharlar va yo‘lovchilar sonini tekshiring.",
      how_s5_2: "Tanlangan tarif bo‘yicha bagaj va qaytarish qoidalarini aniqlang.",
      how_s5_3: "Transfer bo‘lsa — ulanish vaqti yetarliligini tekshiring.",

      how_s6_title: "6-qadam. Sotib olgandan keyin",
      how_s6_1: "Bilet kelgan xatni tekshiring (ba’zan «Spam»ga tushadi).",
      how_s6_2: "Biletni telefonda saqlang, kerak bo‘lsa chop eting.",
      how_s6_3: "Ro‘yxatdan o‘tishda ma’lumotlar pasportdagidek bo‘lsin.",

      how_s7_title: "Xatolik bo‘lsa",
      how_err1: "Sahifani yangilang va ortiqcha belgilarsiz qayta kiriting.",
      how_err2: "Sanalarni tekshiring: qaytish uchishdan oldin bo‘lmasin.",
      how_err3: "Muammo takrorlansa — «Kontaktlar» bo‘limiga yozing.",

      // FAQ
      faq_title: "Ko‘p so‘raladigan savollar (FAQ)",
      faq_sub:
        "Chipta sotib olishdan oldin eng ko‘p beriladigan savollarga qisqa javoblar.",
      faq_q1: "Onlayn sotuv qachon ishga tushadi?",
      faq_a1:
        "Onlayn sotuv bron tizimi bilan integratsiya tugagach ishga tushadi. Saytdagi yangiliklarni kuzatib boring.",
      faq_q2: "Hozir sayt orqali chipta sotib olsam bo‘ladimi?",
      faq_a2:
        "Hozircha yo‘q — sayt ma’lumot rejimida ishlaydi. Yo‘riqnoma orqali xaridga tayyorlanishingiz mumkin.",
      faq_q3: "«Qayerdan/Qayerga» shahar nomlarini qanday kiritaman?",
      faq_a3:
        "Shahar nomini lotincha yoki kirillcha, raqam va ortiqcha belgilarsiz kiriting. «Qayerdan» va «Qayerga» bir xil bo‘lmasin.",
      faq_q4: "Nega qaytish sanasi uchish sanasidan oldin tanlanmaydi?",
      faq_a4:
        "«Borib-qaytish» uchun bu to‘g‘ri: qaytish uchishdan oldin bo‘lishi mumkin emas.",
      faq_q5: "«Tarif» nimani anglatadi va qoidalarni qayerdan ko‘raman?",
      faq_a5:
        "Tarif bagaj va almashtirish/qaytarish shartlarini belgilaydi. «Tariflar va xizmatlar» bo‘limiga qarang.",
      faq_q6: "Sotib olish uchun qanday hujjatlar kerak?",
      faq_a6:
        "Odatda yo‘lovchilarning pasport ma’lumotlari va to‘lov usuli (karta) kerak bo‘ladi. Xalqaro reyslar uchun viza/hujjat talablarini tekshiring.",
      faq_q7: "To‘lovdan so‘ng bilet qayerga keladi?",
      faq_a7:
        "Bilet odatda xarid vaqtida ko‘rsatilgan emailga keladi. PDF va bron raqamini saqlang.",
      faq_q8: "Bilet xati kelmasa nima qilaman?",
      faq_a8:
        "«Spam»ni tekshiring, email to‘g‘riligini ko‘ring va bir necha daqiqa kuting. Kelmasa — qo‘llab-quvvatlashga murojaat qiling.",

      // Fares
      fares_h1: "Tariflar va xizmatlar",
      fares_lead:
        "Tarif odatda nimalarni o‘z ichiga olishi va xariddan oldin nimalarga e’tibor berish kerakligini qisqacha tushuntiramiz.",
      fares_block1_h2: "1) Bagaj",
      fares_block1_1:
        "Bagaj va qo‘l yuki kiritilgan-kiritilmaganini tekshiring.",
      fares_block1_2:
        "Turli aviakompaniyalarda og‘irlik va o‘lcham me’yorlari farq qilishi mumkin.",
      fares_block1_3:
        "Agar bagaj kiritilmagan bo‘lsa — ko‘pincha alohida sotib olish mumkin.",
      fares_block2_h2: "2) Almashtirish va qaytarish",
      fares_block2_1:
        "Shartlar tarifga bog‘liq: qaytarilmaydiganidan tortib moslashuvchanigacha.",
      fares_block2_2:
        "Almashtirish/qaytarish qo‘shimcha to‘lov va jarima bilan bo‘lishi mumkin — to‘lovdan oldin aniqlang.",
      fares_block2_3: "Tarif qoidalari va bron raqamini saqlang.",
      fares_block3_h2: "3) Qo‘shimcha xizmatlar",
      fares_block3_1:
        "O‘rindiq tanlash, ovqat, sug‘urta, ustuvorlik — ko‘pincha qo‘shimcha haq evaziga.",
      fares_block3_2: "Transferlarda ulanish vaqtiga e’tibor bering.",
      fares_block3_3: "To‘lovdan oldin yakuniy narxni doim tekshiring.",

      // Contacts
      contacts_h1: "Kontaktlar",
      contacts_lead:
        "Yordam kerak bo‘lsa — yozing yoki qo‘ng‘iroq qiling. Ish vaqtida javob beramiz.",
      contacts_email: "Email",
      contacts_email_hint:
        "support@aviabrand.uz (namuna — haqiqiy emailingizga almashtiring)",
      contacts_phone: "Telefon",
      contacts_phone_hint: "+998 XX XXX XX XX (namuna — raqamingizga almashtiring)",
      contacts_hours: "Ish vaqti",
      contacts_hours_hint: "Du–Ju, 09:00–18:00 (Toshkent)",

      // shared
      btn_back_home: "Bosh sahifaga qaytish",

      // SEO route template page (seo-route.html)
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
      seo_s1_2: "Transfer bo‘lsa — ulanish vaqti va tranzit/visa talablarini ko‘ring.",
      seo_s1_3:
        "Mavsumiylikni hisobga oling: bayramlarda va mavsumda narxlar yuqoriroq bo‘lishi mumkin.",

      seo_s2_title: "Qanday arzonroq qidirish",
      seo_s2_1:
        "To‘g‘ridan-to‘g‘ri va transferli variantlarni solishtiring — ba’zan farq katta bo‘ladi.",
      seo_s2_2:
        "Agar moslashuv bo‘lsa — qo‘shni sanalarni (+/- 1–3 kun) solishtiring.",
      seo_s2_3: "To‘lovdan oldin yakuniy narxni tekshiring (bagaj/xizmatlar).",

      seo_s3_title: "Xarid bo‘yicha tez-tez savollar",
      seo_faq_q1: "Nega narx farq qilishi mumkin?",
      seo_faq_a1:
        "Narx tarif, joy mavjudligi, bagaj opsiyalari va qaytarish/almashtirish qoidalariga bog‘liq. Yangilashdan keyin narx o‘zgarishi mumkin.",
      seo_faq_q2: "Sotib olish uchun nimalar kerak?",
      seo_faq_a2:
        "Odatda yo‘lovchi pasport ma’lumotlari, kontakt email/telefon va to‘lov usuli (karta) kerak bo‘ladi.",
      seo_faq_q3: "Biletni qaytarish yoki almashtirish mumkinmi?",
      seo_faq_a3:
        "Bu tarifga bog‘liq. To‘lovdan oldin qaytarish/almashtirish shartlari va jarimalarni tekshiring.",

      seo_s4_title: "Foydali havolalar",
      seo_link1: "Qanday sotib olish — bosqichma-bosqich",
      seo_link2: "Tariflar va xizmatlar — bagaj, qaytarish/almashtirish",
      seo_link3: "FAQ — ko‘p so‘raladigan savollar",
      seo_btn_search: "Qidiruvga o‘tish",

      seo_meta_title_tpl: "Aviabrand.uz — Aviabiletlar {from} → {to}",
      seo_meta_desc_tpl:
        "{from} → {to} yo‘nalishi bo‘yicha maslahatlar va FAQ: reys tanlash, bagajni tekshirish va xaridga tayyorgarlik.",

      // Specific SEO page: flights-tashkent-moscow.html
      seo_tm_title: "Aviabiletlar Toshkent — Moskva",
      seo_tm_desc:
        "Toshkent — Moskva yo‘nalishi bo‘yicha ma’lumot sahifasi: reys tanlash, tariflar va xaridga tayyorgarlik bo‘yicha maslahatlar.",
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
      seo_tm_li1:
        "Agar moslashuv bo‘lsa — qo‘shni sanalarni (+/- 1–3 kun) solishtiring.",
      seo_tm_li2:
        "Ism/familiya pasportdagidek bo‘lsin: tuzatishlar pullik bo‘lishi mumkin.",
      seo_tm_li3: "Sotib olgandan keyin bron raqami va PDF biletni saqlang.",
      city_tashkent: "Toshkent",
      city_moscow: "Moskva",
    },
  };

  const getLang = () => localStorage.getItem("lang") || "ru";
  const setLang = (lang) => localStorage.setItem("lang", lang);

  const t = (key) => {
    const lang = getLang();
    return dict[lang]?.[key] ?? dict.ru[key] ?? key;
  };

  const fmtTpl = (tpl, vars) =>
    String(tpl || "")
      .replace(/\{from\}/g, vars.from ?? "")
      .replace(/\{to\}/g, vars.to ?? "");

  const applyLangToDom = () => {
    const lang = getLang();

    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      const v = btn.getAttribute("data-set-lang");
      btn.classList.toggle("active", v === lang);
    });

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;

      if (el.tagName === "TITLE") {
        document.title = t(key);
        el.textContent = t(key);
        return;
      }

      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const key = el.getAttribute("data-i18n-ph");
      if (!key) return;
      el.setAttribute("placeholder", t(key));
    });

    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      const key = el.getAttribute("data-i18n-content");
      if (!key) return;
      el.setAttribute("content", t(key));
    });

    const fromEl = document.getElementById("from");
    const toEl = document.getElementById("to");
    if (fromEl) fromEl.placeholder = t("ph_from");
    if (toEl) toEl.placeholder = t("ph_to");

    const oneWay = document.getElementById("oneway");
    if (oneWay) {
      const span = oneWay.closest("label")?.querySelector("span");
      if (span) span.textContent = t("oneway_label");
    }

    const formBtn =
      document.querySelector("#searchForm button[type='submit']") ||
      document.querySelector("#searchForm button");
    if (formBtn) formBtn.textContent = t("submit_btn");

    applySeoMeta();
  };

  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-set-lang") || "ru";
      setLang(lang);
      applyLangToDom();

      if (window.__fp1) applyDatePlaceholder(window.__fp1);
      if (window.__fp2) applyDatePlaceholder(window.__fp2);
    });
  });

  // =========================
  // 1) INDEX: форма поиска
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

  const yesterday = () => {
    const x = startOfDay(new Date());
    x.setDate(x.getDate() - 1);
    return x;
  };

  const BASE_MIN_DATE = yesterday();

  const setFpDisabled = (inst, disabled) => {
    if (!inst) return;
    if (inst._input) inst._input.disabled = disabled;
    if (inst.altInput) inst.altInput.disabled = disabled;
  };

  function applyDatePlaceholder(inst) {
    const ph = t("ph_date");
    if (inst?.altInput) inst.altInput.placeholder = ph;
    if (inst?._input) inst._input.placeholder = ph;
  }

  const getSelectedDate = (fp) => {
    const d = fp?.selectedDates?.[0];
    return d ? startOfDay(d) : null;
  };

  const syncMinReturnToDepart = () => {
    if (!fp1 || !fp2) return;

    const d1 = getSelectedDate(fp1);

    if (!d1) {
      fp2.set("minDate", BASE_MIN_DATE);
      return;
    }

    fp2.set("minDate", d1);

    const d2 = getSelectedDate(fp2);
    if (d2 && d2 < d1) {
      fp2.setDate(d1, true);
      applyDatePlaceholder(fp2);
    }
  };

  const fp1 =
    date1 && window.flatpickr
      ? window.flatpickr(date1, {
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
            const d1 = fp1?.selectedDates?.[0];
            if (d1) inst.jumpToDate(d1, true);
          },

          onChange: (_sd, _ds, inst) => applyDatePlaceholder(inst),
        })
      : null;

  window.__fp1 = fp1;
  window.__fp2 = fp2;

  applyDatePlaceholder(fp1);
  applyDatePlaceholder(fp2);

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
      date2.required = true;

      setFpDisabled(fp2, false);
      applyDatePlaceholder(fp2);
      syncMinReturnToDepart();
    }
  }

  if (oneWay) {
    oneWay.addEventListener("change", () => {
      syncReturn();
      applyLangToDom();
    });
    syncReturn();
  }

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
    applyLangToDom();
  });

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
      fromEl.setCustomValidity(t("v_from_min"));
      return false;
    }
    if (toV.length < 2) {
      toEl.setCustomValidity(t("v_to_min"));
      return false;
    }

    if (!allowedChars.test(fromV)) {
      fromEl.setCustomValidity(t("v_from_chars"));
      return false;
    }
    if (!allowedChars.test(toV)) {
      toEl.setCustomValidity(t("v_to_chars"));
      return false;
    }

    if (fromV.toLowerCase() === toV.toLowerCase()) {
      toEl.setCustomValidity(t("v_same"));
      return false;
    }

    return true;
  };

  if (fromEl) fromEl.addEventListener("input", () => clearCustom(fromEl));
  if (toEl) toEl.addEventListener("input", () => clearCustom(toEl));

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!oneWay?.checked && date2 && !date2.value) {
        const msg = t("v_date2");
        if (fp2?.altInput) {
          fp2.altInput.setCustomValidity(msg);
          fp2.altInput.reportValidity();
          fp2.altInput.setCustomValidity("");
          fp2.open();
        } else {
          date2.setCustomValidity(msg);
          date2.reportValidity();
          date2.setCustomValidity("");
        }
        return;
      }

      if (!validateFromTo()) {
        if (fromEl?.validationMessage) fromEl.reportValidity();
        else if (toEl?.validationMessage) toEl.reportValidity();
        return;
      }

      const params = new URLSearchParams();
      if (fromEl) params.set("from", norm(fromEl.value));
      if (toEl) params.set("to", norm(toEl.value));
      if (date1?.value) params.set("date1", date1.value);
      if (date2?.value && !oneWay?.checked) params.set("date2", date2.value);

      const paxEl = document.getElementById("pax");
      if (paxEl?.value) params.set("pax", paxEl.value);

      params.set("oneway", oneWay?.checked ? "1" : "0");

      window.location.href = "coming-soon.html?" + params.toString();
    });
  }

  // =========================
  // 2) COMING-SOON: вывод параметров
  // =========================
  const onComingSoon = !!document.getElementById("sumFrom");
  if (onComingSoon) {
    const qs = new URLSearchParams(window.location.search);

    const from = qs.get("from") || "-";
    const to = qs.get("to") || "-";
    const pax = qs.get("pax") || "1";
    const d1 = qs.get("date1") || "";
    const d2 = qs.get("date2") || "";

    const elFrom = document.getElementById("sumFrom");
    const elTo = document.getElementById("sumTo");
    const elPax = document.getElementById("sumPax");
    const elDates = document.getElementById("sumDates");

    if (elFrom) elFrom.textContent = from;
    if (elTo) elTo.textContent = to;
    if (elPax) elPax.textContent = pax;

    const fmt = (s) => {
      const m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!m) return s || "-";
      return `${m[3]}.${m[2]}.${m[1]}`;
    };

    if (elDates) {
      if (d1 || d2) {
        elDates.textContent = d2 ? `${fmt(d1)} → ${fmt(d2)}` : fmt(d1);
      } else {
        elDates.textContent = "-";
      }
    }
  }

  // =========================
  // 3) SEO pages helpers (seo-route.html + route pages)
  // =========================
  function applySeoMeta() {
    const seoFromEl = document.getElementById("seoFrom");
    const seoToEl = document.getElementById("seoTo");
    if (seoFromEl && seoToEl) {
      const qs = new URLSearchParams(window.location.search);
      const from = qs.get("from") || qs.get("f") || "-";
      const to = qs.get("to") || qs.get("t") || "-";

      seoFromEl.textContent = from;
      seoToEl.textContent = to;

      const btn = document.getElementById("seoGoSearch");
      if (btn) {
        const href = `index.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
        btn.setAttribute("href", href);
      }

      const canon = document.getElementById("canonical");
      if (canon)
        canon.setAttribute(
          "href",
          window.location.pathname.split("/").pop() || "seo-route.html"
        );

      const title = fmtTpl(t("seo_meta_title_tpl"), { from, to });
      const desc = fmtTpl(t("seo_meta_desc_tpl"), { from, to });

      document.title = title;
      const metaDesc =
        document.getElementById("metaDesc") ||
        document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", desc);
    }

    const routeFromEl = document.getElementById("routeFrom");
    const routeToEl = document.getElementById("routeTo");
    if (routeFromEl && routeToEl) {
      const from = routeFromEl.textContent.trim() || "-";
      const to = routeToEl.textContent.trim() || "-";

      const btn = document.getElementById("seoGoSearch");
      if (btn) {
        const href = `index.html?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
        btn.setAttribute("href", href);
      }
    }
  }

  applyLangToDom();
});
