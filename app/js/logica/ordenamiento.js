/**
 * Ordena una lista de estudiantes por nombre o promedio.
 * @param {Estudiante[]} estudiantes - Lista de estudiantes.
 * @param {string} criterio - "nombre" o "promedio".
 * @param {boolean} ascendente - true para ascendente, false para descendente.
 * @returns {Estudiante[]} - Lista ordenada.
 */
export function ordenarEstudiantes(estudiantes, criterio = "nombre", ascendente = true) {
  return [...estudiantes].sort((a, b) => {
    let valorA, valorB;

    if (criterio === "promedio") {
      valorA = a.promedio;
      valorB = b.promedio;
    } else {
      valorA = a.nombre.toLowerCase();
      valorB = b.nombre.toLowerCase();
    }

    if (valorA < valorB) return ascendente ? -1 : 1;
    if (valorA > valorB) return ascendente ? 1 : -1;
    return 0;
  });
}