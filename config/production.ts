import 'dotenv/config';

const config = {
  port: process.env.PORT,
  env: 'production',
  secretKey: process.env.SECRET_KEY,
  cors: {
    origin: 'http://localhost:8080',
    credentials: true
  },
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOWMS),
    max: Number(process.env.RATE_LIMIT_MAX)
  },
  jwt: {
    expired: Number(process.env.JWT_EXPIRED)
  }
};

export default config;
