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

if (othersToggle) {
    othersToggle.addEventListener("click", function (e) {
        e.preventDefault(); 
        e.stopPropagation(); // 🔥 STOP the click from closing the main mobile menu
        
        dropdownMenu.classList.toggle("show");
        dropdownArrow.innerHTML = dropdownMenu.classList.contains("show") ? "▼" : "▶";
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
// 6. TOUCH SWIPE SUPPORT (Mobile Slider)
// ==========================================

// ==========================================
// 6. TOUCH SWIPE SUPPORT (Improved Version)
// ==========================================

// ==========================================
// 6. TOUCH SWIPE SUPPORT (Robust Version)
// ==========================================

function addSwipeSupport(sliderId, slideFunction) {
    const slider = document.querySelector(`#${sliderId} .slider-wrapper`);
    if (!slider) return;

    let startX = 0;
    let startTime = 0;
    const distanceThreshold = 40;   // minimum px distance
    const timeThreshold = 500;      // max swipe duration (ms)

    slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startTime = new Date().getTime();
    });

    slider.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        const endTime = new Date().getTime();

        const distance = endX - startX;
        const timeTaken = endTime - startTime;

        // Check horizontal swipe
        if (Math.abs(distance) > distanceThreshold && timeTaken < timeThreshold) {

            if (distance < 0) {
                // Swipe LEFT → Next slide
                slideFunction(1);
            } else {
                // Swipe RIGHT → Previous slide
                slideFunction(-1);
            }
        }
    });
}

// Activate swipe
addSwipeSupport("batam", slideBatam);
addSwipeSupport("bintan", slideBintan);
addSwipeSupport("pinang", slidePinang);