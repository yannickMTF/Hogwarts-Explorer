import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // Atajo para importar cosas de src usando el arroba
    },
  },
  build: {
    // Corregido: 'rollupOptions' para que Vite procese las dos páginas
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        detalle: resolve(__dirname, "detalle.html"), // Apunta a tu archivo de detalles en la raíz
      },
    },
  },
});
