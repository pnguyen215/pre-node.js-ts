import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from "morgan";
import * as dotenv from 'dotenv';
import Routes from './base-s-config/routes';

class App {
    public app: express.Application;

    private corsOptions = {
        origin: '',
        optionsSuccessStatus: 200
    };

    constructor() {
        dotenv.config();
        this.handleConfigCors(process.env.NODE_ENV);
        this.app = express();
        this.middleware();
        this.globalRoutes();
        this.customRoutes();
    }

    // set cors
    handleConfigCors(_NODE_ENV: any) {
        switch (_NODE_ENV) {
            case 'prod':
                this.corsOptions.origin = `${process.env.HOST_PROD}` + `${process.env.PORT}`;
                break;
            case 'dev':
                this.corsOptions.origin = `${process.env.HOST}` + `${process.env.PORT}`;
                break;
        }
        return this.corsOptions;
    }


    // set global middleware
    middleware() {
        this.app.use(cors(this.corsOptions));
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    }

    // set global routes
    globalRoutes() {
        console.log(this.corsOptions);
        const baseRoutes = new Routes(process.env.NODE_ENV);
        baseRoutes.paths(this.app);

        // this.app.route('/').get(AppService.takeNoAction);
        //  this.app.route('/api/take-first').get(AppService.takeFirst); // post, put, delete, option

    }

    // set custom routes
    customRoutes() {
        console.log('Config new routes here!');

    }
}


export default new App();


