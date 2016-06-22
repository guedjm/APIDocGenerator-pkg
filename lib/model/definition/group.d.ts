import Url from "./url";
import { IDefinition } from "./IDefinition";
import Symbol from "../../preprocessing/symbol";
export default class Group implements IDefinition {
    private _title;
    private _text;
    private _sub;
    private _url;
    private _id;
    constructor(group: any);
    id: string;
    buildId(base?: string): void;
    getDeclaredSymbol(): string[];
    getDependencySymbol(stack: string[]): Symbol[];
    formatText(): void;
    title: string;
    text: string;
    sub: Group[];
    url: Url[];
    private parse(group);
}
