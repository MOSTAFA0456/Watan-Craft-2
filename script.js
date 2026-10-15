
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const copyStatus = document.getElementById("copy-status");

  // باز و بسته کردن منوی موبایل
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "بستن منو" : "باز کردن منو"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "باز کردن منو");
        menuToggle.textContent = "☰";
      });
    });
  }

  // کپی آدرس سرور
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const elementId = button.getAttribute("data-copy");
      const target = document.getElementById(elementId);

      if (!target) return;

      const text = target.textContent.trim();

      try {
        await navigator.clipboard.writeText(text);
        showCopyMessage("آدرس سرور کپی شد! ✅");
      } catch (error) {
        // روش جایگزین در صورت مسدود بودن Clipboard
        const temporary = document.createElement("textarea");
        temporary.value = text;
        temporary.style.position = "fixed";
        temporary.style.opacity = "0";
        document.body.appendChild(temporary);
        temporary.select();

        try {
          const copied = document.execCommand("copy");
          showCopyMessage(
            copied
              ? "آدرس سرور کپی شد! ✅"
              : "کپی خودکار انجام نشد؛ آدرس را دستی کپی کن."
          );
        } catch {
          showCopyMessage("آدرس را انتخاب و دستی کپی کن.");
        } finally {
          temporary.remove();
        }
      }
    });
  });

  function showCopyMessage(message) {
    if (copyStatus) {
      copyStatus.textContent = message;
    }
  }
});
