"use strict";

const fs = require("fs");
const APIDocGenerator = require("../index").APIDocGenerator;


describe("Testing oauth2-utils", function () {
  
  const apiDocGenerator = new APIDocGenerator();
  const definition = fs.readFileSync("./resources/model/tmp.yaml", { encoding: "utf8"});
  const changelog = fs.readFileSync("./CHANGELOG.md", { encoding: "utf8"});
  const pkg = JSON.parse(fs.readFileSync("./package.json", { encoding: "utf8"}));
  
  apiDocGenerator.load(definition, changelog);

  apiDocGenerator.preprocess();

  const result = apiDocGenerator.generate(pkg.version);

  result.forEach(function (elem) {
    console.log(elem.path);
  });
});