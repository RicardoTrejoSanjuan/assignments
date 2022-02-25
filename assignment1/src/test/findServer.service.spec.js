const nock = require('nock');
const { findServer } = require('../services/findServer.service');
xdescribe('Unit tests for findServer.service.js', () => {

    beforeEach(() => {
        nock.cleanAll();
        jest.useFakeTimers('legacy')
    });

    afterEach(async () => {
        nock.cleanAll();
    });

    it('should be return an promise[]', async(done) => {

        nock('http://abc.co').persist().get('/').reply(200, { status: 'ok' });
        nock('http://x.co').persist().get('/').reply(200, { status: 'ok' });

        const test = [
            { url: 'http://abc.co', priority: 1 },
            { url: 'http://x.co', priority: 2 }
        ];

        const resp = findServer(test);
        expect(resp.length).toEqual(2);
        // expect(typeof resp[0]?.then === 'function').toBeTruthy();

        // Promise.allSettled(resp).then(r => {
        //     expect(r).toEqual([
        //         {
        //             "status": "fulfilled",
        //             "value": {
        //                 "code": 200,
        //                 "priority": 1,
        //                 "url": "abc.co"
        //             }
        //         },
        //         {
        //             "status": "fulfilled",
        //             "value": {
        //                 "code": 200,
        //                 "priority": 2,
        //                 "url": "x.co"
        //             }
        //         }
        //     ]);
        // })
    });
});