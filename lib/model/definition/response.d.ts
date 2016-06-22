import { IDefinition } from "./IDefinition";
import Symbol from "../../preprocessing/symbol";
export default class Response implements IDefinition {
    private _code;
    private _description;
    private _type;
    private _id;
    constructor(response: any);
    code: number;
    description: string;
    type: string;
    id: string;
    buildId(base: string): void;
    getDeclaredSymbol(): string[];
    getDependencySymbol(stack: string[]): Symbol[];
    formatText(): void;
    private parse(response);
}
