"use strict";

export default class Tag {

  private _name: string;
  private _link: string;

  constructor(tag: any) {
    this.parse(tag);
  }

  public print(): void {
    console.log(` - ${this._name} => ${this._link}`);
  }

  get name(): string {
    return this._name;
  }

  get link(): string {
    return this._link;
  }

  public getDependenceSymbol(): string[] {
    return [this._link];
  }

  private parse(tag: any): void {
    let done: boolean = false;

    for (let t in tag) {
      if (tag.hasOwnProperty(t)) {

        if (done) {
          throw new Error("Invalid tag: " + tag);
        }

        this._name = t;
        tag = tag[this._name];

        if (tag.link === undefined) {
          throw new Error("Invalid tag: " + tag);
        }
        this._link = tag.link;

        done = true;
      }
    }

  }
}
