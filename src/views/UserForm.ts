import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:#set-age": this.onSetAgeClick,
      "click:#set-name": this.onSetNameClick,
      "click:#save-changes": this.onSaveClick,
    };
  }
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const newNameInput = this.parent.querySelector("#new-name");
    if (newNameInput instanceof HTMLInputElement) {
      if (newNameInput.value) {
        this.model.set({ name: newNameInput.value });
      } else {
        window.alert("please provide a new name!!");
      }
    } else {
      console.log(newNameInput);
      throw new Error("Element not found!!");
    }
  };

  onSaveClick = (): void => {
    console.log("clicked");
    this.model.save();
  };

  template(): string {
    return `
    <div> 
      <div>
        <input id="new-name" placeholder=${this.model.get("name")} />
        <button id="set-name">Update name</button>
      </div>
      <div>
        <button id="set-age">Set random age</button>
      </div>
      <div>
        <button id="save-changes">Save</button>
      </div>
    </div>
    `;
  }
}
