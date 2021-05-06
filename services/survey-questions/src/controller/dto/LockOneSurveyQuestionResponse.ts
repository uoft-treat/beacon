export class LockOneSurveyQuestionResponse {

    message: string;

    /**
     * Create an instance from message.
     * @param message
     */
    static createFromMessage(message: string): LockOneSurveyQuestionResponse {
        let instance = new LockOneSurveyQuestionResponse();
        instance.message = message;
        return instance;
    }

}
