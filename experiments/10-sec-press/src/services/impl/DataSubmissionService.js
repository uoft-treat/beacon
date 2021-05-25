import {IDataSubmissionService} from "../IDataSubmissionService";
import request                  from "graphql-request";
import {TreatService}           from "./TreatService";

const SUBMISSION_URL = "http://localhost:3060/graphql";

let instance;

export class DataSubmissionService extends IDataSubmissionService {


    async submitData(gender, age, pressTime) {
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
            jsonData: JSON.stringify({gender, age, pressTime})
        });
    }

    static getInstance() {
        if(!instance) {
            instance = new DataSubmissionService();
        }
        return instance;
    }

}
