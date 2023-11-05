"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    constructor(origin, debugMode = false) {
        this.debugMode = false;
        this.origin = origin;
        this.debugMode = debugMode;
    }
    formatedMessage(message) {
        return chalk_1.default.gray(`[${this.origin}]`) + chalk_1.default.bold(' > ') + message;
    }
    setDebugMode(mode) {
        this.debugMode = mode;
    }
    l(message, ...args) {
        console.log(this.formatedMessage(chalk_1.default.gray(message)), ...args);
    }
    e(message, ...args) {
        console.error(this.formatedMessage(chalk_1.default.redBright(message)), ...args);
    }
    d(message, ...args) {
        if (this.debugMode) {
            console.debug(chalk_1.default.dim('(DEBUG)'), this.formatedMessage(chalk_1.default.blueBright(message)), ...args);
        }
    }
    i(message, ...args) {
        console.info(this.formatedMessage(chalk_1.default.cyanBright(message)), ...args);
    }
    blank(lines = 1) {
        for (let i = 0; i < lines; i++) {
            console.log();
        }
    }
}
exports.default = Logger;
