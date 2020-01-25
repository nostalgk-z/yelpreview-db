import { Pool } from 'pg';
import { user, password, database, port, host } from './config';

export const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
});