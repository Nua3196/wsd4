<template>
  <div class="wrapper" :class="{ flip: !showLogin }">
    <!-- Login Form -->
    <transition name="fade">
      <!-- showLogin이 true일 때 로그인 폼이 표시됨 -->
      <div v-show="showLogin" class="card login-size">
        <div class="login-form">
          <h2>Login</h2>
          <!-- ID 입력 필드 -->
          <div class="input-group">
            <i class="fas fa-user"></i>
            <input type="text" v-model="loginID" placeholder="ID" />
          </div>
          <!-- 비밀번호 입력 필드 -->
          <div class="input-group">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              v-model="loginPassword"
              placeholder="Password"
            />
          </div>
          <!-- 'Remember me' 체크박스 -->
          <div class="checkbox-group">
            <input type="checkbox" v-model="rememberMe" id="remember-me" />
            <label for="remember-me">Remember me</label>
          </div>
          <!-- 로그인 버튼 -->
          <button class="btn btn-login" @click="handleLogin">Login</button>
          <!-- 회원가입으로 전환하는 링크 -->
          <p class="toggle-text">
            Don't have an account?
            <a href="#" class="toggle" @click="toggleView">Register Now</a>
          </p>
        </div>
      </div>
    </transition>

    <!-- Registration Form -->
    <transition name="fade">
      <!-- showLogin이 false일 때 회원가입 폼이 표시됨 -->
      <div v-show="!showLogin" class="card register-size">
        <div class="register-form">
          <h2>Registration</h2>
          <!-- ID 입력 필드 -->
          <div class="input-group">
            <i class="fas fa-user"></i>
            <input type="text" v-model="registerID" placeholder="ID" />
          </div>
          <!-- 비밀번호 입력 필드 -->
          <div class="input-group">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              v-model="registerPassword"
              placeholder="Password"
            />
          </div>
          <!-- 비밀번호 확인 필드 -->
          <div class="input-group">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              v-model="registerPasswordConfirm"
              placeholder="Confirm Password"
            />
          </div>
          <!-- 약관 동의 체크박스 -->
          <div class="checkbox-group">
            <input type="checkbox" v-model="acceptTerms" id="accept-terms" />
            <label for="accept-terms"
              >I agree to the terms and conditions</label
            >
          </div>
          <!-- 회원가입 버튼 -->
          <button class="btn" @click="handleRegister">Register</button>
          <!-- 로그인으로 전환하는 링크 -->
          <p class="toggle-text">
            Already have an account?
            <a href="#" class="toggle" @click="toggleView">Login Now</a>
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useToast } from "vue-toast-notification";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SignInView",
  setup() {
    // 플러그인 및 유틸리티 초기화
    const toast = useToast();
    const store = useStore();
    const router = useRouter();

    // 상태 관리
    const showLogin = ref(true);
    const loginID = ref("");
    const loginPassword = ref("");
    const rememberMe = ref(false);
    const registerID = ref("");
    const registerPassword = ref("");
    const registerPasswordConfirm = ref("");
    const acceptTerms = ref(false);

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 로그인 정보 로드
    const initializeLoginData = () => {
      const savedID = localStorage.getItem("loginID");
      const savedPassword = localStorage.getItem("loginPassword");
      if (savedID && savedPassword) {
        loginID.value = savedID;
        loginPassword.value = savedPassword;
        rememberMe.value = true;
      }
    };

    // 이메일 유효성 검사
    const validateEmail = (email: string) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    };

    // 로그인 로직
    const handleLogin = async () => {
      if (!validateEmail(loginID.value)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (!loginID.value || !loginPassword.value) {
        toast.error("Please enter both ID and password.");
        return;
      }

      const storedPassword = localStorage.getItem(loginID.value);
      if (storedPassword !== loginPassword.value) {
        toast.error("Invalid ID or password.");
        return;
      }

      // 'Remember me' 체크박스 선택 시 로컬 스토리지에 저장
      if (rememberMe.value) {
        localStorage.setItem("loginID", loginID.value);
        localStorage.setItem("loginPassword", loginPassword.value);
      } else {
        localStorage.removeItem("loginID");
        localStorage.removeItem("loginPassword");
      }

      // Vuex에 로그인 정보 저장
      try {
        await store.dispatch("login", {
          userID: loginID.value,
          apiKey: loginPassword.value,
        });
        toast.success("Login successful!");
        router.push("/"); // 로그인 성공 시 홈으로 이동
      } catch (error) {
        toast.error("An error occurred during login.");
      }
    };

    // 회원가입 로직
    const handleRegister = () => {
      if (!validateEmail(registerID.value)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (!acceptTerms.value) {
        toast.error("You must accept the terms and conditions to register.");
        return;
      }
      if (
        !registerID.value ||
        !registerPassword.value ||
        !registerPasswordConfirm.value
      ) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (registerPassword.value !== registerPasswordConfirm.value) {
        toast.error("Passwords do not match.");
        return;
      }

      // 로컬 스토리지에 회원가입 데이터 저장
      if (localStorage.getItem(registerID.value)) {
        toast.error("This ID is already registered.");
        return;
      }

      localStorage.setItem(registerID.value, registerPassword.value);
      toast.success("Registration successful! Redirecting to login...");
      showLogin.value = true; // 회원가입 성공 후 로그인 화면으로 전환
    };

    // 로그인/회원가입 화면 전환
    const toggleView = () => {
      showLogin.value = !showLogin.value;
    };

    // 컴포넌트 로드 시 초기화
    initializeLoginData();

    return {
      showLogin,
      loginID,
      loginPassword,
      rememberMe,
      registerID,
      registerPassword,
      registerPasswordConfirm,
      acceptTerms,
      handleLogin,
      handleRegister,
      toggleView,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"); /* 구글 폰트(Poppins) 임포트 */

* {
  padding: 0;
  margin: 0;
  font-family: "Poppins", sans-serif; /* 모든 요소에 Poppins 폰트 적용 */
  box-sizing: border-box; /* 요소의 크기를 계산할 때 padding과 border를 포함하도록 설정 */
}

/* fade 트랜지션 애니메이션 설정 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease; /* 트랜지션 중 opacity를 0.5초 동안 부드럽게 변경 */
}

.fade-enter,
.fade-leave-to {
  opacity: 0; /* 트랜지션 시작 시 투명도 설정 */
}

/* 로그인 및 회원가입 폼을 감싸는 wrapper 스타일 설정 */
.wrapper {
  height: 430px;
  width: 320px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 화면 중앙에 위치하도록 설정 */
  perspective: 1000px; /* 3D 트랜스폼을 위한 원근감 설정 */
  backdrop-filter: blur(5px); /* 배경 블러 효과 */
}

/* 로그인 카드의 크기 설정 */
.wrapper .card.login-size {
  height: 340px;
}

/* 로그인 카드와 회원가입 폼의 기본 스타일 설정 */
.wrapper .login-form,
.wrapper .register-form {
  position: absolute;
  top: 0; /* 부모 요소 내에서 가장 위에 위치 */
  left: 0; /* 부모 요소 내에서 가장 왼쪽에 위치 */
  width: 100%;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
  background: rgba(110, 110, 110, 0.445); /* 반투명한 보라색 배경 */
  color: #000000;
  border-radius: 10px; /* 둥근 모서리 설정 */
  transition: transform 1s ease-in-out, opacity 0.6s ease-in-out;
  backface-visibility: hidden; /* 회전 시 뒷면 숨기기 */
  border: 1px solid #ffffff15; /* 테두리 설정 */
}

/* 로그인 폼의 초기 상태: 기본적으로 보이도록 설정 */
.wrapper .login-form {
  transform: rotateY(0);
  opacity: 1;
}

/* 회원가입 폼의 초기 상태: 보이지 않도록 회전한 상태로 설정 */
.wrapper .register-form {
  transform: rotateY(180deg);
  opacity: 0;
}

/* flip 클래스가 적용되었을 때 로그인 폼과 회원가입 폼의 상태 설정 */
.wrapper.flip .login-form {
  transform: rotateY(180deg);
  opacity: 0; /* 회전하며 사라짐 */
}

.wrapper.flip .register-form {
  transform: rotateY(0);
  opacity: 1; /* 회전하며 나타남 */
}

/* 폼 제목 스타일 설정 */
.wrapper h2 {
  margin-bottom: 20px;
  margin-top: -10px;
  font-weight: 600;
}

/* 입력 필드 그룹의 스타일 설정 */
.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-group i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%); /* 아이콘을 입력 필드의 수직 중앙에 배치 */
  color: #ffffffcf; /* 아이콘 색상 설정 */
}

