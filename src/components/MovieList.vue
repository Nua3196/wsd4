<!-- <template>
  <div class="movie-list">
    <h2 class="category-title">{{ categoryTitle }}</h2>
    <div class="scroll-container">
      <MoviePoster v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import MoviePoster from "@/components/MoviePoster.vue";

export default defineComponent({
  name: "MovieList",
  components: {
    MoviePoster,
  },
  props: {
    categoryTitle: {
      type: String,
      required: true,
    },
    movies: {
      type: Array as PropType<
        Array<{
          id: number;
          title: string;
          backdrop_path: string;
          overview: string;
          release_date: string;
          genres: string[];
        }>
      >,
      required: true,
    },
  },
});
</script>

<style scoped>
.movie-list {
  margin-bottom: 40px;
}
.category-title {
  font-size: 1.5rem;
  margin-bottom: 20px; /* 여백 증가 */
  color: #fff;
}
.scroll-container {
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
  gap: 16px;
  align-items: center; /* 포스터 정렬 */
}
.scroll-container > * {
  flex: 0 0 auto; /* 요소가 축소되지 않도록 설정 */
  width: 150px; /* 포스터 너비 */
  height: 225px; /* 포스터 높이 */
}
.scroll-container::-webkit-scrollbar {
  height: 8px;
}
.scroll-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}
.scroll-container::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
.scroll-container::-webkit-scrollbar-track {
  background-color: #222; /* 트랙 색상 추가 */
}
</style> -->
<template>
  <div class="movie-list">
    <!-- 카테고리 제목 -->
    <h2 class="category-title">{{ categoryTitle }}</h2>
    <div class="scroll-wrapper">
      <!-- 왼쪽 스크롤 버튼 -->
      <button class="scroll-button left" @click="scrollLeft">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <!-- 영화 목록을 감싸는 컨테이너 -->
      <div class="scroll-container" ref="scrollContainer">
        <!-- 영화 포스터를 MoviePoster 컴포넌트를 통해 렌더링 -->
        <MoviePoster v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
      <!-- 오른쪽 스크롤 버튼 -->
      <button class="scroll-button right" @click="scrollRight">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MoviePoster from '@/components/MoviePoster.vue'

export default defineComponent({
  name: 'MovieList',
  components: {
    MoviePoster, // MoviePoster 컴포넌트를 가져와서 사용
  },
  props: {
    categoryTitle: {
      type: String,
      required: true, // 카테고리 제목을 필수로 받음
    },
    movies: {
      // 영화 목록 데이터를 배열로 받음
      type: Array as () => Array<{
        id: number
        title: string
        backdrop_path: string
        overview: string
        release_date: string
        genres: string[]
      }>,
      required: true,
    },
  },
  setup() {
    const scrollContainer = ref<HTMLElement | null>(null) // 스크롤 컨테이너를 참조

    // 왼쪽으로 스크롤하는 함수
    const scrollLeft = () => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' }) // 300px 왼쪽으로 이동
      }
    }

    // 오른쪽으로 스크롤하는 함수
    const scrollRight = () => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' }) // 300px 오른쪽으로 이동
      }
    }

    return {
      scrollContainer, // 스크롤 컨테이너 참조 반환
      scrollLeft, // 왼쪽 스크롤 함수 반환
      scrollRight, // 오른쪽 스크롤 함수 반환
    }
  },
})
</script>

<style scoped>
/* 영화 리스트 컨테이너 스타일 */
.movie-list {
  margin-bottom: 40px; /* 아래 여백 추가 */
}

/* 카테고리 제목 스타일 */
.category-title {
  font-size: 1.5rem;
  margin-bottom: 20px; /* 제목과 목록 간 여백 */
  color: #fff; /* 제목 색상 */
}

/* 스크롤 영역과 버튼을 감싸는 래퍼 */
.scroll-wrapper {
  position: relative; /* 버튼 위치를 설정하기 위한 기준 */
  display: flex;
  align-items: center;
}

/* 스크롤 가능한 컨테이너 */
.scroll-container {
  display: flex;
  overflow-x: auto; /* 가로 스크롤 허용 */
  gap: 16px; /* 각 포스터 간의 간격 */
  padding-bottom: 10px; /* 아래 여백 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
}
.scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari에서 스크롤바 숨기기 */
}
.scroll-container > * {
  flex: 0 0 auto; /* 요소의 크기를 고정하여 스크롤 가능하도록 설정 */
  width: 150px; /* 포스터 너비 */
  height: 225px; /* 포스터 높이 */
}

/* 스크롤 버튼 스타일 */
.scroll-button {
  position: absolute; /* 스크롤 버튼 위치 고정 */
  top: 50%; /* 세로 중앙 정렬 */
  transform: translateY(-50%); /* 정확한 중앙 배치 */
  background-color: rgba(0, 0, 0, 0.6); /* 반투명한 배경 */
  border: none;
  color: #fff; /* 버튼 텍스트 색상 */
  width: 40px;
  height: 40px;
  border-radius: 50%; /* 버튼을 원형으로 설정 */
  cursor: pointer; /* 클릭 가능 */
  z-index: 10; /* 버튼이 목록 위에 표시되도록 설정 */
}
.scroll-button.left {
  left: -20px; /* 왼쪽 버튼 위치 */
}
.scroll-button.right {
  right: -20px; /* 오른쪽 버튼 위치 */
}
.scroll-button:hover {
  background-color: rgba(255, 255, 255, 0.8); /* 호버 시 배경색 변경 */
  color: #000; /* 호버 시 텍스트 색상 변경 */
}
</style>
