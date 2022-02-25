const { Logger, LColor } = require('logger-colors');
const { getUserById, addUser } = require('../helpers/user');

const logger = new Logger();

const addController = (req, res) => {

    const body = req.body;

    const user = getUserById(body.id);

    if (user) {
        logger.error('ERROR : DUPLICATE ID', true);
        const response = {
            error: 'Duplicate ID',
            status: 'Record not inserted'
        }
        logger.error(JSON.stringify(response), false);
        logger.error('');
        logger.info('----------------------------------------------------');
        res.status(400).send(response)
    } else {
        addUser(body).then((result) => {
            logger.magenta('RESPONSE', true);
            logger.magenta(`STATUS: ${LColor.c_magenta}[${200}]`, false);
            logger.magenta(`BODY:`, false);
            logger.magenta(JSON.stringify(result), false);
            res.status(200).send(result);
        }).catch ((err) => {
            logger.error('ERROR', true);
            logger.error(`STATUS: ${LColor.c_error}[${400}]`, false);
            logger.error(`BODY:`, false);
            logger.error(JSON.stringify(err), false);
            res.status(400).send(err);
        })
    }
}

module.exports = {
    addController
};