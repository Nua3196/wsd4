<!-- src/views/SearchView.vue -->
<template>
  <div class="search">
    <div class="search-bar">
      <h1>영화 검색</h1>
      <div class="filters">
        <!-- 필터링 옵션 -->
        <label>
          장르:
          <select v-model="selectedGenre" @change="resetMovies">
            <option value="">전체</option>
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
              {{ genre.name }}
            </option>
          </select>
        </label>
        <label>
          평점:
          <select v-model="selectedRating" @change="resetMovies">
            <option value="">전체</option>
            <option value="9">9점 이상</option>
            <option value="5">5점 이상</option>
            <option value="1">1점 이상</option>
          </select>
        </label>
        <label>
          언어:
          <select v-model="selectedLanguage" @change="resetMovies">
            <option value="">전체</option>
            <option value="ko">한국어</option>
            <option value="en">영어</option>
          </select>
        </label>
        <!-- 초기화 버튼 -->
        <button @click="resetFilters" class="reset-button">초기화</button>
      </div>
    </div>

    <!-- 영화 카드 목록 -->
    <div class="movies">
      <MoviePoster v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>

    <!-- 무한 스크롤 관찰자 -->
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { fetchMoviesByFilters, fetchGenres } from '@/services/api'
import MoviePoster from '@/components/MoviePoster.vue'

export default defineComponent({
  name: 'SearchView',
  components: { MoviePoster },
  setup() {
    const genres = ref<{ id: number; name: string }[]>([])
    const movies = ref<any[]>([])
    const page = ref<number>(1)
    const selectedGenre = ref<string>('')
    const selectedRating = ref<string>('')
    const selectedLanguage = ref<string>('')
    const observer = ref<HTMLElement | null>(null)

    // 장르 목록 로드
    const loadGenres = async () => {
      try {
        genres.value = await fetchGenres()
      } catch (error) {
        console.error('Error loading genres:', error)
      }
    }

    // 영화 목록 가져오기
    const fetchMovies = async () => {
      const newMovies = await fetchMoviesByFilters({
        with_genres: selectedGenre.value,
        'vote_average.gte': selectedRating.value
          ? parseInt(selectedRating.value)
          : undefined,

        with_original_language: selectedLanguage.value,
        page: page.value,
      })
      movies.value = [...movies.value, ...newMovies]
    }

    // 필터 초기화 및 새 데이터 로드
    const resetMovies = () => {
      movies.value = []
      page.value = 1
      fetchMovies()
    }

    // 필터링 조건 초기화
    const resetFilters = () => {
      selectedGenre.value = ''
      selectedRating.value = ''
      selectedLanguage.value = ''
      resetMovies() // 초기화 후 영화 다시 로드
    }

    // 무한 스크롤 관찰자 생성
    const createObserver = () => {
      if (!observer.value) return
      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          page.value += 1
          fetchMovies()
        }
      })
      io.observe(observer.value)
    }

    onMounted(() => {
      loadGenres()
      fetchMovies()
      createObserver()
    })

    return {
      genres,
      movies,
      selectedGenre,
      selectedRating,
      selectedLanguage,
      resetFilters,
      observer,
      fetchMovies,
      resetMovies,
    }
  },
})
</script>

<style scoped>
/* Search 페이지 전체 레이아웃 */
.search {
  padding: 20px;
  color: #fff;
  text-align: center;
}

.search-bar {
  display: block;
}

/* 필터링 섹션 */
.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center; /* 필터 옵션 정렬 */
  justify-content: center;
}

.filters label {
  font-size: 0.9rem;
  font-weight: bold;
  display: block;
  flex-direction: column; /* 텍스트 위, 드롭다운 아래 배치 */
}

.filters select {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #2b2b2b;
  color: #fff;
  font-size: 1rem;
  margin-top: 5px;
  cursor: pointer;
  height: 40px;
}

.filters select:hover {
  background-color: #444;
}

/* 초기화 버튼 스타일 */
.reset-button {
  height: 40px;
  font-size: 1rem;
  margin-top: 5px;
  padding: 10px 20px;
  background-color: #2b2b2b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-button:hover {
  background-color: #666;
}

/* 영화 목록 섹션 */
.movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

/* 포스터 카드 스타일 */
.movie-card {
  text-align: center;
  background-color: #222;
  border-radius: 10px;
  padding: 5px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.movie-card img {
  width: 100%;
  border-radius: 5px;
}

.movie-card h3 {
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
}

.movie-card p {
  font-size: 0.8rem;
  color: #ccc;
}

/* 반응형 레이아웃 */
@media (max-width: 768px) {
  .filters {
    flex-wrap: wrap;
    gap: 10px;
  }

  .filters label {
    width: 100%;
  }
}
</style>
