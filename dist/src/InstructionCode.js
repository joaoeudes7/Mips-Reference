"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
var FormatInstruction;
(function (FormatInstruction) {
    FormatInstruction[FormatInstruction["R"] = 0] = "R";
    FormatInstruction[FormatInstruction["I"] = 1] = "I";
    FormatInstruction[FormatInstruction["J"] = 2] = "J";
})(FormatInstruction = exports.FormatInstruction || (exports.FormatInstruction = {}));
class InstructionCode {
    constructor(name, opcode, func, format) {
        this.name = name;
        this.opcode = opcode;
        this.func = func;
        this.format = format;
    }
    get funcBin() {
        const func = utils_1.convert.hex2bin(this.func);
        return utils_1.bitsComplete(func, 5);
    }
    get opBin() {
        const bin = utils_1.convert.hex2bin(this.opcode);
        return utils_1.bitsComplete(bin, 6);
    }
}
exports.InstructionCode = InstructionCode;
