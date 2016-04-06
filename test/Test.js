"use strict";
const fs = require("fs");
const validator = require("is-my-json-valid");


describe("Testing oauth2-utils", function () {
  const validatorFile = JSON.parse(fs.readFileSync("./ressources/schemas/full.json"));
  const toValid = JSON.parse(fs.readFileSync("./ressources/models/model.json"))
  
  const validate = validator(validatorFile, { verbose: true, greedy: true});
  console.log(validate(toValid));
  console.log(validate.errors);
});