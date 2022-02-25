const { Logger, LColor } = require('logger-colors');
const { readFile, writeFile } = require('../data/DB');
const { getWeatherDetails } = require('../helpers/getWeather');

const logger = new Logger();

const weatherController = (req, res) => {

    const cityName = req.params.city;

    logger.info('READ BD', true);
    const t = readFile();
    const timeNow = Math.round((new Date().getTime()) / 1000);

    async function getWeather() {
        logger.warn(`WEATHER API - '${cityName}'`, true);
        const r = await getWeatherDetails(cityName);
        logger.warn('Response: ');
        logger.warn(JSON.stringify(r));
        if (r.status === 200) {
            logger.warn('SAVE BD', true);
            const w = writeFile({
                data: r.resp,
                city: cityName,
                time: Math.round((new Date().getTime()) / 1000),
            });
        }

        logger.magenta('RESPONSE', true);
        logger.magenta(`STATUS: ${LColor.c_magenta}[${r.status}]`, false);
        logger.magenta(`BODY:`, false);
        logger.magenta(JSON.stringify(r.resp), false);
        res.status(r.status).send(r.resp);
    };


    if (t.data) {
        const { city, time, data } = t.data;
        if (city === cityName && timeNow <= (time + 20)) {
            logger.magenta('DB RESPONSE', true);
            logger.magenta(`STATUS: ${LColor.c_magenta}[${200}]`, false);
            logger.magenta(`BODY:`, false);
            logger.magenta(JSON.stringify(data), false);
            res.status(200).send(data);
        } else {
            logger.info(`DB is obsolete`);
            getWeather();
        }
    } else {
        logger.info(`DB is empty`);
        getWeather();
    }
}

module.exports = {
    weatherController
};