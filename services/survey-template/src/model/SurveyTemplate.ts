import mongoose, {Document, Schema} from 'mongoose';

export interface ISurveyTemplate extends Document {
    _id: mongoose.SchemaTypes.ObjectId,
    name: string,
    description: string,
    questions: {
        surveyQuestionId: string,
        required: boolean,
    }[],
}

const surveyTemplateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    questions: {
        type: [{
            surveyQuestionId: {
                type: String,
                required: true,
            },
            required: {
                type: Boolean,
                required: true,
            }
        }]
    },
});

export const SurveyTemplate = mongoose.model<ISurveyTemplate>('SurveyTemplate', surveyTemplateSchema);
