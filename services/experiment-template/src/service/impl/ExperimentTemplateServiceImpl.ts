import {ExperimentTemplateService}               from "../ExperimentTemplateService";
import {ExperimentTemplate, IExperimentTemplate} from "../../model/ExperimentTemplate";
import {ExperimentTemplateInputError}            from "../error/ExperimentTemplateInputError";
import {ExperimentTemplateNotFoundError}         from "../error/ExperimentTemplateNotFoundError";

export class ExperimentTemplateServiceImpl implements ExperimentTemplateService {

    /**
     * Create a new template.
     * @param name
     * @param description
     * @param link
     */
    async createNewExperimentTemplate(name: string, description: string, link: string): Promise<IExperimentTemplate> {

        if (!name) {
            throw new ExperimentTemplateInputError("You must provide a name.");
        }
        if (!link) {
            throw new ExperimentTemplateInputError("You must provide a link.");
        }

        let template = new ExperimentTemplate({name, description, link});
        await template.save();
        return template;

    }

    /**
     * Get all templates in system.
     */
    async getAllExperimentTemplates(): Promise<IExperimentTemplate[]> {
        return await ExperimentTemplate.find({});
    }

    /**
     * Get one template by ID.
     * @param id
     */
    async getOneExperimentTemplateById(id: string): Promise<IExperimentTemplate> {
        let template = await ExperimentTemplate.findOne({_id: id});
        if (!template) {
            throw new ExperimentTemplateNotFoundError("Experiment template cannot be found.");
        }
        return template;
    }

    /**
     * Update one template by ID.
     * @param id
     * @param patch
     */
    async patchOneExperimentTemplateById(id: string, patch: { name?: string; description?: string; link?: string }): Promise<IExperimentTemplate> {
        let template = await ExperimentTemplate.findOne({_id: id});
        if (!template) {
            throw new ExperimentTemplateNotFoundError("Experiment template cannot be found.");
        }
        template.set(patch);
        await template.save();
        return template;
    }

    /**
     * Delete one template by ID.
     * @param id
     */
    async deleteOneExperimentTemplateById(id: string): Promise<void> {
        let template = await ExperimentTemplate.findOne({_id: id});
        if (!template) {
            throw new ExperimentTemplateNotFoundError("Experiment template cannot be found.");
        }
        await template.remove();
        return;
    }

}