import { convert, bitsComplete, subBin, genRegisters } from './utils';
import { InstructionCode, FormatInstruction } from './InstructionCode';

/**
 * @author João Eudes Lima<joaoeudes7@gmail.com>
 * 01/09/2019
 * @description Basead in Doc Green Sheet
 */

/**
 * - Core Instruction Set
 */
const mapInstructions = [
  new InstructionCode('add', '0', '20', FormatInstruction.R),
  new InstructionCode('addi', '8', '0', FormatInstruction.I),
  new InstructionCode('addiu', '9', '0', FormatInstruction.I),
  new InstructionCode('addu', '0', '21', FormatInstruction.R),
  new InstructionCode('and', '0', '24', FormatInstruction.R),
  new InstructionCode('andi', 'c', '0', FormatInstruction.I),
  new InstructionCode('beq', '4', '0', FormatInstruction.I),
  new InstructionCode('bne', '5', '0', FormatInstruction.I),
  new InstructionCode('j', '2', '0', FormatInstruction.J),
  new InstructionCode('jal', '3', '0', FormatInstruction.J),
  new InstructionCode('jr', '0', '8', FormatInstruction.R),
  new InstructionCode('lbu', '24', '0', FormatInstruction.I),
  new InstructionCode('lhu', '25', '0', FormatInstruction.I),
  new InstructionCode('ll', '30', '0', FormatInstruction.I),
  new InstructionCode('lui', 'f', '0', FormatInstruction.I),
  new InstructionCode('lw', '23', '0', FormatInstruction.I),
  new InstructionCode('nor', '0', '27', FormatInstruction.I),
  new InstructionCode('or', '0', '25', FormatInstruction.I),
  new InstructionCode('ori', 'd', '0', FormatInstruction.I),
  new InstructionCode('slt', '0', '2a', FormatInstruction.I),
  new InstructionCode('slti', 'a', '0', FormatInstruction.I),
  new InstructionCode('sltiu', 'b', '0', FormatInstruction.I),
  new InstructionCode('sltu', '0', '2b', FormatInstruction.I),
  new InstructionCode('sll', '0', '00', FormatInstruction.I),
  new InstructionCode('srl', '0', '02', FormatInstruction.I),
  new InstructionCode('sb', '28', '0', FormatInstruction.I),
  new InstructionCode('sc', '38', '0', FormatInstruction.I),
  new InstructionCode('sh', '29', '0', FormatInstruction.I),
  new InstructionCode('sw', '2b', '0', FormatInstruction.I),
  new InstructionCode('sub', '0', '22', FormatInstruction.I),
  new InstructionCode('subu', '0', '23', FormatInstruction.I)
]

/**
 * - Registers
 */
const mapRegisters = [
  '$zero',
  '$at',
  ...genRegisters('$v', 0, 1),
  ...genRegisters('$a', 0, 3),
  ...genRegisters('$t', 0, 7),
  ...genRegisters('$s', 0, 7),
  ...genRegisters('$t', 8, 9),
  ...genRegisters('$k', 0, 1),
  '$gp',
  '$sp',
  '$fp',
  '$ra'
]

/**
 * - Instruction Read
 */
export enum Format {
  hex,
  bin
}


/**
 * [OPCODE][RS][RT][RD][SHAMT][FUNC]
 */
function learnFormatR(bin: string, bits: number, instructionCode: InstructionCode) {
  const OPCODE = subBin(bin, 31, 26, bits);
  const RS = subBin(bin, 25, 21, bits)
  const RT = subBin(bin, 20, 16, bits)
  const RD = subBin(bin, 15, 11, bits)

  // Offset
  const SHAMT = subBin(bin, 10, 6, bits)
  const FUNC = subBin(bin, 5, 0, bits)

  console.log(`\n`)
  console.log(`OPCODE: ${OPCODE} {31, 26}`)
  console.log(`RS: ${RS} {25, 21}`)
  console.log(`RT: ${RT} {20, 16}`)
  console.log(`RD: ${RD} {15, 11}`)
  console.log(`SHAMT: ${SHAMT} {10, 6}`)
  console.log(`FUNC: ${FUNC} {5, 0}`)
  console.log(`\n`)

  // Convert Registers to Decimal and find in Array
  const lRS = mapRegisters[convert.bin2dec(RS)]
  const lRT = mapRegisters[convert.bin2dec(RT)]
  const lRD = mapRegisters[convert.bin2dec(RD)]

  const codeAssembly = `Instruction: ${instructionCode!.name} ${lRD}, ${lRS}, ${lRT}`

  console.log(codeAssembly)
}

/**
 * [OPCODE][RS][RT][RD][SHAMT][FUNC]
 */
function learnFormatI(bin: string, bits: number, instructionCode: InstructionCode) {
  const OPCODE = subBin(bin, 31, 26, bits)
  const RS = subBin(bin, 25, 21, bits)
  const RT = subBin(bin, 20, 16, bits)
  const IMMEDIATE = subBin(bin, 15, 0, bits)

  console.log(`\n`)
  console.log(`OPCODE: ${OPCODE} {31, 26}`)
  console.log(`RS: ${RS} {25, 21}`)
  console.log(`RT: ${RT} {20, 16}`)
  console.log(`IMMEDIATE: ${IMMEDIATE} {15, 0}`)
  console.log(`\n`)

  // Convert Registers to Decimal and find in Array
  const lRS = mapRegisters[convert.bin2dec(RS)]
  const lRT = mapRegisters[convert.bin2dec(RT)]
  const lIMMEDIATE = convert.bin2dec(IMMEDIATE)

  const codeAssembly = `Instruction: ${instructionCode!.name} ${lRT}, ${lRS}, ${lIMMEDIATE}`

  console.log(codeAssembly)
}

/**
 * [OPCODE][ANDRESS]
 */
function learnFormatJ(bin: string, bits: number, instructionCode: InstructionCode) {
  const OPCODE = subBin(bin, 31, 26, bits)
  const ADDRESS = subBin(bin, 25, 0, bits)

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
const getTypeInstruction = (i: InstructionCode, opcode: string, func: string): boolean => {
  const isOp = i.opBin == opcode;
  const isFormatR = i.format == FormatInstruction.R;

  let result = isOp;

  if (isOp && isFormatR) {
    result = i.funcBin == func
  }

  return result
}

function formatNotFound() {
  console.log('Format not founded!');
}


export const binToAssembly = (code: string, format: Format, bits: number) => {
  let _bin = code
  let _hex = code

  if (format === Format.hex) {
    _bin = convert.hex2bin(code)
  } else {
    _hex = convert.bin2hex(code)
  }

  _bin = bitsComplete(_bin, bits)

  console.log(`Hex: ${_hex}`)
  console.log(`Bin: ${_bin}`)
  console.log(`Size: ${_bin.length}`);

  const OPCODE = subBin(_bin, 31, 26, bits);
  const FUNC = subBin(_bin, 5, 0, bits)

  const INSTRUCTION_TYPE = mapInstructions.find(i => {
    return getTypeInstruction(i, OPCODE, FUNC)
  })!;

  console.log(`FORMAT: ${INSTRUCTION_TYPE.format}`)

  switch (INSTRUCTION_TYPE.format) {
    case FormatInstruction.R:
      learnFormatR(_bin, bits, INSTRUCTION_TYPE)
      break;
    case FormatInstruction.I:
      learnFormatI(_bin, bits, INSTRUCTION_TYPE)
      break;
    case FormatInstruction.J:
      learnFormatJ(_bin, bits, INSTRUCTION_TYPE)
      break;
    default:
      formatNotFound()
  }
}
