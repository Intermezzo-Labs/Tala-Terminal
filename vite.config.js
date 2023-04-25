const Path = require('path')
const vuePlugin = require('@vitejs/plugin-vue')

const { defineConfig } = require('vite')

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
  root: Path.join(__dirname, 'src', 'renderer'),
  publicDir: 'public',
  server: {
    port: 8080
  },
  open: false,
  build: {
    outDir: Path.join(__dirname, 'build', 'renderer'),
    emptyOutDir: true
  },
  plugins: [vuePlugin()],
  resolve: {
    alias: {
      '@renderer': Path.resolve('src/renderer'),
      '@shared': Path.resolve('src/shared'),
      components: Path.resolve('src/renderer/components')
    }
  }
})

module.exports = config
