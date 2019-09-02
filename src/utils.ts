/**
 * Utils to Convert
 */
const convert = {
    bin2dec: (s: string) => Number(parseInt(s, 2).toString(10)),
    bin2hex: (s: string) => parseInt(s, 2).toString(16),
    dec2bin: (s: string) => parseInt(s, 10).toString(2),
    dec2hex: (s: string) => parseInt(s, 10).toString(16),
    hex2bin: (s: string) => parseInt(s, 16).toString(2),
    hex2dec: (s: string) => Number(parseInt(s, 16).toString(10))
};

/**
 * Complete bits if need
 */
const bitsComplete = (value: string, num: number) => {
    const len = value.length;
    const qtdRepeat = Math.max(num - len, 0)
    const complete = "0".repeat(qtdRepeat)

    return `${complete}${value}`
}

/**
 * Generate Family of Registers
 */
const genRegisters = (_var: string, start: number, end: number) => {
    const values: Array<string> = []

    for (let index = start; index < (end + 1); index++) {
        values.push(`${_var}${index}`)
    }

    return values
}

/**
 * Get position of binary by bits
 */
const posInBin = (pos: number, bits: number) => {
    return (bits - 1) - pos
}

/**
 * Tool to split binary
 */
const subBin = (value: string, start: number, end: number, bits: number) => {
    return value.substring(posInBin(start, bits), posInBin(end, bits) + 1)
}

export {
    convert,
    bitsComplete,
    posInBin,
    subBin,
    genRegisters
}
