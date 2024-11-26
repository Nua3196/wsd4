import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Popular from "@/views/PopularView.vue";
import Search from "@/views/SearchView.vue";
import Wishlist from "@/views/WishlistView.vue";
import SignIn from "@/views/SignInView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/popular",
    name: "Popular",
    component: Popular,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: Wishlist,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
