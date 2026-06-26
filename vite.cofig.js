import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/Hogwarts-Explorer/", // 👈 REEMPLAZÁ esto por el nombre de tu repo en GitHub
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        detalle: resolve(__dirname, "detalle.html"),
      },
    },
  },
});
