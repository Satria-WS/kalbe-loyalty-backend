import { json } from "express";
import { indexRouter } from "./controllers/index.controller";
import { authMiddleware } from "./middlewares/auth.middleware";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { Application } from "express";

// Wrapper to handle async middleware
import { Request, Response, NextFunction } from "express";


// const asyncMiddleware = (middleware: (req: RequestModified, res: Response, next: NextFunction) => Promise<void> | void) => (req: RequestModified, res: Response, next: NextFunction) => {
//   Promise.resolve(middleware(req, res, next)).catch(next);
// };

export function initRoutes(app: Application) {
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "REST API",
        version: "0.0.0",
        description: "kalbe loyalty",
      },
      securityDefinitions: {
        bearerAuth: {
          type: "apiKey",
          name: "x-auth-token",
          scheme: "bearer",
          in: "header",
        },
        // security: [{ bearerAuth: [] }]
      },
    },
    apis: ["swagger.yml"],
  };

  const specs = swaggerJSDoc(swaggerOptions);

  app.use(json());
   app.use(authMiddleware);
  // app.use(asyncMiddleware(authMiddleware)); // Use the wrapper for async middleware
  app.use("/api/", indexRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
