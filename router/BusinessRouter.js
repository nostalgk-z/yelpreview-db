import * as mongoose from 'mongoose';
import { BaseRouter } from './baseRouter';
import { HttpStatus, MappedErrors } from '../utils/mappedErrors';
import { FoldrError } from '../utils/foldrError';
import * as jwt from "jsonwebtoken";
import { userController } from '../controllers/userController';
import { IUserModel } from '../models/userModel';

/**
* A class representing all user routes
*/
class UserRoute extends BaseRouter {

    loadRoutes() {
        console.log('loading user routes...');
        this.router.post('/signup', (req, res) => {
            console.log('Signup Route Hit.');
        });
    }
}