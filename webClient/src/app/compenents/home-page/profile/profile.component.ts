import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editMode : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  swithToEdit(){
    this.editMode = true;
  }

  cancelEdit(){
    this.editMode = false;
    //clear form
  }

}
