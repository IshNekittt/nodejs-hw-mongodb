import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import 'dotenv/config';

import { getEnvVar } from './utils/getEnvVar.js';

export function setupServer() {
  const PORT = Number(getEnvVar('PORT', '3000'));

  const app = express();
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('*', (_, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
