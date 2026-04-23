// Simple scroll reveal for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const revealOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  revealOnScroll.observe(el);
});

// Subtle "glitch" effect on the logo occasionally
const logo = document.querySelector('.big-fahhhh');
setInterval(() => {
  if (Math.random() > 0.95) {
    logo.style.textShadow = `
      ${Math.random() * 5}px 0 rgba(255,0,0,0.7),
      -${Math.random() * 5}px 0 rgba(255,255,255,0.7)
    `;
    setTimeout(() => {
      logo.style.textShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
    }, 100);
  }
}, 200);
