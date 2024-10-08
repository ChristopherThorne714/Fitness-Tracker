
const request = require('supertest');
const mongoose = require('mongoose');

// IMPORTANT
const app = require('../../app');
const agent = request.agent(app);

require("dotenv").config({ path: "./config.env" });

const constants = {
    user : {email : 'e@e', password : 'e'}, 
    performedOn : '2024-09-18', 
    title : 'somethinh insane',
    sort: 'Distance',
    musclegroup: 'Cardio',
    performedOn: '2024-09-18',
    laps: '4',
    distance: '100000',
    id : '66ec7cdcfd38bb004ede406f', 
    token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWIxYWUyMTc2NjQ0MjFiYmIyNmM5NiIsImlhdCI6MTcyNjY4Njg2MiwiZXhwIjoxNzI2Njk3NjYyfQ.dRgh5eGHVO1UkYkgZttkuEzsLO_c62jjB95fzeXlGXg'};


describe('Distance workouts endpoints', () => {
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

        test('POST /api/distanceworkouts/', async () => {
            const res = await agent
                .post(`/api/distanceworkouts`)
                .send({
                    title: constants.title,
                    sort: constants.sort,
                    musclegroup: constants.musclegroup,
                    performedOn: constants.performedOn,
                    user: constants.user.email,
                    distance: constants.distance,
                    laps: constants.laps,
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

    describe('Update a distance workout', () => {
        test('put /api/distanceworkouts/:id', async () => {
            const res = await agent
                .put(`/api/underloadworkouts/${constants.id}`)
                .send({
                    title: constants.title,
                    sort: constants.sort,
                    musclegroup: constants.musclegroup,
                    performedOn: constants.performedOn,
                    user: constants.user.email,
                    distance: constants.distance,
                    laps: constants.laps,
                })
                .set({
                    cookies : {token : constants.token},
                });
            expect(res.status).toBe(200);
        });
    });

    describe('delete test user e@e', () => {
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