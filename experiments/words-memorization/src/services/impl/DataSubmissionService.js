import {IDataSubmissionService} from "../IDataSubmissionService";
import request                  from "graphql-request";
import {TreatService}           from "./TreatService";

const SUBMISSION_URL = process.env.REACT_APP_SUBMISSION_URL;

let instance;

export class DataSubmissionService extends IDataSubmissionService {

    async submitData(gender, year, program, rate1, rate2) {
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
        jsonData: JSON.stringify({gender, year, program, rate1, rate2})
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