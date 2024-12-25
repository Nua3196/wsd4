<template>
  <div class="infinite-scroll-view">
    <div class="movie-grid">
      <MoviePoster v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
    <div v-if="loading" class="loading-indicator">Loading...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import MoviePoster from '@/components/MoviePoster.vue'
import { fetchMoviesByCategory } from '@/services/api'
import { Movie } from '@/types/movie'

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
        console.error('Error fetching movies:', error)
      } finally {
        loading.value = false
      }
    }

    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      const windowHeight = window.innerHeight
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight

      if (scrollTop + windowHeight >= scrollHeight - 10) {
        loadMovies()
      }
    }

    onMounted(() => {
      loadMovies()
      window.addEventListener('scroll', handleScroll)
    })

    return { movies, loading }
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
</style>
