"use strict";

export default class APIObject {

  private _name: string;
  private _description: string;
  private _obj: any;

  constructor(object: any) {
    this.parse(object);
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get obj(): any {
    return this._obj;
  }

  public print(): void {

    console.log("- " + this._name);
    console.log(this._description);
    console.log(JSON.stringify(this._obj, undefined, 2));
  }

  private parse(object: any): void {
    let done: boolean = false;

    for (let o in object) {
      if (object.hasOwnProperty(o)) {
        if (done) {
          throw new Error("Invalid object: " + object);
        }

        this._name = o;
        object = object[this._name];

        if (object.description === undefined || object.obj === undefined) {
          throw new Error("Invalid object: " + object);
        }
        this._description = object.description;
        this._obj = object.obj;
      }
    }
  }

}
