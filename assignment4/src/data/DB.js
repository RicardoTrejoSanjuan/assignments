const fs = require('fs');
const { Logger } = require('logger-colors');
require('dotenv').config();

const logger = new Logger();

const env = process.env.NODE_ENV;

const path = env === 'test' ? './src/data/crud-test.txt': './src/data/crud.txt';
const readFile = () => {
    try {
        const rawdata = fs.readFileSync(path);
        const data = JSON.parse(rawdata);
        return {
            err: null,
            data
        };
    } catch (err) {
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
    return new Promise((resolve, reject) => {
        try {
            const content = JSON.stringify(info);
            fs.writeFile(path, content, function (err) {
                if (err) reject(err);
                else {
                    resolve({
                        status: 'Record inserted successfully'
                    });
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    readFile,
    writeFile
}