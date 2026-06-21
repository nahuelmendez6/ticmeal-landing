// Configuración del carrusel del Hero
const heroData = [
    {
        text: "Estandarice la logística alimentaria y mejore la experiencia de sus colaboradores.",
        desktop: "assets/kitchen-monitor.png",
        mobile: "assets/ticket.png"
    },
    {
        text: "Gestione menús inteligentes y centralice sus fichas técnicas/recetarios.",
        desktop: "assets/item-recipe.png",
        mobile: null
    },
    {
        text: "Optimice el flujo de comensales mediante una gestión de turnos eficiente.",
        desktop: "assets/hours.png",
        mobile: null
    },
    {
        text: "Personalice la oferta gastronómica según la franja horaria y sede.",
        desktop: "assets/shift-menu.png",
        mobile: null
    },
    {
        text: "Tome decisiones basadas en datos con analítica de costos en tiempo real.",
        desktop: "assets/costos.png",
        mobile: null
    }
];

let currentIndex = 0;
const heroText = document.getElementById('hero-text');
const desktopImg = document.getElementById('hero-desktop-img');
const mobileImg = document.getElementById('hero-mobile-img');
const mobileFrame = mobileImg ? mobileImg.parentElement : null;

function updateHero() {
    currentIndex = (currentIndex + 1) % heroData.length;
    const data = heroData[currentIndex];

    // Aplicar transiciones suaves
    if (heroText) heroText.style.opacity = 0;
    if (desktopImg) desktopImg.style.opacity = 0;
    if (mobileFrame) mobileFrame.style.opacity = 0;

    setTimeout(() => {
        if (heroText) heroText.textContent = data.text;
        if (desktopImg && data.desktop) desktopImg.src = data.desktop;
        
        if (data.mobile && mobileFrame && mobileImg) {
            mobileImg.src = data.mobile;
            mobileFrame.style.display = 'block';
            setTimeout(() => mobileFrame.style.opacity = 1, 50);
        } else if (mobileFrame) {
            mobileFrame.style.display = 'none';
        }

        if (heroText) heroText.style.opacity = 1;
        if (desktopImg) desktopImg.style.opacity = 1;
    }, 500);
}

// Iniciar intervalo del hero
if (heroText || desktopImg) {
    setInterval(updateHero, 5000);
}

// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    appearanceObserver.observe(el);
});

// Lógica para el Sticky Scroll de Features
const stickyImg = document.getElementById('sticky-img');
const featureItems = document.querySelectorAll('.feature-item');

const stickyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Actualizar imagen
            const newImg = entry.target.getAttribute('data-img');
            if (stickyImg && newImg) {
                stickyImg.style.opacity = 0;
                stickyImg.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    stickyImg.src = newImg;
                    stickyImg.style.opacity = 1;
                    stickyImg.style.transform = 'scale(1)';
                }, 300);
            }

            // Resaltar texto
            featureItems.forEach(item => item.classList.remove('active-scroll'));
            entry.target.classList.add('active-scroll');
        }
    });
}, {
    threshold: 0.6
});

featureItems.forEach(item => {
    stickyObserver.observe(item);
});

// Efecto de transparencia en el Navbar al hacer scroll
function checkScroll() {
    const nav = document.querySelector('.navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
}
window.addEventListener('scroll', checkScroll);
window.addEventListener('DOMContentLoaded', checkScroll);

// Mobile navigation toggle menu drawer
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
}