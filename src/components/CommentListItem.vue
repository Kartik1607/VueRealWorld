<template>
  <div class="card" v-if="comment">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <a href class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </a>
      &nbsp;
      <a href class="comment-author">{{comment.author.username}}</a>
      <span class="date-posted">{{comment.createdAt | date}}</span>
      <button
        class="pull-right btn btn-danger btn-sm pull-right"
        v-if="user && user.username === comment.author.username"
        @click="deleteComment()"
      >Delete</button>
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
import CommentModule from "@/store/comment.module";
import { Comment } from "@/models";
@Component({
  filters: {
    date
  },
  computed: {
    ...mapState<any>({
      user: state => state.Auth.user
    })
  }
})
export default class CommentListItem extends Vue {
  @Prop({ default: null })
  public comment: Comment | undefined;

  @Prop({
    default: ""
  })
  public slug: string | undefined;

  private commentModule: CommentModule = getModule(CommentModule, this.$store);

  public deleteComment() {
    if (this.comment && this.slug) {
      this.commentModule.deleteComment({
        id: this.comment.id,
        slug: this.slug
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.pull-right {
  float: right;
}
</style>