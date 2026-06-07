const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-menu-toggle]");

if (nav && toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const currentFile = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("[data-nav] a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentFile) {
    link.setAttribute("aria-current", "page");
  }
});

const form = document.querySelector("[data-quote-form]");
const formStatus = document.querySelector("[data-form-status]");

if (form && formStatus) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const file = form.querySelector('input[type="file"]')?.files?.[0];
    payload.utworzono = new Date().toISOString();
    payload.zrodlo = "glass-studio-www";
    payload.zalacznik = file ? file.name : "";
    const savedRequests = JSON.parse(localStorage.getItem("glassStudioZapytania") || "[]");
    savedRequests.push(payload);
    localStorage.setItem("glassStudioZapytania", JSON.stringify(savedRequests));
    form.reset();
    formStatus.textContent = "Zapytanie zostalo zapisane testowo w przegladarce. W kolejnym etapie mozna podlaczyc wysylke do backendu lub e-mail.";
    formStatus.classList.add("is-visible");
  });
}
