
export enum ResponsesCodes {
    DEFAULT = 0,
    LOGIN_FAILED = 600,// (Statut HTTP 401)
    SIGNUP_FAILED_EXISTING_MAIL = 602, //(Statut HTTP 401)
    SERVER_ERROR = 603,// (Statut HTTP 500)
    CREATE_PROJECT_FAILED = 604, //(Statut HTTP 500)
    EDIT_PROJECT_FAILED = 605, //(Statut HTTP 500)
    CREATE_CARD_FAILED = 606, //(Statut HTTP 500)
    EDIT_CARD_FAILED = 607,// (Statut HTTP 500)
    INVALID_TOKEN = 608, //(Statut HTTP 401)
    NOT_AUTORIZED = 609, //(Statut HTTP 401)
    BAD_REQUEST = 610, //(Statut HTTP 400)
    FORBIDDEN = 611, //(Statut HTTP 403)
    INVALID_RESET_PASSWORD_TOKEN = 612,
    UPDATE_PASSWORD_ERROR = 613,
    INVALID_CONFIRM_MAIL_TOKEN = 614
}