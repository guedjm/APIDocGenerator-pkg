"use strict";

import Changelog from "./model/changelog";
import YamlParser from "./utils/yamlParser";
import APIDefintion from "./model/apiDefinition";
import DefinitionValidator from "./utils/definitionValidator";

/**
 * APIDocGenerator
 */
export class APIDocGenerator {

  private _defintion: APIDefintion;
  private _changelog: Changelog;

  public load(definition: string, changelog: string, version: string): void {

    const def: any = YamlParser.parse(definition);

    DefinitionValidator.validate(def);


    this._changelog = new Changelog(changelog);
    this._defintion = new APIDefintion(def);

    this._defintion.print();
  }
}
