// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static', // Cordova necesita archivos estáticos
  base: './', // Usar rutas relativas para Cordova
  outDir: './www', // Compilar directamente a la carpeta de Cordova
  server: {
    port: 15005
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Asegurar rutas relativas para Cordova
      assetsInlineLimit: 0,
      assetsDir: 'assets' // Cambiar directorio de _astro a assets para compatibilidad con Cordova
    }
  }
});