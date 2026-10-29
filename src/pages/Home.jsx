import { ProductosDestacados } from '../components/ProductosDestacados';

export default function Home() {
  return (
    <>
      <section className="cuerpo">
        <h2>Muestra Esencia</h2>
        <img
          src="/img/imagen_index.jpg"
          alt="Muestra Esencia"
          style={{ display: 'block', margin: '0 auto', width: 350, height: 200, objectFit: 'cover' }}
        />
        <blockquote>
          "Un perfume no es solo un aroma; es un recuerdo invisible que perdura en el tiempo y cuenta tu historia sin palabras"
        </blockquote>
        <article>
          <h3>¿Por qué creamos este espacio?</h3>
          <p>
            Somos un equipo de apasionados por la estética olfativa, creadores y curadores dedicados a explorar el mundo en busca de esencias auténticas. Nuestra misión es simple pero poderosa: conectar a cada persona con el perfume que mejor refleje su verdadera personalidad.
            Trabajamos de la mano con perfumistas independientes y casas de autor que priorizan la calidad por encima de todo, garantizando fórmulas duraderas, cruelty-free y respetuosas con tu piel. No solo vendemos perfumes; diseñamos experiencias sensoriales que te acompañan en tus mejores momentos.
          </p>
          <ul className="valores">
            <li><strong>Artesanía y Calidad:</strong> Ingredientes puros con una fijación excepcional.</li>
            <li><strong>Exclusividad:</strong> Colecciones pensadas para quienes buscan distinguirse.</li>
            <li><strong>Pasión y Cercanía:</strong> Asesoramiento personalizado para encontrar tu firma olfativa ideal.</li>
          </ul>
        </article>
      </section>

      <main>
        <h2>Productos Destacados</h2>
        <ProductosDestacados />
      </main>
    </>
  );
}
