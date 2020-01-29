import { db } from './pg';

export const getUsers = (req, resp) => {
    db.any('select * from users', [true])
      .then( res => console.log(res))
      .catch( err => console.log(err));
}