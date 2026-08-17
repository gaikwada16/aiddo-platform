import jwt from 'jsonwebtoken';

export type TokenPayload = {
  sub: string;
  email: string;
  role: string;
};

export function signAccessToken(payload: TokenPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET ?? 'dev-secret-change-me', {
    expiresIn: '1h',
  });
}

export function signRefreshToken(payload: TokenPayload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret-change-me', {
    expiresIn: '7d',
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET ?? 'dev-secret-change-me') as TokenPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret-change-me') as TokenPayload;
}
