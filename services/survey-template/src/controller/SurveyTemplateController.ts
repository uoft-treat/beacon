import {SurveyTemplateService}           from "../service/SurveyTemplateService";
import {CreateNewSurveyTemplateResponse} from "./dto/CreateNewSurveyTemplateResponse";
import {GetOneSurveyTemplateResponse}    from "./dto/GetOneSurveyTemplateResponse";

export class SurveyTemplateController {

    surveyTemplateService: SurveyTemplateService;

    constructor(surveyTemplateService: SurveyTemplateService) {
        this.surveyTemplateService = surveyTemplateService;
    }

    /**
     * Handle POST /surveyTemplates
     * @param req
     * @param res
     * @param next
     */
    createNewSurveyTemplate = async (req, res, next) => {
        try {
            res.status(201);
            res.send(
                CreateNewSurveyTemplateResponse.constructFromModel(
                    await this.surveyTemplateService.createNewSurveyTemplate(req.body.name, req.body.description, req.body.questions)
                )
            );
        } catch (e) {
            next(e);
        }
    };

    /**
     * Handle GET /surveyTemplates
     * @param req
     * @param res
     * @param next
     */
    getAllSurveyTemplates = async (req, res, next) => {
        let templates = await this.surveyTemplateService.getAllSurveyTemplates();
        let result = [];

        for (let template of templates) {
            result.push(GetOneSurveyTemplateResponse.constructFromModel(template));
        }

        res.send(result);
    };

    /**
     * Handle GET /surveyTemplates/:id
     * @param req
     * @param res
     * @param next
     */
    getOneSurveyTemplate = async (req, res, next) => {
        try {
            res.send(
                GetOneSurveyTemplateResponse.constructFromModel(
                    await this.surveyTemplateService.getOneSurveyTemplateById(req.params.id)
                )
            )
        } catch (e) {
            next(e);
        }
    }


}
