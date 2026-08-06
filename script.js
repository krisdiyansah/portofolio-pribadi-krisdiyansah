// ===================================
//  PORTFOLIO KRISDIYANSAH - script.js
// ===================================

// ---- Cursor Glow Effect ----
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  }
});

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar styling on scroll
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top button visibility
  if (scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }

  // Active nav link based on scroll position
  updateActiveNavLink();
});

// ---- Back to Top ----
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Active Nav Link on Scroll ----
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ---- Smooth Scroll on Nav Click ----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobileMenu');
      const hamburger = document.getElementById('hamburger');
      if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      }
    }
  });
});

// ---- Hamburger Menu Toggle ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// ---- Typing Effect for Hero ----
const typingTexts = [
  'Mahasiswa Sistem Informasi',
  'Admin SPX Express',
  'Penggemar Teknologi',
  'Problem Solver'
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDuration = 2000;

function typeText() {
  if (!typingEl) return;
  const currentText = typingTexts[typingIndex];

  if (!isDeleting) {
    typingEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeText, pauseDuration);
      return;
    }
  } else {
    typingEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % typingTexts.length;
    }
  }
  setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}

setTimeout(typeText, 1000);

// ---- Intersection Observer for Reveal Animations ----
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal, .timeline-item, .project-card').forEach((el) => {
  revealObserver.observe(el);
});

// ---- Skill Bar Animation ----
const skillBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-bar');
        if (bar) {
          const level = bar.dataset.level;
          setTimeout(() => {
            bar.style.width = level + '%';
          }, 200);
        }
        skillBarObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skill-card').forEach((card) => {
  skillBarObserver.observe(card);
});

// ---- Animated Counter for Stats ----
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    }
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat-num[data-count]');
        counters.forEach((counter) => {
          animateCounter(counter, parseInt(counter.dataset.count));
        });
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector('.about-stat-cards');
if (statsSection) counterObserver.observe(statsSection);

// ---- Portfolio Filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ---- Contact Form ----
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>⏳</span> Mengirim...';

  // Ambil data dari form
  const formData = new FormData(contactForm);
  
  // GANTI "email_anda@gmail.com" DENGAN EMAIL ASLI ANDA
  const emailTujuan = "Krisdiyansahh@gmail.com"; 

  fetch(`https://formsubmit.co/ajax/${emailTujuan}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json'
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>🚀</span> Kirim Pesan';
    contactForm.reset();
    showToast('✅ Pesan berhasil dikirim! Terima kasih.');
  })
  .catch(error => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>🚀</span> Kirim Pesan';
    showToast('❌ Gagal mengirim pesan. Coba lagi nanti.');
    console.error(error);
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ---- Parallax Orbs ----
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.bg-orb');
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;
  const x = (clientX / innerWidth - 0.5) * 20;
  const y = (clientY / innerHeight - 0.5) * 20;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ---- Page load animation ----
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// ---- Glitch Title Effect (on hover) ----
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  heroTitle.addEventListener('mouseenter', () => {
    heroTitle.style.filter = 'hue-rotate(30deg)';
    setTimeout(() => {
      heroTitle.style.filter = 'none';
    }, 300);
  });
}

console.log(`
╔═══════════════════════════════╗
║   KRISDIYANSAH Portfolio      ║
║   Built with ❤️ by Antigravity ║
╚═══════════════════════════════╝
`);
