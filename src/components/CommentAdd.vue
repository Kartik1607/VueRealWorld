<template>
  <form class="card comment-form">
    <div class="card-block">
      <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
    </div>
    <div class="card-footer">
      <a class="comment-author">
        <img :src="user.image" class="comment-author-img" />
      </a>
      &nbsp;
      <a class="comment-author">{{user.username}}</a>
      <button class="btn btn-sm btn-primary">Post Comment</button>
    </div>
  </form>
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
    user: state => state.Auth.user,
    totalCount: state => state.Article.totalCount
  })
})
export default class CommentAdd extends Vue {}
</script>
