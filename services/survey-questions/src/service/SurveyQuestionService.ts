import {ISurveyQuestion} from "../model";

export interface SurveyQuestionService {

    createSurveyQuestion(title: string, description: string, questionType: string, choices: string[]): Promise<ISurveyQuestion>;
    listAllSurveyQuestions(): Promise<ISurveyQuestion[]>;
    getOneSurveyQuestionById(id: string): Promise<ISurveyQuestion>;
    lockOneSurveyQuestionById(id: string): Promise<ISurveyQuestion>;
    unlockOneSurveyQuestionById(id: string): Promise<ISurveyQuestion>;
    deleteOneSurveyQuestionById(id: string): Promise<void>;
    patchOneSurveyQuestionById(id: string, surveyQuestion: {
        title?: string,
        description?: string,
        questionType?: string,
        choices?: string[],
    }): Promise<ISurveyQuestion>;

}
