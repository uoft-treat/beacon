const {GraphQLClient} = require('graphql-request');

module.exports = class RequestUtil {

    static makeAuthClient(token) {
        return new GraphQLClient(process.env.API_ENDPOINT, {
            headers: {
                authorization: token,
            },
        })
    }

};
