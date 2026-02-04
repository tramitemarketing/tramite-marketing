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
                const offset = 20;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - offset;

                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    smoothScrollTo(targetPosition, 600);
                }
            }
        });
    });

    // =============================================
    // SCROLL ANIMATIONS (fade-in on scroll)
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
    // SCROLL PROGRESS BAR
    // =============================================
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollHeight > 0) {
            const progress = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = progress + '%';

            // Show/hide: only visible once user has scrolled
            if (scrollTop > 10) {
                scrollProgress.classList.add('visible');
            } else {
                scrollProgress.classList.remove('visible');
            }
        }
    }

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

            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = this.messages[name]?.required || 'Campo obbligatorio';
            }
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
        field.addEventListener('input', () => {
            const formGroup = field.closest('.form-group');
            if (formGroup.classList.contains('error') || field.value.trim().length > 0) {
                formValidation.validateField(field);
            }
        });

        field.addEventListener('blur', () => {
            if (field.hasAttribute('required') || field.value.trim().length > 0) {
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
        const originalHTML = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span class="btn-spinner"></span> Invio in corso...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                submitBtn.innerHTML = '✓ Richiesta inviata!';
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                form.reset();

                form.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('success', 'error');
                });

                submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });

                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                }, 4000);
            } else {
                throw new Error('Errore invio');
            }
        })
        .catch(() => {
            submitBtn.innerHTML = '✗ Errore - Riprova';
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('error');
            submitBtn.disabled = false;

            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.classList.remove('error');
            }, 4000);
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
    }

    function checkCookieConsent() {
        const stored = localStorage.getItem('cookieConsent');
        if (!stored) {
            let shown = false;

            const showBanner = () => {
                if (!shown) {
                    shown = true;
                    cookieBanner.classList.add('visible');
                    window.removeEventListener('scroll', showBanner);
                }
            };

            window.addEventListener('scroll', showBanner, { once: true, passive: true });

            setTimeout(() => {
                if (!shown) {
                    showBanner();
                }
            }, 3000);
        }
    }

    cookieAccept.addEventListener('click', () => setCookieConsent(true));
    cookieReject.addEventListener('click', () => setCookieConsent(false));

    checkCookieConsent();

    // =============================================
    // SMOOTH SCROLL POLYFILL
    // =============================================
    function smoothScrollTo(target, duration) {
        const start = window.pageYOffset;
        const distance = target - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // =============================================
    // NAVBAR SCROLL EFFECT + SCROLL PROGRESS
    // =============================================
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Navbar effect
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Scroll progress bar
        updateScrollProgress();
    }, { passive: true });

    // =============================================
    // DYNAMIC YEAR
    // =============================================
    document.getElementById('currentYear').textContent = new Date().getFullYear();

})();
