"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binToAssembly_1 = require("./src/binToAssembly");
const BIN = "0x21490064";
const FORMAT = binToAssembly_1.Format.hex;
const BITS_DEFAULT = 32;
binToAssembly_1.binToAssembly(BIN, FORMAT, BITS_DEFAULT);
