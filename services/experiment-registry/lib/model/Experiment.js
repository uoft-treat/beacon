"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var experimentSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    templateSource: {
        type: String,
        required: true,
    },
    scriptSource: {
        type: String,
        required: true,
    }
});
exports.Experiment = mongoose.model('Experiment', experimentSchema);
