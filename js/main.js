/**
 * Kajal Mehta Portfolio
 * Premium JavaScript - GSAP, ScrollTrigger, & Interactions
 */

// ==========================================
// CONTENT DATA BLOCK (Editable)
// ==========================================
const portfolioData = {
  artworks: [
    {
      id: 1,
      title: "Artwork Title 1", // TODO: Update with real title
      medium: "Medium Placeholder", // TODO: Update with real medium
      year: "2026", // TODO: Update with real year
      imageSrc: "assets/artwork-1.jpg",
      imageWebp: "assets/artwork-1.webp",
      alt: "Plein-air painting showing everyday spaces"
    },
    {
      id: 2,
      title: "Artwork Title 2", // TODO: Update with real title
      medium: "Medium Placeholder", // TODO: Update with real medium
      year: "2026", // TODO: Update with real year
      imageSrc: "assets/artwork-2.jpg",
      imageWebp: "assets/artwork-2.webp",
      alt: "Landscape style painting of trees and old walls"
    },
    {
      id: 3,
      title: "Artwork Title 3", // TODO: Update with real title
      medium: "Medium Placeholder", // TODO: Update with real medium
      year: "2026", // TODO: Update with real year
      imageSrc: "assets/artwork-3.jpg",
      imageWebp: "assets/artwork-3.webp",
      alt: "Painting of courtyards and an elephant sculpture"
    },
    {
      id: 4,
      title: "Artwork Title 4", // TODO: Update with real title
      medium: "Medium Placeholder", // TODO: Update with real medium
      year: "2026", // TODO: Update with real year
      imageSrc: "assets/artwork-4.jpg",
      imageWebp: "assets/artwork-4.webp",
      alt: "Soft earthy green and warm neutral painting"
    }
  ],
  themes: [
    {
      title: "Everyday Life",
      description: "Exploring the quiet moments and rhythms that define our daily existence.",
      imageSrc: "assets/artwork-1.webp" // Used for hover reveal
    },
    {
      title: "Familiar Surroundings",
      description: "Finding beauty and meaning in the spaces we often overlook.",
      imageSrc: "assets/artwork-2.webp"
    },
    {
      title: "Ordinary Elements",
      description: "Transforming simple objects into creative expressions through an artistic lens.",
      imageSrc: "assets/artwork-3.webp"
    }
  ],
  contact: {
    email: "studio@kajalmehta.art (Placeholder)" // TODO: Update with real email
  }
};

// Exhibition Dates (YYYY-MM-DD)
const EXH_START = new Date('2026-10-03T00:00:00');
const EXH_END = new Date('2026-10-08T23:59:59');

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  initTheme();
  initPreloader();
  
  // Render content
  renderGallery();
  renderThemes();
  updateContactEmail();
  updateExhibitionStatus();
  
  // Interactions
  initNavigation();
  initCustomCursor();
  initContactForm();
  initBackToTop();
  initCalendarDownload();
});

window.addEventListener('load', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    initGSAPAnimations();
    initFilmstrip();
  } else {
    // Fallback for reduced motion or missing GSAP
    document.querySelectorAll('.reveal, .line-inner').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    document.querySelector('.mask-reveal').style.clipPath = 'inset(0 0 0 0)';
  }
  
  initLightbox(); // Safe to init after gallery is rendered
});

// ==========================================
// COMPONENT: Theme Toggle
// ==========================================
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  
  // Check localStorage or OS preference
  let currentTheme = 'light';
  try {
    const saved = localStorage.getItem('theme');
    if (saved) {
      currentTheme = saved;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentTheme = 'dark';
    }
  } catch (e) {
    // LocalStorage blocked
  }
  
  root.setAttribute('data-theme', currentTheme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', currentTheme);
      try {
        localStorage.setItem('theme', currentTheme);
      } catch (e) {}
    });
  }
}

