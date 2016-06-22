export default class ChangeDescription {
    private _version;
    private _changes;
    private _author;
    private _date;
    constructor(version: string, changes: string[], author: string, date: string);
    version: string;
    changes: string[];
    author: string;
    date: string;
}
