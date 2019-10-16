<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <error-list :errors="errors"></error-list>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags (comma separated)"
                  v-model="tags"
                />
              </fieldset>
              <button class="btn btn-lg btn-danger" type="button" v-if="isUserAuthor">Delete Article</button>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="publishArticle()"
              >{{isUserAuthor? 'Update' : 'Publish'}}</button>
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
import ErrorList from "@/components/ErrorList.vue";
@Component({
  components: {
    ErrorList
  },
  computed: {
    ...mapState<any>({
      user: state => state.Auth.user,
      article: state => state.Article.article,
      errors: state => state.Article.articleErrors
    })
  }
})
export default class ArticleCreate extends Vue {
  public user!: User;
  public article!: Partial<Article>;
  private articleModule: ArticleModule = getModule(ArticleModule, this.$store);

  public set tags(tagStr: string) {
    this.article.tagList = tagStr.split(",").map(x => x.trim());
  }
  public get tags(): string {
    if (this.article.tagList) {
      return this.article.tagList.join(",");
    }
    return "";
  }
  public get isUserAuthor(): boolean {
    if (this.article.author) {
      return this.user.username === this.article.author.username;
    }
    return false;
  }

  public created() {
    if (!this.user) {
      this.$router.replace("/login");
    }
    this.articleModule.updateErrors({});
    this.loadArticle(this.$route.params.slug);
  }

  public loadArticle(slug?: string) {
    if (slug) {
      this.articleModule.getArticleBySlug(slug);
    } else {
      this.articleModule.setArticle({
        title: "",
        description: "",
        body: "",
        tagList: []
      });
    }
  }

  public publishArticle() {
    this.articleModule.publishArticle({
      title: this.article.title || "",
      description: this.article.description || "",
      body: this.article.body || "",
      tagList: this.article.tagList || []
    });
  }
}
</script>
