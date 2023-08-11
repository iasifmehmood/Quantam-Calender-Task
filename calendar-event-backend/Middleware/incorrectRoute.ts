import { Request, Response, NextFunction } from 'express';

export const incorrectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ error: 'Please enter the correct route' });
};
