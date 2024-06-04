import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Model } from "./Model";
import { Collection } from "./Collection";

export type UserProps = {
  name?: string;
  age?: number;
  id?: number;
};

const rootURL: string = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps) {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync(rootURL)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      rootURL,
      (json: UserProps): User => User.buildUser(json)
    );
  }
  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
