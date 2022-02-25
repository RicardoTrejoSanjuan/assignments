const request = require('supertest');

const app = require('../app');
const { writeFile } = require('../data/DB');
const { addMock, viewMock, editMock } = require('./mock');

describe('Unit tests for app.js', () => {

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        await writeFile(viewMock.allUsers);
    });

    afterAll(async () => {
        await writeFile({});
    });

    describe('Unit test add user', () => {
        it('should validate request schema, it has required property', async () => {
            const res = await request(app)
                .post('/add');
            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual(addMock.resRequired);
        });

        it('should validate request schema, it has additional properties', async () => {
            const requestMock = {
                id: '10',
                name: 'updated name',
                age: '22',
                gender: 'Male',
                email: 'userone@gmail.com',
                job: 'dev'
            };

            const res = await request(app)
                .post('/add')
                .send(requestMock);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual(addMock.resAdditional);
        });

        it('should insert a new user correctly', async () => {
            const requestMock = {
                id: '10',
                name: 'updated name',
                age: '22',
                gender: 'Male',
                email: 'userone@gmail.com'
            };

            const res = await request(app)
                .post('/add')
                .send(requestMock);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({ status: 'Record inserted successfully' });
        });

        it('should return that the user already exists', async () => {
            const requestMock = {
                id: '10',
                name: 'updated name',
                age: '22',
                gender: 'Male',
                email: 'userone@gmail.com'
            };
            const res = await request(app)
                .post('/add')
                .send(requestMock);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual({
                error: 'Duplicate ID',
                status: 'Record not inserted'
            });
        });
    });

    describe('Unit test get user', () => {
        it('should return a list of all the users', async () => {

            const res = await request(app)
                .get('/view');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(viewMock.allUsersTwo);
        });

        it('should return only to a single user', async () => {

            const res = await request(app)
                .get('/view?id=1');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(viewMock.singleUser);
        });

        it('should return only to a single user', async () => {

            const res = await request(app)
                .get('/view?id=100');
            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual({ error: 'User ID not found' });
        });
    });

    describe('Unit test edit user', () => {
        it('should validate request schema', async () => {
            const res = await request(app)
                .put('/edit/1')
                .send(editMock.reqShemaInvalid);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual(editMock.resShemaInvalid);
        });
        it('should be return the user was successfully updated.', async () => {
            const res = await request(app)
                .put('/edit/1')
                .send(editMock.reqWell);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({ status: 'Record updated successfully' });
        });
        it('should return that the user does not exist', async () => {
            const res = await request(app)
                .put('/edit/100')
                .send(editMock.reqWell);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toEqual({
                error: 'User ID does not exist',
                status: 'Record not updated'
            });
        });
    });

});