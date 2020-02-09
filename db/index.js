import { user, password, database, port, host } from '../config';
const pgp = require('pg-promise')();

const config = {
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
};

export const db = pgp(config);