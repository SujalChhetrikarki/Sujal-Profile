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

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== TOUCH SWIPE NAVIGATION ====================*/
let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 50;
let currentSection = 0;
const sections = Array.from(document.querySelectorAll("section[id]"));

function getCurrentSectionIndex() {
  const scrollPos = window.scrollY + window.innerHeight / 2;
  return sections.findIndex((section) => {
    return scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight;
  });
}

function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({ behavior: "smooth" });
  }
}

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  const currentIndex = getCurrentSectionIndex();
  
  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance < 0 && currentIndex < sections.length - 1) {
      // Swipe left - next section
      scrollToSection(currentIndex + 1);
    } else if (swipeDistance > 0 && currentIndex > 0) {
      // Swipe right - previous section
      scrollToSection(currentIndex - 1);
    }
  }
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 72;
    const sectionId = current.getAttribute("id");
    const sectionLink = document.querySelector(
      `.nav__menu a[href*=${sectionId}]`
    );

    if (sectionLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        sectionLink.classList.add("active-link");
      } else {
        sectionLink.classList.remove("active-link");
      }
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL HEADER =====*/
const scrollHeader = () => {
  const header = document.getElementById("header");
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
};
window.addEventListener("scroll", scrollHeader);

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

/*===== THEME TOGGLE =====*/
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
      themeIcon.classList.replace("bx-moon", "bx-sun");
    } else {
      themeIcon.classList.replace("bx-sun", "bx-moon");
    }
  });
}
