"use strict";

const html: any = require("html");
import * as jade from "jade";
import Changelog from "../model/changelog";
import APIDefinition from "../model/apiDefinition";

export default class RootFileGenerator {

  public static generate(apiDefinition: APIDefinition, changelog: Changelog): string {

    return html.prettyPrint(jade.renderFile("./ressources/view/root.jade", {
      name: apiDefinition.name,
      description: apiDefinition.description,
      versions: changelog.changes
    }));
  }

}
