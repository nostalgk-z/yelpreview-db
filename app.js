import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
// import { userRouter } from  './routers/userRouter';
import * as path from 'path';
import { businessRouter } from './router/BusinessRouter';
import { db } from './db/index';
import * as cors from 'cors';


// establish connection to db

const app = express();


class YelpReview{
    constructor(){
        this.setup();
        this.loadRoutes();
    }

    setup(){
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(express.static(path.join(__dirname, 'public')));

        // create tables
        db.business.create();
        db.users.create();
        db.category.create();
        db.hasCategory.create();
        db.checkIn.create();

        app.disable('etag');  // Prevents 304 errors
    }

    loadRoutes(){
        app.use('/', businessRouter);
        app.get('/business/add/:name/:state/:city', req => {
            // TODO :: implement logic for getting a JSON in req.body
            
            return db.task('add-business', async t => {
                const biz = await t.business.findByName(req.params.name);
                return biz || t.business.add(req.params);
            });
        });

        //db.business.milestone1db();
    }


    listen(port){
        // use env port or specified port
        const configPort = process.env.PORT || port;  
        
        //create our server and listen on configPort
        http.createServer(app).listen(configPort, () => {
            console.log('App listening on port ' +  configPort);
        });
    }
}

export default YelpReview;