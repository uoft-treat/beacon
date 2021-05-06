import * as dotenv from 'dotenv';
// @ts-ignore
import {default as express} from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {MessageController} from "./controller";
import {MessageServiceImpl} from "./service/impl";

dotenv.config();

const app = express();

// Configure middleware
app.use(bodyParser.json());

// Initialize all controllers
const messageController = new MessageController(new MessageServiceImpl());

// Insert your routes here
app.post("/messages", messageController.createNewMessage);
app.get("/messages", messageController.listAllMessages);

// Configure error handler, do not add more config below
app.use((err, req, res, next) => {
    return res.status(err.output.statusCode).json(err.output.payload);
});

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected..."));

app.listen(process.env.PORT || 3000, () => {
    console.log("App started...");
});
