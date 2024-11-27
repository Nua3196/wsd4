<template>
  <div class="popular">
    <!-- View 선택 버튼 -->
    <div class="view-toggle">
      <button :class="{ active: isTableView }" @click="setViewMode('table')">
        Table View
      </button>
      <button
        :class="{ active: !isTableView }"
        @click="setViewMode('infinite')"
      >
        Infinite Scroll
      </button>
    </div>

    <!-- 영화 목록 -->
    <div v-if="isTableView" class="table-view">
      <table>
        <thead>
          <tr>
            <th>포스터</th>
            <th>제목</th>
            <th>개봉일</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id">
            <td><img :src="movie.backdrop_path" :alt="movie.title" /></td>
            <td>{{ movie.title }}</td>
            <td>{{ movie.release_date }}</td>
            <td>{{ movie.overview }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 페이지네이션 -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">이전</button>
        <span>Page {{ currentPage }}</span>
        <button @click="nextPage" :disabled="!hasMorePages">다음</button>
      </div>
    </div>

    <div v-else class="infinite-scroll-view">
      <div class="movie-grid">
        <MoviePoster v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
      <div v-if="loading" class="loading-indicator">Loading...</div>
    </div>

    <!-- 맨 위로 이동 버튼 -->
    <button class="scroll-top" @click="scrollToTop" v-if="showScrollTop">
      ↑ Top
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import MoviePoster from "@/components/MoviePoster.vue";
import { fetchMoviesByCategory } from "@/services/api";
import { Movie } from "@/types/movie";

export default defineComponent({
  name: "PopularView",
  components: { MoviePoster },
  setup() {
    const movies = ref<Movie[]>([]);
    const currentPage = ref(1);
    const isTableView = ref(true); // 현재 View 모드
    const loading = ref(false); // 로딩 상태
    const showScrollTop = ref(false); // "맨 위로 이동" 버튼 표시 여부
    const hasMorePages = ref(true); // 추가 페이지 여부 확인

    // View 모드 변경
    const setViewMode = (mode: "table" | "infinite") => {
      isTableView.value = mode === "table";
      if (!isTableView.value) {
        movies.value = [];
        currentPage.value = 1;
        loadMovies();
      }
    };

    // 영화 데이터 로드
    const loadMovies = async () => {
      if (loading.value || !hasMorePages.value) return;
      loading.value = true;
      try {
        const fetchedMovies = await fetchMoviesByCategory(
          "popular",
          currentPage.value,
        );
        if (fetchedMovies.length > 0) {
          movies.value = [...movies.value, ...fetchedMovies];
          currentPage.value++;
        } else {
          hasMorePages.value = false;
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        loading.value = false;
      }
    };

    // 페이지네이션
    const nextPage = async () => {
      currentPage.value++;
      const fetchedMovies = await fetchMoviesByCategory(
        "popular",
        currentPage.value,
      );
      movies.value = fetchedMovies;
    };

    const prevPage = async () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        const fetchedMovies = await fetchMoviesByCategory(
          "popular",
          currentPage.value,
        );
        movies.value = fetchedMovies;
      }
    };

    // 스크롤 이벤트
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      // 스크롤 끝에 도달하면 추가 로드
      if (scrollTop + windowHeight >= scrollHeight - 10 && !isTableView.value) {
        loadMovies();
      }

      // "맨 위로 이동" 버튼 표시 여부
      showScrollTop.value = scrollTop > 200;
    };

    // 맨 위로 이동
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 컴포넌트가 로드되었을 때
    onMounted(() => {
      loadMovies();
      window.addEventListener("scroll", handleScroll);
    });

    return {
      movies,
      isTableView,
      currentPage,
      hasMorePages,
      loading,
      showScrollTop,
      setViewMode,
      nextPage,
      prevPage,
      scrollToTop,
    };
  },
});
</script>

<style scoped>
.popular {
  padding: 20px;
}

.view-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.view-toggle button {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  transition: all 0.3s;
}

.view-toggle button.active {
  background-color: #333;
  color: #fff;
  border-color: #333;
}

.table-view table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table-view th,
.table-view td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.infinite-scroll-view .movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.loading-indicator {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 20px;
}

.scroll-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}
</style>
