<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    </div>
    <div class="card-footer">
      <a href class="comment-author">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
      </a>
      &nbsp;
      <a href class="comment-author">Jacob Schmidt</a>
      <span class="date-posted">Dec 29th</span>
    </div>
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

@Component({
  components: {},
  computed: mapState<any>({
    articles: state => state.Article.articles,
    totalCount: state => state.Article.totalCount
  })
})
export default class CommentListItem extends Vue {}
</script>
