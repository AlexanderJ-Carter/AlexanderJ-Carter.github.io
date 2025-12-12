export {};

// Intersection Observer for scroll-triggered animations
const observerOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Optionally unobserve after animation
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with reveal classes
const revealElements = document.querySelectorAll<HTMLElement>(
  '.reveal, .reveal-left, .reveal-right, .stagger'
);

revealElements.forEach((el) => observer.observe(el));

// Parallax effect on scroll
let ticking = false;

function updateParallax(): void {
  const parallaxElements =
    document.querySelectorAll<HTMLElement>('.parallax-layer');
  const scrolled = window.pageYOffset;

  parallaxElements.forEach((el) => {
    const speed = parseFloat(el.dataset.speed || '0.5');
    const yPos = -(scrolled * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });

  ticking = false;
}

function requestParallaxUpdate(): void {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

// 3D Card tilt effect
const card3dElements = document.querySelectorAll<HTMLElement>('.card-3d');

card3dElements.forEach((card) => {
  card.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform =
      'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial check for elements in viewport
  updateParallax();

  // Add loaded class to body for CSS animations
  document.body.classList.add('page-loaded');
});
