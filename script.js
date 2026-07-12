(() => {
  const windows = Array.from(document.querySelectorAll(".window"));
  const dockButtons = Array.from(document.querySelectorAll(".dock-item[data-open]"));
  const menuTriggers = Array.from(document.querySelectorAll(".menu-trigger[data-menu]"));
  const menuPopovers = Array.from(document.querySelectorAll(".menu-popover"));
  const projectCards = Array.from(document.querySelectorAll(".project-item"));
  const projectCount = document.getElementById("project-count");
  const clock = document.getElementById("menu-clock");

  let zIndex = 40;

  const getWindow = (name) => document.querySelector(`[data-window="${name}"]`);

  const closeMenus = () => {
    menuPopovers.forEach((menu) => menu.classList.remove("is-open"));
    menuTriggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
  };

  const updateDock = () => {
    dockButtons.forEach((button) => {
      const windowElement = getWindow(button.dataset.open);
      const indicator = button.querySelector(".dock-indicator");
      if (!indicator || !windowElement) return;
      const open = !windowElement.classList.contains("is-hidden") && !windowElement.classList.contains("is-minimized");
      indicator.classList.toggle("active", open);
    });
  };

  const focusWindow = (windowElement) => {
    zIndex += 1;
    windows.forEach((item) => item.classList.remove("active-window"));
    windowElement.style.zIndex = String(zIndex);
    windowElement.classList.add("active-window");
  };

  const openWindow = (name) => {
    const windowElement = getWindow(name);
    if (!windowElement) return;

    windowElement.classList.remove("is-hidden", "is-minimized", "is-closing");
    windowElement.classList.add("is-opening");
    focusWindow(windowElement);
    window.setTimeout(() => windowElement.classList.remove("is-opening"), 340);
    updateDock();
    closeMenus();
  };

  const closeWindow = (windowElement) => {
    windowElement.classList.add("is-closing");
    window.setTimeout(() => {
      windowElement.classList.add("is-hidden");
      windowElement.classList.remove("is-closing", "is-minimized", "is-maximized");
      updateDock();
    }, 220);
  };

  const minimizeWindow = (windowElement) => {
    windowElement.classList.add("is-minimized");
    window.setTimeout(updateDock, 180);
  };

  const maximizeWindow = (windowElement) => {
    windowElement.classList.toggle("is-maximized");
    focusWindow(windowElement);
  };

  document.querySelectorAll("[data-open]").forEach((control) => {
    control.addEventListener("click", (event) => {
      if (control.tagName === "A") return;
      event.preventDefault();
      openWindow(control.dataset.open);
    });
  });

  windows.forEach((windowElement) => {
    windowElement.addEventListener("pointerdown", () => focusWindow(windowElement));

    windowElement.querySelectorAll("[data-window-action]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const action = button.dataset.windowAction;
        if (action === "close") closeWindow(windowElement);
        if (action === "minimize") minimizeWindow(windowElement);
        if (action === "maximize") maximizeWindow(windowElement);
      });
    });

    const handle = windowElement.querySelector(".drag-handle");
    if (!handle) return;

    let dragState = null;

    handle.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button") || window.innerWidth <= 820 || windowElement.classList.contains("is-maximized")) return;

      const rect = windowElement.getBoundingClientRect();
      dragState = {
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
      };

      windowElement.style.left = `${rect.left}px`;
      windowElement.style.top = `${rect.top}px`;
      windowElement.style.transform = "none";
      handle.setPointerCapture(event.pointerId);
    });

    handle.addEventListener("pointermove", (event) => {
      if (!dragState) return;

      const maxLeft = window.innerWidth - windowElement.offsetWidth - 8;
      const maxTop = window.innerHeight - 120;
      const nextLeft = Math.min(Math.max(8, event.clientX - dragState.offsetX), Math.max(8, maxLeft));
      const nextTop = Math.min(Math.max(8, event.clientY - dragState.offsetY), Math.max(8, maxTop));

      windowElement.style.left = `${nextLeft}px`;
      windowElement.style.top = `${nextTop}px`;
    });

    handle.addEventListener("pointerup", (event) => {
      dragState = null;
      if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
    });

    handle.addEventListener("dblclick", (event) => {
      if (!event.target.closest("button")) maximizeWindow(windowElement);
    });
  });

  menuTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const menu = document.getElementById(trigger.dataset.menu);
      const alreadyOpen = menu?.classList.contains("is-open");
      closeMenus();
      if (!menu || alreadyOpen) return;

      const rect = trigger.getBoundingClientRect();
      menu.style.left = `${Math.max(4, rect.left)}px`;
      menu.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".menu-popover") && !event.target.closest(".menu-trigger")) closeMenus();
  });

  document.querySelectorAll("[data-action]").forEach((control) => {
    control.addEventListener("click", () => {
      const action = control.dataset.action;
      if (action === "show-all") {
        ["about", "projects", "ai", "stack", "contact"].forEach(openWindow);
      }
      if (action === "minimize-all") {
        windows.forEach((item) => {
          if (!item.classList.contains("is-hidden")) minimizeWindow(item);
        });
      }
      if (action === "close-all") {
        windows.forEach((item) => {
          if (!item.classList.contains("is-hidden")) closeWindow(item);
        });
      }
      closeMenus();
    });
  });

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("active", item === button));

      let visible = 0;
      projectCards.forEach((card) => {
        const categories = card.dataset.category?.split(" ") ?? [];
        const show = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-filtered-out", !show);
        if (show) visible += 1;
      });

      if (projectCount) projectCount.textContent = `${visible} ${visible === 1 ? "elemento" : "elementos"}`;
    });
  });

  const updateClock = () => {
    if (!clock) return;
    const now = new Date();
    clock.textContent = new Intl.DateTimeFormat("es-PE", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
  };

  updateClock();
  window.setInterval(updateClock, 30000);
  updateDock();
})();
