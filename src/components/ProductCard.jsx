function formatearPrecio(valor) {
  return `$${valor.toLocaleString('es-CL')}`;
}

function ProductCard({ producto, onAgregarAlCarrito }) {
  const tieneOferta = producto.precioOferta !== null && producto.precioOferta < producto.precio;

  return (
    <div className="col">
      <div className="card tarjeta-producto h-100">
        <img src={producto.imagen} alt={`Portada de ${producto.nombre}`} loading="lazy" />
        <div className="card-body d-flex flex-column">
          <span className="badge badge-categoria mb-2 align-self-start">{producto.categoria}</span>
          <h3 className="card-title h5">{producto.nombre}</h3>
          <p className="card-text texto-suave small">{producto.descripcion}</p>

          {/* Renderizado condicional: precio normal vs. precio oferta */}
          {tieneOferta ? (
            <div className="precio-wrapper mb-2">
              <span className="precio-anterior">{formatearPrecio(producto.precio)}</span>
              <span className="precio precio-oferta">{formatearPrecio(producto.precioOferta)}</span>
              <span className="badge badge-oferta ms-2">Oferta</span>
            </div>
          ) : (
            <p className="precio mb-2">{formatearPrecio(producto.precio)}</p>
          )}

          <button
            type="button"
            className="btn btn-agregar-carrito mt-auto"
            onClick={() => onAgregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
