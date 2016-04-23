"use strict";

import { IDefinition } from "./IDefinition";

export default class Response implements IDefinition {

  private _code: number;
  private _description: string;
  private _type: string;
  private _id: string;

  constructor(response: any) {
    this.parse(response);
  }

  get code(): number {
    return this._code;
  }

  get description(): string {
    return this._description;
  }

  get type(): string {
    return this._type;
  }

  get id(): string {
    return this._id;
  }

  public buildId(base: string): void {
    this._id = `${base}-${this._code}`.toLowerCase();
  }

  public getDeclaredSymbol(): string[] {
    return [this._id];
  }

  public getDependenceSymbol(): string[] {
    const basicType: string[] = ["int", "string"];

    if (basicType.indexOf(this._type) === -1) {
      return [this._type];
    }
    return [];
  }

  public print(align: number): void {
    let space: string = "";
    for (let i: number = 0; i < align; i++) {
      space += " ";
    }

    console.log(space + this._code + ": ");
    console.log(space + this._description);
    console.log(space + "type: " + this._type);
  }

  private parse(response: any): void {
    let done: boolean = false;

    for (let r in response) {
      if (response.hasOwnProperty(r)) {
        if (done) {
          throw new Error("Invalid response: " + response);
        }

        this._code = parseInt(r, 10);
        response = response[this._code];

        if (response.description === undefined || response.type === undefined) {
          throw new Error("Invalid response: " + response);
        }

        this._description = response.description;
        this._type = response.type;

        done = true;
      }
    }
  }
}
