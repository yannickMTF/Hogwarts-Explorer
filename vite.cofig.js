import { defineConfig } from "vite";

export default defineConfig({
  base: "/Hogwarts-Explorer/", // 👈 Asegurate de que respete las mayúsculas de tu repo
  build: {
    rollupOptions: {
      input: {
        main: "index.html", // 👈 Simplificado sin __dirname
        detalle: "detalle.html", // 👈 Simplificado sin __dirname
      },
    },
  },
});
