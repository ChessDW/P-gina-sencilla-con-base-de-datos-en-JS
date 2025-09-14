export function inicializarValidacion() {
  document.addEventListener("input", (e) => {
    const input = e.target;
    if (input.tagName !== "INPUT") return;

    const valor = input.value.trim();

    if (valor === "") {
      input.classList.remove("valid", "invalid");
      return;
    }

    if (input.type === "number") {
      const num = parseFloat(valor);
      const esValido = !isNaN(num) && num >= 1 && num <= 100;
      aplicarClaseValidacion(input, esValido);
    }

    if (["nombreNuevo", "nuevoNombre", "nombreEditar", "nombreEliminar", "nombreBuscar"].includes(input.id)) {
      const esValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/.test(valor);
      aplicarClaseValidacion(input, esValido);
    }
  });
}

function aplicarClaseValidacion(input, condicion) {
  input.classList.remove("valid", "invalid");
  input.classList.add(condicion ? "valid" : "invalid");
}