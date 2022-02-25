const request = require('supertest');
const nock = require('nock');
const app = require('../app');

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

        const response = { error: "City 'XD' not found", statusCode: 400 };

        const res = await request(app)
            .get('/weather/details/XD');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(response);
        expect(res.body).toHaveProperty('error');
    });

    it('should be return a status code 200', async() => {
        // mock
        nock('https://api.openweathermap.org')
            .persist()
            .get('/data/2.5/find?q=mexico&units=imperial&appid=f92c1f4990b0574d4a4e4d3dd556f388')
            .reply(200, mock_200);

        const res = await request(app)
        .get('/weather/details/mexico');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            data: JSON.parse(mock_200),
            statusCode: 200
        });
        expect(res.body).toHaveProperty('data');
    });
});