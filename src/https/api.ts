import { Logger } from '../utils/logger';
const logger = new Logger("qilin-https", "#89c8ff");

import config from '../utils/config';

import express from 'express';
import * as https from 'https';
import * as fs from 'fs';

export default class Api {
    private app: express.Application;
    private server?: https.Server;
    private httpPort: number;
    private httpsPort: number;

    public constructor(controllers: object[]) {
        this.app = express();
        if (config.api.https.enable) {
            this.server = https.createServer({
                key: fs.readFileSync('./src/https/ssl/qilin.key'),
                cert: fs.readFileSync('./src/https/ssl/qilin.crt')
            }, this.app);
        }
        this.httpPort = config.api.port.http;
        this.httpsPort = config.api.port.https;

        this.initMiddleware();
        this.initControllers(controllers);
    }

    private initMiddleware() {
        this.app.use(express.json())
        if (config.api.https.forcessl === true){
            logger.log("Force SSL enabled.")
            this.app.use(function (req, res, next) {
                if (!/https/.test(req.protocol)) {
                    res.redirect("https://" + "localhost" + req.url);
                } else {
                    return next();
                }
                });
            }
    }

    private initControllers(controllers: object[]) {
        controllers.forEach((controller: any) => {
            this.app.use('/api', controller.router);
        })
    };

    public listen() {
        if (this.server) {
            this.server.listen(this.httpsPort, () => {
                logger.start(`Listening on port ${this.httpsPort}!`);
            })
            this.app.listen(this.httpPort, () => {
            })
        }
        else {
            this.app.listen(this.httpPort, () => {
                logger.start(`HTTP listening on port ${this.httpPort}!`);
            })
        }
    }
};