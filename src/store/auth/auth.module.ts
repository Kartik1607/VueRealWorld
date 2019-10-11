import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import axios from "axios";
import { User } from "./user";
import router from "@/router";

@Module({
  name: "Auth"
})
export default class Auth extends VuexModule {
  public errors: string[] = [];
  public user: User | null = null;

  @Action
  public async register({ name = "", email = "", password = "" }) {
    this.clearErrors();
    axios
      .post<{ user: User }>(`${process.env.VUE_APP_API_BASE}/users`, {
        user: {
          username: name,
          email,
          password
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.updateUser(res.data.user);
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
  public updateUser(user: User) {
    this.user = user;
    router.replace("/");
  }

  @Action
  public async login({ email = "", password = "" }) {
    this.clearErrors();
    axios
      .post<{ user: User }>(`${process.env.VUE_APP_API_BASE}/users/login`, {
        user: {
          email,
          password
        }
      })
      .then(res => {
        if (res.status === 200) {
          this.updateUser(res.data.user);
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
  public logout() {
    this.user = null;
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
