import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false, // 로그인 상태
    userID: "", // 사용자 ID
    apiKey: "", // TMDB API 키
    wishlist: [] as number[], // 찜한 영화 ID 목록
  },
  mutations: {
    // 로그인 상태와 사용자 정보 설정
    setLoginState(state, { userID, apiKey }) {
      state.loggedIn = true;
      state.userID = userID;
      state.apiKey = apiKey;

      // 로컬 스토리지에 저장
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userID", userID);
      localStorage.setItem("apiKey", apiKey);
    },
    // 로그아웃 처리
    logout(state) {
      state.loggedIn = false;
      state.userID = "";
      state.apiKey = "";

      // 로컬 스토리지에서 제거
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userID");
      localStorage.removeItem("apiKey");
    },
    // 초기 상태 설정 (로컬 스토리지에서 로드)
    initializeState(state) {
      state.loggedIn = localStorage.getItem("loggedIn") === "true";
      state.userID = localStorage.getItem("userID") || "";
      state.apiKey = localStorage.getItem("apiKey") || "";
    },
    // Wishlist 초기화 (로컬 스토리지 로드)
    initializeWishlist(state) {
      const storedWishlist = localStorage.getItem("wishlist");
      state.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    },
    // Wishlist에 영화 추가
    addToWishlist(state, movieId: number) {
      if (!state.wishlist.includes(movieId)) {
        state.wishlist.push(movieId);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },
    // Wishlist에서 영화 제거
    removeFromWishlist(state, movieId: number) {
      state.wishlist = state.wishlist.filter((id) => id !== movieId);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
  actions: {
    // 로그인 처리
    login({ commit }, { userID, apiKey }) {
      commit("setLoginState", { userID, apiKey });
    },
    // 로그아웃 처리
    logout({ commit }) {
      commit("logout");
    },
    // Wishlist 영화 추가
    addMovieToWishlist({ commit }, movieId: number) {
      commit("addToWishlist", movieId);
    },
    // Wishlist 영화 제거
    removeMovieFromWishlist({ commit }, movieId: number) {
      commit("removeFromWishlist", movieId);
    },
    // 초기 상태 로드
    initializeAppState({ commit }) {
      commit("initializeState");
      commit("initializeWishlist");
    },
  },
  getters: {
    isLoggedIn: (state) => state.loggedIn,
    getUserID: (state) => state.userID,
    getAPIKey: (state) => state.apiKey,
    getWishlist: (state) => state.wishlist,
  },
});
