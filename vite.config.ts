import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import viteSvgIcons from 'vite-plugin-svg-icons'
import ViteComponents from 'vite-plugin-components' // https://www.npmjs.com/package/vite-plugin-components
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons' // https://www.npmjs.com/package/vite-plugin-icons

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      // dirs: ['src/layouts', 'src/components'],
      customComponentResolvers: [ViteIconsResolver()],
    }),
    WindiCSS(),
    ViteIcons(),
    viteSvgIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      symbolId: 'icon-[name]',
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api/dev': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/dev', ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: { additionalData: '@import "@/styles/variables.scss";' },
  //   },
  // },
})
