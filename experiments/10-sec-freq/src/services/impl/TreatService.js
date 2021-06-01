import {ITreatService} from "../ITreatService";
import {LocalKeyValueStorageService} from "./LocalKeyValueStorageService";

let instance;

export class TreatService extends ITreatService {

    constructor(keyValueStorageService) {
        super();
        this.keyValueStorageService = keyValueStorageService;
    }

    setSessionToken(token) {
        this.keyValueStorageService.setItem("TREAT_SESSION", token);
    }

    getSessionToken() {
        return this.keyValueStorageService.getItem("TREAT_SESSION");
    }

    setSurveyData(gender, age) {
        this.keyValueStorageService.setItem("SURVEY_GENDER", gender);
        this.keyValueStorageService.setItem("SURVEY_AGE", age);
    }

    getSurveyData() {
        return {
            gender: this.keyValueStorageService.getItem("SURVEY_GENDER"),
            age: this.keyValueStorageService.getItem("SURVEY_AGE")
        }
    }

    static getInstance() {
        if(!instance) {
            instance = new TreatService(new LocalKeyValueStorageService());
        }
        return instance;
    }


}
