import mongoose from "mongoose";
import pbkdf2   from 'pbkdf2';

const SALT = 'eqwoxaiu9(!xc';

export interface ILocalUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId,
    username: string,
    password: string,
    role: string,

    setPassword(password: string): void,

    checkPassword(password: string): boolean,
}

const localUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
});

localUserSchema.method('setPassword', function (password: string): void {
    this.password = pbkdf2.pbkdf2Sync(password, SALT, 1, 32, 'sha512').toString('hex');
});

localUserSchema.method('checkPassword', function (password: string): boolean {
    const hashed = pbkdf2.pbkdf2Sync(password, SALT, 1, 32, 'sha512').toString('hex');
    return hashed === this.password;
});

export const LocalUser = mongoose.model<ILocalUser>('LocalUser', localUserSchema);
