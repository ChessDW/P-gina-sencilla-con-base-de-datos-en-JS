import { MATERIAS } from '../../config.js';

/**
 * Filtra estudiantes por nota en una materia específica.
 * @param {Estudiante[]} estudiantes - Lista de estudiantes.
 * @param {Object} opciones - Opciones de filtrado.
 * @param {string} opciones.materia - Nombre de la materia.
 * @param {number} [opciones.minNota=0] - Nota mínima.
 * @param {number} [opciones.maxNota=100] - Nota máxima.
 * @returns {Estudiante[]} - Estudiantes que cumplen el filtro.
 */
export function filtrarPorMateria(estudiantes, { materia, minNota = 0, maxNota = 100 }) {
  const index = MATERIAS.indexOf(materia);
  if (index === -1) return [];

  return estudiantes.filter(est => {
    const nota = est.notas[index];
    return nota >= minNota && nota <= maxNota;
  });
}

/**
 * Filtra estudiantes por promedio general.
 * @param {Estudiante[]} estudiantes - Lista de estudiantes.
 * @param {number} [minPromedio=0] - Promedio mínimo.
 * @param {number} [maxPromedio=100] - Promedio máximo.
 * @returns {Estudiante[]} - Estudiantes que cumplen el filtro.
 */
export function filtrarPorPromedio(estudiantes, minPromedio = 0, maxPromedio = 100) {
  return estudiantes.filter(est => {
    const promedio = est.promedio;
    return promedio >= minPromedio && promedio <= maxPromedio;
  });
}

/**
 * Filtra estudiantes por nombre (búsqueda parcial o exacta).
 * @param {Estudiante[]} estudiantes - Lista de estudiantes.
 * @param {string} texto - Texto a buscar.
 * @param {boolean} [exacto=false] - Si se requiere coincidencia exacta.
 * @returns {Estudiante[]} - Estudiantes que coinciden.
 */
export function filtrarPorNombre(estudiantes, texto, exacto = false) {
  const normalizado = texto.trim().toLowerCase();
  return estudiantes.filter(est => {
    const nombre = est.nombre.trim().toLowerCase();
    return exacto ? nombre === normalizado : nombre.includes(normalizado);
  });
}