import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CategoryFilter from './components/CategoryFilter';
import ContactForm from './components/ContactForm';
import AddGameForm from './components/AddGameForm';

const BASE_URL = import.meta.env.BASE_URL;
const URL_PRODUCTOS = `${BASE_URL}data/products.json`;

function App() {
  const [productos, setProductos] = useState([]); // catálogo cargado desde el JSON
  const [carrito, setCarrito] = useState([]);     // productos seleccionados
  const [cargando, setCargando] = useState(true); // true mientras se piden los datos
  const [error, setError] = useState(null);       // mensaje si falla la carga
  const [intento, setIntento] = useState(0);      // cambia al pulsar "Reintentar"
  const [categoriaActiva, setCategoriaActiva] = useState('todas'); // filtro seleccionado


  useEffect(() => {
    const controlador = new AbortController();

    async function cargarProductos() {
      setCargando(true);
      setError(null);

      try {
        await new Promise((resolver) => setTimeout(resolver, 800));

        const respuesta = await fetch(URL_PRODUCTOS, { signal: controlador.signal });
        if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);

        const datos = await respuesta.json();

        const catalogo = datos.map((producto) => ({
          ...producto,
          imagen: producto.imagen.startsWith('http') ? producto.imagen : `${BASE_URL}${producto.imagen}`,
        }));

        setProductos(catalogo);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('No pudimos cargar el catálogo. Intenta nuevamente.');
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }

    cargarProductos();

    return () => controlador.abort();
  }, [intento]);

  const totalArticulos = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
  const totalCarrito = carrito.reduce(
    (acumulado, item) => acumulado + item.precioUnitario * item.cantidad,
    0
  );
  const idsEnCarrito = carrito.map((item) => item.id);

  const categorias = ['todas', ...new Set(productos.map((producto) => producto.categoria))];
  const categoriaVigente = categorias.includes(categoriaActiva) ? categoriaActiva : 'todas';
  const productosFiltrados =
    categoriaVigente === 'todas'
      ? productos
      : productos.filter((producto) => producto.categoria === categoriaVigente);

  useEffect(() => {
    document.title = totalArticulos > 0 ? `(${totalArticulos}) GameZone` : 'GameZone - Tienda de Videojuegos';
  }, [totalArticulos]);

  function agregarProducto(datos) {
    setProductos((actuales) => {
      const nuevoId = Math.max(0, ...actuales.map((producto) => producto.id)) + 1;
      return [
        ...actuales,
        { ...datos, id: nuevoId, imagen: datos.imagen || `${BASE_URL}img/juego1.jpg` },
      ];
    });
  }

  function eliminarProducto(idProducto) {
    setProductos((actuales) => actuales.filter((producto) => producto.id !== idProducto));
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== idProducto));
  }

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

  function cambiarCantidad(idProducto, cambio) {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === idProducto ? { ...item, cantidad: item.cantidad + cambio } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  function eliminarDelCarrito(idProducto) {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== idProducto));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  return (
    <>
      <Navbar totalArticulos={totalArticulos} />

      <header id="inicio">
        <h1>GameZone</h1>
        <p>Tu tienda de videojuegos favorita: los últimos lanzamientos, consolas y accesorios al mejor precio.</p>
      </header>

      <main>
      <section id="productos" className="container py-5">
        <h2 className="text-center mb-4">Productos destacados</h2>

        {/* Renderizado condicional: cargando / error / catálogo */}
        {cargando ? (
          <div className="text-center py-5" role="status">
            <div className="spinner-border text-info" aria-hidden="true"></div>
            <p className="texto-suave mt-3 mb-0">Cargando catálogo...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-danger">{error}</p>
            <button type="button" className="btn btn-acento" onClick={() => setIntento(intento + 1)}>
              Reintentar
            </button>
          </div>
        ) : (
          <>
            <CategoryFilter
              categorias={categorias}
              categoriaActiva={categoriaVigente}
              onSeleccionar={setCategoriaActiva}
            />
            <ProductList
              productos={productosFiltrados}
              idsEnCarrito={idsEnCarrito}
              onAgregarAlCarrito={agregarAlCarrito}
              onQuitarDelCarrito={eliminarDelCarrito}
              onEliminarProducto={eliminarProducto}
            />
          </>
        )}
      </section>

      <section id="administrar" className="container py-5">
        <h2 className="text-center mb-4">Administrar catálogo</h2>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <p className="texto-suave text-center">
              Agrega un videojuego nuevo; para quitar uno usa el botón «Eliminar del catálogo» de su tarjeta.
            </p>
            <AddGameForm onAgregar={agregarProducto} />
          </div>
        </div>
      </section>

      </main>

      <Cart
        items={carrito}
        total={totalCarrito}
        onCambiarCantidad={cambiarCantidad}
        onEliminarItem={eliminarDelCarrito}
        onVaciarCarrito={vaciarCarrito}
      />

      <section id="contacto" className="container py-5">
        <h2 className="text-center mb-4">Contacto</h2>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <p className="texto-suave text-center">
              ¿Dudas sobre un juego o tu pedido? Escríbele al administrador del sitio.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="text-light pt-5 pb-3">
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
                <li><a href="#contacto">Contacto</a></li>
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
