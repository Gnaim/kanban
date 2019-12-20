import { ResponsesCodes } from 'src/app/services/helpers/responsesCodesEnum';

/**
 * Generic class to treat backend responses
 */
export class Response<T> {
    private data : T[];
    private errorCode : ResponsesCodes = ResponsesCodes.DEFAULT;
    private successCode : ResponsesCodes = ResponsesCodes.DEFAULT;

    constructor(data : T[],errorCode: ResponsesCodes,successCode: ResponsesCodes){
        this.data = data;
        this.errorCode = errorCode;
        this.successCode = successCode;
    }

    getData() : T[] {
        return this.data;
    }

    setData(data : T[]){
        this.data = data;
    }
    getSuccessCode() : ResponsesCodes { 
        return this.successCode;
    }

    setESuccessCoderrorCode(code : ResponsesCodes) {
        this.successCode = code;
    }

    getErrorCode() : ResponsesCodes { 
        return this.errorCode;
    }

    setErrorCode(code : ResponsesCodes) {
        this.errorCode = code;
    }
}