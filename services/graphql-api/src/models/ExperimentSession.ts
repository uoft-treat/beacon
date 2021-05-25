import mongoose              from "mongoose";
import {IExperimentTemplate} from "./ExperimentTemplate";

export interface IExperimentSession extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    experimentTemplate: mongoose.Types.ObjectId | IExperimentTemplate | string,
    accessCode: string,
}

const experimentSessionSchema = new mongoose.Schema({
    experimentTemplate: {
        type: mongoose.Types.ObjectId,
        ref: 'ExperimentTemplate',
    },
    accessCode: {
        type: String,
        required: true,
    }
});

export const ExperimentSession = mongoose.model<IExperimentSession>('ExperimentSession', experimentSessionSchema);
