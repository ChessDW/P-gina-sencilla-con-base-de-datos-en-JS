export class Estudiante {
  /**
   * @param {string} nombre - Nombre completo del estudiante
   * @param {number[]} notas - Array de notas por materia
   */
  constructor(nombre, notas) {
    this.nombre = nombre;
    this.notas = notas;
  }

  /**
   * Calcula el promedio del estudiante
   * @returns {number} Promedio redondeado a dos decimales
   */
  get promedio() {
    if (!Array.isArray(this.notas) || this.notas.length === 0) return 0;
    const suma = this.notas.reduce((acc, nota) => acc + nota, 0);
    return parseFloat((suma / this.notas.length).toFixed(2));
  }

  /**
   * Convierte el estudiante a un objeto plano para guardar en localStorage
   * @returns {{nombre: string, notas: number[]}}
   */
  toJSON() {
    return {
      nombre: this.nombre,
      notas: this.notas
    };
  }
}