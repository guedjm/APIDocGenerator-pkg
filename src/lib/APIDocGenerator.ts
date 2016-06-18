"use strict";

import Changelog from "./model/changelog";
import YamlParser from "./utils/yamlParser";
import APIDefinition from "./model/apiDefinition";
import DefinitionValidator from "./utils/definitionValidator";
import GeneratedFile from "./model/generatedFile";

/**
 * APIDocGenerator
 */
export class APIDocGenerator {

  private _definition: APIDefinition;
  private _changelog: Changelog;
  private _generatedFile: GeneratedFile[];

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

  public preprocess(): void {

    console.log("Pre-processing api definition ...");
    this._definition.preprocess();
    console.log("Done");
  }

  public generate(version: string): GeneratedFile[] {

    this._generatedFile = [];
    this._generatedFile.push(this._changelog.generateVersionFile());
    this._generatedFile.push(this._definition.generateRootFile(this._changelog));
    this._generatedFile.push(this._definition.generateDefinitionFile(this._changelog, version));


    return this._generatedFile;
  }

}
