"use strict";

import Changelog from "./model/changelog";
import YamlParser from "./utils/yamlParser";
import APIDefinition from "./model/apiDefinition";
import DefinitionValidator from "./utils/definitionValidator";
import VersionFileGenerator from "./utils/versionFileGenerator";
import RootFileGenerator from "./utils/rootFileGenerator";
import DefinitionFileGenerator from "./utils/definitionFileGenerator";

/**
 * APIDocGenerator
 */
export class APIDocGenerator {

  private _definition: APIDefinition;
  private _changelog: Changelog;
  private _versionFileStr: string;
  private _rootFileStr: string;
  private _indexFileStr: string;

  public load(definition: string, changelog: string, version: string): void {

    const def: any = YamlParser.parse(definition);

    DefinitionValidator.validate(def);


    console.log("Parsing changelog ...");
    this._changelog = new Changelog();
    this._changelog.parse(changelog);
    console.log("Done");
    
    console.log("Parsing api definition ...");
    this._definition = new APIDefinition();
    this._definition.parse(def);
    console.log("Done");
  }

  public preprocess() {

    console.log("Pre-processing api definition ...");
    this._definition.preprocess();
    console.log("Done");
  }

  public generate(version: string): void {

    this._versionFileStr = VersionFileGenerator.generate(this._changelog);
    this._rootFileStr = RootFileGenerator.generate(this._definition, this._changelog);
    this._indexFileStr = DefinitionFileGenerator.generate(this._definition, this._changelog, version);
  }

  get versionFileStr(): string {
    return this._versionFileStr;
  }

  get rootFileStr(): string {
    return this._rootFileStr;
  }

  get definitionFileStr(): string {
    return this._indexFileStr;
  }
}
