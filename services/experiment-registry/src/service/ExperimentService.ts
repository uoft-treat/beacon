import {IExperiment} from "../model/Experiment";

export interface ExperimentService {

    createNewExperiment(name: string, author: string, templateSource: string, scriptSource: string): Promise<IExperiment>;

    getAllExperiments(): Promise<IExperiment[]>;

    getExperimentByUuid(uuid: string): Promise<IExperiment>;

    updateExperiment(uuid: string, name: string, author: string, templateSource: string, scriptSource: string): Promise<IExperiment>;

}
