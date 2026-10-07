// Formatea un número como precio chileno: 14990 -> "$14.990"
// Se usa en ProductCard y Cart (antes estaba duplicada en ambos archivos).
export function formatearPrecio(valor) {
  return `$${valor.toLocaleString('es-CL')}`;
}
