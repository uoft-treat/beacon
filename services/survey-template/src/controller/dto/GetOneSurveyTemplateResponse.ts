import {ISurveyTemplate} from "../../model/SurveyTemplate";

export class GetOneSurveyTemplateResponse {
    _id: string;
    name: string;
    description: string;
    questions: {
        surveyQuestionId: string,
        required: boolean,
    }[];

    /**
     * Construct this DTO from a model.
     * @param model
     */
    static constructFromModel(model: ISurveyTemplate) {
        let dto = new GetOneSurveyTemplateResponse();
        dto._id = model._id.toString();
        dto.name = model.name;
        dto.description = model.description;
        dto.questions = [];

        for (let question of model.questions) {
            dto.questions.push({
                surveyQuestionId: question.surveyQuestionId.toString(),
                required: question.required,
            });
        }

        return dto;
    }
}
