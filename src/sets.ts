import { Reference, Format } from "./InstructionCode";
import { genRegisters } from "./utils";

export const references = [
    new Reference('add', '0', '20', Format.R),
    new Reference('addi', '8', '0', Format.I),
    new Reference('addiu', '9', '0', Format.I),
    new Reference('addu', '0', '21', Format.R),
    new Reference('and', '0', '24', Format.R),
    new Reference('andi', 'c', '0', Format.I),
    new Reference('beq', '4', '0', Format.I),
    new Reference('bne', '5', '0', Format.I),
    new Reference('j', '2', '0', Format.J),
    new Reference('jal', '3', '0', Format.J),
    new Reference('jr', '0', '8', Format.R),
    new Reference('lbu', '24', '0', Format.I),
    new Reference('lhu', '25', '0', Format.I),
    new Reference('ll', '30', '0', Format.I),
    new Reference('lui', 'f', '0', Format.I),
    new Reference('lw', '23', '0', Format.I),
    new Reference('nor', '0', '27', Format.R),
    new Reference('or', '0', '25', Format.R),
    new Reference('ori', 'd', '0', Format.I),
    new Reference('slt', '0', '2a', Format.R),
    new Reference('slti', 'a', '0', Format.I),
    new Reference('sltiu', 'b', '0', Format.I),
    new Reference('sltu', '0', '2b', Format.R),
    new Reference('sll', '0', '00', Format.R),
    new Reference('srl', '0', '02', Format.R),
    new Reference('sb', '28', '0', Format.I),
    new Reference('sc', '38', '0', Format.I),
    new Reference('sh', '29', '0', Format.I),
    new Reference('sw', '2b', '0', Format.I),
    new Reference('sub', '0', '22', Format.R),
    new Reference('subu', '0', '23', Format.R)
]

export const registers = [
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
