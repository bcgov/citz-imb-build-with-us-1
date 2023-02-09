import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../../.env` });

process.env = { ...process.env, ...dotenv.config().parsed };

export default ({ command, mode }) => {
  return defineConfig({
    plugins: [react()],
    define: {
      "process.env": process.env,
    },
  });
};
