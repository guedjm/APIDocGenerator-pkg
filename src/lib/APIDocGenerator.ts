"use strict";

import Changelog from "./model/changelog";
import YamlParser from "./utils/yamlParser";
import DefinitionValidator from "./utils/definitionValidator";

/**
 * APIDocGenerator
 */
export class APIDocGenerator {

  private _defintion: any;
  private _changelog: Changelog;

  public load(definition: string, changelog: string, version: string): void {

    this._defintion = YamlParser.parse(definition);

    DefinitionValidator.validate(this._defintion);
    this._changelog = new Changelog(changelog);
    console.log(this._changelog);
  }
}
