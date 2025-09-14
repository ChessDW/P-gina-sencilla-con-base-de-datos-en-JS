export function inicializarMenu() {
  const toggleBtn = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if (!toggleBtn || !sidebar) return;

  // Mostrar/ocultar al hacer clic en el botón hamburguesa
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("visible");
  });

  // Ocultar al hacer clic en cualquier botón del menú
  sidebar.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      sidebar.classList.remove("visible");
    });
  });

  // Ocultar al hacer clic fuera del menú
  document.addEventListener("click", (e) => {
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnToggle = toggleBtn.contains(e.target);

    if (!isClickInsideSidebar && !isClickOnToggle) {
      sidebar.classList.remove("visible");
    }
  });
}