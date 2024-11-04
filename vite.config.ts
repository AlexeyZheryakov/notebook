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
        name: "NOTEBOOK",
        short_name: "NOTEBOOK",
        // display: "fullscreen",
        description: "Notepad, designed by Alexey Zheryakov",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icon_192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "icon_256.png",
            type: "image/png",
            sizes: "256x256",
          },
          {
            src: "icon_384.png",
            type: "image/png",
            sizes: "384x384",
          },
          {
            src: "icon_512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
            },
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
