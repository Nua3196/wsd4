<template>
  <div class="infinite-scroll-view">
    <div class="movie-grid">
      <MoviePoster v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
    <div v-if="loading" class="loading-indicator">Loading...</div>
    <!-- Observer Element -->
    <div ref="observerRef" class="observer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import MoviePoster from '@/components/MoviePoster.vue'
import { fetchMoviesByCategory } from '@/services/api'
import { Movie } from '@/types/movie'
import { Logger } from '@/utils/logger'

export default defineComponent({
  name: 'InfiniteScrollView',
  components: { MoviePoster },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const movies = ref<Movie[]>([])
    const currentPage = ref(1)
    const loading = ref(false)
    const hasMorePages = ref(true)
    const observerRef = ref<HTMLElement | null>(null)

    const loadMovies = async () => {
      if (loading.value || !hasMorePages.value) return
      loading.value = true
      try {
        const fetchedMovies = await fetchMoviesByCategory(
          props.category,
          currentPage.value
        )
        if (fetchedMovies.length > 0) {
          movies.value = [...movies.value, ...fetchedMovies]
          currentPage.value++
        } else {
          hasMorePages.value = false
        }
      } catch (error) {
        Logger.error('Error fetching movies:', error)
      } finally {
        loading.value = false
      }
    }

    const createObserver = () => {
      if (!observerRef.value) return
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMovies()
        }
      })
      observer.observe(observerRef.value)

      // Clean up observer when component is unmounted
      onUnmounted(() => {
        observer.disconnect()
      })
    }

    onMounted(() => {
      loadMovies()
      createObserver()
    })

    return { movies, loading, observerRef }
  },
})
</script>

<style scoped>
.infinite-scroll-view {
  padding: 20px;
}
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.loading-indicator {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 20px;
}
.observer {
  height: 1px;
}
</style>
