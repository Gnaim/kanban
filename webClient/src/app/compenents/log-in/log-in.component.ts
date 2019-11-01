import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';




@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router,private loginService:LoginService,private formBuilder:FormBuilder ) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]{8,24}')]]
    });
  }
  onSubmitForm(){
    const formValue = this.loginForm.value;
     const email=formValue['email'];
     const password=formValue['password'];
  
   const result=this.loginService.connect(email,password);

   if(result){
    this.router.navigate(['/Home/Dashboard']);
  }else{

    //Print the Error 
  }

  }

  
}