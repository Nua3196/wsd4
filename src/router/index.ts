import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PopularView from "@/views/PopularView.vue";
import SearchView from "@/views/SearchView.vue";
import WishlistView from "@/views/WishlistView.vue";
import SignInView from "@/views/SignInView.vue";
import { useStore } from "vuex"; // Vuex 스토어를 사용

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: true }, // 인증이 필요한 경로
  },
  {
    path: "/popular",
    name: "Popular",
    component: PopularView,
    meta: { requiresAuth: true }, // 인증이 필요한 경로
  },
  {
    path: "/search",
    name: "Search",
    component: SearchView,
    meta: { requiresAuth: true }, // 인증이 필요한 경로
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: WishlistView,
    meta: { requiresAuth: true }, // 인증이 필요한 경로
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

// 네비게이션 가드 추가
router.beforeEach((to, from, next) => {
  const store = useStore(); // Vuex 스토어 인스턴스 가져오기
  const isLoggedIn = store.getters.isLoggedIn; // 로그인 상태 확인

  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    // 인증이 필요한 경로인데 로그인 상태가 아니면 /signin으로 리다이렉트
    next("/signin");
  } else if (to.path === "/signin" && isLoggedIn) {
    // 로그인 상태에서 /signin에 접근하면 홈으로 리다이렉트
    next("/");
  } else {
    next(); // 그대로 진행
  }
});

export default router;
