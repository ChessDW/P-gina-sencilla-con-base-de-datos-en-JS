import { Estudiante } from '../estudiante.js';
import { MATERIAS, MENSAJES, COLORES_PROMEDIO, UMBRAL_APROBACION } from '../../config.js';
import { ocultarFormularios } from '../ui/formularios.js';
import { mostrarToast } from '../ui/toast.js';

let estudiantes = [];

export function inicializarEstudiantes() {
  const datos = JSON.parse(localStorage.getItem("estudiantes")) || [];
  estudiantes = datos.map(e => new Estudiante(e.nombre, e.notas));
}

function guardarDatos() {
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes.map(e => e.toJSON())));
}

export function getEstudiantes() {
  return estudiantes;
}

export function toggleBaseDeDatos() {
  const resultado = document.getElementById("resultado");
  const visible = !resultado.classList.contains("oculto");

  ocultarFormularios();

  if (visible) {
    resultado.classList.add("oculto");
    resultado.innerHTML = "";
    return;
  }

  resultado.innerHTML = "";

  if (estudiantes.length === 0) {
    resultado.innerHTML = `<div class="carta-estudiante">
      <h3>La base de datos está vacía</h3>
    </div>`;
  } else {
    estudiantes.forEach(est => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "carta-estudiante";

      const titulo = document.createElement("h3");
      titulo.textContent = `👤 ${est.nombre}`;
      tarjeta.appendChild(titulo);

      const lista = document.createElement("ul");
      MATERIAS.forEach((materia, i) => {
        const item = document.createElement("li");
        item.textContent = `${materia}: ${est.notas[i]}`;
        lista.appendChild(item);
      });
      tarjeta.appendChild(lista);

      const promedio = document.createElement("div");
      promedio.className = "promedio";
      promedio.textContent = `▶ Promedio: ${est.promedio.toFixed(2)}`;
      promedio.style.color = est.promedio >= UMBRAL_APROBACION
        ? COLORES_PROMEDIO.aprobado
        : COLORES_PROMEDIO.reprobado;
      tarjeta.appendChild(promedio);

      resultado.appendChild(tarjeta);
    });
  }

  resultado.classList.remove("oculto");
}

export function agregarEstudiante() {
  const nombreInput = document.getElementById("nombreNuevo");
  const nombre = normalizar(nombreInput.value);
  const inputs = document.querySelectorAll("#notasInputs input");

  if (
    !nombre ||
    !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/.test(nombreInput.value.trim()) ||
    estudiantes.some(e => normalizar(e.nombre) === nombre)
  ) {
    nombreInput.classList.add("invalid");
    mostrarToast(MENSAJES.errorDuplicado);
    return;
  }

  let notas = [];
  let validas = true;

  inputs.forEach((input) => {
    const valor = parseFloat(input.value);
    const esValido = !isNaN(valor) && valor >= 1 && valor <= 100;
    input.classList.toggle("valid", esValido);
    input.classList.toggle("invalid", !esValido);
    if (!esValido) validas = false;
    notas.push(valor);
  });

  if (!validas) {
    mostrarToast(MENSAJES.errorFormato);
    return;
  }

  estudiantes.push(new Estudiante(nombreInput.value.trim(), notas));
  guardarDatos();
  toggleBaseDeDatos();
}

export function editarEstudiante() {
  const nombreActualInput = document.getElementById("nombreEditar");
  const nuevoNombreInput = document.getElementById("nuevoNombre");
  const nombreActual = normalizar(nombreActualInput.value);
  const nuevoNombre = normalizar(nuevoNombreInput.value);
  const inputs = document.querySelectorAll("#editarNotasInputs input");

  const index = estudiantes.findIndex(e => normalizar(e.nombre) === nombreActual);
  if (index === -1) {
    nombreActualInput.classList.add("invalid");
    mostrarToast(MENSAJES.noEncontrado);
    return;
  }

  let notas = [...estudiantes[index].notas];
  let validas = true;

  inputs.forEach((input, i) => {
    const valor = input.value.trim();
    if (valor !== "") {
      const num = parseFloat(valor);
      const esValido = !isNaN(num) && num >= 1 && num <= 100;
      input.classList.toggle("valid", esValido);
      input.classList.toggle("invalid", !esValido);
      if (!esValido) validas = false;
      notas[i] = num;
    }
  });

  if (!validas) {
    mostrarToast(MENSAJES.errorFormato);
    return;
  }

  if (nuevoNombre && estudiantes.some((e, i) => normalizar(e.nombre) === nuevoNombre && i !== index)) {
    nuevoNombreInput.classList.add("invalid");
    mostrarToast(MENSAJES.errorDuplicado);
    return;
  }

  estudiantes[index].nombre = nuevoNombreInput.value.trim() || estudiantes[index].nombre;
  estudiantes[index].notas = notas;
  guardarDatos();
  toggleBaseDeDatos();
}

export function eliminarEstudiante() {
  const nombreInput = document.getElementById("nombreEliminar");
  const nombre = normalizar(nombreInput.value);
  const index = estudiantes.findIndex(e => normalizar(e.nombre) === nombre);

  if (index === -1) {
    nombreInput.classList.add("invalid");
    mostrarToast(MENSAJES.noEncontrado);
    return;
  }

  if (confirm(`¿Eliminar a ${estudiantes[index].nombre}?`)) {
    estudiantes.splice(index, 1);
    guardarDatos();
    toggleBaseDeDatos();
  }
}

export function buscarEstudiante() {
  const nombreInput = document.getElementById("nombreBuscar");
  const nombre = normalizar(nombreInput.value);
  const index = estudiantes.findIndex(e => normalizar(e.nombre) === nombre);
  const resultado = document.getElementById("resultado");

  ocultarFormularios();

  if (index === -1) {
    resultado.textContent = MENSAJES.noEncontrado;
    nombreInput.classList.add("invalid");
  } else {
    nombreInput.classList.add("valid");
    const est = estudiantes[index];
    let salida = `🔍 Resultados para ${est.nombre}:\n`;
    MATERIAS.forEach((m, i) => {
      salida += `   - ${m}: ${est.notas[i]}\n`;
    });
    salida += `   ➤ Promedio: ${est.promedio.toFixed(2)}\n`;
    resultado.textContent = salida;
  }

  resultado.classList.remove("oculto");
}

// 🔧 Utilidad interna
function normalizar(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
}