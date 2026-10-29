import { formatearPrecio } from '../utils/formatearPrecio';
import { AddToCartButton } from './AddToCartButton';

export function ProductCard({ id, nombre, marca, precio, precioOriginal, imagen, enOferta }) {
  const mostrarTachado = enOferta && precioOriginal && precioOriginal > precio;
  const descuento = mostrarTachado
    ? Math.round((1 - precio / precioOriginal) * 100)
    : 0;

  return (
    <article className="tarjeta">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p>Marca: {marca}</p>
      {mostrarTachado && (
        <p className="precio-original">
          <del aria-label="Precio original">${formatearPrecio(precioOriginal)}</del>
        </p>
      )}
      <p className={`precio ${enOferta ? 'precio-oferta' : ''}`}>${formatearPrecio(precio)}</p>
      {enOferta && (
        <span className="badge-oferta">
          En oferta{descuento > 0 && <> · -{descuento}%</>}
        </span>
      )}
      <div>
        <AddToCartButton producto={{ id, nombre, marca, precio, imagen }} />
      </div>
    </article>
  );
}
