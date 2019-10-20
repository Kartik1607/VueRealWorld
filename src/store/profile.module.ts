import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios from "axios";
import { User, UserProfile } from "@/models";
import router from "@/router";

@Module({
  name: "UserProfile"
})
export default class Profile extends VuexModule {
  public errors: string[] = [];
  public profile: UserProfile | null = null;

  @Mutation
  public updateProfile(profile: UserProfile) {
    this.profile = profile;
  }

  @Action
  public async getProfile(username = "") {
    this.clearErrors();
    axios
      .get<{ profile: UserProfile }>(
        `${process.env.VUE_APP_API_BASE}/profiles/${username}`
      )
      .then(res => {
        if (res.status === 200) {
          this.updateProfile(res.data.profile);
        }
      })
      .catch(res => {
        const response = res.response;
        if (response && response.data.errors) {
          this.updateErrors(response.data.errors);
        }
      });
  }

  @Action
  public followUser(username = "") {
    this.clearErrors();
    return axios
      .post<{ profile: UserProfile }>(
        `${process.env.VUE_APP_API_BASE}/profiles/${username}/follow`
      )
      .then(res => {
        if (res.status === 200) {
          this.updateProfile(res.data.profile);
        }
      })
      .catch(res => {
        const response = res.response;
        if (response && response.data.errors) {
          this.updateErrors(response.data.errors);
        }
      });
  }

  @Action
  public unfollowUser(username = "") {
    this.clearErrors();
    return axios
      .delete<{ profile: UserProfile }>(
        `${process.env.VUE_APP_API_BASE}/profiles/${username}/follow`
      )
      .then(res => {
        if (res.status === 200) {
          this.updateProfile(res.data.profile);
        }
      })
      .catch(res => {
        const response = res.response;
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
    this.errors = errors;
  }

  @Mutation
  public clearErrors() {
    this.errors = [];
  }
}
