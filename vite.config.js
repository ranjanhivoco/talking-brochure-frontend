import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 8834,
    preview: {
      host: "0.0.0.0",
      port: 8834,
      allowedHosts: [
        "nestle.thefirstimpression.ai",
        "localhost",
        "127.0.0.1",
      ],
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 8834,
    allowedHosts: ["nestle.thefirstimpression.ai", "localhost", "127.0.0.1"],
  },
});