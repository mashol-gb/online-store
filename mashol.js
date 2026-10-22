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
      if(!header) return
      
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

// فتح وغلق نافذة تسجيل الدخول
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const loginClose = document.getElementById('login-close');

if (loginBtn) {
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('show-modal');
  });
}

if (loginClose) {
  loginClose.addEventListener('click', () => {
    loginModal.classList.remove('show-modal');
  });
}

// التبديل بين Login و Register داخل النافذة
const authForm = document.getElementById('auth-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const toggleBtn = document.getElementById('toggle-btn');
const toggleText = document.getElementById('toggle-text');
const message = document.getElementById('message');

let isLoginMode = true;

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    message.textContent = '';
    
    if (isLoginMode) {
      formTitle.textContent = 'Login';
      submitBtn.textContent = 'Sign In';
      toggleText.textContent = "Don't have an account?";
      toggleBtn.textContent = 'Register';
    } else {
      formTitle.textContent = 'Register';
      submitBtn.textContent = 'Sign Up';
      toggleText.textContent = 'Already have an account?';
      toggleBtn.textContent = 'Login';
    }
  });
}

// الربط مع السيرفر
if (authForm) {
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;
    const endpoint = isLoginMode ? '/api/login' : '/api/register';

    try {
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        message.style.color = '#4caf50'; // لون أخضر مناسب للمود المظلم
        message.textContent = data.message;
        authForm.reset();
        
        // غلق النافذة بعد النجاح بـ 1.5 ثانية
        setTimeout(() => {
          loginModal.classList.remove('show-modal');
          message.textContent = '';
        }, 1500);
      } else {
        message.style.color = '#f44336';
        message.textContent = data.message;
      }
    } catch (err) {
      message.style.color = '#f44336';
      message.textContent = 'Server connection error!';
    }
  });
}
