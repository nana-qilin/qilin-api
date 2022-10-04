import chalk from 'chalk';

import config from '../utils/config';

export class Logger {
    public name: string;
    public color: chalk.Chalk;

    public constructor(name: string, color: string) {
        if(color.match("^#[A-Fa-f0-9]{6}|^[A-Fa-f0-9]{6}$")){
            this.color = chalk.hex(color);
            this.name = this.color(name);
            return;
        }
        console.warn(`Could not parse custom color in ${name}, using default.`);
        this.color = chalk.hex(config.logger.colors.text);
        this.name = this.color(name);
    }

    public start(msg: string) {
        console.log(
            chalk.hex(config.logger.colors.start)(`[ 🟢 ] `), this.name,
            `: `, chalk.hex(`${config.logger.colors.text}`)(msg)
        )
    };

    public stop(msg: string) {
        console.log(
            chalk.hex(config.logger.colors.stop)(`[ 🔴 ] `), this.name,
            `: `, chalk.hex(`${config.logger.colors.text}`)(msg)
        )
    };

    public debug(data: any) {
        console.debug(
            chalk.hex(config.logger.colors.debug)(`[ 🔨 ] `), this.name,
            `: `, chalk.hex(`${config.logger.colors.text}`)(data)
        )
    };

    public log(data: any) {
        console.log(
            chalk.hex(config.logger.colors.log)(`[ 🔔 ] `), this.name,
            `: `, chalk.hex(`${config.logger.colors.text}`)(data)
        )
    };

    public warn(data: any) {
        console.warn(
            chalk.hex(config.logger.colors.warn)(`[ ⚠️ ] `), this.name,
            `: `, chalk.hex(config.logger.colors.text)(data)
        )
    };

    public error(data: any) {
        console.error(
            chalk.hex(config.logger.colors.error)(`[ ❗ ] `), this.name,
            `: `, chalk.hex(config.logger.colors.text)(data)
        )
    };
}
