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
