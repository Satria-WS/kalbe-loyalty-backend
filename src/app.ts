import bodyParser from 'body-parser';
import compression from 'compression';
import config from 'config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initRoutes } from './routes';

const app = express();


const limiter = rateLimit({
  windowMs: config.get('rateLimit.windowMs'),
  max: config.get('rateLimit.max'),
  standardHeaders: true,
  legacyHeaders:false
})
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
app.use(cookieParser());

// route
initRoutes(app);
// port
const port: number = config.get('port') || 9000;



// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} in %s mode ` , app.get('env'));
});