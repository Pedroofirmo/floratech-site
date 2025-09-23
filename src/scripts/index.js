const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { 
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const cards = document.querySelectorAll('.card');
const titulo = document.querySelector('.titulo-section-culturas');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('show');
    } else {
        entry.target.classList.remove('show');
    }
    });
}, {
    threshold: 0.2
});

cards.forEach(card => observer.observe(card));
observer.observe(titulo);

(function() {
    if (window.floratechSensorsInitialized) return;
    window.floratechSensorsInitialized = true;

    document.addEventListener('DOMContentLoaded', function() {
    const botoes = Array.from(document.querySelectorAll('.menu-opcoes .opcao'));
    const cards  = Array.from(document.querySelectorAll('.card-explicativo'));

    if (!botoes.length || !cards.length) return;

    cards.forEach(c => c.classList.remove('active'));
    botoes.forEach(b => b.classList.remove('active'));

    const botaoInicial = botoes[0];
    const cardInicial = cards[0];

    if (botaoInicial) botaoInicial.classList.add('active');
    if (cardInicial) cardInicial.classList.add('active');

    botoes.forEach(botao => {
    botao.addEventListener('click', function() {
        botoes.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        cards.forEach(card => card.classList.remove('active'));
        const tab = this.getAttribute('data-tab');
        const cardAtivo = document.getElementById(tab);
        if (cardAtivo) cardAtivo.classList.add('active');
    });
    });
});
})();
