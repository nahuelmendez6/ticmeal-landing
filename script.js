const heroData = [
    {
        text: "Optimiza tus horarios, organiza tus pedidos y toma el control total de tu comedor.",
        desktop: "assets/kitchen-monitor.png",
        mobile: "assets/ticket.png"
    },
    {
        text: "Gestiona tu menú y sus recetas.",
        desktop: "assets/item-recipe.png"
    },
    {
        text: "Gestiona turnos y horarios.",
        desktop: "assets/hours.png"
    },
    {
        text: "Asigná diferemtes menúes a los turnos.",
        desktop: "assets/shift-menu.png"
    },
    {
        text: "Obtené reportes sobre los costos.",
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