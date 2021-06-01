import {IDataSubmissionService} from "../IDataSubmissionService";
import request                  from "graphql-request";
import {TreatService}           from "./TreatService";

const SUBMISSION_URL = process.env.REACT_APP_SUBMISSION_URL;

let instance;

export class DataSubmissionService extends IDataSubmissionService {

    async submitData(gender, age, timesPressed) {
        await request(SUBMISSION_URL, `
            mutation($experimentSessionId: String!, $jsonData: String!) {
              createExperimentSessionData(data: {
                experimentSessionId: $experimentSessionId,
                jsonData: $jsonData
              }) {
                createdAt
              }
            }
        `, {
            experimentSessionId: TreatService.getInstance().getSessionToken(),
            jsonData: JSON.stringify({gender, age, timesPressed})
        });

        console.log("Data saved!...");
    }

    static getInstance() {
        if (!instance) {
            instance = new DataSubmissionService();
        }
        return instance;
    }

}
