import '@babel/polyfill';
import * as dotenv            from 'dotenv';
// @ts-ignore
import {default as express}   from 'express';
import * as bodyParser        from 'body-parser';
import mongoose               from 'mongoose';
import {UserController}       from "./controller/UserController";
import {UserServiceImpl}      from "./service/impl/UserServiceImpl";
import {UserTokenController}  from "./controller/UserTokenController";
import {UserTokenServiceImpl} from "./service/impl/UserTokenServiceImpl";

dotenv.config();

const app = express();

// Configure middleware
app.use(bodyParser.json());

// Initialize all controllers
const userController = new UserController(new UserServiceImpl());
const userTokenController = new UserTokenController(new UserTokenServiceImpl());

// Insert your routes here
app.post("/users", userController.createNewUser);
app.get("/users", userController.getAllUsers);
app.post("/tokens", userTokenController.createNewUserToken);
app.get("/tokens/:body", userTokenController.getUserByToken);

// Configure error handler, do not add more config below
app.use((err, req, res, next) => {
    return res.status(err.output.statusCode).json(err.output.payload);
});

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected..."));

app.listen(process.env.PORT || 3000, () => {
    console.log("App started...");
});
