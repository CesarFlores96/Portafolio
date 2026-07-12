(() => {
  const motionStyles = document.createElement("style");
  motionStyles.textContent = `
    .window {
      transform: translate3d(-50%, 0, 0);
      transition: opacity 0.15s ease-out, transform 0.19s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.18s ease-out, height 0.18s ease-out, top 0.18s ease-out, left 0.18s ease-out !important;
    }
    .window.is-opening { animation-duration: 0.2s !important; }
    .window.is-closing { transform: translate3d(-50%, 24px, 0) scale(0.9) !important; }
    .window.is-minimized { transform: translate3d(-50%, calc(100vh - 120px), 0) scale(0.28) !important; }
    .window.is-dragging {
      transition: none !important;
      will-change: transform;
      background: rgba(20, 25, 44, 0.96);
      box-shadow: 0 18px 52px rgba(4, 7, 20, 0.38), inset 0 1px rgba(255, 255, 255, 0.08);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
    .window.is-dragging, .window.is-dragging * { user-select: none; }
    .drag-handle { cursor: grab; touch-action: none; }
    .window.is-dragging .drag-handle { cursor: grabbing; }
  `;
  document.head.appendChild(motionStyles);

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
    window.setTimeout(() => windowElement.classList.remove("is-opening"), 220);
    updateDock();
    closeMenus();
  };

  const closeWindow = (windowElement) => {
    windowElement.classList.add("is-closing");
    window.setTimeout(() => {
      windowElement.classList.add("is-hidden");
      windowElement.classList.remove("is-closing", "is-minimized", "is-maximized");
      updateDock();
    }, 170);
  };

  const minimizeWindow = (windowElement) => {
    windowElement.classList.add("is-minimized");
    window.setTimeout(updateDock, 120);
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
    let dragFrame = 0;

    const paintDragPosition = () => {
      dragFrame = 0;
      if (!dragState) return;

      const deltaX = dragState.nextLeft - dragState.originLeft;
      const deltaY = dragState.nextTop - dragState.originTop;
      windowElement.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    };

    const finishDrag = (event) => {
      if (!dragState) return;

      if (dragFrame) {
        window.cancelAnimationFrame(dragFrame);
        dragFrame = 0;
      }

      const { nextLeft, nextTop } = dragState;
      windowElement.style.left = `${nextLeft}px`;
      windowElement.style.top = `${nextTop}px`;
      windowElement.style.transform = "none";
      dragState = null;

      if (handle.hasPointerCapture(event.pointerId)) {
        handle.releasePointerCapture(event.pointerId);
      }

      window.requestAnimationFrame(() => windowElement.classList.remove("is-dragging"));
    };

    handle.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button") || window.innerWidth <= 820 || windowElement.classList.contains("is-maximized")) return;

      event.preventDefault();
      const rect = windowElement.getBoundingClientRect();
      dragState = {
        pointerId: event.pointerId,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
        originLeft: rect.left,
        originTop: rect.top,
        nextLeft: rect.left,
        nextTop: rect.top,
        width: rect.width,
      };

      windowElement.style.left = `${rect.left}px`;
      windowElement.style.top = `${rect.top}px`;
      windowElement.style.transform = "none";
      windowElement.classList.add("is-dragging");
      handle.setPointerCapture(event.pointerId);
    });

    handle.addEventListener("pointermove", (event) => {
      if (!dragState || event.pointerId !== dragState.pointerId) return;

      const maxLeft = Math.max(8, window.innerWidth - dragState.width - 8);
      const maxTop = Math.max(8, window.innerHeight - 120);
      dragState.nextLeft = Math.min(Math.max(8, event.clientX - dragState.offsetX), maxLeft);
      dragState.nextTop = Math.min(Math.max(8, event.clientY - dragState.offsetY), maxTop);

      if (!dragFrame) dragFrame = window.requestAnimationFrame(paintDragPosition);
    });

    handle.addEventListener("pointerup", finishDrag);
    handle.addEventListener("pointercancel", finishDrag);

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