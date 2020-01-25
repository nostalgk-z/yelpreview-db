import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Http2ServerRequest } from 'http2';

export const app = express();

class YelpReview{
    constructor(){
        this.setup();
        // this.loadRoutes();
    }

    setup(){
        app.use(cors());
        app.options('*', cors());
        app.use(bodyParser.json());
        app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
    }

    listen(port){
        // use env port or specified port
        let configPort = process.env.PORT || port;  
        app.listen(configPort, () => {
            console.log('Listening on port ${configPort}');
        })
    }
}

export default YelpReview;