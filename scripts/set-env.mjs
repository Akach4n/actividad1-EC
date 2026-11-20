import { existsSync, writeFileSync } from 'node:fs';

if (existsSync('.env')) process.loadEnvFile('.env');

const environment = {
  apiKey: process.env.API_KEY ?? '',
};

writeFileSync(
  'src/environments/environment.ts',
  `export const environment = ${JSON.stringify(environment, null, 2)};\n`,
);
