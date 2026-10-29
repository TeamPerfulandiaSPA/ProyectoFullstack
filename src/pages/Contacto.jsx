import { useState } from 'react';
import { ContactForm } from '../components/ContactForm';

export default function Contacto() {
  const [confirmacion, setConfirmacion] = useState('');

  const handleSubmit = (datos) => {
    setConfirmacion(`¡Gracias ${datos.nombre}! Tu mensaje fue enviado correctamente ♡`);
  };

  return (
    <main>
      <section className="contacto">
        <h2>Contáctanos</h2>
        <p>Completa el formulario y te responderemos a la brevedad ♡</p>
        <ContactForm onSubmit={handleSubmit} />
        <p className="confirmacion" role="status">{confirmacion}</p>
      </section>
    </main>
  );
}
