export function Footer() {
  return (
    <footer>
      {/* Grilla de Bootstrap: 3 columnas desde tablet, apiladas en celular */}
      <div className="container">
        <div className="row g-4 footer-contenido text-center text-md-start">
          <div className="col-12 col-md-4">
            <h3>Perfulandia</h3>
            <p>Av. Siempre Bellakas 123, Santiago, Chile</p>
          </div>
          <div className="col-12 col-md-4">
            <h3>Contacto</h3>
            <p>bellakas@perfulandiaSPA.cl</p>
            <p>+56 2 2345 6789</p>
          </div>
          <div className="col-12 col-md-4">
            <h3>Horario</h3>
            <p>Lunes a Viernes de 9:00 a 18:00 hrs</p>
          </div>
        </div>
      </div>
      <p className="copyright">Perfulandia || Las Bellakas ❤️ © 2026</p>
    </footer>
  );
}
