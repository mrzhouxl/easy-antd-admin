import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import styleImport from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), styleImport({
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`
        }
      }
    ]
  }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  build: {
    //去除console.log()
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        //解决打包时Some chunks are larger警告
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    outDir: '../server/public/admin',
  },
  css: {
    preprocessorOptions: {
      less: {
        //根据modifyVars配置 less antd for vue 的主题
        modifyVars: { // 更改主题在这里
          'primary-color': '#1890ff',
          'link-color': '#00B375',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  },
});
