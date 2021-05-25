import * as mongoose from 'mongoose';

export interface IExperimentTemplate extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    name: string,
    description: string,
    link: string,
}

const experimentTemplateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
});

export const ExperimentTemplate = mongoose.model<IExperimentTemplate>('ExperimentTemplate', experimentTemplateSchema);
