<template>
  <div
    v-if="currentMovie"
    class="main-banner"
    :style="{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
    }"
  >
    <div class="overlay">
      <div class="content">
        <h1 class="title">{{ currentMovie.title }}</h1>
        <p class="description">{{ currentMovie.overview }}</p>
        <!-- <p class="release-date">개봉일: {{ currentMovie.release_date }}</p> -->
        <button class="details-button">자세히 보기</button>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { fetchNowPlayingMovies } from "@/services/api";
import { Movie } from "@/types/movie";
import { Logger } from "@/utils/logger";

export default defineComponent({
  name: "MainBanner",
  setup() {
    const currentMovie = ref<Movie | null>(null); // Movie 타입으로 지정

    const loadNowPlayingMovie = async () => {
      try {
        const movies = await fetchNowPlayingMovies(); // API 호출
        if (movies.length > 0) {
          currentMovie.value = movies[0]; // 첫 번째 영화 선택
        }
      } catch (error) {
        Logger.error("Error loading now playing movie:", error);
      }
    };

    onMounted(() => {
      loadNowPlayingMovie(); // 컴포넌트 마운트 시 API 호출
    });

    return {
      currentMovie,
    };
  },
});
</script>

<style scoped>
.main-banner {
  position: relative;
  width: 100%;
  height: 60vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;
  max-width: 80%;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.release-date {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.details-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #cc0000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.details-button:hover {
  background-color: #ff0000;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #666;
}
</style>
