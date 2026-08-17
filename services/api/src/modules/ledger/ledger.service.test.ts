import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { LedgerService } from './ledger.service.js';

const prisma = new PrismaClient();
const ledgerService = new LedgerService();

describe('LedgerService', () => {
  beforeEach(async () => {
    await prisma.ledgerEntry.deleteMany();
    await prisma.job.deleteMany();
    await prisma.providerProfile.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('posts a ledger entry and preserves a total balance', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'ledger@aiddo.com',
        passwordHash: 'hashed',
        name: 'Ledger User',
        role: 'CUSTOMER',
      },
    });

    const entry = await ledgerService.postEntry({
      userId: user.id,
      type: 'CUSTOMER_PAYMENT',
      amount: 2500,
      currency: 'INR',
      description: 'Customer payment for job',
      metadata: { jobId: 'job_123' },
    });

    expect(entry.amount.toString()).toBe('2500');
    expect(entry.status).toBe('POSTED');

    const total = await ledgerService.getBalanceForUser(user.id);
    expect(Number(total)).toBe(2500);
  });
});
