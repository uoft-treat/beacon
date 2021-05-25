import mongoose, {Document, Schema} from 'mongoose';
import {IUser}                      from "./User";

export interface IUserToken extends Document {
    _id: mongoose.SchemaTypes.ObjectId,
    user: mongoose.SchemaTypes.ObjectId | IUser,
    body: string,
}

const userTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
});

export const UserToken = mongoose.model<IUserToken>('UserToken', userTokenSchema);
