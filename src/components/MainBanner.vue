<template>
    <div
      class="main-banner"
      :style="{ backgroundImage: `url(${currentMovie.backdropPath})` }"
    >
      <div class="overlay">
        <div class="content">
          <h1 class="title">{{ currentMovie.title }}</h1>
          <p class="description">{{ currentMovie.overview }}</p>
          <p class="release-date">개봉일: {{ currentMovie.releaseDate }}</p>
          <button class="details-button">자세히 보기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import axios from "axios";
  
  export default defineComponent({
    name: "MainBanner",
    setup() {
      const currentMovie = ref({
        title: "",
        overview: "",
        releaseDate: "",
        backdropPath: "",
      });
  
      const fetchMovie = async () => {
        try {
          const response = await axios.get(
            "https://api.themoviedb.org/3/movie/now_playing",
            {
              params: {
                api_key: "YOUR_TMDB_API_KEY",
                language: "ko-KR",
                page: 1,
              },
            }
          );
          const movies = response.data.results;
          if (movies.length > 0) {
            const movie = movies[0];
            currentMovie.value = {
              title: movie.title,
              overview: movie.overview,
              releaseDate: movie.release_date,
              backdropPath: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
            };
          }
        } catch (error) {
          console.error("영화 데이터를 가져오는 중 오류 발생:", error);
        }
      };
  
      onMounted(() => {
        fetchMovie();
      });
  
      return {
        currentMovie,
      };
    },
  });
  </script>
  
  <style scoped>
  .main-banner {
    position: relative;
    width: 100%;
    height: 60vh;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .content {
    text-align: center;
    max-width: 80%;
  }
  
  .title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .description {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .release-date {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .details-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #fff;
    background-color: #cc0000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .details-button:hover {
    background-color: #ff0000;
  }
  </style>
  