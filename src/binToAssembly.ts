import { convert, bitsComplete, subBin, genRegisters } from './utils';
import { Reference, Format } from './InstructionCode';
import { registers, references } from './sets';

/**
 * @author João Eudes Lima<joaoeudes7@gmail.com>
 * 01/09/2019
 * @description Basead in Doc Green Sheet
 */

const BITS_PLATAFORM = 32;

/**
 * - Core Instruction Set References
 */
references;

/**
 * - Registers
 */
registers;

/**
 * - Instruction Read
 * [OPCODE][RS][RT][RD][SHAMT][FUNC]
 */
function learnFormatR(bin: string, reference: Reference) {
  const OPCODE = subBin(bin, 31, 26, BITS_PLATAFORM);
  const RS = subBin(bin, 25, 21, BITS_PLATAFORM)
  const RT = subBin(bin, 20, 16, BITS_PLATAFORM)
  const RD = subBin(bin, 15, 11, BITS_PLATAFORM)

  // Offset
  const SHAMT = subBin(bin, 10, 6, BITS_PLATAFORM)
  const FUNC = subBin(bin, 5, 0, BITS_PLATAFORM)

  console.log(`\n`)
  console.log(`OPCODE: ${OPCODE} {31, 26}`)
  console.log(`RS: ${RS} {25, 21}`)
  console.log(`RT: ${RT} {20, 16}`)
  console.log(`RD: ${RD} {15, 11}`)
  console.log(`SHAMT: ${SHAMT} {10, 6}`)
  console.log(`FUNC: ${FUNC} {5, 0}`)
  console.log(`\n`)

  // Convert Registers to Decimal and find in Array
  const lRS = registers[convert.bin2dec(RS)]
  const lRT = registers[convert.bin2dec(RT)]
  const lRD = registers[convert.bin2dec(RD)]

  const codeAssembly = `Instruction: ${reference!.name} ${lRD}, ${lRS}, ${lRT}`

  console.log(codeAssembly)
}

/**
 * [OPCODE][RS][RT][RD][SHAMT][FUNC]
 */
function learnFormatI(bin: string, instructionCode: Reference) {
  const OPCODE = subBin(bin, 31, 26, BITS_PLATAFORM)
  const RS = subBin(bin, 25, 21, BITS_PLATAFORM)
  const RT = subBin(bin, 20, 16, BITS_PLATAFORM)
  const IMMEDIATE = subBin(bin, 15, 0, BITS_PLATAFORM)

  console.log(`\n`)
  console.log(`OPCODE: ${OPCODE} {31, 26}`)
  console.log(`RS: ${RS} {25, 21}`)
  console.log(`RT: ${RT} {20, 16}`)
  console.log(`IMMEDIATE: ${IMMEDIATE} {15, 0}`)
  console.log(`\n`)

  // Convert Registers to Decimal and find in Array
  const lRS = registers[convert.bin2dec(RS)]
  const lRT = registers[convert.bin2dec(RT)]
  const lIMMEDIATE = convert.bin2dec(IMMEDIATE)

  const codeAssembly = `Instruction: ${instructionCode!.name} ${lRT}, ${lRS}, ${lIMMEDIATE}`

  console.log(codeAssembly)
}

/**
 * [OPCODE][ANDRESS]
 */
function learnFormatJ(bin: string, instructionCode: Reference) {
  const OPCODE = subBin(bin, 31, 26, BITS_PLATAFORM)
  const ADDRESS = subBin(bin, 25, 0, BITS_PLATAFORM)

  console.log(`\n`)
  console.log(`OPCODE: ${OPCODE} {31, 26}`)
  console.log(`ADDRESS: ${ADDRESS} {25, 0}`)
  console.log(`\n`)

  const lAddress = convert.bin2hex(ADDRESS)

  const codeAssembly = `Instruction: ${instructionCode!.name} ${lAddress}`

  console.log(codeAssembly)
}

/**
 * - Logic to identify Instruction
 */
function setFilter(reference: Reference, opcode: string, func: string) {
  const isOp = reference.opBin == opcode;
  const isFormatR = reference.format == Format.R;

  let result = isOp;

  if (isOp && isFormatR) {
    result = reference.funcBin == func
  }

  return result
}

export enum FormatCode {
  hex = 'hex',
  bin = 'bin'
}

function getTypeCode(code: string) {
  const isHex = RegExp('0[xX][0-9a-fA-F]+').test(code)

  return isHex ? FormatCode.hex : FormatCode.bin
}

function formatNotFound() {
  console.log('Format not founded!');
}

function typeCodeUndefined() {
  console.log('Type of Code is Undefined')
}

export function binToAssembly(code: string) {
  let _bin = code
  let _hex = code

  const actionCode = {
    'bin': () => _hex = convert.bin2hex(code),
    'hex': () => _bin = convert.hex2bin(code)
  }

  actionCode[getTypeCode(code)]()

  _bin = bitsComplete(_bin, BITS_PLATAFORM)

  console.log(`Hex: ${_hex}`)
  console.log(`Bin: ${_bin}`)
  console.log(`Size: ${_bin.length}`);

  const OPCODE = subBin(_bin, 31, 26, BITS_PLATAFORM);
  const FUNC = subBin(_bin, 5, 0, BITS_PLATAFORM)

  const SET = references.find(set => setFilter(set, OPCODE, FUNC))!;

  console.log(`FORMAT: ${SET.format}`)

  const actionFormat = {
    'R': learnFormatR,
    'I': learnFormatI,
    'J': learnFormatJ
  }

  actionFormat[SET.format](_bin, SET)
}
