// vite.config.ts
import { defineConfig } from "file:///Users/maksym.portianoi@konghq.com/Desktop/dev/kongponents/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/maksym.portianoi@konghq.com/Desktop/dev/kongponents/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueDevTools from "file:///Users/maksym.portianoi@konghq.com/Desktop/dev/kongponents/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import path, { join } from "path";
import { visualizer } from "file:///Users/maksym.portianoi@konghq.com/Desktop/dev/kongponents/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "/Users/maksym.portianoi@konghq.com/Desktop/dev/kongponents";
var buildVisualizerPlugin = process.env.BUILD_VISUALIZER ? visualizer({
  filename: path.resolve(__vite_injected_original_dirname, "bundle-analyzer/stats-treemap.html"),
  template: "treemap",
  // sunburst|treemap|network
  sourcemap: true,
  gzipSize: true
}) : void 0;
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VueDevTools()
  ],
  resolve: {
    alias: {
      // Alias src directory for @/components/{KongponentName} imports
      "@": path.resolve(__vite_injected_original_dirname, "./src/"),
      "@mocks": path.resolve(__vite_injected_original_dirname, "./mocks/")
    }
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // Inject the @kong/design-tokens SCSS variables, kongponents variables and mixins to make them available for all components.
        // This is not needed in host applications.
        additionalData: `
          @import "@kong/design-tokens/tokens/scss/variables";
          @import "@/styles/vars";
          @import "@/styles/mixins";
        `
      }
    }
  },
  base: process.env.USE_SANDBOX && !process.env.USE_NETLIFY ? "/kongponents/" : "/",
  build: {
    lib: process.env.USE_SANDBOX ? void 0 : {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "Kongponents",
      fileName: (format) => `kongponents.${format}.js`
    },
    minify: true,
    sourcemap: !!process.env.BUILD_VISUALIZER,
    rollupOptions: {
      external: process.env.USE_SANDBOX ? void 0 : ["vue", "vue-router"],
      output: {
        globals: process.env.USE_SANDBOX ? void 0 : {
          vue: "Vue",
          "vue-router": "VueRouter"
        },
        exports: "named"
      },
      plugins: [
        // visualizer must remain last in the list of plugins
        buildVisualizerPlugin
      ]
    }
  },
  optimizeDeps: {
    include: [
      "cypress",
      "vue",
      "focus-trap",
      "focus-trap-vue"
    ]
  },
  server: {
    fs: {
      // Allow serving files from one level up from the package root - IMPORTANT - to support the sandbox
      allow: [join(__vite_injected_original_dirname, "..")]
    }
  },
  // Change the root when utilizing the sandbox via USE_SANDBOX=true to use the `/sandbox/*` files
  // During the build process, the `/sandbox/*` files are not used and we should default to the package root.
  root: process.env.USE_SANDBOX ? "./sandbox" : process.cwd()
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFrc3ltLnBvcnRpYW5vaUBrb25naHEuY29tL0Rlc2t0b3AvZGV2L2tvbmdwb25lbnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWFrc3ltLnBvcnRpYW5vaUBrb25naHEuY29tL0Rlc2t0b3AvZGV2L2tvbmdwb25lbnRzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYWtzeW0ucG9ydGlhbm9pQGtvbmdocS5jb20vRGVza3RvcC9kZXYva29uZ3BvbmVudHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgVnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuaW1wb3J0IHBhdGgsIHsgam9pbiB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuXG4vLyBJbmNsdWRlIHRoZSByb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXIgaWYgdGhlIEJVSUxEX1ZJU1VBTElaRVIgZW52IHZhciBpcyBzZXQgdG8gXCJ0cnVlXCJcbmNvbnN0IGJ1aWxkVmlzdWFsaXplclBsdWdpbiA9IHByb2Nlc3MuZW52LkJVSUxEX1ZJU1VBTElaRVJcbiAgPyB2aXN1YWxpemVyKHtcbiAgICBmaWxlbmFtZTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2J1bmRsZS1hbmFseXplci9zdGF0cy10cmVlbWFwLmh0bWwnKSxcbiAgICB0ZW1wbGF0ZTogJ3RyZWVtYXAnLCAvLyBzdW5idXJzdHx0cmVlbWFwfG5ldHdvcmtcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgZ3ppcFNpemU6IHRydWUsXG4gIH0pXG4gIDogdW5kZWZpbmVkXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgVnVlRGV2VG9vbHMoKSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAvLyBBbGlhcyBzcmMgZGlyZWN0b3J5IGZvciBAL2NvbXBvbmVudHMve0tvbmdwb25lbnROYW1lfSBpbXBvcnRzXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy8nKSxcbiAgICAgICdAbW9ja3MnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9tb2Nrcy8nKSxcbiAgICB9LFxuICB9LFxuICBjc3M6IHtcbiAgICBkZXZTb3VyY2VtYXA6IHRydWUsXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICAvLyBJbmplY3QgdGhlIEBrb25nL2Rlc2lnbi10b2tlbnMgU0NTUyB2YXJpYWJsZXMsIGtvbmdwb25lbnRzIHZhcmlhYmxlcyBhbmQgbWl4aW5zIHRvIG1ha2UgdGhlbSBhdmFpbGFibGUgZm9yIGFsbCBjb21wb25lbnRzLlxuICAgICAgICAvLyBUaGlzIGlzIG5vdCBuZWVkZWQgaW4gaG9zdCBhcHBsaWNhdGlvbnMuXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXG4gICAgICAgICAgQGltcG9ydCBcIkBrb25nL2Rlc2lnbi10b2tlbnMvdG9rZW5zL3Njc3MvdmFyaWFibGVzXCI7XG4gICAgICAgICAgQGltcG9ydCBcIkAvc3R5bGVzL3ZhcnNcIjtcbiAgICAgICAgICBAaW1wb3J0IFwiQC9zdHlsZXMvbWl4aW5zXCI7XG4gICAgICAgIGAsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGJhc2U6IHByb2Nlc3MuZW52LlVTRV9TQU5EQk9YICYmICFwcm9jZXNzLmVudi5VU0VfTkVUTElGWSA/ICcva29uZ3BvbmVudHMvJyA6ICcvJyxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHByb2Nlc3MuZW52LlVTRV9TQU5EQk9YXG4gICAgICA/IHVuZGVmaW5lZFxuICAgICAgOiB7XG4gICAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICAgIG5hbWU6ICdLb25ncG9uZW50cycsXG4gICAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBga29uZ3BvbmVudHMuJHtmb3JtYXR9LmpzYCxcbiAgICAgIH0sXG4gICAgbWluaWZ5OiB0cnVlLFxuICAgIHNvdXJjZW1hcDogISFwcm9jZXNzLmVudi5CVUlMRF9WSVNVQUxJWkVSLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBwcm9jZXNzLmVudi5VU0VfU0FOREJPWCA/IHVuZGVmaW5lZCA6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiBwcm9jZXNzLmVudi5VU0VfU0FOREJPWFxuICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgOiB7XG4gICAgICAgICAgICB2dWU6ICdWdWUnLFxuICAgICAgICAgICAgJ3Z1ZS1yb3V0ZXInOiAnVnVlUm91dGVyJyxcbiAgICAgICAgICB9LFxuICAgICAgICBleHBvcnRzOiAnbmFtZWQnLFxuICAgICAgfSxcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgLy8gdmlzdWFsaXplciBtdXN0IHJlbWFpbiBsYXN0IGluIHRoZSBsaXN0IG9mIHBsdWdpbnNcbiAgICAgICAgYnVpbGRWaXN1YWxpemVyUGx1Z2luLFxuICAgICAgXSxcbiAgICB9LFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICAnY3lwcmVzcycsXG4gICAgICAndnVlJyxcbiAgICAgICdmb2N1cy10cmFwJyxcbiAgICAgICdmb2N1cy10cmFwLXZ1ZScsXG4gICAgXSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgZnM6IHtcbiAgICAgIC8vIEFsbG93IHNlcnZpbmcgZmlsZXMgZnJvbSBvbmUgbGV2ZWwgdXAgZnJvbSB0aGUgcGFja2FnZSByb290IC0gSU1QT1JUQU5UIC0gdG8gc3VwcG9ydCB0aGUgc2FuZGJveFxuICAgICAgYWxsb3c6IFtqb2luKF9fZGlybmFtZSwgJy4uJyldLFxuICAgIH0sXG4gIH0sXG4gIC8vIENoYW5nZSB0aGUgcm9vdCB3aGVuIHV0aWxpemluZyB0aGUgc2FuZGJveCB2aWEgVVNFX1NBTkRCT1g9dHJ1ZSB0byB1c2UgdGhlIGAvc2FuZGJveC8qYCBmaWxlc1xuICAvLyBEdXJpbmcgdGhlIGJ1aWxkIHByb2Nlc3MsIHRoZSBgL3NhbmRib3gvKmAgZmlsZXMgYXJlIG5vdCB1c2VkIGFuZCB3ZSBzaG91bGQgZGVmYXVsdCB0byB0aGUgcGFja2FnZSByb290LlxuICByb290OiBwcm9jZXNzLmVudi5VU0VfU0FOREJPWCA/ICcuL3NhbmRib3gnIDogcHJvY2Vzcy5jd2QoKSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdXLFNBQVMsb0JBQW9CO0FBQzdYLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFFBQVEsWUFBWTtBQUMzQixTQUFTLGtCQUFrQjtBQUozQixJQUFNLG1DQUFtQztBQU96QyxJQUFNLHdCQUF3QixRQUFRLElBQUksbUJBQ3RDLFdBQVc7QUFBQSxFQUNYLFVBQVUsS0FBSyxRQUFRLGtDQUFXLG9DQUFvQztBQUFBLEVBQ3RFLFVBQVU7QUFBQTtBQUFBLEVBQ1YsV0FBVztBQUFBLEVBQ1gsVUFBVTtBQUNaLENBQUMsSUFDQztBQUdKLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUE7QUFBQSxNQUVMLEtBQUssS0FBSyxRQUFRLGtDQUFXLFFBQVE7QUFBQSxNQUNyQyxVQUFVLEtBQUssUUFBUSxrQ0FBVyxVQUFVO0FBQUEsSUFDOUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxjQUFjO0FBQUEsSUFDZCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUE7QUFBQTtBQUFBLFFBR0osZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUtsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNLFFBQVEsSUFBSSxlQUFlLENBQUMsUUFBUSxJQUFJLGNBQWMsa0JBQWtCO0FBQUEsRUFDOUUsT0FBTztBQUFBLElBQ0wsS0FBSyxRQUFRLElBQUksY0FDYixTQUNBO0FBQUEsTUFDQSxPQUFPLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDN0MsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLFdBQVcsZUFBZSxNQUFNO0FBQUEsSUFDN0M7QUFBQSxJQUNGLFFBQVE7QUFBQSxJQUNSLFdBQVcsQ0FBQyxDQUFDLFFBQVEsSUFBSTtBQUFBLElBQ3pCLGVBQWU7QUFBQSxNQUNiLFVBQVUsUUFBUSxJQUFJLGNBQWMsU0FBWSxDQUFDLE9BQU8sWUFBWTtBQUFBLE1BQ3BFLFFBQVE7QUFBQSxRQUNOLFNBQVMsUUFBUSxJQUFJLGNBQ2pCLFNBQ0E7QUFBQSxVQUNBLEtBQUs7QUFBQSxVQUNMLGNBQWM7QUFBQSxRQUNoQjtBQUFBLFFBQ0YsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLFNBQVM7QUFBQTtBQUFBLFFBRVA7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLElBQUk7QUFBQTtBQUFBLE1BRUYsT0FBTyxDQUFDLEtBQUssa0NBQVcsSUFBSSxDQUFDO0FBQUEsSUFDL0I7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBLEVBR0EsTUFBTSxRQUFRLElBQUksY0FBYyxjQUFjLFFBQVEsSUFBSTtBQUM1RCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
