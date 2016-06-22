import Symbol from "../../preprocessing/symbol";
export interface IDefinition {
    id: string;
    buildId(base?: string): void;
    getDeclaredSymbol(): string[];
    getDependencySymbol(stack: string[]): Symbol[];
    formatText(): void;
}
export declare function buildRoute(route: any): IDefinition;
