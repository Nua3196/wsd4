<template>
  <!-- 사용자에게 화면을 보여주지 않음 -->
  <div style="display: none"></div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

export default {
  name: 'OAuthCallback',
  setup() {
    const router = useRouter()
    const toast = useToast()
    const store = useStore()

    // 액세스 토큰 요청
    const fetchAccessToken = async (authCode: string) => {
      try {
        const host = process.env.VUE_APP_IP_ADDRESS || 'localhost' // 기본값 설정
        const port = process.env.VUE_APP_PORT || '8080' // 기본값 설정
        const redirectUri = `http://${host}:${port}/oauth` // Redirect URI 동적으로 구성
        const response = await fetch('https://kauth.kakao.com/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: process.env.VUE_APP_KAKAO_API_KEY as string, // REST API 키
            redirect_uri: redirectUri,
            code: authCode, // 받은 인증 코드
          }),
        })

        const data = await response.json()
        if (data.error) throw new Error(data.error_description)

        console.log('Access Token:', data.access_token)
        fetchUserInfo(data.access_token)
      } catch (error) {
        console.error('Error fetching access token:', error)
        toast.error('Login failed. Redirecting to Sign In...')
        router.push('/signin') // 로그인 페이지로 이동
      }
    }

    // 사용자 정보 요청
    const fetchUserInfo = async (accessToken: string) => {
      try {
        const response = await fetch('https://kapi.kakao.com/v2/user/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const userInfo = await response.json()
        console.log('User Info:', userInfo)

        // Vuex에 로그인 상태 업데이트
        store.dispatch('login', {
          userID: userInfo.id,
          accessToken: accessToken,
          nickname: userInfo.kakao_account.profile.nickname,
          thumbnail: userInfo.kakao_account.profile.thumbnail_image_url,
        })

        // 사용자 정보 저장 후 홈 화면으로 이동
        toast.success(`Welcome, ${userInfo.kakao_account.profile.nickname}!`)
        router.push('/') // 로그인 성공 후 홈으로 이동
      } catch (error) {
        console.error('Error fetching user info:', error)
        toast.error('Failed to retrieve user information.')
        router.push('/signin') // 로그인 페이지로 이동
      }
    }

    // OAuth 인증 코드 처리
    const handleOAuthCallback = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const authCode = urlParams.get('code')

      if (authCode) {
        fetchAccessToken(authCode) // 인증 코드로 액세스 토큰 요청
      } else {
        toast.error('Authorization code is missing.')
        router.push('/signin') // 로그인 페이지로 이동
      }
    }

    handleOAuthCallback()

    return {}
  },
}
</script>

<style scoped>
/* 화면을 숨기기 위해 display: none 처리 */
div {
  display: none;
}
</style>
