import { convert, bitsComplete } from './utils';

export enum Format {
    R = 'R',
    I = 'I',
    J = 'J'
}

export class Reference {
    name: string;
    opcode: string;
    func: string;
    format: Format;

    constructor(name: string, opcode: string, func: string, format: Format) {
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
