export class UnlockOneSurveyQuestionResponse {

    message: string;

    /**
     * Create an instance from message.
     * @param message
     */
    static createFromMessage(message: string): UnlockOneSurveyQuestionResponse {
        let instance = new UnlockOneSurveyQuestionResponse();
        instance.message = message;
        return instance;
    }

}
