import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios from "axios";
import { Comment } from "@/models";
@Module({
  name: "Comments"
})
export default class CommentModule extends VuexModule {
  public comments: Comment[] = [];
  public commentErrors: string[] = [];

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

  @Action
  public async postComment({ slug = "", body = "" }) {
    if (!slug || slug.length === 0) {
      return;
    }
    this.updateErrors({});
    axios
      .post<{ comment: Comment }>(
        `${process.env.VUE_APP_API_BASE}/articles/${slug}`,
        {
          comment: {
            body
          }
        },
        {
          headers: {
            Authorization: `Token ${this.context.rootGetters.token}`
          }
        }
      )
      .then(res => {
        this.setComments([...this.comments].splice(0, 0, res.data.comment));
      })
      .catch(({ response }) => {
        if (response && response.data.errors) {
          this.updateErrors(response.data.errors);
        }
      });
  }

  @Action
  public updateErrors(data: { [key: string]: string[] }) {
    const errors: string[] = [];
    Object.keys(data).forEach(key => {
      errors.push(...data[key].map(e => `${key} ${e}`));
    });
    this.commentErrors = errors;
  }
}
