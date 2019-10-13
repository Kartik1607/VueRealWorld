<template>
  <div class="article-preview" v-if="article">
    <div class="article-meta">
      <a href="profile.html">
        <img :src="article.author.image" />
      </a>
      <div class="info">
        <a class="author">{{article.author.name}}</a>
        <span class="date">January 20th</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i>
        {{article.favoritesCount}}
      </button>
    </div>
    <a href class="preview-link">
      <h1>{{article.title}}</h1>
      <p>{{article.description}}</p>
      <span>Read more...</span>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Article } from "@/models";

@Component
export default class ArticleListItem extends Vue {
  @Prop({ default: null }) public article: Article | undefined;
}
</script>
