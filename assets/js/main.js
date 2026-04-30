/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

/*===== THEME TOGGLE (Unified) =====*/
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;
const icon = themeBtn ? themeBtn.querySelector("i") : null;

// Load saved theme on page load
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  if (icon) {
    icon.classList.remove("bx-moon");
    icon.classList.add("bx-sun");
  }
}

if (themeBtn && icon) {
  themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    // Change icon (moon ↔ sun)
    if (isDark) {
      icon.classList.remove("bx-moon");
      icon.classList.add("bx-sun");
      localStorage.setItem("theme", "dark");
    } else {
      icon.classList.remove("bx-sun");
      icon.classList.add("bx-moon");
      localStorage.setItem("theme", "light");
    }
  });
}

/* ================= RIPPLE ================= */
(function () {
  const colors = ['#7F77DD', '#1D9E75', '#D85A30', '#378ADD', '#D4537E'];
  let idx = 0;

  function ripple(x, y) {
    const color = colors[idx++ % colors.length];

    const r = document.createElement('div');
    Object.assign(r.style, {
      position: 'fixed',
      pointerEvents: 'none',
      borderRadius: '50%',
      border: '2.5px solid ' + color,
      width: '0px',
      height: '0px',
      left: x + 'px',
      top: y + 'px',
      transform: 'translate(-50%, -50%)',
      transition: '0.6s',
      opacity: '0.8',
      zIndex: '9999',
    });

    document.body.appendChild(r);

    requestAnimationFrame(() => {
      r.style.width = '140px';
      r.style.height = '140px';
      r.style.opacity = '0';
    });


    setTimeout(() => r.remove(), 600);
  }

  document.addEventListener('click', (e) => ripple(e.clientX, e.clientY));
})();

/*===== HEADER STYLE ON SECTION CHANGE =====*/
const header = document.getElementById("header");
const navLogo = document.querySelector(".nav__logo");

const updateHeaderForSection = () => {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      // Remove all section classes first
      header.classList.remove("header-home", "header-about", "header-skills", "header-work", "header-contact");
      
      // Add class for current section
      header.classList.add(`header-${sectionId}`);
      
      // Update nav logo color based on section
      if (sectionId === "home") {
        navLogo.style.background = "none";
        navLogo.style.webkitBackgroundClip = "unset";
        navLogo.style.webkitTextFillColor = "unset";
        navLogo.style.color = "var(--title-color)";
      } else {
        navLogo.style.background = "linear-gradient(135deg, var(--first-color), var(--second-color))";
        navLogo.style.webkitBackgroundClip = "text";
        navLogo.style.webkitTextFillColor = "transparent";
        navLogo.style.color = "transparent";
      }
    }
  });
};

window.addEventListener("scroll", updateHeaderForSection);
updateHeaderForSection(); // Initial call

/*===== CONTACT FORM =====*/
const contactForm = document.getElementById("contact-form");
const contactNotice = document.querySelector(".contact__notice");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      contactNotice.textContent = "Please fill in all fields before sending.";
      contactNotice.style.color = "#dc2626";
      return;
    }

    const whatsappNumber = "9779845808198";
    const whatsappText = `Hello Sujal, my name is ${encodeURIComponent(name)}.` +
      `%0AEmail: ${encodeURIComponent(email)}` +
      `%0A%0A${encodeURIComponent(message)}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

    contactNotice.textContent = "Opening WhatsApp...";
    contactNotice.style.color = "#16a34a";
    contactForm.reset();
    window.open(whatsappUrl, "_blank");
  });
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
});

sr.reveal(
  ".home__data, .home__buttons, .home__stats, .home__card, .about__content, .about__img, .skills__content, .skills__progress, .work__card, .contact__container",
  { interval: 100 }
);

/*===== PARTICLE ANIMATION =====*/
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 60;
const connectionDistance = 120;
const mouseDistance = 150;

let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.size = Math.random() * 3 + 1;
    this.color = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2})`;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouseDistance) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouseDistance - distance) / mouseDistance;
        const directionX = forceDirectionX * force * 3;
        const directionY = forceDirectionY * force * 3;
        
        this.x -= directionX;
        this.y -= directionY;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        const opacity = 1 - distance / connectionDistance;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


/* ================= RIPPLE ================= */
(function () {
  const colors = ['#7F77DD', '#1D9E75', '#D85A30', '#378ADD', '#D4537E'];
  let idx = 0;

  function ripple(x, y) {
    const color = colors[idx++ % colors.length];

    const r = document.createElement('div');
    Object.assign(r.style, {
      position: 'fixed',
      pointerEvents: 'none',
      borderRadius: '50%',
      border: '2.5px solid ' + color,
      width: '0px',
      height: '0px',
      left: x + 'px',
      top: y + 'px',
      transform: 'translate(-50%, -50%)',
      transition: '0.6s',
      opacity: '0.8',
      zIndex: '9999',
    });

    document.body.appendChild(r);

    requestAnimationFrame(() => {
      r.style.width = '140px';
      r.style.height = '140px';
      r.style.opacity = '0';
    });

    setTimeout(() => r.remove(), 600);
  }

  document.addEventListener('click', (e) => ripple(e.clientX, e.clientY));

})();


