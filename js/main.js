/**
 * Kajal Mehta Portfolio
 * Main JavaScript File
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
      description: "Exploring the quiet moments and rhythms that define our daily existence."
    },
    {
      title: "Familiar Surroundings",
      description: "Finding beauty and meaning in the spaces we often overlook."
    },
    {
      title: "Ordinary Elements",
      description: "Transforming simple objects into creative expressions through an artistic lens."
    }
  ]
};

// ==========================================
// DOM ELEMENTS & INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initThemes();
  initNavigation();
  initScrollAnimations();
  initParallax();
  initCustomCursor();
  initContactForm();
  initBackToTop();
});

// ==========================================
// COMPONENT: Gallery & Lightbox
// ==========================================
let currentLightboxIndex = 0;

function initGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  // Populate gallery
  portfolioData.artworks.forEach((artwork, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item reveal';
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View ${artwork.title}`);
    
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

    // Click & Keyboard handlers
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });

    galleryGrid.appendChild(item);
  });

  // Lightbox Navigation
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
  document.getElementById('lightbox-next').addEventListener('click', () => navigateLightbox(1));
  
  // Close on backdrop click
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-img-wrapper')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
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
    }
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();
  
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  
  // Set focus to close button
  setTimeout(() => {
    document.getElementById('lightbox-close').focus();
  }, 100);
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  
  // Return focus to gallery item
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems[currentLightboxIndex]) {
    galleryItems[currentLightboxIndex].focus();
  }
}

function navigateLightbox(direction) {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = portfolioData.artworks.length - 1;
  if (currentLightboxIndex >= portfolioData.artworks.length) currentLightboxIndex = 0;
  updateLightboxContent();
}

function updateLightboxContent() {
  const artwork = portfolioData.artworks[currentLightboxIndex];
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const meta = document.getElementById('lightbox-meta');
  
  img.src = artwork.imageSrc;
  img.alt = artwork.alt;
  title.textContent = artwork.title;
  meta.textContent = `${artwork.medium}, ${artwork.year}`;
}

// ==========================================
// COMPONENT: Themes
// ==========================================
function initThemes() {
  const grid = document.getElementById('themes-grid');
  if (!grid) return;

  portfolioData.themes.forEach(theme => {
    const card = document.createElement('div');
    card.className = 'theme-card reveal';
    card.innerHTML = `
      <h3>${theme.title}</h3>
      <p>${theme.description}</p>
    `;
    grid.appendChild(card);
  });
}

// ==========================================
// COMPONENT: Navigation
// ==========================================
function initNavigation() {
  const header = document.getElementById('header');
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');
  
  // Scroll styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
  });

  // Close mobile menu on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('active');
    });
  });
}

// ==========================================
// COMPONENT: Scroll Animations
// ==========================================
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // observer.unobserve(entry.target); // Optional: animate only once
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  
  // Trigger immediately for above-the-fold
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('active');
      }
    });
  }, 100);
}

// ==========================================
// COMPONENT: Parallax (Hero Strips)
// ==========================================
function initParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const strips = document.querySelectorAll('.artwork-strip img');
  if (!strips.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Only apply parallax if hero is somewhat in view
    if (scrollY > window.innerHeight) return;

    strips.forEach((strip, index) => {
      // Different speed/direction based on index
      const speed = (index % 2 === 0) ? 0.05 : -0.05;
      const baseTransform = -10; // Match CSS base transform
      const yPos = baseTransform + (scrollY * speed);
      strip.style.transform = `translateY(${yPos}%)`;
    });
  });
}

// ==========================================
// COMPONENT: Custom Cursor
// ==========================================
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) {
    // Hide or don't attach listeners on touch devices
    if(cursor) cursor.style.display = 'none';
    return;
  }

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Add hover state on links and buttons
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .gallery-item');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ==========================================
// COMPONENT: Form Validation
// ==========================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  const msgContainer = document.getElementById('form-message');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic frontend validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    msgContainer.className = 'form-message'; // Reset
    
    if (!name || !email || !message) {
      msgContainer.textContent = 'Please fill out all required fields.';
      msgContainer.classList.add('error');
      return;
    }
    
    if (!isValidEmail(email)) {
      msgContainer.textContent = 'Please enter a valid email address.';
      msgContainer.classList.add('error');
      return;
    }
    
    // Simulate send success
    form.reset();
    msgContainer.textContent = 'Thank you! Your message has been sent successfully.';
    msgContainer.classList.add('success');
    
    // Clear message after 5 seconds
    setTimeout(() => {
      msgContainer.className = 'form-message';
    }, 5000);
  });
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// ==========================================
// COMPONENT: Back to Top
// ==========================================
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
