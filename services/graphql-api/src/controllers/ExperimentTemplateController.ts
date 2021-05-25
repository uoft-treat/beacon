import Boom                                      from '@hapi/boom';
import {ExperimentTemplate, IExperimentTemplate} from '../models/ExperimentTemplate';

type CreateExperimentTemplateInput = {
    name: string,
    description: string,
    link: string
}

type UpdateExperimentTemplateInput = {
    name?: string,
    description?: string,
    link?: string,
}

export default class ExperimentTemplateController {

    /**
     * Retrieve all templates.
     */
    public static async getAllExperimentTemplates(): Promise<IExperimentTemplate[]> {
        return await ExperimentTemplate.find({});
    }

    /**
     * Create a new experiment template.
     * @param input
     */
    public static async createExperimentTemplate(input: CreateExperimentTemplateInput): Promise<IExperimentTemplate> {
        const template = new ExperimentTemplate({...input});
        await template.save();
        return template;
    }

    /**
     * Update one template.
     * @param id
     * @param input
     */
    public static async updateExperimentTemplate(id: string, input: UpdateExperimentTemplateInput): Promise<IExperimentTemplate> {
        const template = await ExperimentTemplate.findOne({_id: id});
        if (!template) {
            throw Boom.notFound("Cannot find the template.");
        }
        template.set({...input});
        return template;
    }

    /**
     * Delete one template.
     * @param id
     */
    public static async deleteExperimentTemplate(id: string): Promise<boolean> {
        const template = await ExperimentTemplate.findOne({_id: id});
        if (!template) {
            throw Boom.notFound("Cannot find the template.");
        }
        await template.remove();
        return true;
    }

}