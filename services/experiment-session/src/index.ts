import '@babel/polyfill';
import * as dotenv                    from 'dotenv';
// @ts-ignore
import {default as express}           from 'express';
import * as bodyParser                from 'body-parser';
import mongoose                       from 'mongoose';
import {customErrorHandler}           from "./configuration/customErrorHandler";
import {DiscoveryServiceImpl}         from "./service/impl/DiscoveryServiceImpl";
import {ExperimentSessionServiceImpl} from "./service/impl/ExperimentSessionServiceImpl";
import {ExperimentSessionController}  from "./controller/ExperimentSessionController";

dotenv.config();

const app = express();

// Configure middleware
app.use(bodyParser.json());

// Initialize discovery service
const discoveryService = new DiscoveryServiceImpl(process.env.DISCOVERY_SERVICE_URL);

const experimentSessionService = new ExperimentSessionServiceImpl(discoveryService);

// Initialize all controllers
const experimentSessionController = new ExperimentSessionController(experimentSessionService);

// API routes
app.get("/experimentSessions", experimentSessionController.listExperimentSessions);
app.post("/experimentSessions", experimentSessionController.createNewExperimentSession);
app.get("/experimentSessions/:id", experimentSessionController.getOneExperimentSession);
app.delete("/experimentSessions/:id", experimentSessionController.deleteExperimentSession);

// Configure error handler, do not add more config below
app.use(customErrorHandler);

console.log(`Initializing experiment session service
  _____   ____                _             
 | ____| / ___|  ___  ___ ___(_) ___  _ __  
 |  _|   \\___ \\ / _ \\/ __/ __| |/ _ \\| '_ \\ 
 | |___ _ ___) |  __/\\__ \\__ \\ | (_) | | | |
 |_____(_)____/ \\___||___/___/_|\\___/|_| |_|
                                            
`);

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected..."));

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () => {
    console.log(`App started on port ${PORT}...`);
});
