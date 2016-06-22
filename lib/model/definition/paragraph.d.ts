import { IDefinition } from "./IDefinition";
import Symbol from "../../preprocessing/symbol";
export default class Paragraph implements IDefinition {
    private _title;
    private _text;
    private _sub;
    private _id;
    constructor(paragraph: any);
    title: string;
    text: string;
    sub: Paragraph[];
    id: string;
    buildId(base?: string): void;
    getDeclaredSymbol(): string[];
    getDependencySymbol(stack: string[]): Symbol[];
    formatText(): void;
    private parse(paragraph);
}
