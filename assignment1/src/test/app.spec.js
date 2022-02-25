const request = require('supertest');
const nock = require('nock');
const app = require('../app');
describe('Unit tests for app.js', () => {

    beforeEach(() => {
        nock.cleanAll();
    });

    afterEach(async () => {
        nock.cleanAll();
    });

    it('should return a status code 400', async () => {
        const response = { 'message': 'No servers available', 'server': null, 'status': 'error' }

        nock('http://doesNotExist.boldtech.co')
            .persist()
            .get('/')
            .reply(400, response);

        const res = await request(app)
            .get('/getServer');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual(response);
        expect(res.body).toHaveProperty('server');
    });

    it('should return a status code 200', async () => {
        const response = {
            "message": "Server available",
            "server": "doesnotexist.boldtech.co",
            "status": "success"
        };

        nock('http://doesNotExist.boldtech.co')
            .persist()
            .get('/')
            .reply(200, { ok: 'ok' });

        const res = await request(app)
            .get('/getServer');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(response);
        expect(res.body).toHaveProperty('server');
    });


    it('should return a server with hight priority', async () => {
        const response = {
            "message": "Server available",
            "server": "offline.boldtech.co",
            "status": "success"
        };

        nock('http://boldtech.co')
            .persist()
            .get('/')
            .reply(200, { ok: 'ok' });
        nock('http://doesNotExist.boldtech.co')
            .persist()
            .get('/')
            .reply(400, { ok: 'ok' });
        nock('http://offline.boldtech.co')
            .persist()
            .get('/')
            .reply(200, { ok: 'ok' });

        const res = await request(app)
            .get('/getServer');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(response);
        expect(res.body).toHaveProperty('server');
    });

    it('should return a server with low priority', async () => {
        const response = {
            "message": "Server available",
            "server": "google.com",
            "status": "success"
        };

        nock('http://boldtech.co')
            .persist()
            .get('/')
            .reply(400, { ok: 'ok' });
        nock('http://doesNotExist.boldtech.co')
            .persist()
            .get('/')
            .reply(400, { ok: 'ok' });
        nock('http://google.com')
            .persist()
            .get('/')
            .reply(200, { ok: 'ok' });

        const res = await request(app)
            .get('/getServer');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(response);
        expect(res.body).toHaveProperty('server');
    });

});