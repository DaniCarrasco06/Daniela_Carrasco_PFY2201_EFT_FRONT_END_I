function Navbar({ totalArticulos }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" id="nav-principal">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#inicio">GameZone</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="#inicio">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#productos">Productos</a></li>
            <li className="nav-item"><a className="nav-link" href="#administrar">Administrar</a></li>
            <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
          </ul>

          <button
            className="btn btn-acento position-relative"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasCarrito"
            aria-controls="offcanvasCarrito"
          >
            🛒 Carrito
            <span className="badge rounded-pill bg-danger" id="badge-carrito">
              {totalArticulos}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
