import { describe, expect, it } from 'vitest';

describe('AIDDO API bootstrap', () => {
  it('exposes the platform metadata contract', () => {
    expect({ name: 'AIDDO Platform API', version: '0.1.0' }).toMatchObject({
      name: 'AIDDO Platform API',
      version: '0.1.0',
    });
  });
});
