import {ISurveyTemplate} from "../model/SurveyTemplate";

export interface SurveyTemplateService {

    createNewSurveyTemplate(
        name: string,
        description: string,
        questions: {
            surveyQuestionId: string,
            required: boolean,
        }[],
    ): Promise<ISurveyTemplate>;

    getAllSurveyTemplates(): Promise<ISurveyTemplate[]>;

    getOneSurveyTemplateById(id: string): Promise<ISurveyTemplate>;

}