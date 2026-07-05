(function () {
  var pages = document.querySelectorAll('.page');
  var navBtns = document.querySelectorAll('[data-nav]');
  var navLinks = document.getElementById('navLinks');
  var burger = document.getElementById('burger');

  function go(target) {
    pages.forEach(function (p) {
      p.classList.toggle('active', p.id === 'page-' + target);
    });
    navBtns.forEach(function (b) {
      if (b.closest('.links')) b.classList.toggle('active', b.dataset.nav === target);
    });
    window.scrollTo({ top: 0, behavior: 'auto' });
    history.replaceState(null, '', '#' + target);
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    document.body.classList.remove('nav-open');
  }

  navBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      go(b.dataset.nav);
    });
  });

  burger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    burger.classList.toggle('open');
    document.body.classList.toggle('nav-open', navLinks.classList.contains('open'));
  });

  var initial = (location.hash || '#home').replace('#', '');
  if (!document.getElementById('page-' + initial)) initial = 'home';
  go(initial);
})();

/* ============================================================
   CONTACT FORM — EmailJS integration
   ============================================================ */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var status = document.getElementById('cfStatus');

  // Public key se EmailJS ko initialize karo
  emailjs.init('S6n5HGyg2WFADYT0m');

  var SERVICE_ID = 'service_r5dovnn';
  var TEMPLATE_ID = 'template_1b59u2l'; // <-- yaha apna asli template ID daalo

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    status.textContent = 'Sending...';
    status.className = 'form-note';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
      .then(function () {
        status.textContent = "Thanks! Your message has been noted — we'll get back to you within 24 hours.";
        status.className = 'form-note success';
        form.reset();
      })
      .catch(function (error) {
        status.textContent = 'Something went wrong. Please try again.';
        status.className = 'form-note error';
        console.error('EmailJS error:', error);
      });
  });
})();