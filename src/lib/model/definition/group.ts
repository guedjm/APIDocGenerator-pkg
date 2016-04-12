"use strict";

import Url from "./url";
import { IDefinition } from "./IDefinition";

export default class Group implements IDefinition {

  private _title: string;
  private _text: string;
  private _sub: Group[];
  private _url: Url[];
  private _id: string;

  constructor(group: any) {
    this._sub = [];
    this._url = [];
    this.parse(group);
  }

  get id(): string {
    return this._id;
  }

  public buildId(base?: string): void {
    if (base === undefined || base === "") {
      base = "routes";
    }
    this._id = `${base}-${this._title}`;

    this._sub.forEach(function(elem: Group): void {
      elem.buildId(this._id);
    }, this);

    this._url.forEach(function(elem: Url): void {
      elem.buildId(this._id);
    }, this);
  }

  public getDeclaredSymbol(): string[] {
    let symbols: string[] = [];

    this._sub.forEach(function(elem: Group): void {
      symbols.push(...elem.getDeclaredSymbol());
    });

    this._url.forEach(function(elem: Url): void {
      symbols.push(...elem.getDeclaredSymbol());
    });

    symbols.push(this._id);
    return symbols;
  }

  public getDependenceSymbol(): string[] {
    let symbols: string[] = [];

    this._sub.forEach(function(elem: Group): void {
      symbols.push(...elem.getDependenceSymbol());
    });

    this._url.forEach(function(elem: Url): void {
      symbols.push(...elem.getDependenceSymbol());
    });

    return symbols;
  }

  public print(align: number): void {
    let space: string = "";
    for (let i: number = 0; i < align; i++) {
      space += " ";
    }
    console.log(space + this._title);
    console.log(space + this._text);

    this._sub.forEach(function(elem: Group): void {
      elem.print(align + 1);
    });

    this._url.forEach(function(elem: Url): void {
      elem.print(align + 1);
    });
  }

  get title(): string {
    return this._title;
  }

  get text(): string {
    return this._text;
  }

  get sub(): Group[] {
    return this._sub;
  }

  get url(): Url[] {
    return this._url;
  }

  private parse(group: any): void {
    let done: boolean = false;

    for (let g in group) {
      if (group.hasOwnProperty(g)) {

        if (done) {
          throw new Error("Invalid route group: " + group);
        }

        this._title = g;
        group = group[this._title];

        if (group.text === undefined) {
          throw new Error("Invalid route group (Missing text): " + group);
        }

        this._text = group.text;

        if (group.sub !== undefined) {
          group.sub.forEach(function(elem: any): void {
            this._sub.push(new Group(elem));
          }, this);
        }

        if (group.url !== undefined) {
          group.url.forEach(function(elem: any): void {
            this._url.push(new Url(elem));
          }, this);
        }

        done = true;
      }
    }
  }

}
