import * as path from 'path';
import express = require('express');
import * as dotenv from 'dotenv';

// config to take file .html from fir templates
const dirTemplates = './../templates/';

export default class Routes {

    public baseUrl: string | undefined;

    constructor(NODE_ENV: string = 'dev') {
        dotenv.config();

        switch (NODE_ENV) {
            case 'prod':
                this.baseUrl = process.env.HOST_PROD;
                break;
            case 'dev':
                this.baseUrl = process.env.HOST;
                break;
        }

        if (NODE_ENV === 'dev' || NODE_ENV === 'development') {
            console.log(`baseUrl Query: `, this.baseUrl);
        }
    }

    setHostUrl(host: string) {
        this.baseUrl = host;
    }

    buildResponse = (res: any, statusCode: any, data: any) => {
        res.status(statusCode).json({ result: data });
    };

    defaultRoute(req: express.Request, res: express.Response) {
        res.sendFile(path.join(__dirname + dirTemplates + 'index.html'));
    }

    defaultErrorRoute(req: express.Request, res: express.Response) {
        res.sendFile(path.join(__dirname + dirTemplates + 'error.html'));
    }

    paths(app: express.Application) {

        app.get('/', (req: express.Request, res: express.Response) => {
            this.defaultRoute(req, res);
        });

        app.get('/error', (req: express.Request, res: express.Response) => {
            this.defaultErrorRoute(req, res);
        });

        app.get('/**', (req: express.Request, res: express.Response) => {
            this.defaultErrorRoute(req, res);
        });

    }


}
