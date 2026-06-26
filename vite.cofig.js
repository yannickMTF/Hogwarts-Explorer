import { defineConfig } from "vite";

export default defineConfig({
  // En Vercel la base SIEMPRE debe ser '/' porque el proyecto corre en la raíz de tu dominio
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html", // Tu página principal
        detalle: "detalle.html", // Tu página de detalles
      },
    },
  },
});
