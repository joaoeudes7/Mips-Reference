import { convert, bitsComplete } from './utils';

export enum FormatInstruction {
    R,
    I,
    J
}

export class InstructionCode {
    name: string;
    opcode: string;
    func: string;
    format: FormatInstruction;

    constructor(name: string, opcode: string, func: string, format: FormatInstruction) {
        this.name = name;
        this.opcode = opcode;
        this.func = func;
        this.format = format;
    }

    get funcBin() {
        const func = convert.hex2bin(this.func)
        return bitsComplete(func, 5)
    }

    get opBin() {
        const bin = convert.hex2bin(this.opcode)
        return bitsComplete(bin, 6)
    }
}
