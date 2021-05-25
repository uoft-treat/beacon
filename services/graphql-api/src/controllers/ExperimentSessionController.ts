import Boom                                            from '@hapi/boom';
import {ExperimentTemplate, IExperimentTemplate}       from "../models/ExperimentTemplate";
import {ExperimentSession, IExperimentSession}         from "../models/ExperimentSession";
import {IExperimentSessionData, ExperimentSessionData} from "../models/ExperimentSessionData";


type CreateExperimentSessionInput = {
    experimentTemplateId: string,
}

type CreateExperimentSessionDataInput = {
    experimentSessionId: string,
    jsonData: string
}

export default class ExperimentSessionController {

    /**
     * Create a new experiment session.
     * @param input
     */
    public static async createExperimentSession(input: CreateExperimentSessionInput): Promise<IExperimentSession> {

        const template = await ExperimentTemplate.findOne({_id: input.experimentTemplateId});
        if (!template) {
            throw Boom.notFound("Cannot find the template.");
        }

        const session = new ExperimentSession({
            experimentTemplate: input.experimentTemplateId,
            accessCode: (Math.floor(Math.random() * 899999 + 100000)).toString(),
        });

        await session.save();

        return session;

    }

    /**
     * Fetch template instance from session.
     * @param obj
     */
    public static async getExperimentTemplate(obj: IExperimentSession): Promise<IExperimentTemplate> {
        await obj.populate('experimentTemplate').execPopulate();
        return <IExperimentTemplate>obj.experimentTemplate;
    }

    /**
     * List all data.
     * @param obj
     */
    public static async getExperimentSessionData(obj: IExperimentSession): Promise<IExperimentSessionData[]> {
        return await ExperimentSessionData.find({experimentSession: obj._id});
    }

    /**
     * Create new experiment session.
     * @param input
     */
    public static async createExperimentSessionData(input: CreateExperimentSessionDataInput): Promise<IExperimentSessionData> {
        const session = await ExperimentSession.findOne({_id: input.experimentSessionId});
        if (!session) {
            throw Boom.notFound("Cannot find the session.");
        }

        try {
            JSON.parse(input.jsonData);
        } catch (e) {
            throw Boom.badRequest("Invalid JSON format.");
        }

        const data = new ExperimentSessionData({
            experimentSession: session._id,
            jsonData: input.jsonData,
        });

        await data.save();

        return data;
    }

    /**
     * Get one session by access code.
     * @param code
     */
    public static async getSessionByAccessCode(code: string): Promise<IExperimentSession> {
        const session = await ExperimentSession.findOne({accessCode: code});
        if(!session) {
            throw Boom.notFound("Cannot find the session.");
        }
        return session;
    }

    /**
     * Get all sessions in reverse order (most recent first)
     */
    public static async getAllSessions(): Promise<IExperimentSession[]> {
        const sessions = await ExperimentSession.find({});
        return sessions.reverse();
    }

}