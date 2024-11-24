import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    appType: "mpa",
    base: "",
    build: {
        target: "esnext",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                login: resolve(__dirname, "/auth/login/index.html"),
                register: resolve(__dirname, "/auth/register/index.html"),
                singleListing: resolve(__dirname, "/single-listing/index.html"),
                createSingleListing: resolve(__dirname, "/single-listing/create/index.html"),
                updateSingleListing: resolve(__dirname, "/single-listing/update/index.html"),
                profile: resolve(__dirname, "/profile/index.html"),
            },
        },
    },
    resolve: {
        alias: {
            path: "path-browserify", // Replace Node.js `path` with a browser-friendly alternative
        },
    },
    server: {
        hmr: {
            overlay: false, // Disable error overlay
        },
    },
});
