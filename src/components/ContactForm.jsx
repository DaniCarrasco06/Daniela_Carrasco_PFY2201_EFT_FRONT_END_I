import { useRef, useState } from 'react';
import { validarContacto } from '../utils/validaciones';

const VALORES_INICIALES = { nombre: '', email: '', mensaje: '' };

// Formulario de contacto controlado: cada campo vive en el estado "valores".
// Valida antes de enviar y muestra mensajes de error por campo.
function ContactForm() {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const campos = useRef({}); // referencias a los inputs para enfocar el primero con error

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setValores((actuales) => ({ ...actuales, [name]: value }));
    // Al escribir se limpia el error de ese campo y el mensaje de éxito anterior
    setErrores((actuales) => ({ ...actuales, [name]: undefined }));
    setEnviado(false);
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    const erroresEncontrados = validarContacto(valores);
    setErrores(erroresEncontrados);

    const primerCampoInvalido = ['nombre', 'email', 'mensaje'].find((campo) => erroresEncontrados[campo]);
    if (primerCampoInvalido) {
      // Manipulación directa del DOM mediante ref: lleva el cursor al primer campo con error
      campos.current[primerCampoInvalido]?.focus();
      setEnviado(false);
      return;
    }

    // Aquí iría el envío real (API). Por ahora se simula y se limpia el formulario.
    setEnviado(true);
    setValores(VALORES_INICIALES);
  }

  function claseCampo(campo) {
    return `form-control ${errores[campo] ? 'is-invalid' : ''}`;
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="formulario-gz">
      {enviado && (
        <div className="alert alert-success" role="alert">
          ¡Gracias! Recibimos tu mensaje y te responderemos pronto.
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="contacto-nombre" className="form-label">Nombre</label>
        <input
          id="contacto-nombre"
          name="nombre"
          type="text"
          className={claseCampo('nombre')}
          value={valores.nombre}
          onChange={manejarCambio}
          ref={(el) => { campos.current.nombre = el; }}
          aria-describedby="error-nombre"
        />
        <div id="error-nombre" className="invalid-feedback">{errores.nombre}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="contacto-email" className="form-label">Correo electrónico</label>
        <input
          id="contacto-email"
          name="email"
          type="email"
          className={claseCampo('email')}
          value={valores.email}
          onChange={manejarCambio}
          ref={(el) => { campos.current.email = el; }}
          aria-describedby="error-email"
        />
        <div id="error-email" className="invalid-feedback">{errores.email}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="contacto-mensaje" className="form-label">Mensaje</label>
        <textarea
          id="contacto-mensaje"
          name="mensaje"
          rows="4"
          className={claseCampo('mensaje')}
          value={valores.mensaje}
          onChange={manejarCambio}
          ref={(el) => { campos.current.mensaje = el; }}
          aria-describedby="error-mensaje"
        ></textarea>
        <div id="error-mensaje" className="invalid-feedback">{errores.mensaje}</div>
      </div>

      <button type="submit" className="btn btn-acento">Enviar mensaje</button>
    </form>
  );
}

export default ContactForm;
