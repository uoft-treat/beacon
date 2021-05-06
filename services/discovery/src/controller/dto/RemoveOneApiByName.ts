export class RemoveOneApiByName {
    message: string;

    /**
     * Construct this DTO from a message.
     * @param message
     */
    static constructFromMessage(message: string) {
        let dto = new RemoveOneApiByName();
        dto.message = message;
        return dto;
    }
}
