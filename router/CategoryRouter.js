import express from "express";
import { db } from '../db/index';


class CategoryRouter {
    constructor() {
        this.router = express.Router();
        this.loadRoutes();
    }

    loadRoutes() {
        this.router.get('/byPostalCode/:postalCode', (req, resp) => {
            let postalCode = req.params.postalCode;

            db.category.getCategoriesForPostalCode(postalCode)
                .then(result => {
                    resp.send(result);
                });
        });
    }
}

export const categoryRouter = new CategoryRouter().router;
