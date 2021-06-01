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

    setSurveyData(gender, year, program) {
        this.keyValueStorageService.setItem("SURVEY_GENDER", gender);
        this.keyValueStorageService.setItem("SURVEY_YEAR", year);
        this.keyValueStorageService.setItem("SURVEY_PROGRAM", program);
    }

    setExperiment1Data(rate1){
        this.keyValueStorageService.setItem("RATE1", rate1)
    }



    getSurveyData() {
        return {
            gender: this.keyValueStorageService.getItem("SURVEY_GENDER"),
            year: this.keyValueStorageService.getItem("SURVEY_YEAR"),
            program: this.keyValueStorageService.getItem("SURVEY_PROGRAM"),
        }

    }

    getExperiment1Data(){
        return this.keyValueStorageService.getItem("RATE1")
    }



    static getInstance() {

        if(!instance) {

            instance = new TreatService(new LocalKeyValueStorageService());

        }

        return instance;

    }





}