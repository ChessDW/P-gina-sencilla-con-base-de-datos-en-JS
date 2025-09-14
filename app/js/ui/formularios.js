const resultado = document.getElementById("resultado");
const formularios = document.querySelectorAll(".formulario");
const materias = ["Matemáticas", "Español", "Ciencias", "Estudios Sociales"];

export function ocultarFormularios() {
  formularios.forEach(f => f.classList.add("oculto"));
}

export function mostrarFormulario(tipo) {
  ocultarFormularios();
  resultado.classList.add("oculto");

  if (tipo === "agregar") {
    const contenedor = document.getElementById("notasInputs");
    contenedor.innerHTML = "";
    materias.forEach(m => {
      contenedor.innerHTML += `<input type="number" placeholder="Nota de ${m}" min="1" max="100">`;
    });
  }

  if (tipo === "editar") {
    const contenedor = document.getElementById("editarNotasInputs");
    contenedor.innerHTML = "";
    materias.forEach(m => {
      contenedor.innerHTML += `<input type="number" placeholder="Nueva nota de ${m}" min="1" max="100">`;
    });
  }

  const id = `formulario${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
  const formulario = document.getElementById(id);
  if (formulario) formulario.classList.remove("oculto");
}

export function inicializarFormularios() {
  // Si necesitas lógica de inicio, agrégala aquí
}

// ✅ Exponer funciones al HTML para que funcionen con onclick
window.mostrarFormulario = mostrarFormulario;
window.ocultarFormularios = ocultarFormularios;