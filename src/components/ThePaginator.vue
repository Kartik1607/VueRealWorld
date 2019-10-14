<template>
  <div class="flex">
    <div
      v-for="pageNumber in totalCount"
      :key="pageNumber"
      :class="{selected : pageNumber === page}"
      @click="pageChange(pageNumber)"
    >{{pageNumber}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Article } from "../models";
import ArticleListItem from "./ArticleListitem.vue";
import { mapState } from "vuex";
import ArticleModule from "@/store/article.module";
import { getModule } from "vuex-module-decorators";

@Component
export default class ThePaginator extends Vue {
  public page: number = 1;

  @Prop({
    default: 1
  })
  public totalCount: number | undefined;

  @Emit()
  public pageChange(page: number) {
    this.page = page;
    return page;
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  div {
    cursor: pointer;
    padding: 10px;
    color: green;
    border: 1px solid #888;
    &.selected {
      color: white;
      background: green;
    }
  }
  div:hover {
    background: #eee;
    text-decoration: underline;
  }
}
</style>
