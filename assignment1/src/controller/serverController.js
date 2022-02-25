const { Logger, LColor } = require('logger-colors');
const { serverArray } = require('../data/serverArr');
const { findServer } = require('../services/findServer.service');

const logger = new Logger();

const serverController = (req, res) => {

    let responsePromises = findServer(serverArray);

    Promise.allSettled(responsePromises).then(responses => {

        const promises = responses.filter((p) => {
            return p.status.includes('fulfilled');
        }).map((ful) => {
            return ful.value;
        });

        let status;
        let resp;
        if (promises.length === 0) {
            status = 400;
            resp = {
                status: 'error',
                server: null,
                message: 'No servers available',
            };
        } else {
            const promisesSort = promises.sort((a, b) => {
                return (a.priority > b.priority ? 1 : -1);
            });

            status = 200;
            resp = {
                status: 'success',
                server: promisesSort[0].url,
                message: 'Server available',
            }
        }

        logger.magenta('RESPONSE', true);
        logger.magenta(`STATUS: ${LColor.c_magenta}[${status}]`, false);
        logger.magenta(`BODY:`, false);
        logger.magenta(JSON.stringify(resp), false);
        res.status(status).send(resp);
    });
}

module.exports = {
    serverController
};