// ozvete-se-nam.js
// Formulář je neaktivní, nic se neodesílá.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-box");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Odesílání bude brzy dostupné.");
    });
  }
});
