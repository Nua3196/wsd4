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
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
  data() {
    return {
      loggedIn: false,
      userID: "",
      menuActive: false,
    };
  },
  mounted() {
    // 로그인 상태 확인 및 사용자 ID 로드
    this.loggedIn = localStorage.getItem("loggedIn") === "true";
    this.userID = localStorage.getItem("userID") || "";
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      if (window.innerWidth > 768) {
        this.menuActive = false; // 큰 화면에서는 메뉴 항상 표시
      }
    },
    handleLogout() {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userID");
      this.$router.push("/signin");
    },
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
  },
});
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-color: #333;
  color: #fff;
  flex-wrap: wrap; /* 화면이 좁아질 때 줄바꿈 허용 */
}

/* 좌측 영역: 로고와 네비게이션 */
.left {
  display: flex;
  align-items: center;
  gap: 15px; /* 로고와 메뉴 간격 */
}

.logo {
  cursor: pointer;
}

.nav-menu {
  display: flex;
  gap: 15px;
}

.nav-menu a {
  color: #fff;
  text-decoration: none;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
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
}

@media (max-width: 768px) {
  .app-header {
    padding: 10px;
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
  .user-info {
    justify-content: flex-end;
    flex: 0;
  }
  .hamburger-menu {
    display: block;
  }
}
</style>
