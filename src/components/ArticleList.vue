<template>
  <div>
    <article-list-item v-for="(article,index) in articles" :key="index" :article="article"></article-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Article } from "../models";
import ArticleListItem from "./ArticleListitem.vue";
import { mapState, mapGetters } from "vuex";
import ArticleModule from "@/store/article.module";
import { getModule } from "vuex-module-decorators";

@Component({
  components: {
    ArticleListItem
  },
  computed: mapState<any>({
    articles: state => state.ArticleModule.articles
  })
})
export default class ArticleList extends Vue {
  private articleModule = getModule(ArticleModule, this.$store);

  public created() {
    this.articleModule.fetchArticles({});
  }
}
</script>
