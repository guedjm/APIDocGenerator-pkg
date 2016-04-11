"use strict";

export default class Response {

  private _code: number;
  private _description: string;
  private _type: string;

  constructor(response: any) {
    this.parse(response);
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
