// ==========================================
// 1. MOBILE MENU (The "3-Lines" Feature)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            menuBtn.classList.toggle('open');
        });

        // Close menu when clicking a regular link, but NOT the dropdown toggle
        const navLinks = document.querySelectorAll('nav > a'); 
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                menuBtn.classList.remove('open');
            });
        });
    }
});

// ==========================================
// 2. TAB SYSTEM & SLIDER REFRESH
// ==========================================
function showTab(tabId, button) {
    const contents = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-btn");

    contents.forEach(content => content.classList.remove("active"));
    buttons.forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    button.classList.add("active");

    // Reset slider position to 0% so it doesn't look "broken" when switching
    const activeWrapper = document.querySelector(`#${tabId} .slider-wrapper`);
    if (activeWrapper) {
        activeWrapper.style.transform = "translateX(0%)";
        if (tabId === 'batam') currentBatamSlide = 0;
        if (tabId === 'bintan') currentBintanSlide = 0;
        if (tabId === 'pinang') currentPinangSlide = 0;
    }
}

// ==========================================
// 3. SLIDER LOGIC (Simplified Loop)
// ==========================================
let currentBatamSlide = 0;
function slideBatam(direction) {
    const wrapper = document.querySelector("#batam .slider-wrapper");
    const slides = document.querySelectorAll("#batam .slide");
    currentBatamSlide = (currentBatamSlide + direction + slides.length) % slides.length;
    wrapper.style.transform = `translateX(-${currentBatamSlide * 100}%)`;
}

let currentBintanSlide = 0;
function slideBintan(direction) {
    const wrapper = document.querySelector("#bintan .slider-wrapper");
    const slides = document.querySelectorAll("#bintan .slide");
    currentBintanSlide = (currentBintanSlide + direction + slides.length) % slides.length;
    wrapper.style.transform = `translateX(-${currentBintanSlide * 100}%)`;
}

let currentPinangSlide = 0;
function slidePinang(direction) {
    const wrapper = document.querySelector("#pinang .slider-wrapper");
    const slides = document.querySelectorAll("#pinang .slide");
    currentPinangSlide = (currentPinangSlide + direction + slides.length) % slides.length;
    wrapper.style.transform = `translateX(-${currentPinangSlide * 100}%)`;
}

// ==========================================
// 4. DROPDOWN SYSTEM (The Mobile Fix)
// ==========================================
const othersToggle = document.getElementById("othersToggle");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownArrow = document.getElementById("dropdownArrow");

if (othersToggle && dropdownMenu && dropdownArrow) {
    othersToggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        dropdownMenu.classList.toggle("show");
        dropdownArrow.textContent = dropdownMenu.classList.contains("show") ? "▼" : "▶";
    });

    // Close dropdown if clicking outside
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".dropdown")) {
            dropdownMenu.classList.remove("show");
            dropdownArrow.textContent = "▶";
        }
    });
}

// Close dropdown if clicking anywhere else on the page
document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
        if (dropdownMenu) dropdownMenu.classList.remove("show");
        if (dropdownArrow) dropdownArrow.textContent = "▶";
    }
});

// ==========================================
// 5. ANIMATIONS (WhatsApp & Contact)
// ==========================================
const contactSection = document.querySelector(".contact");
if (contactSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) contactSection.classList.add("show");
        });
    }, { threshold: 0.3 });
    observer.observe(contactSection);
}

window.addEventListener("load", () => {
    const waButton = document.querySelector(".whatsapp-float");
    if (waButton) setTimeout(() => waButton.classList.add("show"), 1000);
});

// ==========================================
// 6. TOUCH SWIPE SUPPORT (Final Fixed Version)
// ==========================================

function addSwipeSupport(sliderId, slideFunction) {
    const slider = document.querySelector(`#${sliderId} .${sliderId}-slider`);
    if (!slider) return;

    let startX = 0;
    let startY = 0;
    let isDragging = false;

    slider.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].clientX;
        startY = e.changedTouches[0].clientY;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;

        const diffX = endX - startX;
        const diffY = endY - startY;

        const threshold = slider.offsetWidth * 0.18;

        // 🔒 Axis lock: only react if horizontal is stronger than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            slideFunction(diffX < 0 ? 1 : -1);
        }
    }, { passive: true });

    // Desktop drag
    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const diffX = e.clientX - startX;
        const threshold = slider.offsetWidth * 0.18;

        if (Math.abs(diffX) > threshold) {
            slideFunction(diffX < 0 ? 1 : -1);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    addSwipeSupport("batam", slideBatam);
    addSwipeSupport("bintan", slideBintan);
    addSwipeSupport("pinang", slidePinang);
});

// ==========================================
// 7. PAGE EXIT FADE (Only When Leaving Page)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll("a");

    links.forEach(link => {

        if (link.hostname === window.location.hostname) {

            link.addEventListener("click", function (e) {

                const href = link.getAttribute("href");

                // Ignore anchors, empty links, dropdown toggles
                if (!href || href.startsWith("#") || href.startsWith("javascript")) {
                    return;
                }

                e.preventDefault(); // stop instant jump

                document.body.classList.add("fade-out");

                setTimeout(() => {
                    window.location.href = href;
                }, 1000); // 1 second fade
            });

        }

    });

});

// FAQ Toggle
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle("active");
    });
});

