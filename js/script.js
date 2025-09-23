// Enhanced Professional Portfolio JavaScript
'use strict';

// ---------- UTILITY FUNCTIONS ----------
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// ---------- HAMBURGER MENU ----------
const initHamburgerMenu = () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      hamburger.classList.toggle("active");
      
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.style.transform = navLinks.classList.contains('open') ? 'rotate(90deg)' : 'rotate(0deg)';
      }
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) icon.style.transform = 'rotate(0deg)';
      }
    });
  }
};

// ---------- ENHANCED DARK MODE ----------
const initDarkMode = () => {
  const themeToggle = document.getElementById('themeToggle');
  
  if (!themeToggle) return;
  
  const currentTheme = localStorage.getItem('darkMode') || 'disabled';
  
  if (currentTheme === 'enabled') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    document.body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    
    themeToggle.style.transform = 'scale(0.8)';
    setTimeout(() => {
      themeToggle.style.transform = 'scale(1)';
    }, 150);

    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark } }));
  });
};

// ---------- ENHANCED TYPING EFFECT WITH PROFESSIONAL COLORS ---------
const initTypingEffect = () => {
  const words = [
    "Technovator.",
    "Full-Stack Developer.",
    "UI/UX Designer.", 
    "Problem Solver.",
    "Script Writer.",
    "Code Craftsman."
  ];

  const typingEl = document.getElementById('typing');
  if (!typingEl) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const colors = [
    '#3a74f2ff', 
    '#60f4c5ff', 
    '#efa052ff', 
    '#6e23f1ff',
    '#d946ef',
    '#f59e0b'
  ];

  function type() {
    const currentWord = words[wordIndex];
    const currentColor = colors[wordIndex % colors.length];
    
    typingEl.style.color = currentColor;

    if (!isDeleting && charIndex < currentWord.length) {
      typingEl.textContent += currentWord.charAt(charIndex);
      charIndex++;
      setTimeout(type, 100); 
    } 
    else if (isDeleting && charIndex > 0) {
      typingEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, 50); 
    } 
    else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(type, isDeleting ? 1000 : 500); 
    }
  }

  type();
};

// This is the line that makes it work.
// initTypingEffect();


// ---------- SCROLL ANIMATIONS (Intersection Observer) ----------
const initScrollAnimations = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
};

// ---------- CATEGORY FILTERING ----------
const initCategoryFilter = () => {
  const links = document.querySelectorAll('.categories a');
  const cards = document.querySelectorAll('.blog-card');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      const category = link.textContent.trim().toLowerCase().replace(' ', '-');
      
      cards.forEach(card => {
        if (category === 'all-content' || card.dataset.category === category) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
};

// ---------- SCROLL TO TOP BUTTON ----------
const initScrollToTop = () => {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (!scrollToTopBtn) return;

  const handleScroll = debounce(() => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
      scrollToTopBtn.setAttribute('aria-hidden', 'false');
    } else {
      scrollToTopBtn.classList.remove('show');
      scrollToTopBtn.setAttribute('aria-hidden', 'true');
    }
  }, 100);

  window.addEventListener('scroll', handleScroll);

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};


// ---------- SKILLS BAR ANIMATION ----------
const initSkillsBar = () => {
  const skillCards = document.querySelectorAll('.skill-card');
  const animateSkillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillLevel = entry.target.dataset.level;
        const skillBar = entry.target.querySelector('.skill-bar');
        skillBar.style.width = skillLevel + '%';
        animateSkillsObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.5
  });

  skillCards.forEach(card => {
    animateSkillsObserver.observe(card);
  });
};

// ---------- HERO CANVAS ANIMATION ----------
const initHeroCanvas = () => {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  class Particle {
    constructor(x, y) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.radius = Math.random() * 2 + 1;
      this.color = `hsl(${Math.random() * 360}, 100%, 80%)`;
      this.velocity = {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5
      };
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;

      if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
        this.velocity.x = -this.velocity.x;
      }
      if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
        this.velocity.y = -this.velocity.y;
      }
    }
  }

  const createParticles = () => {
    particles = [];
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  };

  const animateParticles = () => {
    animationFrameId = requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
  };

  window.addEventListener('resize', debounce(resizeCanvas, 250));
  resizeCanvas();
  createParticles();
  animateParticles();
};

// ---------- INITIALIZE ALL COMPONENTS ----------
document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initDarkMode();
  initTypingEffect();
  initScrollAnimations();
  initCategoryFilter();
  initScrollToTop();
  initSkillsBar();
  initHeroCanvas();
});