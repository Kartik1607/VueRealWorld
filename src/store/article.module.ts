import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios from "axios";
import { Article } from "@/models";
import router from "@/router";

@Module({
  name: "Article"
})
export default class ArticleModule extends VuexModule {
  public articles: Article[] = [];
  public article?: Partial<Article> = {};
  public totalCount = 0;
  public articleErrors: string[] = [];

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
    this.setArticle(undefined);
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
        this.setArticle(undefined);
      });
  }

  @Action
  public publishArticle({
    title = "",
    description = "",
    body = "",
    tagList = []
  }: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }) {
    this.updateErrors({});
    axios
      .post<{ article: Article }>(
        `${process.env.VUE_APP_API_BASE}/articles`,
        {
          article: {
            title,
            description,
            body,
            tagList
          }
        },
        {
          headers: {
            Authorization: `Token ${this.context.rootGetters.token}`
          }
        }
      )
      .then(res => {
        router.push(`/articles/${res.data.article.slug}`);
      })
      .catch(({ response }) => {
        if (response && response.data.errors) {
          this.updateErrors(response.data.errors);
        }
      });
  }

  @Action
  public async deleteArticle(slug = "") {
    this.updateErrors({});
    axios
      .delete(`${process.env.VUE_APP_API_BASE}/articles/${slug}`, {
        headers: {
          Authorization: `Token ${this.context.rootGetters.token}`
        }
      })
      .then(res => {
        router.replace(`/profile`);
      })
      .catch(({ response }) => {
        if (response && response.data.errors) {
          this.updateErrors(response.data.errors);
        }
      });
  }

  @Mutation
  public updateErrors(data: { [key: string]: string[] }) {
    const errors: string[] = [];
    Object.keys(data).forEach(key => {
      errors.push(...data[key].map(e => `${key} ${e}`));
    });
    this.articleErrors = errors;
  }

  @Mutation
  public setArticle(article: Partial<Article> | undefined) {
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
