import * as dotenv   from 'dotenv';
// @ts-ignore
import * as mongoose from 'mongoose';
import container     from "./inversify.config";
import {RestServer}  from "./web/RestServer";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected..."));

const server = container.get<RestServer>('RestServer');
server.start(() => console.log("Server started..."));
