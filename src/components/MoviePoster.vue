<template>
  <div class="movie-card" @mouseover="hover = true" @mouseleave="hover = false">
    <img :src="movie.backdrop_path" :alt="movie.title" class="poster" />
    <!-- 마우스 호버 시 추가 정보 표시 -->
    <div class="info" v-if="hover">
      <h3 class="title">{{ movie.title }}</h3>
      <p class="description">{{ movie.overview }}</p>
      <p class="release-date">Release Date: {{ movie.release_date }}</p>
      <div class="genres">
        <span v-for="(genre, index) in movie.genres" :key="index" class="genre">
          {{ genre }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MoviePoster",
  props: {
    movie: {
      type: Object as () => {
        title: string;
        backdrop_path: string;
        overview: string;
        release_date: string;
        genres: string[];
      },
      required: true,
    },
  },
  setup() {
    const hover = ref(false); // 호버 상태 관리
    return { hover };
  },
});
</script>

<style scoped>
.movie-card {
  position: relative;
  width: 200px;
  height: 300px;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.movie-card:hover {
  transform: scale(1.1); /* 확대 효과 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3); /* 그림자 효과 */
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 포스터가 영역을 가득 채우도록 */
  border-radius: 10px;
}

.info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* 반투명 배경 */
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
}

.movie-card:hover .info {
  transform: translateY(0); /* 호버 시 정보 표시 */
}

.title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 5px;
}

.description {
  font-size: 0.9em;
  margin-bottom: 10px;
}

.release-date {
  font-size: 0.8em;
  margin-bottom: 5px;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.genre {
  background-color: #f1f1f1;
  color: #333;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 0.7em;
}
</style>
