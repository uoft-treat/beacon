import {SurveyQuestionService} from "..";
import {ISurveyQuestion, SurveyQuestion} from "../../model";
import {SurveyQuestionInputError, SurveyQuestionNotFoundError} from "../error";
import mongoose from 'mongoose';
import {SurveyQuestionConflictError} from "../error/SurveyQuestionConflictError";


export class SurveyQuestionServiceImpl implements SurveyQuestionService {

    /**
     * Create a new survey question.
     * @param title
     * @param description
     * @param questionType
     * @param choices
     */
    async createSurveyQuestion(title: string, description: string, questionType: string, choices: string[]): Promise<ISurveyQuestion> {
        if (!title) {
            throw new SurveyQuestionInputError("You must provide a title.");
        }
        if (!questionType) {
            throw new SurveyQuestionInputError("You must provide a type.");
        }
        if (questionType !== 'SINGLE_CHOICE' && questionType !== 'SHORT_ANSWER') {
            throw new SurveyQuestionInputError("Invalid question type, must be SINGLE_CHOICE or SHORT_ANSWER.");
        }
        if (questionType === 'SINGLE_CHOICE' && !choices) {
            throw new SurveyQuestionInputError("You must provide a list of choices.");
        }
        let question = new SurveyQuestion({
            title,
            description,
            questionType,
            choices,
        });
        await question.save();
        return question;
    }

    /**
     * List all questions in the system.
     */
    async listAllSurveyQuestions(): Promise<ISurveyQuestion[]> {
        return SurveyQuestion.find({});
    }

    /**
     * Attempt to get one question by ID.
     * @param id
     */
    async getOneSurveyQuestionById(id: string): Promise<ISurveyQuestion> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new SurveyQuestionInputError("Invalid ID format.");
        }
        let question = await SurveyQuestion.findOne({_id: id});
        if (!question) {
            throw new SurveyQuestionNotFoundError("Survey question cannot be found.");
        }
        return question;
    }

    /**
     * Attempt to delete one question by ID.
     * @param id
     */
    async deleteOneSurveyQuestionById(id: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new SurveyQuestionInputError("Invalid ID format.");
        }
        let question = await SurveyQuestion.findOne({_id: id});
        if (question) {
            // If the question is locked, then we cannot remove it
            if (question.lockedAt) {
                throw new SurveyQuestionConflictError("You cannot delete a locked survey question.");
            } else {
                await question.remove();
            }
        } else {
            throw new SurveyQuestionNotFoundError("Survey question cannot be found.");
        }
    }

    /**
     * Attempt to patch a question by ID.
     * @param id
     * @param surveyQuestion
     */
    async patchOneSurveyQuestionById(id: string, surveyQuestion: {
        title?: string,
        description?: string,
        questionType?: string,
        choices?: string[],
    }): Promise<ISurveyQuestion> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new SurveyQuestionInputError("Invalid ID format.");
        }
        let question = await SurveyQuestion.findOne({_id: id});
        if (!question) {
            throw new SurveyQuestionNotFoundError("Survey question cannot be found.");
        }
        // If the question is locked, then we cannot update it
        if (question.lockedAt) {
            throw new SurveyQuestionConflictError("You cannot update a locked survey question.");
        }
        // Check if type is valid
        if (surveyQuestion.questionType && surveyQuestion.questionType !== 'SINGLE_CHOICE' && surveyQuestion.questionType !== 'SHORT_ANSWER') {
            throw new SurveyQuestionInputError("Invalid questionType, must be SINGLE_CHOICE or SHORT_ANSWER.");
        }
        // Check if choices are provided when switching to SHORT_ANSWER
        if (surveyQuestion.questionType === 'SINGLE_CHOICE' && question.questionType === 'SHORT_ANSWER' && !surveyQuestion.choices) {
            throw new SurveyQuestionInputError("You must provide a list of choices.");
        }
        question.set(surveyQuestion);
        await question.save();
        return question;
    }

    /**
     * Attempt to lock a question by ID.
     * @param id
     */
    async lockOneSurveyQuestionById(id: string): Promise<ISurveyQuestion> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new SurveyQuestionInputError("Invalid ID format.");
        }
        let question = await SurveyQuestion.findOne({_id: id});
        if (!question) {
            throw new SurveyQuestionNotFoundError("Survey question cannot be found.");
        }
        question.lockedAt = new Date();
        await question.save();
        return question;
    }

    /**
     * Attempt to unlock a question by ID.
     * @param id
     */
    async unlockOneSurveyQuestionById(id: string): Promise<ISurveyQuestion> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new SurveyQuestionInputError("Invalid ID format.");
        }
        let question = await SurveyQuestion.findOne({_id: id});
        if (!question) {
            throw new SurveyQuestionNotFoundError("Survey question cannot be found.");
        }
        question.lockedAt = null;
        await question.save();
        return question;
    }

}
