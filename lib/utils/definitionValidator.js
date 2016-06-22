"use strict";
const fs = require("fs");
const validator = require("is-my-json-valid");
class DefinitionValidator {
    static validate(defintion) {
        try {
            const validatorFile = JSON.parse(fs.readFileSync(__dirname + "/../../resources/schemas/full.json", { encoding: "utf8" }));
            const validateFunc = validator(validatorFile, { verbose: true, greedy: true });
            const result = validateFunc(defintion);
            if (!result) {
                throw new Error("Invalid API definition: " + JSON.stringify(validateFunc.errors, undefined, 2));
            }
        }
        catch (e) {
            throw e;
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DefinitionValidator;
