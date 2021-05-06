import {injectable}        from "inversify";
import * as uuid           from 'uuid/v4';
import * as Boom           from '@hapi/boom';
import {ExperimentService} from "../ExperimentService";
import {IExperiment, Experiment}       from "../../model/Experiment";

@injectable()
export class ExperimentServiceImpl implements ExperimentService {

    async createNewExperiment(name: string, author: string, templateSource: string, scriptSource: string): Promise<IExperiment> {
        try {
            let experiment = new Experiment({
                uuid: uuid(),
                name, author, templateSource, scriptSource,
            });
            await experiment.save();
            return experiment;
        } catch (e) {
            console.log(e);
            throw Boom.badRequest("Invalid request, please make sure you have all fields required.");
        }
    }

    async getAllExperiments(): Promise<IExperiment[]> {
        return await Experiment.find({});
    }

    async getExperimentByUuid(uuid: string): Promise<IExperiment> {
        let experiment = await Experiment.findOne({uuid});
        if(experiment) {
            return experiment;
        } else {
            throw Boom.notFound("Experiment with that UUID cannot be found.");
        }
    }

    async updateExperiment(uuid: string, name: string, author: string, templateSource: string, scriptSource: string): Promise<IExperiment> {
        let experiment = await Experiment.findOne({uuid});
        if(experiment) {
            if(name) experiment.name = name;
            if(author) experiment.author = author;
            if(templateSource) experiment.templateSource = templateSource;
            if(scriptSource) experiment.scriptSource = scriptSource;
            await experiment.save();
            return experiment;
        } else {
            throw Boom.notFound("Experiment with that UUID cannot be found.");
        }
    }

}