// ==========================================
// COMPONENT: Preloader
// ==========================================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof gsap === 'undefined') {
    preloader.style.display = 'none';
    return;
  }

  // Draw SVG
  const tl = gsap.timeline();
  tl.to('.preloader-logo text', {
    strokeDashoffset: 0,
    duration: 1.2,
    ease: "power2.inOut"
  })
  .to('.preloader-logo text', {
    fill: "currentColor",
    duration: 0.4
  }, "-=0.2")
  .to(preloader, {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: () => {
      preloader.style.display = 'none';
    }
  });

  // Allow click to skip
  preloader.addEventListener('click', () => {
    tl.progress(1);
  });
}

// ==========================================
// COMPONENT: GSAP Animations
// ==========================================
function initGSAPAnimations() {
  // 1. Hero Reveal (fires after preloader)
  const heroTl = gsap.timeline({ delay: 1.5 }); // Wait for preloader roughly
  
  heroTl.to('.hero-title .line-inner', {
    y: '0%',
    duration: 1.2,
    stagger: 0.2,
    ease: "power4.out"
  })
  .to('.hero-meta .line-inner', {
    y: '0%',
    duration: 1,
    stagger: 0.1,
    ease: "power3.out"
  }, "-=0.8")
  .from('.collage-layer', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.15,
    ease: "power3.out"
  }, "-=1.2")
  .from('.rotating-badge, .scroll-indicator', {
    opacity: 0,
    duration: 1
  }, "-=0.5");

  // 2. Global Scroll Reveals
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // Section Rules
  gsap.utils.toArray('.section-rule').forEach(rule => {
    gsap.to(rule, {
      scaleX: 1,
      duration: 1.5,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: rule,
        start: "top 90%"
      }
    });
  });

  // About Image Mask Reveal
  gsap.to('.mask-reveal', {
    clipPath: 'inset(0% 0 0 0)',
    duration: 1.5,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: '.about-visual',
      start: "top 75%"
    }
  });

  // 3. Hero Mouse Parallax (Desktop)
  const heroCollage = document.getElementById('hero-collage');
  if (heroCollage && window.matchMedia('(pointer: fine)').matches) {
    heroCollage.addEventListener('mousemove', (e) => {
      const rect = heroCollage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.utils.toArray('.collage-layer').forEach(layer => {
        const speed = parseFloat(layer.dataset.speed || 0.05);
        gsap.to(layer, {
          x: x * 200 * speed,
          y: y * 200 * speed,
          duration: 1,
          ease: "power2.out"
        });
      });
    });
    
    heroCollage.addEventListener('mouseleave', () => {
      gsap.to('.collage-layer', { x: 0, y: 0, duration: 1, ease: "power2.out" });
    });
  }

  // Hero Scroll Parallax
  gsap.to('.collage-layer', {
    yPercent: (i, target) => parseFloat(target.dataset.speed) * 300,
    ease: "none",
    scrollTrigger: {
      trigger: '.hero',
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Scroll Progress Bar
  gsap.to('#scroll-progress', {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1
    }
  });
}

function initFilmstrip() {
  const container = document.getElementById('filmstrip-container');
  const track = document.getElementById('gallery-grid');
  
  if (!container || !track || window.innerWidth <= 1024) return;

  // Horizontal Scroll for desktop
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#works',
      start: "center center",
      end: () => `+=${track.scrollWidth - window.innerWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  });

  tl.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth + 64), // 64 is padding
    ease: "none"
  });
}

// ==========================================
// COMPONENT: Gallery Render
// ==========================================
function renderGallery() {
  const track = document.getElementById('gallery-grid');
  if (!track) return;
  
  track.innerHTML = ''; // clear static fallback if any

  portfolioData.artworks.forEach((artwork, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item magnetic-container';
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View ${artwork.title}`);
    item.dataset.index = index;
    
    item.innerHTML = `
      <picture>
        <source srcset="${artwork.imageWebp}" type="image/webp">
        <img src="${artwork.imageSrc}" alt="${artwork.alt}" loading="lazy">
      </picture>
      <div class="gallery-caption">
        <div class="caption-title">${artwork.title}</div>
        <div class="caption-meta">${artwork.medium}, ${artwork.year}</div>
      </div>
    `;
    track.appendChild(item);
  });
}

