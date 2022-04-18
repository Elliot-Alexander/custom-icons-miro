import { localCertificatePlugin } from './httpsPlugin.js'

const {resolve} = require('path');
const {fileURLToPath, URL} = require('url')
const { defineConfig } = require('vite')
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
          main: resolve(__dirname, 'index.html'),
          nested: resolve(__dirname, 'app.html')
      },
    },
  },
    plugins: [vue(), localCertificatePlugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
