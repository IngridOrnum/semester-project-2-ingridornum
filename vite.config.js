import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
        css: {
            postcss: './postcss.config.js', // Ensure your PostCSS config file is setup correctly
        },
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
                createSingleListing: resolve(__dirname, "/listings/create/index.html"),
                updateSingleListing: resolve(__dirname, "/listings/edit/index.html"),
                profile: resolve(__dirname, "/profile/index.html"),
                updateProfile: resolve(__dirname, "/profile/update/index.html"),
                account: resolve(__dirname, "/account/index.html"),
                windsAndBids: resolve(__dirname, "/account/wins-and-bids/index.html"),
                imgOne: resolve(__dirname, "/public/assets/images/hero-landing-page.jpeg"),
                mainIcon: resolve(__dirname, "/public/assets/icons/favicon.png"),

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
