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
const navbar = document.querySelector('.nav');
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
