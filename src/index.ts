import { User } from "./models/User";

const user = new User({ id: 1, name: "Satoru GOJO", age: 23 });
user.on("change", () => {
  console.log("user changed");
});

user.on("save", () => {
  console.log(user);
});

user.fetch();
console.log(user);
user.save();
