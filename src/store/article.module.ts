import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios from "axios";
import { Article } from "@/models";

@Module({
  name: "Article"
})
export default class ArticleModule extends VuexModule {
  public articles: Article[] = [
    {
      slug: "how-to-train-your-dragon",
      title: "How to train your dragon",
      description: "Ever wonder how?",
      body: "It takes a Jacobian",
      tagList: ["dragons", "training"],
      createdAt: new Date(),
      updatedAt: new Date(),
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "jake",
        bio: "I work at statefarm",
        image: "https://i.stack.imgur.com/xHWG8.jpg",
        following: false
      }
    }
  ];

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
