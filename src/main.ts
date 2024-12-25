import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import '@fortawesome/fontawesome-free/css/all.css'

// 앱 초기화
store.dispatch('initializeAppState') // 로그인 및 위시리스트 초기화

createApp(App).use(store).use(VueToast).use(router).mount('#app')
