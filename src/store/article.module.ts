import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios from "axios";
import { Article } from "@/models";

@Module({
  name: "Article"
})
export default class ArticleModule extends VuexModule {
  public articles: Article[] = [];

  @Action
  public async fetchArticles({
    tag = "",
    author = "",
    favorited = "",
    limit = 20,
    offset = 0
  }) {
    axios
      .get<{ articles: Article[] }>(
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
          this.setArticles(res.data.articles);
        }
      });
  }

  @Mutation
  public setArticles(articles: Article[]) {
    this.articles = articles;
  }
}
