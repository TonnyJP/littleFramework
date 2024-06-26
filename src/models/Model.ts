import { AxiosPromise, AxiosResponse } from "axios";

export type HasId = {
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
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on; // this way only works if the object we need isn't initialized in the body of the constructor (hier we need "event" to access on methode)

  trigger = this.events.trigger;

  get = this.attributes.get;

  set(update: T) {
    console.log("setter call", update);
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
