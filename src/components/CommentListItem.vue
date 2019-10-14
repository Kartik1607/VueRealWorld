<template>
  <div class="card" v-if="comment">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <a href class="comment-author">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
      </a>
      &nbsp;
      <a href class="comment-author">{{comment.author.username}}</a>
      <span class="date-posted">{{comment.createdAt | date}}</span>
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
import { date } from "@/filters";
@Component({
  filters: {
    date
  }
})
export default class CommentListItem extends Vue {
  @Prop({ default: null })
  public comment: Comment | undefined;
}
</script>
