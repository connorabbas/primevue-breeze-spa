import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        host: true,
        port: 8000, // adjust as needed, match docker-compose.yml port values, same for below
        watch: {
            usePolling: true,
        },
    },
    preview: {
        port: 8000,
    },
});
