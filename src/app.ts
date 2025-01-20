import bodyParser from 'body-parser';
import compression from 'compression';
import config from 'config';
import express, { Router ,Request, Response,} from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initRoutes } from './routes';


const app = express();
const indexRouter = Router();

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

// app.use('/api/', indexRouter.get('/', (req: Request, res: Response) => {
//   res.send('app is working');
// }))
// port
const port: number = config.get('port') || 9000;



// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} in %s mode ` , app.get('env'));
});