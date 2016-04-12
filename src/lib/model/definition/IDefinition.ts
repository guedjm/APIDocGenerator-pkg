"use strict";

import Url from "./url";
import Group from "./group";

export interface IDefinition {

  id: string;

  print(align?: number): void;

  buildId(base?: string): void;
  getDeclaredSymbol(): string[];
  getDependenceSymbol(): string[];

}

export function buildRoute(route: any): IDefinition {

  for (let r in route) {
    if (r.startsWith("/")) {
      return new Url(route);
    }
    else {
      return new Group(route);
    }
  }

  throw new Error("Invalid route: " + route);
}
