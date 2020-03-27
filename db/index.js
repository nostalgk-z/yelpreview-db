import { user, password, database, port, host } from '../config';
import UserRepository from './repos/users';
import BusinessRepository from './repos/business';
import CategoryRepository from './repos/category';
import HasCategoryRepository from './repos/hascategory';
import CheckInRepository from './repos/checkin';
import TipRepository from './repos/tip';
import FriendRepository from './repos/friend';
import HoursRepository from './repos/hours';
const pgPromise = require('pg-promise');

const initOptions = {
    extend(obj, dc) {
        obj.users = new UserRepository(obj,pgp);
        obj.business = new BusinessRepository(obj,pgp);
        obj.category = new CategoryRepository(obj, pgp);
        obj.hasCategory = new HasCategoryRepository(obj, pgp);
        obj.checkIn = new CheckInRepository(obj, pgp);
        obj.tip = new TipRepository(obj, pgp);
        obj.friend = new FriendRepository(obj, pgp);
        obj.hours = new HoursRepository(obj, pgp);
    }
}

const config = {
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
};

export const pgp = pgPromise(initOptions);
export const db = pgp(config);