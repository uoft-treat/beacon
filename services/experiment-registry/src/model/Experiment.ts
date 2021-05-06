import * as mongoose from 'mongoose';

export interface IExperiment extends mongoose.Document {
    _id: mongoose.SchemaTypes.ObjectId,
    uuid: string,
    name: string,
    author: string,
    templateSource: string,
    scriptSource: string,
}

const experimentSchema = new mongoose.Schema({
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

export const Experiment = mongoose.model<IExperiment>('Experiment', experimentSchema);
