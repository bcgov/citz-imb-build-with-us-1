import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default ({ command, mode }) => {
  return defineConfig({
    plugins: [react()],
    define: {
      "process.env": process.env,
    },
    server: {
      port: 7000,
      host: true,
    },
  });
};
