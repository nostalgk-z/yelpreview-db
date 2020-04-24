import express from "express";
import { db } from '../db/index'


class FriendRouter {
    constructor() {
        this.router = express.Router();
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.get('/friendsOf/:userID', (req, resp) => {
            let userID = req.params.userID;

            db.friend.friendsOf(userID).then((res) => {
                resp.send(res);
            })
        });
    }
}

export const friendRouter = new FriendRouter().router;