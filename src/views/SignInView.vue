<template>
  <div class="wrapper">
    <transition name="fade">
      <div class="card login-size">
        <div class="login-form">
          <h2>Login</h2>
          <!-- 카카오 로그인 버튼 -->
          <button class="btn btn-kakao" @click="redirectToKakaoLogin">
            카카오 로그인
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SignInView',
  setup() {
    // 카카오 로그인 리다이렉트
    const redirectToKakaoLogin = () => {
      const clientId = process.env.VUE_APP_KAKAO_API_KEY // .env에서 REST API 키 가져오기
      const scheme = process.env.VUE_APP_SCHEME
      const host = process.env.VUE_IP_ADDRESS
      const port = process.env.VUE_APP_PORT
      const redirectUri = `${scheme}://${host}:${port}/oauth` // Redirect URI 동적으로 구성
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&prompt=login&response_type=code`
      window.location.href = kakaoAuthUrl // 카카오 로그인 페이지로 리다이렉트
    }

    return {
      redirectToKakaoLogin,
    }
  },
})
</script>

<style scoped>
.wrapper {
  height: 430px;
  width: 320px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(5px);
}

.card {
  height: 340px;
  padding: 40px 20px;
  text-align: center;
  background: rgba(110, 110, 110, 0.445);
  color: #000;
  border-radius: 10px;
  border: 1px solid #ffffff15;
}

h2 {
  margin-bottom: 20px;
  margin-top: -10px;
  font-weight: 600;
}

.btn-kakao {
  background-color: #fee500;
  color: #181600;
  border: none;
  width: 100%;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
