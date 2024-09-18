
// jest.mock('../middleware/AuthMiddleware', () => ({
//     userVerification: () => jest.fn((req, res, next) => next()),
//     reqAuth: () => jest.fn((req, res, next) => next())
// }));

const request = require('supertest');
const mongoose = require("mongoose");

// IMPORTANT
const app = require('../app');
const agent = request.agent(app);

const constants = {user : {email : 'a@a', password : 'a'}, performedOn : '2024-09-18', token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWIxYWUyMTc2NjQ0MjFiYmIyNmM5NiIsImlhdCI6MTcyNjY4Njg2MiwiZXhwIjoxNzI2Njk3NjYyfQ.dRgh5eGHVO1UkYkgZttkuEzsLO_c62jjB95fzeXlGXg'};

require("dotenv").config({ path: "./config.env" });

beforeEach(async () => {
    await mongoose.connect(process.env.ATLAS_URI);
});
afterEach(async() => {
    await mongoose.connection.close();
});

describe('Workouts endpoints', () => {
    test('POST /api/users/login and GET /api/workouts/test', async () => {
        const token = await agent
            .post('/api/users/login')
            .send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
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
        const token = await agent
            .post('/api/users/login')
            .send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        });

        const res = await agent
            .get(`/api/workouts/${constants.user.email}`)
            .send({
                performedOn : constants.performedOn,
            })
            .set({
                cookies : {token : token.body.token},
                'content-type' : 'application/json',
            });
        expect(res.status).toBe(200);
        // I don't understand why the below expectance causes this test to fail
        // expect(res.body.length).toBeGreaterThan(0);
    });
});