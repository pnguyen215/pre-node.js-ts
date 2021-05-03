import * as httpStatus from 'http-status';
import * as path from "path";
import Routes from '../base-s-config/routes';
import * as dotenv from 'dotenv';

class AppService extends Routes {
    // tslint:disable-next-line: no-empty
    constructor() {
        dotenv.config();
        super(process.env.NODE_ENV);
    }

    findAll(req: any, res: any) {
        this.buildResponse(res, httpStatus.OK, 'Write something...!');
    };
}

export default new AppService();