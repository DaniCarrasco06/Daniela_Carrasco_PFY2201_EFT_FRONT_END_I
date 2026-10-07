// Botones de filtro por categoría. No guarda estado propio:
// recibe la categoría activa y avisa al padre (App) con onSeleccionar.
function CategoryFilter({ categorias, categoriaActiva, onSeleccionar }) {
  return (
    <div
      className="filtro-categorias mb-4"
      role="group"
      aria-label="Filtrar videojuegos por categoría"
    >
      {categorias.map((categoria) => (
        <button
          key={categoria}
          type="button"
          className={`btn btn-sm rounded-pill btn-filtro ${
            categoria === categoriaActiva ? 'activo' : ''
          }`}
          aria-pressed={categoria === categoriaActiva}
          onClick={() => onSeleccionar(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
