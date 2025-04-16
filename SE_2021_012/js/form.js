document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            simulateFormSubmission();
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = '';
        formMessage.classList.add(type);
        formMessage.style.display = 'block';

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    function simulateFormSubmission() {

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        setTimeout(() => {

            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            showMessage('Your message has been sent successfully!', 'success');
        }, 2000);
    }

    // In a real implementation, you would use something like EmailJS or fetch API:
    /*
    emailjs.sendForm('service_id', 'template_id', contactForm)
        .then(() => {
            showMessage('Message sent successfully!', 'success');
            contactForm.reset();
        }, (error) => {
            showMessage('Error sending message. Please try again.', 'error');
        });
    */
});