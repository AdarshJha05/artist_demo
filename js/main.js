/**
 * Dakshakalaa Portfolio
 * Premium JavaScript - GSAP, ScrollTrigger, & Interactions
 */

// ==========================================
// CONTENT DATA BLOCK (Editable)
// ==========================================
const portfolioData = {
  brandName: "Dakshakalaa",
  artistName: "Kajal Mehta",
  instagramHandle: "@dakshkalaa_",
  instagramUrl: "https://www.instagram.com/dakshkalaa_",
  
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
      description: "Finding stories in the quiet, ordinary rhythms of daily life.",
      imageSrc: "assets/artwork-1.webp" // Used for hover reveal
    },
    {
      title: "Familiar Surroundings",
      description: "Looking again at the spaces and places we pass without a second glance.",
      imageSrc: "assets/artwork-2.webp"
    },
    {
      title: "Ordinary Elements",
      description: "Turning simple, overlooked objects into expressive, considered work.",
      imageSrc: "assets/artwork-3.webp"
    }
  ],
  services: [
    {
      title: "Live Caricature at Events",
      description: "Engaging live entertainment for your guests, creating memorable takeaways.", // TODO: Confirm with artist (pricing, event types)
      isHero: true
    },
    {
      title: "Custom Caricature Portraits",
      description: "Personalized artwork perfect for unique gifting and special occasions.", // TODO: Confirm with artist (pricing, turnaround)
      isHero: false
    },
    {
      title: "Event & Brand Collaborations",
      description: "Custom creative partnerships to elevate your brand experience.", // TODO: Confirm with artist (scope, rates)
      isHero: false
    }
  ],
  showCaricatureSlots: true,
  caricatures: [
    { src: 'assets/artwork-1.webp', alt: 'Couple fishing a crocodile caricature', caption: 'Creative Couple Portrait' },
    { src: 'assets/artwork-2.webp', alt: 'Live caricature drawing of a woman lifting barbell', caption: 'Live Event Caricature' },
    { src: 'assets/artwork-3.webp', alt: 'Breakdancer caricature', caption: 'Custom Caricature' },
    { src: 'assets/artwork-4.webp', alt: 'Couple piggybacking caricature', caption: 'Personalized Gifting' }
  ],
  contact: {
    phone: "+918130640423",
    displayPhone: "+91 8130640423",
    whatsappMsg: "Hi, I'd like to enquire about a caricature booking.",
    email: "" // TODO: Update with real email. Will hide if empty.
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

  injectBrandData();
  initTheme();
  initPreloader();
  
  // Render content
  renderGallery();
  renderThemes();
  renderServices();
  renderCaricatureShowcase();
  updateContactInfo();
  updateExhibitionStatus();
  
  // Interactions
  initNavigation();
  initCustomCursor();
  initContactForm();
  initBackToTop();
  initCalendarDownload();
  initAnimatedCounters();
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
    document.querySelectorAll('.mask-reveal').forEach(el => el.style.clipPath = 'inset(0 0 0 0)');
  }
  
  initLightbox(); // Safe to init after gallery is rendered
});

// ==========================================
// COMPONENT: Inject Brand Data
// ==========================================
function injectBrandData() {
  document.querySelectorAll('.brand-name').forEach(el => el.textContent = portfolioData.brandName);
  document.querySelectorAll('.artist-name').forEach(el => el.textContent = portfolioData.artistName);
  document.querySelectorAll('.social-handle').forEach(el => {
    el.textContent = portfolioData.instagramHandle;
    el.href = portfolioData.instagramUrl;
  });
  
  // WhatsApp Link Setup
  const waLinks = document.querySelectorAll('.wa-link');
  waLinks.forEach(el => {
    const encodedMsg = encodeURIComponent(portfolioData.contact.whatsappMsg);
    el.href = `https://wa.me/${portfolioData.contact.phone.replace('+','')}?text=${encodedMsg}`;
  });
}

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
  } catch (e) {}
  
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
  const heroTl = gsap.timeline({ delay: 1.5 });
  
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
    x: () => -(track.scrollWidth - window.innerWidth + 64),
    ease: "none"
  });
}

function initAnimatedCounters() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || typeof gsap === 'undefined') return;

  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    if(isNaN(target)) return;
    
    gsap.fromTo(counter, 
      { innerHTML: 0 },
      {
        innerHTML: target,
        duration: 2,
        ease: "power3.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  });
}

// ==========================================
// COMPONENT: Services Render
// ==========================================
function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  grid.innerHTML = '';

  portfolioData.services.forEach((service) => {
    const card = document.createElement('div');
    card.className = `service-card reveal ${service.isHero ? 'service-card-hero' : ''}`;
    
    card.innerHTML = `
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    `;
    grid.appendChild(card);
  });
}

