// Tab system
function showTab(tabId, button) {
    const contents = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-btn");

    contents.forEach(content => content.classList.remove("active"));
    buttons.forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    button.classList.add("active");

    // 🔥 FORCE SLIDER REFRESH FIX
    if (tabId === "batam") {
        const wrapper = document.querySelector("#batam .slider-wrapper");
        wrapper.style.transform = "translateX(0%)";
    }
}

let currentBatamSlide = 0;

function slideBatam(direction) {
    const wrapper = document.querySelector("#batam .slider-wrapper");
    const slides = document.querySelectorAll("#batam .slide");
    const totalSlides = slides.length;

    currentBatamSlide += direction;

    // Fix left button issue (loop properly)
    if (currentBatamSlide < 0) {
        currentBatamSlide = totalSlides - 1;
    }

    if (currentBatamSlide >= totalSlides) {
        currentBatamSlide = 0;
    }

    wrapper.style.transform = "translateX(-" + (currentBatamSlide * 100) + "%)";
}

let currentBintanSlide = 0;

function slideBintan(direction) {
    const wrapper = document.querySelector("#bintan .slider-wrapper");
    const slides = document.querySelectorAll("#bintan .slide");
    const totalSlides = slides.length;

    currentBintanSlide += direction;

    // Fix left button issue (loop properly)
    if (currentBintanSlide < 0) {
        currentBintanSlide = totalSlides - 1;
    }

    if (currentBintanSlide >= totalSlides) {
        currentBintanSlide = 0;
    }

    wrapper.style.transform = "translateX(-" + (currentBintanSlide * 100) + "%)";
}

let currentPinangSlide = 0;

function slidePinang(direction) {
    const wrapper = document.querySelector("#pinang .slider-wrapper");
    const slides = document.querySelectorAll("#pinang .slide");
    const totalSlides = slides.length;

    currentPinangSlide += direction;

    // Fix left button issue (loop properly)
    if (currentPinangSlide < 0) {
        currentPinangSlide = totalSlides - 1;
    }

    if (currentPinangSlide >= totalSlides) {
        currentPinangSlide = 0;
    }

    wrapper.style.transform = "translateX(-" + (currentPinangSlide * 100) + "%)";
}

// ===============================
// Dropdown system with arrow toggle
// ===============================

const othersToggle = document.getElementById("othersToggle");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownArrow = document.getElementById("dropdownArrow");

if (othersToggle) {
    othersToggle.addEventListener("click", function (e) {
        e.preventDefault();
        dropdownMenu.classList.toggle("show");

        if (dropdownMenu.classList.contains("show")) {
            dropdownArrow.innerHTML = "▼";
        } else {
            dropdownArrow.innerHTML = "▶";
        }
    });
}

// Close when clicking outside
document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
        if (dropdownMenu) dropdownMenu.classList.remove("show");
        if (dropdownArrow) dropdownArrow.textContent = "▶";
    }
});

// Re-trigger fade animation on scroll
const contactSection = document.querySelector(".contact");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            contactSection.classList.add("show");
        } else {
            contactSection.classList.remove("show");
        }
    });
}, {
    threshold: 0.3
});

observer.observe(contactSection);

// Fade-in WhatsApp button after 1 second
window.addEventListener("load", function () {
    const waButton = document.querySelector(".whatsapp-float");

    setTimeout(function () {
        waButton.classList.add("show");
    }, 1000);
});