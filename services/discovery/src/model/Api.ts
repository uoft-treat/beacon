import mongoose, {Document, Schema} from 'mongoose';

export interface IApi extends Document {
    _id: mongoose.SchemaTypes.ObjectId,
    name: string,
    endpoints: string[],
}

const apiSchema = new Schema({
    endpoints: {
        type: [String],
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

export const Api = mongoose.model<IApi>('Api', apiSchema);
