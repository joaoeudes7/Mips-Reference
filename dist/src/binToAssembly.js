"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const InstructionCode_1 = require("./InstructionCode");
/**
 * @author João Eudes Lima<joaoeudes7@gmail.com>
 * 01/09/2019
 * @description Basead in Doc Green Sheet
 */
/**
 * - Core Instruction Set
 */
const mapInstructions = [
    new InstructionCode_1.InstructionCode('add', '0', '20', InstructionCode_1.FormatInstruction.R),
    new InstructionCode_1.InstructionCode('addi', '8', '0', InstructionCode_1.FormatInstruction.I),
    new InstructionCode_1.InstructionCode('addiu', '9', '0', InstructionCode_1.FormatInstruction.I),
    new InstructionCode_1.InstructionCode('addu', '0', '21', InstructionCode_1.FormatInstruction.R),
    new InstructionCode_1.InstructionCode('and', '0', '24', InstructionCode_1.FormatInstruction.R),
    new InstructionCode_1.InstructionCode('andi', 'c', '0', InstructionCode_1.FormatInstruction.I),
    new InstructionCode_1.InstructionCode('beq', '4', '0', InstructionCode_1.FormatInstruction.I),
    new InstructionCode_1.InstructionCode('bne', '5', '0', InstructionCode_1.FormatInstruction.I),
    new InstructionCode_1.InstructionCode('j', '2', '0', InstructionCode_1.FormatInstruction.J),
    new InstructionCode_1.InstructionCode('jal', '3', '0', InstructionCode_1.FormatInstruction.J),
    new InstructionCode_1.InstructionCode('jr', '0', '8', InstructionCode_1.FormatInstruction.R),
    new InstructionCode_1.InstructionCode('lbu', '24', '0', InstructionCode_1.FormatInstruction.I),
    new InstructionCode_1.InstructionCode('lhu', '25', '0', InstructionCode_1.FormatInstruction.I),
    new InstructionCode_1.InstructionCode('ll', '30', '0', InstructionCode_1.FormatInstruction.I),
    new InstructionCode_1.InstructionCode('lui', 'f', '0', InstructionCode_1.FormatInstruction.I),
    new InstructionCode_1.InstructionCode('lw', '23', '0', InstructionCode_1.FormatInstruction.I),
];
/**
 * - Registers
 */
const mapRegisters = [
    '$zero',
    '$at',
    ...utils_1.genRegisters('$v', 0, 1),
    ...utils_1.genRegisters('$a', 0, 3),
    ...utils_1.genRegisters('$t', 0, 7),
    ...utils_1.genRegisters('$s', 0, 7),
    ...utils_1.genRegisters('$t', 8, 9),
    ...utils_1.genRegisters('$k', 0, 1),
    '$gp',
    '$sp',
    '$fp',
    '$ra'
];
/**
 * - Instruction Read
 */
var Format;
(function (Format) {
    Format[Format["hex"] = 0] = "hex";
    Format[Format["bin"] = 1] = "bin";
})(Format = exports.Format || (exports.Format = {}));
/**
 * [OPCODE][RS][RT][RD][SHAMT][FUNC]
 */
function learnFormatR(bin, bits, instructionCode) {
    const OPCODE = utils_1.subBin(bin, 31, 26, bits);
    const RS = utils_1.subBin(bin, 25, 21, bits);
    const RT = utils_1.subBin(bin, 20, 16, bits);
    const RD = utils_1.subBin(bin, 15, 11, bits);
    // Offset
    const SHAMT = utils_1.subBin(bin, 10, 6, bits);
    const FUNC = utils_1.subBin(bin, 5, 0, bits);
    console.log(`\n`);
    console.log(`OPCODE: ${OPCODE} {31, 26}`);
    console.log(`RS: ${RS} {25, 21}`);
    console.log(`RT: ${RT} {20, 16}`);
    console.log(`RD: ${RD} {15, 11}`);
    console.log(`SHAMT: ${SHAMT} {10, 6}`);
    console.log(`FUNC: ${FUNC} {5, 0}`);
    console.log(`\n`);
    // Convert Registers to Decimal and find in Array
    const lRS = mapRegisters[utils_1.convert.bin2dec(RS)];
    const lRT = mapRegisters[utils_1.convert.bin2dec(RT)];
    const lRD = mapRegisters[utils_1.convert.bin2dec(RD)];
    const codeAssembly = `Instruction: ${instructionCode.name} ${lRD}, ${lRS}, ${lRT}`;
    console.log(codeAssembly);
}
/**
 * [OPCODE][RS][RT][RD][SHAMT][FUNC]
 */
