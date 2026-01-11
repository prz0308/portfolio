/* ===== Scroll Reveal ===== */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((section) => observer.observe(section));

/* ===== Avatar saludo ===== */
const avatar = document.querySelector(".avatar");

if (avatar) {
  avatar.addEventListener("animationend", () => {
    avatar.classList.remove("wave");
  });

  avatar.addEventListener("mouseenter", () => {
    avatar.classList.add("wave");
  });
}

/* ===== Contact Form ===== */
/* ===== Contact Form ===== */
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("form-success");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    successMsg.classList.add("show");
    form.reset();

    // opcional: ocultar después de 4s
    setTimeout(() => {
      successMsg.classList.remove("show");
    }, 4000);
  });
}
