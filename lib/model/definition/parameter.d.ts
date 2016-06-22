import { IDefinition } from "./IDefinition";
import Symbol from "../../preprocessing/symbol";
export default class Parameter implements IDefinition {
    private _name;
    private _description;
    private _required;
    private _in;
    private _type;
    private _id;
    constructor(param: any);
    name: string;
    description: string;
    required: boolean;
    in: string;
    type: string;
    id: string;
    buildId(base: string): void;
    getDeclaredSymbol(): string[];
    getDependencySymbol(stack: string[]): Symbol[];
    formatText(): void;
    private parse(param);
}
