const { Logger, LColor } = require('logger-colors');
const { getUserById, getAllUsers } = require('../helpers/user');

const logger = new Logger();

const getController = (req, res) => {

    const userId = req.query.id;

    if (userId) {
        const user = getUserById(userId);
        if (user) {
            logger.magenta('RESPONSE', true);
            logger.magenta(`STATUS: ${LColor.c_magenta}[${200}]`, false);
            logger.magenta(`BODY:`, false);
            logger.magenta(JSON.stringify(user), false);
            res.status(200).send(user);
        } else {
            const response = {
                error: 'User ID not found'
            };
            logger.error('RESPONSE', true);
            logger.error(`STATUS: ${LColor.c_magenta}[${400}]`, false);
            logger.error(`BODY:`, false);
            logger.error(JSON.stringify(response), false);
            res.status(400).send(response);
        }
    } else {
        const users = getAllUsers();

        logger.magenta('RESPONSE', true);
        logger.magenta(`STATUS: ${LColor.c_magenta}[${200}]`, false);
        logger.magenta(`BODY:`, false);
        logger.magenta(JSON.stringify(users), false);
        res.status(200).send(users);
    }
}

module.exports = {
    getController
};