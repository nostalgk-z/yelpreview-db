import express from "express";
import { db } from '../db/index';


class UserRouter {
    constructor() {
        this.router = express.Router();
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.get('/byName/:name', (req, resp) => {
            let name = req.params.name;
            db.user.findByName(name)
                .then((users) => resp.send(users))
                .catch(err => console.log(err));
        })
    }
}

export const userRouter = new UserRouter().router;
