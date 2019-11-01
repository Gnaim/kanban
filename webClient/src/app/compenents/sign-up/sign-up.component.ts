import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  selectedFile : File;
  signUpForm : FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder,private signupService : SignupService) {}

  ngOnInit() {
    this.initForm();
  }

  mustMatch(password: string, repeatedPassword: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[password];
        const matchingControl = formGroup.controls[repeatedPassword];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
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
      validator: this.mustMatch('password','repeatedPassword')
    });
  }

 

  onSubmitForm(){
    //recuperate Data and send it to the server via the signup service
  }

  goHome() {
    this.router.navigate(['/Home']);
  }

  onSelectFile(event){
    this.selectedFile = event.target.files[0];
  }

  onUpload(){
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    console.log(formData);
  }
}
