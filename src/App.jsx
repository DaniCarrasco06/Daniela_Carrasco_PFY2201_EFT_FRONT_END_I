import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CategoryFilter from './components/CategoryFilter';

// Ruta del JSON local (respeta el "base" de Vite para que funcione en gh-pages)
const BASE_URL = import.meta.env.BASE_URL;
const URL_PRODUCTOS = `${BASE_URL}data/products.json`;

function App() {
  // ---------- Estados (useState) ----------
  const [productos, setProductos] = useState([]); // catálogo cargado desde el JSON
  const [carrito, setCarrito] = useState([]);     // productos seleccionados
  const [cargando, setCargando] = useState(true); // true mientras se piden los datos
  const [error, setError] = useState(null);       // mensaje si falla la carga
  const [intento, setIntento] = useState(0);      // cambia al pulsar "Reintentar"
  const [categoriaActiva, setCategoriaActiva] = useState('todas'); // filtro seleccionado

  // ---------- Efecto (useEffect): cargar el catálogo ----------
  // Se ejecuta al montar el componente y cada vez que cambia "intento".
  useEffect(() => {
    const controlador = new AbortController();

    async function cargarProductos() {
      setCargando(true);
      setError(null);

      try {
        // Pausa de 800 ms para simular la latencia de una API real
        await new Promise((resolver) => setTimeout(resolver, 800));

        const respuesta = await fetch(URL_PRODUCTOS, { signal: controlador.signal });
        if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);

        const datos = await respuesta.json();

        // Las imágenes locales del JSON son rutas relativas: se les antepone el base.
        const catalogo = datos.map((producto) => ({
          ...producto,
          imagen: producto.imagen.startsWith('http') ? producto.imagen : `${BASE_URL}${producto.imagen}`,
        }));

        setProductos(catalogo); // actualiza el estado con los datos cargados
      } catch (err) {
        // Si el efecto se limpió (AbortError) no se muestra ningún error
        if (err.name !== 'AbortError') {
          setError('No pudimos cargar el catálogo. Intenta nuevamente.');
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }

    cargarProductos();

    // Limpieza: cancela la petición si el componente se desmonta o el efecto se repite
    return () => controlador.abort();
  }, [intento]);

  // ---------- Acciones del carrito ----------
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

  // Suma (+1) o resta (-1) unidades; si la cantidad llega a 0 el producto se quita
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

  // ---------- Valores derivados (se calculan en cada render, no necesitan estado) ----------
  const totalArticulos = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
  const totalCarrito = carrito.reduce(
    (acumulado, item) => acumulado + item.precioUnitario * item.cantidad,
    0
  );
  const idsEnCarrito = carrito.map((item) => item.id);

  // Categorías disponibles según el catálogo actual (más la opción "todas")
  const categorias = ['todas', ...new Set(productos.map((producto) => producto.categoria))];
  // Si la categoría seleccionada ya no existe (ej. se eliminó su último juego), se vuelve a "todas"
  const categoriaVigente = categorias.includes(categoriaActiva) ? categoriaActiva : 'todas';
  const productosFiltrados =
    categoriaVigente === 'todas'
      ? productos
      : productos.filter((producto) => producto.categoria === categoriaVigente);

  return (
    <>
      <Navbar totalArticulos={totalArticulos} />

      <header id="inicio">
        <h1>GameZone</h1>
        <p>Tu tienda de videojuegos favorita: los últimos lanzamientos, consolas y accesorios al mejor precio.</p>
      </header>

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
            />
          </>
        )}
      </section>

      <Cart
        items={carrito}
        total={totalCarrito}
        onCambiarCantidad={cambiarCantidad}
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
