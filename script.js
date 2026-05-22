async function loadComponent(selector, file) {
    const container = document.querySelector(selector);
    if (!container) return;
    try {
        const response = await fetch(file);
        if (response.ok) {
            const html = await response.text();
            container.innerHTML = html;
            return true;
        }
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
    }
    return false;
}

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Load Components First
    await Promise.all([
        loadComponent("#main-header", "header.html"),
        loadComponent("#main-footer", "footer.html")
    ]);

    // 2. Initialize Page Logic
    initPageLogic();
});

function initPageLogic() {
    const navbar = document.querySelector(".header");
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const quickInquiryBtn = document.querySelector(".quick-inquiry-btn");

    // Fix active link highlighting
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;
        const linkPath = href.split("#")[0];
        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });

    const onScroll = () => {
        navbar?.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (quickInquiryBtn) {
        quickInquiryBtn.addEventListener("click", (e) => {
            const targetAttr = quickInquiryBtn.dataset.target;
            if (!targetAttr) return;
            if (targetAttr.includes(".html")) {
                window.location.href = targetAttr;
                return;
            }
            const target = document.querySelector(targetAttr || "#contact");
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }
    // --- Mobile Dropdown Toggle ---
    const dropdownToggles = document.querySelectorAll(".has-dropdown > a");
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener("click", (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const parent = toggle.parentElement;
                parent.classList.toggle("active");
            }
        });
    });

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuBtn.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuBtn.classList.remove("active");
            });
        });
    }

    const hasGSAP = Boolean(window.gsap && window.ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;



    if (!hasGSAP || prefersReducedMotion) {
        document.querySelectorAll("[data-count]").forEach((counter) => {
            counter.textContent = `${counter.dataset.count}+`;
        });
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const pageProgress = document.querySelector(".page-progress");
    if (pageProgress) {
        gsap.to(pageProgress, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.35
            }
        });
    }

    const heroVideo = document.querySelector(".hero-video");
    const heroSection = document.querySelector(".hero");
    if (heroVideo && heroSection) {
        gsap.to(heroVideo, {
            scale: 1,
            ease: "none",
            scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                scrub: 0.1
            }
        });
    }

    const revealSettings = [
        {
            selector: ".reveal-up",
            from: { y: 60, opacity: 0 },
            to: { y: 0, opacity: 1 }
        },
        {
            selector: ".reveal-left",
            from: { x: -85, opacity: 0 },
            to: { x: 0, opacity: 1 }
        },
        {
            selector: ".reveal-right",
            from: { x: 85, opacity: 0 },
            to: { x: 0, opacity: 1 }
        },
        {
            selector: ".reveal-scale",
            from: { scale: 0.82, opacity: 0, rotateX: 12 },
            to: { scale: 1, opacity: 1, rotateX: 0 }
        }
    ];

    revealSettings.forEach((item) => {
        gsap.utils.toArray(item.selector).forEach((element, index) => {
            gsap.fromTo(element, item.from, {
                ...item.to,
                duration: 0.95,
                delay: (index % 5) * 0.06,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 87%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    });

    gsap.utils.toArray(".section-animate").forEach((section) => {
        gsap.fromTo(section, {
            backgroundPosition: "50% 0%"
        }, {
            backgroundPosition: "50% 100%",
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    const whySection = document.querySelector("#why");
    const whyHub = document.querySelector(".why-hub-card");
    const whyLayout = document.querySelector(".why-layout-3d");

    if (whySection && whyHub && whyLayout) {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 901px)", () => {
            const whyTimeline = gsap.timeline({
                defaults: { ease: "power3.out" },
                scrollTrigger: {
                    trigger: whySection,
                    start: "top 68%",
                    toggleActions: "play none none none",
                    once: true
                }
            });

            whyTimeline
                .fromTo(".why-heading", {
                    opacity: 0,
                    y: 45,
                    rotationX: -8,
                    transformPerspective: 1100
                }, {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 0.7
                }, 0)
                .fromTo(".why-left-1", {
                    x: -260,
                    y: -120,
                    z: -220,
                    rotationY: 34,
                    rotationX: -18,
                    opacity: 0
                }, {
                    x: 0,
                    y: 0,
                    z: 0,
                    rotationY: 0,
                    rotationX: 0,
                    opacity: 1,
                    duration: 1.05
                }, 0.06)
                .fromTo(".why-left-2", {
                    x: -260,
                    y: 130,
                    z: -220,
                    rotationY: 30,
                    rotationX: 18,
                    opacity: 0
                }, {
                    x: 0,
                    y: 0,
                    z: 0,
                    rotationY: 0,
                    rotationX: 0,
                    opacity: 1,
                    duration: 1.05
                }, 0.14)
                .fromTo(".why-right-1", {
                    x: 260,
                    y: -120,
                    z: -220,
                    rotationY: -34,
                    rotationX: -18,
                    opacity: 0
                }, {
                    x: 0,
                    y: 0,
                    z: 0,
                    rotationY: 0,
                    rotationX: 0,
                    opacity: 1,
                    duration: 1.05
                }, 0.06)
                .fromTo(".why-right-2", {
                    x: 260,
                    y: 130,
                    z: -220,
                    rotationY: -30,
                    rotationX: 18,
                    opacity: 0
                }, {
                    x: 0,
                    y: 0,
                    z: 0,
                    rotationY: 0,
                    rotationX: 0,
                    opacity: 1,
                    duration: 1.05
                }, 0.14)
                .fromTo(".why-hub-card", {
                    scale: 0.5,
                    rotationY: 220,
                    rotationX: -25,
                    z: -280,
                    opacity: 0
                }, {
                    scale: 1,
                    rotationY: 0,
                    rotationX: 0,
                    z: 40,
                    opacity: 1,
                    duration: 1.2,
                    ease: "back.out(1.35)"
                }, 0.02)
                .fromTo(".hub-title span", {
                    y: 24,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.52
                }, 0.42)
                .fromTo(".why-stats div", {
                    y: 50,
                    rotationX: -20,
                    z: -120,
                    opacity: 0
                }, {
                    y: 0,
                    rotationX: 0,
                    z: 0,
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.7
                }, 0.52)
                .to(".ring-one", {
                    rotate: 360,
                    duration: 1.15,
                    ease: "none"
                }, 0)
                .to(".ring-two", {
                    rotate: -420,
                    duration: 1.15,
                    ease: "none"
                }, 0);

            gsap.to(".hub-glow", {
                scale: 1.14,
                opacity: 0.92,
                duration: 1.4,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });

            const hasFinePointer = window.matchMedia("(pointer:fine)").matches;
            if (hasFinePointer) {
                whyLayout.addEventListener("mousemove", (e) => {
                    const rect = whyLayout.getBoundingClientRect();
                    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
                    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8;

                    gsap.to(".why-col-left", {
                        rotateX: rx,
                        rotateY: ry - 8,
                        duration: 0.45,
                        ease: "power2.out"
                    });

                    gsap.to(".why-col-right", {
                        rotateX: rx,
                        rotateY: ry + 8,
                        duration: 0.45,
                        ease: "power2.out"
                    });

                    gsap.to(".why-hub-wrap", {
                        rotateX: rx * 0.7,
                        rotateY: ry * 0.7,
                        duration: 0.45,
                        ease: "power2.out"
                    });
                });

                whyLayout.addEventListener("mouseleave", () => {
                    gsap.to([".why-col-left", ".why-col-right", ".why-hub-wrap"], {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.55,
                        ease: "power2.out"
                    });
                });
            }
        });

        mm.add("(max-width: 900px)", () => {
            gsap.fromTo(".why-card-3d", {
                y: 60,
                opacity: 0,
                rotateX: -16,
                rotateY: 12
            }, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                rotateY: 0,
                stagger: 0.12,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#why",
                    start: "top 72%"
                }
            });

            gsap.fromTo(".why-hub-card", {
                scale: 0.75,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.9,
                ease: "back.out(1.4)",
                scrollTrigger: {
                    trigger: ".why-hub-wrap",
                    start: "top 78%"
                }
            });
        });
    }

    const aboutPremium = document.querySelector(".about-premium");
    if (aboutPremium) {
        gsap.set(".about-usp-card, .about-frame, .about-floating, .about-quality-seal", {
            transformPerspective: 1200
        });

        const aboutTimeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
                trigger: "#about",
                start: "top 68%",
                toggleActions: "play none none none",
                once: true
            }
        });

        aboutTimeline
            .fromTo(".about-kicker", {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5
            }, 0)
            .fromTo(".about-title", {
                y: 42,
                opacity: 0,
                rotationX: -12
            }, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 0.75
            }, 0.05)
            .fromTo(".about-lead", {
                x: -55,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 0.62
            }, 0.16)
            .fromTo(".about-body", {
                x: -55,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 0.62
            }, 0.24)
            .fromTo(".about-usp-a", {
                x: -130,
                y: -40,
                z: -180,
                rotationY: 28,
                rotationX: -12,
                opacity: 0
            }, {
                x: 0,
                y: 0,
                z: 0,
                rotationY: 0,
                rotationX: 0,
                opacity: 1,
                duration: 0.95
            }, 0.2)
            .fromTo(".about-usp-b", {
                y: 100,
                z: -180,
                rotationX: -28,
                opacity: 0
            }, {
                y: 0,
                z: 0,
                rotationX: 0,
                opacity: 1,
                duration: 0.95
            }, 0.25)
            .fromTo(".about-usp-c", {
                x: 130,
                y: 40,
                z: -180,
                rotationY: -28,
                rotationX: 12,
                opacity: 0
            }, {
                x: 0,
                y: 0,
                z: 0,
                rotationY: 0,
                rotationX: 0,
                opacity: 1,
                duration: 0.95
            }, 0.2)
            .fromTo(".about-frame-main", {
                x: 140,
                y: -90,
                z: -280,
                rotationY: -22,
                opacity: 0
            }, {
                x: 0,
                y: 0,
                z: 0,
                rotationY: 0,
                opacity: 1,
                duration: 1.08
            }, 0.18)
            .fromTo(".about-frame-side", {
                x: 120,
                y: 110,
                z: -260,
                rotationY: -18,
                rotationX: 12,
                opacity: 0
            }, {
                x: 0,
                y: 0,
                z: 0,
                rotationY: 0,
                rotationX: 0,
                opacity: 1,
                duration: 1.05
            }, 0.25)
            .fromTo(".about-floating-top", {
                x: -90,
                y: -45,
                opacity: 0
            }, {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.68
            }, 0.45)
            .fromTo(".about-floating-bottom", {
                x: -90,
                y: 48,
                opacity: 0
            }, {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.68
            }, 0.52)
            .fromTo(".about-quality-seal", {
                scale: 0.62,
                rotation: -28,
                opacity: 0
            }, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.84,
                ease: "back.out(1.3)"
            }, 0.58);

        gsap.to(".about-floating-top", {
            y: -10,
            duration: 1.9,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        gsap.to(".about-floating-bottom", {
            y: 10,
            duration: 2.1,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }

    // --- Our Product Portfolio Logic ---
    const pfPanels = document.querySelectorAll(".pf-panel");
    if (pfPanels.length > 0) {
        pfPanels.forEach((panel, i) => {
            const img = panel.querySelector("img");
            const content = panel.querySelector(".pf-content");
            const contentElements = content ? Array.from(content.children) : [];

            // 1. Initial Scroll Entrance Animation for the Panel
            gsap.fromTo(panel, {
                opacity: 0,
                y: 80,
                scale: 0.96
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.4,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: panel,
                    start: "top 88%",
                    toggleActions: "play none none none"
                }
            });

            // Sequential Content Reveal
            if (contentElements.length > 0) {
                gsap.fromTo(contentElements, {
                    opacity: 0,
                    y: 20,
                    filter: "blur(8px)"
                }, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: panel,
                        start: "top 75%"
                    }
                });
            }

            // 2. Premium Interactive Tilt & Magnetic Parallax
            panel.addEventListener("mousemove", (e) => {
                const rect = panel.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const percentX = (x - centerX) / centerX;
                const percentY = (y - centerY) / centerY;

                // Tilt the whole panel
                gsap.to(panel, {
                    rotationX: -percentY * 3,
                    rotationY: percentX * 3,
                    y: -12,
                    duration: 0.6,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                // Magnetic Parallax for the product image
                if (img) {
                    gsap.to(img, {
                        x: percentX * 25,
                        y: percentY * 25,
                        scale: 1.1,
                        duration: 0.8,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
                
                // Slight counter-shift for content to add depth
                if (content) {
                    gsap.to(content, {
                        x: -percentX * 8,
                        y: -percentY * 8,
                        duration: 0.8,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
            });

            panel.addEventListener("mouseleave", () => {
                gsap.to([panel, img, content], {
                    rotationX: 0,
                    rotationY: 0,
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.75)",
                    overwrite: "auto"
                });
            });
        });
    }

    const exportStage = document.querySelector(".export-stage");
    if (exportStage) {
        const exportTimeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
                trigger: "#export",
                start: "top 68%",
                toggleActions: "play none none none",
                once: true
            }
        });

        exportTimeline
            .fromTo(".export-visual", {
                x: -80,
                rotationY: 10,
                opacity: 0
            }, {
                x: 0,
                rotationY: 0,
                opacity: 1,
                duration: 0.9
            }, 0)
            .fromTo(".export-content .tag, .export-content h1, .export-content p", {
                y: 24,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 0.58
            }, 0.12)
            .fromTo(".export-meta div", {
                y: 24,
                opacity: 0,
                rotationX: -16
            }, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                stagger: 0.08,
                duration: 0.58
            }, 0.3)
            .fromTo(".market-tags span", {
                y: 20,
                opacity: 0,
                scale: 0.92
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: {
                    each: 0.03,
                    from: "random"
                },
                duration: 0.45
            }, 0.38)
            .fromTo(".export-badge", {
                y: 20,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 0.5
            }, 0.35);

        gsap.to(".export-scan-line", {
            top: "82%",
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".export-badge-a", {
            y: -8,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".export-badge-b", {
            y: 8,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    const missionStage = document.querySelector(".mission-stage");
    if (missionStage) {
        const missionTimeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
                trigger: ".mission",
                start: "top 68%",
                toggleActions: "play none none none",
                once: true
            }
        });

        missionTimeline
            .fromTo(".mission-heading", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0)
            .fromTo(".mission-vision", {
                x: -120,
                rotationY: 25,
                opacity: 0
            }, {
                x: 0,
                rotationY: 0,
                opacity: 1,
                duration: 0.95
            }, 0.1)
            .fromTo(".mission-mission", {
                x: 120,
                rotationY: -25,
                opacity: 0
            }, {
                x: 0,
                rotationY: 0,
                opacity: 1,
                duration: 0.95
            }, 0.1)
            .fromTo(".mission-core", {
                scale: 0.6,
                opacity: 0,
                rotationX: -45
            }, {
                scale: 1,
                opacity: 1,
                rotationX: 0,
                duration: 1.1,
                ease: "back.out(1.5)"
            }, 0.2)
            .fromTo(".mission-core-line", {
                scale: 0,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8
            }, 0.4);
    }

    const ctaStage = document.querySelector(".cta-stage");
    if (ctaStage) {
        const ctaTimeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
                trigger: "#contact",
                start: "top 72%",
                toggleActions: "play none none none",
                once: true
            }
        });

        ctaTimeline
            .fromTo(".cta-visual", {
                x: -70,
                rotationY: 15,
                opacity: 0
            }, {
                x: 0,
                rotationY: 0,
                opacity: 1,
                duration: 0.9
            }, 0)
            .fromTo(".cta-content h2, .cta-content p, .cta-meta", {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.65
            }, 0.1)
            .fromTo(".cta-actions a", {
                scale: 0.85,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                stagger: 0.12,
                duration: 0.6,
                ease: "back.out(1.4)"
            }, 0.3)
            .fromTo(".cta-float", {
                y: 20,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.5
            }, 0.4);
    }

    document.querySelectorAll(".tilt-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rx = (y / rect.height - 0.5) * -12;
            const ry = (x / rect.width - 0.5) * 12;

            gsap.to(card, {
                rotateX: rx,
                rotateY: ry,
                scale: 1.025,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    });

    document.querySelectorAll("[data-count]").forEach((counter) => {
        const count = parseInt(counter.dataset.count);
        ScrollTrigger.create({
            trigger: counter,
            start: "top 92%",
            onEnter: () => {
                let current = 0;
                const step = count / 45;
                const update = () => {
                    current += step;
                    if (current < count) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = `${count}+`;
                    }
                };
                update();
            },
            once: true
        });
    });

}

/* ================================
   QUALITY ANIMATED STRIP LOGIC
================================ */
document.addEventListener("DOMContentLoaded", function () {
  const section = document.getElementById("quality-strip");
  if (!section) return;

  const items = section.querySelectorAll(".quality-item");
  if (!items.length) return;

  section.classList.add("js-ready");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          items.forEach(function (item, index) {
            setTimeout(function () {
              item.classList.add("is-visible");
            }, index * 180);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(section);
  } else {
    items.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  let activeIndex = 0;
  setInterval(function () {
    items.forEach(function (item) {
      item.classList.remove("is-active");
    });

    items[activeIndex].classList.add("is-active");
    activeIndex = (activeIndex + 1) % items.length;
  }, 1800);
});

// --- Product Hero Slideshow (Slide from Right, Exit to Left) ---
const phSlideshow = document.querySelector('.ph-slideshow');
if (phSlideshow) {
    const phSlides = phSlideshow.querySelectorAll('.ph-slide');
    if (phSlides.length > 0) {
        let currentSlide = 0;
        
        // Initial setup: hide all except first
        gsap.set(phSlides, { x: "100%", opacity: 0 });
        gsap.set(phSlides[0], { x: "0%", opacity: 1 });

        setInterval(() => {
            const prevSlide = phSlides[currentSlide];
            currentSlide = (currentSlide + 1) % phSlides.length;
            const nextSlide = phSlides[currentSlide];

            // 1. Current slide moves LEFT and fades out
            gsap.to(prevSlide, { 
                x: "-100%", 
                opacity: 0, 
                duration: 0.8, 
                ease: "power3.inOut" 
            });

            // 2. Next slide comes from RIGHT and fades in
            gsap.fromTo(nextSlide, 
                { x: "100%", opacity: 0 },
                { x: "0%", opacity: 1, duration: 0.8, ease: "power3.inOut" }
            );
        }, 3000); // 3 seconds per slide
    }
}
