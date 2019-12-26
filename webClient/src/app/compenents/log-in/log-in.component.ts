import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/loginService/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ForgetPasswordComponent } from './forget-password/forget-password.component'
import { User } from 'src/app/entity/user';
import { ResponsesCodes } from 'src/app/services/helpers/responsesCodesEnum';



@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  user : User;
  submitted: boolean = false;
  loginFailed : boolean = false;
  serverError : boolean = false;
  badRequest : boolean = false;
  bsModalRef: BsModalRef;

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder, private modalService: BsModalService) {
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
    this.loginFailed = false;
    this.serverError = false;
    if (this.loginForm.invalid) {
      return; //stop if the form is not valid
    }
    const formValue = this.loginForm.value;
    const email = formValue['email'];
    const password = formValue['password'];
    this.user = new User(email, password);

    this.loginService.connect(this.user).subscribe(
      (response) => {
        let json = JSON.parse(JSON.stringify(response));
        let token = json.token;
        let expireIn = 24;
        //let expireIn = json.expireIn;
        this.loginService.setTokenInfo(token,expireIn);
        this.router.navigate(['/Home/Projects']);
      },
      (error) => {
          if(error.error.error == ResponsesCodes.LOGIN_FAILED){
            this.loginFailed = true;
            this.serverError = false;
            this.badRequest = false;
          }else if(error.error.error == ResponsesCodes.SERVER_ERROR || error.status == 404){
            this.loginFailed = false;
            this.serverError = true;
            this.badRequest = false;
          }else if(error.error.error == ResponsesCodes.BAD_REQUEST){
            this.badRequest = true;
            this.loginFailed = false;
            this.serverError = false;
          }
      })
  }

  openForgetPasswordPage() {
    this.bsModalRef = this.modalService.show(ForgetPasswordComponent, { class: 'modal-lg' });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}