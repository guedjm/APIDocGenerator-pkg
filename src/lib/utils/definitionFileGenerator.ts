"use strict";

const html: any = require("html");
import * as jade from "jade";
import Changelog from "../model/changelog";
import APIDefinition from "../model/apiDefinition";

export default class DefinitionFileGenerator {

  public static generate(def: APIDefinition, changelog: Changelog, version: string): string {

    /*const apiSymbols: string[] = def.getDeclaredSymbols();
    const depSymbols: string[] = def.getDependencySymbol();

    if (!DefinitionFileGenerator.checkSymbolDependency(apiSymbols, depSymbols)) {
      throw new Error("Invalid symbols");
    }

    console.log(def.name);

    return html.prettyPrint(jade.renderFile("./ressources/view/index.jade", {
      version: version,
      api: def,
      changelog: changelog
    }));*/

    return "";
  }

  private static checkSymbolDependency(apiSymbol: string[], depSymbol: string[]): boolean {
    const tmp: string[] = [];

    // Check duplicate symbols
    apiSymbol.forEach(function(elem: string): void {
      if (tmp.indexOf(elem) !== -1) {
        throw new Error("Duplicate symbol: " + elem);
      }
      tmp.push(elem);
    });

    // Check dependency
    depSymbol.forEach(function(elem: string): void {
      if (apiSymbol.indexOf(elem) === -1) {
        throw new Error("Unresolved symbol: " + elem);
      }
    });

    return true;
  }
}
