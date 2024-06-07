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

const test = 1234.76;
console.log(test.toExponential(), typeof test.toExponential());
console.log(test.toFixed(1), typeof test.toFixed());
console.log(test.toPrecision(1), typeof test.toPrecision());

console.log(String(100 + 23));

const posts = {
  id: 1,
  title: "Post Titel",
  body: "Post Body",
};

for (const post in posts) {
  console.log("in", post);
}

const test1: number[] = [1, 2, 3, 4, 5, 6];
for (const post of test1) {
  console.log("of", post);
}
