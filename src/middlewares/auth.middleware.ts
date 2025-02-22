import config from 'config';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { DataStoredInToken, RequestModified } from '../interfaces/auth.interface';
import prisma from '../utils/prisma';

export const authMiddleware = async (req: RequestModified, res: Response, next: NextFunction) => {
  const Authorization = req.cookies['Authorization'] ||
    (req.header('Authorization') ? req.header('Authorization')?.split('Bearer ')[1] : null);

  if (!Authorization || Authorization === 'undefined') {
    return next();
  }

  try {
    const verification = verify(Authorization, config.get('secretKey')) as DataStoredInToken;
    const findUser = await prisma.user.findFirst({ where: { id: verification._id } });
    if (findUser) {
      req.user = findUser;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send('Something wrong with the server');
  }
};