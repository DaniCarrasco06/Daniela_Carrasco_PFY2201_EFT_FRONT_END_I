import ProductCard from './ProductCard';

function ProductList({ productos, idsEnCarrito, onAgregarAlCarrito, onQuitarDelCarrito }) {
  // Renderizado condicional: catálogo vacío vs. catálogo con resultados
  if (productos.length === 0) {
    return (
      <div className="text-center texto-suave py-4">
        No hay juegos disponibles por el momento.
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          enCarrito={idsEnCarrito.includes(producto.id)}
          onAgregarAlCarrito={onAgregarAlCarrito}
          onQuitarDelCarrito={onQuitarDelCarrito}
        />
      ))}
    </div>
  );
}

export default ProductList;
