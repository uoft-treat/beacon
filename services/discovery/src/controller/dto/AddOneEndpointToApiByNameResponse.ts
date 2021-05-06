export class AddOneEndpointToApiByNameResponse {
    message: string;

    /**
     * Construct this DTO from a message.
     * @param message
     */
    static constructFromMessage(message: string) {
        let dto = new AddOneEndpointToApiByNameResponse();
        dto.message = message;
        return dto;
    }
}
