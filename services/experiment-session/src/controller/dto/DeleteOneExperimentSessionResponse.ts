export class DeleteOneExperimentSessionResponse {
    message: string;

    /**
     * Construct this DTO from a message.
     * @param message
     */
    static constructFromMessage(message: string) {
        let dto = new DeleteOneExperimentSessionResponse();
        dto.message = message;
        return dto;
    }
}
