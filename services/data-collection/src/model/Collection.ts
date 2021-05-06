import * as mongoose from 'mongoose';

export interface ICollection extends mongoose.Document {
    _id: mongoose.SchemaTypes.ObjectId,
    jsonSchema: string,
}

const collectionSchema = new mongoose.Schema({
    jsonSchema: {
        type: String,
        required: false,
    },
});

export const Collection = mongoose.model<ICollection>('Collection', collectionSchema);
