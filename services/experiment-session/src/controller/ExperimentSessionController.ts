import {ExperimentSessionService}           from "../service/ExperimentSessionService";
import {CreateNewExperimentSessionResponse} from "./dto/CreateNewExperimentSessionResponse";
import {DeleteOneExperimentSessionResponse} from "./dto/DeleteOneExperimentSessionResponse";
import {GetOneExperimentSessionResponse}    from "./dto/GetOneExperimentSessionResponse";

export class ExperimentSessionController {

    experimentSessionService: ExperimentSessionService;

    constructor(experimentSessionService: ExperimentSessionService) {
        this.experimentSessionService = experimentSessionService;
    }


    /**
     * Handle POST /experimentSessions
     * @param req
     * @param res
     * @param next
     */
    createNewExperimentSession = async (req, res, next) => {
        try {
            res.status(201);
            res.send(
                CreateNewExperimentSessionResponse.constructFromModel(
                    await this.experimentSessionService.createNewExperimentSession(req.body.surveyTemplateId, req.body.experimentTemplateId),
                )
            );
        } catch (e) {
            next(e);
        }
    };

    /**
     * Handle GET /experimentSessions
     * @param req
     * @param res
     * @param next
     */
    listExperimentSessions = async (req, res, next) => {
        let sessions = await this.experimentSessionService.listAllExperimentSessions();
        let result = [];
        for(let session of sessions) {
            result.push(
                GetOneExperimentSessionResponse.constructFromModel(session),
            );
        }
        res.send(result);
    };

    /**
     * Handle DELETE /experimentSessions/:id
     * @param req
     * @param res
     * @param next
     */
    deleteExperimentSession = async (req, res, next) => {
        try {
            await this.experimentSessionService.deleteExperimentSessionById(req.params.id);
        } catch (e) {
            return next(e);
        }
        res.send(
            DeleteOneExperimentSessionResponse.constructFromMessage("ok"),
        );
    };

    /**
     * Handle GET /experimentSessions/:id
     * @param req
     * @param res
     * @param next
     */
    getOneExperimentSession = async (req, res, next) => {
        try {
            res.send(
                GetOneExperimentSessionResponse.constructFromModel(
                    await this.experimentSessionService.getOneExperimentSessionById(req.params.id),
                ),
            );
        } catch (e) {
            return next(e);
        }
    }

}