import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
// Go up two directories from /config to the backend root
const __dirname = path.dirname(path.dirname(__filename)); 

dotenv.config({ path: path.resolve(__dirname, './.env') });
