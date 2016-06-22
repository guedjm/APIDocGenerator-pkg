import { IDefinition } from "./IDefinition";
import Symbol from "../../preprocessing/symbol";
export default class APIObject implements IDefinition {
    private _name;
    private _description;
    private _obj;
    private _id;
    constructor(object: any);
    name: string;
    description: string;
    obj: any;
    id: string;
    buildId(): void;
    getDeclaredSymbol(): string[];
    getDependencySymbol(stack: string[]): Symbol[];
    formatText(): void;
    getPrettyPrintedObj(): string;
    private replacer(match, pIndent, pKey, pVal, pEnd);
    private parse(object);
}
