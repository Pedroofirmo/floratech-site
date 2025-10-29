function animarContador(elemento, alvo) {
    const duracao = 2000;
    const inicioTempo = performance.now();
    const textoInicial = elemento.textContent.trim(); 

    function atualizarContador(tempoAtual) {
        const tempoDecorrido = tempoAtual - inicioTempo;
        const progresso = Math.min(tempoDecorrido / duracao, 1);
        const valorAtual = Math.floor(progresso * alvo);

        let textoAtualizado = valorAtual.toLocaleString('pt-BR');

        if (progresso === 1) {
            if (alvo === 1000) {
                 textoAtualizado = '+1.000'; 
            } else if (alvo === 95) {
                textoAtualizado = '95%';
            } else if (alvo === 32) {
                textoAtualizado = '+32';
            } else {
                 textoAtualizado = alvo.toLocaleString('pt-BR'); 
            }
        } else {
            if (textoInicial.startsWith('+')) {
                textoAtualizado = '+' + textoAtualizado;
            }
            if (textoInicial.endsWith('%')) {
                textoAtualizado = textoAtualizado + '%';
            }
        }
        
        elemento.textContent = textoAtualizado;

        if (progresso < 1) {
            requestAnimationFrame(atualizarContador);
        }
    }

    requestAnimationFrame(atualizarContador);
}


document.addEventListener('DOMContentLoaded', () => {
    
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { 
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
    }

    const cards = document.querySelectorAll('.card');
    const titulo = document.querySelector('.titulo-section-culturas');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } 
        });
    }, {
        threshold: 0.2
    });

    cards.forEach(card => observer.observe(card));
    if (titulo) observer.observe(titulo);
    
    const botoes = Array.from(document.querySelectorAll('.menu-opcoes .opcao'));
    const cardsExplicativos = Array.from(document.querySelectorAll('.card-explicativo'));

    if (botoes.length > 0 && cardsExplicativos.length > 0) {
        const tabAtiva = document.querySelector('.menu-opcoes .opcao.active') || botoes[0];
        const cardAtivoId = tabAtiva.getAttribute('data-tab');
        const cardAtivo = document.getElementById(cardAtivoId);

        botoes.forEach(b => b.classList.remove('active'));
        cardsExplicativos.forEach(c => c.classList.remove('active'));

        if (tabAtiva) tabAtiva.classList.add('active');
        if (cardAtivo) cardAtivo.classList.add('active');

        botoes.forEach(botao => {
            botao.addEventListener('click', function() {
                botoes.forEach(b => b.classList.remove('active'));
                cardsExplicativos.forEach(card => card.classList.remove('active'));

                this.classList.add('active');
                const tab = this.getAttribute('data-tab');
                const cardAtivo = document.getElementById(tab);
                if (cardAtivo) cardAtivo.classList.add('active');
            });
        });
    }

    const linkSensores = document.getElementById('link-sensores');
    const secaoDispositivo = document.getElementById('dispositivo-section');

    if (linkSensores && secaoDispositivo) {
        linkSensores.addEventListener('click', (e) => {
            e.preventDefault();
            
            secaoDispositivo.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    const estatisticas = document.querySelectorAll('.estatistica-cartao__numero');
    const secaoTrabalho = document.querySelector('.secao-trabalho'); 
    
    if (!secaoTrabalho || estatisticas.length === 0) {
        return; 
    }

    let animacaoIniciada = false;

    const contadorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animacaoIniciada) {
                
                estatisticas.forEach(elemento => {
                    const alvo = parseInt(elemento.getAttribute('data-alvo'));
                    if (!isNaN(alvo)) {
                        animarContador(elemento, alvo);
                    }
                });
                
                animacaoIniciada = true; 
                contadorObserver.unobserve(secaoTrabalho); 
            }
        });
    }, { 
        threshold: 0.5 
    }); 

    contadorObserver.observe(secaoTrabalho);
});