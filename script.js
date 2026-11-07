const WHATSAPP_NUMBER = "919876543210";

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const allNavLinks = document.querySelectorAll(".nav-link, .nav-cta");

function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.classList.toggle("active", isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));
}

function closeMenu() {
  navLinks.classList.remove("open");
  menuBtn.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", toggleMenu);

allNavLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const planButtons = document.querySelectorAll(".plan-btn");
const planSelect = document.getElementById("plan");

planButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedPlan = btn.getAttribute("data-plan");
    if (!planSelect) return;
    for (let i = 0; i < planSelect.options.length; i++) {
      if (planSelect.options[i].value.includes(selectedPlan)) {
        planSelect.selectedIndex = i;
        break;
      }
    }
  });
});

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const nameError = document.getElementById("name-error");
const phoneError = document.getElementById("phone-error");
const messageInput = document.getElementById("message");

nameInput.addEventListener("input", () => {
  if (nameInput.value.trim() !== "") {
    nameInput.classList.remove("invalid");
    nameError.classList.remove("visible");
  }
});

phoneInput.addEventListener("input", () => {
  if (phoneInput.value.trim().length >= 8) {
    phoneInput.classList.remove("invalid");
    phoneError.classList.remove("visible");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameVal = nameInput.value.trim();
  const phoneVal = phoneInput.value.trim();
  const selectedPlan = planSelect ? planSelect.value : "General Enquiry";
  const userMessage = messageInput ? messageInput.value.trim() : "";

  let isValid = true;

  if (nameVal === "") {
    nameInput.classList.add("invalid");
    nameError.classList.add("visible");
    isValid = false;
  } else {
    nameInput.classList.remove("invalid");
    nameError.classList.remove("visible");
  }

  const phoneDigits = phoneVal.replace(/[^0-9]/g, "");
  if (phoneVal === "" || phoneDigits.length < 8) {
    phoneInput.classList.add("invalid");
    phoneError.classList.add("visible");
    isValid = false;
  } else {
    phoneInput.classList.remove("invalid");
    phoneError.classList.remove("visible");
  }

  if (!isValid) {
    return;
  }

  let text = "Hello Iron Pulse Fitness!\n\n";
  text += "I would like to enquire about membership:\n";
  text += "• Name: " + nameVal + "\n";
  text += "• Phone: " + phoneVal + "\n";
  text += "• Interested Plan: " + selectedPlan + "\n";

  if (userMessage !== "") {
    text += "• Note: " + userMessage + "\n";
  }

  text += "\nPlease let me know the joining process and trial session availability.";

  const whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  window.open(whatsappUrl, "_blank");
});