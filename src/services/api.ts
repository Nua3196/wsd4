import axios from "axios";
import { Movie } from "@/types/movie";

// Axios 클라이언트 설정
const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: "93d34e3b710d13328bf66490b7a38cfe",
  },
});

// 현재 상영 중인 영화 목록 가져오기
export const fetchNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<{ results: Movie[] }>(
      "/movie/now_playing",
      {
        params: { language: "ko-KR", page: 1 },
      }
    );
    return response.data.results; // 영화 리스트 반환
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw error;
  }
};

// 특정 영화 세부 정보 가져오기
export const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
  try {
    const response = await apiClient.get<Movie>(`/movie/${movieId}`, {
      params: { language: "ko-KR" },
    });
    return response.data; // 영화 세부 정보 반환
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// 수정: 영화 데이터를 처리하는 유틸리티 함수 추가
const processMovieData = (movie: any): Movie => {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    release_date: movie.release_date,
    backdrop_path: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` // 상대 경로를 완전한 URL로 변경
      : "", // 포스터 경로가 없을 경우 빈 문자열
    genres: movie.genre_ids || [], // 장르 ID 배열
  };
};

// 장르 목록 가져오기
export const fetchGenres = async (): Promise<
  { id: number; name: string }[]
> => {
  try {
    const response = await apiClient.get<{
      genres: { id: number; name: string }[];
    }>("/genre/movie/list", {
      params: { language: "ko-KR" },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

// 추가: 필터링 조건에 맞는 영화 목록 가져오기
export const fetchMoviesByFilters = async (filters: {
  with_genres?: string;
  "vote_average.gte"?: number;
  with_original_language?: string;
  page?: number;
}): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<{ results: Movie[] }>(
      "/discover/movie",
      {
        params: {
          language: "ko-KR",
          ...filters, // 필터링 조건 추가
        },
      }
    );
    return response.data.results.map(processMovieData);
  } catch (error) {
    console.error("Error fetching movies with filters:", error);
    throw error;
  }
};

export const fetchMoviesByCategory = async (
  category: string,
  page: number = 1 // 페이지 매개변수 추가, 기본값 1
): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<{ results: any[] }>(
      `/movie/${category}`,
      {
        params: {
          language: "ko-KR",
          page, // 페이지 번호를 API 요청에 포함
        },
      }
    );
    return response.data.results.map(
      (movie): Movie => ({
        id: movie.id,
        title: movie.title,
        backdrop_path: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
        overview: movie.overview,
        release_date: movie.release_date,
        genres: movie.genre_ids || [], // 장르 ID 배열을 직접 처리하거나 변환 가능
      })
    );
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
};
