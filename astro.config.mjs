// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // El sitio sigue siendo estático; solo el endpoint del form corre en el
  // servidor (lo marcamos con `prerender = false`). El adaptador de Vercel
  // habilita esa parte on-demand.
  adapter: vercel(),
  devToolbar: {
    enabled: false,
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
