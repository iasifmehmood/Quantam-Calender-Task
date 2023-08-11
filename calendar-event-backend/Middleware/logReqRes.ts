import { log } from 'console';
import logger from '../Logger/logger';
import { Request, Response, NextFunction } from 'express';

export const logRequestResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the request method, URL, and body

  logger.info(
    `Request - Method: ${req.method}, URL: ${
      req.originalUrl
    }, Body: ${JSON.stringify(req.body)}`
  );

  // Capture the response's end method to log the response
  const originalEnd = res.end;
  res.end = function (this: any, chunk?: any): any {
    // Log the response status code and body
    logger.info(`Response - Status: ${res.statusCode}, Body: ${chunk}`);

    // Call the original end method to finish the response
    originalEnd.apply(this, arguments as any);
  };

  // Call the next middleware function
  next();
};
