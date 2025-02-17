const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

describe('User Management Endpoints', () => {
    let authToken;
    let adminToken;
    let userId;

    beforeEach(async () => {
        await User.deleteMany({});

        const userRes = await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Regular User',
                email: 'user@example.com',
                password: 'password123',
                role: 'user'
            });
        authToken = userRes.body.token;

        const adminRes = await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123',
                role: 'admin'
            });
        adminToken = adminRes.body.token;
    });

    describe('GET /api/user', () => {
        it('should get all users when authenticated', async () => {
            const res = await request(app)
                .get('/api/user')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(200);
        });

        it('should fail without authentication', async () => {
            const res = await request(app)
                .get('/api/user');

            expect(res.statusCode).toBe(401);
        });
    });

    describe('GET /api/user/:id', () => {
        it('should get a specific user', async () => {
            const user = await request(app)
                .get('/api/user')
                .set('Authorization', `Bearer ${authToken}`);

            const userId = user.body.users[0]._id;

            const res = await request(app)
                .get(`/api/user/${userId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(200);
        });

        it('should return 404 for non-existent user', async () => {
            const res = await request(app)
                .get('/api/user/5f7c3b3f8b2d2c0017f1b1a1')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(404);
        });
    });

    describe('POST /api/user', () => {
        it('should create a new user when authenticated', async () => {
            const res = await request(app)
                .post('/api/user')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'New User',
                    email: 'newuser@example.com',
                    role: 'user'
                });

            expect(res.statusCode).toBe(201);
        });

        it('should fail with invalid data', async () => {
            const res = await request(app)
                .post('/api/user')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'New User',
                    email: 'invalid-email'
                });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('PUT /api/user/:id', () => {
        it('should update user successfully', async () => {
            const users = await request(app)
                .get('/api/user')
                .set('Authorization', `Bearer ${authToken}`);
            const userId = users.body.users[0]._id;

            const res = await request(app)
                .put(`/api/user/${userId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'Updated Name'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.user.name).toBe('Updated Name');

        });

        it('should fail with invalid data', async () => {
            const users = await request(app)
                .get('/api/user')
                .set('Authorization', `Bearer ${authToken}`);

                const userId = users.body.users[0]._id;

            const res = await request(app)
                .put(`/api/user/${userId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    email: 'invalid-email'
                });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('DELETE /api/user/:id', () => {
        it('should allow admin to delete user', async () => {
            const users = await request(app)
                .get('/api/user')
                .set('Authorization', `Bearer ${adminToken}`);

            const userId = users.body.users[0]._id;

            const res = await request(app)
                .delete(`/api/user/${userId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(204);
        });

        it('should not allow regular user to delete user', async () => {
            const users = await request(app)
                .get('/api/user')
                .set('Authorization', `Bearer ${authToken}`);

                const userId = users.body.users[0]._id;

            const res = await request(app)
                .delete(`/api/user/${userId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(403);
        });
    });
});