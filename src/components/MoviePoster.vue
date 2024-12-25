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
    </div>
    <!-- 찜 여부 표시 -->
    <div class="wishlist-indicator" v-if="isInWishlist">❤️</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { Movie } from '@/types/movie'

export default defineComponent({
  name: 'MoviePoster',
  props: {
    movie: {
      type: Object as () => Movie,
      required: true,
    },
  },
  setup(props) {
    const store = useStore() // Vuex Store 사용
    const hover = ref(false) // 호버 상태 관리

    // Wishlist에 있는지 확인
    const isInWishlist = computed(() =>
      store.getters.getWishlist.some(
        (item: Movie) => item.id === props.movie.id
      )
    )

    // Wishlist 추가/제거 토글
    const toggleWishlist = () => {
      if (isInWishlist.value) {
        store.dispatch('removeMovieFromWishlist', props.movie.id) // 영화 ID로 제거
      } else {
        store.dispatch('addMovieToWishlist', props.movie) // 영화 객체로 추가
      }
    }

    // 영화 설명을 일정 길이까지만 표시하고 초과 시 ... 처리
    const maxLength = 30 // 최대 표시 길이
    const truncatedOverview = computed(() => {
      return props.movie.overview.length > maxLength
        ? props.movie.overview.slice(0, maxLength) + '...'
        : props.movie.overview
    })

    return { hover, truncatedOverview, isInWishlist, toggleWishlist }
  },
})
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
  transform: scale(1.1);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.wishlist-indicator {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1.7rem;
  z-index: 10;
  cursor: pointer;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
}

.movie-card:hover .info {
  transform: translateY(0);
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
</style>
