import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios from "axios";
import { Comment } from "@/models";
@Module({
  name: "Comments"
})
export default class CommentModule extends VuexModule {
  public comments: Comment[] = [];

  @Action
  public async fetchComments(slug: string) {
    axios
      .get<{ comments: Comment[] }>(
        `${process.env.VUE_APP_API_BASE}/articles/${slug}/comments`
      )
      .then(res => {
        if (res.status === 200) {
          this.setComments(res.data.comments);
        }
      });
  }

  @Mutation
  public setComments(comments: Comment[]) {
    this.comments = comments;
  }
}
