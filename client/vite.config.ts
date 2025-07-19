import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  // Get API URL from environment or default to localhost for development
  const apiUrl = env.VITE_API_URL || env.API_URL || "http://localhost:3000";

  return {
    server: {
      proxy: {
        "/api": {
          target: apiUrl,
          secure: env.NODE_ENV === "development",
        },
      },
    },
    define: {
      // Make environment variables available to the client
      __API_URL__: JSON.stringify(apiUrl),
    },
    plugins: [tailwindcss(), react(), tsconfigPaths()],
    build: {
      // Ensure build output goes to dist
      outDir: "dist",
    },
  };
});
