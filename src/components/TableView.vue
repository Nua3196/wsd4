<template>
  <div class="table-view">
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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { fetchMoviesByCategory } from "@/services/api";
import { Movie } from "@/types/movie";

export default defineComponent({
  name: "TableView",
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

    const loadMovies = async () => {
      try {
        const fetchedMovies = await fetchMoviesByCategory(
          props.category,
          currentPage.value
        );
        movies.value = fetchedMovies;
        hasMorePages.value = fetchedMovies.length > 0;
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };

    const nextPage = async () => {
      if (!hasMorePages.value) return;
      currentPage.value++;
      await loadMovies();
    };

    const prevPage = async () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        await loadMovies();
      }
    };

    onMounted(() => {
      loadMovies();
    });

    return { movies, currentPage, hasMorePages, nextPage, prevPage };
  },
});
</script>

<style scoped>
.table-view {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

img {
  width: 100px;
  height: auto;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

button {
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #333;
  color: #fff;
}
</style>
