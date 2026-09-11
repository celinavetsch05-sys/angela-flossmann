/* =========================================================================
   Angela Flossmann
   Kleines Skript: Prototyp-Leiste schließen, mobiles Menü, Header-Schatten
   beim Scrollen, Hinweis beim Absenden des (noch inaktiven) Formulars.
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

  /* ---- Zahl in der Statistikleiste beim Einblenden hochzählen ---- */
  var countEls = document.querySelectorAll(".trust__num[data-count-to]");
  if (countEls.length) {
    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var animateCount = function (el) {
      var target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
      if (reduceMotion || !window.requestAnimationFrame) {
        el.textContent = target;
        return;
      }
      var duration = 1100;
      var start = null;
      var step = function (timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window) {
      var countObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      countEls.forEach(function (el) {
        countObserver.observe(el);
      });
    } else {
      countEls.forEach(function (el) {
        animateCount(el);
      });
    }
  }

  /* ---- Kontaktformular: nur Hinweis, kein echter Versand ---- */
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
        "Danke für Ihre Nachricht. Der Formularversand wird derzeit noch " +
        "eingerichtet; bitte kontaktieren Sie mich in der Zwischenzeit gerne " +
        "telefonisch oder per E-Mail.";
      form.reset();
      note.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
})();
