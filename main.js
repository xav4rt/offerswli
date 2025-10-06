
class MobileNavigation {
    constructor() {
        this.mobileNavBtn = document.getElementById('mobileMenuBtn');
        this.mobileNavMenu = document.getElementById('mobileNav');
        this.mobileNavPanel = this.mobileNavMenu.querySelector('.mobile-nav__panel');
        this.navLines = this.mobileNavBtn.querySelectorAll('.mobile-nav__line');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.mobileNavBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleNav();
        });

        this.mobileNavMenu.addEventListener('click', (e) => {
            if (e.target === this.mobileNavMenu) {
                this.closeNav();
            }
        });

        const navLinks = this.mobileNavMenu.querySelectorAll('.mobile-nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeNav();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeNav();
            }
        });
    }

    toggleNav() {
        this.isOpen ? this.closeNav() : this.openNav();
    }

    openNav() {
        if (this.isOpen) return;
        this.isOpen = true;
        document.body.style.overflow = 'hidden';

        gsap.to(this.navLines[0], { rotation: 45, y: 5, duration: 0.3 });
        gsap.to(this.navLines[1], { opacity: 0, duration: 0.3 });
        gsap.to(this.navLines[2], { rotation: -45, y: -5, duration: 0.3 });
        
        this.mobileNavMenu.classList.remove('pointer-events-none');
        gsap.to(this.mobileNavMenu, { opacity: 1, duration: 0.3 });
        gsap.to(this.mobileNavPanel, { x: 0, duration: 0.4, ease: "power2.out" });
    }

    closeNav() {
        if (!this.isOpen) return;
        this.isOpen = false;
        document.body.style.overflow = '';

        gsap.to(this.navLines[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(this.navLines[1], { opacity: 1, duration: 0.3 });
        gsap.to(this.navLines[2], { rotation: 0, y: 0, duration: 0.3 });

        gsap.to(this.mobileNavPanel, { x: '100%', duration: 0.4, ease: "power2.in" });
        gsap.to(this.mobileNavMenu, { 
            opacity: 0, 
            duration: 0.3, 
            delay: 0.2,
            onComplete: () => this.mobileNavMenu.classList.add('pointer-events-none') 
        });
    }
}

function initSmoothScrolling() {
    gsap.registerPlugin(ScrollToPlugin);
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                gsap.to(window, {
                    scrollTo: { y: targetElement, offsetY: headerHeight + 20 },
                    duration: 1,
                    ease: "power2.inOut"
                });
                // If it's a mobile nav link, close the nav
                if (link.classList.contains('mobile-nav__link')) {
                    window.mobileNav.closeNav();
                }
            }
        });
    });
}

function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.from(section.querySelectorAll('h1, h2, h3, p, div, ul, a, article, details'), {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

function initFaqAccordion() {
    const allDetails = document.querySelectorAll('#faq details');
    allDetails.forEach(details => {
        details.addEventListener('toggle', () => {
            if (details.open) {
                allDetails.forEach(otherDetails => {
                    if (otherDetails !== details) {
                        otherDetails.open = false;
                    }
                });
            }
        });
    });
}

function initCookiePopup() {
    const COOKIE_KEY = 'cookiesAccepted-v1';
    if (localStorage.getItem(COOKIE_KEY) === 'true') return;

    const popupHTML = `
      <div id="cookie-popup" class="fixed bottom-0 left-0 w-full z-[999] bg-white shadow-2xl border-t-4 border-accent">
          <div class="max-w-7xl mx-auto p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex-1 text-second">
              <h3 class="text-xl font-bold mb-2">Cookies and Privacy</h3>
              <p class="text-third leading-relaxed text-sm">
                Our site uses cookies to enhance your browsing experience. By clicking "Accept", you consent to our use of cookies.
                <a href="#" class="text-accent hover:underline font-semibold">Cookie Policy</a>.
              </p>
            </div>
            <div class="flex-shrink-0 flex gap-3 w-full md:w-auto">
              <button id="accept-cookies-btn" class="w-full sm:w-auto text-center py-3 px-6 bg-accent text-white font-semibold rounded-lg hover:bg-accent2 transition-all shadow-lg">
                Accept
              </button>
            </div>
          </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    const popup = document.getElementById('cookie-popup');
    document.getElementById('accept-cookies-btn').addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'true');
        popup.remove();
    });
}

function initAgeConfirmation() {
    const AGE_KEY = 'ageConfirmed-v1';
    const VISITS_KEY = 'pageVisits-v1';

    const showModal = () => {
        const modalHTML = `
        <div id="age-confirm-modal" class="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4">
          <div class="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl flex flex-col items-center gap-6 text-center">
            <div class="w-16 h-16 bg-warning rounded-full flex items-center justify-center">
              <span class="text-white font-black text-2xl">18+</span>
            </div>
            <h2 class="text-second font-bold text-2xl">Confirm Your Age</h2>
            <p class="text-third leading-relaxed">You must be 18 or older to access this site. Please confirm your age to continue.</p>
            <div class="w-full flex flex-col sm:flex-row items-center gap-4">
              <button id="confirm-age-btn" class="w-full text-white bg-success hover:bg-green-600 transition px-6 py-3 text-lg font-semibold rounded-lg">I'm 18+ Years Old</button>
              <a href="https://www.google.com" class="w-full text-warning bg-white border-2 border-warning hover:bg-warning/10 transition px-6 py-3 text-lg font-semibold rounded-lg">I'm Under 18</a>
            </div>
          </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.style.overflow = 'hidden';

        document.getElementById('confirm-age-btn').addEventListener('click', () => {
            localStorage.setItem(AGE_KEY, 'true');
            localStorage.setItem(VISITS_KEY, '0');
            document.getElementById('age-confirm-modal').remove();
            document.body.style.overflow = '';
        });
    };

    let visits = parseInt(localStorage.getItem(VISITS_KEY)) || 0;
    let ageConfirmed = localStorage.getItem(AGE_KEY) === 'true';

    if (ageConfirmed && visits < 5) {
        visits++;
        localStorage.setItem(VISITS_KEY, visits.toString());
    } else {
        showModal();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('footerYear').textContent = new Date().getFullYear();

    window.mobileNav = new MobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initFaqAccordion();
    initCookiePopup();
    initAgeConfirmation();
});

window.addEventListener('resize', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});
