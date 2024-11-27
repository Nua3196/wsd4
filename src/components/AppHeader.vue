<template>
  <header :class="['app-header', { scrolled: isScrolled }]">
    <div class="left">
      <div class="logo" @click="$router.push('/')">
        <i class="fa-solid fa-film" style="color: #cc0000"></i>
      </div>
      <div class="hamburger-menu" @click="toggleMenu">
        <i class="fa-solid fa-bars"></i>
      </div>
      <nav class="nav-menu" :class="{ active: menuActive }">
        <router-link to="/">홈</router-link>
        <router-link to="/popular">대세 영화</router-link>
        <router-link to="/search">탐색하기</router-link>
        <router-link to="/wishlist">찜 목록</router-link>
      </nav>
    </div>
    <div class="user-info" v-if="loggedIn">
      <i class="fa-solid fa-user"></i>
      <span>{{ userID }}</span>
      <i class="fa-solid fa-arrow-right-from-bracket" @click="handleLogout"></i>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AppHeader",
  props: {
    isScrolled: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const userID = computed(() => store.getters.getUserID);
    const loggedIn = computed(() => store.getters.isLoggedIn);

    const menuActive = ref(false);

    const handleLogout = () => {
      store.dispatch("logout");
      router.push("/signin");
    };

    const toggleMenu = () => {
      menuActive.value = !menuActive.value;
    };

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
  padding: 20px 40px;
  background-color: #2b2b2b;
  color: #fff;
  flex-wrap: wrap; /* 화면이 좁아질 때 줄바꿈 허용 */
  font-size: 1.2rem;
  position: fixed; /* 화면 상단에 고정 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease; /* 색상 변경 애니메이션 */
}

.app-header.scrolled {
  background-color: #2b2b2ba5; /* 스크롤 시 연한 색상 */
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
