import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../lib/jwt.js';

type RegisterInput = {
  email: string;
  password: string;
  name: string;
  role?: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
};

export class AuthService {
  async register({ email, password, name, role = 'CUSTOMER' }: RegisterInput) {
    const passwordHash = await bcrypt.hash(password, 10);

    return {
      user: {
        id: 'user_generated_id',
        email,
        name,
        role,
      },
      tokens: {
        accessToken: signAccessToken({ sub: 'user_generated_id', email, role }),
        refreshToken: signRefreshToken({ sub: 'user_generated_id', email, role }),
      },
      passwordHash,
    };
  }

  async login(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    return {
      user: {
        id: 'user_generated_id',
        email,
        role: 'CUSTOMER',
      },
      tokens: {
        accessToken: signAccessToken({ sub: 'user_generated_id', email, role: 'CUSTOMER' }),
        refreshToken: signRefreshToken({ sub: 'user_generated_id', email, role: 'CUSTOMER' }),
      },
      passwordHash,
    };
  }

  refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    return {
      accessToken: signAccessToken({
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
      }),
    };
  }
}
