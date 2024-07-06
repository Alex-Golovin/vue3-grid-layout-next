// vite.config.ts
import { defineConfig } from "file:///Users/alexgolovin/Code/layout-grid/node_modules/.pnpm/vue3-grid-layout-next@1.0.7/node_modules/vue3-grid-layout-next/node_modules/.pnpm/vite@3.2.10_@types+node@18.19.39/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/alexgolovin/Code/layout-grid/node_modules/.pnpm/vue3-grid-layout-next@1.0.7/node_modules/vue3-grid-layout-next/node_modules/.pnpm/@vitejs+plugin-vue@3.2.0_vite@3.2.10_@types+node@18.19.39__vue@3.4.31_typescript@4.9.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import libCss from "file:///Users/alexgolovin/Code/layout-grid/node_modules/.pnpm/vue3-grid-layout-next@1.0.7/node_modules/vue3-grid-layout-next/node_modules/.pnpm/vite-plugin-libcss@1.1.1_vite@3.2.10_@types+node@18.19.39_/node_modules/vite-plugin-libcss/index.js";
import dts from "file:///Users/alexgolovin/Code/layout-grid/node_modules/.pnpm/vue3-grid-layout-next@1.0.7/node_modules/vue3-grid-layout-next/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@18.19.39_rollup@2.79.1_typescript@4.9.5_vite@3.2.10_@types+node@18.19.39_/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/alexgolovin/Code/layout-grid/node_modules/.pnpm/vue3-grid-layout-next@1.0.7/node_modules/vue3-grid-layout-next";
var __vite_injected_original_import_meta_url = "file:///Users/alexgolovin/Code/layout-grid/node_modules/.pnpm/vue3-grid-layout-next@1.0.7/node_modules/vue3-grid-layout-next/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [vue(), libCss(), dts()],
  resolve: {
    alias: {
      "@/": new URL("./src/", __vite_injected_original_import_meta_url).pathname
    }
  },
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "./src/components/index.ts"),
      name: "vue3-gird-layout",
      fileName: "vue3-grid-layout",
      formats: ["es", "umd"]
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  server: {
    port: 8787
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWxleGdvbG92aW4vQ29kZS9sYXlvdXQtZ3JpZC9ub2RlX21vZHVsZXMvLnBucG0vdnVlMy1ncmlkLWxheW91dC1uZXh0QDEuMC43L25vZGVfbW9kdWxlcy92dWUzLWdyaWQtbGF5b3V0LW5leHRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hbGV4Z29sb3Zpbi9Db2RlL2xheW91dC1ncmlkL25vZGVfbW9kdWxlcy8ucG5wbS92dWUzLWdyaWQtbGF5b3V0LW5leHRAMS4wLjcvbm9kZV9tb2R1bGVzL3Z1ZTMtZ3JpZC1sYXlvdXQtbmV4dC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWxleGdvbG92aW4vQ29kZS9sYXlvdXQtZ3JpZC9ub2RlX21vZHVsZXMvLnBucG0vdnVlMy1ncmlkLWxheW91dC1uZXh0QDEuMC43L25vZGVfbW9kdWxlcy92dWUzLWdyaWQtbGF5b3V0LW5leHQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSBcInZpdGVcIlxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCBsaWJDc3MgZnJvbSBcInZpdGUtcGx1Z2luLWxpYmNzc1wiXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIlxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKSwgbGliQ3NzKCksIGR0cygpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkAvXCI6IG5ldyBVUkwoXCIuL3NyYy9cIiwgaW1wb3J0Lm1ldGEudXJsKS5wYXRobmFtZVxuICAgIH1cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2NvbXBvbmVudHMvaW5kZXgudHNcIiksIC8vXHU2MzA3XHU1QjlBXHU3RUM0XHU0RUY2XHU3RjE2XHU4QkQxXHU1MTY1XHU1M0UzXHU2NTg3XHU0RUY2XG4gICAgICBuYW1lOiBcInZ1ZTMtZ2lyZC1sYXlvdXRcIixcbiAgICAgIGZpbGVOYW1lOiBcInZ1ZTMtZ3JpZC1sYXlvdXRcIixcbiAgICAgIGZvcm1hdHM6IFtcImVzXCIsIFwidW1kXCJdXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1widnVlXCJdLFxuXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogXCJWdWVcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA4Nzg3XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWloQixTQUFRLG9CQUFtQjtBQUM1aUIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxTQUFTO0FBSmhCLElBQU0sbUNBQW1DO0FBQXlTLElBQU0sMkNBQTJDO0FBTW5ZLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQztBQUFBLEVBQ2hDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sSUFBSSxJQUFJLFVBQVUsd0NBQWUsRUFBRTtBQUFBLElBQzNDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxLQUFLLFFBQVEsa0NBQVcsMkJBQTJCO0FBQUEsTUFDMUQsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLElBQ3ZCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsS0FBSztBQUFBLE1BRWhCLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
