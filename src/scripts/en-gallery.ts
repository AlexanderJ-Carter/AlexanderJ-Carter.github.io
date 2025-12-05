export {};
// Filter functionality
const filterButtons = document.querySelectorAll<HTMLElement>('.filter-btn');
const galleryItems = document.querySelectorAll<HTMLElement>('.gallery-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;

    // Update active button
    filterButtons.forEach((btn) => {
      btn.classList.remove(
        'bg-gradient-to-r',
        'from-primary-500',
        'to-accent-500',
        'text-white'
      );
      btn.classList.add('bg-[rgb(var(--color-bg-secondary))]');
    });
    button.classList.add(
      'bg-gradient-to-r',
      'from-primary-500',
      'to-accent-500',
      'text-white'
    );
    button.classList.remove('bg-[rgb(var(--color-bg-secondary))]');

    // Filter items
    galleryItems.forEach((item) => {
      const itemCategory = item.dataset.category;
      if (category === 'all' || itemCategory === category) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s ease-out';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
