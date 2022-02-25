const { Logger } = require('logger-colors');
const logger = new Logger();

const MyEvent = (data) => {
    
    return new Promise(resolve => {
        setTimeout(() => {
            logInfo(data[0]);
            logInfo(data[1]);
            summary(data);
            resolve();
        }, 2000);
    });
}

const logInfo = ({n, m}) => {
    logger.magenta(`Multiples of ${n}`);
    logger.warn(m);
    logger.warn('');
}

const summary = (data) => {
    let total = 0;

    data.forEach(({m}) => {
        total += m.reduce((a, b) => a + b, 0);
    });

    logger.cyan(`Sum: ${total}`);
}

module.exports = {
    MyEvent
}