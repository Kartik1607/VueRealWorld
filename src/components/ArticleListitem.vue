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
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
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
@Component({
  filters: {
    date
  }
})
export default class ArticleListItem extends Vue {
  @Prop({ default: null }) public article: Article | undefined;
}
</script>
