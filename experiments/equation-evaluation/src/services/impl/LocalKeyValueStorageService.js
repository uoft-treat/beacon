
import {IkeyValueStorageService} from "../IkeyValueStorageService";

/**
 * Provides key value storage service using browser's localStorage API.
 */

export class LocalKeyValueStorageService extends IkeyValueStorageService {


    setItem(key, value) {
        localStorage.setItem(key, value);
    }

    getItem(key) {
        return localStorage.getItem(key);
    }

}