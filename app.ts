import express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as dotenv from "dotenv";
import {User_props} from "./src/users/user_queries";

dotenv.config();

const app: express.Application = express();
const port = 3000;
const httpServer = http.createServer(app);

app.use(bodyParser.json());

app.post('/', (req: express.Request, res: express.Response)=>{
    let data = new User_props(req.body.username);
    data.get_user_data(res);
})

app.post('/create_user', (req: express.Request, res: express.Response)=>{
    let data = new User_props(req.body.user);
    console.log(req.body);
    data.create_user(req.body, res);
})

httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});