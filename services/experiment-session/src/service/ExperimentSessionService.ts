import {IExperimentSession} from "../model/ExperimentSession";

export interface ExperimentSessionService {

    createNewExperimentSession(surveyTemplateId: string, experimentTemplateId: string): Promise<IExperimentSession>;

    deleteExperimentSessionById(id: string): Promise<void>;

    listAllExperimentSessions(): Promise<IExperimentSession[]>;

    getOneExperimentSessionById(id: string): Promise<IExperimentSession>;

}
