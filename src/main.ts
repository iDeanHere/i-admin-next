import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'virtual:windi.css'
import 'virtual:svg-icons-register'

import router from './router'
import '@/router/interceptor'
import { store, key } from './store'

import '@/styles/global.scss'
import IconSvg from '@/components/IconSvg/index.vue'

import { mockXHR } from '../mock'

if (import.meta.env.MODE === 'development') {
  mockXHR()
}

createApp(App)
  .use(store, key)
  .use(router)
  .use(ElementPlus)
  .component('icon-svg', IconSvg)
  .mount('#app')
