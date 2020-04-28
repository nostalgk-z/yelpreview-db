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

        this.router.put('/setLocation/:userID/:latitude/:longitude', (req, resp) => {
            let userID = req.params.userID;
            let latitude = req.params.latitude;
            let longitude = req.params.longitude;
            db.user.updateLocation(userID, latitude, longitude)
        })
    }
}

export const userRouter = new UserRouter().router;
