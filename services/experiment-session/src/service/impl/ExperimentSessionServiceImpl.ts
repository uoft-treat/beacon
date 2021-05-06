import {ExperimentSessionService}              from "../ExperimentSessionService";
import {ExperimentSession, IExperimentSession} from "../../model/ExperimentSession";
import {DiscoveryService}                      from "../DiscoveryService";
import axios                                   from 'axios';
import {ExperimentSessionInputError}           from "../error/ExperimentSessionInputError";
import {ExperimentSessionNotFoundError}        from "../error/ExperimentSessionNotFoundError";

export class ExperimentSessionServiceImpl implements ExperimentSessionService {

    discoveryService: DiscoveryService;

    constructor(discoveryService: DiscoveryService) {
        this.discoveryService = discoveryService;
    }

    /**
     * Create a new session given survey and experiment template IDs.
     * @param surveyTemplateId
     * @param experimentTemplateId
     */
    async createNewExperimentSession(surveyTemplateId: string, experimentTemplateId: string): Promise<IExperimentSession> {

        try {
            await axios.get(
                (await this.discoveryService.resolve('survey-template-service')) + "/surveyTemplates/" + surveyTemplateId,
            );
        } catch (e) {
            if (e.response) {
                if (e.response.status === 400) {
                    throw new ExperimentSessionInputError("Invalid survey template ID format.");
                } else if (e.response.status === 404) {
                    throw new ExperimentSessionNotFoundError("Cannot find survey template.");
                }
            }
            throw e;
        }

        try {
            await axios.get(
                (await this.discoveryService.resolve('experiment-template-service')) + "/experimentTemplates/" + experimentTemplateId,
            );
        } catch (e) {
            if (e.response) {
                if (e.response.status === 400) {
                    throw new ExperimentSessionInputError("Invalid experiment template ID format.");
                } else if (e.response.status === 404) {
                    throw new ExperimentSessionNotFoundError("Cannot find experiment template.");
                }
            }
            throw e;
        }

        let session = new ExperimentSession({
            surveyTemplateId,
            experimentTemplateId,
        });
        await session.save();
        return session;
    }

    /**
     * Remove a session by ID.
     * @param id
     */
    async deleteExperimentSessionById(id: string): Promise<void> {
        let session = await ExperimentSession.findOne({_id: id});
        if (!session) {
            throw new ExperimentSessionNotFoundError("Cannot find experiment session.");
        }
        await session.remove();
        return;
    }

    /**
     * List all sessions.
     */
    async listAllExperimentSessions(): Promise<IExperimentSession[]> {
        return await ExperimentSession.find({});
    }

    /**
     * Get one session by ID.
     * @param id
     */
    async getOneExperimentSessionById(id: string): Promise<IExperimentSession> {
        let session = await ExperimentSession.findOne({_id: id});
        if(!session) {
            throw new ExperimentSessionNotFoundError("Cannot find experiment session.");
        }
        return session;
    }

}