<template>
  <div>
    <error-list :errors="errors"></error-list>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="body"></textarea>
      </div>
      <div class="card-footer">
        <a class="comment-author">
          <img :src="user.image" class="comment-author-img" />
        </a>
        &nbsp;
        <a class="comment-author">{{user.username}}</a>
        <button class="btn btn-sm btn-primary" @click="postComment()">Post Comment</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import CommentModule from "@/store/comment.module";
import { getModule } from "vuex-module-decorators";
import ErrorList from "./ErrorList.vue";

@Component({
  components: { ErrorList },
  computed: mapState<any>({
    user: state => state.Auth.user,
    totalCount: state => state.Article.totalCount,
    errors: state => state.Comments.commentErrors
  })
})
export default class CommentAdd extends Vue {
  public body: string = "";

  @Prop({ default: "" })
  public slug!: string;

  private commentModule: CommentModule = getModule(CommentModule, this.$store);

  public postComment() {
    this.commentModule
      .postComment({
        slug: this.slug,
        body: this.body
      })
      .then(success => {
        if (success) {
          this.body = "";
        }
      });
  }
}
</script>
