/**
 * ============================================================
 *  TechAnuruddh Portfolio — app.js
 *  Updated: Professional, production-ready JavaScript
 * ============================================================
 *
 *  FORMSPREE CONFIGURATION
 *  ─────────────────────────────────────────────────────────────
 *  1. Go to https://formspree.io and sign up (free).
 *  2. Create a new form for: anuruddhyadav933@gmail.com
 *  3. Copy your form endpoint ID (looks like: xpwzrgkb)
 *  4. Replace  YOUR_FORMSPREE_ENDPOINT_ID  below with your ID.
 *  ─────────────────────────────────────────────────────────────
 */

// ─── CONFIGURATION ──────────────────────────────────────────
const FORMSPREE_ENDPOINT_ID = "xgavlqdq"; // ← Replace with your ID
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ENDPOINT_ID}`;
// ─────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {

  // ============================================================
  //  1. MOBILE NAVIGATION — toggle & close on link click
  // ============================================================
  const menuBtn   = document.getElementById("menu-btn");
  const navLinks  = document.getElementById("nav-links");
  const navItems  = navLinks ? navLinks.querySelectorAll("a") : [];

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navItems.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Close mobile nav on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.focus();
      }
    });
  }

  // ============================================================
  //  2. SMOOTH SCROLL — with fixed navbar offset compensation
  // ============================================================
  const HEADER_OFFSET = 85;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const pos = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
      window.scrollTo({ top: pos, behavior: "smooth" });
    });
  });

  // ============================================================
  //  3. TYPING EFFECT — role titles in hero
  // ============================================================
  const typingEl = document.getElementById("typing");
  if (typingEl) {
    const roles = [
      "Software Engineer",
      "AI/ML Engineer",
      "Python Full Stack Developer",
      "Django & React Developer",
    ];

    let roleIdx   = 0;
    let charIdx   = 0;
    let deleting  = false;
    let speed     = 100;

    function type() {
      const current = roles[roleIdx];

      if (deleting) {
        typingEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        speed = 50;
      } else {
        typingEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        speed = 100;
      }

      if (!deleting && charIdx === current.length) {
        deleting = true;
        speed = 1600;
      } else if (deleting && charIdx === 0) {
        deleting  = false;
        roleIdx   = (roleIdx + 1) % roles.length;
        speed     = 500;
      }

      setTimeout(type, speed);
    }

    setTimeout(type, 900);
  }

  // ============================================================
  //  4. HERO CANVAS PARTICLES — neural-net aesthetic
  // ============================================================
  const canvas = document.getElementById("hero-particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const MAX = 40;
    let particles = [];

    const resizeCanvas = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      canvas.width  = r.width;
      canvas.height = r.height;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.r  = Math.random() * 1.4 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.a  = Math.random() * 0.35 + 0.08;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${this.a})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < MAX; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${(1 - dist / 110) * 0.07})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    }
    animate();
  }

  // ============================================================
  //  5. TILT EFFECT — skills & project cards
  // ============================================================
  function addTilt(selector, maxDeg = 8) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const r   = card.getBoundingClientRect();
        const x   = e.clientX - r.left;
        const y   = e.clientY - r.top;
        const rx  = ((r.height / 2 - y) / (r.height / 2)) * maxDeg;
        const ry  = ((x - r.width  / 2) / (r.width  / 2)) * maxDeg;
        const gx  = (x / r.width)  * 100;
        const gy  = (y / r.height) * 100;

        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        card.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(59,130,246,0.06) 0%, rgba(15,23,42,0.6) 80%)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.background = "";
      });
    });
  }

  addTilt(".skills-card", 8);
  addTilt(".project-card", 6);

  // ============================================================
  //  6. CERTIFICATION LIGHTBOX
  // ============================================================
  const lightbox      = document.getElementById("cert-lightbox");
  const lightboxInner = document.getElementById("cert-lightbox-inner");
  const lightboxImg   = document.getElementById("cert-lightbox-img");
  const lightboxTitle = document.getElementById("cert-lightbox-title");
  const lightboxClose = document.getElementById("cert-lightbox-close");

  function openLightbox(imgSrc, title) {
    if (!lightbox) return;
    lightboxImg.src        = imgSrc;
    lightboxImg.alt        = title + " — Infosys Certificate";
    lightboxTitle.textContent = title;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    lightboxImg.src = "";
  }

  // Open on cert card click / Enter / Space
  document.querySelectorAll(".cert-card").forEach(card => {
    const openHandler = () => {
      const img   = card.dataset.certImg;
      const title = card.dataset.certTitle;
      if (img && title) openLightbox(img, title);
    };

    card.addEventListener("click", openHandler);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openHandler();
      }
    });
  });

  // View Certificate buttons
  document.querySelectorAll(".cert-view-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent double-firing with card click
      const card  = btn.closest(".cert-card");
      const img   = card ? card.dataset.certImg   : null;
      const title = card ? card.dataset.certTitle : null;
      if (img && title) openLightbox(img, title);
    });
  });

  // Close on button click
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

  // Close on backdrop click (outside the inner box)
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (!lightboxInner.contains(e.target)) closeLightbox();
    });
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });

  // ============================================================
  //  7. CONTACT FORM — Formspree AJAX with validation
  // ============================================================
  const form        = document.getElementById("contact-form");
  const nameInput   = document.getElementById("contact-name");
  const emailInput  = document.getElementById("contact-email");
  const msgInput    = document.getElementById("contact-message");
  const submitBtn   = document.getElementById("submit-btn");
  const statusBox   = document.getElementById("form-status");

  const nameError   = document.getElementById("name-error");
  const emailError  = document.getElementById("email-error");
  const msgError    = document.getElementById("message-error");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showFieldError(input, errorEl) {
    input.classList.add("input-error");
    errorEl.classList.add("visible");
  }

  function clearFieldError(input, errorEl) {
    input.classList.remove("input-error");
    errorEl.classList.remove("visible");
  }

  function showStatus(message, type) {
    statusBox.textContent  = message;
    statusBox.className    = "form-status " + type;
    statusBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hideStatus() {
    statusBox.className = "form-status";
    statusBox.textContent = "";
  }

  // Live validation — clear errors as user types
  if (nameInput)  nameInput.addEventListener("input",  () => clearFieldError(nameInput,  nameError));
  if (emailInput) emailInput.addEventListener("input",  () => clearFieldError(emailInput, emailError));
  if (msgInput)   msgInput.addEventListener("input",   () => clearFieldError(msgInput,   msgError));

  function validateForm() {
    let valid = true;

    const name  = nameInput  ? nameInput.value.trim()  : "";
    const email = emailInput ? emailInput.value.trim()  : "";
    const msg   = msgInput   ? msgInput.value.trim()    : "";

    if (name.length < 2) {
      showFieldError(nameInput, nameError);
      valid = false;
    } else {
      clearFieldError(nameInput, nameError);
    }

    if (!EMAIL_RE.test(email)) {
      showFieldError(emailInput, emailError);
      valid = false;
    } else {
      clearFieldError(emailInput, emailError);
    }

    if (msg.length < 10) {
      showFieldError(msgInput, msgError);
      valid = false;
    } else {
      clearFieldError(msgInput, msgError);
    }

    return valid;
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      hideStatus();

      if (!validateForm()) return;

      // Prevent duplicate submission
      if (submitBtn.disabled) return;

      // Check if endpoint is configured
      if (FORMSPREE_ENDPOINT_ID === "YOUR_FORMSPREE_ENDPOINT_ID") {
        showStatus(
          "⚠️ Contact form not configured yet. Please email me directly at anuruddhyadav933@gmail.com",
          "error"
        );
        return;
      }

      // Loading state
      const originalText    = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled    = true;

      const formData = new FormData(form);

      try {
        const response = await fetch(FORMSPREE_URL, {
          method:  "POST",
          body:    formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          showStatus("Message sent successfully! I'll get back to you soon.", "success");
          form.reset();
          clearFieldError(nameInput,  nameError);
          clearFieldError(emailInput, emailError);
          clearFieldError(msgInput,   msgError);
        } else {
          const data = await response.json().catch(() => ({}));
          const msg  = data.errors ? data.errors.map(e => e.message).join(", ") : "Something went wrong. Please try again.";
          showStatus(msg, "error");
        }
      } catch {
        showStatus("Something went wrong. Please try again.", "error");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled    = false;
      }
    });
  }

}); // end DOMContentLoaded
