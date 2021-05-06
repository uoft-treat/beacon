import {SurveyQuestionService} from "../service";
import {
    CreateNewSurveyQuestionResponse,
    DeleteOneSurveyQuestionResponse,
    GetOneSurveyQuestionResponse,
    ListAllSurveyQuestionsSingleResponse,
    PatchOneSurveyQuestionResponse
}                              from "./dto";
import {LockOneSurveyQuestionResponse} from "./dto/LockOneSurveyQuestionResponse";
import {UnlockOneSurveyQuestionResponse} from "./dto/UnlockOneSurveyQuestionResponse";

export class SurveyQuestionController {

    surveyQuestionService: SurveyQuestionService;

    constructor(surveyQuestionService: SurveyQuestionService) {
        this.surveyQuestionService = surveyQuestionService;
    }

    /**
     * Handle POST /surveyQuestions
     * @param req
     * @param res
     * @param next
     */
    createNewSurveyQuestion = async (req, res, next) => {
        try {
            let question = await this.surveyQuestionService.createSurveyQuestion(req.body.title, req.body.description, req.body.questionType, req.body.choices);
            let response = CreateNewSurveyQuestionResponse.createFromSurveyQuestionModel(question);
            res.status(201);
            res.send(response);
        } catch (e) {
            return next(e);
        }
    };

    /**
     * Handle GET /surveyQuestions
     * @param req
     * @param res
     * @param next
     */
    listAllSurveyQuestions = async (req, res, next) => {
        let questions = await this.surveyQuestionService.listAllSurveyQuestions();
        let response = [];
        for (let question of questions) {
            response.push(ListAllSurveyQuestionsSingleResponse.createFromSurveyQuestionModel(question));
        }
        res.send(response);
    };

    /**
     * Handle GET /surveyQuestions/:id
     * @param req
     * @param res
     * @param next
     */
    getOneSurveyQuestion = async (req, res, next) => {
        try {
            res.send(
                GetOneSurveyQuestionResponse.createFromSurveyQuestionModel(
                    await this.surveyQuestionService.getOneSurveyQuestionById(req.params.id)
                )
            );
        } catch (e) {
            return next(e);
        }
    };

    /**
     * Handle DELETE /surveyQuestions/:id
     * @param req
     * @param res
     * @param next
     */
    deleteOneSurveyQuestion = async (req, res, next) => {
        try {
            await this.surveyQuestionService.deleteOneSurveyQuestionById(req.params.id);
        } catch (e) {
            return next(e);
        }
        res.send(DeleteOneSurveyQuestionResponse.createFromMessage("ok"));
    };

    /**
     * Handle PATCH /surveyQuestions/:id
     * @param req
     * @param res
     * @param next
     */
    patchOneSurveyQuestionById = async (req, res, next) => {
        try {
            res.send(
                PatchOneSurveyQuestionResponse.createFromSurveyQuestionModel(
                    await this.surveyQuestionService.patchOneSurveyQuestionById(req.params.id, req.body)
                )
            );
        } catch (e) {
            return next(e);
        }
    };

    /**
     * Handle POST /surveyQuestions/:id/lock
     * @param req
     * @param res
     * @param next
     */
    lockOneSurveyQuestionById = async (req, res, next) => {
        try {
            await this.surveyQuestionService.lockOneSurveyQuestionById(req.params.id);
            res.send(LockOneSurveyQuestionResponse.createFromMessage("ok"));
        } catch (e) {
            return next(e);
        }
    };

    /**
     * Handle DELETE /surveyQuestions/:id/lock
     * @param req
     * @param res
     * @param next
     */
    unlockOneSurveyQuestionById = async (req, res, next) => {
        try {
            await this.surveyQuestionService.unlockOneSurveyQuestionById(req.params.id);
            res.send(UnlockOneSurveyQuestionResponse.createFromMessage("ok"));
        } catch (e) {
            return next(e);
        }
    };

}
