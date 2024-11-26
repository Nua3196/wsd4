<template>
  <div id="app">
    <!-- 로그인 및 회원가입 페이지가 아닌 경우에만 헤더를 표시 -->
    <AppHeader v-if="!isSignInPage" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import AppHeader from "@/components/AppHeader.vue"; // 헤더 컴포넌트 임포트
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
  },
  setup() {
    const route = useRoute();
    const isSignInPage = computed(() => route.path === "/signin"); // 현재 경로가 /signin인지 확인
    return { isSignInPage };
  },
});
</script>

<style lang="scss">
@import "vue-toast-notification/dist/theme-sugar.css";
#app {
  font-family: Arial, sans-serif;
}
/* 기본 Toast 스타일 오버라이드 */
.vue-toast {
  background-color: #333; /* 배경색을 어두운 색으로 변경 */
  color: #fff; /* 텍스트 색상을 흰색으로 변경 */
  border-radius: 8px; /* 모서리를 둥글게 */
}
.vue-toast .vue-toast__close {
  color: #fff; /* 닫기 버튼 색상 */
}
</style>
