import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { JobsService } from './jobs.service.js';

const prisma = new PrismaClient();
const jobsService = new JobsService();

describe('JobsService', () => {
  beforeEach(async () => {
    await prisma.ledgerEntry.deleteMany();
    await prisma.job.deleteMany();
    await prisma.providerProfile.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('creates a job for a customer and stores it in the database', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'customer@aiddo.com',
        passwordHash: 'hashed',
        name: 'Customer',
        role: 'CUSTOMER',
      },
    });

    const job = await jobsService.createJob({
      customerId: user.id,
      title: 'Need plumbing help',
      description: 'Fix a leaking kitchen sink',
      category: 'PLUMBING',
      price: 1500,
      location: 'Bengaluru',
    });

    expect(job.customerId).toBe(user.id);
    expect(job.title).toBe('Need plumbing help');
    expect(job.status).toBe('OPEN');
  });
});
