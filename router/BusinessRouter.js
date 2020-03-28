import express from 'express';
// import { userController } from '../controllers/userController';
import { db } from '../db/index';
import bodyParser from 'body-parser';

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

        this.router.post('/business', (req, resp) => {
            console.log('Business State Route Hit.');
            let states = req.body.states;
            let promise;

            if(states) 
            {
                promise = db.business.findByStates(states);
            } 
            else 
            {
                promise = db.business.all();
            }

            promise
            .then( res => resp.send(res))
            .catch( err => console.log(err));
        });

        this.router.get('/business/:state/:city', (req, resp) => {
            let state = req.params.state;
            let city = req.params.city;
            let promise;
            if(state) 
            {
                if(city) 
                {
                    promise = db.business.findByStateAndCity(state, city);
                } 
            } 
            else 
            {
                promise = db.business.all();
            }

            console.log('Business City Route Hit.');

            promise
            .then( res => resp.send(res))
            .catch( err => console.log(err));
        });

        this.router.get('/business_detail/:id', (req, resp) => {
            let id = req.params.id;
            let sameCityPromise = db.business.getNumBusinessesInSameCity(id);
            let sameStatePromise = db.business.getNumBusinessesInSameState(id);

            Promise.all([sameCityPromise, sameStatePromise])
            .then(result => {
                let numSameCity = result[0].count;
                let numSameState = result[1].count;
                resp.send({'numSameCity': numSameCity, 'numSameState': numSameState});
            })
            .catch( err => console.log(err))
        });
    }
}

export const businessRouter = new BusinessRouter().router;
