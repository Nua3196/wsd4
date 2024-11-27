<template>
  <div class="movie-poster">
    <!-- 영화 포스터 -->
    <img :src="movie.posterPath" :alt="movie.title" />

    <!-- 영화 제목 -->
    <div class="title">{{ movie.title }}</div>

    <!-- 영화 설명 -->
    <div class="description">{{ movie.description }}</div>

    <!-- 영화 개봉일 -->
    <div class="release-date">Release Date: {{ movie.releaseDate }}</div>

    <!-- 영화 장르 -->
    <div class="genres">
      Genres:
      <span v-for="(genre, index) in movie.genres" :key="index" class="genre">
        {{ genre }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MoviePoster",
  props: {
    movie: {
      type: Object as PropType<{
        title: string;
        posterPath: string;
        description: string;
        releaseDate: string;
        genres: string[];
      }>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.movie-poster {
  width: 200px;
  border: 1px solid #ddd; // 외곽선 추가
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .title {
    font-weight: bold;
    font-size: 1.2em;
    margin-bottom: 10px;
  }

  .description {
    font-size: 0.9em;
    color: #666;
    margin-bottom: 10px;
  }

  .release-date {
    font-size: 0.8em;
    margin-bottom: 10px;
    color: #333;
  }

  .genres {
    font-size: 0.8em;
    .genre {
      margin-right: 5px;
      padding: 2px 5px;
      background-color: #f1f1f1;
      border-radius: 5px;
    }
  }
}
</style>
