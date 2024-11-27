import axios from "axios";
import { Movie } from "@/types/movie";

// Axios 클라이언트 설정
const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: "YOUR_TMDB_API_KEY",
  },
});

// 현재 상영 중인 영화 목록 가져오기
export const fetchNowPlayingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get<{ results: Movie[] }>("/movie/now_playing", {
      params: { language: "ko-KR", page: 1 },
    });
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
