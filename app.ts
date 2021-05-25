import express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as dotenv from "dotenv";
import {User_props} from "./src/users/user";
import {Okex_requests} from "./src/okex_api/okex_api_requests";

dotenv.config();

const app: express.Application = express();
const port = 3000;
const httpServer = http.createServer(app);

app.use(bodyParser.json());

app.get('/get_user_data', (req: express.Request, res: express.Response)=>{
    let data = new User_props();
    if(req.headers.authorization){
        data.get_user_data(res, req.headers.authorization);
    }
    else{
        res.send('No JWT provided');
    }
});

app.post('/create_user', (req: express.Request, res: express.Response)=>{
    let data = new User_props();
    data.create_user(req.body, res);
});

app.get('/verify_api', (req: express.Request, res: express.Response)=>{
    if(req.headers.authorization && req.headers.secretkey){
        let data = new User_props();
        data.authenticate(res, req.headers.authorization);
        let okex = new Okex_requests(req.body, req.headers.secretkey as string);
        okex.verify_login();
    }
    else{
        res.send('No JWT or APIkey provided');
    }
});



httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});