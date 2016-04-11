"use strict";

export default class Parameter {

  private _name: string;
  private _description: string;
  private _required: boolean;
  private _in: string;
  private _type: string;

  constructor(param: any) {
    this.parse(param);
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get required(): boolean {
    return this._required;
  }

  get in(): string {
    return this._in;
  }

  get type(): string {
    return this._type;
  }

  public print(align: number): void {
    let space: string = "";
    for (let i: number = 0; i < align; i++) {
      space += " ";
    }

    console.log(space + this._name);
    console.log(space + this._description);
    console.log(space + "required: " + this._required);
    console.log(space + "in: " + this._in);
    console.log(space + "type: " + this._type);
  }

  private parse(param: any): void {
    let done: boolean = false;

    for (let p in param) {
      if (param.hasOwnProperty(p)) {

        if (done) {
          throw new Error("Invalid parameter: " + param);
        }

        this._name = p;
        param = param[this._name];

        if (param.description === undefined || param.required === undefined
          || param.in === undefined || param.type === undefined) {
          throw new Error("Invalid parameter: " + param);
        }
        this._description = param.description;
        this._required = param.required;
        this._in = param.in;
        this._type = param.type;

        done = true;
      }
    }
  }
}