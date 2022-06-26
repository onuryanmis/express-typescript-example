export class SuccessResponse {
    private message: string;
    private data: object|null;

    constructor(message: string, data: object|null = null) {
        this.message = message;
        this.data = data;
    }
}