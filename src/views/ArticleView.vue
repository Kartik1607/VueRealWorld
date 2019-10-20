<template>
  <div class="article-page" v-if="article">
    <div class="banner">
      <div class="container">
        <h1>{{article.slug}}</h1>

        <div class="article-meta" v-if="article.author">
          <a href>
            <img :src="article.author.image" />
          </a>
          <div class="info">
            <a href class="author">{{article.author.username}}</a>
            <span class="date">{{article.createdAt}}</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{article.author.name}}
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post
            <span
              class="counter"
            >({{article.favoritesCount}})</span>
          </button>
          &nbsp;&nbsp;
          <router-link :to="'/articleCreate/' + article.slug">
            <button
              class="btn btn-sm btn-outline-primary"
              v-if="user.username === article.author.username"
            >Edit</button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>{{article.description}}</p>
          <h2 id="introducing-ionic">{{article.title}}</h2>
          <p>{{article.body}}</p>
        </div>
      </div>

      <hr />

      <!-- Move into a separate component -->
      <div class="article-actions">
        <div class="article-meta" v-if="article.author">
          <a href>
            <img :src="article.author.image" />
          </a>
          <div class="info">
            <a href class="author">{{article.author.username}}</a>
            <span class="date">{{article.createdAt}}</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{article.author.name}}
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post
            <span
              class="counter"
            >({{article.favoritesCount}})</span>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <comment-add :slug="article.slug"></comment-add>
          <comment-list :slug="article.slug"></comment-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Article } from "@/models";
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
      article: state => state.Article.article,
      user: state => state.Auth.user
    })
  }
})
export default class ArticleView extends Vue {
  private articleModule: ArticleModule = getModule(ArticleModule, this.$store);

  @Watch("$route.params.slug")
  public getArticle(slug: string) {
    this.articleModule.getArticleBySlug(slug);
  }

  public mounted() {
    this.getArticle(this.$route.params.slug);
  }
}
</script>
