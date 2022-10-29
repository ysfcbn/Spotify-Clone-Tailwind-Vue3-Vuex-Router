import vue from '@vitejs/plugin-vue';
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      /* options */
      imports: [
        "vue",
  
      ],
      dts: "src/auto-imports.d.ts",
    }),
  ],
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
      web3: path.resolve(__dirname, "./node_modules/web3/dist/web3.min.js"),
    },
  },
});