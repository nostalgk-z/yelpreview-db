import express from "express";
import { db } from '../db/index'


class TipRouter {
    constructor() {
        this.router = express.Router();
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.get('/latestByUser/:userID', (req, resp) => {
            let userID = req.params.userID;

            db.tip.latestByUser(userID).then((res) => {
                resp.send(res);
            })
        });
    }
}

export const tipRouter = new TipRouter().router;