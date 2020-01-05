import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetPasswordService } from 'src/app/services/forgetPassword/forgetPassword.service';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  emailForm: FormGroup;
  submitted: boolean = false;
  constructor(private router: Router,
             private formBuilder: FormBuilder,
             private notification : MyNotificationsService,
             private forgetPasswordService: ForgetPasswordService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  get getFormErrors() {
    return this.emailForm.controls; // to get access to errors in form
  }

  onSubmitForm() {
    this.submitted = true;
    if (this.emailForm.invalid) {
      return; //stop if the form is not valid
    }
    const formValue = this.emailForm.value;
    const email = formValue['email'];

    this.forgetPasswordService.sendUserMail(email).subscribe(
      (response) => {
        console.log(response);
        this.notification.showSuccess();
        this.router.navigate(['/Home/Dashboard']);
      },(error) => {
        console.log(error);
        this.notification.showErrorNotification(error);
      });
  }
}