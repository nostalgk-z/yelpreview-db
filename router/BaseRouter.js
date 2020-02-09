import * as express from "express";
import { ResultCallback } from "../utils/resultsCallback";

/**
*  Router base class
*/
export class BaseRouter {

    router = express.Router();
    
    constructor() {
        this.loadRoutes();
    }
    
    loadRoutes() {}
}