import mongoose, {Document, Schema} from 'mongoose';

export interface ISurveyQuestion extends Document {
    _id: mongoose.SchemaTypes.ObjectId,
    title: string,
    description?: string,
    questionType: string,
    choices?: string[],
    lockedAt: Date,
    createdAt: Date,
    updatedAt: Date,
}

const surveyQuestionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    questionType: {
        type: String,
        required: true,
    },
    choices: {
        type: [String],
    },
    lockedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

export const SurveyQuestion = mongoose.model<ISurveyQuestion>('SurveyQuestion', surveyQuestionSchema);
