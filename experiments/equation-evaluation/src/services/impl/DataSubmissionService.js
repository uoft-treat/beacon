import {IDataSubmissionService} from "../IDataSubmissionService";
import axios from 'axios';

const SUBMISSION_URL = "http://localhost:3059/api/data";

let instance;

export class DataSubmissionService extends IDataSubmissionService {

    async submitData(gender, year, program, rate1, rate2) {

        await axios.post(
            SUBMISSION_URL,
            {
                name: "Word Memorization Experiment",
                data: JSON.stringify({gender, year, program, rate1, rate2})
            }
        );
        console.log("Data saved!...");
    }

    static getInstance() {
        if(!instance) {
            instance = new DataSubmissionService();
        }
        return instance;
    }
}