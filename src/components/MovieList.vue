<template>
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
  margin-bottom: 10px;
  color: #fff;
}
.scroll-container {
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
  gap: 16px;
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
</style>
