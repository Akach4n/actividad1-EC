// Genera src/environments/environment.ts a partir de las variables del .env
import { existsSync, writeFileSync } from 'node:fs';

if (existsSync('.env')) process.loadEnvFile('.env');

const environment = {
  apiKey: process.env.API_KEY ?? '',
};

writeFileSync(
  'src/environments/environment.ts',
  `// Archivo generado automáticamente por scripts/set-env.mjs. No editar a mano.\nexport const environment = ${JSON.stringify(environment, null, 2)};\n`,
);
