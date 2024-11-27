<template>
  <div id="app">
    <!-- 로그인 및 회원가입 페이지가 아닌 경우에만 헤더를 표시 -->
    <AppHeader v-if="!isSignInPage" :isScrolled="isScrolled" />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
} from "vue";
import AppHeader from "@/components/AppHeader.vue"; // 헤더 컴포넌트 임포트
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
  },
  setup() {
    const route = useRoute();
    const isSignInPage = computed(() => route.path === "/signin");

    const isScrolled = ref(false);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 0; // 스크롤 위치에 따라 상태 업데이트
    };

    // 스크롤 이벤트 등록 및 해제
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return { isSignInPage, isScrolled };
  },
});
</script>

<style lang="scss">
@import "vue-toast-notification/dist/theme-sugar.css";

#app {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체를 채우도록 설정 */
  overflow: hidden;
}

body {
  background: url("./assets/images/paul-volkmer-qVotvbsuM_c-unsplash.jpg"); /* 배경 이미지 설정 */
  margin: 0;
  padding: 0;
  background-size: cover;
  background-position: center;
}

.main-content {
  flex: 1; /* 남은 공간을 차지하도록 설정 */
  overflow-y: auto; /* 콘텐츠가 길 경우 스크롤 가능 */
  margin-top: 60px; /* 헤더 높이만큼 여백 추가 */
}

.vue-toast {
  background-color: #333; /* Toast 배경색 */
  color: #fff; /* 텍스트 색상 */
  border-radius: 8px; /* 모서리 둥글게 */
}

.vue-toast .vue-toast__close {
  color: #fff;
}

/* 헤더 스타일 오버라이드 */
header.app-header {
  position: fixed; /* 화면 상단에 고정 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
