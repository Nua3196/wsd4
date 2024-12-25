import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: false, // 로그인 상태
    userID: '', // 사용자 ID(숫자)
    accessToken: '', // 카카오 로그인 AccessToken
    wishlist: [] as Array<{ id: number; title: string; backdrop_path: string }>, // 찜한 영화 객체 배열
    nickname: '', // 사용자 닉네임
    thumbnail: '', // 사용자 프로필 썸네일 이미지 경로
  },
  mutations: {
    // 로그인 상태와 사용자 정보 설정
    setLoginState(state, { userID, accessToken, nickname, thumbnail }) {
      state.loggedIn = true
      state.userID = userID
      state.accessToken = accessToken
      state.nickname = nickname
      state.thumbnail = thumbnail

      // 로컬 스토리지에 저장
      localStorage.setItem('loggedIn', 'true')
      localStorage.setItem('userID', userID)
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('nickname', nickname)
      localStorage.setItem('thumbnail', thumbnail)

      // wishlist 불러오기
      const storedWishlist = localStorage.getItem('wishlist_${state.userID}')
      state.wishlist = storedWishlist ? JSON.parse(storedWishlist) : []
    },
    // 로그아웃 처리
    logout(state) {
      state.loggedIn = false
      state.userID = ''
      state.accessToken = ''
      state.wishlist = []
      state.nickname = ''
      state.thumbnail = ''

      // 로컬 스토리지에서 제거
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('userID')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('nickname')
      localStorage.removeItem('thumbnail')
    },
    // 초기 상태 설정 (로컬 스토리지에서 로드)
    initializeState(state) {
      state.loggedIn = localStorage.getItem('loggedIn') === 'true'
      state.userID = localStorage.getItem('userID') || ''
      state.accessToken = localStorage.getItem('accessToken') || ''
      state.nickname = localStorage.getItem('nickname') || ''
      state.thumbnail = localStorage.getItem('thumbnail') || ''
      const storedWishlist = localStorage.getItem('wishlist_${state.userID}')
      state.wishlist = storedWishlist ? JSON.parse(storedWishlist) : []
    },
    //// Wishlist 초기화 (로컬 스토리지 로드)
    //initializeWishlist(state, wishlist) {
    //  state.wishlist = wishlist || []
    //},
    // Wishlist에 영화 추가
    addToWishlist(state, movie) {
      if (!state.wishlist.some((item) => item.id === movie.id)) {
        state.wishlist.push(movie)
        localStorage.setItem(
          'wishlist_${state.userID}',
          JSON.stringify(state.wishlist)
        )
      }
    },
    // Wishlist에서 영화 제거
    removeFromWishlist(state, movieId: number) {
      state.wishlist = state.wishlist.filter((movie) => movie.id !== movieId)
      localStorage.setItem(
        'wishlist_${state.userID}',
        JSON.stringify(state.wishlist)
      )
    },
  },
  actions: {
    // 로그인 처리
    login({ commit }, { userID, accessToken, nickname, thumbnail }) {
      commit('setLoginState', { userID, accessToken, nickname, thumbnail })
    },
    // 로그아웃 처리
    async logout({ commit, state }) {
      try {
        await fetch('https://kapi.kakao.com/v1/user/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        })
        console.log('Access Token expired on Kakao server.')
      } catch (error) {
        console.error('Error logging out from Kakao:', error)
      }

      // Vuex 상태 초기화
      commit('logout')
    },
    // Wishlist 영화 추가
    addMovieToWishlist({ commit }, movie) {
      commit('addToWishlist', movie)
    },
    // Wishlist 영화 제거
    removeMovieFromWishlist({ commit }, movieId: number) {
      commit('removeFromWishlist', movieId)
    },
    // 초기 상태 로드
    async initializeAppState({ commit, dispatch }) {
      commit('initializeState')
      //commit('initializeWishlist')

      // Access Token 검증
      const isValid = await dispatch('validateAccessToken')
      if (!isValid) {
        console.warn('Access Token is invalid. Logging out.')
        dispatch('logout') // 유효하지 않은 경우 로그아웃
      }
    },
    async validateAccessToken({ state }) {
      try {
        const response = await fetch(
          'https://kapi.kakao.com/v1/user/access_token_info',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.accessToken}`,
            },
          }
        )
        const data = await response.json()
        if (data.id) {
          console.log('Access Token is valid:', data)
          return true // 유효한 토큰
        }
        console.error('Invalid Access Token:', data)
        return false // 유효하지 않은 토큰
      } catch (error) {
        console.error('Error validating Access Token:', error)
        return false
      }
    },
  },
  getters: {
    isLoggedIn: (state) => {
      if (!state.loggedIn || !state.accessToken) {
        return false // 로그인 상태가 아니거나 Access Token이 없으면 false
      }

      // Access Token 검증 로직 추가
      const isTokenValid = async () => {
        try {
          const response = await fetch(
            'https://kapi.kakao.com/v1/user/access_token_info',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${state.accessToken}`,
              },
            }
          )
          const data = await response.json()
          return data.id ? true : false // 유효한 토큰인지 확인
        } catch (error) {
          console.error('Error checking Access Token:', error)
          return false
        }
      }
      return isTokenValid() // 유효성을 확인한 결과 반환
    },
    getUserID: (state) => state.userID,
    getaccessToken: (state) => state.accessToken,
    getWishlist: (state) => state.wishlist,
  },
})
