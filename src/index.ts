import chalk from 'chalk';

interface LoggerInterface {
    l: (message: string, ...args: any[]) => void;
    e: (message: string, ...args: any[]) => void;
    d: (message: string, ...args: any[]) => void;
    i: (message: string, ...args: any[]) => void;
}

interface LogCollection {
    error: string[];
    info: string[];
    debug: string[];
    log: string[];
}

export default class Logger implements LoggerInterface {

    private origin: string;
    private debugMode: boolean = false;

    public logs: LogCollection = {
        error: [],
        info: [],
        debug: [],
        log: []
    }

    constructor(origin: string, debugMode: boolean = false) {
        this.origin = origin;
        this.debugMode = debugMode;
    }

    private formatedMessage(message: string) {
        return chalk.gray(`[${this.origin}]`) + chalk.bold(' > ') + message;
    }

    private logToCollection(type: keyof LogCollection, message: string, ...args: any[]) {
        if (this.logs[type].length > 50) {
            this.logs[type].shift();
        }

        this.logs[type].push(`${message} - ${args.join(' ')}`);
    }

    setDebugMode(mode: boolean) {
        this.debugMode = mode;
    }

    l(message: string, ...args: any[]) {
        const log = this.formatedMessage(chalk.gray(message))
        console.log(log, ...args);
        this.logToCollection("log", log, ...args)

    }

    e(message: string, ...args: any[]) {
        const log = this.formatedMessage(chalk.redBright(message));
        console.error(log, ...args);
        this.logToCollection("error", log, ...args)
    }

    d(message: string, ...args: any[]) {
        if (this.debugMode) {
            const log = this.formatedMessage(chalk.blueBright(message))
            console.debug(chalk.dim('(DEBUG)'), log, ...args);
            this.logToCollection("debug", log, ...args)
        }
    }

    i(message: string, ...args: any[]) {
        const log = this.formatedMessage(chalk.cyanBright(message))
        console.info(log, ...args);
        this.logToCollection("info", log, ...args)
    }

    blank(lines: number = 1) {
        for (let i = 0; i < lines; i++) {
            console.log();
        }
    }
}