const request = require('supertest');
const nock = require('nock');
const { getWeatherDetails } = require('../helpers/getWeather');

const { mock_200 } = require('./mock');
describe('Unit tests for app.js', () => {

    beforeEach(() => {
        nock.cleanAll();
    });

    afterEach(async () => {
        nock.cleanAll();
    });

    it('should be return a status code 400', async () => {
        // mock
        nock('https://api.openweathermap.org/data/2.5/find?q=XD&units=imperial&appid=f92c1f4990b0574d4a4e4d3dd556f388')
            .get('/')
            .reply(400, { cod: '400', message: 'bad query' });

        const response = {
            status: 400,
            resp: { error: "City 'XD' not found", statusCode: 400 }
          };

        const res = await getWeatherDetails('XD');

        expect(res).toEqual(response);
        expect(res.status).toEqual(400);
        expect(res.resp.error).toBe(`City 'XD' not found`);
    });

    it('should be return a status code 200', async() => {
        // mock
        nock('https://api.openweathermap.org')
            .persist()
            .get('/data/2.5/find?q=mexico&units=imperial&appid=f92c1f4990b0574d4a4e4d3dd556f388')
            .reply(200, mock_200);

        const res = await getWeatherDetails('mexico');

        expect(res.status).toEqual(200);
        expect(res.resp.data).toEqual(JSON.parse(mock_200));
    });
});