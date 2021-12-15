import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    baseUrl: "/Algorithm-Visualizer/",
    plugins: [
        vue({
            script: {
                refSugar: true,
            },
        }),
    ],
});
