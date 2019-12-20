import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signupService/signup.service';
import { User } from '../../entity/user';
import { Response } from 'src/app/entity/response';
import { ResponsesCodes } from 'src/app/services/helpers/responsesCodesEnum';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  selectedFile : File;
  signUpForm : FormGroup;
  submitted : boolean = false;
  user : User;
  res : Response<Object>;
  serverError : boolean = false;
  mailError : boolean = false;
  registrationSucces : boolean = false;
  constructor(private router: Router,private formBuilder: FormBuilder,private signupService : SignupService) {}

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
    this.signUpForm = this.formBuilder.group({
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      email : ['',[Validators.required,Validators.email]],
      phone : ['',[Validators.required]],
      password : ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]{8,24}')]],
      repeatedPassword : ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]{8,24}')]],
      photo : ['',[]],
    },{
      validator: this.MustMatch('password','repeatedPassword')
    });
  }

  get getFormErrors() {
    return this.signUpForm.controls; // to get access to errors in form
  }

  onSubmitForm(){
    const formValue = this.signUpForm.value;
    this.submitted = true;
    if(this.signUpForm.invalid){
      return; //stop if the form is not valid
    }
    const firstName = formValue['firstName'];
    const lastName = formValue['lastName'];
    const email = formValue['email'];
    const phone = formValue['phone'];
    const password = formValue['password'];
    const repeatedPassword = formValue['repeatedPassword'];
    const uploadedImage = new FormData();
    uploadedImage.append('files', this.selectedFile);
    console.log(uploadedImage);
    this.user = new User(email,password,firstName,lastName,phone,repeatedPassword,uploadedImage);
    this.res = this.signupService.signup(this.user);
    
    if(this.res.getSuccessCode()){
      this.registrationSucces = true;
      this.serverError = false;
      this.mailError = false;
    }else if(this.res.getErrorCode()){
      if(this.res.getErrorCode() == ResponsesCodes.SIGNUP_FAILED_EXISTING_MAIL){
        this.registrationSucces = false;
        this.serverError = false;
        this.mailError = true;
      }else if(this.res.getErrorCode() == ResponsesCodes.SERVER_ERROR){
        this.registrationSucces = false;
        this.serverError = true;
        this.mailError = false;
      }
    }
  }

  onSelectFile(event){
    this.selectedFile = <File>event.target.files[0];
  }
}
