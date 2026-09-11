/* =========================================================================
   Angela Flossmann — Website
   Kleines Skript: mobiles Menü, Header-Linie beim Scrollen, Bestätigung
   beim Absenden des Kontaktformulars.
   ========================================================================= */

(function () {
  "use strict";

  /* ---- Jahr im Footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobiles Menü ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Menü schließen, wenn ein Link angeklickt wird
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Header bekommt Schatten, sobald gescrollt wird ---- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Kontaktformular ---- */
  /* Hinweis: Der tatsächliche E-Mail-Versand wird vor der Veröffentlichung
     eingerichtet (z. B. Formspree oder eine Vercel-Function). Aktuell zeigt
     das Formular nur eine Bestätigung an. */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      note.hidden = false;
      note.textContent =
        "Vielen Dank für Ihre Nachricht — ich melde mich zeitnah persönlich bei Ihnen.";
      form.reset();
      note.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
})();
