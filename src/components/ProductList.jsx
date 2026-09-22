import ProductCard from './ProductCard';

function ProductList({ productos, onAgregarAlCarrito }) {
  // Renderizado condicional: catálogo vacío vs. catálogo con resultados
  if (productos.length === 0) {
    return (
      <div className="text-center texto-suave py-4">
        No se encontraron juegos que coincidan con tu búsqueda.
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} onAgregarAlCarrito={onAgregarAlCarrito} />
      ))}
    </div>
  );
}

export default ProductList;
