// =============================================
// TRAMITE MARKETING - MAIN JAVASCRIPT
// =============================================

(function() {
    'use strict';

    // =============================================
    // MOBILE MENU
    // =============================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    function toggleMenu() {
        const isOpen = hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
        hamburgerBtn.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
        navOverlay.setAttribute('aria-hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburgerBtn.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
            hamburgerBtn.focus();
        }
    });

    // =============================================
    // SMOOTH SCROLL
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // SCROLL ANIMATIONS
    // =============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });

    // =============================================
    // FORM VALIDATION
    // =============================================
    const formValidation = {
        patterns: {
            email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            phone: /^[\d\s+()-]{7,20}$/
        },

        messages: {
            name: {
                required: 'Il nome è obbligatorio',
                minLength: 'Il nome deve avere almeno 2 caratteri'
            },
            email: {
                required: 'L\'email è obbligatoria',
                invalid: 'Inserisci un\'email valida'
            },
            phone: {
                invalid: 'Inserisci un numero valido'
            },
            message: {
                required: 'Il messaggio è obbligatorio',
                minLength: 'Il messaggio deve avere almeno 20 caratteri'
            }
        },

        validateField(field) {
            const value = field.value.trim();
            const name = field.name;
            const formGroup = field.closest('.form-group');
            const errorSpan = document.getElementById(`${field.id}-error`);

            let isValid = true;
            let errorMessage = '';

            // Required check
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = this.messages[name]?.required || 'Campo obbligatorio';
            }
            // Specific validations
            else if (value) {
                switch(name) {
                    case 'name':
                        if (value.length < 2) {
                            isValid = false;
                            errorMessage = this.messages.name.minLength;
                        }
                        break;
                    case 'email':
                        if (!this.patterns.email.test(value)) {
                            isValid = false;
                            errorMessage = this.messages.email.invalid;
                        }
                        break;
                    case 'message':
                        if (value.length < 20) {
                            isValid = false;
                            errorMessage = this.messages.message.minLength;
                        }
                        break;
                    case 'phone':
                        if (value && !this.patterns.phone.test(value)) {
                            isValid = false;
                            errorMessage = this.messages.phone.invalid;
                        }
                        break;
                }
            }

            // Update UI
            formGroup.classList.toggle('error', !isValid);
            formGroup.classList.toggle('success', isValid && value);
            if (errorSpan) {
                errorSpan.textContent = errorMessage;
            }
            field.setAttribute('aria-invalid', !isValid);

            return isValid;
        },

        validateForm(form) {
            const fields = form.querySelectorAll('input, textarea, select');
            let isFormValid = true;

            fields.forEach(field => {
                if (field.name && !this.validateField(field)) {
                    isFormValid = false;
                }
            });

            return isFormValid;
        }
    };

    // Attach validation
    const quoteForm = document.getElementById('quoteForm');
    const formFields = quoteForm.querySelectorAll('input, textarea');

    formFields.forEach(field => {
        field.addEventListener('blur', () => formValidation.validateField(field));
        field.addEventListener('input', () => {
            if (field.closest('.form-group').classList.contains('error')) {
                formValidation.validateField(field);
            }
        });
    });

    // Form submission
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!formValidation.validateForm(this)) {
            const firstError = this.querySelector('.form-group.error input, .form-group.error textarea');
            if (firstError) firstError.focus();
            return;
        }

        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Invio in corso...';
        submitBtn.disabled = true;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                submitBtn.textContent = 'Richiesta inviata!';
                submitBtn.style.background = '#10B981';
                form.reset();

                // Remove success classes
                form.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('success', 'error');
                });

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Errore invio');
            }
        })
        .catch(error => {
            submitBtn.textContent = 'Errore - Riprova';
            submitBtn.style.background = '#EF4444';
            submitBtn.disabled = false;

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    });

    // =============================================
    // COOKIE CONSENT
    // =============================================
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');

    function setCookieConsent(consent) {
        localStorage.setItem('cookieConsent', JSON.stringify({
            consent: consent,
            timestamp: new Date().toISOString()
        }));
        cookieBanner.classList.remove('visible');

        if (consent) {
            // Initialize analytics or other tracking here if needed
            // gtag('consent', 'update', { analytics_storage: 'granted' });
        }
    }

    function checkCookieConsent() {
        const stored = localStorage.getItem('cookieConsent');
        if (!stored) {
            setTimeout(() => {
                cookieBanner.classList.add('visible');
            }, 1500);
        }
    }

    cookieAccept.addEventListener('click', () => setCookieConsent(true));
    cookieReject.addEventListener('click', () => setCookieConsent(false));

    checkCookieConsent();

    // =============================================
    // DYNAMIC YEAR
    // =============================================
    document.getElementById('currentYear').textContent = new Date().getFullYear();

})();
