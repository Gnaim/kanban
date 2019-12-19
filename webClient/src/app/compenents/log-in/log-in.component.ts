import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/loginService/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{8,24}')]]
    });
  }

  get getFormErrors() {
    return this.loginForm.controls; // to get access to errors in form
  }
  onSubmitForm() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return; //stop if the form is not valid
    }
    const formValue = this.loginForm.value;
    const email = formValue['email'];
    const password = formValue['password'];

    let result: boolean = this.loginService.connect(email, password);

    if (result == true) {
      this.router.navigate(['/Home/Dashboard']);
    } else {

      //Print the Error 
    }

  }


}