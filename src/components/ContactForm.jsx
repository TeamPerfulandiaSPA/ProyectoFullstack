import { useState } from 'react';

const inicial = { nombre: '', email: '', telefono: '', comuna: '', mensaje: '' };

const COMUNAS = ['Santiago', 'Providencia', 'San Miguel', 'Las Condes', 'Lo Barnechea'];

function validar({ nombre, email, telefono, mensaje }) {
  const errores = {};

  if (!nombre.trim()) errores.nombre = 'Ingresa tu nombre completo';
  else if (nombre.trim().length < 3) errores.nombre = 'El nombre debe tener al menos 3 caracteres';

  if (!email.trim()) errores.email = 'Ingresa tu correo electrónico';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errores.email = 'Ingresa un correo válido, ej: an.caiozzi@duocuc.cl';
  }

  if (telefono.trim() !== '' && !/^\+?[0-9]{8,12}$/.test(telefono.trim())) {
    errores.telefono = 'Ingresa un teléfono válido, ej: +569********';
  }

  if (mensaje.trim().length < 10) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres';

  return errores;
}

export function ContactForm({ onSubmit }) {
  const [valores, setValores] = useState(inicial);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores({ ...valores, [name]: value });
    if (errores[name]) setErrores({ ...errores, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar(valores);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      onSubmit(valores);
      setValores(inicial);
    }
  };

  const botonDeshabilitado = valores.mensaje.trim().length < 10;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="campo">
        <label htmlFor="nombre">Nombre completo *</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className={errores.nombre ? 'input-error' : ''}
          value={valores.nombre}
          onChange={handleChange}
          placeholder="Ej: Angy Caiozzi"
        />
        <span className="error">{errores.nombre}</span>
      </div>

      <div className="campo">
        <label htmlFor="email">Correo electrónico *</label>
        <input
          id="email"
          name="email"
          type="email"
          className={errores.email ? 'input-error' : ''}
          value={valores.email}
          onChange={handleChange}
          placeholder="Ej: an.caiozzi@duocuc.cl"
        />
        <span className="error">{errores.email}</span>
      </div>

      <div className="campo">
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          className={errores.telefono ? 'input-error' : ''}
          value={valores.telefono}
          onChange={handleChange}
          placeholder="Ej: +569*********"
        />
        <span className="error">{errores.telefono}</span>
      </div>

      <div className="campo">
        <label htmlFor="comuna">Comuna</label>
        <input
          id="comuna"
          name="comuna"
          list="lista-comunas"
          value={valores.comuna}
          onChange={handleChange}
          placeholder="Su comuna bellaka ♡"
        />
        <datalist id="lista-comunas">
          {COMUNAS.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <div className="campo">
        <label htmlFor="mensaje">Mensaje *</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="4"
          className={errores.mensaje ? 'input-error' : ''}
          value={valores.mensaje}
          onChange={handleChange}
          placeholder="Escribe tu consulta aquí..."
        />
        <span className="error">{errores.mensaje}</span>
      </div>

      <button type="submit" disabled={botonDeshabilitado}>
        Enviar mensaje
      </button>
    </form>
  );
}
