export class DeleteOneTemplateResponse {
    message: string;

    /**
     * Construct this DTO from a message.
     * @param message
     */
    static constructFromMessage(message: string) {
        let dto = new DeleteOneTemplateResponse();
        dto.message = message;
        return dto;
    }
}
