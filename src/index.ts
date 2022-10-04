import { Logger } from './utils/logger';
const logger = new Logger("qilin-api", "#89c8ff");

import Api from './https/api';
import NotificationController from './apps/notify';

const api = new Api(
    [
        new NotificationController,
    ]
);
api.listen();

function loggerTest() {
    logger.debug("Debug!");
    logger.log("Log!");
    logger.warn("Warn!");
    logger.error("Error!");
    logger.start("Start!");
    logger.stop("Stop!");
};
// loggerTest();