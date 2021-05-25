const {request}   = require('graphql-request');

module.exports = class ExperimentTemplateService {

    static async getAllTemplates() {
        return (await request(process.env.API_ENDPOINT, `
            {
                experimentTemplates {
                    _id
                    link
                    name
                    description
                }
            }
        `)).experimentTemplates;
    }

};
