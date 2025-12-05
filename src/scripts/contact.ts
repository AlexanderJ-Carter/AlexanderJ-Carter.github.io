const form = document.getElementById('contact-form') as HTMLFormElement | null;
const successMessage = document.getElementById('success-message') as HTMLElement | null;

if (form && successMessage) {
  form.addEventListener('submit', async (e: SubmitEvent) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    // In production, send to your backend/email service
    console.log('Form submitted:', data);

    // Show success message
    form.style.display = 'none';
    successMessage.classList.remove('hidden');

    // Reset after 3 seconds
    setTimeout(() => {
      if (form && successMessage) {
        form.style.display = 'block';
        successMessage.classList.add('hidden');
        form.reset();
      }
    }, 3000);
  });
}
