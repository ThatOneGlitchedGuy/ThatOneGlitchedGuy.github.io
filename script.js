// Boot skip handler - available immediately
let bootSkipped = false;

const skipBoot = () => {
  if (bootSkipped) return;
  bootSkipped = true;
  
  const bootScreen = document.getElementById('boot-screen');
  const container = document.querySelector('.container');
  const topBar = document.querySelector('.top-bar');
  
  if (bootScreen) bootScreen.classList.add('hidden');
  if (container) container.classList.add('visible');
  if (topBar) topBar.style.opacity = '1';
};

// Listen for any interaction immediately
document.addEventListener('keydown', skipBoot);
document.addEventListener('click', skipBoot);
document.addEventListener('touchstart', skipBoot);

// Boot sequence and page initialization
document.addEventListener('DOMContentLoaded', () => {
  const bootScreen = document.getElementById('boot-screen');
  const container = document.querySelector('.container');
  const topBar = document.querySelector('.top-bar');

  // Boot sequence duration - around 5.5 seconds (auto-advance)
  setTimeout(() => {
    skipBoot();
  }, 5200);

  // Reveal sections as they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(el => {
    revealOnScroll.observe(el);
  });

  // Rare glitch effects
  const logo = document.querySelector('.big-fahhhh');
  let glitchCounter = 0;

  setInterval(() => {
    // ~5% chance of glitch per interval
    if (Math.random() > 0.96) {
      glitchCounter++;
      const intensity = Math.random() * 3;
      logo.style.transform = `translate(${(Math.random() - 0.5) * intensity}px, ${(Math.random() - 0.5) * intensity}px)`;
      logo.style.textShadow = `
        ${Math.random() * 3}px 0 rgba(255,0,0,0.8),
        -${Math.random() * 3}px 0 rgba(255,255,255,0.6)
      `;

      setTimeout(() => {
        logo.style.transform = 'translate(0)';
        logo.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
      }, 80);
    }
  }, 300);

  // Subtle section flickers - very rare
  document.querySelectorAll('.section').forEach(section => {
    setInterval(() => {
      if (Math.random() > 0.98) {
        section.style.opacity = '0.95';
        setTimeout(() => {
          if (section.classList.contains('visible')) {
            section.style.opacity = '1';
          }
        }, 40);
      }
    }, 2000);
  });

  // Active section tracking for top-right indicator
  const sections = document.querySelectorAll('.layer-trigger');
  const activeIndicator = document.querySelector('.top-right .active');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const layer = entry.target.dataset.layer;
        updateActiveIndicator(layer);
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => sectionObserver.observe(section));

  function updateActiveIndicator(layer) {
    const labels = ['LAYERS', 'STACK', 'OUTPUT', 'TRACE', 'QUIT'];
    if (activeIndicator) {
      activeIndicator.textContent = labels[parseInt(layer) - 1] || 'TRACE';
    }
  }

  // Randomized link "access" effect
  document.querySelectorAll('.cmd-link').forEach(link => {
    link.addEventListener('click', function(e) {
      // Very rare: randomly delay click slightly for feeling of system processing
      if (Math.random() > 0.85) {
        e.preventDefault();
        const originalText = this.textContent;
        this.textContent = 'ACCESSING...';
        setTimeout(() => {
          this.textContent = originalText;
          window.open(this.href, '_blank');
        }, 200 + Math.random() * 300);
      }
    });
  });

  // Terminal-like cursor effect on body
  let cursorVisible = true;
  setInterval(() => {
    if (Math.random() > 0.98) {
      cursorVisible = !cursorVisible;
      document.body.style.cursor = cursorVisible ? 'text' : 'default';
    }
  }, 1000);

  // Very subtle page "lag" simulation - rare
  setInterval(() => {
    if (Math.random() > 0.97) {
      document.body.style.opacity = '0.98';
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 30);
    }
  }, 5000);
});

// Prevent text selection momentarily on very rare occasions (system "busy")
document.addEventListener('mousedown', (e) => {
  if (Math.random() > 0.998) {
    e.preventDefault();
    setTimeout(() => {
      document.body.style.userSelect = 'auto';
    }, 100);
  }
});
