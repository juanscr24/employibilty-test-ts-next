import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_dev_secret';
const JWT_EXPIRES_IN = '7d';

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return null;
}

export function getAuthPayload(req: NextRequest): JwtPayload | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
