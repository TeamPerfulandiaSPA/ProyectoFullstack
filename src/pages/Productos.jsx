import { ProductCard } from '../components/ProductCard';
import productos from '../data/productos';

export default function Productos() {
  return (
    <main>
      <section>
        <h2>Todos nuestros productos</h2>
        {/* Grilla de Bootstrap: 1 / 2 / 3 tarjetas por fila según el ancho */}
        <div className="row g-4">
          {productos.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-lg-4">
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
