import express from 'express';
// import { userController } from '../controllers/userController';
import { db } from '../db/index';

/**
* A class representing all user routes
*/
class BusinessRouter {
    constructor(){
        this.router = express.Router();
        this.loadRoutes();
    }


    loadRoutes() {
        console.log('loading business routes...');


        this.router.get('/business', (req, resp) => {
            let state = req.query.state;
            let promise;
            if(state) {
                let city = req.query.city;
                if(city) {
                    promise = db.business.findByStateAndCity(state, city);
                } else {
                    promise = db.business.findByState(state);
                }
            } else {
                promise = db.business.all();
            }

            console.log('Business Route Hit.');

            promise
            .then( res => resp.send(res))
            .catch( err => console.log(err));
        });

        this.router.get('/business_detail/:id', (req, resp) => {
            let id = req.params.id;
            let sameCityPromise = db.business.getNumBusinessesInSameCity(id);
            let sameStatePromise = db.business.getNumBusinessesInSameState(id);
            Promise.all([sameCityPromise, sameStatePromise]).then(result => {
                let {numSameCity, numSameState} = result;
                resp.send({'numSameCity': numSameCity, 'numSameState': numSameState});
            })
        });
    }
}

export const businessRouter = new BusinessRouter().router;
