(() => {
  const overrideKey = "theHavenMenuDataOverride";
  const storageKey = "theHavenLanguage";

  const loadOverride = () => {
    try {
      const raw = window.localStorage.getItem(overrideKey);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      return parsed && parsed.ui ? parsed : null;
    } catch (error) {
      return null;
    }
  };

  const data = loadOverride() || window.MENU_DATA;
  if (!data) {
    return;
  }

  const supportedLangs = Object.keys(data.ui);

  const getInitialLang = () => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang && supportedLangs.includes(urlLang)) {
      return urlLang;
    }

    const stored = window.localStorage.getItem(storageKey);
    if (stored && supportedLangs.includes(stored)) {
      return stored;
    }

    const browserLang = (navigator.language || "").slice(0, 2);
    if (supportedLangs.includes(browserLang)) {
      return browserLang;
    }

    return "it";
  };

  const setUrlLang = (lang) => {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
  };

  const setDocumentLang = (lang) => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(storageKey, lang);
  };

  const resolveAssetUrl = (path) => {
    try {
      return new URL(path, window.location.href).href;
    } catch (error) {
      return path;
    }
  };

  const formatPrice = (price) => `${price} &euro;`;

  const parseTime = (time) => {
    if (!time) {
      return null;
    }
    const parts = time.split(":");
    if (parts.length !== 2) {
      return null;
    }
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return null;
    }
    return hours * 60 + minutes;
  };

  const formatAvailability = (availability) => {
    if (!availability || !availability.start || !availability.end) {
      return "";
    }
    return `${availability.start} - ${availability.end}`;
  };

  const isMenuOpen = (menu, nowMinutes) => {
    if (!menu || !menu.availability) {
      return false;
    }
    const start = parseTime(menu.availability.start);
    const end = parseTime(menu.availability.end);
    if (start === null || end === null) {
      return false;
    }
    if (start === end) {
      return true;
    }
    if (start < end) {
      return nowMinutes >= start && nowMinutes < end;
    }
    return nowMinutes >= start || nowMinutes < end;
  };

  const getMenuOrder = () => {
    if (Array.isArray(data.order) && data.order.length) {
      return data.order;
    }
    return Object.keys(data.menus || {});
  };

  const getAvailability = (now) => {
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    return getMenuOrder().filter((menuId) => isMenuOpen(data.menus[menuId], nowMinutes));
  };

  const buildServiceCard = (menuId, menu, lang, index, label) => {
    const card = document.createElement("a");
    card.className = "service-card card fade-in";
    card.style.animationDelay = `${index * 0.12}s`;
    const hoursLabel = formatAvailability(menu.availability);
    card.href = `menu.html?menu=${menuId}&lang=${lang}`;
    card.setAttribute("aria-label", `${label} - ${hoursLabel}`);

    const image = document.createElement("div");
    image.className = "service-image";
    image.style.setProperty("--bg-image", `url('${resolveAssetUrl(menu.hero)}')`);

    const info = document.createElement("div");
    info.className = "service-info";

    const time = document.createElement("span");
    time.className = "service-time";
    time.textContent = hoursLabel;

    const title = document.createElement("h2");
    title.textContent = label;

    const state = document.createElement("span");
    state.className = "service-state";
    state.textContent = data.ui[lang].home.availableNow;

    info.append(time, title, state);
    card.append(image, info);

    return card;
  };

  const renderHome = (lang) => {
    const ui = data.ui[lang];
    const titleEl = document.getElementById("home-title");
    const subtitleEl = document.getElementById("home-subtitle");
    const eyebrowEl = document.getElementById("home-eyebrow");
    const languageLabel = document.getElementById("language-label");
    const languageSelect = document.getElementById("language");
    const serviceGrid = document.getElementById("service-grid");

    if (titleEl) {
      titleEl.textContent = ui.home.title;
    }
    if (subtitleEl) {
      subtitleEl.textContent = ui.home.subtitle;
    }
    if (eyebrowEl) {
      eyebrowEl.textContent = ui.home.eyebrow;
    }
    if (languageLabel) {
      languageLabel.textContent = ui.languageLabel;
    }
    if (languageSelect) {
      languageSelect.value = lang;
    }

    serviceGrid.innerHTML = "";
    const availableMenus = getAvailability(new Date());

    availableMenus.forEach((menuId, index) => {
      const menu = data.menus[menuId];
      const label = menu.label[lang];
      const card = buildServiceCard(menuId, menu, lang, index, label);
      serviceGrid.appendChild(card);
    });
  };

  const renderMenu = (lang) => {
    const params = new URLSearchParams(window.location.search);
    const menuId = params.get("menu") || "breakfast";
    const menu = data.menus[menuId];
    const ui = data.ui[lang];

    const languageLabel = document.getElementById("language-label");
    const languageSelect = document.getElementById("language");
    const backLink = document.getElementById("back-link");
    const eyebrowEl = document.getElementById("menu-eyebrow");
    const titleEl = document.getElementById("menu-title");
    const hoursEl = document.getElementById("menu-hours");
    const serviceEl = document.getElementById("menu-service");
    const heroImage = document.getElementById("menu-hero-image");
    const sectionsContainer = document.getElementById("menu-sections");
    const noteEl = document.getElementById("menu-note");

    if (languageLabel) {
      languageLabel.textContent = ui.languageLabel;
    }
    if (languageSelect) {
      languageSelect.value = lang;
    }
    if (backLink) {
      backLink.textContent = ui.menu.back;
      backLink.href = `index.html?lang=${lang}`;
    }
    if (eyebrowEl) {
      eyebrowEl.textContent = ui.menu.eyebrow;
    }

    sectionsContainer.innerHTML = "";

    if (!menu) {
      if (noteEl) {
        noteEl.innerHTML = "";
        noteEl.classList.add("is-hidden");
      }
      const empty = document.createElement("div");
      empty.className = "card empty-state";
      empty.textContent = ui.menu.notFound;
      sectionsContainer.appendChild(empty);
      return;
    }

    if (titleEl) {
      titleEl.textContent = menu.title[lang];
    }
    const hoursLabel = formatAvailability(menu.availability);
    if (hoursEl) {
      hoursEl.textContent = `${ui.menu.hours}: ${hoursLabel}`;
      hoursEl.classList.toggle("is-hidden", !hoursLabel);
    }
    if (serviceEl) {
      serviceEl.textContent = `${ui.menu.service}: ${menu.label[lang]}`;
    }
    if (heroImage) {
      heroImage.style.setProperty("--bg-image", `url('${resolveAssetUrl(menu.hero)}')`);
      heroImage.setAttribute("aria-label", menu.title[lang]);
    }

    document.title = `${menu.title[lang]} | The Haven`;

    if (noteEl) {
      if (menu.note && menu.note[lang]) {
        noteEl.innerHTML = menu.note[lang];
        noteEl.classList.remove("is-hidden");
      } else {
        noteEl.innerHTML = "";
        noteEl.classList.add("is-hidden");
      }
    }

    menu.sections.forEach((section, index) => {
      const sectionEl = document.createElement("section");
      sectionEl.className = "menu-section card fade-in";
      sectionEl.style.animationDelay = `${index * 0.1}s`;

      if (section.title[lang]) {
        const heading = document.createElement("h2");
        heading.textContent = section.title[lang];
        sectionEl.appendChild(heading);
      }

      const list = document.createElement("ul");
      list.className = "menu-list";

      section.items.forEach((item) => {
        const itemEl = document.createElement("li");
        itemEl.className = "menu-item";

        const nameWrap = document.createElement("div");
        nameWrap.className = "name";
        nameWrap.innerHTML = item.name[lang];

        if (item.subitems && item.subitems.length) {
          const subList = document.createElement("ul");
          subList.className = "subitems";

          item.subitems.forEach((subitem) => {
            const subItemEl = document.createElement("li");
            subItemEl.innerHTML = subitem.name[lang];
            subList.appendChild(subItemEl);
          });

          nameWrap.appendChild(subList);
        }

        itemEl.appendChild(nameWrap);

        if (item.price) {
          const price = document.createElement("span");
          price.className = "price";
          price.innerHTML = formatPrice(item.price);
          itemEl.appendChild(price);
        }

        list.appendChild(itemEl);
      });

      sectionEl.appendChild(list);
      sectionsContainer.appendChild(sectionEl);
    });

    if (noteEl && !noteEl.classList.contains("is-hidden")) {
      noteEl.classList.add("fade-in");
    }
  };

  const initLanguage = (onChange) => {
    const select = document.getElementById("language");
    if (!select) {
      return;
    }

    select.addEventListener("change", (event) => {
      const lang = event.target.value;
      setDocumentLang(lang);
      setUrlLang(lang);
      onChange(lang);
    });
  };

  const initHome = () => {
    let lang = getInitialLang();
    setDocumentLang(lang);
    setUrlLang(lang);
    renderHome(lang);
    initLanguage((newLang) => {
      lang = newLang;
      renderHome(lang);
    });
  };

  const initMenu = () => {
    let lang = getInitialLang();
    setDocumentLang(lang);
    setUrlLang(lang);
    renderMenu(lang);
    initLanguage((newLang) => {
      lang = newLang;
      renderMenu(lang);
    });
  };

  const page = document.body.dataset.page;
  if (page === "home") {
    initHome();
  } else if (page === "menu") {
    initMenu();
  }
})();
