import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userServie/user.service';
import { HttpHelpers } from 'src/app/services/helpers/httpHelpers';
import { User } from 'src/app/entity/user';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser : User;
  editForm:FormGroup;
  editMode : boolean = false;
  isLoading: boolean;
  errorGetProfile : boolean;
  submitted : boolean = false;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private notification:MyNotificationsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.errorGetProfile = false;
    this.cancelEdit();
    this.getMyProfile();
  }


  initFormForUpdate(){
    this.editForm = this.formBuilder.group({
      email : [{value:'',disabled:true},[Validators.required,Validators.email]],
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      phoneNumber : ['',[Validators.required]],
      profession : ['',[Validators.required]],
      oldPassword : ['',[Validators.pattern('[a-zA-Z0-9]{8,24}')]],
      newPassword : ['',[Validators.pattern('[a-zA-Z0-9]{8,24}')]],
      newPasswordConfirmation : ['',[Validators.pattern('[a-zA-Z0-9]{8,24}')]],
      photo : ['',[]],
    },{
      validator: this.MustMatch('newPassword','newPasswordConfirmation')
    });

    this.editForm.patchValue({
      email : this.currentUser.email,
      firstName : this.currentUser.firstName,
      lastName : this.currentUser.lastName,
      phoneNumber : this.currentUser.tel,
      profession : this.currentUser.profession,
    });
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

  getMyProfile(){
    this.userService.getProfile().subscribe(
      (profile) => {
        let jsonResponse = HttpHelpers.parseData(profile);
        this.currentUser = jsonResponse as User;
        this.isLoading = false;
      },(error) => { 
        console.log(error);
        this.isLoading = false;
      })

  }

  swithToEdit(){
    this.editMode = true;
    this.initFormForUpdate();
  }

  cancelEdit(){
    this.editMode = false;
  }

  onSubmitForm(){
    const formValue = this.editForm.value;
    this.submitted = true;
    if(this.editForm.invalid){
      return; //stop if the form is not valid
    }

    const email = this.currentUser.email;
    const firstName = formValue['firstName'];
    const lastName = formValue['lastName'];
    const phone = formValue['phoneNumber'];
    const profession = formValue['profession'];

    const oldPassword = formValue['oldPassword'];
    const newPassword = formValue['newPassword'];

    const user : User = new User(email,oldPassword,firstName,lastName,phone,null,profession,null,newPassword);
    this.userService.updateProfile(user).subscribe(
      (response) => {
        console.log(response);
        this.notification.showSuccess();
        this.ngOnInit();
      },(error) => {
        console.log(error);
        this.notification.showErrorNotification(error);
      }
    );
  }
}
