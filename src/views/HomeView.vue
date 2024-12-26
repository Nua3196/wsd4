<template>
  <div class="home">
    <MainBanner />
    <MovieList
      v-for="(movies, index) in movieCategories"
      :key="index"
      :categoryTitle="movies.title"
      :movies="movies.list"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import MovieList from "@/components/MovieList.vue";
import { fetchMoviesByCategory } from "@/services/api";
import MainBanner from "@/components/MainBanner.vue";
import { Movie } from "@/types/movie";
import { Logger } from "@/utils/logger";

export default defineComponent({
  name: "HomeView",
  components: {
    MainBanner,
    MovieList,
  },
  setup() {
    const movieCategories = ref<
      Array<{
        title: string;
        list: Movie[];
      }>
    >([]);

    const loadMovies = async () => {
      try {
        const categories = [
          { title: "인기 콘텐츠", category: "popular" },
          { title: "최신 영화", category: "now_playing" },
          { title: "높은 평점", category: "top_rated" },
          { title: "다가오는 영화", category: "upcoming" },
        ];

        for (const { title, category } of categories) {
          const movies = await fetchMoviesByCategory(category);
          movieCategories.value.push({ title, list: movies });
        }
      } catch (error) {
        Logger.error("Error loading movies:", error);
      }
    };

    onMounted(() => {
      loadMovies();
    });

    return {
      movieCategories,
    };
  },
});
</script>

<style scoped>
.home {
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* .movies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
} */
</style>
