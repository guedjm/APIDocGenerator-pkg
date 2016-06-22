import Parameter from "./parameter";
import Response from "./response";
import { IDefinition } from "./IDefinition";
import Symbol from "../../preprocessing/symbol";
export default class Method implements IDefinition {
    private _meth;
    private _summary;
    private _description;
    private _parameters;
    private _responses;
    private _tags;
    private _errors;
    private _id;
    constructor(meth: string, method: any);
    summary: string;
    description: string;
    meth: string;
    parameters: Parameter[];
    responses: Response[];
    errors: string[];
    tags: string[];
    id: string;
    buildId(base: string): void;
    getDeclaredSymbol(): string[];
    getDependencySymbol(stack: string[]): Symbol[];
    formatText(): void;
    private parse(method);
}
