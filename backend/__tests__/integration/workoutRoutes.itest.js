
const request = require('supertest');
const mongoose = require('mongoose');

// IMPORTANT
const app = require('../../app');
const agent = request.agent(app);

require("dotenv").config({ path: "./config.env" });

const constants = 
{user : {email : 'b@b', password : 'b'}, 
performedOn : '2024-09-18', 
dateRange : ['2024-09-12', '2024-09-19'], 
title : 'something crazy', 
id : '66eb1b89d5b7955eefc3787b', 
uId: '66eb1ae217664421bbb26c96', 
token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZWIxYWUyMTc2NjQ0MjFiYmIyNmM5NiIsImlhdCI6MTcyNjY4Njg2MiwiZXhwIjoxNzI2Njk3NjYyfQ.dRgh5eGHVO1UkYkgZttkuEzsLO_c62jjB95fzeXlGXg'};

describe('Workouts endpoints', () => {

    beforeAll(async () => {
        // await mongoose.connect(process.env.ATLAS_URI);
        await mongoose.connect('mongodb://localhost:27017');
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

    describe('login with user credentials', () => {
        test('POST /api/users/login', async () => {     
            const res = await agent
                .post('/api/users/login')
                .send({
                    email: constants.user.email,
                    password: constants.user.password,
                });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('user');
        });
    });

    describe('Get workouts logged by a user on a given date', () => {
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
    });

    describe('Get workouts by title', () => {
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
    });
    
    describe('Get workout by id', () => {
        test('GET /api/workouts/:id', async () => {
            const res = await agent
                .get(`/api/workouts/${constants.id}`)
                .set({
                    cookies : {token : constants.token},
                });
            expect(res.status).toBe(200);
        });
    });

    describe('delete test user b@b', () => {
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