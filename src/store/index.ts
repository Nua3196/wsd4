import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,       // 로그인 상태
    userID: "",            // 사용자 ID
    password: "",          // 비밀번호(API 키)
  },
  mutations: {
    // 로그인 상태와 사용자 정보 설정
    setLoginState(state, { userID, password }) {
      state.loggedIn = true;
      state.userID = userID;
      state.password = password;

      // 로컬 스토리지에 저장
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userID", userID);
      localStorage.setItem("password", password);
    },
    // 로그아웃 처리
    logout(state) {
      state.loggedIn = false;
      state.userID = "";
      state.password = "";

      // 로컬 스토리지에서 제거
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userID");
      localStorage.removeItem("password");
    },
    // 초기 상태 설정 (로컬 스토리지에서 로드)
    initializeState(state) {
      state.loggedIn = localStorage.getItem("loggedIn") === "true";
      state.userID = localStorage.getItem("userID") || "";
      state.password = localStorage.getItem("password") || "";
    },
  },
  actions: {
    // 로그인 처리
    login({ commit }, { userID, password }) {
      commit("setLoginState", { userID, password });
    },
    // 로그아웃 처리
    logout({ commit }) {
      commit("logout");
    },
  },
  getters: {
    isLoggedIn: (state) => state.loggedIn,
    getUserID: (state) => state.userID,
    getPassword: (state) => state.password,
  },
});