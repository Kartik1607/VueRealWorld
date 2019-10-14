import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios from "axios";
import { Article } from "@/models";

@Module({
  name: "Article"
})
export default class ArticleModule extends VuexModule {
  public articles: Article[] = [];
  public article: Article | null = null;
  public totalCount = 0;

  @Action
  public async fetchArticles({
    tag = "",
    author = "",
    favorited = "",
    limit = 20,
    offset = 0
  }) {
    axios
      .get<{ articles: Article[]; articlesCount: number }>(
        `${process.env.VUE_APP_API_BASE}/articles`,
        {
          params: {
            tag,
            author,
            favorited,
            limit,
            offset
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          this.setArticles({
            articles: res.data.articles,
            total: Math.ceil(res.data.articlesCount / limit)
          });
        }
      });
  }

  @Action
  public getArticleBySlug(slug: string) {
    axios
      .get<{ article: Article }>(
        `${process.env.VUE_APP_API_BASE}/articles/${slug}`
      )
      .then(res => {
        if (res.status === 200) {
          this.setArticle(res.data.article);
        }
      })
      .catch(error => {
        this.setArticle(null);
      });
  }

  @Mutation
  public setArticle(article: Article | null) {
    this.article = article;
  }

  @Mutation
  public setArticles({
    articles = [],
    total = 0
  }: {
    articles: Article[];
    total: number;
  }) {
    this.articles = articles;
    this.totalCount = total;
  }
}
