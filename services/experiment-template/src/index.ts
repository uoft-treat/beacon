import '@babel/polyfill';
import * as dotenv                     from 'dotenv';
// @ts-ignore
import {default as express}            from 'express';
import * as bodyParser                 from 'body-parser';
import mongoose                        from 'mongoose';
import {customErrorHandler}            from "./configuration/customErrorHandler";
import {DiscoveryServiceImpl}          from "./service/impl/DiscoveryServiceImpl";
import {ExperimentTemplateServiceImpl} from "./service/impl/ExperimentTemplateServiceImpl";
import {ExperimentTemplateController}  from "./controller/ExperimentTemplateController";

dotenv.config();

const app = express();

// Configure middleware
app.use(bodyParser.json());

// Initialize discovery service
const discoveryService = new DiscoveryServiceImpl(process.env.DISCOVERY_SERVICE_URL);

const experimentTemplateService = new ExperimentTemplateServiceImpl();

// Initialize all controllers
const experimentTemplateController = new ExperimentTemplateController(experimentTemplateService);

// API routes
app.get("/experimentTemplates", experimentTemplateController.getAllTemplates);
app.post("/experimentTemplates", experimentTemplateController.createNewTemplate);
app.get("/experimentTemplates/:id", experimentTemplateController.getOneTemplate);
app.patch("/experimentTemplates/:id", experimentTemplateController.patchOneTemplate);
app.delete("/experimentTemplates/:id", experimentTemplateController.deleteOneTemplate);

// Configure error handler, do not add more config below
app.use(customErrorHandler);

console.log(`Initializing experiment template service
  _____ _____                    _       _       
 | ____|_   _|__ _ __ ___  _ __ | | __ _| |_ ___ 
 |  _|   | |/ _ \\ '_ \` _ \\| '_ \\| |/ _\` | __/ _ \\
 | |___ _| |  __/ | | | | | |_) | | (_| | ||  __/
 |_____(_)_|\\___|_| |_| |_| .__/|_|\\__,_|\\__\\___|
                          |_|                    
`);

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected..."));

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () => {
    console.log(`App started on port ${PORT}...`);
});
