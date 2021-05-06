export class RemoveOneEndpointFromApiByName {
    message: string;

    /**
     * Construct this DTO from a message.
     * @param message
     */
    static constructFromMessage(message: string) {
        let dto = new RemoveOneEndpointFromApiByName();
        dto.message = message;
        return dto;
    }
}