// ==========================================
// COMPONENT: Enhanced Lightbox
// ==========================================
let currentLightboxIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const bg = document.getElementById('lightbox-close-bg');
  const imgWrapper = document.getElementById('lightbox-img-wrapper');
  
  if (!lightbox) return;

  // Events
  items.forEach(item => {
    item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index)));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(parseInt(item.dataset.index));
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  bg.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigateLightbox(-1));
  nextBtn.addEventListener('click', () => navigateLightbox(1));

  // Keyboard navigation & Focus Trap
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
    
    // Focus trap
    if (e.key === 'Tab') {
      const focusable = lightbox.querySelectorAll('button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Swipe logic for mobile
  imgWrapper.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});

  imgWrapper.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) navigateLightbox(1); // Swipe left
    if (touchEndX > touchStartX + threshold) navigateLightbox(-1); // Swipe right
  }
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();
  
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('active');
  document.body.classList.add('locked');
  
  setTimeout(() => document.getElementById('lightbox-close').focus(), 100);
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.classList.remove('locked');
  
  const items = document.querySelectorAll('.gallery-item');
  if (items[currentLightboxIndex]) items[currentLightboxIndex].focus();
}

function navigateLightbox(dir) {
  const img = document.getElementById('lightbox-img');
  
  // Subtle fade out
  if(typeof gsap !== 'undefined') gsap.to(img, {opacity: 0, duration: 0.2});
  else img.style.opacity = 0;

  setTimeout(() => {
    currentLightboxIndex += dir;
    if (currentLightboxIndex < 0) currentLightboxIndex = portfolioData.artworks.length - 1;
    if (currentLightboxIndex >= portfolioData.artworks.length) currentLightboxIndex = 0;
    
    updateLightboxContent();
    
    if(typeof gsap !== 'undefined') gsap.to(img, {opacity: 1, duration: 0.2});
    else img.style.opacity = 1;
  }, 200);
}

function updateLightboxContent() {
  const artwork = portfolioData.artworks[currentLightboxIndex];
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const meta = document.getElementById('lightbox-meta');
  const counter = document.getElementById('lightbox-counter');
  
  img.src = artwork.imageSrc;
  img.alt = artwork.alt;
  title.textContent = artwork.title;
  meta.textContent = `${artwork.medium}, ${artwork.year}`;
  counter.textContent = `${currentLightboxIndex + 1} / ${portfolioData.artworks.length}`;
}

// ==========================================
// COMPONENT: Practice Accordion
// ==========================================
function renderThemes() {
  const grid = document.getElementById('themes-grid');
  if (!grid) return;
  grid.innerHTML = '';

  portfolioData.themes.forEach((theme, idx) => {
    const item = document.createElement('div');
    item.className = `accordion-item ${idx === 0 ? 'active' : ''}`;
    
    item.innerHTML = `
      <button class="accordion-header" aria-expanded="${idx === 0}">
        <span class="acc-num">0${idx + 1}</span>
        <h3 class="acc-title">${theme.title}</h3>
      </button>
      <div class="accordion-content">
        <div class="acc-inner">
          <p class="acc-text">${theme.description}</p>
          <div class="acc-image">
            <img src="${theme.imageSrc}" alt="${theme.title} visual" loading="lazy">
          </div>
        </div>
      </div>
    `;

    const btn = item.querySelector('.accordion-header');
    btn.addEventListener('click', () => {
      // Close others
      document.querySelectorAll('.accordion-item').forEach(el => {
        if (el !== item) {
          el.classList.remove('active');
          el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        }
      });
      // Toggle current
      const isActive = item.classList.contains('active');
      item.classList.toggle('active');
      btn.setAttribute('aria-expanded', !isActive);
    });

    grid.appendChild(item);
  });
}

// ==========================================
// COMPONENT: Exhibition Logic
// ==========================================
function updateExhibitionStatus() {
  const badge = document.getElementById('exhibition-status');
  if (!badge) return;

  const now = new Date();
  if (now < EXH_START) {
    badge.textContent = "Upcoming Exhibition";
  } else if (now >= EXH_START && now <= EXH_END) {
    badge.textContent = "Now Showing";
    badge.style.borderColor = "var(--color-primary)";
    badge.style.color = "var(--color-primary)";
  } else {
    badge.textContent = "Recently Featured";
    badge.style.borderColor = "var(--color-text-light)";
    badge.style.color = "var(--color-text-light)";
  }
}

