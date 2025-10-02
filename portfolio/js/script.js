const header = document.querySelector('.header');
const headerIcon = document.querySelector('.header__icon');
const headerLinks = document.querySelectorAll('.header__link');
const headerNavigation = document.querySelector('.header__navigation');
const faqQuestions = document.querySelectorAll('.faq__question');
const faqItems = document.querySelectorAll('.faq__item');
const priceSection = document.querySelector('.price');
const bookNowBtns = priceSection.querySelectorAll('.book-now-btn');
const overlay = document.querySelector('.overlay');
const footer = document.querySelector('.footer');
const footerCloseBtn = document.querySelector('.footer__icon');
const footerForm = document.querySelector('.footer__form');
const scrollDownBtn = document.querySelector('.hero__scroll-down');
const aboutSection = document.getElementById('about-me');
const footerInputs = document.querySelectorAll('.footer__input');
const sliderAreas = document.querySelector('.slider-areas');
const sliderAreaLeft = document.querySelector('.slider-areas__left');
const sliderAreaRight = document.querySelector('.slider-areas__right');
const portfolioList = document.querySelector('.portfolio__list');
const portfolioImgs = portfolioList.querySelectorAll('.img');
const portfolioWrapper = document.querySelector('.portfolio__wrapper');
const mobileSlider = document.querySelector('.mobile-slider');
/* ===== Header Navigation ===== */
headerIcon.addEventListener('click', () => {
  header.classList.toggle('nav-open');
  if (header.classList.contains('nav-open')) {
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.documentElement.style.overflow = '';
  }
});

headerLinks.forEach((headerLink) => {
  headerLink.addEventListener('click', () => {
    if (header.classList.contains('nav-open')) {
      header.classList.remove('nav-open');
      document.documentElement.style.overflow = '';
    }
  });
});
/* ===== Slider ===== */
const mediaQuery = window.matchMedia('(hover:hover) and (pointer:fine)');
// Desktop logic
function calculateWidth() {
  // Calculate overall slider width of imgs including gaps
  const gapsWidth =
    parseInt(window.getComputedStyle(portfolioList).gap) *
    (portfolioImgs.length - 1);
  const imgsWidth = Array.from(portfolioImgs).reduce(
    (width, img) => width + img.offsetWidth,
    0
  );
  return imgsWidth + gapsWidth;
}

const portfolioListWidth = calculateWidth();

const SCROLL_TIME = 10 * 1000;
const INTERVAL_TIME = 10;

let leftInterval;
let rightInterval;
let currentTranslateX = 0;
let maxTranslate;
function calculateMaxTranslate() {
  maxTranslate = Math.max(
    0,

    (portfolioListWidth -
      parseInt(window.getComputedStyle(portfolioWrapper).width)) /
      2
  );
}

calculateMaxTranslate();
window.addEventListener('resize', calculateMaxTranslate);
sliderAreaLeft.addEventListener('mouseenter', () => {
  leftInterval = setInterval(() => {
    currentTranslateX = Math.min(
      currentTranslateX + (portfolioListWidth / SCROLL_TIME) * INTERVAL_TIME,
      maxTranslate
    );
    portfolioList.style.transform = `translateX(${currentTranslateX}px)`;
  }, INTERVAL_TIME);
});
sliderAreaLeft.addEventListener('mouseleave', () => {
  clearInterval(leftInterval);
});

sliderAreaRight.addEventListener('mouseenter', () => {
  rightInterval = setInterval(() => {
    currentTranslateX = Math.max(
      currentTranslateX - (portfolioListWidth / SCROLL_TIME) * INTERVAL_TIME,
      -maxTranslate
    );
    portfolioList.style.transform = `translateX(${currentTranslateX}px)`;
  }, INTERVAL_TIME);
});
sliderAreaRight.addEventListener('mouseleave', () => {
  clearInterval(rightInterval);
});
if (!mediaQuery.matches) {
  sliderAreas.style.display = 'none';
  mobileSlider.style.display = 'block';
}

// Mobile logic

let startX = 0;
let currentX = 0;
let isDragging = false;
mobileSlider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});
mobileSlider.addEventListener('touchmove', (e) => {
  if (!isDragging) return;

  currentX = e.touches[0].clientX;
  currentTranslateX = Math.max(
    Math.min(currentTranslateX + (currentX - startX) / 10, maxTranslate),
    -maxTranslate
  );
  portfolioList.style.transform = `translateX(${currentTranslateX}px)`;
});
mobileSlider.addEventListener('touchend', () => {
  isDragging = false;
});

mediaQuery.addEventListener('change', (e) => {
  if (e.matches) {
    sliderAreas.style.display = 'grid';
    mobileSlider.style.display = 'none';
  } else {
    sliderAreas.style.display = 'none';
    mobileSlider.style.display = 'block';
  }
});
/* ===== Accordion ===== */
function removeFaqItemActive() {
  faqItems.forEach((faqItem) => faqItem.classList.remove('faq__item_active'));
}
removeFaqItemActive();
let faqActiveIndex = JSON.parse(localStorage.getItem('faqActiveIndex')) ?? 0;
faqActiveIndex === 'none' ||
  faqItems[faqActiveIndex].classList.add('faq__item_active');
faqQuestions.forEach((faqQuestion, activeIndex) => {
  faqQuestion.addEventListener('click', () => {
    const faqClickedItem = faqQuestion.closest('.faq__item');
    if (faqClickedItem.classList.contains('faq__item_active')) {
      faqActiveIndex = 'none';
      faqClickedItem.classList.remove('faq__item_active');
    } else {
      removeFaqItemActive();
      faqActiveIndex = activeIndex;
      faqClickedItem.classList.add('faq__item_active');
    }

    localStorage.setItem('faqActiveIndex', JSON.stringify(faqActiveIndex));
  });
});

/* ===== Modals ===== */
function closeForm() {
  overlay.classList.remove('modal-active');
  footer.classList.remove('modal-active');
  document.documentElement.style.overflow = '';
}
function openForm() {
  overlay.classList.add('modal-active');
  footer.classList.add('modal-active');
  document.documentElement.style.overflow = 'hidden';
}
bookNowBtns.forEach((bookNowBtn) => {
  bookNowBtn.addEventListener('click', openForm);
});

footerCloseBtn.addEventListener('click', closeForm);

footerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  footerInputs.forEach((footerInput) => {
    footerInput.value = '';
  });
  closeForm();
});

overlay.addEventListener('click', () => {
  closeForm();
});
/* ===== Scroll down button ===== */
scrollDownBtn.addEventListener('click', (e) => {
  const aboutCoords = aboutSection.getBoundingClientRect();
  window.scrollTo({
    left: window.scrollX + aboutCoords.left,
    top: window.scrollY + aboutCoords.top,
    behavior: 'smooth',
  });
});
