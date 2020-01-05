import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from 'src/app/services/forgetPassword/forgetPassword.service';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';
import { ResponsesCodes } from 'src/app/services/helpers/responsesCodesEnum';
import { ForgetPasswordComponent } from '../log-in/forget-password/forget-password.component'
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  passwordsForm: FormGroup;
  submitted: boolean = false;
  bsModalRef: BsModalRef;
  
  constructor(private router: Router,
              private forgetPasswordService: ForgetPasswordService, 
              private route : ActivatedRoute,
              private formBuilder: FormBuilder, 
              private modalService: BsModalService,
              private notification : MyNotificationsService) { }

  ngOnInit() {
    this.initForm();
  }

  MustMatch(password: string, repeatedPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[repeatedPassword];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  initForm() {
    this.passwordsForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{8,24}')]],
      repeatedPassword: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{8,24}')]]
    }, {
      validator: this.MustMatch('password', 'repeatedPassword')
    });
  }

  get getFormErrors() {
    return this.passwordsForm.controls; // to get access to errors in form
  }

  onSubmitForm() {
    const formValue = this.passwordsForm.value;
    this.submitted = true;
    if (this.passwordsForm.invalid) {
      return; //stop if the form is not valid
    }
    const password = formValue['password'];
    const repeatedPassword = formValue['repeatedPassword'];
    const token = this.route.snapshot.paramMap.get('token');
    this.forgetPasswordService.resetPassword(password,token).subscribe(
      (response) => {
        console.log(response);
        this.notification.showSuccess();
      },
      (error) => {
        console.log(error);

        if(error.error.error == ResponsesCodes.INVALID_RESET_PASSWORD_TOKEN){
          this.notification.showErrorResetPassword();
        }else{
          this.notification.showErrorNotification(error);
        }
      });
  }

  openForgetPasswordPage() {
    this.bsModalRef = this.modalService.show(ForgetPasswordComponent, { class: 'modal-lg' });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}