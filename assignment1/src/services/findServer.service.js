const { Logger } = require('logger-colors');
const url = require('url');
const http = require('http');
const https = require('https');

const logger = new Logger();

const findServer = (arr) => {
    let responsePromises = [];
    logger.success('GET SERVER STATUS', true);
    arr.forEach((item) => {
        const { proto, options, priority } = getHeaders(item);
        const myPromise = new Promise((resolve, reject) => {

            try {
                logger.success('URL:  ' + item.url);
                logger.success('');
                const req = proto.get(options, (res) => {
                    const { statusCode } = res;
                    res.on('data', (data) => {
                        if (statusCode < 300 && statusCode > 199) {
                            resolve({
                                url: options.hostname,
                                code: statusCode,
                                priority
                            });
                        } else {
                            reject({
                                url: options.hostname,
                                code: statusCode,
                                priority
                            });
                        }
                    });
                });
                req.end();
                req.on('error', (e) => {
                    reject({
                        url: e.hostname,
                        code: e.code.includes('ENOTFOUND') ? 404 : 500,
                        priority
                    })
                });
            } catch (err) {
                reject({
                    url: err.hostname,
                    code: err.code.includes('ENOTFOUND') ? 404 : 500,
                    priority
                });
            }
        });
        responsePromises.push(myPromise);
    });

    return responsePromises;
}

const getHeaders = (item) => {
    const parsedURL = url.parse(item.url);
    const proto = parsedURL.protocol.includes('https') ? https : http;
    const options = {
        hostname: parsedURL.host,
        port: parsedURL.port,
        path: parsedURL.path,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return {
        proto,
        options,
        priority: item.priority,
    }
}

module.exports = {
    findServer
}