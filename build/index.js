"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    constructor(origin, debugMode = false) {
        this.debugMode = false;
        this.logs = {
            error: [],
            info: [],
            debug: [],
            log: []
        };
        this.origin = origin;
        this.debugMode = debugMode;
    }
    formatedMessage(message) {
        return chalk_1.default.gray(`[${this.origin}]`) + chalk_1.default.bold(' > ') + message;
    }
    logToCollection(type, message, ...args) {
        if (this.logs[type].length > 50) {
            this.logs[type].shift();
        }
        this.logs[type].push(`${message} - ${args.join(' ')}`);
    }
    setDebugMode(mode) {
        this.debugMode = mode;
    }
    l(message, ...args) {
        const log = this.formatedMessage(chalk_1.default.gray(message));
        console.log(log, ...args);
        this.logToCollection("log", log, ...args);
    }
    e(message, ...args) {
        const log = this.formatedMessage(chalk_1.default.redBright(message));
        console.error(log, ...args);
        this.logToCollection("error", log, ...args);
    }
    d(message, ...args) {
        if (this.debugMode) {
            const log = this.formatedMessage(chalk_1.default.blueBright(message));
            console.debug(chalk_1.default.dim('(DEBUG)'), log, ...args);
            this.logToCollection("debug", log, ...args);
        }
    }
    i(message, ...args) {
        const log = this.formatedMessage(chalk_1.default.cyanBright(message));
        console.info(log, ...args);
        this.logToCollection("info", log, ...args);
    }
    blank(lines = 1) {
        for (let i = 0; i < lines; i++) {
            console.log();
        }
    }
}
exports.default = Logger;
