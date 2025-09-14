// Lista de materias disponibles en el sistema
export const MATERIAS = [
  "Matemáticas",
  "Español",
  "Ciencias",
  "Estudios Sociales"
];

// Límites permitidos para las notas
export const LIMITE_NOTA = {
  min: 1,
  max: 100
};

// Colores para representar el estado del promedio
export const COLORES_PROMEDIO = {
  aprobado: "#4CAF50",   // Verde
  reprobado: "#F44336"   // Rojo
};

// Umbral de aprobación
export const UMBRAL_APROBACION = 70;

// Mensajes personalizados para acciones
export const MENSAJES = {
  agregado: "Estudiante agregado ✅",
  actualizado: "Estudiante actualizado ✏️",
  eliminado: "Estudiante eliminado 🗑️",
  errorDuplicado: "Este estudiante ya existe ❌",
  errorFormato: "Nombre o nota inválida ⚠️",
  noEncontrado: "Estudiante no encontrado 🔍",
  baseVacia: "La base de datos está vacía 📫"
};