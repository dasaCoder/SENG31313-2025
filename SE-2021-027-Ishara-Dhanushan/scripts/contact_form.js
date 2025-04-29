// Initialize EmailJS with your user ID
emailjs.init("06DEggSSJib73FOQM");

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const btnText = document.getElementById('buttonText');
    const loading = document.getElementById('loadingIcon');
    const status = document.getElementById('formStatus');
    const btn = this.querySelector('button');

    btnText.textContent = 'Sending…';
    loading.classList.remove('hidden');
    btn.disabled = true;
    status.classList.add('hidden');

    console.log("Submitting form...");

    emailjs.sendForm('service_wosr5qd', 'template_2keggsm', this)
        .then((res) => {
            console.log('SUCCESS!', res.status, res.text);
            status.textContent = 'Your message has been sent!';
            status.className = 'text-center text-sm mt-2 text-green-600';
            this.reset();
        }, (err) => {
            console.error('EmailJS error:', err);
            status.textContent = 'Oops! Something went wrong. Please try again.';
            status.className = 'text-center text-sm mt-2 text-red-600';
        })
        .finally(() => {
            btnText.textContent = 'Send Message';
            loading.classList.add('hidden');
            btn.disabled = false;
            status.classList.remove('hidden');
        });
});