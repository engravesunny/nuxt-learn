import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// const path = require('path'); vite@3.1.0已经不支持commonjs写法
// 故使用ES moudle写法
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports:['vue', 'vue-router']
    })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
  } 
})
