import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import "@fortawesome/fontawesome-free/css/all.css";

createApp(App).use(store).use(VueToast).use(router).mount("#app");
