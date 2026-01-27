import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "0.0.0.0",
      port: 5173,
      allowedHosts: true,
      hmr: {
        clientPort: 443,
      },
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:8000",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
