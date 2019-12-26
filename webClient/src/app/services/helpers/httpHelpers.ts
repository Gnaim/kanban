export class HttpHelpers {

    static readonly HTTP_OPTIONS : {observe: "response"};
    static readonly BASE_URL : string = "http://127.0.0.1:3000/"; 
    static readonly SIGN_UP_URL : string = HttpHelpers.BASE_URL + "signUp";
    static readonly LOGIN_URL : string = HttpHelpers.BASE_URL + "login";

}