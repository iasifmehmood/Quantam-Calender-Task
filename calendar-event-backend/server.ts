require('dotenv').config();
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import logger from './Logger/logger';
import { errorHandler } from './Middleware/errorHandler';
import eventRoute from './Route/EventRoute';
import { logRequestResponse } from './Middleware/logReqRes';
import { incorrectRoute } from './Middleware/incorrectRoute';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//swagger API Testing
const swaggerJsDocs = YAML.load('./Swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));

// Middleware function to log requests and responses
// app.use(logRequestResponse);

//routes
app.use('/api', eventRoute);

//throw error if route is not correct
app.use(incorrectRoute);

//global error handling
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
