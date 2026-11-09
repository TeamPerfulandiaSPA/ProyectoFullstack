export function formatearPrecio(valor) {
  return String(valor).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
