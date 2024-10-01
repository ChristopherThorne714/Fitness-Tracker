
const request = require('supertest');
const mongoose = require('mongoose');

// IMPORTANT
const app = require('../../app');
const agent = request.agent(app);

require("dotenv").config({ path: "./config.env" });

const constants = {
    user : {email : 'd@d', password : 'd'}, 
    performedOn : '2024-09-18', 
    title : 'something wild',
    sort: 'Duration',
    musclegroup: 'Abs',
    performedOn: '2024-09-18',
    sets: '2',
    duration: '5:45:77',
    id : '66f19ef7a7b2b27d1078644f', 
    token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWIxYWUyMTc2NjQ0MjFiYmIyNmM5NiIsImlhdCI6MTcyNjY4Njg2MiwiZXhwIjoxNzI2Njk3NjYyfQ.dRgh5eGHVO1UkYkgZttkuEzsLO_c62jjB95fzeXlGXg'};


describe('Duration workouts endpoints', () => {
    let _id;

    beforeAll(async () => {
        await mongoose.connect(process.env.ATLAS_URI);
    });
    afterAll(async() => {
        await mongoose.connection.close();
    });

    describe('create a test user', () => {
        test('POST /api/users/signup', async () => {
            const res = await agent
                .post('/api/users/signup')
                .send({
                    email: constants.user.email,
                    password: constants.user.password,
                });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("user");
        });
    });

    describe('login with user credentials, create a new workout, and then delete it', () => {
        test('POST /api/users/login', async () => {
            const res = await agent
                .post('/api/users/login')
                .send({
                    email: constants.user.email,
                    password: constants.user.password,
                });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("user");
        });

        test('POST /api/durationworkouts/', async () => {
            const res = await agent
                .post(`/api/durationworkouts`)
                .send({
                    title: constants.title,
                    sort: constants.sort,
                    musclegroup: constants.musclegroup,
                    performedOn: constants.performedOn,
                    user: constants.user.email,
                    duration: constants.duration,
                    sets: constants.sets,
            })
            .set({
                cookies : {token : constants.token},
            });
            _id = res.body._id;
            expect(res.status).toBe(201);
            expect(res.body._id).toBeDefined();

        });

        test('DELETE /api/workouts/', async () => {
            const res = await agent
                .delete(`/api/workouts/${_id}`)
                .set({
                cookies : {token : constants.token},
                })
            expect(res.status).toBe(200);
        });
    }); 

    describe('Update a duration workout', () => {
        test('put /api/durationworkouts/:id', async () => {
            const res = await agent
                .put(`/api/underloadworkouts/${constants.id}`)
                .send({
                    title: constants.title,
                    sort: constants.sort,
                    musclegroup: constants.musclegroup,
                    performedOn: constants.performedOn,
                    user: constants.user.email,
                    duration: constants.duration,
                    sets: constants.sets,
                })
                .set({
                    cookies : {token : constants.token},
                });
            expect(res.status).toBe(200);
        });
    });

    describe('delete test user d@d', () => {
        test('POST /api/users/delete', async () => {
            const res = await agent
                .post(`/api/users/delete`)
                .send({
                    email: constants.user.email,
                })
                .set({
                    cookies : {token : constants.token},
                });
            expect(res.status).toBe(200);
        });
    });
});