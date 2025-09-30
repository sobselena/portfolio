const header = document.querySelector('.header');
const burger = document.querySelector('.header__burger');
const headerLinks = document.querySelectorAll('.header__link');
const headerNavigation = document.querySelector('.header__navigation');
const faqQuestions = document.querySelectorAll('.faq__question');
const faqItems = document.querySelectorAll('.faq__item');
/* ===== Header Navigation ===== */
burger.addEventListener('click', () => {
  console.log('Something supposed to happen');
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

let faqActiveIndex = JSON.parse(localStorage.getItem('faqActiveIndex')) || 0;
faqItems[faqActiveIndex].classList.add('faq__item_active');
faqQuestions.forEach((faqQuestion, activeIndex) => {
  faqQuestion.addEventListener('click', () => {
    const faqClickedItem = faqQuestion.closest('.faq__item');
    if (faqClickedItem.classList.contains('faq__item_active')) {
      faqActiveIndex = 0;
      faqClickedItem.classList.remove('faq__item_active');
    } else {
      faqItems.forEach((faqItem) =>
        faqItem.classList.remove('faq__item_active')
      );
      faqActiveIndex = activeIndex;
      faqClickedItem.classList.add('faq__item_active');
    }

    localStorage.setItem('faqActiveIndex', JSON.stringify(faqActiveIndex));
  });
});
