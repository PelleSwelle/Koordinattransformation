import
{ createApp} from 'vue'

import css from '@dataforsyningen/css'
import store from '@/store'
import router from '@/router'
import App from './App.vue'

import('sanitize.css')
import('sanitize.css/forms.css')
import('sanitize.css/assets.css')
import('sanitize.css/reduce-motion.css')

import('@/assets/css/grid.css')

const app = createApp(App)

app.config.globalProperties.append = (path, pathToAppend) => path + (path.endsWith('/') ? '' : '/') + pathToAppend
app.config.performance = (import.meta.env.NODE_ENV !== 'production')
app.config.globalProperties.$store = store

app
.use(css)
.use(router)
.use(store)

window.addEventListener('DOMContentLoaded', () => {
    app.mount('#app')
}, { capture: true, once: true, passive: true })
