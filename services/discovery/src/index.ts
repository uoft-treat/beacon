import '@babel/polyfill';
import * as dotenv           from 'dotenv';
// @ts-ignore
import {default as express}  from 'express';
import * as bodyParser       from 'body-parser';
import mongoose              from 'mongoose';
import {customErrorHandler}  from "./configuration/customErrorHandler";
import {ApiServiceImpl}      from "./service/impl/ApiServiceImpl";
import {ApiController}       from "./controller/ApiController";
import * as path             from 'path';
import {DashboardController} from "./controller/DashboardController";

dotenv.config();

const app = express();

// Configure middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/view'));

// Initialize all controllers
const apiController = new ApiController(new ApiServiceImpl());
const dashboardController = new DashboardController(new ApiServiceImpl());

// API routes
app.get("/ping", (req, res) => res.send("pong"));
app.post("/apis", apiController.createNewApi);
app.get("/apis", apiController.listAllApis);
app.get("/apis/:name", apiController.getOneApiByName);
app.delete("/apis/:name", apiController.removeoneApiByName);
app.get("/apis/:name/endpoints", apiController.getOneApiEndpointsByName);
app.post("/apis/:name/endpoints", apiController.addOneEndpointToApiByName);
app.delete("/apis/:name/endpoints/:endpoint", apiController.removeOneEndpointFromApiByName);

// Web routes
app.get("/dashboard", dashboardController.getDashboardHome);
app.post("/dashboard/addApi", dashboardController.addNewApi);
app.post("/dashboard/removeApi", dashboardController.removeApi);
app.post("/dashboard/addEndpoint", dashboardController.addNewEndpointToApi);
app.post("/dashboard/removeEndpoint", dashboardController.removeEndpointFromApi);

// Configure error handler, do not add more config below
app.use(customErrorHandler);

console.log(`Initializing discovery service
  ____  _                                   
 |  _ \\(_)___  ___ _____   _____ _ __ _   _ 
 | | | | / __|/ __/ _ \\ \\ / / _ \\ '__| | | |
 | |_| | \\__ \\ (_| (_) \\ V /  __/ |  | |_| |
 |____/|_|___/\\___\\___/ \\_/ \\___|_|   \\__, |
                                      |___/ 
`);

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected..."));

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`App started... visit http://localhost:${PORT}/dashboard to see a list of endpoints.`);
});
