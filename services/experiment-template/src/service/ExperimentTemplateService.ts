import {IExperimentTemplate} from "../model/ExperimentTemplate";

export interface ExperimentTemplateService {

    createNewExperimentTemplate(name: string, description: string, link: string): Promise<IExperimentTemplate>;

    getAllExperimentTemplates(): Promise<IExperimentTemplate[]>;

    getOneExperimentTemplateById(id: string): Promise<IExperimentTemplate>;

    patchOneExperimentTemplateById(id: string, patch: { name?: string, description?: string, link?: string }): Promise<IExperimentTemplate>;

    deleteOneExperimentTemplateById(id: string): Promise<void>;

}