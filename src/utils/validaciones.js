// Funciones de validación reutilizables. Devuelven un objeto { campo: 'mensaje' };
// si el objeto está vacío, el formulario es válido.

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validarContacto({ nombre, email, mensaje }) {
  const errores = {};

  if (!nombre.trim()) errores.nombre = 'El nombre es obligatorio.';
  else if (nombre.trim().length < 3) errores.nombre = 'El nombre debe tener al menos 3 caracteres.';

  if (!email.trim()) errores.email = 'El correo es obligatorio.';
  else if (!REGEX_EMAIL.test(email.trim())) errores.email = 'Ingresa un correo válido (ej. nombre@correo.cl).';

  if (!mensaje.trim()) errores.mensaje = 'El mensaje es obligatorio.';
  else if (mensaje.trim().length < 10) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';

  return errores;
}

export function validarJuego({ nombre, categoria, precio, descripcion, imagen }) {
  const errores = {};

  if (!nombre.trim()) errores.nombre = 'El nombre es obligatorio.';
  if (!categoria.trim()) errores.categoria = 'La categoría es obligatoria.';

  if (precio === '') errores.precio = 'El precio es obligatorio.';
  else if (!Number.isFinite(Number(precio)) || Number(precio) <= 0) {
    errores.precio = 'Ingresa un precio mayor a 0.';
  }

  if (!descripcion.trim()) errores.descripcion = 'La descripción es obligatoria.';
  else if (descripcion.trim().length < 10) errores.descripcion = 'La descripción debe tener al menos 10 caracteres.';

  // La imagen es opcional, pero si se ingresa debe ser una URL http(s)
  if (imagen.trim() && !/^https?:\/\//i.test(imagen.trim())) {
    errores.imagen = 'La imagen debe ser una URL que parta con http:// o https://';
  }

  return errores;
}
