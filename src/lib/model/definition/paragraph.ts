"use strict";

export default class Paragraph {

  private _title: string;
  private _text: string;
  private _sub: Paragraph[];

  constructor(paragraph: any) {
    this._sub = [];
    this.parse(paragraph);
  }

  get title(): string {
    return this._title;
  }

  get text(): string {
    return this._text;
  }

  get sub(): Paragraph[] {
    return this._sub;
  }

  public print(align: number): void {

    let space: string = "";
    for (let i: number = 0; i < align; i++) {
      space += " ";
    }
    console.log(space + this._title);
    console.log(space + this._text);

    this._sub.forEach(function(elem: Paragraph): void {
      elem.print(align + 1);
    });
  }

  private parse(paragraph: any): void {
    let done: boolean = false;

    for (let p in paragraph) {
      if (paragraph.hasOwnProperty(p)) {
        if (done) {
          throw new Error("Invalid paragraph: " + JSON.stringify(paragraph));
        }
        this._title = p;
        paragraph = paragraph[this._title];

        if (paragraph.text === undefined) {
          throw new Error("Invalid paragraph: " + JSON.stringify(paragraph));
        }

        this._text = paragraph.text;

        if (paragraph.sub !== undefined) {
          paragraph.sub.forEach(function(elem: any): void {
            this._sub.push(new Paragraph(elem));
          }, this);
        }

        done = true;
      }
    }
  }
}