const router = require('../routers/weatherRouter');

describe('Unit tests for weatherRouter.js', () => {
    test('has routes', () => {
        const routes = [
            { path: '/details/:city', method: 'get' },
        ];

        routes.forEach((route) => {
            const match = router.stack.find(
                (s) => s.route.path === route.path && s.route.methods[route.method]
            );
            expect(match).toBeTruthy();
        });
    });
});