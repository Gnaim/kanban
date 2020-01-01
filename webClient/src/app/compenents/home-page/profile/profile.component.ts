import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editMode : boolean = false;
  isLoading: boolean;
  errorGetProfile : boolean;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    this.errorGetProfile = false;
    this.getMyProfile();
  }


  getMyProfile(){
    this.isLoading = false;
    this.errorGetProfile = true;
  }

  swithToEdit(){
    this.editMode = true;
  }

  cancelEdit(){
    this.editMode = false;
    //clear form
  }

}
