'use strict';

///////////////////////////////////////
// grabbing elements

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
const tabBtnParent = document.querySelector('.operations');
const tabBtns = document.querySelectorAll('.operations__tab');
const tabComps = document.querySelectorAll('.operations__content');
console.log(tabBtns);
console.log(tabComps);
tabBtnParent.addEventListener('click', function (e) {
  const target = e.target.closest('.operations__tab');
  console.log(target);
  for (let i = 1; i <= tabBtns.length; i++) {
    if (target.classList.contains(`operations__tab--${i}`)) {
      for (const comp of tabComps) {
        comp.classList.remove('operations__content--active');
        comp.classList.contains(`operations__content--${i}`)
          ? comp.classList.add('operations__content--active')
          : 0;
      }
      for (const btn of tabBtns) {
        btn.classList.remove('operations__tab--active');
        btn.classList.contains(`operations__tab--${i}`)
          ? btn.classList.add('operations__tab--active')
          : 0;
      }
    }
  }
});
// console.log();
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

////////////
// const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', e => {
//   alert('mouse entered');
// });