function renderCaricatureShowcase() {
  const showcase = document.getElementById('caricature-showcase');
  if (!showcase) return;

  if (portfolioData.caricatures.length === 0) {
    if (!portfolioData.showCaricatureSlots) {
      showcase.style.display = 'none';
      return;
    }
    
    // Render empty framed slots
    showcase.innerHTML = '';
    for(let i=0; i<4; i++) {
      const slot = document.createElement('div');
      slot.className = 'caricature-slot empty';
      slot.innerHTML = `<span class="empty-label">Caricature sample coming soon</span>`;
      showcase.appendChild(slot);
    }
  } else {
    // Render real images
    showcase.innerHTML = '';
    portfolioData.caricatures.forEach(caricature => {
      const slot = document.createElement('div');
      slot.className = 'caricature-slot filled';
      slot.innerHTML = `
        <img src="${caricature.src}" alt="${caricature.alt}" loading="lazy">
        <div class="slot-caption">${caricature.caption}</div>
      `;
      showcase.appendChild(slot);
    });
  }
}

// ==========================================
// COMPONENT: Gallery Render
// ==========================================
function renderGallery() {
  const track = document.getElementById('gallery-grid');
  if (!track) return;
  
  track.innerHTML = '';

  portfolioData.artworks.forEach((artwork, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item magnetic-container gallery-framed';
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View ${artwork.title}`);
    item.dataset.index = index;
    
    const num = (index + 1).toString().padStart(2, '0');
    const total = portfolioData.artworks.length.toString().padStart(2, '0');
    
    item.innerHTML = `
      <div class="framed-mat">
        <picture>
          <source srcset="${artwork.imageWebp}" type="image/webp">
          <img src="${artwork.imageSrc}" alt="${artwork.alt}" loading="lazy">
        </picture>
      </div>
      <div class="gallery-caption">
        <div class="caption-header">
          <div class="caption-index">${num} / ${total}</div>
        </div>
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
  
  const num = (currentLightboxIndex + 1).toString().padStart(2, '0');
  const total = portfolioData.artworks.length.toString().padStart(2, '0');
  counter.textContent = `${num} / ${total}`;
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
        <div class="acc-title-wrap">
          <span class="acc-num">0${idx + 1}</span>
          <h3 class="acc-title">${theme.title}</h3>
        </div>
        <svg class="acc-arrow" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
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
      document.querySelectorAll('.accordion-item').forEach(el => {
        if (el !== item) {
          el.classList.remove('active');
          el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        }
      });
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
    badge.textContent = "Upcoming";
  } else if (now >= EXH_START && now <= EXH_END) {
    badge.textContent = "Now Showing";
    badge.classList.add('status-active');
  } else {
    badge.textContent = "Recently Featured";
    badge.classList.add('status-past');
  }
}

function initCalendarDownload() {
  const btn = document.getElementById('btn-add-calendar');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//${portfolioData.brandName} Portfolio//EN
BEGIN:VEVENT
UID:${Date.now()}@${portfolioData.brandName.toLowerCase()}.art
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:20261003T033000Z
DTEND:20261008T163000Z
SUMMARY:Bharat Art Conclave 2026 (${portfolioData.artistName})
LOCATION:Civil Services Officers' Institute, Chanakyapuri, New Delhi
DESCRIPTION:Exhibition featuring works by Visual Artist ${portfolioData.artistName}.
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${portfolioData.brandName}_Exhibition.ics`);
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
    
    if (currentScroll > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    if (currentScroll > lastScroll && currentScroll > 200) {
      header.classList.add('hidden');
      if(nav.classList.contains('active')) toggle.click();
    } else {
      header.classList.remove('hidden');
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

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!cursor.classList.contains('active')) cursor.classList.add('active');
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  document.querySelectorAll('a, button, input, textarea, select, .theme-toggle').forEach(el => {
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
function updateContactInfo() {
  const emailLines = document.querySelectorAll('.email-line');
  const phoneLines = document.querySelectorAll('.phone-line');
  
  const emailStr = portfolioData.contact.email;
  
  if (!emailStr || emailStr.trim() === "") {
    emailLines.forEach(el => el.style.display = 'none');
  } else {
    emailLines.forEach(el => {
      if(el.tagName === 'A') {
        el.href = `mailto:${emailStr}`;
        el.textContent = emailStr;
      }
    });
  }
  
  phoneLines.forEach(el => {
    if(el.tagName === 'A') {
      el.href = `tel:${portfolioData.contact.phone}`;
      el.textContent = portfolioData.contact.displayPhone;
    }
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const msgContainer = document.getElementById('form-message');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const honey = document.querySelector('input[name="_honey"]').value;
    if (honey) return; 
    
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
    
    form.reset();
    msgContainer.textContent = 'Thank you! Your message has been sent successfully.';
    msgContainer.classList.add('success');
    
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
