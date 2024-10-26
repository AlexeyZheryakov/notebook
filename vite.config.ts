import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import checker from "vite-plugin-checker"
import svgr from "vite-plugin-svgr"
import compression from "vite-plugin-compression"
import { VitePWA } from "vite-plugin-pwa"
import eslint from "vite-plugin-eslint"
import Inspector from "vite-plugin-react-inspector"
import envCompatible from "vite-plugin-env-compatible"

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({ typescript: true }),
    svgr(),
    compression(),
    eslint(),
    // Inspector(),
    envCompatible(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My App",
        short_name: "App",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
