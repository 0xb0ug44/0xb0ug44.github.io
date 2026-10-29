// ============================================
// 0xb0ug44 Portfolio — Main JavaScript
// ============================================

(function () {
  'use strict';

  // ---- NAV scroll effect ----
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle('active-nav',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));

  // ---- Typewriter effect ----
  const typeTarget = document.getElementById('typeTarget');
  if (typeTarget) {
    const text = 'Mohamed Yassine Bougamra — Cybersecurity Student';
    let i = 0;
    const speed = 55;

    function type() {
      if (i < text.length) {
        typeTarget.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    setTimeout(type, 600);
  }

  // ---- Counter animation ----
  function animateCounter(el, target, duration = 1500) {
    const start = performance.now();
    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('.stat-num[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ---- Fade-in on scroll ----
  const fadeEls = document.querySelectorAll(
    '.project-card, .cert-card, .blog-card, .rank-card, .channel, .section-header'
  );

  fadeEls.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // ---- Stagger project cards ----
  document.querySelectorAll('.projects-grid .project-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 60}ms`;
  });

  // ---- Project filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;

        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        if (show) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.pointerEvents = 'auto';
          card.style.position = 'relative';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          card.style.pointerEvents = 'none';
          card.style.position = 'absolute';
        }
      });
    });
  });

  // ---- Blog filter ----
  const blogFilterBtns = document.querySelectorAll('.blog-list').length > 0 ? 
    document.querySelectorAll('.projects-filter button') : null;
  
  if (blogFilterBtns && document.querySelectorAll('.blog-list-item').length > 0) {
    const blogItems = document.querySelectorAll('.blog-list-item');
    
    blogFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        blogFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        blogItems.forEach(item => {
          const cat = item.getAttribute('data-category');
          const show = filter === 'all' || cat === filter;

          item.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';

          if (show) {
            item.style.opacity = '1';
            item.style.maxHeight = '1000px';
            item.style.overflow = 'visible';
            item.style.display = 'block';
          } else {
            item.style.opacity = '0';
            item.style.maxHeight = '0';
            item.style.overflow = 'hidden';
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Contact form ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<span class="btn-icon">✓</span> Message Sent';
      btn.style.background = 'rgba(255, 61, 87, 0.15)';
      btn.style.color = 'var(--green)';
      btn.style.border = '1px solid var(--green)';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.cssText = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

  // ---- Copy code buttons ----
  document.querySelectorAll('.project-code pre, .blog-code-snippet pre').forEach(pre => {
    const wrap = document.createElement('div');
    wrap.className = 'code-wrap';
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'COPY';
    wrap.appendChild(btn);

    btn.addEventListener('click', () => {
      const text = pre.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'COPIED';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'COPY';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = 'COPIED';
        setTimeout(() => btn.textContent = 'COPY', 2000);
      });
    });
  });

  // ---- Smooth anchor scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Rank bars animation ----
  const rankBars = document.querySelectorAll('.rank-fill');
  const rankObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = '0';
        fill.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
        setTimeout(() => {
          const target = fill.closest('.rank-bar').style.getPropertyValue('--fill');
          fill.style.width = target;
        }, 300);
        rankObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  rankBars.forEach(bar => {
    bar.style.width = '0';
    rankObserver.observe(bar);
  });

  // ---- Cursor trail (subtle) ----
  let trail = [];
  const TRAIL_LEN = 8;

  document.addEventListener('mousemove', (e) => {
    trail.push({ x: e.clientX, y: e.clientY, t: Date.now() });
    if (trail.length > TRAIL_LEN) trail.shift();
  });

  // ---- Easter egg: Konami code ----
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === KONAMI[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0;
        activateHackerMode();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateHackerMode() {
    const msg = document.createElement('div');
    msg.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: var(--bg-0); border: 1px solid var(--green);
      color: var(--green); font-family: var(--font-mono); font-size: 1rem;
      padding: 2rem 3rem; z-index: 99999; text-align: center;
      box-shadow: 0 0 40px rgba(255,61,87,0.4);
    `;
    msg.innerHTML = `
      <div style="font-size:2rem;margin-bottom:1rem">💀</div>
      <div>ACCESS GRANTED</div>
      <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.5rem">You found the Konami code</div>
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }

})();
