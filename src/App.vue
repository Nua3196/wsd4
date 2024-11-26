<template>
  <div id="app">
    <router-view />
  </div>
</template>

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
