"use strict";

import Changelog from "./model/changelog";
import YamlParser from "./utils/yamlParser";
import APIDefintion from "./model/apiDefinition";
import DefinitionValidator from "./utils/definitionValidator";
import VersionFileGenerator from "./utils/versionFileGenerator";
import RootFileGenerator from "./utils/rootFileGenerator";

/**
 * APIDocGenerator
 */
export class APIDocGenerator {

  private _defintion: APIDefintion;
  private _changelog: Changelog;
  private _versionFileStr: string;
  private _rootFileStr: string;

  public load(definition: string, changelog: string, version: string): void {

    const def: any = YamlParser.parse(definition);

    DefinitionValidator.validate(def);


    this._changelog = new Changelog(changelog);
    this._defintion = new APIDefintion(def);

    console.log(this._defintion.getDeclaredSymbols());

    console.log("");
    console.log(this._defintion.getDependenceSymbol());
    this.generate();
  }

  private generate(): void {

    this._versionFileStr = VersionFileGenerator.generate(this._changelog);
    this._rootFileStr = RootFileGenerator.generate(this._defintion, this._changelog);
  }

  get versionFileStr(): string {
    return this._versionFileStr;
  }

  get rootFileStr(): string {
    return this._rootFileStr;
  }
}
