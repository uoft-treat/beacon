import {SurveyTemplateService}           from "../SurveyTemplateService";
import {ISurveyTemplate, SurveyTemplate} from "../../model/SurveyTemplate";
import {DiscoveryService}                from "../DiscoveryService";
import {SurveyTemplateInputError}        from "../error/SurveyTemplateInputError";
import axios                             from 'axios';
import {SurveyTemplateNotFoundError}     from "../error/SurveyTemplateNotFoundError";

export class SurveyTemplateServiceImpl implements SurveyTemplateService {

    discoveryService: DiscoveryService;

    constructor(discoveryService: DiscoveryService) {
        this.discoveryService = discoveryService;
    }

    /**
     * Create a new survey template
     * @param name
     * @param description
     * @param questions
     */
    async createNewSurveyTemplate(name: string, description: string, questions: { surveyQuestionId: string; required: boolean }[]): Promise<ISurveyTemplate> {
        if (!name) {
            throw new SurveyTemplateInputError("You must provide a name.");
        }
        if (!questions) {
            throw new SurveyTemplateInputError("You must provide a list of questions.");
        }
        for (let question of questions) {
            try {
                await axios.get(
                    (await this.discoveryService.resolve('survey-questions-service')) + "/surveyQuestions/" + question.surveyQuestionId,
                )
            } catch (e) {
                if (e.response) {
                    if (e.response.status === 400) {
                        throw new SurveyTemplateInputError("Invalid question input.");
                    } else if (e.response.status === 404) {
                        throw new SurveyTemplateNotFoundError("Cannot find the question specified.");
                    }
                }
                throw new Error("Unknown error while processing your request: " + e.message);
            }
        }

        // Everything is validated at this point.
        let template = new SurveyTemplate({
            name, description, questions,
        });
        await template.save();
        return template;
    }

    /**
     * Get a list of templates.
     */
    async getAllSurveyTemplates(): Promise<ISurveyTemplate[]> {
        return await SurveyTemplate.find({});
    }

    /**
     * Get a survey template by ID.
     * @param id
     */
    async getOneSurveyTemplateById(id: string): Promise<ISurveyTemplate> {
        let template = await SurveyTemplate.findOne({_id: id});
        if (!template) {
            throw new SurveyTemplateNotFoundError("Cannot find survey template.");
        }
        return template;
    }

}