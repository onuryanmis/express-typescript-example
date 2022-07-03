import {ResponseInterface} from '../interfaces/ResponseInterface';

export class ErrorResponse implements ResponseInterface{
    private code: number;
    private error: string;

    constructor(code:number, error: string) {
        this.code = code;
        this.error = error;
    }
}