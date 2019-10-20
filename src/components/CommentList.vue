<template>
  <div>
    <comment-list-item
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :slug="slug"
    ></comment-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Article } from "../models";
import ArticleListItem from "./ArticleListitem.vue";
import { mapState } from "vuex";
import CommentModule from "@/store/comment.module";
import { getModule } from "vuex-module-decorators";
import ThePaginator from "./ThePaginator.vue";
import CommentListItem from "./CommentListItem.vue";

@Component({
  components: {
    CommentListItem
  },
  computed: mapState<any>({
    comments: state => state.Comments.comments
  })
})
export default class CommentList extends Vue {
  @Prop({
    default: ""
  })
  public slug: string | undefined;

  private commentModule: CommentModule = getModule(CommentModule, this.$store);

  @Watch("slug")
  public onSlugChange(slug: string) {
    if (slug && slug.length > 0) {
      this.commentModule.fetchComments(slug);
    }
  }

  public created() {
    this.onSlugChange(this.slug ? this.slug : "");
  }
}
</script>
