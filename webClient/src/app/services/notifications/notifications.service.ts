import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { ResponsesCodes } from '../helpers/responsesCodesEnum';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../loginService/login.service';
 
@Injectable()
export class MyNotificationsService {
 
    options : IndividualConfig;
    
    constructor(private toastr: ToastrService,
                private router: Router,
                private loginService: LoginService) {
        this.options = this.toastr.toastrConfig;
        this.options.extendedTimeOut = 2000;
        this.options.easeTime = 500;
        this.options.enableHtml = true;
        this.options.progressBar = true;
        this.options.progressAnimation = 'decreasing';
        this.options.positionClass = 'toast-bottom-right';
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

    showTaskCreationSuccess() {
      this.toastr.success("Task created successfuly",
                          "Success",
                          this.options);
   }

    showTaskUpdateSuccess() {
    this.toastr.success("Task updated successfuly",
                        "Success",
                        this.options);
    }

    showProjectUpdateSuccess() {
      this.toastr.success("Project updated successfuly",
                          "Success",
                          this.options);
   }

   showTaskDeleteSuccess() {
    this.toastr.success("Task deleted successfuly",
                        "Success",
                        this.options);
    }

    showProjectDeleteSuccess() {
      this.toastr.success("Project deleted successfuly",
                          "Success",
                          this.options);
    }

    showErrorResetPassword(){
      this.toastr.error("Your token has been expired ! Make another request to reset your password",
                          "Error",
                          this.options);
    }

    showErrorConfirmMail(){
      this.toastr.error("Your token has been expired ! Make another singUp",
                          "Error",
                          this.options);
    }

    showErrorUpdatePassword(){
      this.toastr.error("Your old password is wrong",
                          "Error",
                          this.options);
    }

    public showErrorNotification(error:HttpErrorResponse){
      let errorBoolean = false;
        if(error.error.error){
          if(error.error.error == ResponsesCodes.SIGNUP_FAILED_EXISTING_MAIL){
            this.showSignUpError();
          }else if(error.error.error == ResponsesCodes.LOGIN_FAILED){
            this.showLoginFailedError();
          }else if (error.error.error == ResponsesCodes.SERVER_ERROR){
            errorBoolean = true;
            this.showServerError();
          }else if (error.error.error == ResponsesCodes.BAD_REQUEST){
            errorBoolean = true;
            this.showBadRequestError();
          }else if(error.error.error == ResponsesCodes.INVALID_TOKEN){
            errorBoolean = true;
            this.showInvalidTokenError();
            this.loginService.removeToken();
            this.router.navigate(['Login']);
          }else if(error.error.error == ResponsesCodes.INVALID_RESET_PASSWORD_TOKEN){
            this.showErrorResetPassword();
          }else if(error.error.error == ResponsesCodes.UPDATE_PASSWORD_ERROR){
            this.showErrorUpdatePassword();
          }else{
            errorBoolean = true;
            this.showError();
          }
        }else if(error.status == 404){
          errorBoolean = true;
          this.showError();
        }else if(error.status == 400){
          errorBoolean = true;
          this.showBadRequestError();
        }else{
          errorBoolean = true;
          this.showError();
        }
        return errorBoolean;
      }
}