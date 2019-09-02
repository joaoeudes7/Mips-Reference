import { binToAssembly, Format } from "./src/binToAssembly";

const BIN = "0x21490064"
const FORMAT = Format.hex

const BITS_DEFAULT = 32

binToAssembly(BIN, FORMAT, BITS_DEFAULT)
