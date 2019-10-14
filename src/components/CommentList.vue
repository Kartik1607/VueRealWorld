<template>
  <div>
    <comment-list-item v-for="item in 10" :key="item"></comment-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Article } from "../models";
import ArticleListItem from "./ArticleListitem.vue";
import { mapState } from "vuex";
import ArticleModule from "@/store/article.module";
import { getModule } from "vuex-module-decorators";
import ThePaginator from "./ThePaginator.vue";
import CommentListItem from "./CommentListItem.vue";

@Component({
  components: {
    CommentListItem
  },
  computed: mapState<any>({
    articles: state => state.Article.articles,
    totalCount: state => state.Article.totalCount
  })
})
export default class CommentList extends Vue {}
</script>
