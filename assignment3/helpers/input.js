const readInput = (msg) => {
    return new Promise((resolve) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question(msg, (opt) => {
            readLine.close();
            resolve(opt);
        });
    });
}

module.exports = {
    readInput
}