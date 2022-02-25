const { Logger } = require('logger-colors');

const logger = new Logger();
const div = '===============================================';

const showInformation = () => {

    console.clear();
    logger.success(div);
    logger.success('Assignment 3 - Callback And Events.', true);
    logger.success(div);
    logger.success('');
    logger.success('Instructions');
    logger.success('');
    logger.success('Enter two numbers separated by a space less than 1000');
    logger.success('Sample: xxxx xxxx');

}



module.exports = {
    showInformation
}