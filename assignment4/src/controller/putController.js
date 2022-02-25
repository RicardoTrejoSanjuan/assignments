const { Logger, LColor } = require('logger-colors');
const { getUserById, updateUser } = require('../helpers/user');

const logger = new Logger();

const putController = (req, res) => {

    const userId = req.params.id;
    const body = req.body;

    const user = getUserById(userId);

    if (user) {
        updateUser(body, userId).then((result) => {
            logger.magenta('RESPONSE', true);
            logger.magenta(`STATUS: ${LColor.c_magenta}[${200}]`, false);
            logger.magenta(`BODY:`, false);
            logger.magenta(JSON.stringify(result), false);
            res.status(200).send(result);
        }).catch((err) => {
            logger.error('ERROR', true);
            logger.error(`STATUS: ${LColor.c_error}[${400}]`, false);
            logger.error(`BODY:`, false);
            logger.error(JSON.stringify(err), false);
            res.status(400).send(err);
        })
    } else {
        logger.error('ERROR : USER ID DOES NOT EXIST', true);
        const response = {
            error: 'User ID does not exist',
            status: 'Record not updated'
        }
        logger.error(JSON.stringify(response), false);
        logger.error('');
        logger.info('----------------------------------------------------');
        res.status(400).send(response)
    }
    //     addUser(body).then((result) => {
    //         logger.magenta('RESPONSE', true);
    //         logger.magenta(`STATUS: ${LColor.c_magenta}[${200}]`, false);
    //         logger.magenta(`BODY:`, false);
    //         logger.magenta(JSON.stringify(result), false);
    //         res.status(200).send(result);
    //     }).catch ((err) => {
    //         logger.error('ERROR', true);
    //         logger.error(`STATUS: ${LColor.c_error}[${400}]`, false);
    //         logger.error(`BODY:`, false);
    //         logger.error(JSON.stringify(err), false);
    //         res.status(400).send(err);
    //     })
    // }
}

module.exports = {
    putController
};