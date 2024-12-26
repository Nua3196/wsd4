import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PopularView from "@/views/PopularView.vue";
import SearchView from "@/views/SearchView.vue";
import WishlistView from "@/views/WishlistView.vue";
import SignInView from "@/views/SignInView.vue";
import OAuthCallback from "@/views/OAuthCallback.vue";
import { useStore } from "vuex"; // Vuex 스토어를 사용
import { Logger } from "@/utils/logger";

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
  {
    path: "/oauth",
    name: "OAuthCallback",
    component: OAuthCallback, // Redirect URI 처리 컴포넌트
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 네비게이션 가드 수정
router.beforeEach(async (to, from, next) => {
  const store = useStore(); // Vuex 스토어 인스턴스 가져오기
  const isLoggedIn = store.getters.isLoggedIn; // 로그인 상태 확인

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      // 로그인 상태가 아닌 경우 로그인 페이지로 이동
      return next("/signin");
    }

    // 로그인 상태일 경우 Access Token 유효성 확인
    const isValid = await store.dispatch("validateAccessToken");
    if (!isValid) {
      Logger.warn("Access Token expired. Logging out.");
      store.dispatch("logout");
      return next("/signin");
    }
  }

  // 로그인 상태에서 /signin으로 접근하면 홈으로 리다이렉트
  if (to.path === "/signin" && isLoggedIn) {
    return next("/");
  }

  // 나머지 경우는 정상적으로 이동
  next();
});

export default router;
