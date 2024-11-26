<template>
  <div class="movie-poster">
    <!-- Movie Poster content will go here -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MoviePoster",
  props: {
    movie: {
      type: Object as PropType<{ title: string; posterPath: string }>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.movie-poster {
  width: 200px;
  img {
    width: 100%;
    border-radius: 10px;
  }
  .title {
    font-weight: bold;
    margin-top: 10px;
  }
}
</style>
