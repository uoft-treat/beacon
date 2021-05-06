import {ExperimentTemplateService}           from "../service/ExperimentTemplateService";
import {CreateNewExperimentTemplateResponse} from "./dto/CreateNewExperimentTemplateResponse";
import {GetOneExperimentTemplateResponse}    from "./dto/GetOneExperimentTemplateResponse";
import {PatchOneTemplateResponse}            from "./dto/PatchOneTemplateResponse";
import {DeleteOneTemplateResponse}           from "./dto/DeleteOneTemplateResponse";

export class ExperimentTemplateController {

    experimentTemplateService: ExperimentTemplateService;

    constructor(experimentTemplateService: ExperimentTemplateService) {
        this.experimentTemplateService = experimentTemplateService;
    }

    /**
     * Handle POST /experimentTemplates
     * @param req
     * @param res
     * @param next
     */
    createNewTemplate = async (req, res, next) => {
        try {
            res.status(201);
            res.send(
                CreateNewExperimentTemplateResponse.constructFromModel(
                    await this.experimentTemplateService.createNewExperimentTemplate(req.body.name, req.body.description, req.body.link)
                )
            );
        } catch (e) {
            next(e);
        }
    };

    /**
     * Handle GET /experimentTemplates
     * @param req
     * @param res
     * @param next
     */
    getAllTemplates = async (req, res, next) => {
        let templates = await this.experimentTemplateService.getAllExperimentTemplates();
        let result = [];
        for (let template of templates) {
            result.push(GetOneExperimentTemplateResponse.constructFromModel(template));
        }
        res.send(result);
    };

    /**
     * Handle GET /experimentTemplates/:id
     * @param req
     * @param res
     * @param next
     */
    getOneTemplate = async (req, res, next) => {
        try {
            res.send(
                GetOneExperimentTemplateResponse.constructFromModel(
                    await this.experimentTemplateService.getOneExperimentTemplateById(req.params.id),
                )
            )
        } catch (e) {
            next(e);
        }
    };

    /**
     * Handle PATCH /experimentTemplates/:id
     * @param req
     * @param res
     * @param next
     */
    patchOneTemplate = async (req, res, next) => {
        try {
            res.send(
                PatchOneTemplateResponse.constructFromModel(
                    await this.experimentTemplateService.patchOneExperimentTemplateById(req.params.id, req.body),
                )
            );
        } catch (e) {
            next(e);
        }
    };

    /**
     * Handle DELETE /experimentTemplates/:id
     * @param req
     * @param res
     * @param next
     */
    deleteOneTemplate = async (req, res, next) => {
        try {
            await this.experimentTemplateService.deleteOneExperimentTemplateById(req.params.id);
            res.send(
                DeleteOneTemplateResponse.constructFromMessage("ok")
            );
        } catch (e) {
            next(e);
        }
    }

}