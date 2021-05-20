"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
// @ts-ignore
var mongoose = require("mongoose");
var inversify_config_1 = require("./inversify.config");
dotenv.config();
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(function () { return console.log("MongoDB connected..."); });
var server = inversify_config_1.default.get('RestServer');
server.start(function () { return console.log("Server started..."); });
