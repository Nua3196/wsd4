<template>
  <div
    class="movie-card"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="toggleWishlist"
  >
    <img :src="movie.backdrop_path" :alt="movie.title" class="poster" />
    <!-- 마우스 호버 시 추가 정보 표시 -->
    <div class="info" v-if="hover">
      <h3 class="title">{{ movie.title }}</h3>
      <p class="description">{{ truncatedOverview }}</p>
      <!-- <p class="release-date">Release Date: {{ movie.release_date }}</p>
      <div class="genres">
        <span v-for="(genre, index) in movie.genres" :key="index" class="genre">
          {{ genre }}
        </span>
      </div> -->
    </div>
    <!-- 찜 여부 표시 -->
    <div class="wishlist-indicator" v-if="isInWishlist">❤️</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MoviePoster",
  props: {
    movie: {
      type: Object as () => {
        id: number;
        title: string;
        backdrop_path: string;
        overview: string;
        release_date: string;
        genres: string[];
      },
      required: true,
    },
  },
  setup(props) {
    const store = useStore(); // Vuex Store 사용
    const hover = ref(false); // 호버 상태 관리

    // Wishlist에 있는지 확인
    const isInWishlist = computed(() =>
      store.getters.getWishlist.includes(props.movie.id)
    );

    // Wishlist 추가/제거 토글
    const toggleWishlist = () => {
      if (isInWishlist.value) {
        store.dispatch("removeMovieFromWishlist", props.movie.id);
      } else {
        store.dispatch("addMovieToWishlist", props.movie.id);
      }
    };

    // 영화 설명을 일정 길이까지만 표시하고 초과 시 ... 처리
    const maxLength = 30; // 최대 표시 길이
    const truncatedOverview = computed(() => {
      return props.movie.overview.length > maxLength
        ? props.movie.overview.slice(0, maxLength) + "..."
        : props.movie.overview;
    });

    return { hover, truncatedOverview, isInWishlist, toggleWishlist };
  },
});
</script>

<style scoped>
.movie-card {
  position: relative;
  width: 200px;
  height: 300px;
  overflow: visible;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.movie-card:hover {
  transform: scale(1.1); /* 확대 효과 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3); /* 그림자 효과 */
}

/* 찜 상태를 나타내는 하트 아이콘 스타일 */
.wishlist-indicator {
  position: absolute; /* 부모 요소(movie-card) 기준으로 배치 */
  top: 5px; /* 카드의 상단에서 10px 아래 */
  right: 5px; /* 카드의 오른쪽에서 10px 안쪽 */
  font-size: 1.7rem; /* 적당한 크기의 하트 아이콘 */
  z-index: 10; /* 다른 요소 위에 표시되도록 우선순위 설정 */
  cursor: pointer;
}

/* 호버 시 하트 강조 */
.wishlist-indicator:hover {
  top: 1px;
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
