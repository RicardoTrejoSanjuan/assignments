const { Logger } = require('logger-colors');
const https = require('https');

const logger = new Logger();
require('dotenv').config();

const getWeatherDetails = (city) => {
    return new Promise((resolve, reject) => {
        getWeather(city).then((weather) => {
            resolve({ status: 200, resp: weather });
        }).catch((error) => {
            resolve({ status: 400, resp: error });
        });
    });
}

const getWeather = (city) => {

    const err = { error: `City '${city}' not found`, statusCode: 400 };
    return new Promise((resolve, reject) => {
        try {
            const appId = process.env.APPID;
            const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=imperial&appid=${appId}`;
            const req = https.get(url, (res) => {
                const { statusCode } = res; res.on('data', function (data) {
                    const bufferToJson = JSON.parse(data.toString());
                    if (statusCode === 200) {
                        resolve({
                            statusCode,
                            data: bufferToJson
                        });
                    } else {
                        reject({
                            statusCode,
                            error: `City '${city}' not found`
                        });
                    }
                });
            });
            req.end();
            req.on('error', (e) => {
                logger.error(`e: ${e}`);
                reject(err);
            });
        } catch (error) {
            logger.error(`error: ${error}`);
            reject(err);
        };
    });
}

module.exports = {
    getWeatherDetails
};