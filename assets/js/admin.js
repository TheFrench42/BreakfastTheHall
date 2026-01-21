(() => {
  const defaultData = window.MENU_DATA;
  if (!defaultData) {
    return;
  }

  const sessionKey = "theHavenAdminSession";
  const dataKey = "theHavenMenuDataOverride";
  const adminHash = "2db8688d8d0caa2e57fe5a98e51439e3744b7c96a0847bc99c5588cb0e50b4af";

  const loginCard = document.getElementById("login-card");
  const editorCard = document.getElementById("editor-card");
  const loginForm = document.getElementById("login-form");
  const loginMessage = document.getElementById("login-message");
  const menuEditor = document.getElementById("menu-editor");
  const loginButton = loginForm ? loginForm.querySelector("button[type=\"submit\"]") : null;
  const saveButton = document.getElementById("save-local");
  const exportButton = document.getElementById("export-data");
  const resetButton = document.getElementById("reset-data");
  const adminMessage = document.getElementById("admin-message");

  if (!loginCard || !editorCard || !loginForm || !menuEditor) {
    return;
  }

  const cloneData = (data) => JSON.parse(JSON.stringify(data));

  const loadStoredData = () => {
    try {
      const raw = window.localStorage.getItem(dataKey);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.menus) {
        return null;
      }
      return parsed;
    } catch (error) {
      return null;
    }
  };

  let workingData = loadStoredData() || cloneData(defaultData);

  const showMessage = (element, message) => {
    if (!element) {
      return;
    }
    element.textContent = message || "";
  };

  const hashString = async (value) => {
    const buffer = new TextEncoder().encode(value);
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  const unlockEditor = () => {
    loginCard.classList.add("is-hidden");
    editorCard.classList.remove("is-hidden");
    renderEditor();
  };

  const canHash = !!(window.crypto && window.crypto.subtle);
  if (!canHash && loginButton) {
    loginButton.disabled = true;
    showMessage(loginMessage, "Apri questa pagina da http://localhost per usare il login.");
  }

  if (window.sessionStorage.getItem(sessionKey) === "1") {
    unlockEditor();
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    showMessage(loginMessage, "");

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
      showMessage(loginMessage, "Inserisci utente e password.");
      return;
    }

    if (!canHash) {
      showMessage(loginMessage, "Login non disponibile in questo contesto.");
      return;
    }

    const hash = await hashString(`${username}:${password}`);
    if (hash === adminHash) {
      window.sessionStorage.setItem(sessionKey, "1");
      showMessage(loginMessage, "");
      unlockEditor();
      return;
    }

    showMessage(loginMessage, "Credenziali non valide.");
  });

  const setNestedValue = (target, path, value) => {
    const keys = path.split(".");
    let current = target;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        if (key === "price" && value === "") {
          delete current[key];
        } else {
          current[key] = value;
        }
        return;
      }

      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    });
  };

  const ensureMenuShape = (menu) => {
    if (!menu.availability) {
      menu.availability = { start: "", end: "" };
    }
    if (!menu.label) {
      menu.label = { it: "", en: "" };
    }
    if (!menu.title) {
      menu.title = { it: "", en: "" };
    }
    if (!menu.note) {
      menu.note = { it: "", en: "" };
    }
    if (!Array.isArray(menu.sections)) {
      menu.sections = [];
    }
    menu.sections.forEach((section) => {
      if (!section.title) {
        section.title = { it: "", en: "" };
      }
      if (!Array.isArray(section.items)) {
        section.items = [];
      }
      section.items.forEach((item) => {
        if (!item.name) {
          item.name = { it: "", en: "" };
        }
        if (!Array.isArray(item.subitems)) {
          item.subitems = [];
        }
        item.subitems.forEach((subitem) => {
          if (!subitem.name) {
            subitem.name = { it: "", en: "" };
          }
        });
      });
    });
  };

  const createField = (labelText, input) => {
    const field = document.createElement("div");
    field.className = "field";

    const label = document.createElement("label");
    label.textContent = labelText;
    if (input.id) {
      label.setAttribute("for", input.id);
    }

    field.append(label, input);
    return field;
  };

  const createInput = (type, value, dataset, idSuffix) => {
    const input = document.createElement("input");
    input.type = type;
    input.value = value || "";
    if (idSuffix) {
      input.id = idSuffix;
    }

    Object.entries(dataset || {}).forEach(([key, val]) => {
      input.dataset[key] = val;
    });

    return input;
  };

  const createTextarea = (value, dataset, idSuffix) => {
    const textarea = document.createElement("textarea");
    textarea.rows = 2;
    textarea.value = value || "";
    if (idSuffix) {
      textarea.id = idSuffix;
    }

    Object.entries(dataset || {}).forEach(([key, val]) => {
      textarea.dataset[key] = val;
    });

    return textarea;
  };

  const createButton = (label, className, dataset) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;

    Object.entries(dataset || {}).forEach(([key, val]) => {
      button.dataset[key] = val;
    });

    return button;
  };

  const buildSubitem = (menuId, sectionIndex, itemIndex, subitemIndex, subitem) => {
    const row = document.createElement("div");
    row.className = "admin-subitem";

    const itInput = createInput(
      "text",
      subitem.name.it,
      {
        menu: menuId,
        section: sectionIndex,
        item: itemIndex,
        subitem: subitemIndex,
        field: "name.it"
      },
      `subitem-${menuId}-${sectionIndex}-${itemIndex}-${subitemIndex}-it`
    );
    const enInput = createInput(
      "text",
      subitem.name.en,
      {
        menu: menuId,
        section: sectionIndex,
        item: itemIndex,
        subitem: subitemIndex,
        field: "name.en"
      },
      `subitem-${menuId}-${sectionIndex}-${itemIndex}-${subitemIndex}-en`
    );
    const removeButton = createButton("Rimuovi", "btn ghost", {
      action: "remove-subitem",
      menu: menuId,
      section: sectionIndex,
      item: itemIndex,
      subitem: subitemIndex
    });

    row.append(itInput, enInput, removeButton);
    return row;
  };

  const buildItem = (menuId, sectionIndex, itemIndex, item) => {
    const itemWrap = document.createElement("div");
    itemWrap.className = "admin-item";

    const row = document.createElement("div");
    row.className = "admin-item-row";

    const itInput = createInput(
      "text",
      item.name.it,
      {
        menu: menuId,
        section: sectionIndex,
        item: itemIndex,
        field: "name.it"
      },
      `item-${menuId}-${sectionIndex}-${itemIndex}-it`
    );
    const enInput = createInput(
      "text",
      item.name.en,
      {
        menu: menuId,
        section: sectionIndex,
        item: itemIndex,
        field: "name.en"
      },
      `item-${menuId}-${sectionIndex}-${itemIndex}-en`
    );
    const priceInput = createInput(
      "text",
      item.price || "",
      {
        menu: menuId,
        section: sectionIndex,
        item: itemIndex,
        field: "price"
      },
      `item-${menuId}-${sectionIndex}-${itemIndex}-price`
    );
    const removeButton = createButton("Rimuovi", "btn ghost", {
      action: "remove-item",
      menu: menuId,
      section: sectionIndex,
      item: itemIndex
    });

    row.append(itInput, enInput, priceInput, removeButton);
    itemWrap.appendChild(row);

    const subitemsWrap = document.createElement("div");
    subitemsWrap.className = "admin-subitems";

    item.subitems.forEach((subitem, subitemIndex) => {
      subitemsWrap.appendChild(
        buildSubitem(menuId, sectionIndex, itemIndex, subitemIndex, subitem)
      );
    });

    const addSubitemButton = createButton("Aggiungi sottovoce", "btn secondary", {
      action: "add-subitem",
      menu: menuId,
      section: sectionIndex,
      item: itemIndex
    });

    itemWrap.append(subitemsWrap, addSubitemButton);

    return itemWrap;
  };

  const buildSection = (menuId, sectionIndex, section) => {
    const sectionWrap = document.createElement("div");
    sectionWrap.className = "admin-section";

    const header = document.createElement("div");
    header.className = "admin-section-header";

    const heading = document.createElement("h3");
    heading.textContent = `Sezione ${sectionIndex + 1}`;
    const removeButton = createButton("Rimuovi sezione", "btn ghost", {
      action: "remove-section",
      menu: menuId,
      section: sectionIndex
    });

    header.append(heading, removeButton);

    const titlesGrid = document.createElement("div");
    titlesGrid.className = "admin-grid";

    const titleIt = createInput(
      "text",
      section.title.it,
      {
        menu: menuId,
        section: sectionIndex,
        field: "title.it"
      },
      `section-${menuId}-${sectionIndex}-it`
    );
    const titleEn = createInput(
      "text",
      section.title.en,
      {
        menu: menuId,
        section: sectionIndex,
        field: "title.en"
      },
      `section-${menuId}-${sectionIndex}-en`
    );

    titlesGrid.append(
      createField("Titolo IT", titleIt),
      createField("Titolo EN", titleEn)
    );

    const itemsWrap = document.createElement("div");
    itemsWrap.className = "admin-items";

    section.items.forEach((item, itemIndex) => {
      itemsWrap.appendChild(buildItem(menuId, sectionIndex, itemIndex, item));
    });

    const addItemButton = createButton("Aggiungi piatto", "btn secondary", {
      action: "add-item",
      menu: menuId,
      section: sectionIndex
    });

    sectionWrap.append(header, titlesGrid, itemsWrap, addItemButton);

    return sectionWrap;
  };

  const buildMenuCard = (menuId, menu) => {
    const card = document.createElement("div");
    card.className = "admin-menu card";

    const header = document.createElement("div");
    header.className = "admin-menu-header";

    const heading = document.createElement("h2");
    heading.textContent = `Menu: ${menuId}`;

    const timeGrid = document.createElement("div");
    timeGrid.className = "admin-grid";

    const startInput = createInput(
      "time",
      menu.availability.start,
      { menu: menuId, field: "availability.start" },
      `menu-${menuId}-start`
    );
    const endInput = createInput(
      "time",
      menu.availability.end,
      { menu: menuId, field: "availability.end" },
      `menu-${menuId}-end`
    );

    timeGrid.append(
      createField("Inizio servizio", startInput),
      createField("Fine servizio", endInput)
    );

    header.append(heading, timeGrid);

    const metaGrid = document.createElement("div");
    metaGrid.className = "admin-grid";

    const labelIt = createInput(
      "text",
      menu.label.it,
      { menu: menuId, field: "label.it" },
      `menu-${menuId}-label-it`
    );
    const labelEn = createInput(
      "text",
      menu.label.en,
      { menu: menuId, field: "label.en" },
      `menu-${menuId}-label-en`
    );
    const titleIt = createInput(
      "text",
      menu.title.it,
      { menu: menuId, field: "title.it" },
      `menu-${menuId}-title-it`
    );
    const titleEn = createInput(
      "text",
      menu.title.en,
      { menu: menuId, field: "title.en" },
      `menu-${menuId}-title-en`
    );

    metaGrid.append(
      createField("Etichetta IT", labelIt),
      createField("Etichetta EN", labelEn),
      createField("Titolo IT", titleIt),
      createField("Titolo EN", titleEn)
    );

    const noteGrid = document.createElement("div");
    noteGrid.className = "admin-grid";

    const noteIt = createTextarea(
      menu.note.it,
      { menu: menuId, field: "note.it" },
      `menu-${menuId}-note-it`
    );
    const noteEn = createTextarea(
      menu.note.en,
      { menu: menuId, field: "note.en" },
      `menu-${menuId}-note-en`
    );

    noteGrid.append(
      createField("Nota IT (opzionale)", noteIt),
      createField("Nota EN (opzionale)", noteEn)
    );

    const sectionsWrap = document.createElement("div");
    sectionsWrap.className = "admin-sections";

    menu.sections.forEach((section, sectionIndex) => {
      sectionsWrap.appendChild(buildSection(menuId, sectionIndex, section));
    });

    const addSectionButton = createButton("Aggiungi sezione", "btn secondary", {
      action: "add-section",
      menu: menuId
    });

    card.append(header, metaGrid, noteGrid, sectionsWrap, addSectionButton);

    return card;
  };

  const renderEditor = () => {
    menuEditor.innerHTML = "";

    const menuOrder = Array.isArray(workingData.order) && workingData.order.length
      ? workingData.order
      : Object.keys(workingData.menus || {});

    menuOrder.forEach((menuId) => {
      const menu = workingData.menus[menuId];
      if (!menu) {
        return;
      }
      ensureMenuShape(menu);
      menuEditor.appendChild(buildMenuCard(menuId, menu));
    });
  };

  menuEditor.addEventListener("input", (event) => {
    const target = event.target;
    if (!target.dataset.field || !target.dataset.menu) {
      return;
    }

    const menu = workingData.menus[target.dataset.menu];
    if (!menu) {
      return;
    }

    let current = menu;
    if (target.dataset.section !== undefined) {
      current = current.sections[Number(target.dataset.section)];
    }
    if (target.dataset.item !== undefined) {
      current = current.items[Number(target.dataset.item)];
    }
    if (target.dataset.subitem !== undefined) {
      current = current.subitems[Number(target.dataset.subitem)];
    }

    if (!current) {
      return;
    }

    setNestedValue(current, target.dataset.field, target.value);
  });

  menuEditor.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || !button.dataset.action) {
      return;
    }

    const menuId = button.dataset.menu;
    const menu = workingData.menus[menuId];
    if (!menu) {
      return;
    }

    const sectionIndex = button.dataset.section ? Number(button.dataset.section) : null;
    const itemIndex = button.dataset.item ? Number(button.dataset.item) : null;
    const subitemIndex = button.dataset.subitem ? Number(button.dataset.subitem) : null;

    switch (button.dataset.action) {
      case "add-section":
        menu.sections.push({
          title: { it: "", en: "" },
          items: []
        });
        break;
      case "remove-section":
        if (sectionIndex !== null) {
          menu.sections.splice(sectionIndex, 1);
        }
        break;
      case "add-item":
        if (sectionIndex !== null) {
          menu.sections[sectionIndex].items.push({
            name: { it: "", en: "" },
            price: ""
          });
        }
        break;
      case "remove-item":
        if (sectionIndex !== null && itemIndex !== null) {
          menu.sections[sectionIndex].items.splice(itemIndex, 1);
        }
        break;
      case "add-subitem":
        if (sectionIndex !== null && itemIndex !== null) {
          const item = menu.sections[sectionIndex].items[itemIndex];
          if (!Array.isArray(item.subitems)) {
            item.subitems = [];
          }
          item.subitems.push({ name: { it: "", en: "" } });
        }
        break;
      case "remove-subitem":
        if (sectionIndex !== null && itemIndex !== null && subitemIndex !== null) {
          menu.sections[sectionIndex].items[itemIndex].subitems.splice(subitemIndex, 1);
        }
        break;
      default:
        return;
    }

    renderEditor();
  });

  if (saveButton) {
    saveButton.addEventListener("click", () => {
      window.localStorage.setItem(dataKey, JSON.stringify(workingData));
      showMessage(adminMessage, "Salvato nel browser.");
    });
  }

  if (exportButton) {
    exportButton.addEventListener("click", () => {
      const json = JSON.stringify(workingData, null, 2);
      const ascii = json.replace(/[^\x00-\x7F]/g, (char) => {
        return `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`;
      });
      const output = `/* Menu strings include HTML entities to preserve accents while keeping ASCII. */\nwindow.MENU_DATA = ${ascii};\n`;
      const blob = new Blob([output], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "menu-data.js";
      link.click();
      URL.revokeObjectURL(url);
      showMessage(adminMessage, "File scaricato come menu-data.js.");
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      const confirmReset = window.confirm("Ripristinare i dati originali? Le modifiche locali andranno perse.");
      if (!confirmReset) {
        return;
      }
      window.localStorage.removeItem(dataKey);
      workingData = cloneData(defaultData);
      renderEditor();
      showMessage(adminMessage, "Dati originali ripristinati.");
    });
  }
})();
