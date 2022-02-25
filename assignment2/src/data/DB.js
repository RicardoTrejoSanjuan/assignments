const fs = require('fs');
const { Logger } = require('logger-colors');

const path = './src/data/weather.json';
const logger = new Logger();

const readFile = () => {
    try {
        const rawdata = fs.readFileSync(path);
        const data = JSON.parse(rawdata);
        return {
            err: null,
            data
        };
    } catch (err) {
        logger.info('File not found!');
        if (err.code === 'ENOENT') {
            return {
                err: 'File not found!',
                data: null
            };
        } else {
            return {
                err: err.message,
                data: null
            };
        }
    }

}

const writeFile = (info) => {
    try {
        const content = JSON.stringify(info);
        if (!fs.existsSync(path)) {
            logger.info('File not found');
            write(content);
        } else {
            write(content);
        }
    } catch (error) {
        logger.error(error);
    }
}

const write = (content) => {
    fs.writeFile(path, content, function (err, data) {
        if (err) {
            logger.magenta(err);
        }
        logger.warn('The file was saved!');
    });
}

module.exports = {
    readFile,
    writeFile
}