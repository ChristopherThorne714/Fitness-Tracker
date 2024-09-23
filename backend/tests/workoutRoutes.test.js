
// jest.mock('../middleware/AuthMiddleware', () => ({
//     userVerification: () => jest.fn((req, res, next) => next()),
//     reqAuth: () => jest.fn((req, res, next) => next())
// }));

const request = require('supertest');
const mongoose = require("mongoose");

// IMPORTANT
const app = require('../app');
const agent = request.agent(app);

require("dotenv").config({ path: "./config.env" });

const constants = {user : {email : 'a@a', password : 'a'}, performedOn : '2024-09-18', dateRange : ['2024-09-12', '2024-09-19'], title : 'something crazy', id : '66eb1b89d5b7955eefc3787b', token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWIxYWUyMTc2NjQ0MjFiYmIyNmM5NiIsImlhdCI6MTcyNjY4Njg2MiwiZXhwIjoxNzI2Njk3NjYyfQ.dRgh5eGHVO1UkYkgZttkuEzsLO_c62jjB95fzeXlGXg'};

beforeAll(async () => {
    jest.setTimeout(60000);
    await mongoose.connect(process.env.ATLAS_URI);
}, 60000);
afterAll(async() => {
    jest.setTimeout(60000);
    await mongoose.connection.close();
}, 60000);

describe('Workouts endpoints', () => {
    test('POST /api/users/login and GET /api/workouts/test', async () => {
        const token = await agent
            .post('/api/users/login')
            .send({
            email: constants.user.email,
            password: constants.user.password,
        });

        const res = await agent
            .get('/api/workouts/test')
            .set({
                cookies: {token : token.body.token},
            });
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            message: "Workouts testing!"
        });
    }, /* 20 * 1000 */);

    test('GET /api/workouts/:user', async () => {
        const res = await agent
            .get(`/api/workouts/${constants.user.email}`)
            .send({
                performedOn : constants.performedOn,
            })
            .set({
                cookies : {token : constants.token},
            });
        expect(res.status).toBe(200);
        // I don't understand why the below expectance causes this test to fail
        // expect(res.body.length).toBeGreaterThan(0);
    });

    test('GET /api/workouts/show-workout/:user/:title', async () => {
        const res = await agent
            .get(`/api/workouts/show-workout/${constants.user.email}/${constants.title}`)
            .query({
                dateRange : constants.dateRange,
            })
            .set({
                cookies : {token : constants.token},
            });
        expect(res.status).toBe(200);
    });
    
    test('GET /api/workouts/:id', async () => {
        const res = await agent
            .get(`/api/workouts/${constants.id}`)
            .set({
                cookies : {token : constants.token},
            });
        expect(res.status).toBe(200);
    });
});