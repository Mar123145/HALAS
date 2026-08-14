(function () {
  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  ready(function () {
    const nav = document.querySelector("nav");
    if (!nav || nav.dataset.mobileNavReady === "true") return;

    const desktopMenu = nav.querySelector(".hidden.md\\:flex");
    if (!desktopMenu) return;

    nav.dataset.mobileNavReady = "true";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "md:hidden inline-flex items-center justify-center p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors";
    toggle.setAttribute("aria-label", "Open navigation menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';

    const mobileMenu = document.createElement("div");
    mobileMenu.className = "hidden md:hidden border-b border-gray-200 bg-white shadow-lg px-4 py-4 space-y-2";

    Array.from(desktopMenu.children).forEach(function (item) {
      const clone = item.cloneNode(true);
      clone.removeAttribute("id");
      clone.className = "flex items-center justify-center w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 font-medium hover:bg-gray-50";

      if (clone.tagName === "BUTTON" && /log out/i.test(clone.textContent || "")) {
        clone.addEventListener("click", function () {
          const originalLogout = document.getElementById("logoutBtn");
          if (originalLogout) originalLogout.click();
        });
      }

      mobileMenu.appendChild(clone);
    });

    nav.appendChild(toggle);
    nav.insertAdjacentElement("afterend", mobileMenu);

    toggle.addEventListener("click", function () {
      const isHidden = mobileMenu.classList.toggle("hidden");
      toggle.setAttribute("aria-expanded", String(!isHidden));
      toggle.innerHTML = isHidden
        ? '<i data-lucide="menu" class="w-6 h-6"></i>'
        : '<i data-lucide="x" class="w-6 h-6"></i>';
      if (window.lucide) window.lucide.createIcons();
    });

    if (window.lucide) window.lucide.createIcons();
  });
})();

