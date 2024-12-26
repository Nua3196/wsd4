import axios from 'axios'
import { Movie } from '@/types/movie'
import store from '@/store' // Vuex 스토어를 가져옵니다.
import { Logger } from '@/utils/logger'

// Axios 클라이언트 설정
const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
  },
})

// TMDB API 키를 가져오는 유틸리티 함수
const getApiKey = (): string => {
  const apiKey = process.env.VUE_APP_TMDB_API_KEY // .env 파일에서 키 가져오기
  if (!apiKey) {
    throw new Error('API key is missing. Please log in.')
  }
  return apiKey
}

// 현재 상영 중인 영화 목록 가져오기
export const fetchNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<{ results: Movie[] }>(
      '/movie/now_playing',
      {
        params: {
          api_key: getApiKey(),
          language: 'ko-KR',
          page: 1,
        },
      }
    )
    return response.data.results
  } catch (error) {
    Logger.error('Error fetching now playing movies:', error)
    throw error
  }
}

// 특정 영화 세부 정보 가져오기
export const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
  try {
    const response = await apiClient.get<Movie>(`/movie/${movieId}`, {
      params: {
        api_key: getApiKey(),
        language: 'ko-KR',
      },
    })
    return response.data
  } catch (error) {
    Logger.error('Error fetching movie details:', error)
    throw error
  }
}

// 장르 목록 가져오기
export const fetchGenres = async (): Promise<
  { id: number; name: string }[]
> => {
  try {
    const response = await apiClient.get<{
      genres: { id: number; name: string }[]
    }>('/genre/movie/list', {
      params: {
        api_key: getApiKey(),
        language: 'ko-KR',
      },
    })
    return response.data.genres
  } catch (error) {
    Logger.error('Error fetching genres:', error)
    throw error
  }
}

// 필터링 조건에 맞는 영화 목록 가져오기
export const fetchMoviesByFilters = async (filters: {
  with_genres?: string
  'vote_average.gte'?: number
  with_original_language?: string
  page?: number
}): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<{ results: Movie[] }>(
      '/discover/movie',
      {
        params: {
          api_key: getApiKey(),
          language: 'ko-KR',
          ...filters,
        },
      }
    )
    return response.data.results.map(processMovieData)
  } catch (error) {
    Logger.error('Error fetching movies with filters:', error)
    throw error
  }
}

// 카테고리별 영화 가져오기
export const fetchMoviesByCategory = async (
  category: string,
  page = 1
): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<{ results: any[] }>(
      `/movie/${category}`,
      {
        params: {
          api_key: getApiKey(),
          language: 'ko-KR',
          page,
        },
      }
    )
    return response.data.results.map(processMovieData)
  } catch (error) {
    Logger.error(`Error fetching ${category} movies:`, error)
    return []
  }
}

// 유틸리티 함수: 영화 데이터 처리
const processMovieData = (movie: any): Movie => {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    release_date: movie.release_date,
    backdrop_path: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '',
    genres: movie.genre_ids || [],
  }
}
