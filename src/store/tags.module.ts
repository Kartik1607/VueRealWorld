import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios from "axios";

@Module({
  name: "Tags"
})
export default class TagsModule extends VuexModule {
  public tags: string[] = [];

  @Action
  public async fetchTags() {
    axios
      .get<{ tags: string[] }>(`${process.env.VUE_APP_API_BASE}/tags`)
      .then(res => {
        if (res.status === 200) {
          this.setTags(res.data.tags);
        }
      });
  }

  @Mutation
  public setTags(tags: string[]) {
    this.tags = tags;
  }
}
