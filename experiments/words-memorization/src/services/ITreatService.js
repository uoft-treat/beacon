import {NotImplementedError} from "../errors/NotImplementedError";

export class ITreatService {

    setSessionToken(token) {
        throw new NotImplementedError();
    }

    getSessionToken() {
        throw new NotImplementedError();
    }

}