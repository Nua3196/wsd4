<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { fetchNowPlayingMovies } from "@/services/api";
import { Movie } from "@/types/movie";

export default defineComponent({
  name: "MainBanner",
  setup() {
    const currentMovie = ref<Movie | null>(null); // Movie 타입으로 지정

    const loadNowPlayingMovie = async () => {
      try {
        const movies = await fetchNowPlayingMovies(); // API 호출
        if (movies.length > 0) {
          currentMovie.value = movies[0]; // 첫 번째 영화 선택
        }
      } catch (error) {
        console.error("Error loading now playing movie:", error);
      }
    };

    onMounted(() => {
      loadNowPlayingMovie(); // 컴포넌트 마운트 시 API 호출
    });

    return {
      currentMovie,
    };
  },
});
</script>
