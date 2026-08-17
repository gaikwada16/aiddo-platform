import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { AuthService } from './auth.service.js';

const prisma = new PrismaClient();
const authService = new AuthService();

describe('AuthService', () => {
  beforeEach(async () => {
    await prisma.ledgerEntry.deleteMany();
    await prisma.job.deleteMany();
    await prisma.providerProfile.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('registers a user and stores a hashed password', async () => {
    const result = await authService.register({
      email: 'alice@aiddo.com',
      password: 'supersecret123',
      name: 'Alice Tester',
      role: 'CUSTOMER',
    });

    expect(result.user.email).toBe('alice@aiddo.com');
    expect(result.tokens.accessToken).toBeTruthy();
    expect(result.tokens.refreshToken).toBeTruthy();

    const storedUser = await prisma.user.findUnique({ where: { email: 'alice@aiddo.com' } });
    expect(storedUser).not.toBeNull();
    expect(storedUser?.passwordHash).not.toBe('supersecret123');
    expect(storedUser?.role).toBe('CUSTOMER');
  });

  it('logs in a registered user with the correct password', async () => {
    await authService.register({
      email: 'bob@aiddo.com',
      password: 'securepass123',
      name: 'Bob Tester',
      role: 'PROVIDER',
    });

    const result = await authService.login('bob@aiddo.com', 'securepass123');

    expect(result.user.email).toBe('bob@aiddo.com');
    expect(result.tokens.accessToken).toBeTruthy();
    expect(result.tokens.refreshToken).toBeTruthy();
  });
});
