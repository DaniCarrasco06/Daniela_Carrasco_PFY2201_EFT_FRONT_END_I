import juego1 from '../assets/img/juego1.jpg';
import juego2 from '../assets/img/juego2.jpg';

const productos = [
  {
    id: 1,
    nombre: 'Diablo I',
    descripcion: 'Clásico RPG de acción y terror, ambientado en el pueblo de Tristram.',
    precio: 14990,
    precioOferta: 9990,
    categoria: 'rpg',
    imagen: juego1,
  },
  {
    id: 2,
    nombre: 'Guitar Hero',
    descripcion: 'Juego musical de ritmo donde simulas tocar guitarra con tus canciones favoritas.',
    precio: 19990,
    precioOferta: null,
    categoria: 'musica',
    imagen: juego2,
  },
  {
    id: 3,
    nombre: 'Star Voyager',
    descripcion: 'Aventura espacial de exploración con combates tácticos entre flotas.',
    precio: 24990,
    precioOferta: 19990,
    categoria: 'aventura',
    imagen: 'https://picsum.photos/seed/star-voyager/400/300',
  },
  {
    id: 4,
    nombre: 'Rally Legends',
    descripcion: 'Carreras de rally todoterreno con circuitos generados dinámicamente.',
    precio: 17990,
    precioOferta: null,
    categoria: 'accion',
    imagen: 'https://picsum.photos/seed/rally-legends/400/300',
  },
  {
    id: 5,
    nombre: 'Pixel Dungeon Quest',
    descripcion: 'Roguelike retro por turnos con mazmorras infinitas.',
    precio: 9990,
    precioOferta: 6990,
    categoria: 'rpg',
    imagen: 'https://picsum.photos/seed/pixel-dungeon/400/300',
  },
  {
    id: 6,
    nombre: 'Chef Frenzy',
    descripcion: 'Simulador de cocina contrarreloj para uno o varios jugadores.',
    precio: 12990,
    precioOferta: null,
    categoria: 'accion',
    imagen: 'https://picsum.photos/seed/chef-frenzy/400/300',
  },
  {
    id: 7,
    nombre: 'Sombras del Norte',
    descripcion: 'Aventura narrativa de supervivencia en tierras heladas.',
    precio: 21990,
    precioOferta: 17990,
    categoria: 'aventura',
    imagen: 'https://picsum.photos/seed/sombras-norte/400/300',
  },
];

export default productos;
