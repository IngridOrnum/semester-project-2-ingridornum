import { defineConfig } from 'vite';

// Export the Vite configuration
export default defineConfig({
    base: '/custom-base-path/', // Set this to the path where your app will be deployed
    server: {
        proxy: {
            '/api': {
                target: 'https://your-api-domain.com', // Replace with your API's base URL
                changeOrigin: true,
                secure: false, // Set to true if your API uses HTTPS
            },
        },
    },
    build: {
        outDir: 'dist', // Specify the output directory for the build files
    },
});
