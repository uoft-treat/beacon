import "reflect-metadata";
import * as dotenv from 'dotenv';
import express     from 'express';
import bodyParser  from 'body-parser';
import mongoose    from 'mongoose';
import {schema}    from "./graphql/schema";
import {resolvers} from "./graphql/resolvers";
import {ApolloServer} from "apollo-server-express";
import {authenticationMiddleware} from "./middleware/authenticationMiddleware";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(authenticationMiddleware);

const server = new ApolloServer({
    typeDefs: schema,
    // @ts-ignore
    resolvers: resolvers,
    context: ({req}) => ({
        // @ts-ignore
        user: req.user,
    }),
});

server.applyMiddleware({app, path: "/graphql"});

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected..."));

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => {
    console.log(`App started on port ${PORT}...`);
});
