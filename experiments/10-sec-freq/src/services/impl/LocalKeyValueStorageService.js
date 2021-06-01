import {IKeyValueStorageService} from "../IKeyValueStorageService";

/**
 * Provides key value storage service using browser's localStorage API.
 */
export class LocalKeyValueStorageService extends IKeyValueStorageService {

    setItem(key, value) {
        localStorage.setItem(key, value);
    }

    getItem(key) {
        return localStorage.getItem(key);
    }

}
