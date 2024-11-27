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
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import MoviePoster from "@/components/MoviePoster.vue";
import { Movie } from "@/types/movie";

export default defineComponent({
  name: "WishlistView",
  components: { MoviePoster },
  setup() {
    const store = useStore();

    // Vuex에서 찜한 영화 ID 가져오기
    const wishlist = computed(() => store.getters.getWishlist);

    // Local Storage에서 영화 데이터를 가져와 찜한 영화 필터링
    const wishlistMovies = computed<Movie[]>(() => {
      const storedMovies = localStorage.getItem("movies");
      const allMovies = storedMovies ? JSON.parse(storedMovies) : [];
      return allMovies.filter((movie: Movie) =>
        wishlist.value.includes(movie.id)
      );
    });

    return { wishlistMovies };
  },
});
</script>

<style scoped>
.wishlist {
  padding: 20px;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
</style>
