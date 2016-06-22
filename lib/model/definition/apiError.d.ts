import { IDefinition } from "./IDefinition";
import Symbol from "../../preprocessing/symbol";
export default class APIError implements IDefinition {
    private _name;
    private _status;
    private _code;
    private _subcode;
    private _message;
    private _fix;
    private _id;
    constructor(error: any);
    name: string;
    status: number;
    code: number;
    subcode: number;
    message: string;
    fix: string;
    id: string;
    buildId(): void;
    getDeclaredSymbol(): string[];
    getDependencySymbol(stack: string[]): Symbol[];
    formatText(): void;
    private parse(error);
}
