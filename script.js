document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  initializeMenu();
  initializeContactForm();
});

function initializeTheme() {
  const body = document.body;
  const themeButton = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }

  if (!themeButton) return;

  updateThemeButtonLabel(themeButton, body.classList.contains("dark-theme"));

  themeButton.addEventListener("click", () => {
    const isDarkTheme = body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    updateThemeButtonLabel(themeButton, isDarkTheme);
  });
}

function updateThemeButtonLabel(button, isDarkTheme) {
  button.textContent = isDarkTheme ? "Tema claro" : "Tema escuro";
}

function initializeMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  if (!menuToggle || !nav) return;

  // Menu mobile para melhorar usabilidade em telas pequenas.
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

function initializeContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  if (!form || !feedback) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      showFeedback(
        feedback,
        "error",
        "Preencha todos os campos antes de enviar."
      );
      alert("Erro: preencha nome, e-mail e mensagem.");
      return;
    }

    // Regex simples para validar formato básico de e-mail.
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailIsValid) {
      showFeedback(feedback, "error", "Informe um e-mail valido.");
      alert("Erro: informe um e-mail no formato usuario@dominio.com.");
      return;
    }

    form.reset();
    showFeedback(feedback, "success", "Mensagem enviada com sucesso!");
    alert("Mensagem enviada com sucesso!");
  });
}

function showFeedback(element, type, message) {
  element.className = `feedback ${type}`;
  element.textContent = message;
}
