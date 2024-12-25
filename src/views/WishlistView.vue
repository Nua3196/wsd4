<template>
  <div class="wishlist">
    <h1 class="title">위시리스트</h1>

    <!-- 위시리스트가 비어 있는 경우 -->
    <div v-if="wishlistMovies.length === 0" class="empty-message">
      찜한 영화가 없습니다.
    </div>

    <!-- 위시리스트 영화 목록 -->
    <div v-else class="movie-grid">
      <MoviePoster
        v-for="movie in wishlistMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import MoviePoster from '@/components/MoviePoster.vue'
import { Movie } from '@/types/movie'

export default defineComponent({
  name: 'WishlistView',
  components: { MoviePoster },
  setup() {
    const store = useStore()

    // Vuex에서 찜한 영화 목록 가져오기
    const wishlistMovies = computed<Movie[]>(() => store.getters.getWishlist)

    return { wishlistMovies }
  },
})
</script>

<style scoped>
.wishlist {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 전체 콘텐츠를 수직 중앙 정렬 */
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  color: #fff;
}

.empty-message {
  text-align: center;
  font-size: 1.2rem;
  color: #aaa;
}

.movie-grid {
  display: flex; /* Flexbox 사용 */
  flex-wrap: wrap; /* 여러 줄로 영화 정렬 */
  gap: 40px; /* 카드 간격 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  max-width: 1200px; /* 최대 너비 제한 */
  margin: auto; /* 페이지 중앙 정렬 */
}

.movie-grid > * {
  flex: 1 0 200px; /* 아이템이 200px 고정 크기를 유지 */
  max-width: 200px; /* 카드 크기 제한 */
}
</style>
