import {NotImplementedError} from "../errors/NotImplementedError";

export class IKeyValueStorageService {

    getItem(key) {
        throw new NotImplementedError();
    }

    setItem(key, value) {
        throw new NotImplementedError();
    }

}
