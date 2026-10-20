
/* =========================================
   MANSORY — BEYOND LUXURY
   Interacciones y animaciones
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  // 1. PANTALLA DE ENTRADA
  function hideLoader() {
    if (loadingScreen) {
      loadingScreen.classList.add("loaded");
    }
  }

  // No dejar la pantalla de entrada bloqueada si las imágenes tardan.
  window.setTimeout(hideLoader, 1800);
  window.addEventListener("load", hideLoader, { once: true });

  // 2. MENÚ PARA MÓVILES
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.textContent = isOpen ? "✕" : "☰";
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 3. ANIMACIONES CUANDO APARECEN LAS SECCIONES
  const revealElements = document.querySelectorAll(
    ".manifesto, .section-heading, .car-card, " +
    ".collection-footer, .feature-content, .closing"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 4. AVISO VISUAL PARA FOTOS QUE NO CARGUEN
  document.querySelectorAll(".car-image img").forEach((img) => {
    const showImageFallback = () => {
      img.classList.add("image-error");

      const container = img.closest(".car-image");
      if (container && !container.querySelector(".image-fallback")) {
        const message = document.createElement("span");
        message.className = "image-fallback";
        message.textContent = "IMAGEN NO DISPONIBLE";
        container.appendChild(message);
      }
    };

    img.addEventListener("error", showImageFallback);

    if (img.complete && img.naturalWidth === 0) {
      showImageFallback();
    }
  });

  // 5. AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
  const copyright = document.querySelector(".copyright");

  if (copyright) {
    copyright.textContent =
      `© ${new Date().getFullYear()} · CONCEPT EXPERIENCE`;
  }

  // 6. EFECTO SUTIL DEL BOTÓN DE NAVEGACIÓN
  const exploreButton = document.querySelector(".nav-cta");

  if (exploreButton) {
    exploreButton.addEventListener("mouseenter", () => {
      exploreButton.style.boxShadow =
        "0 0 24px rgba(197, 255, 0, 0.12)";
    });

    exploreButton.addEventListener("mouseleave", () => {
      exploreButton.style.boxShadow = "none";
    });
  }

  console.log("MANSORY Concept Experience inicializada.");
});
