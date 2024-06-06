import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserList } from "./views/UserList";

const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on("change", () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    new UserList(rootElement, users).render();
  }
});
users.fetch();
