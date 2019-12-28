import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { ResponsesCodes } from '../helpers/responsesCodesEnum';
import { HttpErrorResponse } from '@angular/common/http';
 
@Injectable()
export class MyNotificationsService {
 
    options : IndividualConfig;
    
    constructor(private toastr: ToastrService) {
        this.options = this.toastr.toastrConfig;
        this.options.extendedTimeOut = 2000;
        this.options.easeTime = 500;
        this.options.enableHtml = true;
        this.options.progressBar = true;
        this.options.progressAnimation = 'decreasing';
        this.options.positionClass = 'toast-bottom-center';
        this.options.onActivateTick = true;
    }
    

    showCustomNotification(message: string,title: string,type: string) {
        this.toastr.show(message,title,this.options, 'toast-' + type);
    }

    showSuccess() {
        this.toastr.success("","Success", this.options);
    }

    showError() {
        this.toastr.error("An error has occurred.","Error", this.options);
    }

    showServerError() {
        this.toastr.error("Internal server error try again in a few minutes !",
                            "Error",
                            this.options);
    }

    showBadRequestError() {
        this.toastr.error("Bad request was sent to the server !",
                            "Error",
                            this.options);
    }

    showLoginFailedError() {
       return this.toastr.error("Your email or password are wrong !",
                            "Error",
                            this.options);
    }

    showSignUpError() {
        this.toastr.error("The mail used already exists. Try with another one !",
                            "Error",
                            this.options);
    }

    showSignUpSucces() {
        this.toastr.success("A confirmation mail has been sent to your adress mail.!",
                            "Accout created",
                            this.options);
    }
 
    showInvalidTokenError() {
        this.toastr.error("Invalid token",
                            "Error",
                            this.options);
    }

    showProjectCreationSuccess() {
        this.toastr.success("Project created successfuly",
                            "Success",
                            this.options);
    }

    public showErrorNotification(error:HttpErrorResponse){
        if(error.error.error){
          if(error.error.error == ResponsesCodes.SIGNUP_FAILED_EXISTING_MAIL){
            this.showSignUpError();
          }else if (error.error.error == ResponsesCodes.SERVER_ERROR){
            this.showServerError();
          }else if (error.error.error == ResponsesCodes.BAD_REQUEST){
            this.showBadRequestError();
          }else if(error.error.error == ResponsesCodes.LOGIN_FAILED){
            this.showLoginFailedError();
          }else if(error.error.error == ResponsesCodes.INVALID_TOKEN){
            this.showInvalidTokenError();
          }
        }else if(error.status == 404){
          this.showError();
        }else if(error.status == 400){
          this.showBadRequestError();
        }else{
          this.showError();
        }
      }
}