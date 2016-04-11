"use strict";

import Changelog from "../model/changelog";
import ChangeDescription from "../model/changeDescription";

export default class VersionFileGenerator {

  public static generate(changelog: Changelog): string {
    let fileContent: any[] = [];

    changelog.changes.forEach(function(elem: ChangeDescription): void {
      fileContent.push({ version: elem.version, author: elem.author, date: elem.date, changes: elem.changes });
    });

    return JSON.stringify(fileContent, undefined, 2);
  }
}
