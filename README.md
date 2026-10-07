# GameZone – Tienda de videojuegos (React)

Proyecto eCommerce de la asignatura PFY2201 Desarrollo Frontend I (Duoc UC).
Semana 8: **Mejorando funcionalidades clave en el eCommerce con React**.

## Funcionalidades

- **useState**: catálogo (`productos`), carrito (`carrito`), estados de carga (`cargando`, `error`) y botón interactivo de cada producto.
- **useEffect**: carga el catálogo desde `public/data/products.json` (con `fetch` y una pausa de 800 ms que simula una API) y actualiza el estado al terminar.
- **Renderizado condicional**:
  - Spinner mientras carga el catálogo y mensaje de error con botón "Reintentar".
  - Mensaje cuando el carrito está vacío.
  - Botón "Agregar al carrito" ↔ "✓ En el carrito · Quitar".
  - Precio normal vs. precio de oferta.
- **Carrito**: agregar, quitar, aumentar/disminuir cantidad, vaciar, contador en la barra y total.

## Estructura

```
public/
  data/products.json      # datos del catálogo
  img/                    # imágenes locales
src/
  components/             # Navbar, ProductList, ProductCard, Cart
  utils/formatearPrecio.js
  App.jsx                 # estados, useEffect y acciones del carrito
  main.jsx, index.css
```

## Comandos

```bash
npm install
npm run dev       # desarrollo
npm run build     # compilar
npm run deploy    # compila y publica en la rama gh-pages
```

## Publicación (gh-pages)

- `vite.config.js` tiene `base: '/Exp3_S7_DanielaCarrasco/'` (nombre exacto del repositorio).
- En GitHub: Settings → Pages → Source: *Deploy from a branch* → rama `gh-pages` / `(root)`.
