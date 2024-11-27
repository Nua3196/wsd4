<template>
  <div class="popular">
    <!-- View 선택 버튼 -->
    <div class="view-toggle">
      <button :class="{ active: isTableView }" @click="setViewMode('table')">
        Table View
      </button>
      <button
        :class="{ active: !isTableView }"
        @click="setViewMode('infinite')"
      >
        Infinite Scroll
      </button>
    </div>

    <!-- 테이블 뷰 -->
    <div v-if="isTableView" class="table-view">
      <table>
        <thead>
          <tr>
            <th>포스터</th>
            <th>제목</th>
            <th>개봉일</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id">
            <td><img :src="movie.backdrop_path" :alt="movie.title" /></td>
            <td>{{ movie.title }}</td>
            <td>{{ movie.release_date }}</td>
            <td>{{ movie.overview }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 무한 스크롤 뷰 -->
    <InfiniteScrollView v-else category="popular" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InfiniteScrollView from "@/components/InfiniteScroll.vue";

export default defineComponent({
  name: "PopularView",
  components: { InfiniteScrollView },
  setup() {
    const isTableView = ref(true); // 현재 View 모드

    const setViewMode = (mode: "table" | "infinite") => {
      isTableView.value = mode === "table";
    };

    return {
      isTableView,
      setViewMode,
    };
  },
});
</script>

<style scoped>
.popular {
  padding: 20px;
}

.view-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.view-toggle button {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
  transition: all 0.3s;
}

.view-toggle button.active {
  background-color: #333;
  color: #fff;
  border-color: #333;
}

.table-view table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table-view th,
.table-view td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}
</style>
