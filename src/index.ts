import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";

const rootElement = document.getElementById("root");
if (rootElement) {
  const user = User.buildUser({ name: "Modeste", age: 24 });
  const userEdit = new UserEdit(rootElement, user);
  userEdit.render();

  console.log(userEdit);
} else {
  throw new Error("Root Element not found");
}
