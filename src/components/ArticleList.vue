<template>
  <div>
    <article-list-item v-for="(article,index) in articles" :key="index" :article="article"></article-list-item>
    <the-paginator :totalCount="totalCount" @page-change="fetchArticles"></the-paginator>
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
  components: {
    ArticleListItem,
    ThePaginator
  },
  computed: mapState<any>({
    articles: state => state.Article.articles,
    totalCount: state => state.Article.totalCount
  })
})
export default class ArticleList extends Vue {
  @Prop({
    default: ""
  })
  public author!: string;

  @Prop({
    default: ""
  })
  public tag!: string;

  private articleModule = getModule(ArticleModule, this.$store);
  private readonly limit = 20;

  public created() {
    this.fetchArticles();
  }

  public fetchArticles(page = 1) {
    this.articleModule.fetchArticles({
      offset: (page - 1) * this.limit,
      author: this.author || "",
      tag: this.tag || ""
    });
  }
}
</script>
