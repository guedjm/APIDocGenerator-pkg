"use strict";

import Parameter from "./parameter";
import Response from "./response";
import { IDefinition } from "./IDefinition";

export default class Method implements IDefinition {

  private _meth: string;
  private _summary: string;
  private _description: string;
  private _parameters: Parameter[];
  private _responses: Response[];
  private _errors: string[];
  private _id: string;

  constructor(meth: string, method: any) {
    this._meth = meth;
    this._parameters = [];
    this._responses = [];
    this._errors = [];
    this.parse(method);
  }

  get summary(): string {
    return this._summary;
  }

  get description(): string {
    return this._description;
  }

  get meth(): string {
    return this._meth;
  }

  get parameters(): Parameter[] {
    return this._parameters;
  }

  get responses(): Response[] {
    return this._responses;
  }

  get errors(): string[] {
    return this._errors;
  }

  get id(): string {
    return this._id;
  }

  public buildId(base: string): void {
    this._id = `${base}-${this._meth}`.toLowerCase();

    this._parameters.forEach(function(elem: Parameter): void {
      elem.buildId(this._id);
    }, this);

    this._responses.forEach(function(elem: Response): void {
      elem.buildId(this._id);
    }, this);
  }

  public getDeclaredSymbol(): string[] {
    let symbols: string[] = [];

    this._parameters.forEach(function(elem: Parameter): void {
      symbols.push(...elem.getDeclaredSymbol());
    });

    this._responses.forEach(function(elem: Response): void {
      symbols.push(...elem.getDeclaredSymbol());
    });

    symbols.push(this._id);
    return symbols;
  };

  public getDependenceSymbol(): string[] {
    let symbols: string[] = [];

    this._parameters.forEach(function(elem: Parameter): void {
      symbols.push(...elem.getDependenceSymbol());
    });

    this._responses.forEach(function(elem: Response): void {
      symbols.push(...elem.getDependenceSymbol());
    });

    symbols.push(...this._errors);

    return symbols;
  };

  public print(align: number): void {
    let space: string = "";
    for (let i: number = 0; i < align; i++) {
      space += " ";
    }

    console.log(space + this._summary);
    console.log(space + this._description);
    console.log(space + "Parameters:");
    this._parameters.forEach(function(elem: Parameter): void {
      elem.print(align + 1);
    });
    console.log(space + "Responses:");
    this._responses.forEach(function(elem: Response): void {
      elem.print(align + 1);
    });
    console.log(space + "Errors:");
    this._errors.forEach(function(elem: string): void {
      console.log(space + " - " + elem);
    });
  }

  private parse(method: any): void {
    if (method.summary === undefined) {
      throw new Error("Invalid method (Missing summary): " + method);
    }

    this._summary = method.summary;
    this._description = method.description;

    if (method.params !== undefined) {
      method.params.forEach(function(elem: any): void {
        this._parameters.push(new Parameter(elem));
      }, this);
    }

    if (method.responses !== undefined) {
      method.responses.forEach(function(elem: any): void {
        this._responses.push(new Response(elem));
      }, this);
    }

    if (method.errors !== undefined) {
      method.errors.forEach(function(elem: string): void {
        this._errors.push(elem);
      }, this);
    }
  }

};
