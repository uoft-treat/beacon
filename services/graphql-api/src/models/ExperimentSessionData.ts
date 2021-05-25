import mongoose             from "mongoose";
import {IExperimentSession} from "./ExperimentSession";

export interface IExperimentSessionData extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    experimentSession: mongoose.Types.ObjectId | IExperimentSession | string,
    jsonData: string,
}

const experimentSessionDataSchema = new mongoose.Schema({
    experimentSession: {
        type: mongoose.Types.ObjectId,
        ref: 'ExperimentSession',
    },
    jsonData: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

export const ExperimentSessionData = mongoose.model<IExperimentSessionData>('ExperimentSessionData', experimentSessionDataSchema);