/* 입력 필드 스타일 설정 */
.input-group input {
  width: 100%;
  padding: 10px 35px 10px 10px; /* 아이콘 공간 확보를 위해 오른쪽 패딩 추가 */
  border-radius: 5px;
  border: none;
  background: rgba(255, 255, 255, 0.1); /* 반투명한 입력 필드 배경 */
  color: #fff; /* 입력 텍스트 색상 */
  outline: none; /* 포커스 시 외곽선 제거 */
}

/* 입력 필드의 placeholder 스타일 설정 */
.input-group input::placeholder {
  color: #fff;
  letter-spacing: 1px;
  font-size: 12px;
}

/* 비밀번호 찾기 링크 스타일 설정 */
.forgot-password {
  display: block;
  margin-left: 160px;
  margin-top: -15px;
  font-size: 10px;
  font-weight: 600;
  color: #060606;
}

/* 로그인 버튼 스타일 설정 */
.btn-login {
  margin: 20px 0;
}

/* 기본 버튼 스타일 설정 */
.btn {
  padding: 10px 20px;
  width: 100%;
  background-color: #dfeaf7; /* 연한 파란색 배경 */
  border: none;
  text-transform: uppercase; /* 버튼 텍스트를 대문자로 변환 */
  font-weight: 600;
  color: #000;
  border-radius: 5px;
  cursor: pointer; /* 커서를 포인터로 변경 */
  letter-spacing: 1px;
  margin-bottom: 10px;
}

/* 로그인/회원가입 전환 링크 텍스트 스타일 설정 */
.toggle-text {
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 300;
}

/* 로그인/회원가입 전환 링크 스타일 설정 */
.toggle {
  color: #050506;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0;
}

/* 로그인/회원가입 전환 링크에 마우스를 올렸을 때 스타일 설정 */
.toggle:hover {
  text-decoration: underline;
}

/* 체크박스와 문구 사이의 간격 추가 */
.checkbox-group {
  /* display: flex; flex를 사용하여 체크박스와 텍스트를 수평으로 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
}

.checkbox-group input[type="checkbox"] {
  vertical-align: middle;
  margin-right: 10px; /* 체크박스와 레이블 사이에 10px의 간격 추가 */
}
</style>
