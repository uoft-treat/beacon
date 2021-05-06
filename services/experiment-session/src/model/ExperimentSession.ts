import mongoose, {Document, Schema} from 'mongoose';

export interface IExperimentSession extends Document {
    _id: mongoose.SchemaTypes.ObjectId,
    surveyTemplateId: string,
    experimentTemplateId: string,
    createdAt: Date,
    updatedAt: Date,
}

const experimentSessionSchema = new Schema({
    surveyTemplateId: String,
    experimentTemplateId: String,
}, {
    timestamps: true,
});

export const ExperimentSession = mongoose.model<IExperimentSession>('ExperimentSession', experimentSessionSchema);
