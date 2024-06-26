'use strict';

///////////////////////////////////////
// grabbing elements

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabBtnParent = document.querySelector('.operations');
const tabBtns = document.querySelectorAll('.operations__tab');
const tabComps = document.querySelectorAll('.operations__content');
const navbar = document.querySelector('.nav');
const header = document.querySelector('.header');

// Modal Window //
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////// button scrolling /////////////////////

btnScrollTo.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect();
  // console.log(s1Coords);
  // window.scrollTo({
  //   left: s1Coords.left + window.scrollX,
  //   top: s1Coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Navbar buttons //

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains('nav__link')) {
    const id = target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// Tabbed component //

tabBtnParent.addEventListener('click', function (e) {
  const target = e.target.closest('.operations__tab');
  if (!target) return;
  // deactivate all tabs
  tabBtns.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabComps.forEach(comp =>
    comp.classList.remove('operations__content--active')
  );
  // activate selected tab
  target.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${target.dataset.tab}`)
    .classList.add('operations__content--active');
});
// Menu fade animation //
const fadeNav = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
navbar.addEventListener('mouseover', fadeNav.bind(0.5));
navbar.addEventListener('mouseout', fadeNav.bind(1));
// Sticky navigation //
// const sectOneCoords = section1.getBoundingClientRect();
// console.log(sectOneCoords);
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if (window.scrollY > sectOneCoords.top) {
//     navbar.classList.add('sticky');
//   } else {
//     navbar.classList.remove('sticky');
//   }
// });
// Sticky navigation bar via intersection obs api //
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOpts = {
//   root: null,
//   threshold: 0.1,
// };
// const observer = new IntersectionObserver(obsCallback, obsOpts);
// observer.observe(section1);
const navbarHeight = navbar.getBoundingClientRect().height;
const navCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) navbar.classList.add('sticky');
  else navbar.classList.remove('sticky');
};
const navOpts = {
  root: null,
  threshold: 0,
  rootMargin: `-${navbarHeight}px`,
};
const headerObs = new IntersectionObserver(navCallback, navOpts);
headerObs.observe(header);
// revealing animation as you go down the page using interseciton observer //
const allSections = document.querySelectorAll('.section');
const revealCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // for better performance
};
const revealObserver = new IntersectionObserver(revealCallback, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(sect => {
  revealObserver.observe(sect);
  // sect.classList.add('section--hidden');
});
// lazy loading the images //
const lazyImgs = document.querySelectorAll('.features__img');
const lazyLoadCallback = function (entries, observer) {
  const [entry] = entries;
  let currentImg = entry.target;
  if (!entry.isIntersecting) return;
  currentImg.src = currentImg.dataset.src;
  currentImg.addEventListener('load', () => {
    currentImg.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const lazyLoadObserver = new IntersectionObserver(lazyLoadCallback, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});
lazyImgs.forEach(img => {
  lazyLoadObserver.observe(img);
});
// slider implementation //

// grabbing elements
const sliderComp = function () {
  const sliderBtnRight = document.querySelector('.slider__btn--right');
  const sliderBtnLeft = document.querySelector('.slider__btn--left');
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const dotBox = document.querySelector('.dots');
  // some needed variables
  let currentSlide = 0;
  const maxSlide = slides.length;

  // // // Functions // // //
  // creating the dot elements for the slider
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotBox.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  // activate the dot relative to the current slide
  const activateDot = function (slide) {
    const dots = document.querySelectorAll('.dots__dot');
    dots.forEach(function (dot) {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"`)
      .classList.add('dots__dot--active');
  };
  // accepts the destination slide as an argument and goes there
  const goToSlide = function (curSlide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - curSlide) * 100}%)`;
    });
  };
  // call when you wanna go to next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  // call when you wanna go to previous slide

  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  //some initialization needed for start up
  const initialization = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  initialization();
  // Event handlers
  sliderBtnRight.addEventListener('click', nextSlide);
  sliderBtnLeft.addEventListener('click', previousSlide);
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && previousSlide();
  });
  dotBox.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  });
};
sliderComp();

// // Lifecycle DOM Events
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parsed and DOM tree built!', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('Page fully loaded', e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
