import '@babel/polyfill';
import * as dotenv                 from 'dotenv';
// @ts-ignore
import {default as express}        from 'express';
import * as bodyParser             from 'body-parser';
import mongoose                    from 'mongoose';
import {customErrorHandler}        from "./configuration/customErrorHandler";
import {DiscoveryServiceImpl}      from "./service/impl/DiscoveryServiceImpl";
import {SurveyTemplateServiceImpl} from "./service/impl/SurveyTemplateServiceImpl";
import {SurveyTemplateController}  from "./controller/SurveyTemplateController";

dotenv.config();

const app = express();

// Configure middleware
app.use(bodyParser.json());

// Initialize discovery service
const discoveryService = new DiscoveryServiceImpl(process.env.DISCOVERY_SERVICE_URL);

const surveyTemplateService = new SurveyTemplateServiceImpl(discoveryService);

// Initialize all controllers
const surveyTemplateController = new SurveyTemplateController(surveyTemplateService);

// API routes
app.get("/surveyTemplates", surveyTemplateController.getAllSurveyTemplates);
app.post("/surveyTemplates", surveyTemplateController.createNewSurveyTemplate);
app.get("/surveyTemplates/:id", surveyTemplateController.getOneSurveyTemplate);

// Configure error handler, do not add more config below
app.use(customErrorHandler);

console.log(`Initializing survey template service
  ____ _____                    _       _       
 / ___|_   _|__ _ __ ___  _ __ | | __ _| |_ ___ 
 \\___ \\ | |/ _ \\ '_ \` _ \\| '_ \\| |/ _\` | __/ _ \\
  ___) || |  __/ | | | | | |_) | | (_| | ||  __/
 |____(_)_|\\___|_| |_| |_| .__/|_|\\__,_|\\__\\___|
                         |_|                    
`);

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected..."));

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () => {
    console.log(`App started on port ${PORT}...`);
});
