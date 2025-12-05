export {};

// Gallery state
let currentImageIndex = 0;
let visibleImages: HTMLElement[] = [];

// Get all elements
const filterButtons = document.querySelectorAll<HTMLElement>('.filter-btn');
const galleryItems = document.querySelectorAll<HTMLElement>('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image') as HTMLImageElement;
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxCounter = document.getElementById('lightbox-counter');
const closeLightbox = document.getElementById('close-lightbox');
const prevImage = document.getElementById('prev-image');
const nextImage = document.getElementById('next-image');
const totalCount = document.getElementById('total-count');

// Initialize total count with animation
if (totalCount) {
  const target = galleryItems.length;
  const duration = 1500;
  const increment = target / (duration / 16);
  let current = 0;
  
  const animate = (): void => {
    current += increment;
    if (current < target) {
      totalCount.textContent = Math.floor(current).toString();
      requestAnimationFrame(animate);
    } else {
      totalCount.textContent = target.toString();
    }
  };
  animate();
}

// Update visible images array
function updateVisibleImages() {
  visibleImages = Array.from(galleryItems).filter(
    (item) => item.style.display !== 'none'
  );
}

// Filter functionality
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;

    // Update active button
    filterButtons.forEach((btn) => {
      btn.classList.remove(
        'bg-gradient-to-r',
        'from-primary-500',
        'to-accent-500',
        'text-white',
        'shadow-lg'
      );
      btn.classList.add('glass-card');
    });
    button.classList.add(
      'bg-gradient-to-r',
      'from-primary-500',
      'to-accent-500',
      'text-white',
      'shadow-lg'
    );
    button.classList.remove('glass-card');

    // Filter items with stagger animation
    let delay = 0;
    galleryItems.forEach((item) => {
      const itemCategory = item.dataset.category;
      if (category === 'all' || itemCategory === category) {
        setTimeout(() => {
          item.style.display = 'block';
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        }, delay);
        delay += 50;
      } else {
        item.style.display = 'none';
      }
    });

    updateVisibleImages();
  });
});

// Initialize visible images
updateVisibleImages();

// Open lightbox
galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const imageSrc = item.dataset.image;
    const title = item.dataset.title;
    const description = item.dataset.description;

    if (lightbox && lightboxImage && lightboxTitle && lightboxDescription) {
      currentImageIndex = Array.from(visibleImages).indexOf(item);
      
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';

      // Fade in animation
      setTimeout(() => {
        lightboxImage.src = imageSrc || '';
        lightboxImage.alt = title || '';
        if (lightboxTitle) lightboxTitle.textContent = title || '';
        if (lightboxDescription) lightboxDescription.textContent = description || '';
        updateLightboxCounter();
      }, 100);
    }
  });
});

// Close lightbox
function closeLightboxModal() {
  if (lightbox) {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

if (closeLightbox) {
  closeLightbox.addEventListener('click', closeLightboxModal);
}

// Close on background click
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightboxModal();
    }
  });
}

// Navigate images
function showImage(index: number) {
  if (index < 0) index = visibleImages.length - 1;
  if (index >= visibleImages.length) index = 0;
  
  currentImageIndex = index;
  const item = visibleImages[index];
  
  if (item && lightboxImage && lightboxTitle && lightboxDescription) {
    const imageSrc = item.dataset.image;
    const title = item.dataset.title;
    const description = item.dataset.description;

    // Fade out
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
      lightboxImage.src = imageSrc || '';
      lightboxImage.alt = title || '';
      if (lightboxTitle) lightboxTitle.textContent = title || '';
      if (lightboxDescription) lightboxDescription.textContent = description || '';
      updateLightboxCounter();
      // Fade in
      lightboxImage.style.opacity = '1';
    }, 200);
  }
}

function updateLightboxCounter() {
  if (lightboxCounter) {
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${visibleImages.length}`;
  }
}

if (prevImage) {
  prevImage.addEventListener('click', () => {
    showImage(currentImageIndex - 1);
  });
}

if (nextImage) {
  nextImage.addEventListener('click', () => {
    showImage(currentImageIndex + 1);
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (lightbox && !lightbox.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeLightboxModal();
    } else if (e.key === 'ArrowLeft') {
      showImage(currentImageIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showImage(currentImageIndex + 1);
    }
  }
});
