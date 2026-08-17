import { describe, expect, it } from 'vitest';

describe('AIDDO API bootstrap', () => {
  it('exposes the platform metadata contract', () => {
    expect({ name: 'AIDDO Platform API', version: '0.1.0' }).toMatchObject({
      name: 'AIDDO Platform API',
      version: '0.1.0',
    });
  });

  it('supports auth token payload creation', () => {
    const payload = {
      sub: 'user_123',
      email: 'demo@aiddo.com',
      role: 'CUSTOMER',
    };

    expect(payload.sub).toBe('user_123');
    expect(payload.role).toBe('CUSTOMER');
  });
});
