module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential', // Vue 3 관련 필수 규칙
    'eslint:recommended', // 기본 ESLint 규칙
    '@vue/typescript/recommended', // TypeScript 관련 추천 규칙
    'plugin:prettier/recommended', // Prettier와 ESLint 연동
  ],
  parserOptions: {
    ecmaVersion: 2020, // ECMAScript 2020 사용
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 프로덕션 환경에서 console.warn, console.error 허용
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 프로덕션 환경에서 debugger 허용
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // OS에 따라 자동 줄바꿈
        semi: false, // 세미콜론 사용 여부: false로 설정 (Prettier 규칙)
        singleQuote: true, // 문자열을 single quote로 설정
        trailingComma: 'es5', // 객체, 배열의 마지막 요소 뒤에 쉼표 허용
      },
    ],
  },
}
