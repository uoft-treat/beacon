import {ILocalUser}  from "./LocalUser";
import mongoose from "mongoose";


export interface ILocalUserToken extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    body: string,
    localUser: ILocalUser | mongoose.Types.ObjectId | string,
}

const localUserTokenSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    localUser: {
        type: mongoose.Types.ObjectId,
        ref: 'LocalUser',
        required: true,
    }
});

export const LocalUserToken = mongoose.model<ILocalUserToken>('LocalUserToken', localUserTokenSchema);
