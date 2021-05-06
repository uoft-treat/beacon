import {inject, injectable}    from "inversify";
import {ExperimentService}     from "../service/ExperimentService";
import {ExperimentNoSourceDto} from "../web/dto/ExperimentNoSourceDto";

@injectable()
export class ExperimentController {

    private experimentService: ExperimentService;

    constructor(
        @inject('ExperimentService') experimentService: ExperimentService,
    ) {
        this.experimentService = experimentService;
    }

    createNewExperiment = async (req, res, next) => {
        try {
            let experiment = await this.experimentService.createNewExperiment(
                req.body.name,
                req.body.author,
                req.body.templateSource,
                req.body.scriptSource,
            );
            let dto: ExperimentNoSourceDto = {
                name: experiment.name,
                author: experiment.author,
                uuid: experiment.uuid
            };
            res.send(dto);
        } catch (e) {
            return next(e);
        }
    };

    getAllExperiments = async (req, res, next) => {
        let experiments = await this.experimentService.getAllExperiments();
        let dtos: ExperimentNoSourceDto[] = [];
        for (const experiment of experiments) {
            dtos.push({
                name: experiment.name,
                author: experiment.author,
                uuid: experiment.uuid
            });
        }
        res.send(dtos);
    }

    getOneExperimentByUuid = async (req, res, next) => {
        try {
            let experiment = await this.experimentService.getExperimentByUuid(req.params.uuid);
            let dto: ExperimentNoSourceDto = {
                name: experiment.name,
                author: experiment.author,
                uuid: experiment.uuid
            };
            res.send(dto);
        } catch (e) {
            return next(e);
        }
    };

    updateOneExperimentByUuid = async (req, res, next) => {
        try {
            let experiment = await this.experimentService.updateExperiment(
                req.params.uuid,
                req.body.name,
                req.body.author,
                req.body.templateSource,
                req.body.scriptSource,
            );
            let dto: ExperimentNoSourceDto = {
                name: experiment.name,
                author: experiment.author,
                uuid: experiment.uuid
            };
            res.send(dto);
        } catch (e) {
            return next(e);
        }
    };

    getTemplateSource = async (req, res, next) => {
        try {
            let experiment = await this.experimentService.getExperimentByUuid(req.params.uuid);
            res.header("Content-Type", "text/plain");
            res.send(experiment.templateSource);
        } catch (e) {
            return next(e);
        }
    };

    getScriptSource = async (req, res, next) => {
        try {
            let experiment = await this.experimentService.getExperimentByUuid(req.params.uuid);
            res.header("Content-Type", "text/plain");
            res.send(experiment.scriptSource);
        } catch (e) {
            return next(e);
        }
    }


}