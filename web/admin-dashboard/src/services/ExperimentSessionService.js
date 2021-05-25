const {request} = require('graphql-request');

module.exports = class ExperimentSessionService {
    static async createNewSession(experimentTemplateId) {

        return (await request(process.env.API_ENDPOINT, `
            mutation($experimentTemplateId: String!) {
              createExperimentSession(data: {
                experimentTemplateId: $experimentTemplateId
              }) {
                _id
                accessCode
                experimentTemplate {
                  _id
                  name
                }
              }
            }
        `, {experimentTemplateId})).createExperimentSession;

    }

    static async getSessionByAccessCode(accessCode) {
        return (await request(process.env.API_ENDPOINT, `
            query($accessCode: String!) {
                experimentSession(accessCode: $accessCode) {
                    _id
                    accessCode
                    experimentTemplate {
                        name
                    }
                    data {
                        jsonData
                        createdAt
                    }
                }
            }
        `, {accessCode})).experimentSession;
    }

    static async getAllSessions() {
        return (await request(process.env.API_ENDPOINT, `
            query {
                experimentSessions {
                    _id
                    accessCode
                    experimentTemplate {
                        name
                    }
                    data {
                        jsonData
                        createdAt
                    }
                }
            }
        `)).experimentSessions;
    }
};
