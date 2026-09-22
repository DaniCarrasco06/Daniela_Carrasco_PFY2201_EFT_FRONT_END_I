import { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import productos from './data/products';

function App() {
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(producto) {
    const precioUnitario = producto.precioOferta ?? producto.precio;

    setCarrito((carritoActual) => {
      const itemExistente = carritoActual.find((item) => item.id === producto.id);

      if (itemExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [
        ...carritoActual,
        { id: producto.id, nombre: producto.nombre, precioUnitario, cantidad: 1 },
      ];
    });
  }

  function eliminarDelCarrito(idProducto) {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== idProducto));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  const totalArticulos = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
  const totalCarrito = carrito.reduce(
    (acumulado, item) => acumulado + item.precioUnitario * item.cantidad,
    0
  );

  return (
    <>
      <Navbar totalArticulos={totalArticulos} />

      <header id="inicio">
        <h1>GameZone</h1>
        <p>Tu tienda de videojuegos favorita: los últimos lanzamientos, consolas y accesorios al mejor precio.</p>
      </header>

      <section id="productos" className="container py-5">
        <h2 className="text-center mb-4">Productos destacados</h2>
        <ProductList productos={productos} onAgregarAlCarrito={agregarAlCarrito} />
      </section>

      <Cart
        items={carrito}
        total={totalCarrito}
        onEliminarItem={eliminarDelCarrito}
        onVaciarCarrito={vaciarCarrito}
      />

      <footer id="contacto" className="text-light pt-5 pb-3">
        <div className="container">
          <div className="row gy-4">
            <div className="col-12 col-md-4">
              <h2 className="h4">GameZone</h2>
              <p className="texto-suave mb-0">Dirección: Av. Providencia 1234, Santiago, Chile</p>
              <p className="texto-suave">Correo: contacto@gamezone.cl</p>
            </div>
            <div className="col-12 col-md-4">
              <h2 className="h5">Enlaces</h2>
              <ul className="list-unstyled">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#productos">Productos</a></li>
              </ul>
            </div>
            <div className="col-12 col-md-4">
              <h2 className="h5">Síguenos</h2>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a className="btn btn-sm btn-outline-light rounded-pill" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </li>
                <li className="list-inline-item">
                  <a className="btn btn-sm btn-outline-light rounded-pill" href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                </li>
                <li className="list-inline-item">
                  <a className="btn btn-sm btn-outline-light rounded-pill" href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="border-secondary" />
          <p className="text-center texto-suave small mb-0">&copy; 2026 GameZone. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