function learnFormatI(bin, bits, instructionCode) {
    const OPCODE = utils_1.subBin(bin, 31, 26, bits);
    const RS = utils_1.subBin(bin, 25, 21, bits);
    const RT = utils_1.subBin(bin, 20, 16, bits);
    const IMMEDIATE = utils_1.subBin(bin, 15, 0, bits);
    console.log(`\n`);
    console.log(`OPCODE: ${OPCODE} {31, 26}`);
    console.log(`RS: ${RS} {25, 21}`);
    console.log(`RT: ${RT} {20, 16}`);
    console.log(`IMMEDIATE: ${IMMEDIATE} {5, 0}`);
    console.log(`\n`);
    // Convert Registers to Decimal and find in Array
    const lRS = mapRegisters[utils_1.convert.bin2dec(RS)];
    const lRT = mapRegisters[utils_1.convert.bin2dec(RT)];
    const lIMMEDIATE = utils_1.convert.bin2dec(IMMEDIATE);
    const codeAssembly = `Instruction: ${instructionCode.name} ${lRT}, ${lRS}, ${lIMMEDIATE}`;
    console.log(codeAssembly);
}
/**
 * [OPCODE][ANDRESS]
 */
function learnFormatJ(bin, bits, instructionCode) {
    const OPCODE = utils_1.subBin(bin, 31, 26, bits);
    const ADDRESS = utils_1.subBin(bin, 25, 0, bits);
    console.log(`\n`);
    console.log(`OPCODE: ${OPCODE} {31, 26}`);
    console.log(`ADDRESS: ${ADDRESS} {25, 0}`);
    console.log(`\n`);
    const lAddress = utils_1.convert.bin2hex(ADDRESS);
    const codeAssembly = `Instruction: ${instructionCode.name} ${lAddress}`;
    console.log(codeAssembly);
}
/**
 * - Logic to identify Instruction
 */
const getTypeInstruction = (i, opcode, func) => {
    const isOp = i.opBin == opcode;
    const isFormatR = i.format == InstructionCode_1.FormatInstruction.R;
    let result = isOp;
    if (isOp && isFormatR) {
        result = i.funcBin == func;
    }
    return result;
};
exports.binToAssembly = (code, format, bits) => {
    let _bin = code;
    let _hex = code;
    if (format === Format.hex) {
        _bin = utils_1.convert.hex2bin(code);
    }
    else {
        _hex = utils_1.convert.bin2hex(code);
    }
    _bin = utils_1.bitsComplete(_bin, bits);
    console.log(`Hex: ${_hex}`);
    console.log(`Bin: ${_bin}`);
    console.log(`Size: ${_bin.length}`);
    const OPCODE = utils_1.subBin(_bin, 31, 26, bits);
    const FUNC = utils_1.subBin(_bin, 5, 0, bits);
    const INSTRUCTION_TYPE = mapInstructions.find(i => {
        return getTypeInstruction(i, OPCODE, FUNC);
    });
    console.log(`FORMAT: ${INSTRUCTION_TYPE.format}`);
    switch (INSTRUCTION_TYPE.format) {
        case InstructionCode_1.FormatInstruction.R:
            learnFormatR(_bin, bits, INSTRUCTION_TYPE);
            break;
        case InstructionCode_1.FormatInstruction.I:
            learnFormatI(_bin, bits, INSTRUCTION_TYPE);
            break;
        case InstructionCode_1.FormatInstruction.J:
            learnFormatJ(_bin, bits, INSTRUCTION_TYPE);
            break;
    }
};
