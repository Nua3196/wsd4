<template>
    <div class="table-view">
      <div class="movie-grid">
        <MoviePoster
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          class="table-item"
        />
      </div>
      <!-- 페이지네이션 -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">이전</button>
        <div class="page-numbers">
          <span
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: currentPage === page }"
          >
            {{ page }}
          </span>
        </div>
        <button @click="nextPage" :disabled="!hasMorePages">다음</button>
      </div>
    </div>
  </template>  

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import MoviePoster from "@/components/MoviePoster.vue";
import { fetchMoviesByCategory } from "@/services/api";
import { Movie } from "@/types/movie";

export default defineComponent({
  name: "TableView",
  components: { MoviePoster },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const movies = ref<Movie[]>([]);
    const currentPage = ref(1);
    const hasMorePages = ref(true);
    const totalPages = ref(10); // 총 페이지 수를 지정 (API에서 받아오는 경우 수정 필요)

    const loadMovies = async (page: number) => {
      try {
        const fetchedMovies = await fetchMoviesByCategory(props.category, page);
        movies.value = fetchedMovies;
        hasMorePages.value = fetchedMovies.length > 0;
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    const nextPage = () => {
      if (hasMorePages.value && currentPage.value < totalPages.value) {
        currentPage.value++;
        loadMovies(currentPage.value);
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        loadMovies(currentPage.value);
      }
    };

    const goToPage = (page: number) => {
      if (page !== currentPage.value) {
        currentPage.value = page;
        loadMovies(page);
      }
    };

    onMounted(() => {
      loadMovies(currentPage.value);
    });

    return {
      movies,
      currentPage,
      totalPages,
      hasMorePages,
      nextPage,
      prevPage,
      goToPage,
    };
  },
});
</script>

<style scoped>
.table-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  padding: 20px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 1fr;
  gap: 20px;
  flex-grow: 1;
  overflow: hidden;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.page-numbers {
  display: flex;
  gap: 5px;
}

.page-numbers span {
  padding: 6px 12px;
  background-color: #444;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.page-numbers span:hover {
  background-color: #555;
}

.page-numbers .active {
  background-color: #007bff;
  font-weight: bold;
}

button {
  padding: 8px 16px;
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #555;
}

button:disabled {
  background-color: #333;
  cursor: not-allowed;
}
</style>
