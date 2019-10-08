import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
  name: "Auth"
})
export default class Auth extends VuexModule {
  @Action
  public async register({ name = "", email = "", password = "" }) {
    alert(name);
  }

  @Action
  public async login({ email = "", password = "" }) {
    alert(email);
  }
}
