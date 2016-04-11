"use strict";

import Group from "./group";
import Url from "./url";

export interface IRoute {

  print(align: number): void;
}

export function buildRoute(route: any): IRoute {

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
