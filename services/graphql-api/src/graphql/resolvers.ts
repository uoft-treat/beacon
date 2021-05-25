import ExperimentTemplateController from "../controllers/ExperimentTemplateController";
import ExperimentSessionController  from "../controllers/ExperimentSessionController";
import LocalUserController          from "../controllers/LocalUserController";

export const resolvers = {

    Query: {
        experimentTemplates: () => ExperimentTemplateController.getAllExperimentTemplates(),
        me: (_, __, {user}) => user,
        experimentSession: (_, {accessCode}) => ExperimentSessionController.getSessionByAccessCode(accessCode),
        experimentSessions: () => ExperimentSessionController.getAllSessions(),
    },

    Mutation: {
        createExperimentTemplate: (_, {data}) => ExperimentTemplateController.createExperimentTemplate(data),
        updateExperimentTemplate: (_, {id, data}) => ExperimentTemplateController.updateExperimentTemplate(id, data),
        deleteExperimentTemplate: (_, {id}) => ExperimentTemplateController.deleteExperimentTemplate(id),
        createExperimentSession: (_, {data}) => ExperimentSessionController.createExperimentSession(data),
        createExperimentSessionData: (_, {data}) => ExperimentSessionController.createExperimentSessionData(data),
        createLocalUser: (_, {data}) => LocalUserController.createLocalUser(data),
        createLocalUserToken: (_, {data}) => LocalUserController.createLocalUserToken(data),
    },

    ExperimentSession: {
        experimentTemplate: (obj) => ExperimentSessionController.getExperimentTemplate(obj),
        data: (obj) => ExperimentSessionController.getExperimentSessionData(obj),
    }

};
