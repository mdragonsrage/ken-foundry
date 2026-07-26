import { defineConfig } from 'vite';
import { resolve } from 'path';
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
    root: 'src', // Vite lavorerà dentro la cartella src
    base: '/systems/kenshiro/', // Path assoluto richiesto da Foundry

    plugins: [
        viteStaticCopy({
            targets: [
                {
                    // Copia il file system.json direttamente nella radice di /dist
                    src: 'system.json',
                    dest: '.'
                },
                {
                    // Copia l'intera cartella delle lingue preservandola in /dist/lang
                    src: 'lang/**/*',
                    dest: '.'
                },
                {
                    // Copia l'intera cartella dei template Handlebars in /dist/templates
                    src: 'templates/**/*',
                    dest: '.'
                }
            ]
        })
    ],

    css: {
        preprocessorOptions: {
            less: {
                additionalData: `@import "${resolve(__dirname, 'src/less/variables.less')}";`
            }
        }
    },

    build: {
        outDir: resolve(__dirname, 'dist'), // I file pronti andranno in /dist
        emptyOutDir: true,
        minify: false, // Lascialo false in sviluppo per fare debug facilmente

        // Configurazione Rollup per generare file puliti senza hash strani nel nome
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/kenshiro.js'),
                stile: resolve(__dirname, 'src/less/kenshiro.less')
            },
            output: {
                entryFileNames: 'kenshiro.js', // Nome fisso del JS finale
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith('.css')) return 'css/kenshiro.css';
                    return '[name].[ext]';
                }
            }
        }
    }
});
