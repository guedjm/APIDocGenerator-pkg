import Symbol from "../../preprocessing/symbol";
export default class Tag {
    private _id;
    private _name;
    private _link;
    constructor(tag: any);
    buildId(): void;
    id: string;
    name: string;
    link: string;
    getDependencySymbol(stack: string[]): Symbol[];
    getDeclaredSymbol(): string[];
    private parse(tag);
}
