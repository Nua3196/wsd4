import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false, // 로그인 상태
    userID: "", // 사용자 ID
    apiKey: "", // TMDB API 키
    wishlist: [] as Array<{ id: number; title: string; backdrop_path: string }>, // 찜한 영화 객체 배열
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
      state.wishlist = [];

      // 로컬 스토리지에서 제거
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userID");
      localStorage.removeItem("apiKey");
      localStorage.removeItem("wishlist");
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
    addToWishlist(state, movie) {
      if (!state.wishlist.some((item) => item.id === movie.id)) {
        state.wishlist.push(movie);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },
    // Wishlist에서 영화 제거
    removeFromWishlist(state, movieId: number) {
      state.wishlist = state.wishlist.filter((movie) => movie.id !== movieId);
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
    addMovieToWishlist({ commit }, movie) {
      commit("addToWishlist", movie);
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
