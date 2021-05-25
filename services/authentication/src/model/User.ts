import mongoose, {Document, Schema} from 'mongoose';

export interface IUser extends Document {
    _id: mongoose.SchemaTypes.ObjectId,
    username: string,
    password: string,
    source: UserSourceEnum,
    roles: UserRoleEnum[],
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        required: true,
    },
});

export const User = mongoose.model<IUser>('User', userSchema);

export enum UserSourceEnum {
    LOCAL = "LOCAL",
    REMOTE_IA = "REMOTE_IA",
}

export enum UserRoleEnum {
    ADMIN = "ADMIN",
}
