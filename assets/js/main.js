
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
