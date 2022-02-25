const { Logger, LColor } = require('logger-colors');
const separador = '----------------------------------------------------';

function LoggerRequest() {
    const logger = new Logger();

    return (req, res, next) => {
        logger.info(separador);
        logger.cyan('REQUEST', true);
        logger.cyan('METHOD:\t' + req.method, false);
        logger.cyan('URL:   \t' + req.originalUrl, false);
        logger.cyan('HEADERS:', false);
        Object.keys(req.headers).forEach((h) => {
            logger.cyan('- ' + h + ": " + LColor.c_white + req.headers[h] + LColor.c_cyan, false);
        });
        logger.cyan('', false);
        logger.cyan('BODY:', false);
        logger.cyan(JSON.stringify(req.body), false);
        logger.info(separador);
        next();
    };
}

module.exports = LoggerRequest;