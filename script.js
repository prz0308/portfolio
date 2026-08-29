/* ==========================================================
   MPWEBPAGES — script.js
   Vanilla JS — sin dependencias externas
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------------
     1. MENÚ HAMBURGUESA
  -------------------------------------------------------- */

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú",
      );

      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navLinks.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");

        navToggle.setAttribute("aria-expanded", "false");

        navToggle.setAttribute("aria-label", "Abrir menú");

        document.body.style.overflow = "";
      });
    });
  }

  /* --------------------------------------------------------
     2. FILTRO DEL PORTFOLIO
  -------------------------------------------------------- */

  const portfolioFilters = document.querySelectorAll(".portfolio-filter");

  const portfolioItems = document.querySelectorAll(
    ".portfolio-card, .portfolio-empty",
  );

  function filterPortfolio(category) {
    /* Cambiar botón activo */

    portfolioFilters.forEach((button) => {
      button.classList.toggle(
        "active",
        button.getAttribute("data-filter") === category,
      );
    });

    /* Mostrar únicamente la categoría seleccionada */

    portfolioItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (itemCategory === category) {
        item.classList.remove("is-hidden");
      } else {
        item.classList.add("is-hidden");
      }
    });
  }

  /* Cambiar categoría al hacer clic */

  portfolioFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.getAttribute("data-filter");

      filterPortfolio(category);
    });
  });

  /* Mostrar Página Básica al cargar la página */

  filterPortfolio("basica");

  /* --------------------------------------------------------
     3. FAQ
  -------------------------------------------------------- */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      /* Cerrar las demás */

      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");

          other
            .querySelector(".faq-question")
            .setAttribute("aria-expanded", "false");

          other.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      /* Abrir/cerrar actual */

      if (isOpen) {
        item.classList.remove("is-open");

        question.setAttribute("aria-expanded", "false");

        answer.style.maxHeight = null;
      } else {
        item.classList.add("is-open");

        question.setAttribute("aria-expanded", "true");

        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* --------------------------------------------------------
     4. FADE IN
  -------------------------------------------------------- */

  const fadeEls = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window && fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    fadeEls.forEach((el) => {
      observer.observe(el);
    });
  } else {
    fadeEls.forEach((el) => {
      el.classList.add("is-visible");
    });
  }

  /* --------------------------------------------------------
     5. SOMBRA NAVBAR
  -------------------------------------------------------- */

  const navbar = document.getElementById("navbar");

  if (navbar) {
    const toggleNavbarShadow = () => {
      if (window.scrollY > 12) {
        navbar.style.boxShadow = "0 4px 16px rgba(26, 29, 35, 0.06)";
      } else {
        navbar.style.boxShadow = "none";
      }
    };

    toggleNavbarShadow();

    window.addEventListener("scroll", toggleNavbarShadow, {
      passive: true,
    });
  }

  /* --------------------------------------------------------
     6. AÑO ACTUAL
  -------------------------------------------------------- */

  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------
     7. FORMULARIO DE CONTACTO
     Formspree
  -------------------------------------------------------- */

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".form-submit");

      const status = document.getElementById("formStatus");

      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;

      submitBtn.textContent = "Enviando...";

      if (status) {
        status.textContent = "";
      }

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",

          body: new FormData(contactForm),

          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          contactForm.reset();

          submitBtn.textContent = "¡Mensaje enviado!";

          if (status) {
            status.textContent =
              "Gracias por escribirme. Te voy a responder lo antes posible.";
          }

          setTimeout(() => {
            submitBtn.textContent = originalText;

            submitBtn.disabled = false;
          }, 3500);
        } else {
          throw new Error("Error al enviar");
        }
      } catch (error) {
        submitBtn.textContent = "Intentar nuevamente";

        submitBtn.disabled = false;

        if (status) {
          status.textContent =
            "No pudimos enviar el mensaje. Probá nuevamente o escribime por WhatsApp.";
        }
      }
    });
  }
});
