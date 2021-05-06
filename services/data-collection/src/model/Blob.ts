import * as mongoose             from 'mongoose';
import {Collection, ICollection} from "./Collection";

export interface IBlob extends mongoose.Document {
    _id: mongoose.SchemaTypes.ObjectId,
    parentCollection: mongoose.SchemaTypes.ObjectId | ICollection,
    body: string,
}

const blobSchema = new mongoose.Schema({
    parentCollection: {
        type: mongoose.SchemaTypes.ObjectId,
        $ref: Collection,
    },
    body: {
        type: String,
        required: true,
    },
});

export const Blob = mongoose.model<IBlob>('Blob', blobSchema);
