export class DeleteOneSurveyQuestionResponse {

    message: string;

    /**
     * Create an instance from message.
     * @param message
     */
    static createFromMessage(message: string): DeleteOneSurveyQuestionResponse {
        let instance = new DeleteOneSurveyQuestionResponse();
        instance.message = message;
        return instance;
    }

}
