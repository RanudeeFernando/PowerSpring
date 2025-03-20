document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");

    if (slides.length === 0) return; // Prevent errors if no slides exist

    // Ensure first slide is visible
    slides[slideIndex].classList.add("active");

    function showSlides() {
        slides[slideIndex].classList.remove("active"); // Hide current slide
        slideIndex = (slideIndex + 1) % slides.length; // Move to next slide
        slides[slideIndex].classList.add("active"); // Show new slide
    }

    setInterval(showSlides, 3000); // Change slide every 2 seconds
});


document.addEventListener("DOMContentLoaded", function () {
    // Typing effect for the Hero section heading
    function typeEffect(element, text, speed) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        element.textContent = ""; // Clear existing text
        typing();
    }

    const heroHeading = document.querySelector("#hero h1");
    typeEffect(heroHeading, "AI-Driven Energy Forecasting", 100);


});

