"use strict";

import Method from "./method";
import { IDefinition } from "./IDefinition";

export default class Url implements IDefinition {

  private _url: string;
  private _get: Method;
  private _post: Method;
  private _patch: Method;
  private _put: Method;
  private _delete: Method;
  private _availableMethod: string[] = ["get", "post", "patch", "put", "delete"];
  private _id: string;

  constructor(url: any) {
    this.parse(url);
  }

  get id(): string {
    return this._id;
  }

  public buildId(base?: string): void {
    if (base === undefined || base === "") {
      base = "routes";
    }
    this._id = `${base}${this.url.replace("/", "-")}`;

    if (this._get !== undefined) {
      this._get.buildId(this._id);
    }

    if (this._post !== undefined) {
      this._post.buildId(this._id);
    }

    if (this._patch !== undefined) {
      this._patch.buildId(this._id);
    }

    if (this._put !== undefined) {
      this._put.buildId(this._id);
    }

    if (this._delete !== undefined) {
      this._delete.buildId(this._id);
    }

  }

  public getDeclaredSymbol(): string[] {
    let symbols: string[] = [];

    if (this._get !== undefined) {
      symbols.push(...this._get.getDeclaredSymbol());
    }

    if (this._post !== undefined) {
      symbols.push(...this._post.getDeclaredSymbol());
    }

    if (this._patch !== undefined) {
      symbols.push(...this._patch.getDeclaredSymbol());
    }

    if (this._put !== undefined) {
      symbols.push(...this._put.getDeclaredSymbol());
    }

    if (this._delete !== undefined) {
      symbols.push(...this._delete.getDeclaredSymbol());
    }

    symbols.push(this._id);
    return symbols;
  }

  public getDependenceSymbol(): string[] {
    let symbols: string[] = [];

    if (this._get !== undefined) {
      symbols.push(...this._get.getDependenceSymbol());
    }

    if (this._post !== undefined) {
      symbols.push(...this._post.getDependenceSymbol());
    }

    if (this._patch !== undefined) {
      symbols.push(...this._patch.getDependenceSymbol());
    }

    if (this._put !== undefined) {
      symbols.push(...this._put.getDependenceSymbol());
    }

    if (this._delete !== undefined) {
      symbols.push(...this._delete.getDependenceSymbol());
    }

    return symbols;
  }

  public print(align: number): void {
    let space: string = "";
    for (let i: number = 0; i < align; i++) {
      space += " ";
    }
    console.log(space + this._url);

    if (this._get !== undefined) {
      console.log(space + "get:");
      this._get.print(align + 1);
    }

    if (this._post !== undefined) {
      console.log(space + "post:");
      this._post.print(align + 1);
    }

    if (this._patch !== undefined) {
      console.log(space + "patch:");
      this._patch.print(align + 1);
    }

    if (this._put !== undefined) {
      console.log(space + "put:");
      this._put.print(align + 1);
    }

    if (this._delete !== undefined) {
      console.log(space + "delete:");
      this._delete.print(align + 1);
    }
  }

  get url(): string {
    return this._url;
  }

  get get(): Method {
    return this._get;
  }

  get post(): Method {
    return this._post;
  }

  get patch(): Method {
    return this._patch;
  }

  get put(): Method {
    return this._put;
  }

  get delete(): Method {
    return this._delete;
  }

  private parse(url: any): void {
    let done: boolean = false;

    for (let u in url) {
      if (url.hasOwnProperty(u)) {
        if (done) {
          throw new Error("Invalid Url: " + url);
        }

        this._url = u;
        url = url[this._url];

        for (let m in url) {
          if (url.hasOwnProperty(m)) {

            if (this._availableMethod.indexOf(m) === -1) {
              throw new Error("Invalid method name: " + m);
            }

            switch (m) {
              case "get":
                this._get = new Method("get", url[m]);
                break;

              case "post":
                this._post = new Method("post", url[m]);
                break;

              case "patch":
                this._patch = new Method("patch", url[m]);
                break;

              case "put":
                this._put = new Method("put", url[m]);
                break;

              case "delete":
                this._delete = new Method("delete", url[m]);
                break;

              default:
                throw new Error("Invalid method: " + m);
            }
          }
        }

        done = true;
      }
    }
  }

}
