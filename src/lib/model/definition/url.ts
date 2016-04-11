"use strict";

import Method from "./method";
import { IRoute } from "./IRoute";

export default class Url implements IRoute {

  private _url: string;
  private _get: Method;
  private _post: Method;
  private _patch: Method;
  private _put: Method;
  private _delete: Method;
  private _availableMethod: string[] = ["get", "post", "patch", "put", "delete"];

  constructor(url: any) {
    this.parse(url);
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
                this._get = new Method(url[m]);
                break;

              case "post":
                this._post = new Method(url[m]);
                break;

              case "patch":
                this._patch = new Method(url[m]);
                break;

              case "put":
                this._put = new Method(url[m]);
                break;

              case "delete":
                this._delete = new Method(url[m]);
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
