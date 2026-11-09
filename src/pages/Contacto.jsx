import { useState } from 'react';
import { ContactForm } from '../components/ContactForm';

export default function Contacto() {
  const [confirmacion, setConfirmacion] = useState('');

  const handleSubmit = (datos) => {
    setConfirmacion(`¡Gracias ${datos.nombre}! Tu mensaje fue enviado correctamente ♡`);
  };

  return (
    <main>
      {/* Grilla de Bootstrap: ancho completo en celular, centrado y más angosto en escritorio */}
      <section className="contacto row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2>Contáctanos</h2>
          <p>Completa el formulario y te responderemos a la brevedad ♡</p>
          <ContactForm onSubmit={handleSubmit} />
          <p className="confirmacion" role="status">{confirmacion}</p>
        </div>
      </section>
    </main>
  );
}
