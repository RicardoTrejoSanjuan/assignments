const router = require('../routers/serverRouter');

describe('Unit tests for serverRouter.js', () => {
    test('has routes', () => {
        const routes = [
            { path: '/', method: 'get' },
        ];

        routes.forEach((route) => {
            const match = router.stack.find(
                (s) => s.route.path === route.path && s.route.methods[route.method]
            );
            expect(match).toBeTruthy();
        });
    });
});