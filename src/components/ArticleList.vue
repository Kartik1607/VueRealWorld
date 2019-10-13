<template>
  <div>
    <article-list-item v-for="(article,index) in articles" :key="index" :article="article"></article-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Article } from "../models";
import ArticleListItem from "./ArticleListitem.vue";

@Component({
  components: {
    ArticleListItem
  }
})
export default class ArticleList extends Vue {
  public articles: Article[] = [
    {
      slug: "how-to-train-your-dragon",
      title: "How to train your dragon",
      description: "Ever wonder how?",
      body: "It takes a Jacobian",
      tagList: ["dragons", "training"],
      createdAt: new Date(),
      updatedAt: new Date(),
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "jake",
        bio: "I work at statefarm",
        image: "https://i.stack.imgur.com/xHWG8.jpg",
        following: false
      }
    },
    {
      slug: "how-to-train-your-dragon-2",
      title: "How to train your dragon 2",
      description: "So toothless",
      body: "It a dragon",
      tagList: ["dragons", "training"],
      createdAt: new Date(),
      updatedAt: new Date(),
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "jake",
        bio: "I work at statefarm",
        image: "https://i.stack.imgur.com/xHWG8.jpg",
        following: false
      }
    }
  ];
}
</script>
