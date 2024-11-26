import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PopularView from "@/views/PopularView.vue";
import SearchView from "@/views/SearchView.vue";
import WishlistView from "@/views/WishlistView.vue";
import SignInView from "@/views/SignInView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/popular",
    name: "Popular",
    component: PopularView,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchView,
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: WishlistView,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignInView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
