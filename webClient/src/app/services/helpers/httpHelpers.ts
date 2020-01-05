export class HttpHelpers {

    static readonly HTTP_OPTIONS: { observe: "response" };
    static readonly BASE_URL: string = "http://127.0.0.1:3000/";
    static readonly SIGN_UP_URL: string = HttpHelpers.BASE_URL + "signUp";
    static readonly LOGIN_URL: string = HttpHelpers.BASE_URL + "login";
    static readonly PROJECTS_URL: string = HttpHelpers.BASE_URL + "projects";
    static readonly DASHBOARD_URL: string = HttpHelpers.BASE_URL + "dashboard";
    static readonly USER_URL: string = HttpHelpers.BASE_URL + "user";
    static readonly CARDS_URL: string = "cards";
    static readonly FORGET_PASSWORD_URL = HttpHelpers.BASE_URL + "forgetPassword";
    static readonly CONFIRM_MAIL_URL = HttpHelpers.BASE_URL + "confirmMail";


    static parseData(data: any) {
        return JSON.parse(JSON.stringify(data));
    }
}