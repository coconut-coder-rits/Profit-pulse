/* ===================== PAGE LOADER ===================== */
// Loader removed - page loads immediately

/* ===================== CUSTOM CURSOR ===================== */
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", (e) => {
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  setTimeout(() => {
    ring.style.left = e.clientX + "px";
    ring.style.top = e.clientY + "px";
  }, 80);
});

document
  .querySelectorAll("a, button, .deal-card, .benefit, .card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.opacity = "0.8";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.opacity = "0.5";
    });
  });

/* ===================== NAVBAR SCROLL ===================== */
const navbar = document.getElementById("navbar");
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    backTop.classList.add("show");
  } else {
    navbar.classList.remove("scrolled");
    backTop.classList.remove("show");
  }
});

/* ===================== MOBILE MENU ===================== */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
let menuOpen = false;

hamburger.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("open", menuOpen);
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll("span");
  if (menuOpen) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "";
  }
});

function closeMobile() {
  menuOpen = false;
  mobileMenu.classList.remove("open");
  const spans = hamburger.querySelectorAll("span");
  spans[0].style.transform = "";
  spans[1].style.opacity = "1";
  spans[2].style.transform = "";
}

/* ===================== SCROLL REVEAL ===================== */
const revealEls = document.querySelectorAll(".reveal, .reveal-right");

// Show all reveal elements immediately on page load
window.addEventListener("load", () => {
  revealEls.forEach((el) => {
    el.classList.add("visible");
  });
});

// Also add visible class if DOM is already ready
if (document.readyState === "complete") {
  revealEls.forEach((el) => {
    el.classList.add("visible");
  });
}

/* ===================== ANIMATED COUNTERS ===================== */
function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"));
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    // Format large numbers
    el.textContent =
      current >= 1000000
        ? "₹" + (current / 100000).toFixed(0) + "L"
        : current.toLocaleString("en-IN");
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 },
);

document
  .querySelectorAll(".counter-num")
  .forEach((el) => counterObserver.observe(el));

/* ===================== NEWSLETTER TOAST ===================== */
function handleSubscribe(e) {
  e.preventDefault();
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
  e.target.reset();
}

/* ===================== PARTICLE CANVAS ===================== */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animId;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -Math.random() * 0.6 - 0.2,
    size: Math.random() * 4 + 1,
    alpha: Math.random() * 0.4 + 0.1,
    color: Math.random() > 0.5 ? "0,176,80" : "249,115,22",
  };
}

for (let i = 0; i < 60; i++) particles.push(createParticle());

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.002;

    if (p.alpha <= 0 || p.y < -10) {
      particles[i] = createParticle();
      particles[i].y = canvas.height + 10;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    ctx.fill();
  });

  animId = requestAnimationFrame(drawParticles);
}

drawParticles();

/* ===================== SMOOTH ACTIVE NAV ===================== */
const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { threshold: 0.5 },
);

sections.forEach((s) => sectionObserver.observe(s));

/* ===================== CARD TILT EFFECT ===================== */
document.querySelectorAll(".deal-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    card.style.transform = `translateY(-12px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
