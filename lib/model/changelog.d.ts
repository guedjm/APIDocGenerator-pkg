import ChangeDescription from "./changeDescription";
import { GeneratedFile } from "./generatedFile";
export default class Changelog {
    private _changes;
    constructor();
    parse(mdText: string): void;
    changes: ChangeDescription[];
    generateVersionFile(): GeneratedFile;
}
