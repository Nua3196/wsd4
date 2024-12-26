export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string; // TMDB API에서 사용하는 필드명
  backdrop_path: string;
  genres: string[]; // 선택적으로 포함될 수 있는 필드
}
