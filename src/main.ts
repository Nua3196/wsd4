import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import "@fortawesome/fontawesome-free/css/all.css";

// 애플리케이션 시작 시 로컬 스토리지로 상태 초기화
store.commit("initializeState");

createApp(App).use(store).use(VueToast).use(router).mount("#app");
