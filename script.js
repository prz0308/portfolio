/* ==========================================================
   MICAELA DEV — script.js
   Sin dependencias externas. Vanilla JS.
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------
     1. MENÚ HAMBURGUESA (mobile)
  -------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cerrar el menú al tocar un link (scroll suave ya lo maneja el CSS)
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------------
     2. ACORDEÓN DE PREGUNTAS FRECUENTES
     Solo una pregunta abierta a la vez, para mantenerlo limpio.
  -------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Cierra las demás
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      // Togglea la actual
      if (isOpen) {
        item.classList.remove('is-open');
        question.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* --------------------------------------------------------
     3. ANIMACIÓN FADE-IN AL HACER SCROLL
     Usa IntersectionObserver: liviano y sin listeners de scroll.
  -------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // solo entra una vez
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: si el navegador no soporta IntersectionObserver, se muestra todo directo
    fadeEls.forEach(el => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------------
     4. NAVBAR: sombra sutil al hacer scroll
  -------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  if (navbar) {
    const toggleNavbarShadow = () => {
      if (window.scrollY > 12) {
        navbar.style.boxShadow = '0 4px 16px rgba(26, 29, 35, 0.06)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    };
    toggleNavbarShadow();
    window.addEventListener('scroll', toggleNavbarShadow, { passive: true });
  }

  /* --------------------------------------------------------
     5. AÑO ACTUAL EN EL FOOTER
  -------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------
     6. FORMULARIO DE CONTACTO (sin backend todavía)
     Por ahora solo evita el envío real y muestra confirmación.
     Cuando conectes un backend o servicio (ej. Formspree,
     EmailJS, o un endpoint propio), reemplazá esta función.
  -------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = '¡Mensaje enviado!';
      submitBtn.disabled = true;

      // TODO: acá va la integración real (fetch a un endpoint, Formspree, etc.)

      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2500);
    });
  }

});