function initCalendarDownload() {
  const btn = document.getElementById('btn-add-calendar');
  if (!btn) return;

  btn.addEventListener('click', () => {
    // Generate .ics content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kajal Mehta Portfolio//EN
BEGIN:VEVENT
UID:${Date.now()}@kajalmehta.art
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:20261003T033000Z
DTEND:20261008T163000Z
SUMMARY:Bharat Art Conclave 2026 (Kajal Mehta)
LOCATION:Civil Services Officers' Institute, Chanakyapuri, New Delhi
DESCRIPTION:Exhibition featuring works by Visual Artist Kajal Mehta.
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Kajal_Mehta_Exhibition.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// ==========================================
// COMPONENT: Navigation & Scroll
// ==========================================
function initNavigation() {
  const header = document.getElementById('header');
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Background style
    if (currentScroll > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    // Hide/Show on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.classList.add('hidden'); // Scrolling down
      if(nav.classList.contains('active')) {
        toggle.click(); // Close mobile menu if open
      }
    } else {
      header.classList.remove('hidden'); // Scrolling up
    }
    
    lastScroll = currentScroll;
  }, {passive: true});

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('active');
    });
  });
}

// ==========================================
// COMPONENT: Custom Cursor & Magnetics
// ==========================================
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

  // Fast cursor tracking (outside GSAP tick for responsiveness)
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!cursor.classList.contains('active')) cursor.classList.add('active');
  });

  // Smooth follow loop
  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover states
  document.querySelectorAll('a, button, input, textarea, .theme-toggle').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover-magnetic'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover-magnetic'));
  });

  document.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover-view'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover-view'));
  });

  // Magnetic elements
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width/2) * 0.3;
      const y = (e.clientY - rect.top - rect.height/2) * 0.3;
      if(typeof gsap !== 'undefined') {
        gsap.to(el, { x: x, y: y, duration: 0.3, ease: "power2.out" });
      }
    });
    el.addEventListener('mouseleave', () => {
      if(typeof gsap !== 'undefined') gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    });
  });
}

// ==========================================
// COMPONENT: Form & Contact
// ==========================================
function updateContactEmail() {
  const emailEl = document.getElementById('contact-email');
  if (!emailEl) return;
  
  const emailStr = portfolioData.contact.email;
  if (!emailStr || emailStr.trim() === "") {
    emailEl.style.display = 'none';
  } else {
    emailEl.textContent = emailStr;
    // Extract actual email if placeholder text exists
    const cleanEmail = emailStr.split(' ')[0];
    emailEl.href = `mailto:${cleanEmail}`;
  }
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const msgContainer = document.getElementById('form-message');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Honeypot check
    const honey = document.querySelector('input[name="_honey"]').value;
    if (honey) return; // Bot detected, silently abort
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    msgContainer.className = 'form-message';
    
    if (!name || !email || !message) {
      msgContainer.textContent = 'Please fill out all required fields.';
      msgContainer.classList.add('error');
      return;
    }
    
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      msgContainer.textContent = 'Please enter a valid email address.';
      msgContainer.classList.add('error');
      return;
    }
    
    // Success State
    form.reset();
    msgContainer.textContent = 'Thank you! Your message has been sent successfully.';
    msgContainer.classList.add('success');
    
    // Confetti-free success animation (slide down and fade)
    msgContainer.style.opacity = 0;
    msgContainer.style.transform = 'translateY(-10px)';
    if(typeof gsap !== 'undefined') {
      gsap.to(msgContainer, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    } else {
      msgContainer.style.opacity = 1;
      msgContainer.style.transform = 'translateY(0)';
    }
    
    setTimeout(() => {
      if(typeof gsap !== 'undefined') {
        gsap.to(msgContainer, { opacity: 0, duration: 0.5, onComplete: () => msgContainer.className = 'form-message' });
      } else {
        msgContainer.className = 'form-message';
      }
    }, 5000);
  });
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
