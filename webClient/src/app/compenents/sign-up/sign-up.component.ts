import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { SignupService } from 'src/app/services/signupService/signup.service';
import { User } from '../../entity/user';
import { Response } from 'src/app/entity/response';
import { ResponsesCodes } from 'src/app/services/helpers/responsesCodesEnum';
import { Observable } from 'rxjs';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';
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

  constructor(private router: Router,private formBuilder: FormBuilder,
              private signupService : SignupService,private notification :MyNotificationsService) {}

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
      profession : ['',[Validators.required]],
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
    const profession = formValue['profession'];
    const uploadedImage = new FormData();
    uploadedImage.append('files', this.selectedFile);
    console.log(uploadedImage);
    this.user = new User(email,password,firstName,lastName,phone,uploadedImage,profession);
    
    this.signupService.signup(this.user).subscribe(
          (data) => {
            this.signUpForm.reset();
            this.submitted = false;
            this.notification.showSignUpSucces();
          }, 
          (error) => { 
            this.notification.showErrorNotification(error);
          })
    }

  onSelectFile(event){
    this.selectedFile = <File>event.target.files[0];
  }
}
