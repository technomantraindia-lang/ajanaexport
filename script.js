document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("body", {
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    const swiperElement = document.querySelector(".hero-carousel");

    if (swiperElement && typeof Swiper !== "undefined") {
        const swiper = new Swiper(".hero-carousel", {
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            effect: "fade",
            fadeEffect: {
                crossFade: true
            }
        });

        function animateHeroText() {
            gsap.fromTo(
                ".hero-text > *",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.18,
                    ease: "power3.out"
                }
            );
        }

        animateHeroText();
        swiper.on("slideChangeTransitionStart", animateHeroText);
    }

    const video = document.querySelector(".hero-video");
    if (video) {
        video.play().catch(() => {
            console.log("Autoplay prevented.");
        });
    }

    /* Why Partner Section */
    gsap.fromTo(
        ".strength-header > *",
        { y: 35, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".strengths-v3",
                start: "top 78%"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
        }
    );

    gsap.fromTo(
        ".main-emblem-v4",
        { scale: 0.65, rotateY: 30, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".strengths-v3",
                start: "top 72%"
            },
            scale: 1,
            rotateY: 0,
            opacity: 1,
            duration: 1.1,
            ease: "back.out(1.6)"
        }
    );

    gsap.fromTo(
        ".left-panel .strength-card-3d",
        { x: -80, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".strengths-3d-layout",
                start: "top 80%"
            },
            x: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out"
        }
    );

    gsap.fromTo(
        ".right-panel .strength-card-3d",
        { x: 80, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".strengths-3d-layout",
                start: "top 80%"
            },
            x: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out"
        }
    );

    gsap.fromTo(
        ".strengths-bottom-strip",
        { y: 35, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".strengths-bottom-strip",
                start: "top 90%"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }
    );

    /* About Section */
    gsap.fromTo(
        ".about-intro > *, .about-bullet-points, .about-description, .about-feature-grid, .btn-explore-v2",
        { y: 35, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".about-v2",
                start: "top 78%"
            },
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out"
        }
    );

    gsap.fromTo(
        ".main-image-wrapper",
        { x: 90, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".about-visual-side",
                start: "top 82%"
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }
    );

    gsap.fromTo(
        ".sub-image-wrapper",
        { y: 70, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".about-visual-side",
                start: "top 82%"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out"
        }
    );

    gsap.fromTo(
        ".floating-badge",
        { scale: 0.5, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".about-visual-side",
                start: "top 82%"
            },
            scale: 1,
            opacity: 1,
            duration: 0.9,
            delay: 0.35,
            ease: "back.out(1.8)"
        }
    );

    /* Products Section */
    gsap.fromTo(
        ".products-header > *",
        { y: 35, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".products-premium",
                start: "top 78%"
            },
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.13,
            ease: "power3.out"
        }
    );

    gsap.fromTo(
        ".product-card-premium",
        { y: 55, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".products-grid-premium",
                start: "top 82%"
            },
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out"
        }
    );

    gsap.fromTo(
        ".products-bottom-note",
        { y: 25, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".products-bottom-note",
                start: "top 92%"
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out"
        }
    );

    /* 3D Tilt */
    const tiltElements = document.querySelectorAll(
        ".strength-card-3d, .product-card-premium, .feature-card-v2"
    );

    tiltElements.forEach((el) => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = ((y - rect.height / 2) / rect.height) * -8;
            const rotateY = ((x - rect.width / 2) / rect.width) * 8;

            gsap.to(el, {
                rotateX,
                rotateY,
                transformPerspective: 900,
                transformOrigin: "center",
                duration: 0.35,
                ease: "power2.out"
            });
        });

        el.addEventListener("mouseleave", () => {
            gsap.to(el, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.35,
                ease: "power2.out"
            });
        });
    });

    /* Mobile Menu Logic */
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-links a");

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenuBtn.classList.toggle("active");
            navLinks.classList.toggle("active");
            document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
        });

        navLinksItems.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenuBtn.classList.remove("active");
                navLinks.classList.remove("active");
                document.body.style.overflow = "";
            });
        });
    }
});


/* Modal Logic */
function openInquiryModal() {
    const modal = document.getElementById('inquiry-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeInquiryModal() {
    const modal = document.getElementById('inquiry-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on Esc key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeInquiryModal();
});


/* Testimonials Slider */
const testimonialsSlider = new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.t-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.t-btn-next',
        prevEl: '.t-btn-prev',
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1100: { slidesPerView: 3 }
    }
});


/* Advanced Scroll Animations */
gsap.utils.toArray('h2').forEach(heading => {
    gsap.from(heading, {
        scrollTrigger: {
            trigger: heading,
            start: 'top 90%',
        },
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power4.out',
        skewY: 3
    });
});

/* Parallax for Background Elements */
gsap.to('.products-bg-leaf, .v-m-bg-leaf-top', {
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
    },
    y: -100,
    rotation: 10,
    ease: 'none'
});

/* Smooth Reveal for Cards */
gsap.utils.toArray('.product-card-premium, .testimonial-card, .v-m-card-premium').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 92%',
        },
        duration: 0.8,
        opacity: 0,
        y: 40,
        delay: i % 3 * 0.1,
        ease: 'power2.out'
    });
});

/* =========================================================
   EXTRA BUTTON MAGNET + IMAGE HOVER ANIMATION
   Paste at bottom of script.js
   Does not change UI/text/features
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const animatedButtons = document.querySelectorAll(
        ".btn-primary, .btn-hero-outline, .btn-explore-v2, .btn-inquiry, .btn-inquiry-solid, .btn-submit-p"
    );

    animatedButtons.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            btn.style.setProperty("--mouse-x", `${x}px`);
            btn.style.setProperty("--mouse-y", `${y}px`);

            const moveX = (x - rect.width / 2) * 0.12;
            const moveY = (y - rect.height / 2) * 0.18;

            if (typeof gsap !== "undefined") {
                gsap.to(btn, {
                    x: moveX,
                    y: moveY - 4,
                    duration: 0.35,
                    ease: "power3.out"
                });
            }
        });

        btn.addEventListener("mouseleave", () => {
            if (typeof gsap !== "undefined") {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.45,
                    ease: "elastic.out(1, 0.45)"
                });
            } else {
                btn.style.transform = "";
            }
        });
    });

    const animatedImages = document.querySelectorAll(
        ".main-image-wrapper, .sub-image-wrapper, .product-card-premium, .export-visual"
    );

    animatedImages.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            if (typeof gsap !== "undefined") {
                gsap.to(item, {
                    scale: 1.015,
                    duration: 0.45,
                    ease: "power3.out"
                });
            }
        });

        item.addEventListener("mouseleave", () => {
            if (typeof gsap !== "undefined") {
                gsap.to(item, {
                    scale: 1,
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: "power3.out"
                });
            }
        });
    });
});
