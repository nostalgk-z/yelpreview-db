import { Sequelize } from 'sequelize';

// defaulting pg to enable ssl for all connections
var pg = require('pg');
pg.defaults.ssl = true;

let db;
//when connecting to live database
if (process.env.DATABASE_URL) 
{
    db = new Sequelize('postgres://svfdflwvpwyazx:772c446b026f0a5a4be5dfc3d51a31a262ca59941b89eca8f28d9090e005cc28@ec2-52-203-98-126.compute-1.amazonaws.com:5432/d1p49c41ce1muj');
}
else  // connecting to local host
{
    // need to implement
}

module.exports = db;