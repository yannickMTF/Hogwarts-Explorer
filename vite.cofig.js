import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // 🪄 IMPORTANTE: NO va la propiedad 'base' acá, porque Vercel sirve todo desde la raíz.
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        detalle: resolve(__dirname, "detalle.html"),
      },
    },
  },
});
