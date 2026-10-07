import { formatearPrecio } from '../utils/formatearPrecio';

function Cart({ items, total, onCambiarCantidad, onEliminarItem, onVaciarCarrito }) {
  return (
    <div
      className="offcanvas offcanvas-end text-bg-dark"
      tabIndex="-1"
      id="offcanvasCarrito"
      aria-labelledby="offcanvasCarritoLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasCarritoLabel">Tu carrito</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Cerrar"
        ></button>
      </div>

      <div className="offcanvas-body d-flex flex-column">
        <ul className="list-group list-group-flush mb-3">
          {/* Renderizado condicional: carrito vacío vs. con productos */}
          {items.length === 0 ? (
            <li className="list-group-item bg-transparent text-secondary">
              Tu carrito está vacío. ¡Agrega tu primer juego!
            </li>
          ) : (
            items.map((item) => (
              <li key={item.id} className="list-group-item bg-transparent text-light">
                <div>
                  <div className="fw-semibold">{item.nombre}</div>
                  <div className="small texto-suave">
                    {item.cantidad} x {formatearPrecio(item.precioUnitario)}
                  </div>
                  <div className="btn-group btn-group-sm mt-1" role="group" aria-label={`Cantidad de ${item.nombre}`}>
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      onClick={() => onCambiarCantidad(item.id, -1)}
                      aria-label={`Quitar una unidad de ${item.nombre}`}
                    >
                      −
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      onClick={() => onCambiarCantidad(item.id, 1)}
                      aria-label={`Agregar una unidad de ${item.nombre}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger btn-quitar-item"
                  onClick={() => onEliminarItem(item.id)}
                >
                  Quitar
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="mt-auto">
          <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-3">
            <span>Total</span>
            <span>{formatearPrecio(total)}</span>
          </div>
          <button
            className="btn btn-acento w-100 mt-3"
            type="button"
            onClick={onVaciarCarrito}
            disabled={items.length === 0}
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
