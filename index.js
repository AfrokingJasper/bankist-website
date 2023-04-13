"use strict";

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const btnOpenModal = document.querySelectorAll(".btn-show-modal");
const btnCloseModal = document.querySelector(".btn_close_modal");

const section1 = document.getElementById("section-1");
const btnScrollTo = document.querySelector(".btn-scroll-to");
const navLinks = document.querySelector(".nav_links");

const nav = document.querySelector(".nav");

// FUNCTIONS//

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// EVENT HANDLERS

// open and close modals
btnOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
    console.log("yes");
  }
});

// btn scroll effect

btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

navLinks.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav_link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// TABBED COMPONENT
const tabsContainer = document.querySelector(".operations_tab_container");
const tab = document.querySelectorAll(".operations_tab");
const tabContent = document.querySelectorAll(".operations_content");

// tabsContainer.addEventListener("click", function (e) {});
tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();

  const clicked = e.target.closest(".operations_tab");
  if (!clicked) return;

  // make all tabs inactive
  tab.forEach((t) => t.classList.remove("operations_tab_active"));
  tabContent.forEach((c) => c.classList.remove("operations_content_active"));

  // activate the active tab
  clicked.classList.add("operations_tab_active");

  document
    .querySelector(`.operations_content_${clicked.dataset.tab}`)
    .classList.add("operations_content_active");

  console.log("yes");
});

// NAVIGATION FADE ANIMATION

const hoverFade = function (e, opacity) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav_link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", hoverFade.bind(0.5));
nav.addEventListener("mouseout", hoverFade.bind(1));

// //  STICKY NAVIGATION

const header = document.querySelector(".header");
const navHeigth = nav.getBoundingClientRect().height;

const stickNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
    // console.log("yes");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeigth}px`,
});

headerObserver.observe(header);

// REVEAL SECTIONS

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

// //////////////////////////////////////
// LAZY IMAGE EFFECT

const imgTarget = document.querySelectorAll("img[data-src]");

// console.log(imgTarget);

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

imgTarget.forEach((img) => imageObserver.observe(img));

//
/////////////////////////////////////
// SLIDERS

const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".slider_btn_right");
const btnLeft = document.querySelector(".slider_btn_left");
const dotContainer = document.querySelector(".dots");

let currentSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activateDots(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activateDots(currentSlide);
};
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
// goToSlide(0);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  }
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

const createDots = function () {
  slides.forEach((s, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

// createDots();

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;

    goToSlide(slide);
    activateDots(slide);
  }
});

const activateDots = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add("dots__dot--active");
};

// activateDots(0);

const init = function () {
  goToSlide(0);

  createDots();
  activateDots(0);
};
init();
