import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/loginService/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  passwordsForm: FormGroup;
  submitted: boolean = false;
  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder) { }

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
    let result: boolean = true//this.loginService.connect(email, password);

    if (result == true) {
      this.router.navigate(['/Home/Dashboard']);
    } else {

      //Print the Error 
    }

  }



}






