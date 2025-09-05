// Get menu elements
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== SHOW MENU =====*/
if(navToggle){
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

/*===== HIDE MENU (on close button click) =====*/
if(navClose){
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*===== HIDE MENU WHEN A NAVIGATION LINK IS CLICKED =====*/
const navLinks = document.querySelectorAll('.nav__link')

navLinks.forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('show-menu')
}))

/*===== CHANGE HEADER BACKGROUND ON SCROLL =====*/
const blurHeader = () => {
  const header = document.getElementById('header')
  // When the scroll is greater than 50 viewport height, add blur-header class to header
  window.scrollY >= 50 ? header.classList.add('blur-header')
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*===== SWIPER FAVORITE SLIDER =====*/
let swiperFavorite = new Swiper('.favorite__swiper', {
  loop: true,
  slidesPerView:'auto',
  centeredSlides: true,
  grabCursor: true,

  breakpoints: {
    768: {
      slidesPerView: 3
    }
  }
})

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollDown = window.scrollY

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute('id'),
          sectionLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`)

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionLink.classList.add('active-link')
    } else {
      sectionLink.classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)
/*====================SCROLL REVEAL ANIMATION========== */
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
   //rest:true,
})
sr.reveal(`.home__social, .favorite__container, .sponsor__container` )
sr.reveal(`.home__title span:nth-child(1)`,{origin: `left`,opacity: 1})
sr.reveal(`.home__title span:nth-child(3)`,{origin: `right`,opacity: 1})
sr.reveal(`.home__tooltip, .home__button, .model__button `, {origin: 'bottom'})
sr.reveal(`.about__data` , {origin: `left`})
sr.reveal(`.about__img, .model__tooltip` ,{origin: `right`})