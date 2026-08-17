import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import jobsRoutes from './modules/jobs/jobs.routes.js';
import ledgerRoutes from './modules/ledger/ledger.routes.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/ledger', ledgerRoutes);

const prisma = new PrismaClient();

describe('AIDDO HTTP API', () => {
  beforeEach(async () => {
    await prisma.ledgerEntry.deleteMany();
    await prisma.job.deleteMany();
    await prisma.providerProfile.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('registers a user via HTTP', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'http-user@aiddo.com',
        name: 'HTTP User',
        password: 'strongpassword123',
        role: 'CUSTOMER',
      });

    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe('http-user@aiddo.com');
    expect(response.body.tokens.accessToken).toBeTruthy();
  });

  it('logs in through HTTP and returns tokens', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'login-user@aiddo.com',
      name: 'Login User',
      password: 'strongpassword123',
      role: 'CUSTOMER',
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'login-user@aiddo.com',
      password: 'strongpassword123',
    });

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('login-user@aiddo.com');
    expect(response.body.tokens.refreshToken).toBeTruthy();
  });

  it('rejects job creation without auth token', async () => {
    const response = await request(app).post('/api/jobs').send({
      customerId: 'some-id',
      title: 'Plumbing service',
      description: 'Fix a leaking pipe in the kitchen',
      category: 'PLUMBING',
      price: 1500,
      location: 'Bengaluru',
    });

    expect(response.status).toBe(401);
    expect(response.body.error).toMatch(/Missing or invalid Authorization header/);
  });

  it('creates a job via HTTP with auth token', async () => {
    const registerRes = await request(app).post('/api/auth/register').send({
      email: 'job-user-protected@aiddo.com',
      name: 'Job User Protected',
      password: 'strongpassword123',
      role: 'CUSTOMER',
    });

    const token = registerRes.body.tokens?.accessToken;
    const userId = registerRes.body.user?.id;

    const response = await request(app)
      .post('/api/jobs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        customerId: userId,
        title: 'Plumbing service',
        description: 'Fix a leaking pipe in the kitchen',
        category: 'PLUMBING',
        price: 1500,
        location: 'Bengaluru',
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Plumbing service');
  });

  it('rejects ledger entry without auth token', async () => {
    const response = await request(app).post('/api/ledger').send({
      userId: 'some-id',
      type: 'CUSTOMER_PAYMENT',
      amount: 2500,
      description: 'Customer payment for service',
      metadata: { jobId: 'job_123' },
    });

    expect(response.status).toBe(401);
  });

  it('rejects balance lookup without auth token', async () => {
    const response = await request(app).get('/api/ledger/balance/some-id');

    expect(response.status).toBe(401);
  });

  it('posts a ledger entry and reads the balance via HTTP with auth', async () => {
    const registerRes = await request(app).post('/api/auth/register').send({
      email: 'ledger-http-protected@aiddo.com',
      name: 'Ledger HTTP User Protected',
      password: 'strongpassword123',
      role: 'CUSTOMER',
    });

    const token = registerRes.body.tokens?.accessToken;
    const userId = registerRes.body.user?.id;

    const postResponse = await request(app)
      .post('/api/ledger')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: userId,
        type: 'CUSTOMER_PAYMENT',
        amount: 2500,
        description: 'Customer payment for service',
        metadata: { jobId: 'job_123' },
      });

    expect(postResponse.status).toBe(201);

    const balanceResponse = await request(app)
      .get(`/api/ledger/balance/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(balanceResponse.status).toBe(200);
    expect(balanceResponse.body.balance).toBe('2500');
  });
});
