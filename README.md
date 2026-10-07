# GameZone – Tienda de videojuegos online

**Evaluación Final Transversal – PFY2201 Desarrollo Frontend I (Duoc UC)**
Autora: Daniela Carrasco

Sitio web para una tienda de videojuegos: muestra el catálogo en tarjetas, permite **filtrar por categoría**, **agregar y eliminar juegos**, manejar un **carrito de compras** y escribir al administrador mediante un **formulario de contacto con validación**.

**Tecnologías:** HTML5 semántico · CSS3 (Flexbox y CSS Grid) · JavaScript (ES6+) · Bootstrap 5 · React 19 (Vite) · Vitest + Testing Library

---

## Instalación y uso

```bash
# 1. Clonar el repositorio
git clone <URL-del-repositorio>
cd <carpeta-del-repositorio>

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

Abre en el navegador la dirección que muestra la terminal (normalmente `http://localhost:5173`).

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión compilada |
| `npm run lint` | Revisa el código con oxlint |
| `npm test` | Ejecuta las pruebas automáticas |
| `npm run deploy` | Compila y publica `dist/` en la rama `gh-pages` |

## Cómo usar el sitio

1. **Inicio / Productos:** al cargar la página se muestra un spinner y luego las tarjetas con imagen, nombre, categoría, precio (o precio de oferta) y descripción.
2. **Filtrar:** usa los botones de categoría sobre las tarjetas (`todas`, `rpg`, `terror`, …). Las categorías se generan a partir del catálogo.
3. **Carrito:** botón *Agregar al carrito* en cada tarjeta (cambia a *En el carrito · Quitar*). El botón 🛒 de la barra abre el carrito, donde puedes sumar/restar unidades, quitar productos, vaciar y ver el total. El título de la pestaña muestra la cantidad de artículos.
4. **Administrar catálogo:** completa el formulario para **agregar** un videojuego (nombre, categoría, precio, descripción e imagen opcional). Para **eliminar**, usa el botón *Eliminar del catálogo* de la tarjeta (si estaba en el carrito, también se quita de él).
5. **Contacto:** formulario con nombre, correo y mensaje. Si falta información o está mal ingresada, se muestran mensajes de error bajo cada campo y el cursor vuelve al primer campo inválido. Con datos correctos aparece un mensaje de confirmación.

---

## Cumplimiento de los requerimientos

### 1. HTML, CSS y Bootstrap 5
- **HTML semántico:** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>`, `<label>` asociados a sus campos y textos `alt` en imágenes.
- **Flexbox y CSS Grid:** el filtro de categorías usa Flexbox (`.filtro-categorias`) y el formulario de administración usa CSS Grid (`.grid-formulario`), además de las utilidades flex y la grilla de Bootstrap.
- **Componentes Bootstrap 5:** navbar responsive con menú colapsable, tarjetas (`card`), formularios con validación (`is-invalid` / `invalid-feedback`), alertas, badges, spinner y carrito en `offcanvas`.
- **Responsive:** grilla `row-cols-1 row-cols-sm-2 row-cols-lg-3`, navbar `navbar-expand-lg` y formularios que pasan de 1 a 2 columnas según el ancho.
- **CSS personalizado** en `src/index.css` con variables (`:root`) para la paleta y tipografías.

### 2. JavaScript
- **Datos de los videojuegos:** `public/data/products.json` contiene los objetos (id, nombre, categoría, precio, precioOferta, descripción, imagen).
- **Generación dinámica de tarjetas:** se recorre el arreglo con `map()` y se crean las tarjetas a partir de los datos.
- **Filtrado por categoría** con botones.
- **Validación de formularios** en `src/utils/validaciones.js` (campos obligatorios, largos mínimos, formato de correo y precio positivo).
- **Manipulación del DOM:** además del renderizado declarativo de React, se usa `useRef` para enfocar el primer campo con error y `useEffect` para actualizar `document.title`.

### 3. React
- **Componentes** (`src/components/`): `Navbar`, `CategoryFilter`, `ProductList`, `ProductCard`, `Cart`, `ContactForm`, `AddGameForm`. `App` coordina el estado.
- **State (`useState`):** catálogo, carrito, categoría activa, carga/error y los valores/errores de cada formulario.
- **Efectos (`useEffect`):** carga del catálogo con `fetch` al montar la app (con estados de carga y error con *Reintentar*) y actualización del título.
- **Props:** los datos bajan de `App` a los componentes hijos y las acciones suben mediante funciones (`onSeleccionar`, `onAgregar`, `onEliminarProducto`, `onAgregarAlCarrito`, …). Al filtrar o eliminar, el estado de `App` cambia y se refleja en `ProductList`.
- **Renderizado condicional:** spinner / error / catálogo, carrito vacío, precio normal u oferta, botón agregar o quitar, mensajes de éxito.

### 4. Optimización y prueba final
- Imágenes con `loading="lazy"`; los precios se formatean con `toLocaleString('es-CL')`.
- Pruebas automáticas (`npm test`) del flujo principal: tarjetas, filtro, validación de contacto, agregar/eliminar juegos y carrito.
- `npm run lint` y `npm run build` sin errores.

## Estructura del proyecto

```
├── public/
│   ├── data/products.json      # catálogo de videojuegos
│   └── img/                    # imágenes locales
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Cart.jsx
│   │   ├── ContactForm.jsx
│   │   └── AddGameForm.jsx
│   ├── utils/
│   │   ├── formatearPrecio.js
│   │   └── validaciones.js
│   ├── App.jsx                 # estado principal, useEffect y acciones
│   ├── eft.test.jsx            # pruebas automáticas
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Publicación en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub (`git push origin main`).
2. Ejecuta `npm run deploy` (compila y publica en la rama `gh-pages`).
3. En GitHub: **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `(root)`**.

`vite.config.js` usa `base: './'`, por lo que funciona con cualquier nombre de repositorio.

## Compatibilidad y pruebas manuales

Se usan únicamente características estándar (Flexbox, Grid, `fetch`, ES6+) soportadas por los navegadores actuales. Revisar con las herramientas de desarrollo (modo dispositivo) en estos anchos: móvil (~375 px), tablet (~768 px) y escritorio (≥1200 px).

- [ ] Chrome / Edge
- [ ] Firefox
- [ ] Móvil (modo dispositivo o equipo real)

