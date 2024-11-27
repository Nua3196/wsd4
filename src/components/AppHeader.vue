<template>
  <header class="app-header">
    <div class="left">
      <div class="logo" @click="$router.push('/')">
        <i class="fa-solid fa-film" style="color: #cc0000"></i>
      </div>
      <div class="hamburger-menu" @click="toggleMenu">
        <i class="fa-solid fa-bars"></i>
      </div>
      <nav class="nav-menu" :class="{ active: menuActive }">
        <router-link to="/">Home</router-link>
        <router-link to="/popular">Popular</router-link>
        <router-link to="/search">Search</router-link>
        <router-link to="/wishlist">Wishlist</router-link>
      </nav>
    </div>
    <div class="user-info" v-if="loggedIn">
      <i class="fa-solid fa-user"></i>
      <span>{{ userID }}</span>
      <i class="fa-solid fa-arrow-right-from-bracket" @click="handleLogout"></i>
      <!-- <button @click="handleLogout">Logout</button> -->
    </div>
  </header>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  onBeforeUnmount,
  ref,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AppHeader",
  setup() {
    const store = useStore();
    const router = useRouter();

    // Vuex 상태와 getters
    const userID = computed(() => store.getters.getUserID);
    const loggedIn = computed(() => store.getters.isLoggedIn);

    // 지역 상태 관리
    const menuActive = ref(false);

    const handleResize = () => {
      if (window.innerWidth > 768) {
        menuActive.value = false; // 큰 화면에서는 메뉴 숨김
      }
    };

    const handleLogout = () => {
      store.dispatch("logout"); // Vuex 상태 초기화
      router.push("/signin"); // 라우팅 처리
    };

    const toggleMenu = () => {
      menuActive.value = !menuActive.value;
    };

    // Lifecycle hooks
    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      userID,
      loggedIn,
      menuActive,
      handleLogout,
      toggleMenu,
    };
  },
});
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  background-color: #333;
  color: #fff;
  flex-wrap: wrap; /* 화면이 좁아질 때 줄바꿈 허용 */
  font-size: 1.2rem;
}

/* 좌측 영역: 로고와 네비게이션 */
.left {
  display: flex;
  align-items: center;
  gap: 20px; /* 로고와 메뉴 간격 */
}

.logo {
  cursor: pointer;
  font-size: 1.5rem;
}

.nav-menu {
  display: flex;
  gap: 15px;
}

.nav-menu a {
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  font-size: 1.1rem;
}

button {
  padding: 5px 10px;
  background-color: #444;
  color: #fff;
  border: none;
  cursor: pointer;
}

.hamburger-menu {
  display: none; /* 기본적으로 숨김 */
  cursor: pointer;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .app-header {
    padding: 10px 30px;
  }
  .left {
    flex: 1;
  }
  .nav-menu {
    display: none;
    flex-direction: column;
    gap: 10px;
  }
  .nav-menu.active {
    display: flex;
  }
  .nav-menu a {
    font-size: 1rem;
  }
  .user-info {
    justify-content: flex-end;
    flex: 0;
  }
  .hamburger-menu {
    display: block;
  }
}
</style>
