"use strict";

import Tag from "./definition/tag";
import Paragraph from "./definition/paragraph";
import APIError from "./definition/apiError";
import APIObject from "./definition/apiObject";
import { IDefinition, buildRoute } from "./definition/IDefinition";
import Symbol from "../preprocessing/symbol";
import TextFormatter from "../preprocessing/textFromatter";

export default class APIDefintion {

  private _name: string;
  private _description: string;
  private _paragraphs: Paragraph[];
  private _tags: Tag[];
  private _routes: IDefinition[];
  private _errors: APIError[];
  private _objects: APIObject[];

  constructor() {
    this._tags = [];
    this._routes = [];
    this._paragraphs = [];
    this._errors = [];
    this._objects = [];
  }

  public parse(definition: any): void {
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

  public preprocess(): void {

		const declaredSymbol: string[] = this.getDeclaredSymbols();
		const dependencySymbol: Symbol[] = this.getDependencySymbol();

		dependencySymbol.forEach(function (elem: Symbol): void {
			if (declaredSymbol.indexOf(elem.name) == -1) {
				throw new Error(`Unresolved symbol: ${elem.name} from ${elem.stack}`);
			}
		});
		
		this._description = TextFormatter.format(this._description);

		this._paragraphs.forEach(function (elem: Paragraph): void {
			elem.formatText();
		});

		this._routes.forEach(function (elem: IDefinition): void {
			elem.formatText();
		});

		this._errors.forEach(function (elem: APIError): void {
			elem.formatText();
		});

		this._objects.forEach(function (elem: APIObject): void {
			elem.formatText();
		});
		
  }

  private getDeclaredSymbols(): string[] {
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

  private getDependencySymbol(): Symbol[] {
    let symbols: Symbol[] = [];

    this._paragraphs.forEach(function(elem: Paragraph): void {
      symbols.push(...elem.getDependencySymbol(["api", "paragraph"]));
    });

    this._routes.forEach(function(elem: IDefinition): void {
      symbols.push(...elem.getDependencySymbol(["api", "routes"]));
    });

    this._errors.forEach(function(elem: APIError): void {
      symbols.push(...elem.getDependencySymbol(["api", "errors"]));
    });

    this._objects.forEach(function(elem: APIObject): void {
      symbols.push(...elem.getDependencySymbol(["api", "objects"]));
    });

    this._tags.forEach(function(elem: Tag): void {
      symbols.push(...elem.getDependencySymbol(["api", "tags"]));
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

  get objects(): APIObject[] {
    return this._objects;
  }

  get errors(): APIError[] {
    return this._errors;
  }
}
