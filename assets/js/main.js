
document.documentElement.classList.remove('no-js');

const menu = document.getElementById('menu');
const links = document.getElementById('navLinks');

if (menu && links) {
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.querySelectorAll('.reveal').forEach(el => {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:.08});
  io.observe(el);
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const text = [
      'Olá, Clínica Caroline Flor! Gostaria de entrar em contato.',
      '',
      'Nome: ' + (data.get('nome') || ''),
      'E-mail: ' + (data.get('email') || ''),
      'Telefone: ' + (data.get('telefone') || ''),
      'Endereço: ' + (data.get('endereco') || ''),
      'Assunto: ' + (data.get('assunto') || ''),
      'Mensagem: ' + (data.get('mensagem') || '')
    ].join('\n');
    window.open('https://wa.me/5571987846093?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
}


document.querySelectorAll('[data-plans-carousel]').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('[data-plan-slide]')];
  const dots = [...carousel.querySelectorAll('[data-plan-dot]')];
  const prev = carousel.querySelector('[data-plan-prev]');
  const next = carousel.querySelector('[data-plan-next]');
  let current = 0;

  const show = index => {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
  };

  prev?.addEventListener('click', () => show(current - 1));
  next?.addEventListener('click', () => show(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

  let startX = null;
  carousel.addEventListener('touchstart', event => {
    startX = event.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', event => {
    if (startX === null) return;
    const delta = event.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 45) show(current + (delta < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });

  show(0);
});
