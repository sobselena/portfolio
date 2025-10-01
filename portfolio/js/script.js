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

overlay.addEventListener('click', (e) => {
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
