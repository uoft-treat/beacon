import mongoose, {Document, Schema} from 'mongoose';

export interface IMessage extends Document {
    _id: mongoose.SchemaTypes.ObjectId,
    message: string,
}

const messageSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
});

export const Message = mongoose.model<IMessage>('Message', messageSchema);
