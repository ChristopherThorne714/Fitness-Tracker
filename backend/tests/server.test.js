
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

beforeEach(async () => {
    await mongoose.connect(process.env.ATLAS_URI)
});
afterEach(async() => {
    await mongoose.connection.close()
});

describe('Workouts endpoints', () => {
    test('GET /api/workouts/test', async () => {
        const token = await agent.post('/api/users/login').send({
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
        });
        const res = await agent
            .get('/api/workouts/test')
            .set({
                cookies: {token : token.body.token},
            });
        expect(res.status).toBe(200)
        expect(res.body).toEqual({
            message: "Workouts testing!"
        });
    }, /* 20 * 1000 */);

});