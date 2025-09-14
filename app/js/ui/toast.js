/**
 * Muestra una notificación tipo toast en pantalla.
 * @param {string} mensaje - Texto a mostrar.
 * @param {number} [duracion=3000] - Tiempo en milisegundos antes de ocultarse.
 */
export function mostrarToast(mensaje, duracion = 3000) {
  const toast = document.getElementById("toast");

  if (!toast) {
    console.warn("Elemento #toast no encontrado en el HTML.");
    return;
  }

  toast.textContent = mensaje;
  toast.classList.add("visible");
  toast.classList.remove("oculto");

  setTimeout(() => {
    toast.classList.remove("visible");
    toast.classList.add("oculto");
  }, duracion);
}