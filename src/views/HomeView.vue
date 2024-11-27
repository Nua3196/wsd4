<template>
  <div class="home">
    <div class="movies">
      <!-- MoviePoster 컴포넌트를 동적으로 렌더링 -->
      <MoviePoster
        v-for="(movie, index) in movies"
        :key="index"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoviePoster from "@/components/MoviePoster.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MoviePoster,
  },
  data() {
    return {
      // 여러 영화 정보를 관리하는 데이터
      movies: [
        {
          title: "Inception",
          posterPath: "https://image.tmdb.org/t/p/w200/xyz.jpg",
          description: "A mind-bending thriller about dream invasion.",
          releaseDate: "2010-07-16",
          genres: ["Action", "Sci-Fi", "Thriller"],
        },
        {
          title: "The Dark Knight",
          posterPath: "https://image.tmdb.org/t/p/w200/abc.jpg",
          description: "A vigilante must confront chaos in Gotham.",
          releaseDate: "2008-07-18",
          genres: ["Action", "Drama", "Crime"],
        },
        {
          title: "Interstellar",
          posterPath: "https://image.tmdb.org/t/p/w200/def.jpg",
          description: "Exploration of space and love across dimensions.",
          releaseDate: "2014-11-07",
          genres: ["Adventure", "Drama", "Sci-Fi"],
        },
      ],
    };
  },
});
</script>

<style lang="scss">
.home {
  padding: 20px;
}
</style>
