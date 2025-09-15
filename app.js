// Mobile Menu Toggle
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Typing Effect
const typingText = ["Software Developer", "Full Stack Engineer", "Freelancer"];
let i = 0;
let j = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = typingText[i];
  document.getElementById("typing").textContent =
    currentText.substring(0, j);

  if (!isDeleting && j < currentText.length) {
    j++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && j > 0) {
    j--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % typingText.length;
    setTimeout(typeEffect, 1000);
  }
}
typeEffect();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Hero animation on load
window.addEventListener("load", () => {
  document.querySelector(".hero-text").style.opacity = "1";
  document.querySelector(".hero-text").style.transform = "translateY(0)";
});

// Skills scroll animation
const skillItems = document.querySelectorAll(".skills li");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-skill");
    }
  });
}, { threshold: 0.3 });

skillItems.forEach(item => observer.observe(item));
