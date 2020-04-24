import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import { userRouter } from  './router/UserRouter';
import * as path from 'path';
import { businessRouter } from './router/BusinessRouter';
import { db } from './db/index';
import * as cors from 'cors';
import { categoryRouter } from "./router/CategoryRouter";
import {tipRouter} from "./router/TipRouter";
import {friendRouter} from "./router/FriendRouter";


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
        db.user.create();
        db.category.create();
        db.hasCategory.create();
        db.checkIn.create();
        db.tip.create();
        db.friend.create();
        db.hours.create();

        app.disable('etag');  // Prevents 304 errors
    }

    loadRoutes(){
        app.use('/business', businessRouter);
        app.use('/user', userRouter);
        app.use('/category', categoryRouter);
        app.use('/tip', tipRouter);
        app.use('/friend', friendRouter);
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