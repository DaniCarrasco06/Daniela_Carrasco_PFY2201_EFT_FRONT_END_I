import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: './', // rutas relativas: funciona en gh-pages sin importar el nombre del repositorio
})
