import { ProductCard } from '../components/ProductCard';
import productos from '../data/productos';

export default function Productos() {
  return (
    <main>
      <section>
        <h2>Todos nuestros productos</h2>
        <div className="grid-productos">
          {productos.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </main>
  );
}
