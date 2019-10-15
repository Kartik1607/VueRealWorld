<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" />
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" />
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button">Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Article, User } from "@/models";
import ArticleModule from "@/store/article.module";
import { getModule } from "vuex-module-decorators";
import { mapState } from "vuex";
import CommentList from "@/components/CommentList.vue";
import CommentAdd from "@/components/CommentAdd.vue";

@Component({
  components: {
    CommentList,
    CommentAdd
  },
  computed: {
    ...mapState<any>({
      user: state => state.Auth.user,
      article: state => state.Article.article
    })
  }
})
export default class ArticleCreate extends Vue {
  public user!: User;
  public created() {
    if (!this.user) {
      this.$router.replace("/login");
    }
  }
}
</script>
