const WA_NUMBER = "917099481497";

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
}

document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        if (navMenu) {
            navMenu.classList.remove("active");
        }
        if (hamburger) {
            hamburger.classList.remove("active");
        }
    });
});

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (!navbar) {
        return;
    }

    if (window.scrollY > 100) {
        navbar.style.padding = "10px 0";
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.5)";
    } else {
        navbar.style.padding = "15px 0";
        navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
    }
});

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") {
            return;
        }

        const target = document.querySelector(href);
        if (!target) {
            return;
        }

        e.preventDefault();
        const offsetTop = target.offsetTop - 90;
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
        });
    });
});

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = `${target}+`;
            clearInterval(timer);
            return;
        }
        element.textContent = `${Math.floor(start)}+`;
    }, 16);
}

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const counters = entry.target.querySelectorAll(".counter");
            counters.forEach((counter) => {
                const target = parseInt(counter.getAttribute("data-target"), 10);
                if (!Number.isNaN(target)) {
                    animateCounter(counter, target);
                }
            });
            counterObserver.unobserve(entry.target);
        });
    },
    { threshold: 0.5, rootMargin: "0px" }
);

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
    counterObserver.observe(statsSection);
}

const fadeInObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add("visible");
            fadeInObserver.unobserve(entry.target);
        });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll(".fade-in-section").forEach((section) => {
    fadeInObserver.observe(section);
});

const scrollObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll(
    ".program-card, .testimonial-card, .pricing-card, .team-card, .value-card, .service-card, .google-review-card"
).forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease";
    scrollObserver.observe(element);
});

document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) {
        return;
    }

    question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        document.querySelectorAll(".faq-item").forEach((faqItem) => {
            faqItem.classList.remove("active");
        });
        if (!isActive) {
            item.classList.add("active");
        }
    });
});

function showNotification(message, type = "success") {
    const existing = document.querySelector(".notification");
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "linear-gradient(135deg, var(--primary-color), var(--accent-color))" : "linear-gradient(135deg, #ff4444, #cc0000)"};
        color: ${type === "success" ? "#000" : "#fff"};
        padding: 16px 24px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 25px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 420px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("bookingName")?.value.trim();
        const phone = document.getElementById("bookingPhone")?.value.trim();
        const program = document.getElementById("bookingProgram")?.value.trim();
        if (!name || !phone || !program) {
            showNotification("Please complete all booking fields.", "error");
            return;
        }

        const message = `Hi! I want to book a free trial.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0APreferred Program: ${encodeURIComponent(program)}`;
        window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, "_blank");
        showNotification("Redirecting to WhatsApp...", "success");
        bookingForm.reset();
    });
}

const franchiseForm = document.getElementById("franchiseForm");
if (franchiseForm) {
    franchiseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("franchiseName")?.value.trim();
        const city = document.getElementById("franchiseCity")?.value.trim();
        const phone = document.getElementById("franchisePhone")?.value.trim();
        const investment = document.getElementById("franchiseInvestment")?.value.trim();
        if (!name || !city || !phone || !investment) {
            showNotification("Please complete all franchise fields.", "error");
            return;
        }

        const message = `Franchise Enquiry%0A%0AName: ${encodeURIComponent(name)}%0ACity: ${encodeURIComponent(city)}%0APhone: ${encodeURIComponent(phone)}%0AInvestment Range: ${encodeURIComponent(investment)}`;
        window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, "_blank");
        showNotification("Redirecting to WhatsApp...", "success");
        franchiseForm.reset();
        toggleFranchiseForm();
    });
}

function toggleFranchiseForm() {
    const wrapper = document.getElementById("franchiseFormWrapper");
    if (!wrapper) {
        return;
    }
    if (wrapper.style.display === "none" || wrapper.style.display === "") {
        wrapper.style.display = "block";
        setTimeout(() => {
            wrapper.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
        return;
    }
    wrapper.style.display = "none";
}

window.toggleFranchiseForm = toggleFranchiseForm;

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        if (!data.firstName || !data.lastName || !data.email || !data.message) {
            showNotification("Please fill in all required fields.", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification("Please enter a valid email address.", "error");
            return;
        }

        showNotification("Thank you. We will get back to you within 24 hours.", "success");
        contactForm.reset();
    });
}

document.querySelectorAll(".pricing-btn").forEach((button) => {
    button.addEventListener("click", function () {
        const card = this.closest(".pricing-card");
        if (!card) {
            return;
        }
        const planName = card.querySelector("h3")?.textContent.trim();
        const planPrice = card.querySelector(".amount")?.textContent.trim();
        if (!planName || !planPrice) {
            return;
        }
        const message = `Hi! I want to join the ${planName} plan ($${planPrice}/month).`;
        window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    });
});

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

const scrollTopBtn = document.createElement("button");
scrollTopBtn.className = "scroll-top";
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible");
    } else {
        scrollTopBtn.classList.remove("visible");
    }

    const heroBg = document.querySelector(".hero-bg");
    if (heroBg) {
        const scrolled = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
            }
            observer.unobserve(img);
        });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
    });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-menu a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }
});

const videoButtons = Array.from(document.querySelectorAll("button")).filter((button) =>
    button.textContent.toLowerCase().includes("watch video")
);

videoButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = document.createElement("div");
        modal.className = "video-modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <iframe
                    width="800"
                    height="450"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    frameborder="0"
                    allowfullscreen>
                </iframe>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector(".close-modal")?.addEventListener("click", () => {
            modal.remove();
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

document.querySelectorAll(".form-group input, .form-group textarea, .form-group select").forEach((input) => {
    input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
        if (!this.value) {
            this.parentElement.classList.remove("focused");
        }
    });
});

const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .video-modal .modal-content {
        position: relative;
        max-width: 90%;
    }

    .close-modal {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 40px;
        color: white;
        cursor: pointer;
        font-weight: 300;
    }

    .close-modal:hover {
        color: #FFB800;
    }
`;
document.head.appendChild(style);
