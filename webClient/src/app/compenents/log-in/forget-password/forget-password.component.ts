import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  emailForm: FormGroup;
  submitted: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }
  onSubmitForm() {
    this.submitted = true;
    if (this.emailForm.invalid) {
      return; //stop if the form is not valid
    }
    const formValue = this.emailForm.value;
    const email = formValue['email'];

    let result: boolean = true;//this.loginService.forget(email);

    if (result == true) {
      this.router.navigate(['/Home/Dashboard']);
    } else {

      //Print the Error 
    }

  }

  get getFormErrors() {
    return this.emailForm.controls; // to get access to errors in form
  }

}
