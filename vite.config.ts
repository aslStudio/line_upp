import { defineConfig } from 'vite'
import sass from 'sass'

import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
    plugins: [
        react(),
        reactRefresh(), 
        tsconfigPaths(),
        envCompatible({ prefix: 'VITE_' }),
    ],
    resolve: {
        alias: {
            '@/': '/src/',
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // @ts-expect-error non typed option
                implementation: sass,
            },
        },
    },
})
