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

        // Query all of the cities in the list of provided states
        this.router.post('/business', (req, resp) => {
            console.log('Business Route Hit.');
            let states = req.body.states;
            let promise;

            if(states) 
            {
                promise = db.business.findCitiesByStates(states);
                promise
                .then( res => resp.send(res))
                .catch( err => console.log(err));
            }
            else{
                resp.send({ code: 105, message: "Invalid post data provided." });
            }
           
        });

        // Query all of the states that have a business in them
        this.router.get('/business/states', (req, resp) => {
            console.log('Business State Route Hit.');
            let promise;

            promise = db.business.allStates();
            promise
            .then( res => resp.send(res))
            .catch( err => {
                console.log(err);
                resp.send({ code: 106, message: "Query did not work" });
            });
        });

        // Query the postal codes given the city
        this.router.get('/business/:city', (req, resp) =>{
            console.log('Business Postal Code Route Hit. ');
            let city = req.params.city;
            let promise;

            if (city){
                promise = db.business.findPostalCodeByCity(city);
                promise
                    .then( res => resp.send(res))
                    .catch( err => console.log(err));
            }
            else{
                resp.send({ code: 105, message: "Invalid post data provided." });
            }
        });

        // Query all of the businesses given a zip code
        this.router.get('/business/list/:postalCode', (req, resp) => {
            console.log('Businesses Code Route Hit');

            let postalCode = req.params.postalCode;
            let promise;
            if (postalCode) {
                promise = db.business.findBusinessByPostalCode(postalCode);
                promise
                    .then ( res => resp.send(res) )
                    .catch ( err => console.log(err) );
            }
            else{
                resp.send({ code: 107, message: "Invalid url param data provided." });
            }
        })

        // Query all of the businesses given the state and city 
        this.router.get('/business/:state/:city', (req, resp) => {
            console.log('Business City Route Hit.');

            let state = req.params.state;
            let city = req.params.city;
            let promise;
            if(state) 
            {
                if(city) 
                {
                    promise = db.business.findByStateAndCity(state, city);
                    promise
                        .then( res => resp.send(res))
                        .catch( err => console.log(err));
                } 
            } 
            else 
            {
                resp.send({ code: 105, message: "Invalid post data provided." });
            }
        });

        // Query the detailf of the given business
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

        this.router.get('/category/:postalCode', (req, resp) => {
            let postalCode = req.params.postalCode;

            db.category.getCategoriesForPostalCode(postalCode).then(result =>{
                resp.send(result);
            });
        });
    }
}

export const businessRouter = new BusinessRouter().router;
