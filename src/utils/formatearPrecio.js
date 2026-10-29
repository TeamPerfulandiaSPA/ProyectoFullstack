// 380000 -> "380.000" (formato chileno, sin depender de Intl/ICU del entorno)
export function formatearPrecio(valor) {
  return String(valor).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
