const { Logger } = require('logger-colors');


const { showInformation } = require('./helpers/lables');
const { readInput } = require('./helpers/input');
const { validateInput } = require('./helpers/validations');
const { getMultiple } = require('./helpers/multiples');
const { MyEvent } = require('./helpers/myEvent');

const logger = new Logger();

console.clear();

const main = async() => {

    let exit

    do {
        showInformation();
        const input = await readInput('Input:_');

        const {data, error} = await validateInput(input.trim());

        if (error) {
            logger.error(error);
        } else {
            const multiples = getMultiple(data);
            await MyEvent(multiples);
        }

        exit = await readInput('Enter 0 to quit:_');

        
    } while (exit !== '0');
}

main();