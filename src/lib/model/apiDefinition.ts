"use strict";

import Tag from "./definition/tag";
import Paragraph from "./definition/paragraph";
import APIError from "./definition/apiError";
import APIObject from "./definition/apiObject";
import { IDefinition, buildRoute } from "./definition/IDefinition";

export default class APIDefintion {

  private _name: string;
  private _description: string;
  private _paragraphs: Paragraph[];
  private _tags: Tag[];
  private _routes: IDefinition[];
  private _errors: APIError[];
  private _objects: APIObject[];

  constructor(definition: any) {
    this._tags = [];
    this._routes = [];
    this._paragraphs = [];
    this._errors = [];
    this._objects = [];
    this.parse(definition);
  }

  public getDeclaredSymbols(): string[] {
    let symbols: string[] = [];

    this._paragraphs.forEach(function(elem: Paragraph): void {
      elem.buildId();
      symbols.push(...elem.getDeclaredSymbol());
    });

    this._routes.forEach(function(elem: IDefinition): void {
      elem.buildId();
      symbols.push(...elem.getDeclaredSymbol());
    });

    this._errors.forEach(function(elem: APIError): void {
      elem.buildId();
      symbols.push(...elem.getDeclaredSymbol());
    });

    this._objects.forEach(function(elem: APIObject): void {
      elem.buildId();
      symbols.push(...elem.getDeclaredSymbol());
    });

    return symbols;
  }

  public getDependenceSymbol(): string[] {
    let symbols: string[] = [];

    this._paragraphs.forEach(function(elem: Paragraph): void {
      symbols.push(...elem.getDependenceSymbol());
    });

    this._routes.forEach(function(elem: IDefinition): void {
      symbols.push(...elem.getDependenceSymbol());
    });

    this._errors.forEach(function(elem: APIError): void {
      symbols.push(...elem.getDependenceSymbol());
    });

    this._objects.forEach(function(elem: APIObject): void {
      symbols.push(...elem.getDependenceSymbol());
    });

    this._tags.forEach(function(elem: Tag): void {
      symbols.push(...elem.getDependenceSymbol());
    });

    return symbols;
  }

  public print(): void {
    console.log(this._name);
    console.log(this._description);

    console.log("");
    console.log("Paragraphs:");

    this._paragraphs.forEach(function(elem: Paragraph): void {
      elem.print(1);
    });

    console.log("");
    console.log("Tags:");
    this._tags.forEach(function(elem: Tag): void {
      elem.print();
    });


    console.log("");
    console.log("Routes:");
    this._routes.forEach(function(elem: IDefinition): void {
      elem.print(1);
    });

    console.log("");
    console.log("Errors:");
    this._errors.forEach(function(elem: APIError): void {
      elem.print();
    });

    console.log("");
    console.log("Objects:");
    this._objects.forEach(function(elem: APIObject): void {
      elem.print();
    });
  }

  private parse(definition: any): void {
    if (definition.api === undefined || definition.api.name === undefined
      || definition.api.description === undefined) {
      throw new Error("Invalid definition: Missing api information");
    }
    this._name = definition.api.name;
    this._description = definition.api.description;

    if (definition.api.paragraphs === undefined) {
      throw new Error("Invalid definition: Missing paragraphs definition");
    }
    definition.api.paragraphs.forEach(function(elem: any): void {
      this._paragraphs.push(new Paragraph(elem));
    }, this);


    if (definition.api.tags === undefined) {
      throw new Error("Invalid definition: Missing tag definition");
    }
    definition.api.tags.forEach(function(elem: any): void {
      this._tags.push(new Tag(elem));
    }, this);


    if (definition.api.routes === undefined) {
      throw new Error("Invalid definition: Missing route defintion");
    }
    definition.api.routes.forEach(function(elem: any): void {
      this._routes.push(buildRoute(elem));
    }, this);

    if (definition.api.errors !== undefined) {
      definition.api.errors.forEach(function(elem: any): void {
        this._errors.push(new APIError(elem));
      }, this);
    }

    if (definition.api.objects !== undefined) {
      definition.api.objects.forEach(function(elem: any): void {
        this._objects.push(new APIObject(elem));
      }, this);
    }
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get paragraphs(): Paragraph[] {
    return this._paragraphs;
  }

  get tags(): Tag[] {
    return this._tags;
  }

  get routes(): IDefinition[] {
    return this._routes;
  }

  get errors(): APIError[] {
    return this._errors;
  }
}
