import { json } from 'express';
import { indexRouter } from './controllers/index.controller';
import { authMiddleware } from './middlewares/auth.middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';






export function initRoutes(app: any) {
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'REST API',
        version: '0.0.0',
        description: 'kalbe loyalty'
      },
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'x-auth-token',
          scheme: 'bearer',
          in: 'header'
        },
        // security: [{ bearerAuth: [] }]
      }
    },
    apis: ['swagger.yml']
  };

  const specs = swaggerJSDoc(swaggerOptions);


  app.use(json());
  app.use(authMiddleware);
  app.use('/api/', indexRouter);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


}