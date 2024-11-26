<template>
  <header class="app-header">
    <div class="logo" @click="$router.push('/')">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>
    <nav class="nav-menu">
      <router-link to="/">Home</router-link>
      <router-link to="/popular">Popular</router-link>
      <router-link to="/search">Search</router-link>
      <router-link to="/wishlist">Wishlist</router-link>
    </nav>
    <div class="user-info" v-if="loggedIn">
      <span>{{ userID }}</span>
      <button @click="handleLogout">Logout</button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "AppHeader",
  data() {
    return {
      loggedIn: false,
      userID: "",
    };
  },
  mounted() {
    // 로그인 상태 확인 및 사용자 ID 로드
    this.loggedIn = localStorage.getItem("loggedIn") === "true";
    this.userID = localStorage.getItem("userID") || "";
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userID");
      this.$router.push("/signin");
    },
  },
});
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
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
}

button {
  padding: 5px 10px;
  background-color: #444;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
