import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  companyId?: string;
}

/**
 * Middleware to authenticate requests using API key
 * API key should be provided in the X-API-Key header
 */
export const authenticateApiKey = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'API key is required. Please provide X-API-Key header.',
      });
      return;
    }

    // Find company by API key
    const company = await prisma.company.findUnique({
      where: { apiKey },
      select: { id: true, isActive: true },
    });

    if (!company) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid API key.',
      });
      return;
    }

    if (!company.isActive) {
      res.status(403).json({
        error: 'Forbidden',
        message: 'Company account is inactive.',
      });
      return;
    }

    // Attach company ID to request
    req.companyId = company.id;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Authentication failed.',
    });
  }
};

/**
 * Optional authentication middleware - doesn't fail if no API key provided
 */
export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const apiKey = req.headers['x-api-key'] as string;

    if (apiKey) {
      const company = await prisma.company.findUnique({
        where: { apiKey },
        select: { id: true, isActive: true },
      });

      if (company && company.isActive) {
        req.companyId = company.id;
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth error:', error);
    next();
  }
};
