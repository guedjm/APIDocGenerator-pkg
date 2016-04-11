"use strict";

const fs = require("fs");
const APIDocGenerator = require("../index").APIDocGenerator;


describe("Testing oauth2-utils", function () {
  
  const apiDocGenerator = new APIDocGenerator();
  const definition = fs.readFileSync("./ressources/model/model.yaml", { encoding: "utf8"});
  const changelog = fs.readFileSync("./CHANGELOG.md", { encoding: "utf8"});
  const pkg = JSON.parse(fs.readFileSync("./package.json", { encoding: "utf8"}));
  
  apiDocGenerator.load(definition, changelog, pkg.version);
  
  fs.writeFileSync("./.version.js", apiDocGenerator.versionFileStr);
  fs.writeFileSync("./index.html", apiDocGenerator.rootFileStr);
});