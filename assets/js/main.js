/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("show");
      toggle.setAttribute("aria-expanded", isOpen.toString());
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");

if (navLink.length && navMenu) {
  navLink.forEach((link) =>
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
      }
    })
  );
}

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
const langBtn = document.getElementById("lang-toggle");
const i18nElements = document.querySelectorAll("[data-i18n-key]");

const translations = {
  en: {
    "nav-home": "Home",
    "nav-about": "About",
    "nav-skills": "Skills",
    "nav-work": "Work",
    "nav-contact": "Contact",
    "home-subtitle": "Hello, I'm",
    "home-title": "Sujal Chhetri Karki",
    "home-description": "A motivated IT enthusiast building useful web experiences with a strong focus on learning, accessibility, and polished design.",
    "contact-btn": "Contact Me",
    "download-cv": "Download CV",
    "stat-projects": "Projects delivered",
    "stat-experience": "Years of experience",
    "swipe-hint": "Swipe to navigate",
    "about-title": "About Me",
    "about-subtitle": "I am Sujal Chhetri Karki",
    "about-description": "Motivated IT beginner eager to launch a rewarding career in the Information Technology field. I enjoy solving problems, creating clean interfaces, and learning new tools every day.",
    "card1-title": "Entry-level Ready",
    "card1-desc": "Well-prepared for internships and junior developer roles.",
    "card2-title": "Modern Web",
    "card2-desc": "HTML, CSS, JavaScript and practical project experience.",
    "card3-title": "Learning Focused",
    "card3-desc": "Curious, collaborative, and always improving.",
    "skills-title": "Skills",
    "skills-subtitle-tech": "Technical Skills",
    "skills-subtitle-prof": "Professional skills",
    "work-title": "Work",
    "work-project1-title": "T-shirt Shopping System",
    "work-project1-desc": "PHP-based e-commerce project with product browsing and order flow.",
    "work-project2-title": "Profile Website",
    "work-project2-desc": "A personal portfolio website to present skills, work, and contact details.",
    "work-project2-btn": "View Project",
    "work-project3-title": "Student Performance Evaluation System",
    "work-project3-desc": "A project that evaluates student performance and generates reports.",
    "work-download": "Download Details",
    "contact-title": "Contact",
    "contact-tag": "Let's connect",
    "contact-subtitle": "Message me on WhatsApp",
    "contact-description": "Want to discuss a project, internship opportunity, or available roles? Fill the form and WhatsApp will open with your message.",
    "placeholder-name": "Your Name",
    "placeholder-email": "Your Email",
    "placeholder-message": "Your Message",
    "send-message": "Send Message",
    "footer-title": "My linked profiles"
  },
  ne: {
    "nav-home": "होम",
    "nav-about": "बारेमा",
    "nav-skills": "सीप",
    "nav-work": "कार्य",
    "nav-contact": "सम्पर्क",
    "home-subtitle": "नमस्कार, म",
    "home-title": "सुजल क्षेत्री कार्की",
    "home-description": "उपयोगी वेब अनुभवहरू निर्माण गर्ने प्रेरित आईटी उत्साही जसले सिकाइ, पहुँचयोग्यता र सफा डिजाइनमा केन्द्रित छ।",
    "contact-btn": "सम्पर्क गर्नुहोस्",
    "download-cv": "सीवी डाउनलोड गर्नुहोस्",
    "stat-projects": "डेलिभर गरिएका परियोजनाहरू",
    "stat-experience": "अनुभवका वर्षहरू",
    "swipe-hint": "नेभिगेट गर्न स्वाइप गर्नुहोस्",
    "about-title": "मेरो बारेमा",
    "about-subtitle": "म सुजल क्षेत्री कार्की हुँ",
    "about-description": "एक प्रेरित आईटी शुरुआती जसले सूचना प्रविधि क्षेत्रमा सफल क्यारियर सुरु गर्न उत्सुक छ। म समस्याहरू समाधान गर्न, सफा इन्टरफेसहरू बनाउन, र हरेक दिन नयाँ उपकरणहरू सिक्न रमाउँछु।",
    "card1-title": "प्रवेश स्तर तयार",
    "card1-desc": "इन्टर्नशिप र ज्युनियर डेभलपर भूमिकाहरूको लागि राम्रो तयारी।",
    "card2-title": "आधुनिक वेब",
    "card2-desc": "HTML, CSS, JavaScript र व्यावहारिक परियोजना अनुभव।",
    "card3-title": "अध्ययन केन्द्रित",
    "card3-desc": "जिज्ञासु, सहकार्यशील, र सधैं सुधार गर्दै।",
    "skills-title": "सीपहरू",
    "skills-subtitle-tech": "प्राविधिक सीपहरू",
    "skills-subtitle-prof": "व्यावसायिक सीपहरू",
    "work-title": "कार्य",
    "work-project1-title": "टी-शर्ट शपिंग सिस्टम",
    "work-project1-desc": "उत्पादन ब्राउजिङ र अर्डर फ्लो सहित PHP-आधारित ई-कमर्स परियोजना।",
    "work-project2-title": "प्रोफाइल वेबसाइट",
    "work-project2-desc": "सीप, काम र सम्पर्क विवरण प्रस्तुत गर्न व्यक्तिगत पोर्टफोलियो वेबसाइट।",
    "work-project2-btn": "परियोजना हेर्नुहोस्",
    "work-project3-title": "विद्यार्थी प्रदर्शन मूल्याङ्कन प्रणाली",
    "work-project3-desc": "विद्यार्थी प्रदर्शनको मूल्याङ्कन गर्ने र रिपोर्ट बनाउन परियोजना।",
    "work-download": "विवरण डाउनलोड गर्नुहोस्",
    "contact-title": "सम्पर्क",
    "contact-tag": "जोडौं",
    "contact-subtitle": "मलाई WhatsApp मा सन्देश पठाउनुहोस्",
    "contact-description": "के तपाईं परियोजना, इन्टर्नशिप अवसर, वा उपलब्ध भूमिकाहरू बारे छलफल गर्न चाहनुहुन्छ? फाराम भर्नुहोस् र WhatsApp तपाइँको सन्देशका साथ खुल्नेछ।",
    "placeholder-name": "तपाइँको नाम",
    "placeholder-email": "तपाइँको इमेल",
    "placeholder-message": "तपाइँको सन्देश",
    "send-message": "सन्देश पठाउनुहोस्",
    "footer-title": "मेरो लिंक गरिएको प्रोफाइलहरू"
  }
};

const setLanguage = (lang) => {
  i18nElements.forEach((el) => {
    const key = el.dataset.i18nKey;
    const attr = el.dataset.i18nAttr || "text";
    const value = translations[lang]?.[key] || translations.en[key] || el.textContent;

    if (attr === "placeholder") {
      el.placeholder = value;
    } else {
      if (el.childNodes.length && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        el.childNodes[0].nodeValue = value;
      } else {
        el.textContent = value;
      }
    }
  });

  if (langBtn) {
    langBtn.textContent = lang === "en" ? "ने" : "EN";
  }

  localStorage.setItem("lang", lang);
};

const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);

if (langBtn) {
  langBtn.addEventListener("click", () => {
    const nextLang = (localStorage.getItem("lang") || "en") === "en" ? "ne" : "en";
    setLanguage(nextLang);
  });
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
  document.addEventListener(
    'touchstart',
    (e) => {
      const touch = e.touches[0];
      if (touch) ripple(touch.clientX, touch.clientY);
    },
    { passive: true }
  );
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


