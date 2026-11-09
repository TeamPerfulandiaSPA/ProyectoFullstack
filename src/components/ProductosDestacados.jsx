import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';

export const API_DESTACADOS = '/api/destacados.json';

export function ProductosDestacados() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_DESTACADOS)
      .then((res) => {
        if (!res.ok) throw new Error('Error de red');
        return res.json();
      })
      .then((data) => {
        setProductos(data.slice(0, 3));
        setCargando(false);
      })
      .catch(() => {
        setError('Error al cargar los productos');
        setCargando(false);
      });
  }, []);

  if (cargando) return <p className="estado-api">Cargando productos...</p>;
  if (error) return <p className="estado-api">{error}</p>;

  return (
    <div className="row g-4">
      {productos.map((p) => (
        <div key={p.id} className="col-12 col-sm-6 col-lg-4">
          <ProductCard {...p} />
        </div>
      ))}
    </div>
  );
}
