import { GeneratedFile } from "./model/generatedFile";
export declare class APIDocGenerator {
    private _defStr;
    private _definition;
    private _changelog;
    private _generatedFile;
    load(definition: string, changelog: string): void;
    preprocess(): void;
    generate(version: string): GeneratedFile[];
    publicDir: string;
}
