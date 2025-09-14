export function inicializarModoOscuro() {
  const body = document.body;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    body.classList.add("dark-mode");
  }
}

export function toggleModo() {
  document.body.classList.toggle("dark-mode");
}

// ✅ Exponer al HTML
window.toggleModo = toggleModo;