import "@babel/polyfill";
import * as dotenv                 from 'dotenv';
// @ts-ignore
import {default as express}        from 'express';
import * as bodyParser             from 'body-parser';
import mongoose                    from 'mongoose';
import {SurveyQuestionController}  from "./controller";
import {SurveyQuestionServiceImpl} from "./service/impl";
import {customErrorHandler}        from "./configuration/customErrorHandler";

dotenv.config();

const app = express();

// Configure middleware
app.use(bodyParser.json());

// Initialize all controllers
const surveyQuestionController = new SurveyQuestionController(new SurveyQuestionServiceImpl());

// Insert your routes here
app.get('/surveyQuestions', surveyQuestionController.listAllSurveyQuestions);
app.get('/surveyQuestions/:id', surveyQuestionController.getOneSurveyQuestion);
app.post('/surveyQuestions', surveyQuestionController.createNewSurveyQuestion);
app.delete('/surveyQuestions/:id', surveyQuestionController.deleteOneSurveyQuestion);
app.patch('/surveyQuestions/:id', surveyQuestionController.patchOneSurveyQuestionById);
app.post('/surveyQuestions/:id/lock', surveyQuestionController.lockOneSurveyQuestionById);
app.delete('/surveyQuestions/:id/lock', surveyQuestionController.unlockOneSurveyQuestionById);

// Configure error handler, do not add more config below
app.use(customErrorHandler);

console.log(`Initializing survey question service
  ____   ___                  _   _             
 / ___| / _ \\ _   _  ___  ___| |_(_) ___  _ __  
 \\___ \\| | | | | | |/ _ \\/ __| __| |/ _ \\| '_ \\ 
  ___) | |_| | |_| |  __/\\__ \\ |_| | (_) | | | |
 |____(_)__\\_\\\\__,_|\\___||___/\\__|_|\\___/|_| |_|
                                                
`);

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected..."));

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () => {
    console.log(`App started on port ${PORT}...`);
});
