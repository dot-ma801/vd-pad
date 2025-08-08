import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'the-new-css-reset/css/reset.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
