import mongoose, {Document, Schema} from 'mongoose';

export interface IExperimentTemplate extends Document {
    _id: mongoose.SchemaTypes.ObjectId,
    name: string,
    description: string,
    link: string,
}

const experimentTemplateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    link: {
        type: String,
        required: true,
    },
});

export const ExperimentTemplate = mongoose.model<IExperimentTemplate>('ExperimentTemplate', experimentTemplateSchema);
