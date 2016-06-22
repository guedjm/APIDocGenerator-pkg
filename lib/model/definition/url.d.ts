import Method from "./method";
import { IDefinition } from "./IDefinition";
import Symbol from "../../preprocessing/symbol";
export default class Url implements IDefinition {
    private _url;
    private _get;
    private _post;
    private _patch;
    private _put;
    private _delete;
    private _availableMethod;
    private _id;
    constructor(url: any);
    id: string;
    buildId(base?: string): void;
    getDeclaredSymbol(): string[];
    getDependencySymbol(stack: string[]): Symbol[];
    formatText(): void;
    url: string;
    get: Method;
    post: Method;
    patch: Method;
    put: Method;
    delete: Method;
    private parse(url);
}
