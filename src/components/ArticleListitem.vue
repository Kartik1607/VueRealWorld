<template>
  <div class="article-preview" v-if="article">
    <div class="article-meta">
      <a>
        <img :src="article.author.image" />
      </a>
      <div class="info">
        <a class="author">{{article.author.name}}</a>
        <span class="date">{{article.createdAt | date}}</span>
      </div>
      <button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="{fav: article.favorited}"
        @click="favouriteArticle()"
      >
        <i class="ion-heart"></i>
        {{article.favoritesCount}}
      </button>
    </div>
    <router-link
      class="preview-link"
      :to="{name: 'ArticleView', params: {
      slug: article.slug
    }}"
    >
      <h1>{{article.title}}</h1>
      <p>{{article.description}}</p>
      <span>Read more...</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Article } from "@/models";
import { date } from "@/filters";
import ArticleModule from "@/store/article.module";
import { getModule } from "vuex-module-decorators";

@Component({
  filters: {
    date
  }
})
export default class ArticleListItem extends Vue {
  @Prop({ default: null }) public article: Article | undefined;
  private articleModule = getModule(ArticleModule, this.$store);
  public favouriteArticle() {
    if (this.article) {
      if (!this.article.favorited) {
        this.articleModule.favouriteArticle(this.article.slug).then(success => {
          if (success) {
            this.article!.favoritesCount++;
            this.article!.favorited = true;
          }
        });
      } else {
        this.articleModule
          .unfavouriteArticle(this.article.slug)
          .then(success => {
            if (success) {
              this.article!.favoritesCount--;
              this.article!.favorited = false;
            }
          });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fav {
  color: #fff;
  background-color: #5cb85c;
  border-color: #5cb85c;
}
</style>