/**
 * TICMEAL ENTERPRISE - B2B INTERACTIVITY & LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. PERSONA TAB SWITCHER
       ========================================================================== */
    const personaTabs = document.querySelectorAll('.persona-tab');
    const personaPanels = document.querySelectorAll('.persona-panel');

    if (personaTabs.length && personaPanels.length) {
        personaTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active state from all tabs & panels
                personaTabs.forEach(t => t.classList.remove('active'));
                personaPanels.forEach(p => p.classList.remove('active'));

                // Activate clicked tab
                tab.classList.add('active');

                // Activate corresponding panel
                const targetId = tab.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    /* ==========================================================================
       2. INTERACTIVE ROI & FOOD WASTE REDUCTION CALCULATOR
       ========================================================================== */
    const calcDiners = document.getElementById('calc-diners');
    const calcMealCost = document.getElementById('calc-meal-cost');
    const calcWaste = document.getElementById('calc-waste');

    const dinersVal = document.getElementById('diners-val');
    const costVal = document.getElementById('cost-val');
    const wasteVal = document.getElementById('waste-val');

    const savingsDisplay = document.getElementById('calc-savings-display');
    const hoursDisplay = document.getElementById('calc-hours-display');
    const mealsDisplay = document.getElementById('calc-meals-display');
    const btnTransferRoi = document.getElementById('btn-transfer-roi');

    function updateCalculator() {
        if (!calcDiners || !calcMealCost || !calcWaste) return;

        const diners = parseInt(calcDiners.value, 10) || 400;
        const cost = parseFloat(calcMealCost.value) || 5.5;
        const wastePct = parseInt(calcWaste.value, 10) || 18;

        // Update slider value tags
        if (dinersVal) dinersVal.textContent = `${diners.toLocaleString('es-ES')} personas`;
        if (costVal) costVal.textContent = `$${cost.toFixed(2)} USD`;
        if (wasteVal) wasteVal.textContent = `${wastePct}%`;

        // Mathematical model:
        // Standard operational days per year: 250
        const annualMeals = diners * 250;
        const annualFoodBudget = annualMeals * cost;
        const currentWasteFraction = wastePct / 100;
        
        // TicMeal verified average waste reduction rate: 40% of baseline shrinkage
        const annualSavingsUSD = annualFoodBudget * currentWasteFraction * 0.40;
        
        // Meals saved from garbage:
        const mealsRescued = Math.round(annualMeals * currentWasteFraction * 0.40);
        
        // Operational hours saved (menu engineering, lot auditing, purchase forecasting):
        // Approx 1.5h per business day
        const hoursSaved = Math.round(250 * 1.5);

        // Update results in DOM
        if (savingsDisplay) {
            savingsDisplay.textContent = `$${Math.round(annualSavingsUSD).toLocaleString('es-ES')} USD`;
        }
        if (hoursDisplay) {
            hoursDisplay.textContent = `${hoursSaved.toLocaleString('es-ES')} hrs / año`;
        }
        if (mealsDisplay) {
            mealsDisplay.textContent = `${mealsRescued.toLocaleString('es-ES')} viandas`;
        }
    }

    if (calcDiners && calcMealCost && calcWaste) {
        [calcDiners, calcMealCost, calcWaste].forEach(slider => {
            slider.addEventListener('input', updateCalculator);
        });
        updateCalculator();
    }

    // Transfer ROI metrics into the Lead Form
    if (btnTransferRoi) {
        btnTransferRoi.addEventListener('click', () => {
            const diners = calcDiners ? calcDiners.value : 400;
            const savingsText = savingsDisplay ? savingsDisplay.textContent : '$39,600 USD';
            
            const contactSection = document.getElementById('contact');
            const leadDiners = document.getElementById('lead-diners');
            const leadMessage = document.getElementById('lead-mensaje');

            // Select nearest scale in lead dropdown
            if (leadDiners) {
                const dinersNum = parseInt(diners, 10);
                if (dinersNum < 150) {
                    leadDiners.value = "Menos de 150 comensales";
                } else if (dinersNum <= 500) {
                    leadDiners.value = "150 a 500 comensales";
                } else if (dinersNum <= 1500) {
                    leadDiners.value = "500 a 1,500 comensales";
                } else {
                    leadDiners.value = "Más de 1,500 comensales (Multi-Sede)";
                }
            }

            // Auto-populate message textarea
            if (leadMessage) {
                leadMessage.value = `Hola equipo de TicMeal, calculé en el simulador un ahorro anual proyectado de ${savingsText} para ${diners} comensales diarios. Me gustaría agendar una demo de 15 minutos y recibir el diagnóstico detallado para nuestra sede.`;
            }

            // Smooth scroll to contact
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                const nameInput = document.getElementById('lead-nombre');
                if (nameInput) {
                    setTimeout(() => nameInput.focus(), 600);
                }
            }
        });
    }

    /* ==========================================================================
       3. NAVBAR SCROLL EFFECT
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    function handleNavbarScroll() {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    /* ==========================================================================
       4. MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       5. INTERSECTION OBSERVER FOR ON-SCROLL ANIMATIONS
       ========================================================================== */
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if ('IntersectionObserver' in window && animateElements.length) {
        const appearObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        animateElements.forEach(el => appearObserver.observe(el));
    } else {
        // Fallback for older browsers
        animateElements.forEach(el => el.classList.add('visible'));
    }

    /* ==========================================================================
       6. FORM SUBMISSION FEEDBACK
       ========================================================================== */
    const contactForm = document.getElementById('b2b-lead-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const submitBtn = contactForm.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg style="width: 20px; height: 20px; animation: spin 1s linear infinite; margin-right: 8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                    </svg>
                    <span>Enviando solicitud...</span>
                `;
            }
        });
    }

});