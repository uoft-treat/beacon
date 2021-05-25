const {request}   = require('graphql-request');
const RequestUtil = require('../utilities/RequestUtil');

module.exports = class AuthenticationService {

    static async createUserToken(username, password) {
        return (await request(process.env.API_ENDPOINT, `
            mutation($username: String!, $password: String!) {
              createLocalUserToken(data: {
                username: $username,
                password: $password
              }) {
                body
              }
            }
        `, {username, password})).createLocalUserToken.body;
    }

    static async getMe(token) {
        return (await RequestUtil.makeAuthClient(token).request(`
            {
              me {
                username
                password
                role
              }
            }
        `)).me;
    }

};
