import {gql} from 'apollo-server-express';

export const schema = gql`

    type Query {
        experimentTemplates: [ExperimentTemplate]
        experimentSession(accessCode: String!): ExperimentSession
        experimentSessions: [ExperimentSession]
        me: LocalUser
    }

    type Mutation {
        createExperimentTemplate(data: CreateExperimentTemplateInput!): ExperimentTemplate
        updateExperimentTemplate(id: String!, data: UpdateExperimentTemplateInput!): ExperimentTemplate
        deleteExperimentTemplate(id: String!): Boolean
        createExperimentSession(data: CreateExperimentSessionInput): ExperimentSession
        createExperimentSessionData(data: CreateExperimentSessionDataInput): ExperimentSessionData
        createLocalUser(data: CreateLocalUserInput): LocalUser
        createLocalUserToken(data: CreateLocalUserTokenInput): LocalUserToken
    }

    #MARK: ExperimentTemplate
    type ExperimentTemplate {
        _id: String
        name: String
        description: String
        link: String
    }

    input CreateExperimentTemplateInput {
        name: String!
        description: String!
        link: String!
    }

    input UpdateExperimentTemplateInput {
        name: String
        description: String
        link: String
    }

    #MARK: ExperimentSession
    type ExperimentSession {
        _id: String
        experimentTemplate: ExperimentTemplate
        accessCode: String
        data: [ExperimentSessionData]
    }

    input CreateExperimentSessionInput {
        experimentTemplateId: String!
    }

    #MARK: LocalUser
    type LocalUser {
        _id: String
        username: String
        password: String
        role: UserRole
    }

    type LocalUserToken {
        body: String
    }

    enum UserRole {
        ADMIN
    }

    input CreateLocalUserInput {
        username: String!
        password: String!
        role: UserRole!
    }

    input CreateLocalUserTokenInput {
        username: String!
        password: String!
    }

    #MARK: ExperimentSessionData
    type ExperimentSessionData {
        experimentSession: ExperimentSession
        jsonData: String
        createdAt: String
    }

    input CreateExperimentSessionDataInput {
        experimentSessionId: String!
        jsonData: String!
    }

`;
