/* ==================================================
   Pedro Castillo Portfolio
   script.js
================================================== */

/* ---------- Header al hacer scroll ---------- */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

/* ---------- Menú móvil ---------- */

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".desktop-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

document.addEventListener("click", (e) => {
  if (!nav || !menuButton) return;

  if (
    nav.classList.contains("open") &&
    !nav.contains(e.target) &&
    !menuButton.contains(e.target)
  ) {
    nav.classList.remove("open");
  }
});

/* ---------- Scroll suave ---------- */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Cerrar menú móvil al seleccionar una sección
    if (nav) {
      nav.classList.remove("open");
    }
  });
});

/* ---------- Reveal al hacer scroll ---------- */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

document.querySelectorAll(".section").forEach((section) => {
  section.classList.add("hidden");

  observer.observe(section);
});

/* ---------- Año automático ---------- */

const footerYear = document.getElementById("year");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

/* ---------- Consola ---------- */

console.log(
  "%cPedro Castillo Portfolio",
  "color:#C1121F;font-size:16px;font-weight:bold;",
);
console.log("Portfolio cargado correctamente.");

/* ==================================================
   Lucide Icons
================================================== */

lucide.createIcons();

/* ---------- Utilidades ---------- */

function lockScroll() {
  document.body.style.overflow = "hidden";
}

function unlockScroll() {
  document.body.style.overflow = "";
}

/* ==================================================
   Modal de proyectos
================================================== */

const modal = document.querySelector(".video-modal");

const iframe = document.getElementById("videoFrame");

const closeModal = document.querySelector(".video-close");

const overlay = document.querySelector(".video-overlay");

/* ==================================================
CV Modal
================================================== */

const cvModal = document.getElementById("cvModal");
const openCv = document.getElementById("openCv");
const closeCv = document.getElementById("closeCv");
const cvOverlay = document.querySelector(".cv-overlay");

function openCvModal() {
  cvModal.classList.add("active");
  lockScroll();
}

function closeCvModal() {
  cvModal.classList.remove("active");
  unlockScroll();
}

openCv.addEventListener("click", openCvModal);

closeCv.addEventListener("click", closeCvModal);

cvOverlay.addEventListener("click", closeCvModal);

overlay.addEventListener("click", closeVideoModal);

const videoButtons = document.querySelectorAll(".project-video");

function openVideo(videoId) {
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&origin=${window.location.origin}`;

  modal.classList.add("active");

  lockScroll();
}

function closeVideoModal() {
  modal.classList.remove("active");

  iframe.src = "";

  unlockScroll();
}

videoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openVideo(button.dataset.video);
  });
});

closeModal.addEventListener("click", closeVideoModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeVideoModal();
  }
});

/* ==================================================
   BTS Gallery
================================================== */

const galleryItems = document.querySelectorAll(".gallery-item");

const galleryLightbox = document.querySelector(".gallery-lightbox");

const galleryImage = document.querySelector(".gallery-lightbox-image");

const galleryBackground = document.querySelector(
  ".gallery-lightbox-background",
);

const galleryClose = document.querySelector(".gallery-close");

const galleryPrev = document.querySelector(".gallery-prev");

const galleryNext = document.querySelector(".gallery-next");

const galleryCounter = document.querySelector(".gallery-counter");

let currentImage = 0;

function updateGalleryCounter() {
  galleryCounter.textContent = `${currentImage + 1} / ${galleryItems.length}`;
}

function showImage(index) {
  currentImage = index;

  const img = galleryItems[currentImage].querySelector("img");

  galleryImage.src = img.src;
  galleryImage.alt = img.alt;

  galleryBackground.src = img.src;

  updateGalleryCounter();
}

function openGallery(index) {
  showImage(index);

  galleryLightbox.classList.add("active");

  lockScroll();
}

function closeGallery() {
  galleryLightbox.classList.remove("active");

  galleryImage.src = "";
  galleryBackground.src = "";

  unlockScroll();
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    openGallery(index);
  });
});

galleryClose.addEventListener("click", closeGallery);

galleryLightbox.addEventListener("click", (e) => {
  if (e.target === galleryLightbox) {
    closeGallery();
  }
});

galleryPrev.addEventListener("click", () => {
  currentImage = (currentImage - 1 + galleryItems.length) % galleryItems.length;

  showImage(currentImage);
});

galleryNext.addEventListener("click", () => {
  currentImage = (currentImage + 1) % galleryItems.length;

  showImage(currentImage);
});

document.addEventListener("keydown", (e) => {
  if (!galleryLightbox.classList.contains("active")) return;

  if (e.key === "Escape") {
    closeGallery();
  }

  if (e.key === "ArrowLeft") {
    galleryPrev.click();
  }

  if (e.key === "ArrowRight") {
    galleryNext.click();
  }
});
