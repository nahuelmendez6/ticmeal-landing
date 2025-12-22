const heroData = [
    {
        text: "Estandarice la logística alimentaria y mejore la experiencia de sus colaboradores.",
        desktop: "assets/kitchen-monitor.png",
        mobile: "assets/ticket.png"
    },
    {
        text: "Gestione menús inteligentes y centralice sus fichas técnicas/recetarios.",
        desktop: "assets/item-recipe.png"
    },
    {
        text: "Optimice el flujo de comensales mediante una gestión de turnos eficiente.",
        desktop: "assets/hours.png"
    },
    {
        text: "Personalice la oferta gastronómica según la franja horaria y sede.",
        desktop: "assets/shift-menu.png"
    },
    {
        text: "Tome decisiones basadas en datos con analítica de costos en tiempo real.",
        desktop: "assets/costos.png"
    }
];

let currentIndex = 0;
const heroText = document.getElementById('hero-text');
const desktopImg = document.getElementById('hero-desktop-img');
const mobileImg = document.getElementById('hero-mobile-img');
const mobileWrapper = mobileImg.parentElement;

function updateHero() {
    // Avanzar al siguiente índice (bucle infinito)
    currentIndex = (currentIndex + 1) % heroData.length;
    const data = heroData[currentIndex];

    // Actualizar contenido
    heroText.textContent = data.text;
    desktopImg.src = data.desktop;

    if (data.mobile) {
        mobileImg.src = data.mobile;
        mobileWrapper.style.display = 'block';
    } else {
        mobileWrapper.style.display = 'none';
    }

    // Reiniciar animación: quitamos la clase, forzamos reflow, y la volvemos a poner
    const elementsToAnimate = data.mobile ? [heroText, desktopImg, mobileImg] : [heroText, desktopImg];
    elementsToAnimate.forEach(el => {
        el.classList.remove('fade-in');
        void el.offsetWidth; // Trigger reflow
        el.classList.add('fade-in');
    });
}

// Cambiar cada 4 segundos
setInterval(updateHero, 4000);