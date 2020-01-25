import { pool } from './pg';

export const getUsers = (req, resp) => {
    pool.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.log(err);
        }
        else{
            console.log(res.rows);
        }
    })
}