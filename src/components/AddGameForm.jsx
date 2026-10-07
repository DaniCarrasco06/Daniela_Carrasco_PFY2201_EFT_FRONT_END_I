import { useRef, useState } from 'react';
import { validarJuego } from '../utils/validaciones';

const VALORES_INICIALES = { nombre: '', categoria: '', precio: '', descripcion: '', imagen: '' };
const ORDEN_CAMPOS = ['nombre', 'categoria', 'precio', 'descripcion', 'imagen'];

// Formulario para agregar un videojuego al catálogo.
// No modifica el catálogo directamente: llama a onAgregar (prop) y App actualiza el estado.
function AddGameForm({ onAgregar }) {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [agregado, setAgregado] = useState('');
  const campos = useRef({});

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setValores((actuales) => ({ ...actuales, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: undefined }));
    setAgregado('');
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    const erroresEncontrados = validarJuego(valores);
    setErrores(erroresEncontrados);

    const primerInvalido = ORDEN_CAMPOS.find((campo) => erroresEncontrados[campo]);
    if (primerInvalido) {
      campos.current[primerInvalido]?.focus();
      return;
    }

    onAgregar({
      nombre: valores.nombre.trim(),
      categoria: valores.categoria.trim().toLowerCase(),
      precio: Number(valores.precio),
      precioOferta: null,
      descripcion: valores.descripcion.trim(),
      imagen: valores.imagen.trim(),
    });
    setAgregado(valores.nombre.trim());
    setValores(VALORES_INICIALES);
  }

  function claseCampo(campo) {
    return `form-control ${errores[campo] ? 'is-invalid' : ''}`;
  }

  function campo(nombre, etiqueta, tipo = 'text', extra = {}) {
    return (
      <div className={extra.ancho ? 'campo-ancho' : ''}>
        <label htmlFor={`juego-${nombre}`} className="form-label">{etiqueta}</label>
        <input
          id={`juego-${nombre}`}
          name={nombre}
          type={tipo}
          className={claseCampo(nombre)}
          value={valores[nombre]}
          onChange={manejarCambio}
          placeholder={extra.placeholder}
          ref={(el) => { campos.current[nombre] = el; }}
        />
        <div className="invalid-feedback">{errores[nombre]}</div>
      </div>
    );
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="formulario-gz">
      {agregado && (
        <div className="alert alert-success" role="alert">
          «{agregado}» se agregó al catálogo.
        </div>
      )}

      <div className="grid-formulario">
        {campo('nombre', 'Nombre del juego')}
        {campo('categoria', 'Categoría', 'text', { placeholder: 'ej. accion, rpg, terror' })}
        {campo('precio', 'Precio (CLP)', 'number', { placeholder: 'ej. 19990' })}
        {campo('imagen', 'URL de la imagen (opcional)', 'url', { placeholder: 'https://...' })}

        <div className="campo-ancho">
          <label htmlFor="juego-descripcion" className="form-label">Descripción</label>
          <textarea
            id="juego-descripcion"
            name="descripcion"
            rows="3"
            className={claseCampo('descripcion')}
            value={valores.descripcion}
            onChange={manejarCambio}
            ref={(el) => { campos.current.descripcion = el; }}
          ></textarea>
          <div className="invalid-feedback">{errores.descripcion}</div>
        </div>
      </div>

      <button type="submit" className="btn btn-acento mt-3">Agregar juego</button>
    </form>
  );
}

export default AddGameForm;
