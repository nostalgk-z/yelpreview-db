import express from "express";

/**
*  Router base class
*/
export class BaseRouter {

    constructor() {
        this.loadRoutes();
        this.router = express.Router();
    }

    loadRoutes() {
        return
    }
}