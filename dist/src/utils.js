"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utils to Convert
 */
const convert = {
    bin2dec: (s) => Number(parseInt(s, 2).toString(10)),
    bin2hex: (s) => parseInt(s, 2).toString(16),
    dec2bin: (s) => parseInt(s, 10).toString(2),
    dec2hex: (s) => parseInt(s, 10).toString(16),
    hex2bin: (s) => parseInt(s, 16).toString(2),
    hex2dec: (s) => Number(parseInt(s, 16).toString(10))
};
exports.convert = convert;
/**
 * Complete bits if need
 */
const bitsComplete = (value, num) => {
    const len = value.length;
    const qtdRepeat = Math.max(num - len, 0);
    const complete = "0".repeat(qtdRepeat);
    return `${complete}${value}`;
};
exports.bitsComplete = bitsComplete;
/**
 * Generate Family of Registers
 */
const genRegisters = (_var, start, end) => {
    const values = [];
    for (let index = start; index < (end + 1); index++) {
        values.push(`${_var}${index}`);
    }
    return values;
};
exports.genRegisters = genRegisters;
/**
 * Get position of binary by bits
 */
const posInBin = (pos, bits) => {
    return (bits - 1) - pos;
};
exports.posInBin = posInBin;
/**
 * Tool to split binary
 */
const subBin = (value, start, end, bits) => {
    return value.substring(posInBin(start, bits), posInBin(end, bits) + 1);
};
exports.subBin = subBin;
