import { inicializarMenu } from './ui/menu.js';
import { inicializarModoOscuro, toggleModo } from './ui/modoOscuro.js';
import {
  inicializarFormularios,
  mostrarFormulario,
  ocultarFormularios
} from './ui/formularios.js';
import { inicializarValidacion } from './validacion/validacionInputs.js';
import {
  inicializarEstudiantes,
  agregarEstudiante,
  editarEstudiante,
  eliminarEstudiante,
  buscarEstudiante,
  toggleBaseDeDatos,
  getEstudiantes
} from './logica/estudiantes.js';
import { ordenarEstudiantes } from './logica/ordenamiento.js';
import { filtrarPorMateria, filtrarPorPromedio } from './logica/filtros.js';
import { mostrarToast } from './ui/toast.js';

// 🔧 Inicialización general
inicializarMenu();
inicializarModoOscuro();
inicializarFormularios();
inicializarValidacion();
inicializarEstudiantes();

// 🎯 Asignar eventos a botones del HTML
document.getElementById("modoOscuroBtn")?.addEventListener("click", toggleModo);

document.getElementById("btnAgregar")?.addEventListener("click", () => {
  mostrarFormulario("agregar");
});

document.getElementById("btnEditar")?.addEventListener("click", () => {
  mostrarFormulario("editar");
});

document.getElementById("btnEliminar")?.addEventListener("click", () => {
  mostrarFormulario("eliminar");
});

document.getElementById("btnBuscar")?.addEventListener("click", () => {
  mostrarFormulario("buscar");
});

document.getElementById("btnVerBD")?.addEventListener("click", () => {
  toggleBaseDeDatos();

  // Ejemplo: ordenar por promedio descendente
  const estudiantes = getEstudiantes();
  const ordenados = ordenarEstudiantes(estudiantes, "promedio", false);
  console.log("Estudiantes ordenados por promedio:", ordenados);
});

document.getElementById("guardarEstudiante")?.addEventListener("click", () => {
  agregarEstudiante();
  mostrarToast("Estudiante agregado ✅");
});

document.getElementById("actualizarEstudiante")?.addEventListener("click", () => {
  editarEstudiante();
  mostrarToast("Estudiante actualizado ✏️");
});

document.getElementById("eliminarEstudiante")?.addEventListener("click", () => {
  eliminarEstudiante();
  mostrarToast("Estudiante eliminado 🗑️");
});

document.getElementById("buscarEstudiante")?.addEventListener("click", () => {
  buscarEstudiante();
});