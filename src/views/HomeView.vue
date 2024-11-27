<template>
  <div class="home">
    <MainBanner />
    <div class="movies">
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
import MainBanner from "@/components/MainBanner.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    MainBanner,
    MoviePoster,
  },
  data() {
    return {
      movies: [
        {
          title: "Inception",
          posterPath: "https://image.tmdb.org/t/p/w200/xyz.jpg",
          description: "A mind-bending thriller about dream invasion.",
          releaseDate: "2010-07-16",
          genres: ["Action", "Sci-Fi", "Thriller"],
        },
        // 추가 영화 데이터
      ],
    };
  },
});
</script>

<style scoped>
.home {
  padding: 20px;
}

.movies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
</style>
