import { AxiosPromise, AxiosResponse } from "axios";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { UserProps } from "./User";

const rootURL: string = "http://localhost:3000/users";
type HasId = {
  id?: number;
};
interface ModelAttributes<T extends HasId> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}
interface Sync<T extends HasId> {
  fetch(id: number): AxiosPromise;
  save(update: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export class Model<T extends HasId> {
  /* public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootURL);
  public attributes: Attributes<UserProps>; */

  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {
    /* this.attributes = new Attributes<UserProps>(data); */
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: T) {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.get("id");
    if (typeof id != "number") {
      throw new Error("Cannot fetch without Id");
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger("save");
      })
      .catch((error: Error): void => {
        this.trigger("error");
      });
  }
}
