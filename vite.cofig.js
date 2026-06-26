import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "./", // 👈 ¡AGREGÁ ESTA LÍNEA! Con el punto adelante obligamos a que todas las rutas sean relativas.
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        detalle: resolve(__dirname, "detalle.html"),
      },
    },
  },
});
