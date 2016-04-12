"use strict";

import { IDefinition } from "./IDefinition";

export default class APIError implements IDefinition {

  private _name: string;
  private _status: number;
  private _code: number;
  private _subcode: number;
  private _message: string;
  private _fix: string;
  private _id: string;

  constructor(error: any) {
    this.parse(error);
  }


  get name(): string {
    return this._name;
  }

  get status(): number {
    return this._status;
  }

  get code(): number {
    return this._code;
  }

  get subcode(): number {
    return this._subcode;
  }

  get message(): string {
    return this._message;
  }

  get fix(): string {
    return this._fix;
  }

  get id(): string {
    return this._id;
  }

  public buildId(): void {
    this._id = `error-${this._name}`;
  }

  public getDeclaredSymbol(): string[] {
    return [this._id];
  }

  public getDependenceSymbol(): string[] {
    return [];
  }

  public print(): void {
    console.log(this._name + ": ");
    console.log(`Status: ${this._status}`);
    console.log(`Code: ${this._code}`);
    console.log(`SubCode: ${this._subcode}`);
    console.log(`Message: ${this._message}`);
    console.log(`Fix: ${this._fix}`);
  }

  private parse(error: any): void {
    let done: boolean = false;

    for (let e in error) {
      if (error.hasOwnProperty(e)) {

        if (done) {
          throw new Error("Invalid Error: " + error);
        }

        this._name = e;
        error = error[this._name];

        if (error.status === undefined || error.code === undefined || error.message === undefined) {
          throw new Error("Invalid Error: " + error);
        }

        this._status = parseInt(error.status, 10);
        this._code = parseInt(error.code, 10);
        this._message = error.message;
        this._fix = error.fix;

        if (error.subcode) {
          this._subcode = parseInt(error.subcode, 10);
        }

        done = true;
      }
    }
  }
}
