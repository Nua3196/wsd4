<template>
  <div class="popular">
    <!-- View 선택 버튼 -->
    <div class="view-toggle">
      <button :class="{ active: isTableView }" @click="setViewMode('table')">
        <i class="fa-solid fa-grip"></i>
      </button>
      <button
        :class="{ active: !isTableView }"
        @click="setViewMode('infinite')"
      >
        <i class="fa-solid fa-angles-down"></i>
      </button>
    </div>

    <!-- 테이블 뷰 -->
    <TableView v-if="isTableView" category="popular" />

    <!-- 무한 스크롤 뷰 -->
    <InfiniteScrollView v-else category="popular" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TableView from "@/components/TableView.vue";
import InfiniteScrollView from "@/components/InfiniteScroll.vue";

export default defineComponent({
  name: "PopularView",
  components: { TableView, InfiniteScrollView },
  setup() {
    const isTableView = ref(true);

    const setViewMode = (mode: "table" | "infinite") => {
      isTableView.value = mode === "table";
    };

    return { isTableView, setViewMode };
  },
});
</script>

<style scoped>
.popular {
  padding: 20px;
}

.view-toggle {
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
  padding-right: 30px;
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
</style>
