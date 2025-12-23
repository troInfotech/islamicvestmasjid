// ===== Islamic Center Website JavaScript =====

// Prayer Times Data (Update these times as needed)
const prayerTimesData = {
  fajr: { start: "6:15 AM", iqamah: "6:45 AM" },
  sunrise: { start: "7:45 AM" },
  zuhr: { start: "12:30 PM", iqamah: "1:00 PM" },
  asr: { start: "2:45 PM", iqamah: "3:15 PM" },
  maghrib: { start: "5:15 PM", iqamah: "5:20 PM" },
  isha: { start: "6:30 PM", iqamah: "7:00 PM" },
  jummah: { khutbah: "1:00 PM", prayer: "1:30 PM" }
};

// ===== Language Toggle =====
// Translations are loaded from js/translations.js

function initLanguageToggle() {
  const currentLang = localStorage.getItem('language') || 'en';
  document.documentElement.setAttribute('data-lang', currentLang);
  
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    updateLanguageButton(currentLang);
    
    langToggle.addEventListener('click', function() {
      const currentLang = document.documentElement.getAttribute('data-lang');
      const newLang = currentLang === 'en' ? 'da' : 'en';
      
      document.documentElement.setAttribute('data-lang', newLang);
      localStorage.setItem('language', newLang);
      updateLanguageButton(newLang);
      translatePage(newLang);
    });
  }
  
  // Translate page on load
  translatePage(currentLang);
}

function updateLanguageButton(lang) {
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.textContent = lang === 'en' ? 'DA' : 'EN';
  }
}

function translatePage(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[lang][key];
      } else {
        // Use innerHTML to support HTML tags like <br>
        element.innerHTML = translations[lang][key];
      }
    }
  });
}

// ===== Dark/Light Mode Toggle =====
function initThemeToggle() {
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Update toggle button icon
  updateThemeIcon(currentTheme);
  
  // Add event listener to theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
    }
  }
}

// ===== Mobile Navigation Toggle =====
document.addEventListener('DOMContentLoaded', function() {
  // New Mobile Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');

  function openMobileMenu() {
    if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('active');
    if (navToggle) navToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // ===== Initialize Dark Mode =====
  initThemeToggle();
  
  // ===== Initialize Language Toggle =====
  initLanguageToggle();

  // ===== Update Current Date =====
  updateDate();
  
  // ===== Highlight Current Prayer =====
  highlightCurrentPrayer();
  
  // ===== Scroll Animation =====
  initScrollAnimations();
  
  // ===== Active Navigation Link =====
  setActiveNavLink();
});

// ===== Update Date Display =====
function updateDate() {
  const dateElements = document.querySelectorAll('.current-date');
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const today = new Date().toLocaleDateString('en-US', options);
  
  dateElements.forEach(el => {
    el.textContent = today;
  });
  
  // Also update Islamic date approximation (you can integrate with an API for accurate dates)
  const islamicDateElements = document.querySelectorAll('.islamic-date');
  // This would need a proper Islamic calendar library for accuracy
}

// ===== Highlight Current Prayer =====
function highlightCurrentPrayer() {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  // Convert prayer times to minutes for comparison
  const prayerMinutes = {
    fajr: timeToMinutes(prayerTimesData.fajr.start),
    sunrise: timeToMinutes(prayerTimesData.sunrise.start),
    zuhr: timeToMinutes(prayerTimesData.zuhr.start),
    asr: timeToMinutes(prayerTimesData.asr.start),
    maghrib: timeToMinutes(prayerTimesData.maghrib.start),
    isha: timeToMinutes(prayerTimesData.isha.start)
  };
  
  let currentPrayer = 'isha'; // Default to Isha
  
  if (currentTime < prayerMinutes.fajr) {
    currentPrayer = 'isha';
  } else if (currentTime < prayerMinutes.sunrise) {
    currentPrayer = 'fajr';
  } else if (currentTime < prayerMinutes.zuhr) {
    currentPrayer = 'sunrise';
  } else if (currentTime < prayerMinutes.asr) {
    currentPrayer = 'zuhr';
  } else if (currentTime < prayerMinutes.maghrib) {
    currentPrayer = 'asr';
  } else if (currentTime < prayerMinutes.isha) {
    currentPrayer = 'maghrib';
  } else {
    currentPrayer = 'isha';
  }
  
  // Add active class to current prayer card
  const prayerCards = document.querySelectorAll('.prayer-card');
  prayerCards.forEach(card => {
    card.classList.remove('current-prayer', 'active');
    if (card.dataset.prayer === currentPrayer) {
      card.classList.add('current-prayer', 'active');
    }
  });
  
  // Also update widget if present
  const widgetItems = document.querySelectorAll('.prayer-widget-item');
  widgetItems.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.prayer === currentPrayer) {
      item.classList.add('active');
    }
  });
}

// ===== Convert Time String to Minutes =====
function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return hours * 60 + minutes;
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements
  const animateElements = document.querySelectorAll('.service-card, .event-card, .scholar-card, .timeline-item');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ===== Set Active Navigation Link =====
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(13, 19, 33, 0.98)';
    navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'linear-gradient(135deg, #0d1321 0%, #1a2744 100%)';
    navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
  }
});

// ===== Contact Form Handling =====
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    // For static sites, you can use services like Formspree, Netlify Forms, etc.
    
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
  });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== Update prayer times every minute =====
setInterval(highlightCurrentPrayer, 60000);

// ===== Countdown to Next Prayer (Optional Feature) =====
function getNextPrayer() {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const prayers = [
    { name: 'Fajr', time: timeToMinutes(prayerTimesData.fajr.start) },
    { name: 'Sunrise', time: timeToMinutes(prayerTimesData.sunrise.start) },
    { name: 'Zuhr', time: timeToMinutes(prayerTimesData.zuhr.start) },
    { name: 'Asr', time: timeToMinutes(prayerTimesData.asr.start) },
    { name: 'Maghrib', time: timeToMinutes(prayerTimesData.maghrib.start) },
    { name: 'Isha', time: timeToMinutes(prayerTimesData.isha.start) }
  ];
  
  for (let prayer of prayers) {
    if (currentTime < prayer.time) {
      const diff = prayer.time - currentTime;
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      return {
        name: prayer.name,
        hours: hours,
        minutes: minutes
      };
    }
  }
  
  // If past all prayers, next is Fajr tomorrow
  const fajrTomorrow = (24 * 60 - currentTime) + prayers[0].time;
  return {
    name: 'Fajr',
    hours: Math.floor(fajrTomorrow / 60),
    minutes: fajrTomorrow % 60
  };
}

// ===== Calendar Event Toggle (for events page) =====
function toggleEventDetails(eventId) {
  const details = document.getElementById(eventId);
  if (details) {
    details.classList.toggle('expanded');
  }
}

// ===== Lazy Loading Images =====
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
});

