import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../lib/jwt.js';

const prisma = new PrismaClient();

type RegisterInput = {
  email: string;
  password: string;
  name: string;
  role?: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
};

export class AuthService {
  async register({ email, password, name, role = 'CUSTOMER' }: RegisterInput) {
    const normalizedEmail = email.toLowerCase();
    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        name,
        role,
      },
    });

    const tokens = {
      accessToken: signAccessToken({ sub: user.id, email: user.email, role: user.role }),
      refreshToken: signRefreshToken({ sub: user.id, email: user.email, role: user.role }),
    };

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      tokens,
      passwordHash,
    };
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const normalizedEmail = email.toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    if (!user || !user.passwordHash) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const tokens = {
      accessToken: signAccessToken({ sub: user.id, email: user.email, role: user.role }),
      refreshToken: signRefreshToken({ sub: user.id, email: user.email, role: user.role }),
    };

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      tokens,
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
